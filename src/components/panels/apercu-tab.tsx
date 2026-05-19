"use client";

import {
  Money01Icon,
  ChartLineData01Icon,
  Building03Icon,
  House01Icon,
  ArrowUpRight01Icon,
  ArrowDownRight01Icon,
  Calendar03Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Kpi } from "@/components/common/kpi";
import { DpeBadge } from "@/components/common/dpe-badge";
import type { Commune, DpeClass } from "@/lib/types";
import {
  formatEURCompact,
  formatM2,
  formatNumber,
  formatPct,
  dpeColors,
} from "@/lib/format";
import { getAnnoncesByCommune } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DPE_ORDER: DpeClass[] = ["A", "B", "C", "D", "E", "F", "G"];

export function ApercuTab({ commune }: { commune: Commune }) {
  const annonces = getAnnoncesByCommune(commune.id);
  const prixMedianAnnonces = (() => {
    const sorted = [...annonces].map((a) => a.prixM2).sort((a, b) => a - b);
    return sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  })();
  const ecartDept = ((commune.prixMedianM2.appartement - commune.medianeDepartement) / commune.medianeDepartement) * 100;
  const ecartRegion = ((commune.prixMedianM2.appartement - commune.medianeRegion) / commune.medianeRegion) * 100;

  return (
    <div className="space-y-5 py-2">
      <section>
        <SectionTitle icon={Money01Icon}>Prix immobilier</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Kpi
            label="Médian appart."
            value={formatM2(commune.prixMedianM2.appartement)}
            hint="par m²"
            icon={Building03Icon}
            delta={{ value: commune.evolutionPrix1an, suffix: "1 an" }}
          />
          <Kpi
            label="Médian maison"
            value={formatM2(commune.prixMedianM2.maison)}
            hint="par m²"
            icon={House01Icon}
            delta={{ value: commune.evolutionPrix1an + 0.6, suffix: "1 an" }}
          />
          <Kpi
            label="Prix moyen"
            value={formatM2(commune.prixMoyenM2)}
            hint={`Plage ${formatM2(commune.prixMinM2)} – ${formatM2(commune.prixMaxM2)}`}
            icon={ChartLineData01Icon}
          />
          <Kpi
            label="Évolution 5 ans"
            value={formatPct(commune.evolutionPrix5ans)}
            hint={`3 ans : ${formatPct(commune.evolutionPrix3ans)}`}
            icon={commune.evolutionPrix5ans > 0 ? ArrowUpRight01Icon : ArrowDownRight01Icon}
            tone={commune.evolutionPrix5ans > 0 ? "positive" : "negative"}
          />
        </div>

        <Card className="mt-3 border-0 ring-1 ring-inset ring-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Positionnement géographique
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-sm">
            <RowVs
              label="vs médiane département"
              value={commune.medianeDepartement}
              ecart={ecartDept}
            />
            <RowVs
              label="vs médiane région"
              value={commune.medianeRegion}
              ecart={ecartRegion}
            />
          </CardContent>
        </Card>
      </section>

      <section>
        <SectionTitle icon={ChartLineData01Icon}>Volume de marché</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          <Kpi
            label="Transactions / 12 mois"
            value={formatNumber(commune.volumeTransactions12m)}
            icon={ChartLineData01Icon}
            delta={{ value: commune.evolutionVolume }}
          />
          <Kpi
            label="Délai moyen vente"
            value={`${commune.delaiMoyenVente} j`}
            hint="médiane"
            icon={Calendar03Icon}
          />
          <Kpi
            label="Volume €"
            value={formatEURCompact(commune.volumeTransactions12m * commune.prixMoyenM2 * 55)}
            hint="estimé"
            icon={Money01Icon}
          />
        </div>
      </section>

      <section>
        <SectionTitle icon={Tag01Icon}>Annonces actives</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          <Kpi label="Annonces" value={formatNumber(annonces.length)} icon={Tag01Icon} />
          <Kpi label="Prix médian" value={formatM2(prixMedianAnnonces)} icon={Money01Icon} />
          <Kpi
            label="Répartition"
            value={`${commune.repartitionTypes.appartement}%`}
            hint={`appart · ${commune.repartitionTypes.maison}% maison`}
            icon={Building03Icon}
          />
        </div>
      </section>

      <section>
        <SectionTitle>Score énergétique</SectionTitle>
        <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
          <CardContent className="space-y-3 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Classe la plus fréquente</div>
              <DpeBadge value={commune.dpeMoyen} size="lg" />
            </div>
            <div>
              <div className="flex h-3 w-full overflow-hidden rounded-full">
                {DPE_ORDER.map((c) => (
                  <div
                    key={c}
                    style={{
                      width: `${commune.repartitionDpe[c]}%`,
                      backgroundColor: dpeColors[c],
                    }}
                  />
                ))}
              </div>
              <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
                {DPE_ORDER.map((c) => (
                  <div key={c}>
                    <DpeBadge value={c} size="sm" />
                    <div className="mt-1 tabular-nums">{commune.repartitionDpe[c]}%</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function SectionTitle({
  icon,
  children,
}: {
  icon?: Parameters<typeof HugeiconsIcon>[0]["icon"];
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {icon && <HugeiconsIcon icon={icon} size={14} />}
      {children}
    </h3>
  );
}

function RowVs({ label, value, ecart }: { label: string; value: number; ecart: number }) {
  return (
    <div className="space-y-0.5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-base font-semibold tabular-nums">{formatM2(value)}</div>
      <div
        className={
          ecart > 0
            ? "text-xs font-medium text-rose-600 dark:text-rose-400 tabular-nums"
            : "text-xs font-medium text-emerald-600 dark:text-emerald-400 tabular-nums"
        }
      >
        {ecart > 0 ? "+" : ""}
        {ecart.toFixed(1)}% {ecart > 0 ? "plus cher" : "moins cher"}
      </div>
    </div>
  );
}
