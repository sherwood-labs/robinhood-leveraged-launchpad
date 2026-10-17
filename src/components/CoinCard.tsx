import Link from "next/link";
import { Sparkline } from "@/components/Sparkline";
import type { Coin } from "@/lib/data";
import { compact, cx, pct } from "@/lib/format";

export function CoinCard({ coin }: { coin: Coin }) {
  const up = coin.change >= 0;
  return (
    <Link
      href={`/coin/${coin.slug}`}
      className="group flex flex-col rounded-[28px] border border-white/10 bg-canopy p-5 transition duration-300 hover:-translate-y-1 hover:border-lime/80"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">${coin.symbol}</p>
          <h3 className="mt-1 font-serif text-[1.85rem] leading-none tracking-tight">{coin.name}</h3>
        </div>
        <p className={cx("font-mono text-sm", up ? "text-lime" : "text-ember")}>{pct(coin.change)}</p>
      </div>
      <Sparkline data={coin.series} up={up} className="mt-4 h-16 w-full" />
      <div className="mt-4 flex h-1.5 overflow-hidden rounded-full bg-white/10">
        {coin.legs.map((leg) => (
          <span
            key={`${leg.symbol}-${leg.side}`}
            style={{ width: `${leg.weight}%` }}
            className={leg.side === "long" ? "bg-lime" : "bg-ember"}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {coin.legs.map((leg) => (
          <span key={`${leg.symbol}-${leg.side}-chip`} className="rounded-full bg-white/5 px-2 py-1 font-mono text-[11px] text-mist">
            {leg.side === "long" ? "▲" : "▼"} {leg.symbol} {leg.weight}% · {leg.leverage}x
          </span>
        ))}
      </div>
      <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 font-mono text-[11px] uppercase tracking-wide text-mist">
        <div>
          <dt>Cap</dt>
          <dd className="mt-1 text-sm normal-case tracking-normal text-paper">{compact(coin.marketCap)}</dd>
        </div>
        <div>
          <dt>Volume</dt>
          <dd className="mt-1 text-sm normal-case tracking-normal text-paper">{compact(coin.volume)}</dd>
        </div>
        <div>
          <dt>Burned</dt>
          <dd className="mt-1 text-sm normal-case tracking-normal text-lime">{coin.burned.toFixed(1)}%</dd>
        </div>
      </dl>
    </Link>
  );
}
