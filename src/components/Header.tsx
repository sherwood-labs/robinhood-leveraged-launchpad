"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Mark } from "@/components/Mark";
import { useApp } from "@/components/state";
import { cx, shortAddr } from "@/lib/format";

const LINKS = [
  { href: "/coins", label: "Coins" },
  { href: "/burns", label: "Burns" },
  { href: "/claim", label: "Claim" },
  { href: "/docs", label: "Docs" },
];

export function Header() {
  const path = usePathname();
  const { address, disconnect, setWalletOpen } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-pine/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Mark className="size-10 rounded-full" alt="Sherwood Labs" />
          <span className="leading-none">
            <span className="block font-serif text-[1.35rem] tracking-tight text-paper">Sherwood</span>
            <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-mist">Labs</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cx(
                "rounded-full px-3.5 py-2 text-sm transition",
                path.startsWith(l.href) ? "bg-white/10 text-paper" : "text-mist hover:text-paper",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <span className="mr-2 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
            <span className="size-1.5 rounded-full bg-lime shadow-[0_0_10px_#d3fb07]" />
            Robinhood · 4663
          </span>
          {address ? (
            <button
              onClick={disconnect}
              className="rounded-full border border-white/15 px-4 py-2 font-mono text-xs text-paper transition hover:border-lime"
              title="Disconnect preview wallet"
            >
              {shortAddr(address)}
            </button>
          ) : (
            <button
              onClick={() => setWalletOpen(true)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-paper transition hover:border-lime"
            >
              Connect
            </button>
          )}
          <Link href="/launch" className="rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink transition hover:bg-lime-2">
            Launch a coin
          </Link>
        </div>

        <button
          className="ml-auto grid size-10 place-items-center rounded-full border border-white/15 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex w-4 flex-col gap-1">
            <span className={cx("h-px bg-paper transition", open && "translate-y-[5px] rotate-45")} />
            <span className={cx("h-px bg-paper transition", open && "opacity-0")} />
            <span className={cx("h-px bg-paper transition", open && "-translate-y-[5px] -rotate-45")} />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-pine px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-3 py-3 text-lg">
                {l.label}
              </Link>
            ))}
            <Link href="/launch" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-lime px-4 py-3 text-center font-semibold text-ink">
              Launch a coin
            </Link>
            {address ? (
              <button onClick={() => { disconnect(); setOpen(false); }} className="rounded-full border border-white/15 px-4 py-3 font-mono text-sm">
                {shortAddr(address)} · disconnect
              </button>
            ) : (
              <button
                onClick={() => {
                  setWalletOpen(true);
                  setOpen(false);
                }}
                className="rounded-full border border-white/15 px-4 py-3"
              >
                Connect
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function WalletModal() {
  const { walletOpen, setWalletOpen, connect } = useApp();
  if (!walletOpen) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/60 p-4 sm:place-items-center" onClick={() => setWalletOpen(false)}>
      <div
        className="w-full max-w-md rounded-[28px] border border-white/10 bg-canopy p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="wallet-title"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Preview</p>
        <h2 id="wallet-title" className="mt-2 font-serif text-4xl leading-none">
          Enter the woods.
        </h2>
        <p className="mt-3 text-sm leading-6 text-mist">
          This signs you in with a demo wallet on Robinhood Chain so you can walk through launch, trade, and claim. Nothing is sent on-chain.
        </p>
        <button onClick={connect} className="mt-6 w-full rounded-full bg-lime py-3.5 font-semibold text-ink transition hover:bg-lime-2">
          Continue with demo wallet
        </button>
        <button onClick={() => setWalletOpen(false)} className="mt-2 w-full rounded-full py-3 text-sm text-mist">
          Not now
        </button>
      </div>
    </div>
  );
}
