import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";

export function ScorePill({
  label,
  score,
  icon,
  max = 10,
  className,
}: {
  label: string;
  score: number;
  icon: IconSvgElement;
  max?: number;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(1, score / max));
  const tone =
    pct >= 0.75
      ? "text-emerald-600 dark:text-emerald-400"
      : pct >= 0.55
        ? "text-amber-600 dark:text-amber-400"
        : "text-rose-600 dark:text-rose-400";

  return (
    <div className={cn("rounded-xl border border-border bg-card p-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HugeiconsIcon icon={icon} size={16} />
          <span>{label}</span>
        </div>
        <span className={cn("text-base font-semibold tabular-nums", tone)}>
          {score.toFixed(1)}
          <span className="text-muted-foreground text-xs font-normal">/{max}</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct * 100}%` }}
        />
      </div>
    </div>
  );
}
