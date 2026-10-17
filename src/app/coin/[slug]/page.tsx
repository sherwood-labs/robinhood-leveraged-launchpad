import type { Metadata } from "next";
import { CoinView } from "@/components/coin/CoinView";
import { COINS } from "@/lib/data";

export function generateStaticParams() {
  return COINS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const coin = COINS.find((c) => c.slug === slug);
  return { title: coin ? `${coin.name} $${coin.symbol}` : "Coin" };
}

export default async function CoinPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CoinView slug={slug} />;
}
