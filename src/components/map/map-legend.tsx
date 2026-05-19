"use client";

import { useMemo } from "react";
import { communes } from "@/lib/mock-data";
import { formatM2, formatNumber } from "@/lib/format";

type Density = "choroplèthe" | "heatmap" | "annonces";

const MODES: Record<
  Density,
  {
    title: string;
    subtitle: string;
    sizeHint: string;
    stops: number[]; // hue offsets at t=0,0.25,0.5,0.75,1
    range: (cs: typeof communes) => { min: string; max: string };
  }
> = {
  choroplèthe: {
    title: "Prix médian / m²",
    subtitle: "Appartements · données DVF",
    sizeHint: "Taille ∝ prix",
    stops: [195, 156, 117, 78, 20],
    range: (cs) => {
      const sorted = [...cs].sort(
        (a, b) => a.prixMedianM2.appartement - b.prixMedianM2.appartement,
      );
      return {
        min: formatM2(sorted[0].prixMedianM2.appartement),
        max: formatM2(sorted[sorted.length - 1].prixMedianM2.appartement),
      };
    },
  },
  heatmap: {
    title: "Densité de transactions",
    subtitle: "12 derniers mois",
    sizeHint: "Taille ∝ volume",
    stops: [350, 335, 320, 305, 290],
    range: (cs) => {
      const sorted = [...cs].sort(
        (a, b) => a.volumeTransactions12m - b.volumeTransactions12m,
      );
      return {
        min: `${formatNumber(sorted[0].volumeTransactions12m)} ventes`,
        max: `${formatNumber(sorted[sorted.length - 1].volumeTransactions12m)} ventes`,
      };
    },
  },
  annonces: {
    title: "Annonces actives",
    subtitle: "Estimation par population",
    sizeHint: "Taille ∝ √population",
    stops: [195, 156, 117, 78, 20],
    range: (cs) => {
      const sorted = [...cs].sort((a, b) => a.population - b.population);
      return {
        min: `${formatNumber(sorted[0].population)} hab.`,
        max: `${formatNumber(sorted[sorted.length - 1].population)} hab.`,
      };
    },
  },
};

export function MapLegend({ density }: { density: Density }) {
  const mode = MODES[density];
  const range = useMemo(() => mode.range(communes), [mode]);

  const gradient = `linear-gradient(to right, ${mode.stops
    .map((h, i) => {
      const t = i / (mode.stops.length - 1);
      return `oklch(${0.62 - t * 0.1} ${0.16 + t * 0.05} ${h}) ${(t * 100).toFixed(0)}%`;
    })
    .join(", ")})`;

  return (
    <div className="pointer-events-auto w-[260px] rounded-xl border border-border bg-card/95 p-3 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-semibold tracking-tight">{mode.title}</div>
          <div className="text-[10px] text-muted-foreground">{mode.subtitle}</div>
        </div>
        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
          {mode.sizeHint}
        </span>
      </div>

      <div
        className="mt-2.5 h-2 w-full rounded-full ring-1 ring-inset ring-border/60"
        style={{ background: gradient }}
        aria-hidden
      />

      <div className="mt-1.5 flex items-center justify-between text-[10px] tabular-nums text-muted-foreground">
        <span>{range.min}</span>
        <span className="text-foreground/70">médiane panel</span>
        <span>{range.max}</span>
      </div>

      <div className="mt-2.5 flex items-center gap-2 border-t border-border/60 pt-2 text-[10px] text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block size-2 rounded-full"
            style={{ background: `oklch(0.62 0.16 ${mode.stops[0]})` }}
          />
          bas
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block size-2.5 rounded-full"
            style={{ background: `oklch(0.58 0.18 ${mode.stops[Math.floor(mode.stops.length / 2)]})` }}
          />
          moyen
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block size-3 rounded-full"
            style={{ background: `oklch(0.52 0.21 ${mode.stops[mode.stops.length - 1]})` }}
          />
          haut
        </span>
        <span className="ml-auto inline-flex items-center gap-1">
          <span className="inline-block size-3 rounded-full ring-2 ring-primary/60 ring-offset-1 ring-offset-card bg-card" />
          sélectionnée
        </span>
      </div>
    </div>
  );
}
