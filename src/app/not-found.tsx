import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-28 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">404</p>
      <h1 className="mt-3 font-serif text-6xl">Off the path.</h1>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-lime px-5 py-3 font-semibold text-ink">
        Back to Sherwood
      </Link>
    </div>
  );
}
