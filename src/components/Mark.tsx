import { cx } from "@/lib/format";

export function Mark({ className, alt = "" }: { className?: string; alt?: string }) {
  return (
    // The emblem is a square crop of the Sherwood Labs badge. Rounding it restores the forest ring.
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/emblem.png" alt={alt} className={cx("bg-lime object-cover", className)} />
  );
}
