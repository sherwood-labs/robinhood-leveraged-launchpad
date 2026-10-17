export type Side = "long" | "short";
export type Kind = "stock" | "crypto" | "commodity";

export type Leg = {
  symbol: string;
  name: string;
  kind: Kind;
  side: Side;
  weight: number;
  leverage: number;
};

export type Coin = {
  slug: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  marketCap: number;
  volume: number;
  burned: number;
  fee: number;
  holders: number;
  supply: number;
  created: string;
  description: string;
  creator: string;
  feeTarget: string;
  legs: Leg[];
  series: number[];
};

export type Market = {
  symbol: string;
  name: string;
  kind: Kind;
  price: number;
  change: number;
};

export type BurnEvent = {
  id: string;
  slug: string;
  symbol: string;
  name: string;
  eth: number;
  tokens: number;
  when: string;
  reason: string;
};

export const MARKETS: Market[] = [
  { symbol: "SPY", name: "S&P 500", kind: "stock", price: 572.4, change: 0.42 },
  { symbol: "QQQ", name: "Nasdaq 100", kind: "stock", price: 498.1, change: 0.71 },
  { symbol: "NVDA", name: "NVIDIA", kind: "stock", price: 138.2, change: 1.84 },
  { symbol: "TSLA", name: "Tesla", kind: "stock", price: 248.6, change: -1.22 },
  { symbol: "AAPL", name: "Apple", kind: "stock", price: 228.4, change: 0.18 },
  { symbol: "AMZN", name: "Amazon", kind: "stock", price: 186.9, change: 0.55 },
  { symbol: "META", name: "Meta", kind: "stock", price: 582.3, change: -0.34 },
  { symbol: "BTC", name: "Bitcoin", kind: "crypto", price: 67240, change: 1.12 },
  { symbol: "ETH", name: "Ether", kind: "crypto", price: 3450, change: 0.64 },
  { symbol: "SOL", name: "Solana", kind: "crypto", price: 178.4, change: 2.41 },
  { symbol: "GOLD", name: "Gold", kind: "commodity", price: 2684, change: 0.22 },
  { symbol: "OIL", name: "Crude oil", kind: "commodity", price: 74.8, change: -0.91 },
];

function walk(seed: number, start: number, drift: number) {
  let x = seed;
  const next = () => {
    x = (x * 16807) % 2147483647;
    return (x % 1000) / 1000;
  };
  const out = [start];
  for (let i = 0; i < 40; i++) {
    const last = out[out.length - 1]!;
    out.push(last * (1 + drift + (next() - 0.5) * 0.018));
  }
  return out.map((v) => Math.round(v * 1e6) / 1e6);
}

