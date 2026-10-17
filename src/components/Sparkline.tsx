export function Sparkline({
  data,
  up = true,
  className = "",
}: {
  data: number[];
  up?: boolean;
  className?: string;
}) {
  const w = 320;
  const h = 96;
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const pad = (hi - lo || 1) * 0.18;
  const min = lo - pad;
  const max = hi + pad;
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 10) - 5;
    return [x, y] as const;
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const fill = `${d} L${w},${h} L0,${h} Z`;
  const color = up ? "#D3FB07" : "#FF5C39";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden>
      <path d={fill} fill={color} opacity="0.16" />
      <path d={d} fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export function Chart({ data, up = true }: { data: number[]; up?: boolean }) {
  const w = 720;
  const h = 280;
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const pad = (hi - lo || 1) * 0.2;
  const min = lo - pad;
  const max = hi + pad;
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 36) - 18;
    return [x, y] as const;
  });
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const fill = `${d} L${w},${h} L0,${h} Z`;
  const color = up ? "#D3FB07" : "#FF5C39";
  const last = pts[pts.length - 1]!;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" role="img" aria-label="Price history">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={w} y1={h * g} y2={h * g} stroke="rgba(255,255,255,0.08)" />
      ))}
      <path d={fill} fill={color} opacity="0.14" />
      <path d={d} fill="none" stroke={color} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="5" fill={color} />
      <circle cx={last[0]} cy={last[1]} r="10" fill={color} opacity="0.25" />
    </svg>
  );
}
