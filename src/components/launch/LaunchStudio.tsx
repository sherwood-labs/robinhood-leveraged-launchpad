"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useApp } from "@/components/state";
import { MARKETS, type Coin, type Leg, type Side } from "@/lib/data";
import { cx } from "@/lib/format";

type Draft = Leg;

const STEPS = ["Name", "Basket", "Release"];

function blankSeries() {
  return Array.from({ length: 41 }, (_, i) => 1 + Math.sin(i / 6) * 0.04);
}

export function LaunchStudio() {
  const { address, setWalletOpen, launch } = useApp();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("Greenwood");
  const [symbol, setSymbol] = useState("WOOD");
  const [description, setDescription] = useState("A locked book of stocks and crypto. Fees refill it. Profits burn it.");
  const [fee, setFee] = useState(2);
  const [target, setTarget] = useState("Me");
  const [handle, setHandle] = useState("sherwood");
  const [done, setDone] = useState<Coin | null>(null);
  const [legs, setLegs] = useState<Draft[]>([
    { symbol: "SPY", name: "S&P 500", kind: "stock", side: "long", weight: 40, leverage: 2 },
    { symbol: "BTC", name: "Bitcoin", kind: "crypto", side: "long", weight: 30, leverage: 3 },
    { symbol: "TSLA", name: "Tesla", kind: "stock", side: "short", weight: 30, leverage: 2 },
  ]);

  const weight = legs.reduce((s, l) => s + l.weight, 0);
  const problems = useMemo(() => {
    const p: string[] = [];
    if (!name.trim()) p.push("Give the coin a name.");
    if (!/^[A-Z0-9]{2,8}$/.test(symbol)) p.push("Ticker should be 2–8 letters or numbers.");
    if (legs.length < 1) p.push("Add at least one market.");
    if (legs.some((l) => !Number.isFinite(l.weight) || l.weight < 0 || l.weight > 100)) p.push("Each weight must be between 0% and 100%.");
    if (weight !== 100) p.push(`Weights add up to ${weight}%. They need to be 100%.`);
    if (legs.some((l) => !Number.isFinite(l.leverage) || l.leverage < 1 || l.leverage > 10)) p.push("Leverage must be between 1× and 10×.");
    if (target !== "Me" && handle.trim().length < 2) p.push("Add the handle that should receive the 1%.");
    return p;
  }, [handle, legs, name, symbol, target, weight]);

  function update(i: number, patch: Partial<Draft>) {
    setLegs((prev) => prev.map((leg, idx) => (idx === i ? { ...leg, ...patch } : leg)));
  }

  function addLeg() {
    const used = new Set(legs.map((l) => l.symbol));
    const next = MARKETS.find((m) => !used.has(m.symbol));
    if (!next || legs.length >= 6) return;
    setLegs((prev) => [...prev, { symbol: next.symbol, name: next.name, kind: next.kind, side: "long", weight: 0, leverage: 2 }]);
  }

  function normalize() {
    if (weight <= 0) return;
    const scaled = legs.map((l) => ({ ...l, weight: Math.round((l.weight / weight) * 100) }));
    const drift = 100 - scaled.reduce((s, l) => s + l.weight, 0);
    // Put the rounding remainder on the largest leg so a small leg never drops below 0%.
    const top = scaled.reduce((best, l, i) => (l.weight > scaled[best]!.weight ? i : best), 0);
    scaled[top] = { ...scaled[top]!, weight: scaled[top]!.weight + drift };
    setLegs(scaled);
  }

  function release() {
    if (problems.length) return;
    if (!address) {
      setWalletOpen(true);
      return;
    }
    const slug = symbol.toLowerCase();
    const coin: Coin = {
      slug,
      name: name.trim(),
      symbol,
      price: 0.0025,
      change: 0,
      marketCap: 2500,
      volume: 0,
      burned: 0,
      fee,
      holders: 1,
      supply: 1_000_000_000,
      created: "Just now",
      description: description.trim(),
      creator: address,
      feeTarget: target === "Me" ? "wallet" : `${target.toLowerCase()}:${handle.replace(/^@/, "")}`,
      legs,
      series: blankSeries(),
    };
    launch(coin);
    setDone(coin);
  }

  if (done) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Released</p>
        <h1 className="mt-3 font-serif text-6xl leading-[0.9]">
          {done.name} is in the woods.
        </h1>
        <p className="mt-4 text-mist">
          ${done.symbol} is staged in this preview with a billion tokens, a {done.fee}% fee, and a basket that can no longer be edited. No transaction was sent.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/coin/${done.slug}`} className="rounded-full bg-lime px-5 py-3 font-semibold text-ink">
            Open ${done.symbol}
          </Link>
          <Link href="/coins" className="rounded-full border border-white/15 px-5 py-3 font-semibold">
            See all coins
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_320px] lg:py-16">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Launch studio</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">Draw the coin. Then let go.</h1>
        <ol className="mt-8 flex gap-2">
          {STEPS.map((label, i) => (
            <li key={label} className="flex-1">
              <button onClick={() => setStep(i)} className="w-full text-left">
                <span className={cx("block h-1 rounded-full", i <= step ? "bg-lime" : "bg-white/10")} />
                <span className={cx("mt-2 block font-mono text-[11px] uppercase tracking-[0.16em]", i === step ? "text-lime" : "text-mist")}>
                  0{i + 1} {label}
                </span>
              </button>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="mt-8 space-y-5">
            <Field label="Name" value={name} onChange={(v) => { setName(v); if (!symbol || symbol === name.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase()) setSymbol(v.replace(/[^a-z0-9]/gi, "").slice(0, 8).toUpperCase()); }} />
            <Field label="Ticker" value={symbol} onChange={(v) => setSymbol(v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8))} mono />
            <label className="block">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-canopy px-4 py-3 text-sm outline-none focus:border-lime"
              />
            </label>
          </div>
        )}

        {step === 1 && (
          <div className="mt-8 space-y-3">
            {legs.map((leg, i) => (
              <div key={`${leg.symbol}-${i}`} className="grid gap-3 rounded-[24px] border border-white/10 bg-canopy p-4 sm:grid-cols-[1.3fr_auto_auto_auto_auto]">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Market</span>
                  <select
                    value={leg.symbol}
                    onChange={(e) => {
                      const m = MARKETS.find((x) => x.symbol === e.target.value)!;
                      update(i, { symbol: m.symbol, name: m.name, kind: m.kind });
                    }}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-pine px-3 py-2 text-sm"
                  >
                    {MARKETS.map((m) => (
                      <option key={m.symbol} value={m.symbol}>
                        {m.symbol} · {m.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Toggle
                  value={leg.side}
                  onChange={(side) => update(i, { side })}
                />
                <Num label="Weight %" value={leg.weight} min={0} max={100} onChange={(weight) => update(i, { weight })} />
                <Num label="Leverage" value={leg.leverage} min={1} max={10} onChange={(leverage) => update(i, { leverage })} />
                <button
                  onClick={() => setLegs((prev) => prev.filter((_, idx) => idx !== i))}
                  className="self-end rounded-xl border border-white/10 px-3 py-2 text-xs text-mist hover:text-ember"
                  aria-label={`Remove ${leg.symbol}`}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex flex-wrap gap-2 pt-2">
              <button onClick={addLeg} disabled={legs.length >= 6} className="rounded-full border border-white/15 px-4 py-2 text-sm disabled:opacity-40">
                Add a market
              </button>
              <button onClick={normalize} className="rounded-full border border-white/15 px-4 py-2 text-sm">
                Make weights 100%
              </button>
              <span className={cx("self-center font-mono text-xs", weight === 100 ? "text-lime" : "text-ember")}>{weight}% allocated</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-8 space-y-6">
            <div>
              <div className="flex items-end justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">Coin fee</span>
                <span className="font-serif text-5xl">{fee}%</span>
              </div>
              <input type="range" min={1} max={5} value={fee} onChange={(e) => setFee(Number(e.target.value))} className="mt-3 w-full accent-lime" />
              <p className="mt-2 text-sm text-mist">Charged in ETH on both buys and sells. Capped at 5%. Plus the creator’s 1%.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["60%", "to the fund"],
                ["40%", "to the platform"],
                ["1%", "to the creator"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 px-4 py-4">
                  <p className="font-serif text-3xl text-lime">{n}</p>
                  <p className="text-sm text-mist">{l}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">Who receives the 1%</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Me", "X", "GitHub", "Discord"].map((p) => (
                  <button key={p} onClick={() => setTarget(p)} className={cx("rounded-full px-3 py-1.5 text-sm", target === p ? "bg-lime text-ink" : "border border-white/15")}>
                    {p}
                  </button>
                ))}
              </div>
              {target !== "Me" && (
                <input
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.replace(/^@/, ""))}
                  placeholder="handle"
                  className="mt-3 w-full rounded-2xl border border-white/10 bg-canopy px-4 py-3 font-mono outline-none focus:border-lime"
                />
              )}
            </div>
            {problems.length > 0 && (
              <ul className="rounded-2xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-ember">
                {problems.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} className="rounded-full border border-white/15 px-5 py-3 text-sm">
              Back
            </button>
          )}
          {step < 2 ? (
            <button onClick={() => setStep((s) => s + 1)} className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink">
              Continue
            </button>
          ) : (
            <button onClick={release} className="rounded-full bg-lime px-5 py-3 text-sm font-semibold text-ink disabled:opacity-40" disabled={problems.length > 0}>
              {address ? "Release the coin" : "Connect to release"}
            </button>
          )}
        </div>
      </div>

      <aside className="h-fit rounded-[28px] border border-white/10 bg-lime p-6 text-ink lg:sticky lg:top-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em]">Preview</p>
        <h2 className="mt-3 font-serif text-4xl leading-none">{name || "Untitled"}</h2>
        <p className="mt-1 font-mono text-sm">${symbol || "——"}</p>
        <p className="mt-4 text-sm leading-6 text-ink/70">{description}</p>
        <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-ink/10">
          {legs.map((leg) => (
            <span key={`${leg.symbol}-${leg.side}-prev`} style={{ width: `${leg.weight}%` }} className={leg.side === "long" ? "bg-ink" : "bg-ember"} />
          ))}
        </div>
        <ul className="mt-4 space-y-1 font-mono text-xs">
          {legs.map((leg) => (
            <li key={`${leg.symbol}-${leg.side}-row`} className="flex justify-between">
              <span>
                {leg.side === "long" ? "▲" : "▼"} {leg.symbol}
              </span>
              <span>
                {leg.weight}% · {leg.leverage}×
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-ink/15 pt-4 text-sm">Fee {fee}% in ETH · 1B supply · liquidity locked</p>
      </aside>
    </div>
  );
}

function Field({ label, value, onChange, mono }: { label: string; value: string; onChange: (v: string) => void; mono?: boolean }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cx("mt-2 w-full rounded-2xl border border-white/10 bg-canopy px-4 py-3 outline-none focus:border-lime", mono && "font-mono uppercase")}
      />
    </label>
  );
}

function Num({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  return (
    <label>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-xl border border-white/10 bg-pine px-3 py-2 font-mono text-sm"
      />
    </label>
  );
}

function Toggle({ value, onChange }: { value: Side; onChange: (s: Side) => void }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mist">Side</span>
      <div className="mt-1 flex rounded-xl bg-pine p-1">
        {(["long", "short"] as const).map((s) => (
          <button key={s} onClick={() => onChange(s)} className={cx("rounded-lg px-3 py-1.5 text-xs capitalize", value === s ? (s === "long" ? "bg-lime text-ink" : "bg-ember text-ink") : "text-mist")}>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
