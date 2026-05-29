"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";

export function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: Parameters<typeof HugeiconsIcon>[0]["icon"];
}) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-6 text-center">
      <HugeiconsIcon
        icon={icon ?? InformationCircleIcon}
        size={22}
        className="mx-auto text-muted-foreground"
      />
      <div className="mt-2 text-sm font-medium">{title}</div>
      {description && (
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
