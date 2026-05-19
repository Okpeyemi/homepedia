"use client";

import { useMemo } from "react";
import {
  ChartLineData01Icon,
  ChartHistogramIcon,
  ChartBarLineIcon,
  Calendar03Icon,
  Building03Icon,
  House01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Commune } from "@/lib/types";
import {
  distributionPrix,
  repartitionPieces,
  saisonnaliteVolumes,
  serieHistoriquePrix,
  trimestresPrix,
} from "@/lib/mock-data";
import { formatM2, formatNumber, formatPct } from "@/lib/format";

export function StatistiquesTab({ commune }: { commune: Commune }) {
  const serie = useMemo(() => serieHistoriquePrix(commune), [commune]);
  const distrib = useMemo(() => distributionPrix(commune), [commune]);
  const pieces = useMemo(() => repartitionPieces(commune), [commune]);
  const saison = useMemo(() => saisonnaliteVolumes(commune), [commune]);
  const trimestres = useMemo(() => trimestresPrix(commune), [commune]);

  return (
    <div className="space-y-4 py-2">
      <Block
        title="Évolution du prix médian / m²"
        icon={ChartLineData01Icon}
        hint={`Variation annuelle ${formatPct(commune.evolutionPrix1an)}`}
      >
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={serie} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gAppart" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.04} />
              </linearGradient>
              <linearGradient id="gMaison" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
            <XAxis
              dataKey="date"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              minTickGap={28}
              stroke="var(--muted-foreground)"
            />
            <YAxis
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={48}
              stroke="var(--muted-foreground)"
              tickFormatter={(v) => `${Math.round(v / 100) / 10}k`}
            />
            <Tooltip
              cursor={{ stroke: "var(--primary)", strokeOpacity: 0.4 }}
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v, name) => [formatM2(Number(v)), name === "appartement" ? "Appart." : "Maison"]}
            />
            <Legend
              iconType="plainline"
              wrapperStyle={{ fontSize: 11 }}
              formatter={(v) => (v === "appartement" ? "Appartement" : "Maison")}
            />
            <Area
              type="monotone"
              dataKey="appartement"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#gAppart)"
            />
            <Area
              type="monotone"
              dataKey="maison"
              stroke="var(--chart-2)"
              strokeWidth={2}
              fill="url(#gMaison)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Block>

      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="Distribution des prix" icon={ChartHistogramIcon}>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={distrib} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
              <XAxis
                dataKey="tranche"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                stroke="var(--muted-foreground)"
              />
              <YAxis
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={28}
                stroke="var(--muted-foreground)"
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v) => [formatNumber(Number(v)), "Annonces"]}
              />
              <Bar dataKey="count" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Block>

        <Block title="Surfaces & typologies" icon={ChartBarLineIcon}>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={pieces} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
              <XAxis
                dataKey="type"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                stroke="var(--muted-foreground)"
              />
              <YAxis
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={28}
                stroke="var(--muted-foreground)"
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v, name) =>
                  name === "count"
                    ? [formatNumber(Number(v)), "Annonces"]
                    : [`${v} m²`, "Surface médiane"]
                }
              />
              <Legend
                wrapperStyle={{ fontSize: 11 }}
                formatter={(v) => (v === "count" ? "Annonces" : "Surface méd.")}
              />
              <Bar dataKey="count" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="surfaceMediane" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Block>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="Saisonnalité — volumes" icon={Calendar03Icon}>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={saison} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
              <XAxis
                dataKey="mois"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                stroke="var(--muted-foreground)"
              />
              <YAxis
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={28}
                stroke="var(--muted-foreground)"
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v) => [formatNumber(Number(v)), "Ventes"]}
              />
              <Bar dataKey="count" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Block>

        <Block title="Prix médian par trimestre" icon={ChartLineData01Icon}>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={trimestres} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gTri" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--chart-4)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
              <XAxis
                dataKey="trimestre"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                stroke="var(--muted-foreground)"
              />
              <YAxis
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={40}
                stroke="var(--muted-foreground)"
                tickFormatter={(v) => `${Math.round(v / 100) / 10}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
                formatter={(v) => [formatM2(Number(v)), "Médian"]}
              />
              <Area
                type="monotone"
                dataKey="prixMedian"
                stroke="var(--chart-4)"
                strokeWidth={2}
                fill="url(#gTri)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Block>
      </div>

      <Block title="Comparaison géographique" icon={ChartBarLineIcon}>
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Indicateur</th>
                <th className="px-3 py-2 text-right font-medium">{commune.nom}</th>
                <th className="px-3 py-2 text-right font-medium">{commune.departement}</th>
                <th className="px-3 py-2 text-right font-medium">{commune.region}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <Row
                label="Prix médian / m²"
                v1={formatM2(commune.prixMedianM2.appartement)}
                v2={formatM2(commune.medianeDepartement)}
                v3={formatM2(commune.medianeRegion)}
              />
              <Row
                label="Évolution 1 an"
                v1={formatPct(commune.evolutionPrix1an)}
                v2={formatPct(commune.evolutionPrix1an + 0.4)}
                v3={formatPct(commune.evolutionPrix1an + 0.9)}
              />
              <Row
                label="Volume transactions"
                v1={formatNumber(commune.volumeTransactions12m)}
                v2={formatNumber(Math.round(commune.volumeTransactions12m * 14.2))}
                v3={formatNumber(Math.round(commune.volumeTransactions12m * 86))}
              />
              <Row
                label="DPE moyen"
                v1={commune.dpeMoyen}
                v2="D"
                v3="D"
              />
            </tbody>
          </table>
        </div>
      </Block>
    </div>
  );
}

function Block({
  title,
  icon,
  hint,
  children,
}: {
  title: string;
  icon: Parameters<typeof HugeiconsIcon>[0]["icon"];
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <HugeiconsIcon icon={icon} size={15} className="text-muted-foreground" />
          {title}
        </CardTitle>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </CardHeader>
      <CardContent className="pt-1">{children}</CardContent>
    </Card>
  );
}

function Row({ label, v1, v2, v3 }: { label: string; v1: string; v2: string; v3: string }) {
  return (
    <tr>
      <td className="px-3 py-2 text-muted-foreground">{label}</td>
      <td className="px-3 py-2 text-right font-medium tabular-nums">{v1}</td>
      <td className="px-3 py-2 text-right tabular-nums">{v2}</td>
      <td className="px-3 py-2 text-right tabular-nums">{v3}</td>
    </tr>
  );
}
