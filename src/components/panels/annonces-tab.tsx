"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FilterIcon,
  Building03Icon,
  House01Icon,
  Maximize01Icon,
  BedIcon,
  Calendar03Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Commune } from "@/lib/types";
import { getAnnoncesByCommune } from "@/lib/mock-data";
import { formatEUR, formatM2, formatNumber, formatSurface } from "@/lib/format";
import { DpeBadge } from "@/components/common/dpe-badge";
import { Badge } from "@/components/ui/badge";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortMode = "recent" | "prix-asc" | "prix-desc" | "m2-asc" | "m2-desc";

export function AnnoncesTab({ commune }: { commune: Commune }) {
  const all = useMemo(() => getAnnoncesByCommune(commune.id), [commune]);
  const [type, setType] = useState<"all" | "appartement" | "maison">("all");
  const [sort, setSort] = useState<SortMode>("recent");

  const filtered = useMemo(() => {
    let xs = all;
    if (type !== "all") xs = xs.filter((a) => a.type === type);
    const sorters: Record<SortMode, (a: typeof xs[number], b: typeof xs[number]) => number> = {
      recent: (a, b) => b.dateMiseEnLigne.localeCompare(a.dateMiseEnLigne),
      "prix-asc": (a, b) => a.prix - b.prix,
      "prix-desc": (a, b) => b.prix - a.prix,
      "m2-asc": (a, b) => a.prixM2 - b.prixM2,
      "m2-desc": (a, b) => b.prixM2 - a.prixM2,
    };
    return [...xs].sort(sorters[sort]);
  }, [all, type, sort]);

  const medianPrix = useMemo(() => {
    if (!filtered.length) return 0;
    const sorted = [...filtered].map((a) => a.prix).sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }, [filtered]);

  const medianSurface = useMemo(() => {
    if (!filtered.length) return 0;
    const sorted = [...filtered].map((a) => a.surface).sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }, [filtered]);

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 pb-3">
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/50 p-3 text-sm">
          <Stat label="Annonces" value={formatNumber(filtered.length)} />
          <Stat label="Prix médian" value={formatEUR(medianPrix)} />
          <Stat label="Surface médiane" value={formatSurface(medianSurface)} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup
            value={[type]}
            onValueChange={(arr) => arr[0] && setType(arr[0] as typeof type)}
            size="sm"
            variant="outline"
          >
            <ToggleGroupItem value="all" className="px-3">
              Tous
            </ToggleGroupItem>
            <ToggleGroupItem value="appartement" className="px-3 gap-1.5">
              <HugeiconsIcon icon={Building03Icon} size={14} />
              Appart.
            </ToggleGroupItem>
            <ToggleGroupItem value="maison" className="px-3 gap-1.5">
              <HugeiconsIcon icon={House01Icon} size={14} />
              Maison
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={sort} onValueChange={(v) => v && setSort(v as SortMode)}>
            <SelectTrigger size="sm" className="ml-auto h-8 w-[170px]">
              <HugeiconsIcon icon={FilterIcon} size={14} />
              <SelectValue placeholder="Trier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus récentes</SelectItem>
              <SelectItem value="prix-asc">Prix croissant</SelectItem>
              <SelectItem value="prix-desc">Prix décroissant</SelectItem>
              <SelectItem value="m2-asc">€/m² croissant</SelectItem>
              <SelectItem value="m2-desc">€/m² décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2.5 pr-1">
        {filtered.map((a) => (
          <Link
            key={a.id}
            href={`/annonce/${a.id}`}
            className="group block rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent/30"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <HugeiconsIcon
                  icon={a.type === "appartement" ? Building03Icon : House01Icon}
                  size={20}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{a.titre}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.adresse}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold tabular-nums">{formatEUR(a.prix)}</div>
                    <div className="text-[11px] text-muted-foreground tabular-nums">
                      {formatM2(a.prixM2)}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <HugeiconsIcon icon={Maximize01Icon} size={13} />
                    {a.surface} m²
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <HugeiconsIcon icon={BedIcon} size={13} />
                    {a.pieces} pièces
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <HugeiconsIcon icon={Calendar03Icon} size={13} />
                    {new Date(a.dateMiseEnLigne).toLocaleDateString("fr-FR")}
                  </span>
                  <Badge variant="outline" className="ml-auto gap-1 py-0.5 pr-2 pl-1 text-[10px]">
                    <DpeBadge value={a.dpe} size="sm" />
                    DPE {a.dpe}
                  </Badge>
                </div>
              </div>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="mt-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-base font-semibold tabular-nums">{value}</div>
    </div>
  );
}
