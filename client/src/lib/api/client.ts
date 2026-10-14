/**
 * Resilient HTTP client for Golden Moment API.
 *
 * Features:
 *  - Configurable base URL via NEXT_PUBLIC_API_URL
 *  - Automatic retries with exponential backoff (configurable)
 *  - Per-request timeout via AbortSignal
 *  - Typed responses with ApiResult<T> wrapper
 *  - Structured error handling
 */

import type { ApiResult } from "@/lib/types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/+$/, "");

const DEFAULT_TIMEOUT_MS = 8_000;
const DEFAULT_RETRIES = 2;
const BACKOFF_BASE_MS = 300;

/* ── Core Fetch ──────────────────────────────────── */

interface RequestOptions extends Omit<RequestInit, "signal"> {
    /** Override default timeout (ms). 0 = no timeout. */
    timeout?: number;
    /** Number of retries on network / 5xx errors. Default 2. */
    retries?: number;
}

async function apiFetch<T>(
    path: string,
    options: RequestOptions = {}
): Promise<ApiResult<T>> {
    const {
        timeout = DEFAULT_TIMEOUT_MS,
        retries = DEFAULT_RETRIES,
        ...fetchInit
    } = options;

    const url = `${API_BASE}${path}`;
    let lastError: string = "Unknown error";

    for (let attempt = 0; attempt <= retries; attempt++) {
        // Exponential backoff on retries (skip on first attempt)
        if (attempt > 0) {
            const delay = BACKOFF_BASE_MS * Math.pow(2, attempt - 1);
            await new Promise((r) => setTimeout(r, delay));
        }

        const controller = new AbortController();
        const timer =
            timeout > 0
                ? setTimeout(() => controller.abort(), timeout)
                : null;

        try {
            const res = await fetch(url, {
                ...fetchInit,
                signal: controller.signal,
                headers: {
                    "Content-Type": "application/json",
                    ...fetchInit.headers,
                },
            });

            if (timer) clearTimeout(timer);

            // Client errors (4xx) — don't retry
            if (res.status >= 400 && res.status < 500) {
                const body = await res.json().catch(() => ({}));
                return {
                    data: null,
                    error: body.error || `Client error (${res.status})`,
                    status: res.status,
                };
            }

            // Server errors (5xx) — retry
            if (res.status >= 500) {
                lastError = `Server error (${res.status})`;
                continue;
            }

            const data: T = await res.json();
            return { data, error: null, status: res.status };
        } catch (err: unknown) {
            if (timer) clearTimeout(timer);

            if (err instanceof DOMException && err.name === "AbortError") {
                lastError = `Request timeout (${timeout}ms)`;
            } else if (err instanceof TypeError) {
                // Network failure
                lastError = "Network error — server may be offline";
            } else {
                lastError = String(err);
            }
            // Retry on network / timeout errors
            continue;
        }
    }

    return { data: null, error: lastError, status: 0 };
}

/* ── Public API ──────────────────────────────────── */

export const api = {
    get<T>(path: string, opts?: RequestOptions) {
        return apiFetch<T>(path, { method: "GET", ...opts });
    },

    post<T>(path: string, body: unknown, opts?: RequestOptions) {
        return apiFetch<T>(path, {
            method: "POST",
            body: JSON.stringify(body),
            ...opts,
        });
    },
};
