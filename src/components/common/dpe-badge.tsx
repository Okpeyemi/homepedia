import { cn } from "@/lib/utils";
import { dpeColors } from "@/lib/format";
import type { DpeClass } from "@/lib/types";

export function DpeBadge({
  value,
  size = "md",
  className,
}: {
  value: DpeClass;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = {
    sm: "h-5 w-5 text-[10px]",
    md: "h-7 w-7 text-xs",
    lg: "h-10 w-10 text-sm",
  }[size];

  return (
    <span
      className={cn(
        "inline-grid place-items-center font-bold rounded-md text-zinc-900",
        dims,
        className,
      )}
      style={{ backgroundColor: dpeColors[value] }}
      aria-label={`DPE ${value}`}
    >
      {value}
    </span>
  );
}
