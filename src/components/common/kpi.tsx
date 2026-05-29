import { Card, CardContent } from "@/components/ui/card";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { SourceBadge, type DataSource } from "@/components/common/source-badge";

export function Kpi({
  label,
  value,
  hint,
  icon,
  delta,
  tone = "neutral",
  className,
  source,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: IconSvgElement;
  delta?: { value: number; suffix?: string };
  tone?: "neutral" | "positive" | "negative";
  className?: string;
  source?: DataSource;
}) {
  const deltaTone =
    delta == null
      ? ""
      : delta.value > 0
        ? "text-emerald-600 dark:text-emerald-400"
        : delta.value < 0
          ? "text-rose-600 dark:text-rose-400"
          : "text-muted-foreground";

  const ring = {
    neutral: "ring-border",
    positive: "ring-emerald-500/40",
    negative: "ring-rose-500/40",
  }[tone];

  return (
    <Card className={cn("ring-1 ring-inset border-0 shadow-none", ring, className)}>
      <CardContent className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            <span className="truncate">{label}</span>
            {source && <SourceBadge source={source} />}
          </p>
          <div className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight">
            {value}
          </div>
          {hint != null && (
            <p className="mt-1 text-xs text-muted-foreground truncate">{hint}</p>
          )}
          {delta && (
            <p className={cn("mt-2 text-xs font-medium tabular-nums", deltaTone)}>
              {delta.value > 0 ? "+" : ""}
              {delta.value.toFixed(1)}%{delta.suffix ? ` ${delta.suffix}` : ""}
            </p>
          )}
        </div>
        {icon && (
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
            <HugeiconsIcon icon={icon} size={18} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
