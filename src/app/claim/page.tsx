import type { Metadata } from "next";
import { ClaimDesk } from "@/components/claim/ClaimDesk";

export const metadata: Metadata = { title: "Claim" };

export default function ClaimPage() {
  return (
    <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">Creator fee</p>
        <h1 className="mt-3 font-serif text-6xl leading-[0.9] tracking-tight">
          A fee with
          <br />
          <span className="italic">your name on it.</span>
        </h1>
        <p className="mt-5 max-w-md text-mist">
          If a coin pointed its 1% at your X, GitHub, or Discord account, sign in with that account and choose a wallet. Until then the ETH waits in the treasury. Nobody else can take it.
        </p>
        <ul className="mt-8 space-y-3 text-sm text-mist">
          <li className="flex gap-3"><span className="text-lime">01</span> The handle is locked when the coin launches.</li>
          <li className="flex gap-3"><span className="text-lime">02</span> You prove the account, then name a wallet.</li>
          <li className="flex gap-3"><span className="text-lime">03</span> The treasury pays you in ETH. There is nothing to stake.</li>
        </ul>
      </div>
      <ClaimDesk />
    </div>
  );
}
