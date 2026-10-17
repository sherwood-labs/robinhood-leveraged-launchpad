import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="w-44 overflow-hidden rounded-3xl bg-lime">
            {/* Full lockup, background matched to the logo field. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpg" alt="Sherwood Labs" className="w-full" />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-mist">
            Sherwood is a coin launchpad on Robinhood Chain. Every coin funds its own leveraged book, and profits buy the coin back.
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Walk</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/coins" className="hover:text-lime">Coins</Link></li>
            <li><Link href="/launch" className="hover:text-lime">Launch</Link></li>
            <li><Link href="/burns" className="hover:text-lime">Burns</Link></li>
            <li><Link href="/claim" className="hover:text-lime">Claim a fee</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Read</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/docs" className="hover:text-lime">Docs</Link></li>
            <li><Link href="/whitepaper" className="hover:text-lime">Whitepaper</Link></li>
            <li>
              <a className="hover:text-lime" href="https://robinhoodchain.blockscout.com" target="_blank" rel="noreferrer">
                Blockscout
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-xs leading-5 text-mist/80 sm:px-8">
          Experimental software. Leveraged trading can lose the entire margin. Nothing here is financial advice. The contracts have not been independently audited. Preview balances in this interface are illustrative.
        </p>
      </div>
    </footer>
  );
}
