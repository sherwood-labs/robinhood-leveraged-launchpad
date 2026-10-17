import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Docs" };

const SECTIONS = [
  {
    id: "launch",
    title: "Launch",
    body: [
      "createCoin mints a fixed supply of 1,000,000,000 tokens and deposits all of it as single-sided liquidity in a Uniswap v4 ETH/coin pool. The factory owns that position and has no function that removes it.",
      "The basket and the fee are stored on-chain in the same transaction. Afterwards they cannot be changed. Creators do not post a pile of ETH. Buyers’ ETH fills the pool as they trade. Gas is the cost of launching.",
    ],
  },
  {
    id: "trade",
    title: "Trade",
    body: [
      "LeveredHook takes the fee from the ETH side of every swap, including swaps that arrive through other routers. If ETH is the specified amount, the fee is taken before the swap. If ETH is the unspecified amount, it is taken after.",
      "The rate is fixed when the pool is registered, capped at 5%. Accrued fees sit as PoolManager ERC-6909 claims until anyone calls collectFees.",
    ],
  },
  {
    id: "split",
    title: "The split",
    body: [
      "The treasury sends 40% of collected fees to the platform and keeps 60% as trading margin. On current hooks, a separate 1% creator fee is paid in ETH on top of the coin’s fee. It can be aimed at a wallet or at an X, GitHub, or Discord account.",
      "depositMargin swaps the coin’s ETH to USDG through Uniswap v4 and deposits it into Lighter for that coin’s sub-account. Margin can only travel that path.",
    ],
  },
  {
    id: "book",
    title: "The book",
    body: [
      "A keeper sizes each leg as equity × weight × leverage and rebalances when a position drifts more than 10% from its target. A coin may hold up to six markets, each long or short, between 1× and 10×.",
      "Equity perps on Lighter trade 24/5. Outside those hours the keeper waits, then opens or rebalances stock legs when the session resumes. If the portfolio falls 35% from its peak, the keeper closes everything and pauses the coin.",
    ],
  },
  {
    id: "burn",
    title: "Burn",
    body: [
      "When the portfolio is 10% above its high-water mark, the keeper realizes half of that gain and sends 75% of it back on-chain. buybackAndBurn buys the coin from the pool and destroys it.",
      "Defend mode, the bot tax, and the volatility fee can also route value into burns. A cross-chain buy that arrives from Solana pays the same fee, and that fee is routed to burns rather than into new margin.",
    ],
  },
  {
    id: "trust",
    title: "Trust",
    body: [
      "The contracts limit what the keeper can do on-chain. Returned profit can only buy back and burn. Platform fees can only go to the platform wallet. A margin destination change sits behind a two-day timelock. The owner can pause new launches and new margin deposits.",
      "Positions on Lighter are managed by the operator’s account. Holders rely on the operator for the off-chain trading. The contracts have not been independently audited.",
    ],
  },
];

const ADDRESSES = [
  ["LeveredFactory", "0x019e1242e8d4b76Bc0A1dca1B912daA04323d355"],
  ["LeveredHook", "0xf6fbd259fd80be4dc9131efd7ed6f2089aa6e0cc"],
  ["LeveredRouter", "0x15e2db8885a9fa6e5d79c4875687898fdf4e88e3"],
  ["Metadata", "0xa55D5E6E5e80C22Ad09e7743E95D2152C09d800B"],
  ["PoolManager", "0x8366a39CC670B4001A1121B8F6A443A643e40951"],
];

export default function DocsPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[200px_1fr] lg:py-20">
      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">On this page</p>
        <ul className="mt-4 space-y-2 text-sm">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="text-mist hover:text-lime">
                {s.title}
              </a>
            </li>
          ))}
          <li>
            <a href="#addresses" className="text-mist hover:text-lime">
              Addresses
            </a>
          </li>
        </ul>
      </aside>
      <article>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Docs</p>
        <h1 className="mt-3 font-serif text-6xl leading-[0.9] tracking-tight">How a Sherwood coin works.</h1>
        <p className="mt-5 max-w-2xl text-lg text-mist">
          A plain account of the launchpad on Robinhood Chain. For the longer argument, read the <Link href="/whitepaper" className="text-lime">whitepaper</Link>.
        </p>
        <div className="mt-12 space-y-12">
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-white/10 pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">0{i + 1}</p>
              <h2 className="mt-2 font-serif text-4xl">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-4 max-w-2xl leading-7 text-mist">
                  {p}
                </p>
              ))}
            </section>
          ))}
          <section id="addresses" className="scroll-mt-28 border-t border-white/10 pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime">06</p>
            <h2 className="mt-2 font-serif text-4xl">Mainnet addresses</h2>
            <p className="mt-4 text-mist">Robinhood Chain, chain id 4663.</p>
            <ul className="mt-6 divide-y divide-white/10 rounded-[28px] border border-white/10">
              {ADDRESSES.map(([name, addr]) => (
                <li key={name} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span>{name}</span>
                  <a
                    className="font-mono text-xs text-lime hover:underline"
                    href={`https://robinhoodchain.blockscout.com/address/${addr}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {addr}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
}
