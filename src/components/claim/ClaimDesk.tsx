"use client";

import { useState } from "react";
import { useApp } from "@/components/state";
import { cx } from "@/lib/format";

const PLATFORMS = ["X", "GitHub", "Discord"] as const;

export function ClaimDesk() {
  const { address, setWalletOpen } = useApp();
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("X");
  const [handle, setHandle] = useState("sherwood");
  const [phase, setPhase] = useState<"form" | "ready" | "paid">("form");

  function lookup() {
    if (handle.trim().length < 2) return;
    setPhase("ready");
  }

  function claim() {
    if (!address) {
      setWalletOpen(true);
      return;
    }
    setPhase("paid");
  }

  return (
    <div className="rounded-[32px] border border-white/10 bg-canopy p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Find a fee</p>
      <div className="mt-4 flex gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => {
              setPlatform(p);
              setPhase("form");
            }}
            className={cx("rounded-full px-3 py-1.5 text-sm", platform === p ? "bg-lime text-ink" : "border border-white/15 text-mist")}
          >
            {p}
          </button>
        ))}
      </div>
      <label className="mt-5 block" htmlFor="handle">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">{platform} handle</span>
        <div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-pine px-4">
          <span className="text-mist">@</span>
          <input
            id="handle"
            value={handle}
            onChange={(e) => {
              setHandle(e.target.value.replace(/^@/, ""));
              setPhase("form");
            }}
            className="w-full bg-transparent py-4 pl-1 font-serif text-3xl outline-none"
          />
        </div>
      </label>

      {phase === "form" && (
        <button onClick={lookup} className="mt-5 w-full rounded-full bg-lime py-3.5 font-semibold text-ink">
          Look up @{handle || "handle"}
        </button>
      )}

      {phase !== "form" && (
        <div className="mt-6 rounded-[24px] bg-lime p-5 text-ink">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em]">Waiting in treasury</p>
          <p className="mt-2 font-serif text-5xl leading-none">0.084 ETH</p>
          <p className="mt-2 text-sm text-ink/70">
            From Greenwood and Arrow, pointed at {platform} @{handle}. Preview balance.
          </p>
          {phase === "paid" ? (
            <p className="mt-4 rounded-2xl bg-ink px-4 py-3 text-sm text-lime">Marked paid to your demo wallet. Nothing moved on-chain.</p>
          ) : (
            <button onClick={claim} className="mt-4 w-full rounded-full bg-ink py-3 font-semibold text-lime">
              {address ? "Claim to demo wallet" : "Connect to claim"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
