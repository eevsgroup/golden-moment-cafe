"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Error Boundary caught error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-700 shadow-sm text-3xl">
          ⚠️
        </div>
        <p className="label-mini text-red-600 font-bold uppercase tracking-[0.2em] mb-2">
          Something went wrong
        </p>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight text-text mb-4">
          A momentary hiccup.
        </h1>
        <p className="font-sans text-[15px] leading-relaxed text-text-muted mb-8">
          We encountered an unexpected issue while loading this page. You can try refreshing or heading back to our menu.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:bg-accent-hover shadow-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-white text-text px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:border-accent hover:text-accent shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