export const COINS: Coin[] = [
  {
    slug: "greenwood",
    name: "Greenwood",
    symbol: "WOOD",
    price: 0.00482,
    change: 6.4,
    marketCap: 4820000,
    volume: 1284000,
    burned: 4.8,
    fee: 2,
    holders: 1842,
    supply: 1_000_000_000,
    created: "Mar 2",
    description:
      "A balanced Sherwood book: long the S&P, long bitcoin, short Tesla. Fees refill the margin, and profits come home as burns.",
    creator: "0xA21c88d04e91b09c4F17d3aE6b90c11e4d8a91c4",
    feeTarget: "x:sherwood",
    legs: [
      { symbol: "SPY", name: "S&P 500", kind: "stock", side: "long", weight: 40, leverage: 2 },
      { symbol: "BTC", name: "Bitcoin", kind: "crypto", side: "long", weight: 30, leverage: 3 },
      { symbol: "TSLA", name: "Tesla", kind: "stock", side: "short", weight: 30, leverage: 2 },
    ],
    series: walk(11, 0.0034, 0.004),
  },
  {
    slug: "longbow",
    name: "Longbow",
    symbol: "BOW",
    price: 0.0114,
    change: 12.8,
    marketCap: 11400000,
    volume: 2460000,
    burned: 7.2,
    fee: 3,
    holders: 3104,
    supply: 1_000_000_000,
    created: "Feb 18",
    description: "A high-draw crypto book. Bitcoin and Solana, both long, both levered. The quiver is small on purpose.",
    creator: "0x44e19ac01bb208d44c90e11aa09d771c88e21b90",
    feeTarget: "wallet",
    legs: [
      { symbol: "BTC", name: "Bitcoin", kind: "crypto", side: "long", weight: 60, leverage: 4 },
      { symbol: "SOL", name: "Solana", kind: "crypto", side: "long", weight: 40, leverage: 3 },
    ],
    series: walk(42, 0.006, 0.008),
  },
  {
    slug: "sheriff",
    name: "Sheriff",
    symbol: "STAR",
    price: 0.00215,
    change: -3.1,
    marketCap: 2150000,
    volume: 640000,
    burned: 1.4,
    fee: 2,
    holders: 906,
    supply: 1_000_000_000,
    created: "Apr 9",
    description: "Nasdaq and Apple on the long side, crude on the short. A quieter book that still earns its fee in ETH.",
    creator: "0x90c11e4d8a21c88d04e91b09c4F17d3aE6b90a44",
    feeTarget: "github:glen",
    legs: [
      { symbol: "QQQ", name: "Nasdaq 100", kind: "stock", side: "long", weight: 40, leverage: 2 },
      { symbol: "AAPL", name: "Apple", kind: "stock", side: "long", weight: 30, leverage: 2 },
      { symbol: "OIL", name: "Crude oil", kind: "commodity", side: "short", weight: 30, leverage: 2 },
    ],
    series: walk(7, 0.0026, -0.002),
  },
  {
    slug: "quiver",
    name: "Quiver",
    symbol: "QUIV",
    price: 0.0077,
    change: 2.2,
    marketCap: 7700000,
    volume: 990000,
    burned: 3.1,
    fee: 1,
    holders: 1508,
    supply: 1_000_000_000,
    created: "Jan 29",
    description: "NVIDIA heavy, with ether and gold as the calm legs. Locked at launch. The basket does not drift into a new story.",
    creator: "0x17d3aE6b90c11e4d8a21c88d04e91b09c4F17a90",
    feeTarget: "discord:range",
    legs: [
      { symbol: "NVDA", name: "NVIDIA", kind: "stock", side: "long", weight: 50, leverage: 2 },
      { symbol: "ETH", name: "Ether", kind: "crypto", side: "long", weight: 30, leverage: 2 },
      { symbol: "GOLD", name: "Gold", kind: "commodity", side: "long", weight: 20, leverage: 1 },
    ],
    series: walk(19, 0.0055, 0.003),
  },
  {
    slug: "yeoman",
    name: "Yeoman",
    symbol: "YEOM",
    price: 0.00142,
    change: -8.4,
    marketCap: 1420000,
    volume: 410000,
    burned: 0.6,
    fee: 4,
    holders: 488,
    supply: 1_000_000_000,
    created: "May 1",
    description: "A broad equity basket. Amazon, Meta, and the Nasdaq, modest leverage, a higher fee while the book is young.",
    creator: "0x8a21c88d04e91b09c4F17d3aE6b90c11e4d8b221",
    feeTarget: "wallet",
    legs: [
      { symbol: "AMZN", name: "Amazon", kind: "stock", side: "long", weight: 34, leverage: 2 },
      { symbol: "META", name: "Meta", kind: "stock", side: "long", weight: 33, leverage: 2 },
      { symbol: "QQQ", name: "Nasdaq 100", kind: "stock", side: "long", weight: 33, leverage: 1 },
    ],
    series: walk(3, 0.0021, -0.004),
  },
  {
    slug: "arrow",
    name: "Arrow",
    symbol: "ARW",
    price: 0.00905,
    change: 4.6,
    marketCap: 9050000,
    volume: 1710000,
    burned: 5.5,
    fee: 2,
    holders: 2201,
    supply: 1_000_000_000,
    created: "Mar 21",
    description: "Long NVIDIA, long bitcoin, short Tesla. The same quarrel, drawn a little tighter than Greenwood.",
    creator: "0xc11e4d8a21c88d04e91b09c4F17d3aE6b90c11e4",
    feeTarget: "x:arrowdesk",
    legs: [
      { symbol: "NVDA", name: "NVIDIA", kind: "stock", side: "long", weight: 40, leverage: 3 },
      { symbol: "BTC", name: "Bitcoin", kind: "crypto", side: "long", weight: 35, leverage: 2 },
      { symbol: "TSLA", name: "Tesla", kind: "stock", side: "short", weight: 25, leverage: 3 },
    ],
    series: walk(27, 0.0062, 0.005),
  },
];

