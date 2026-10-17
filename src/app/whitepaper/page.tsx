import type { Metadata } from "next";

export const metadata: Metadata = { title: "Whitepaper" };

const CHAPTERS = [
  {
    title: "The problem with a plain coin",
    paragraphs: [
      "Most coins are a ticker, a pool, and a hope that someone else shows up. Liquidity can be pulled. Fees, when they exist, leave the system. Nothing in the coin is working while you sleep.",
      "Sherwood starts from a different premise. A coin should have a job. Its job is to hold a portfolio, fund that portfolio from its own trading, and use the profits to shrink its own supply.",
    ],
  },
  {
    title: "A fund inside the coin",
    paragraphs: [
      "Every Sherwood coin trades against ETH in a Uniswap v4 pool on Robinhood Chain. A hook takes the trading fee in ETH, never in the token. That choice matters. The coin is not taxed in its own units, so the fee does not silently dilute the book it is trying to build.",
      "Sixty percent of the fee becomes margin. The treasury swaps ETH to USDG and deposits it to a Lighter sub-account that belongs to that coin. The keeper then opens the basket the creator chose: up to six markets, long or short, one to ten times leverage. The basket is stored on-chain and cannot be rewritten after launch.",
    ],
  },
  {
    title: "Why the fee is allowed to change its mind",
    paragraphs: [
      "A flat fee is easy to game. Sherwood lets the fee react, inside a hard cap. Selling within fifteen seconds of your own buy pays the maximum, so a sandwich pays for the privilege. Fast candles add up to two percent, and half of that extra burns supply. If price falls twenty percent from its high, the coin’s share of fees turns into buybacks for six hours.",
      "Creators are paid separately. One percent of every trade, in ETH, goes to a wallet or to a social account named at launch. Pointing the fee at a name does not reduce what the fund, the platform, or the burns receive.",
    ],
  },
  {
    title: "Burns are a rule, not a mood",
    paragraphs: [
      "Profit is not burned because someone feels generous. When the portfolio sits ten percent above its previous high, the keeper realizes half the gain and returns seventy-five percent of that cash. On-chain, the only thing that cash can do is buy the coin and burn it.",
      "Losses are bounded by a stop. Thirty-five percent below the portfolio high, every position is closed. At two times leverage that is about a seventeen percent move in the underlying, well before a liquidation. What remains stays in the coin’s account. Burns never invent profit that was not there.",
    ],
  },
  {
    title: "What you are trusting",
    paragraphs: [
      "The contracts fence the keeper in. Margin can only be deposited to Lighter through the configured pool. Platform fees can only reach the platform wallet. A change to where margin is sent waits two days. Liquidity cannot be removed, because the factory has no path that removes it.",
      "The fence stops at the exchange. Positions on Lighter are operated by an account the protocol does not custody. Holders are trusting that operator to trade the published basket and to return profit. This software is experimental, unaudited, and not financial advice. Leveraged trading can lose the entire margin.",
    ],
  },
];

export default function WhitepaperPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">Sherwood Labs · Whitepaper</p>
      <h1 className="mt-4 font-serif text-6xl leading-[0.9] tracking-tight sm:text-7xl">
        Coins with a job.
      </h1>
      <p className="mt-6 text-xl leading-8 text-mist">
        Sherwood is a launchpad where the coin is also the fund. Trading pays the fund. The fund, when it wins, pays the coin back by destroying it.
      </p>
      <div className="mt-14 space-y-14">
        {CHAPTERS.map((c, i) => (
          <section key={c.title}>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">Chapter 0{i + 1}</p>
            <h2 className="mt-2 font-serif text-4xl leading-tight">{c.title}</h2>
            {c.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-[1.05rem] leading-8 text-paper/90">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
