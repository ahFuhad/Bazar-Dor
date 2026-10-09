type PriceBadgeProps = {
  direction: "up" | "down" | "flat";
  percentage: number;
};

export default function PriceBadge({
  direction,
  percentage,
}: PriceBadgeProps) {
  if (direction === "flat") {
    return (
      <span className="inline-flex items-center gap-1 rounded-xl bg-[#F0F5F0] px-2 py-1 text-xs font-semibold text-[#1D271F]/60">
        — ০.০%
      </span>
    );
  }

  const isUp = direction === "up";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-xl px-2 py-1 text-xs font-semibold ${
        isUp
          ? "bg-[#F0F5F0] text-[#D03739]"
          : "bg-[#F0F5F0] text-[#1A9951]"
      }`}
    >
      {isUp ? "▲" : "▼"} {Math.abs(percentage)}%
    </span>
  );
}