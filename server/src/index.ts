import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { syncPosMenu } from './services/posSync';
import { prisma } from './lib/prisma';
import checkoutRoutes from './routes/checkout';
import authRoutes from './routes/auth';

const app = express();
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(helmet());

// Configure Allowed CORS Origins
const clientUrl = (process.env.CLIENT_URL || 'http://localhost:3000').replace(/\/+$/, '');
const allowedOrigins = [
  clientUrl,
  'https://goldenmoment.au',
  'https://www.goldenmoment.au',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

if (process.env.ALLOWED_ORIGINS) {
  const customOrigins = process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim().replace(/\/+$/, ''));
  allowedOrigins.push(...customOrigins);
}

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (Postman, curl, server-to-server) or matched origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else if (
      allowedOrigins.some((allowed) => allowed.startsWith('*.') && origin.endsWith(allowed.slice(1))) ||
      (!isProduction && (origin.endsWith('.vercel.app') || origin.includes('localhost')))
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));

// Capture raw body for Stripe webhook verification with a safe 2MB limit
app.use(express.json({
  limit: '2mb',
  verify: (req, res, buf) => {
    (req as any).rawBody = buf;
  }
}));

// Global API rate limiter (150 requests per minute)
const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 150,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again shortly.' }
});
app.use('/api/', globalLimiter);

// Comprehensive health check with database query verification
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({
      status: 'ok',
      database: 'connected',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Manual trigger to sync menu from external POS or seed local standalone menu
app.all(['/api/sync-menu'], async (req, res) => {
  const result = await syncPosMenu(true);
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

// Endpoint for Next.js to fetch the optimized menu
app.get('/api/menu', async (req, res) => {
  try {
    const menu = await prisma.menuCategory.findMany({
      orderBy: { sortOrder: 'asc' },
      include: {
        items: {
          where: { active: true },
          orderBy: { name: 'asc' }
        }
      }
    });
    res.json(menu);
  } catch (error) {
    console.error("Failed to fetch menu:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use('/api/checkout', checkoutRoutes);
app.use('/api/auth', authRoutes);

const server = app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port} (${isProduction ? 'production' : 'development'})`);
  // Self-heal/seed menu on boot if empty or outdated
  syncPosMenu().catch((err) => console.error("Auto-sync error on boot:", err));
});

// Graceful shutdown handling
const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}. Gracefully shutting down HTTP server and Prisma...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log('✅ Server and database disconnected cleanly.');
      process.exit(0);
    } catch (err) {
      console.error('Error during database disconnect:', err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
