import type { Metadata } from "next";
import { Explorer } from "@/components/coins/Explorer";

export const metadata: Metadata = { title: "Coins" };

export default function CoinsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Live market</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl">
          Every coin.
          <br />
          <span className="italic text-mist">Every fund.</span>
        </h1>
        <p className="max-w-sm text-mist">Each coin runs its own leveraged book. Open one to see what it holds, and how much of itself it has burned.</p>
      </div>
      <Explorer />
    </div>
  );
}
