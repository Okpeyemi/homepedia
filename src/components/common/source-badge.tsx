import { cn } from "@/lib/utils";

export type DataSource = "api" | "mock";

const STYLES: Record<DataSource, { className: string; label: string; title: string }> = {
  api: {
    className:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    label: "API",
    title: "Donnée servie par l'API",
  },
  mock: {
    className:
      "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    label: "Démo",
    title: "Donnée fictive (mock local)",
  },
};

export function SourceBadge({
  source,
  className,
}: {
  source: DataSource;
  className?: string;
}) {
  const s = STYLES[source];
  return (
    <span
      title={s.title}
      className={cn(
        "inline-flex h-4 items-center rounded border px-1 text-[9px] font-semibold uppercase leading-none tracking-wider",
        s.className,
        className,
      )}
    >
      {s.label}
    </span>
  );
}
