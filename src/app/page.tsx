import Link from "next/link";
import { CoinCard } from "@/components/CoinCard";
import { Mark } from "@/components/Mark";
import { CreatorDesk } from "@/components/home/CreatorDesk";
import { COINS, FAQ, MARKETS, RECEIPTS } from "@/lib/data";

const featured = [...COINS].sort((a, b) => b.volume - a.volume).slice(0, 6);

export default function HomePage() {
  return (
    <>
      <section className="bg-lime text-ink">
        <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <p className="rise font-mono text-[11px] uppercase tracking-[0.22em]">Robinhood Chain · live mainnet</p>
            <h1 className="rise rise-2 mt-5 font-serif text-[3.4rem] leading-[0.88] tracking-tight sm:text-7xl lg:text-[6.1rem]">
              A coin that
              <br />
              trades for
              <br />
              <span className="italic">itself.</span>
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-lg leading-7 text-ink/80">
              Launch on Robinhood Chain. Every trade pays a fee in ETH. Most of that fee becomes a leveraged book of stocks and crypto. Profits buy the coin and burn it.
            </p>
            <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
              <Link href="/launch" className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-lime transition hover:bg-black">
                Launch a coin
              </Link>
              <Link href="/coins" className="rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold transition hover:bg-ink hover:text-lime">
                Walk the coins
              </Link>
            </div>
            <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-ink/15 pt-6">
              {[
                ["6", "coins in the woods"],
                ["$7.5M", "traded"],
                ["54 ETH", "burned"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-serif text-3xl leading-none">{n}</dt>
                  <dd className="mt-2 text-xs leading-4 text-ink/70">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative mx-auto w-full max-w-md px-3 sm:px-6">
            <Mark alt="Sherwood Labs archer" className="aspect-square w-full rounded-full shadow-[0_30px_80px_rgba(16,24,12,0.18)]" />
            <span className="absolute left-0 top-6 rounded-full bg-ink px-3 py-2 font-mono text-[11px] text-lime shadow-lg">▲ SPY 40% · 2x</span>
            <span className="absolute right-0 top-[34%] rounded-full bg-ink px-3 py-2 font-mono text-[11px] text-lime shadow-lg">▲ BTC 30% · 3x</span>
            <span className="absolute bottom-14 left-2 rounded-full bg-ink px-3 py-2 font-mono text-[11px] text-ember shadow-lg">▼ TSLA 30% · 2x</span>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-white/10 bg-ink">
        <div className="ticker-track flex w-max gap-10 py-3">
          {[...MARKETS, ...MARKETS].map((m, i) => (
            <span key={`${m.symbol}-${i}`} className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-paper">
              {m.symbol}
              <span className={m.change >= 0 ? "text-lime" : "text-ember"}>
                {m.change >= 0 ? "+" : ""}
                {m.change.toFixed(2)}%
              </span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-28" id="how">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">How it works</p>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">
            Three moves.
            <br />
            <span className="italic text-mist">Then it runs.</span>
          </h2>
          <p className="mt-5 max-w-sm text-mist">You design the fund once. After that, every trade feeds it, and every win shrinks the supply.</p>
        </div>
        <ol className="divide-y divide-white/10 border-y border-white/10">
          {[
            ["01", "Pick the portfolio", "Up to six markets from Lighter. Stocks, crypto, gold, oil. Long or short, 1–10×. Written on-chain at launch, and then it cannot be edited."],
            ["02", "Trades fund it", "Buys and sells pay a fee in ETH, never in the coin. Sixty percent becomes margin in that coin’s own Lighter account. Forty percent is the platform."],
            ["03", "Profits burn it", "When the book clears its high-water mark, seventy-five percent of the realized gain buys the coin off the market and destroys it."],
          ].map(([n, t, b]) => (
            <li key={n} className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
              <span className="font-serif text-3xl italic text-lime">{n}</span>
              <div>
                <h3 className="font-serif text-3xl">{t}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-mist">{b}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8" id="fees">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Smart fees</p>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl">The fee that fights back.</h2>
          <p className="mt-4 text-mist">Creators get paid. Bots pay the most. Wild candles burn supply. When the chart bleeds, the fee turns into a burn.</p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          <article className="rounded-[28px] bg-lime p-7 text-ink lg:col-span-6 lg:row-span-2 lg:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em]">Creator fee</p>
            <p className="mt-6 font-serif text-7xl leading-none">1%</p>
            <h3 className="mt-6 font-serif text-4xl leading-none">Creators earn on every trade.</h3>
            <p className="mt-4 max-w-md text-ink/75">Every buy and sell pays 1% in ETH on top of the coin’s own fee. Keep it, or send it to a name. The fund, the platform, and the burns keep their full share.</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em]">1% · in ETH · paid automatically</p>
          </article>
          {[
            ["Defend mode", "−20%", "The chart bleeds. The fees burn.", "When price falls 20% below its high, the coin’s share of every fee goes to buyback for six hours. Traders pay nothing extra.", "−20% trigger · 6h · 60% → burn", "lg:col-span-6"],
            ["Bot tax", "15s", "Flip fast, pay the max.", "Selling within 15 seconds of your own buy pays the full 5% coin fee. Wait a moment and you pay the normal rate.", "15s window · 5% on the flip", "lg:col-span-6"],
            ["Volatility", "+2%", "Wild candles burn supply.", "The fee rises with the move and fades as the market calms. That extra buys the coin and burns it.", "+0.05% per 1% move · cap +2%", "lg:col-span-12"],
          ].map(([tag, big, title, body, spec, span]) => (
            <article key={tag} className={`rounded-[28px] border border-white/10 bg-canopy p-6 ${span}`}>
              <div className="flex items-end justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">{tag}</p>
                <p className="font-serif text-5xl leading-none">{big}</p>
              </div>
              <h3 className="mt-4 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-mist">{body}</p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mist/80">{spec}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-sm text-mist">A coin’s own fee never goes above 5%, so a trade costs at most 6% once the creator’s 1% is included.</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8" id="built">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Built in</p>
        <h2 className="mt-3 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight">Everything a coin never had.</h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-6">
          <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-canopy p-6 lg:col-span-4 lg:min-h-72">
            <div className="flex flex-wrap gap-2">
              {MARKETS.map((m) => (
                <span key={m.symbol} className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs">
                  {m.symbol}
                  <span className="ml-2 text-mist">{m.kind}</span>
                </span>
              ))}
            </div>
            <h3 className="mt-8 font-serif text-3xl">Stocks, crypto, and commodities in one coin.</h3>
            <p className="mt-2 max-w-lg text-sm leading-6 text-mist">Long the S&P and short Tesla at the same time. The legs are perpetuals on Lighter, sized from the coin’s own equity.</p>
          </article>
          <article className="rounded-[28px] border border-white/10 bg-canopy p-6 lg:col-span-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Stop-loss</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[35%] bg-ember" />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-mist">
              <span>0</span>
              <span>stop ~17%</span>
              <span>liq ~50%</span>
            </div>
            <h3 className="mt-6 font-serif text-3xl">Closed before it breaks.</h3>
            <p className="mt-2 text-sm leading-6 text-mist">At −35% from its high, the fund flattens every position. At 2× that is long before liquidation.</p>
          </article>
          {[
            ["0", "ETH to launch.", "The whole supply goes into the pool. You only pay gas."],
            ["∞", "Liquidity locked.", "Nobody can pull the pool. Not the creator. Not us."],
            ["SOL", "Buy from Solana.", "Pay in SOL, land on Robinhood Chain in seconds. Those fees go straight to burns."],
          ].map(([big, title, body]) => (
            <article key={title} className="rounded-[28px] border border-white/10 bg-moss/60 p-6 lg:col-span-2">
              <p className="font-serif text-5xl text-lime">{big}</p>
              <h3 className="mt-4 font-serif text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-mist">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2" id="creators">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Creator fee</p>
          <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight">
            Pay anyone.
            <br />
            <span className="italic">By username.</span>
          </h2>
          <p className="mt-4 max-w-md text-mist">Every trade pays 1% in ETH. Keep it, or send it to a friend, a community, or a trader by typing their handle. Locked at launch. Nobody can redirect it later.</p>
          <Link href="/claim" className="mt-6 inline-flex text-sm font-semibold text-lime">
            Someone pointed a fee at you? Claim it →
          </Link>
        </div>
        <CreatorDesk />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8" id="ledger">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Preview ledger</p>
            <h2 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight">Receipts, not promises.</h2>
          </div>
          <p className="max-w-xs text-sm text-mist">Illustrative totals for this Sherwood preview. The live app reads them from Robinhood Chain.</p>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {RECEIPTS.map((r) => (
            <div key={r.label} className="bg-pine px-6 py-7">
              <p className="font-serif text-4xl text-lime">{r.value}</p>
              <p className="mt-2 text-sm">{r.label}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mist">{r.hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8" id="coins">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Coins</p>
            <h2 className="mt-3 font-serif text-5xl leading-[0.95]">Already in the woods.</h2>
          </div>
          <Link href="/coins" className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold hover:border-lime">
            See all coins
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((c) => (
            <CoinCard key={c.slug} coin={c} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8" id="faq">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Questions</p>
        <h2 className="mt-3 font-serif text-5xl">Good to know.</h2>
        <div className="mt-8">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group border-b border-white/10 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl leading-tight">
                {q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-white/15 text-lg transition group-open:rotate-45 group-open:bg-lime group-open:text-ink">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-mist">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-lime text-ink">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:py-24">
          <h2 className="font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl">
            Your coin.
            <br />
            Your fund.
            <br />
            <span className="italic">Your woods.</span>
          </h2>
          <div className="max-w-sm">
            <p className="text-ink/75">Launch in a minute. From the first trade, the book starts working.</p>
            <Link href="/launch" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-lime">
              Launch a coin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
