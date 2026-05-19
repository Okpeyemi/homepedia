"use client";

import {
  ShieldUserIcon,
  SchoolIcon,
  BusIcon,
  Leaf01Icon,
  TrainIcon,
  UserGroup02Icon,
  House01Icon,
  WorkIcon,
  Comment01Icon,
  TickDouble01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScorePill } from "@/components/common/score-pill";
import { Kpi } from "@/components/common/kpi";
import type { Commune } from "@/lib/types";
import { formatEUR, formatNumber, formatPct } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export function QuartierTab({ commune }: { commune: Commune }) {
  return (
    <div className="space-y-4 py-2">
      <section>
        <SectionTitle>Qualité de vie</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <ScorePill icon={ShieldUserIcon} label="Sécurité" score={commune.scores.securite} />
          <ScorePill icon={SchoolIcon} label="Éducation" score={commune.scores.education} />
          <ScorePill icon={BusIcon} label="Transport" score={commune.scores.transport} />
          <ScorePill icon={Leaf01Icon} label="Environnement" score={commune.scores.environnement} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <HugeiconsIcon icon={SchoolIcon} size={15} />
              Éducation
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-y-2 text-sm">
            <Row label="Maternelles" value={commune.education.maternelles} />
            <Row label="Primaires" value={commune.education.primaires} />
            <Row label="Collèges" value={commune.education.colleges} />
            <Row label="Lycées" value={commune.education.lycees} />
            <div className="col-span-2 mt-2 rounded-lg bg-muted/40 p-2 text-xs">
              Distance moyenne lycée :{" "}
              <span className="font-semibold">{commune.education.distanceLyceeMoyenne} m</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <HugeiconsIcon icon={TrainIcon} size={15} />
              Transports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Row label="Arrêts TC (500 m)" value={commune.transport.arretsRayon500m} />
            <Row
              label="Gare"
              value={
                <span className="inline-flex items-center gap-1.5">
                  {commune.transport.gare ? (
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
                      Oui
                    </Badge>
                  ) : (
                    <Badge variant="outline">Non</Badge>
                  )}
                  <span className="text-muted-foreground tabular-nums">
                    {commune.transport.distanceGare} m
                  </span>
                </span>
              }
            />
          </CardContent>
        </Card>
      </div>

      <section>
        <SectionTitle>Démographie (INSEE)</SectionTitle>
        <div className="grid grid-cols-2 gap-3">
          <Kpi
            label="Population"
            value={formatNumber(commune.population)}
            icon={UserGroup02Icon}
            delta={{ value: commune.populationEvol10ans, suffix: "10 ans" }}
          />
          <Kpi
            label="Taux chômage"
            value={`${commune.tauxChomage}%`}
            icon={WorkIcon}
          />
          <Kpi
            label="Revenu médian"
            value={formatEUR(commune.revenuMedian)}
            hint="par UC"
            icon={House01Icon}
          />
          <Kpi
            label="Propriétaires"
            value={`${commune.partProprietaires}%`}
            hint={`${commune.partResidencesPrincipales}% résid. princ.`}
            icon={House01Icon}
          />
        </div>
      </section>

      <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm font-medium">
            <HugeiconsIcon icon={Comment01Icon} size={15} className="text-muted-foreground" />
            Analyse des avis
            <span className="ml-auto text-xs font-normal text-muted-foreground">
              {formatNumber(commune.avis.nombreAvis)} avis · {commune.avis.source}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span>Sentiment global</span>
              <span className="ml-auto tabular-nums">
                {commune.avis.sentimentGlobal.positif}% positif ·{" "}
                {commune.avis.sentimentGlobal.neutre}% neutre ·{" "}
                {commune.avis.sentimentGlobal.negatif}% négatif
              </span>
            </div>
            <div className="flex h-2.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-emerald-500"
                style={{ width: `${commune.avis.sentimentGlobal.positif}%` }}
              />
              <div
                className="bg-amber-400"
                style={{ width: `${commune.avis.sentimentGlobal.neutre}%` }}
              />
              <div
                className="bg-rose-500"
                style={{ width: `${commune.avis.sentimentGlobal.negatif}%` }}
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <HugeiconsIcon icon={TickDouble01Icon} size={14} />
                Points positifs
              </div>
              <ul className="space-y-1.5 text-sm">
                {commune.avis.topPositifs.map((p) => (
                  <li
                    key={p}
                    className="rounded-md bg-emerald-500/10 px-2.5 py-1 text-emerald-900 dark:text-emerald-200"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400">
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
                Points négatifs
              </div>
              <ul className="space-y-1.5 text-sm">
                {commune.avis.topNegatifs.map((p) => (
                  <li
                    key={p}
                    className="rounded-md bg-rose-500/10 px-2.5 py-1 text-rose-900 dark:text-rose-200"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-medium text-muted-foreground">Termes fréquents</div>
            <div className="flex flex-wrap gap-1.5">
              {commune.avis.wordCloud.map((w) => {
                const fs = 10 + (w.poids / 100) * 12;
                const opacity = 0.5 + w.poids / 200;
                return (
                  <span
                    key={w.mot}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-primary"
                    style={{ fontSize: `${fs}px`, opacity }}
                  >
                    {w.mot}
                  </span>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {children}
    </h3>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/60 py-1.5 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}
