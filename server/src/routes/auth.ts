import express, { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '../lib/prisma';

const router: Router = express.Router();

// Initialize Supabase admin client for backend verification only if variables are set
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
let supabase: any = null;
if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
}

// Middleware to verify Supabase token
export const verifyAuth = async (req: any, res: any, next: any) => {
    // If Supabase is not configured, skip authentication only in non-production local development
    if (!supabase) {
        if (process.env.NODE_ENV === 'production') {
            return res.status(503).json({ error: 'Authentication service unavailable' });
        }
        return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const { data: { user }, error } = await supabase.auth.getUser(token);
        if (error || !user) {
            throw new Error('Invalid token');
        }
        req.userId = user.id;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

// Get user's order history
router.get('/orders', verifyAuth, async (req: any, res: any) => {
    try {
        if (!req.userId) {
            return res.json({ orders: [] });
        }
        const orders = await prisma.order.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
