"use client";

import { useMemo } from "react";
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
import type { DpeClass } from "@/lib/types";
import {
  formatEUR,
  formatEURCompact,
  formatM2,
  formatNumber,
  formatPct,
  dpeColors,
} from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ActiveLocation } from "@/lib/location";
import { api, findIndicator, numericIndicator, rangeIndicator } from "@/lib/api";
import { useAsync } from "@/lib/use-api";
import { EmptyState } from "@/components/common/empty-state";

const DPE_ORDER: DpeClass[] = ["A", "B", "C", "D", "E", "F", "G"];

export function ApercuTab({ location }: { location: ActiveLocation }) {
  const { data, loading, error } = useAsync(
    (signal) => api.getIndicators(location.insee, undefined, signal),
    [location.insee],
  );
  const commune = location.mock;

  const apt = numericIndicator(data, "price.median.apartment");
  const aptDelta = findIndicator(data, "price.median.apartment")?.deltas?.p1y;
  const house = numericIndicator(data, "price.median.house");
  const houseDelta = findIndicator(data, "price.median.house")?.deltas?.p1y;
  const mean = numericIndicator(data, "price.mean");
  const range = rangeIndicator(data, "price.range");
  const evo3y = numericIndicator(data, "price.evolution_3y");
  const evo5y = numericIndicator(data, "price.evolution_5y");
  const trx = numericIndicator(data, "transactions.count.12m");
  const saleDuration = numericIndicator(data, "sale.duration.median");
  const salesVolume = numericIndicator(data, "sales.volume.eur.12m");
  const listingsCount = numericIndicator(data, "listings.active.count");
  const listingsMedM2 = numericIndicator(data, "listings.active.median_eur_m2");
  const splitInd = findIndicator(data, "listings.split.apartment_house");
  const split =
    splitInd && typeof splitInd.value === "object" && splitInd.value && !Array.isArray(splitInd.value)
      ? (splitInd.value as { apartment: number; house: number })
      : null;

  const aptValue = apt ?? commune?.prixMedianM2.appartement ?? null;
  const houseValue = house ?? commune?.prixMedianM2.maison ?? null;
  const meanValue = mean ?? commune?.prixMoyenM2 ?? null;
  const rangeMin = range?.[0] ?? commune?.prixMinM2 ?? null;
  const rangeMax = range?.[1] ?? commune?.prixMaxM2 ?? null;
  const evo5yValue =
    evo5y != null ? evo5y * 100 : commune?.evolutionPrix5ans ?? null;
  const evo3yValue =
    evo3y != null ? evo3y * 100 : commune?.evolutionPrix3ans ?? null;
  const evo1yApt =
    aptDelta != null ? aptDelta * 100 : commune?.evolutionPrix1an ?? null;
  const evo1yHouse =
    houseDelta != null ? houseDelta * 100 : commune?.evolutionPrix1an ?? null;
  const trxValue = trx ?? commune?.volumeTransactions12m ?? null;
  const saleDurationValue = saleDuration ?? commune?.delaiMoyenVente ?? null;
  const salesVolumeValue =
    salesVolume ??
    (commune
      ? commune.volumeTransactions12m * commune.prixMoyenM2 * 55
      : null);
  const listingsCountValue = listingsCount;
  const listingsMedValue = listingsMedM2;
  const splitApt =
    split != null
      ? Math.round(split.apartment * 100)
      : commune?.repartitionTypes.appartement ?? null;
  const splitHouse =
    split != null
      ? Math.round(split.house * 100)
      : commune?.repartitionTypes.maison ?? null;

  const ecartDept = useMemo(() => {
    if (!commune || aptValue == null) return null;
    return ((aptValue - commune.medianeDepartement) / commune.medianeDepartement) * 100;
  }, [commune, aptValue]);
  const ecartRegion = useMemo(() => {
    if (!commune || aptValue == null) return null;
    return ((aptValue - commune.medianeRegion) / commune.medianeRegion) * 100;
  }, [commune, aptValue]);

  if (error && !commune) {
    return (
      <div className="py-4">
        <EmptyState
          title="Indicateurs indisponibles"
          description={error}
        />
      </div>
    );
  }

  return (
    <div className="space-y-5 py-2">
      <section>
        <SectionTitle icon={Money01Icon}>
          Prix immobilier
          {loading && <span className="ml-auto text-[10px] text-muted-foreground">chargement…</span>}
        </SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Kpi
            label="Médian appart."
            value={aptValue != null ? formatM2(aptValue) : "—"}
            hint="par m²"
            icon={Building03Icon}
            delta={evo1yApt != null ? { value: evo1yApt, suffix: "1 an" } : undefined}
          />
          <Kpi
            label="Médian maison"
            value={houseValue != null ? formatM2(houseValue) : "—"}
            hint="par m²"
            icon={House01Icon}
            delta={evo1yHouse != null ? { value: evo1yHouse, suffix: "1 an" } : undefined}
          />
          <Kpi
            label="Prix moyen"
            value={meanValue != null ? formatM2(meanValue) : "—"}
            hint={
              rangeMin != null && rangeMax != null
                ? `Plage ${formatM2(rangeMin)} – ${formatM2(rangeMax)}`
                : undefined
            }
            icon={ChartLineData01Icon}
          />
          <Kpi
            label="Évolution"
            value={
              evo5yValue != null
                ? formatPct(evo5yValue)
                : evo3yValue != null
                  ? formatPct(evo3yValue)
                  : "—"
            }
            hint={
              evo5yValue != null && evo3yValue != null
                ? `5 ans · 3 ans : ${formatPct(evo3yValue)}`
                : evo5yValue != null
                  ? "5 ans"
                  : evo3yValue != null
                    ? "3 ans"
                    : undefined
            }
            icon={
              (evo5yValue ?? evo3yValue ?? 0) > 0
                ? ArrowUpRight01Icon
                : ArrowDownRight01Icon
            }
            tone={
              (evo5yValue ?? evo3yValue ?? 0) > 0 ? "positive" : "negative"
            }
          />
        </div>

        {commune && ecartDept != null && ecartRegion != null && (
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
        )}
      </section>

      <section>
        <SectionTitle icon={ChartLineData01Icon}>Volume de marché</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          <Kpi
            label="Transactions / 12 mois"
            value={trxValue != null ? formatNumber(trxValue) : "—"}
            icon={ChartLineData01Icon}
            delta={
              commune
                ? { value: commune.evolutionVolume }
                : undefined
            }
          />
          <Kpi
            label="Délai moyen vente"
            value={saleDurationValue != null ? `${Math.round(saleDurationValue)} j` : "—"}
            hint="médiane"
            icon={Calendar03Icon}
          />
          <Kpi
            label="Volume €"
            value={salesVolumeValue != null ? formatEURCompact(salesVolumeValue) : "—"}
            hint="12 mois"
            icon={Money01Icon}
          />
        </div>
      </section>

      <section>
        <SectionTitle icon={Tag01Icon}>Annonces actives</SectionTitle>
        <div className="grid grid-cols-3 gap-3">
          <Kpi
            label="Annonces"
            value={listingsCountValue != null ? formatNumber(listingsCountValue) : "—"}
            icon={Tag01Icon}
          />
          <Kpi
            label="Prix médian"
            value={listingsMedValue != null ? formatM2(listingsMedValue) : "—"}
            hint="annonces actives"
            icon={Money01Icon}
          />
          <Kpi
            label="Répartition"
            value={splitApt != null ? `${splitApt}%` : "—"}
            hint={splitHouse != null ? `appart · ${splitHouse}% maison` : undefined}
            icon={Building03Icon}
          />
        </div>
        {meanValue != null && (
          <p className="mt-2 text-[11px] text-muted-foreground">
            Référence prix m² (transactions sur 12 mois) :{" "}
            <span className="tabular-nums">{formatEUR(meanValue)}</span> /m².
          </p>
        )}
      </section>

      {commune && (
        <section>
          <SectionTitle>Score énergétique</SectionTitle>
          <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
            <CardContent className="space-y-3 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Classe la plus fréquente
                </div>
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
                      <div className="mt-1 tabular-nums">
                        {commune.repartitionDpe[c]}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}
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
