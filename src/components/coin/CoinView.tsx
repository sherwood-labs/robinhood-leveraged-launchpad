"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Chart } from "@/components/Sparkline";
import { useApp } from "@/components/state";
import { activityFor } from "@/lib/data";
import { ETH_USD, compact, cx, pct, shortAddr, usd } from "@/lib/format";

export function CoinView({ slug }: { slug: string }) {
  const { coins, address, setWalletOpen } = useApp();
  const coin = coins.find((c) => c.slug === slug);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("0.25");
  const [filled, setFilled] = useState<string | null>(null);

  const quote = useMemo(() => {
    if (!coin) return null;
    const n = Number(amount);
    if (!Number.isFinite(n) || n <= 0) return null;
    const usdNotional = side === "buy" ? n * ETH_USD : n * coin.price;
    const fee = usdNotional * ((coin.fee + 1) / 100);
    const out = side === "buy" ? (usdNotional - fee) / coin.price : (n * coin.price * (1 - (coin.fee + 1) / 100)) / ETH_USD;
    return { usdNotional, fee, out };
  }, [amount, coin, side]);

  if (!coin) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Missing</p>
        <h1 className="mt-3 font-serif text-6xl">That coin left the woods.</h1>
        <Link href="/coins" className="mt-6 inline-flex rounded-full bg-lime px-5 py-3 font-semibold text-ink">
          Back to coins
        </Link>
      </div>
    );
  }

  const up = coin.change >= 0;
  const activity = activityFor(coin);

  function submit() {
    if (!address) {
      setWalletOpen(true);
      return;
    }
    if (!quote) return;
    setFilled(side === "buy" ? `${quote.out.toLocaleString("en-US", { maximumFractionDigits: 0 })} ${coin!.symbol}` : `${quote.out.toFixed(4)} ETH`);
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_340px] lg:py-14">
      <div>
        <Link href="/coins" className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist hover:text-lime">
          ← All coins
        </Link>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">${coin.symbol}</p>
            <h1 className="mt-1 font-serif text-6xl leading-none tracking-tight">{coin.name}</h1>
          </div>
          <div className="text-right">
            <p className="font-serif text-4xl">{usd(coin.price, coin.price < 1 ? 5 : 2)}</p>
            <p className={cx("font-mono text-sm", up ? "text-lime" : "text-ember")}>{pct(coin.change)} today</p>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-mist">{coin.description}</p>

        <div className="mt-6 h-64 rounded-[28px] border border-white/10 bg-canopy p-4 sm:h-80">
          <Chart data={coin.series} up={up} />
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-4">
          {[
            ["Market cap", compact(coin.marketCap)],
            ["Volume", compact(coin.volume)],
            ["Burned", `${coin.burned.toFixed(1)}%`],
            ["Holders", coin.holders.toLocaleString("en-US")],
          ].map(([k, v]) => (
            <div key={k} className="bg-pine px-4 py-4">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">{k}</dt>
              <dd className="mt-1 font-serif text-2xl">{v}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-8 rounded-[28px] border border-white/10 bg-canopy p-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-3xl">The basket</h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">Locked · fee {coin.fee}%</p>
          </div>
          <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/10">
            {coin.legs.map((leg) => (
              <span key={`${leg.symbol}-bar`} style={{ width: `${leg.weight}%` }} className={leg.side === "long" ? "bg-lime" : "bg-ember"} />
            ))}
          </div>
          <ul className="mt-5 divide-y divide-white/10">
            {coin.legs.map((leg) => (
              <li key={`${leg.symbol}-${leg.side}`} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 py-3">
                <div>
                  <p className="font-medium">
                    {leg.side === "long" ? "▲" : "▼"} {leg.symbol}
                    <span className="ml-2 text-sm text-mist">{leg.name}</span>
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">{leg.kind}</p>
                </div>
                <p className="font-mono text-sm">{leg.weight}%</p>
                <p className="font-mono text-sm text-lime">{leg.leverage}×</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-6 rounded-[28px] border border-white/10 p-6">
          <h2 className="font-serif text-3xl">Recent</h2>
          <ul className="mt-4 divide-y divide-white/10">
            {activity.map((row) => (
              <li key={`${row.who}-${row.time}`} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className={cx("w-14 font-mono uppercase", row.side === "sell" ? "text-ember" : row.side === "burn" ? "text-lime" : "text-paper")}>
                  {row.side}
                </span>
                <span className="font-mono text-mist">{row.who}</span>
                <span className="ml-auto font-mono">{row.side === "burn" ? `${row.amount} ETH burned` : `${row.amount} ETH`}</span>
                <span className="w-10 text-right text-mist">{row.time}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <aside className="h-fit rounded-[28px] border border-white/10 bg-canopy p-5 lg:sticky lg:top-24">
        <div className="grid grid-cols-2 rounded-full bg-pine p-1">
          {(["buy", "sell"] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setSide(s);
                setFilled(null);
                setAmount(s === "buy" ? "0.25" : "100000");
              }}
              className={cx(
                "rounded-full py-2 text-sm font-semibold capitalize",
                side === s ? (s === "buy" ? "bg-lime text-ink" : "bg-ember text-ink") : "text-mist",
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <label className="mt-5 block text-xs uppercase tracking-[0.16em] text-mist" htmlFor="amount">
          {side === "buy" ? "You pay · ETH" : `You sell · ${coin.symbol}`}
        </label>
        <input
          id="amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            setFilled(null);
          }}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-pine px-4 py-4 font-serif text-3xl outline-none focus:border-lime"
        />
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-mist">
            <dt>Price</dt>
            <dd className="font-mono text-paper">{usd(coin.price, 5)}</dd>
          </div>
          <div className="flex justify-between text-mist">
            <dt>Fee {coin.fee}% + 1%</dt>
            <dd className="font-mono text-paper">{quote ? usd(quote.fee, 2) : "—"}</dd>
          </div>
          <div className="flex justify-between text-mist">
            <dt>You receive</dt>
            <dd className="font-mono text-lime">
              {quote ? (side === "buy" ? `${Math.round(quote.out).toLocaleString("en-US")} ${coin.symbol}` : `${quote.out.toFixed(4)} ETH`) : "—"}
            </dd>
          </div>
        </dl>
        <button
          onClick={submit}
          className={cx("mt-5 w-full rounded-full py-3.5 font-semibold text-ink", side === "buy" ? "bg-lime hover:bg-lime-2" : "bg-ember")}
        >
          {address ? `${side === "buy" ? "Buy" : "Sell"} ${coin.symbol}` : "Connect to trade"}
        </button>
        {filled && (
          <p className="mt-4 rounded-2xl bg-lime/15 px-4 py-3 text-sm text-lime">
            Preview fill · {filled}. No transaction was broadcast.
          </p>
        )}
        <p className="mt-4 text-xs leading-5 text-mist">
          Creator fee aimed at {coin.feeTarget}. Launched {coin.created}. Treasury {shortAddr(coin.creator)}.
        </p>
      </aside>
    </div>
  );
}
