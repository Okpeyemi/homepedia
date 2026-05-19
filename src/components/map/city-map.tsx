"use client";

import { useEffect, useMemo, useRef } from "react";
import maplibregl, { Map, Marker, Popup } from "maplibre-gl";
import { communes } from "@/lib/mock-data";
import { formatM2 } from "@/lib/format";

export function CityMap({
  selectedId,
  onSelect,
  density = "choroplèthe",
  dark = false,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
  density?: "choroplèthe" | "heatmap" | "annonces";
  dark?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const popupRef = useRef<Popup | null>(null);

  const selected = useMemo(
    () => communes.find((c) => c.id === selectedId) ?? communes[0],
    [selectedId],
  );

  const sortedByPrice = useMemo(
    () => [...communes].sort((a, b) => a.prixMedianM2.appartement - b.prixMedianM2.appartement),
    [],
  );

  const tileURL = dark
    ? "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
    : "https://basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          carto: {
            type: "raster",
            tiles: [tileURL],
            tileSize: 256,
            attribution,
          },
        },
        layers: [{ id: "carto", type: "raster", source: "carto" }],
        glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
      },
      center: [2.6, 46.6],
      zoom: 5.2,
      attributionControl: false,
    });
    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }));
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update tiles when theme changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const onLoad = () => {
      const source = map.getSource("carto") as maplibregl.RasterTileSource | undefined;
      if (source) {
        source.setTiles([tileURL]);
      }
    };
    if (map.isStyleLoaded()) onLoad();
    else map.once("load", onLoad);
  }, [tileURL]);

  // Recreate markers when density mode or selection changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const ensure = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      const min = sortedByPrice[0].prixMedianM2.appartement;
      const max = sortedByPrice[sortedByPrice.length - 1].prixMedianM2.appartement;

      for (const c of communes) {
        const t = (c.prixMedianM2.appartement - min) / Math.max(1, max - min);
        const isSelected = c.id === selected.id;

        const baseSize =
          density === "heatmap" ? 18 + Math.round(c.volumeTransactions12m / 90)
          : density === "annonces" ? 16 + Math.round(Math.sqrt(c.population) / 12)
          : 22 + Math.round(t * 28);
        const size = isSelected ? baseSize + 8 : baseSize;

        const hue =
          density === "heatmap"
            ? 350 - t * 60
            : 195 - t * 175;
        const color = `oklch(${0.62 - t * 0.1} ${0.16 + t * 0.05} ${hue})`;

        const el = document.createElement("div");
        el.className = "hp-marker";
        el.style.cssText = `width:${size}px;height:${size}px;`;

        const inner = document.createElement("button");
        inner.type = "button";
        inner.setAttribute("aria-label", c.nom);
        inner.style.cssText = `
          width:100%;height:100%;border-radius:9999px;
          background:${color};
          border:2px solid ${isSelected ? "var(--primary)" : "rgba(255,255,255,0.85)"};
          box-shadow: 0 2px 10px -2px rgba(0,0,0,.35), 0 0 0 ${isSelected ? "4px" : "0"} color-mix(in oklch, var(--primary) 25%, transparent);
          cursor:pointer;display:grid;place-items:center;color:#fff;font-size:10px;font-weight:600;
          transition: transform .15s ease, box-shadow .15s ease;
          padding:0;
        `;
        inner.textContent = density === "annonces" ? "" : `${Math.round(c.prixMedianM2.appartement / 100) / 10}k`;
        el.appendChild(inner);

        inner.addEventListener("mouseenter", () => {
          inner.style.transform = "scale(1.12)";
          if (popupRef.current) popupRef.current.remove();
          popupRef.current = new maplibregl.Popup({ closeButton: false, offset: 14 })
            .setLngLat(c.centre)
            .setHTML(
              `<div style="min-width:170px">
                <div style="font-weight:600;font-size:13px;margin-bottom:2px">${c.nom}</div>
                <div style="color:var(--muted-foreground);font-size:11px;margin-bottom:6px">${c.codePostal} · ${c.departement}</div>
                <div style="font-size:12px"><b>${formatM2(c.prixMedianM2.appartement)}</b> · médian appart.</div>
                <div style="font-size:12px;color:var(--muted-foreground)">${c.volumeTransactions12m.toLocaleString("fr-FR")} ventes / 12 mois</div>
              </div>`,
            )
            .addTo(map);
        });
        inner.addEventListener("mouseleave", () => {
          inner.style.transform = "scale(1)";
          popupRef.current?.remove();
          popupRef.current = null;
        });
        inner.addEventListener("click", () => {
          onSelect(c.id);
        });

        const marker = new maplibregl.Marker({ element: el }).setLngLat(c.centre).addTo(map);
        markersRef.current.push(marker);
      }
    };

    if (map.isStyleLoaded()) ensure();
    else map.once("load", ensure);
  }, [density, selected.id, sortedByPrice, onSelect]);

  // Center on selected
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({ center: selected.centre, zoom: 11.6, speed: 0.9, curve: 1.4 });
  }, [selected]);

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />;
}
