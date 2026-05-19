"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EyeIcon,
  Tag01Icon,
  ChartBarLineIcon,
  Tree01Icon,
  ArrowLeft01Icon,
  MapsIcon,
  Fire03Icon,
  Layers01Icon,
  Location04Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { communes } from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { MapLegend } from "@/components/map/map-legend";
import { ApercuTab } from "@/components/panels/apercu-tab";
import { AnnoncesTab } from "@/components/panels/annonces-tab";
import { StatistiquesTab } from "@/components/panels/statistiques-tab";
import { QuartierTab } from "@/components/panels/quartier-tab";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatNumber } from "@/lib/format";

const CityMap = dynamic(() => import("@/components/map/city-map").then((m) => m.CityMap), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center bg-muted/30">
      <div className="text-sm text-muted-foreground">Chargement de la carte…</div>
    </div>
  ),
});

type Density = "choroplèthe" | "heatmap" | "annonces";

export function CarteShell() {
  const [communeId, setCommuneId] = useState(communes[0].id);
  const [density, setDensity] = useState<Density>("choroplèthe");
  const [dark, setDark] = useState(false);
  const [panelOpen, setPanelOpen] = useState(true);

  useEffect(() => {
    const update = () =>
      setDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const selected = useMemo(
    () => communes.find((c) => c.id === communeId) ?? communes[0],
    [communeId],
  );

  const onSelect = useCallback((id: string) => {
    setCommuneId(id);
    setPanelOpen(true);
  }, []);

  return (
    <div className="relative flex flex-1 min-h-0 overflow-hidden">
      <div className="relative flex-1">
        <CityMap selectedId={communeId} onSelect={onSelect} density={density} dark={dark} />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 sm:p-4">
          <div className="pointer-events-auto flex items-center gap-2 rounded-xl border border-border bg-card/90 px-2 py-1.5 shadow-sm backdrop-blur">
            <HugeiconsIcon icon={Location04Icon} size={16} className="ml-1 text-primary" />
            <Select
              value={communeId}
              onValueChange={(v) => v && setCommuneId(v)}
            >
              <SelectTrigger
                size="sm"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0 min-w-[200px]"
              >
                <SelectValue>
                  {(v: string | null) => {
                    const c = communes.find((x) => x.id === v);
                    return c ? `${c.nom} · ${c.codePostal}` : "Choisir une commune";
                  }}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {communes.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nom} <span className="text-muted-foreground">· {c.codePostal}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="pointer-events-auto rounded-xl border border-border bg-card/90 p-1 shadow-sm backdrop-blur">
            <ToggleGroup
              value={[density]}
              onValueChange={(arr) => arr[0] && setDensity(arr[0] as Density)}
              variant="default"
              size="sm"
              className="gap-0.5"
            >
              <ToggleGroupItem value="choroplèthe" className="gap-1.5">
                <HugeiconsIcon icon={MapsIcon} size={14} />
                <span className="hidden sm:inline">Prix m²</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="heatmap" className="gap-1.5">
                <HugeiconsIcon icon={Fire03Icon} size={14} />
                <span className="hidden sm:inline">Densité</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="annonces" className="gap-1.5">
                <HugeiconsIcon icon={Layers01Icon} size={14} />
                <span className="hidden sm:inline">Annonces</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex flex-col items-start gap-2 sm:bottom-4 sm:left-4">
          <MapLegend density={density} />
          <div className="pointer-events-auto rounded-xl border border-border bg-card/90 px-3 py-2 text-xs shadow-sm backdrop-blur">
            <div className="font-semibold">{selected.nom}</div>
            <div className="mt-0.5 text-muted-foreground">
              {selected.codePostal} · {formatNumber(selected.population)} hab.
            </div>
          </div>
        </div>

        {!panelOpen && (
          <button
            type="button"
            onClick={() => setPanelOpen(true)}
            className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-l-xl border border-r-0 border-border bg-card/95 px-2 py-3 shadow-md backdrop-blur transition-colors hover:bg-accent"
            aria-label="Ouvrir le panneau"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          </button>
        )}
      </div>

      <aside
        data-open={panelOpen}
        className="z-20 flex w-full max-w-[600px] shrink-0 flex-col border-l border-border bg-background transition-[width,opacity] duration-300 data-[open=false]:w-0 data-[open=false]:opacity-0 data-[open=true]:opacity-100 lg:w-[520px] xl:w-[560px] 2xl:w-[600px]"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <div>
            <div className="text-sm font-semibold leading-tight">{selected.nom}</div>
            <div className="text-xs text-muted-foreground">
              {selected.codePostal} · {selected.departement}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto h-8 w-8"
            onClick={() => setPanelOpen(false)}
            aria-label="Réduire"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              className="rotate-180"
            />
          </Button>
        </div>

        <Tabs defaultValue="apercu" className="flex min-h-0 flex-1 flex-col">
          <div className="border-b border-border bg-muted/30 px-2 pt-2 pb-6">
            <TabsList className="grid w-full grid-cols-4 bg-transparent p-0 gap-1">
              <TabTrig value="apercu" icon={EyeIcon}>
                Aperçu
              </TabTrig>
              <TabTrig value="annonces" icon={Tag01Icon}>
                Annonces
              </TabTrig>
              <TabTrig value="stats" icon={ChartBarLineIcon}>
                Stats
              </TabTrig>
              <TabTrig value="quartier" icon={Tree01Icon}>
                Quartier
              </TabTrig>
            </TabsList>
          </div>

          <ScrollArea className="min-h-0 flex-1 overflow-hidden">
            <div className="px-4 pb-6">
              <TabsContent value="apercu" className="mt-0">
                <ApercuTab commune={selected} />
              </TabsContent>
              <TabsContent value="annonces" className="mt-0">
                <AnnoncesTab commune={selected} />
              </TabsContent>
              <TabsContent value="stats" className="mt-0">
                <StatistiquesTab commune={selected} />
              </TabsContent>
              <TabsContent value="quartier" className="mt-0">
                <QuartierTab commune={selected} />
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </aside>
    </div>
  );
}

function TabTrig({
  value,
  icon,
  children,
}: {
  value: string;
  icon: Parameters<typeof HugeiconsIcon>[0]["icon"];
  children: React.ReactNode;
}) {
  return (
    <TabsTrigger
      value={value}
      className="flex flex-col items-center gap-0.5 rounded-md px-2 py-1.5 text-[11px] data-[state=active]:bg-card data-[state=active]:shadow-sm"
    >
      <HugeiconsIcon icon={icon} size={16} />
      <span>{children}</span>
    </TabsTrigger>
  );
}
