"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { COINS, type Coin } from "@/lib/data";

const DEMO = "0xA21c88d04e91b09c4F17d3aE6b90c11e4d8a91c4";

type State = {
  address: string | null;
  connect: () => void;
  disconnect: () => void;
  walletOpen: boolean;
  setWalletOpen: (open: boolean) => void;
  coins: Coin[];
  launch: (coin: Coin) => void;
};

const Ctx = createContext<State | null>(null);

export function AppState({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [walletOpen, setWalletOpen] = useState(false);
  const [extra, setExtra] = useState<Coin[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sherwood-preview");
      if (raw) {
        const parsed = JSON.parse(raw) as { address?: string | null; extra?: Coin[] };
        if (parsed.address) setAddress(parsed.address);
        if (Array.isArray(parsed.extra)) setExtra(parsed.extra);
      }
    } catch {
      /* preview store is optional */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("sherwood-preview", JSON.stringify({ address, extra }));
  }, [address, extra, ready]);

  const value = useMemo<State>(
    () => ({
      address,
      connect: () => {
        setAddress(DEMO);
        setWalletOpen(false);
      },
      disconnect: () => setAddress(null),
      walletOpen,
      setWalletOpen,
      coins: [...extra, ...COINS],
      launch: (coin) => setExtra((prev) => [coin, ...prev.filter((c) => c.slug !== coin.slug)]),
    }),
    [address, extra, walletOpen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppState");
  return ctx;
}
