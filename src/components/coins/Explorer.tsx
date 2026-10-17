"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CoinCard } from "@/components/CoinCard";
import { useApp } from "@/components/state";
import { cx } from "@/lib/format";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "volume", label: "Top volume" },
  { key: "burning", label: "Burning" },
  { key: "stocks", label: "Has stocks" },
  { key: "shorts", label: "Has shorts" },
] as const;

type Filter = (typeof FILTERS)[number]["key"];

export function Explorer() {
  const { coins } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const burners = useMemo(() => [...coins].sort((a, b) => b.burned - a.burned).slice(0, 3), [coins]);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const out = coins.filter((c) => {
      if (filter === "burning" && c.burned <= 0) return false;
      if (filter === "stocks" && !c.legs.some((l) => l.kind === "stock")) return false;
      if (filter === "shorts" && !c.legs.some((l) => l.side === "short")) return false;
      if (query && !`${c.name} ${c.symbol} ${c.legs.map((l) => l.symbol).join(" ")}`.toLowerCase().includes(query)) return false;
      return true;
    });
    if (filter === "volume") out.sort((a, b) => b.volume - a.volume);
    return out;
  }, [coins, filter, q]);

  return (
    <>
      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {burners.map((c, i) => (
          <Link
            key={c.slug}
            href={`/coin/${c.slug}`}
            className={cx(
              "rounded-[28px] p-6 transition hover:-translate-y-1",
              i === 0 ? "bg-lime text-ink" : "border border-white/10 bg-canopy",
            )}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-70">Top burner #{i + 1}</p>
            <p className="mt-4 font-serif text-4xl leading-none">{c.name}</p>
            <p className="mt-4 font-serif text-6xl leading-none">{c.burned.toFixed(1)}%</p>
            <p className="mt-2 text-sm opacity-70">of supply destroyed · ${c.symbol}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cx(
                "rounded-full px-3.5 py-1.5 text-sm transition",
                filter === f.key ? "bg-lime text-ink" : "border border-white/15 text-mist hover:text-paper",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="coin-search">
          Search coins
        </label>
        <input
          id="coin-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name, ticker, market"
          className="w-full rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-mist/60 focus:border-lime sm:max-w-xs"
        />
      </div>

      {list.length === 0 ? (
        <p className="mt-10 rounded-[28px] border border-dashed border-white/15 px-6 py-16 text-center text-mist">
          Nothing in the woods matches that.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => (
            <CoinCard key={c.slug} coin={c} />
          ))}
        </div>
      )}
    </>
  );
}