export const BURNS: BurnEvent[] = [
  { id: "b1", slug: "longbow", symbol: "BOW", name: "Longbow", eth: 4.82, tokens: 18_400_000, when: "Oct 16", reason: "10% above high-water mark" },
  { id: "b2", slug: "greenwood", symbol: "WOOD", name: "Greenwood", eth: 2.14, tokens: 9_100_000, when: "Oct 15", reason: "Realized profit, 75% returned" },
  { id: "b3", slug: "arrow", symbol: "ARW", name: "Arrow", eth: 1.66, tokens: 6_400_000, when: "Oct 14", reason: "Volatility fee, half to burn" },
  { id: "b4", slug: "quiver", symbol: "QUIV", name: "Quiver", eth: 0.94, tokens: 3_200_000, when: "Oct 12", reason: "Defend mode, six-hour window" },
  { id: "b5", slug: "longbow", symbol: "BOW", name: "Longbow", eth: 3.4, tokens: 12_800_000, when: "Oct 9", reason: "10% above high-water mark" },
  { id: "b6", slug: "greenwood", symbol: "WOOD", name: "Greenwood", eth: 1.22, tokens: 5_050_000, when: "Oct 7", reason: "Solana route fee" },
  { id: "b7", slug: "sheriff", symbol: "STAR", name: "Sheriff", eth: 0.48, tokens: 1_900_000, when: "Oct 4", reason: "Realized profit, 75% returned" },
  { id: "b8", slug: "arrow", symbol: "ARW", name: "Arrow", eth: 2.08, tokens: 7_700_000, when: "Sep 28", reason: "10% above high-water mark" },
];

export const FAQ: [string, string][] = [
  [
    "Where does the margin come from?",
    "From trading fees. Every buy and sell pays the coin’s fee, between 1% and 5%, in ETH through a Uniswap v4 hook. Sixty percent is swapped to USDG and deposited on Lighter as that coin’s margin. Forty percent goes to the platform.",
  ],
  [
    "Do creators earn anything?",
    "Yes. On current coins, every trade also pays 1% in ETH to the creator. It can sit in the launcher’s wallet, or it can be aimed at an X, GitHub, or Discord account. That aim is locked at launch.",
  ],
  [
    "Who places the trades?",
    "A keeper run by the operator. It sizes each leg as equity × weight × leverage inside the coin’s own Lighter sub-account, and it rebalances when a position drifts more than 10% from its target.",
  ],
  [
    "What if the portfolio loses?",
    "If it falls 35% from its high, the keeper closes every position and pauses the coin. At 2× leverage that is roughly a 17% market drop, well before liquidation. Burns only come from profit above the previous high.",
  ],
  [
    "When does profit get burned?",
    "When the book is 10% above its high-water mark, the keeper locks in half of that gain and sends 75% of it back on-chain. There, buyback-and-burn purchases the coin and destroys it. Supply only goes down.",
  ],
  [
    "Do I need ETH to launch?",
    "No treasury of ETH. The full 1,000,000,000 supply is deposited as single-sided liquidity in a Uniswap v4 pool, locked in the factory. You pay gas. Buyers’ ETH fills the pool as they trade.",
  ],
];

export const RECEIPTS = [
  { label: "Traded", value: "$7.49M", hint: "2,171 ETH" },
  { label: "Fees earned", value: "$412K", hint: "119 ETH" },
  { label: "Sent to Lighter", value: "$248K", hint: "72 ETH" },
  { label: "Bought & burned", value: "$186K", hint: "54 ETH" },
  { label: "Paid to creators", value: "$96K", hint: "28 ETH" },
  { label: "Trades", value: "18,420", hint: "6 coins in preview" },
];

export function coinBySlug(slug: string) {
  return COINS.find((c) => c.slug === slug);
}

export function activityFor(coin: Coin) {
  const seeds = [
    ["buy", 0.42, "0x91c4…a21e", "2m"],
    ["sell", 1.18, "0x44e1…b208", "11m"],
    ["buy", 0.26, "0x17d3…c88d", "28m"],
    ["buy", 2.6, "0x8a21…b221", "1h"],
    ["sell", 0.54, "0xc11e…11e4", "3h"],
    ["burn", 0.31, "treasury", "5h"],
  ] as const;
  return seeds.map(([side, amount, who, time]) => ({ side, amount, who, time }));
}
