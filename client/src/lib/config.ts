/**
 * Application Configuration — Feature Flags & Runtime Settings
 *
 * Central place to control which features require a running backend.
 * When `backendEnabled` is false, the frontend runs fully standalone
 * using static data — no Express server, database, or Stripe needed.
 */

export const APP_CONFIG = {
    /** Set to true when the backend is deployed and ready to receive requests. */
    backendEnabled:
        process.env.NEXT_PUBLIC_BACKEND_ENABLED === "true",

    /** API base URL — only used when backendEnabled is true. */
    apiBaseUrl: (
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    ).replace(/\/+$/, ""),
} as const;
