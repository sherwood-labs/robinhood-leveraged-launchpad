"use client";

import { useState } from "react";
import { cx } from "@/lib/format";

const PLATFORMS = ["Me", "X", "GitHub", "Discord"] as const;

const LINES = [
  ["buy 0.42 ETH", "+0.0042"],
  ["sell 1.18 ETH", "+0.0118"],
  ["buy 2.60 ETH", "+0.0260"],
];

export function CreatorDesk() {
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]>("X");
  const handle = platform === "Me" ? "your wallet" : "@sherwood";

  return (
    <div className="rounded-[28px] bg-lime p-6 text-ink sm:p-8">
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
        <span>Who gets the 1%</span>
        <span>Example</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={cx(
              "rounded-full px-3 py-1.5 text-sm font-semibold transition",
              platform === p ? "bg-ink text-lime" : "bg-ink/10 hover:bg-ink/20",
            )}
          >
            {p}
          </button>
        ))}
      </div>
      <p className="mt-8 border-b border-ink/20 pb-3 font-serif text-5xl leading-none">{handle}</p>
      <ul className="mt-4 space-y-2 font-mono text-sm">
        {LINES.map(([a, b]) => (
          <li key={a} className="flex items-center justify-between gap-4">
            <span>{a}</span>
            <span className="font-medium">
              {b} → {handle}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
