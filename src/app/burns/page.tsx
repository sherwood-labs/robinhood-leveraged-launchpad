import type { Metadata } from "next";
import Link from "next/link";
import { BURNS } from "@/lib/data";
import { ETH_USD, usd } from "@/lib/format";

export const metadata: Metadata = { title: "Burns" };

const totalEth = BURNS.reduce((s, b) => s + b.eth, 0);
const totalTokens = BURNS.reduce((s, b) => s + b.tokens, 0);

export default function BurnsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Buyback ledger</p>
      <div className="mt-3 grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <h1 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl">
          Supply only
          <br />
          <span className="italic">goes down.</span>
        </h1>
        <p className="max-w-md text-mist">
          When a portfolio clears its high-water mark, seventy-five percent of the realized gain buys the coin and burns it. Volatility fees and Solana-route fees burn too.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          [usd(totalEth * ETH_USD), "bought back in this preview"],
          [`${totalEth.toFixed(1)} ETH`, "returned from Lighter"],
          [`${(totalTokens / 1_000_000).toFixed(1)}M`, "tokens destroyed"],
        ].map(([n, l]) => (
          <div key={l} className="rounded-[28px] bg-lime px-6 py-7 text-ink">
            <p className="font-serif text-4xl leading-none sm:text-5xl">{n}</p>
            <p className="mt-3 text-sm text-ink/70">{l}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-[28px] border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-canopy font-mono text-[11px] uppercase tracking-[0.14em] text-mist">
            <tr>
              <th className="px-5 py-4 font-medium">When</th>
              <th className="px-5 py-4 font-medium">Coin</th>
              <th className="hidden px-5 py-4 font-medium md:table-cell">Why</th>
              <th className="px-5 py-4 text-right font-medium">ETH</th>
              <th className="hidden px-5 py-4 text-right font-medium sm:table-cell">Tokens</th>
            </tr>
          </thead>
          <tbody>
            {BURNS.map((b) => (
              <tr key={b.id} className="border-t border-white/10">
                <td className="px-5 py-4 font-mono text-mist">{b.when}</td>
                <td className="px-5 py-4">
                  <Link href={`/coin/${b.slug}`} className="font-medium hover:text-lime">
                    {b.name}
                  </Link>
                  <span className="ml-2 font-mono text-xs text-mist">${b.symbol}</span>
                </td>
                <td className="hidden px-5 py-4 text-mist md:table-cell">{b.reason}</td>
                <td className="px-5 py-4 text-right font-mono text-lime">{b.eth.toFixed(2)}</td>
                <td className="hidden px-5 py-4 text-right font-mono sm:table-cell">{(b.tokens / 1_000_000).toFixed(1)}M</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
