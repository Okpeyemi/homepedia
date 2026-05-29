"use client";

import { useMemo } from "react";
import {
  ChartLineData01Icon,
  ChartHistogramIcon,
  ChartBarLineIcon,
  Calendar03Icon,
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
import {
  distributionPrix,
  repartitionPieces,
} from "@/lib/mock-data";
import { formatM2, formatNumber, formatPct } from "@/lib/format";
import type { ActiveLocation } from "@/lib/location";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-api";
import { EmptyState } from "@/components/common/empty-state";
import { SourceBadge, type DataSource } from "@/components/common/source-badge";

const MOIS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];

export function StatistiquesTab({ location }: { location: ActiveLocation }) {
  const stats = useAsync(
    (signal) =>
      api.getStats(
        location.insee,
        {
          series:
            "price_per_m2_timeseries,seasonality,quarterly_median,price_distribution,typology_breakdown",
        },
        signal,
      ),
    [location.insee],
  );
  const indicators = useAsync(
    (signal) =>
      api.getIndicators(
        location.insee,
        { keys: "price.evolution_3y,price.median.apartment" },
        signal,
      ),
    [location.insee],
  );

  const evo1y =
    indicators.data?.indicators.find((i) => i.key === "price.median.apartment")?.deltas
      ?.p1y ?? null;

  const series = useMemo(() => {
    const ts = stats.data?.series.find((s) => s.key === "price_per_m2_timeseries");
    const points = ts?.points ?? [];
    return points.slice(-60).map((p) => ({
      date: String(p.t ?? ""),
      appartement: typeof p.apartment === "number" ? p.apartment : null,
      maison: typeof p.house === "number" ? p.house : null,
    }));
  }, [stats.data]);

  const saison = useMemo(() => {
    const s = stats.data?.series.find((x) => x.key === "seasonality");
    const points = s?.points ?? [];
    return points
      .map((p) => ({
        mois: typeof p.month === "number" ? MOIS_FR[(p.month - 1) % 12] : String(p.month ?? ""),
        count: typeof p.count === "number" ? p.count : 0,
      }))
      .sort(
        (a, b) =>
          MOIS_FR.indexOf(a.mois) - MOIS_FR.indexOf(b.mois),
      );
  }, [stats.data]);

  const trimestres = useMemo(() => {
    const s = stats.data?.series.find((x) => x.key === "quarterly_median");
    const points = s?.points ?? [];
    return points.map((p) => ({
      trimestre: String(p.quarter ?? ""),
      prixMedian: typeof p.value === "number" ? p.value : 0,
    }));
  }, [stats.data]);

  const apiDistrib = useMemo(() => {
    const s = stats.data?.series.find((x) => x.key === "price_distribution");
    const points = s?.points;
    if (!points || points.length === 0) return null;
    return points.map((p) => ({
      tranche: String(p.bucket ?? p.label ?? ""),
      count: typeof p.count === "number" ? p.count : 0,
    }));
  }, [stats.data]);

  const apiTypo = useMemo(() => {
    const s = stats.data?.series.find((x) => x.key === "typology_breakdown");
    const points = s?.points;
    if (!points || points.length === 0) return null;
    return points.map((p) => ({
      type: String(p.type ?? p.label ?? ""),
      count: typeof p.count === "number" ? p.count : 0,
      surfaceMediane:
        typeof p.median_surface === "number" ? p.median_surface : 0,
    }));
  }, [stats.data]);

  const distrib = apiDistrib ?? (location.mock ? distributionPrix(location.mock) : []);
  const distribSource: DataSource | null = apiDistrib
    ? "api"
    : location.mock
      ? "mock"
      : null;
  const pieces = apiTypo ?? (location.mock ? repartitionPieces(location.mock) : []);
  const piecesSource: DataSource | null = apiTypo
    ? "api"
    : location.mock
      ? "mock"
      : null;
  const tsSource: DataSource | null = series.length > 0 ? "api" : null;
  const saisonSource: DataSource | null = saison.length > 0 ? "api" : null;
  const trimestresSource: DataSource | null = trimestres.length > 0 ? "api" : null;

  if (stats.error && !location.mock) {
    return (
      <div className="py-4">
        <EmptyState title="Statistiques indisponibles" description={stats.error} />
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      <Block
        title="Évolution du prix médian / m²"
        icon={ChartLineData01Icon}
        hint={
          evo1y != null
            ? `Variation annuelle ${formatPct(evo1y * 100)}`
            : undefined
        }
        source={tsSource}
      >
        {series.length === 0 ? (
          <EmptyAxis />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={series} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="maison"
                stroke="var(--chart-2)"
                strokeWidth={2}
                fill="url(#gMaison)"
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Block>

      <div className="grid gap-4 lg:grid-cols-2">
        <Block
          title="Distribution des prix"
          icon={ChartHistogramIcon}
          source={distribSource}
        >
          {distrib.length === 0 ? (
            <EmptyAxis />
          ) : (
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
          )}
        </Block>

        <Block
          title="Surfaces & typologies"
          icon={ChartBarLineIcon}
          source={piecesSource}
        >
          {pieces.length === 0 ? (
            <EmptyAxis />
          ) : (
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
          )}
        </Block>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="Saisonnalité — volumes" icon={Calendar03Icon} source={saisonSource}>
          {saison.length === 0 ? (
            <EmptyAxis />
          ) : (
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
          )}
        </Block>

        <Block title="Prix médian par trimestre" icon={ChartLineData01Icon} source={trimestresSource}>
          {trimestres.length === 0 ? (
            <EmptyAxis />
          ) : (
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
          )}
        </Block>
      </div>
    </div>
  );
}

function Block({
  title,
  icon,
  hint,
  source,
  children,
}: {
  title: string;
  icon: Parameters<typeof HugeiconsIcon>[0]["icon"];
  hint?: string;
  source?: DataSource | null;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <HugeiconsIcon icon={icon} size={15} className="text-muted-foreground" />
          {title}
          {source && <SourceBadge source={source} />}
        </CardTitle>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </CardHeader>
      <CardContent className="pt-1">{children}</CardContent>
    </Card>
  );
}

function EmptyAxis() {
  return (
    <div className="grid h-[190px] place-items-center text-xs text-muted-foreground">
      Pas de données pour cette série.
    </div>
  );
}
