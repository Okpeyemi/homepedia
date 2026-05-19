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
import { getCommune, serieHistoriquePrix } from "@/lib/mock-data";
import { formatM2 } from "@/lib/format";

export function HistoriqueChart({ communeId }: { communeId: string }) {
  const commune = getCommune(communeId);
  const data = useMemo(() => {
    if (!commune) return [];
    return serieHistoriquePrix(commune).slice(-36);
  }, [commune]);

  if (!commune) return null;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
