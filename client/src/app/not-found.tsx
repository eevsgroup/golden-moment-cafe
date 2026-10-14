import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-800 shadow-sm text-3xl">
          ☕
        </div>
        <p className="label-mini text-accent font-bold uppercase tracking-[0.2em] mb-2">
          404 — Page Not Found
        </p>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] leading-tight text-text mb-4">
          This cup seems empty.
        </h1>
        <p className="font-sans text-[15px] leading-relaxed text-text-muted mb-8">
          The page you are looking for doesn&apos;t exist or has moved. Let&apos;s get you back to the menu.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:bg-accent-hover shadow-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/#menu"
            className="inline-flex items-center justify-center rounded-full border border-border bg-white text-text px-8 py-3.5 font-sans text-[13px] font-semibold uppercase tracking-wider transition-all hover:border-accent hover:text-accent shadow-sm"
          >
            View Menu & Order
          </Link>
        </div>
      </div>
    </main>
  );
}
