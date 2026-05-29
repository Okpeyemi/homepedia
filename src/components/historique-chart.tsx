"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { api } from "@/lib/api";
import { useAsync } from "@/lib/use-api";
import { formatM2 } from "@/lib/format";

export function HistoriqueChart({ insee }: { insee: string }) {
  const { data, loading, error } = useAsync(
    (signal) =>
      api.getStats(
        insee,
        { series: "price_per_m2_timeseries", propertyType: "apartment" },
        signal,
      ),
    [insee],
  );

  const points = useMemo(() => {
    const s = data?.series.find((x) => x.key === "price_per_m2_timeseries");
    if (!s) return [];
    return s.points.slice(-36).map((p) => ({
      date: String(p.t ?? ""),
      appartement: typeof p.apartment === "number" ? p.apartment : null,
    }));
  }, [data]);

  if (loading) {
    return (
      <div className="grid h-[220px] place-items-center text-xs text-muted-foreground">
        Chargement…
      </div>
    );
  }
  if (error || points.length === 0) {
    return (
      <div className="grid h-[220px] place-items-center text-xs text-muted-foreground">
        Pas d&apos;historique disponible pour cette commune.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={points} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="gHist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" />
        <XAxis
          dataKey="date"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          minTickGap={32}
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
          dataKey="appartement"
          stroke="var(--chart-1)"
          strokeWidth={2}
          fill="url(#gHist)"
          connectNulls
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
