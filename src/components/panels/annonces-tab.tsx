"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  FilterIcon,
  Building03Icon,
  House01Icon,
  Maximize01Icon,
  BedIcon,
  Calendar03Icon,
  ArrowRight01Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getAnnoncesByCommune } from "@/lib/mock-data";
import { formatEUR, formatM2, formatNumber, formatSurface } from "@/lib/format";
import { DpeBadge } from "@/components/common/dpe-badge";
import { Badge } from "@/components/ui/badge";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ActiveLocation } from "@/lib/location";
import {
  api,
  type ListingItem,
  type ListingSort,
  type PropertyType,
} from "@/lib/api";
import { useAsync } from "@/lib/use-api";
import { EmptyState } from "@/components/common/empty-state";
import { SourceBadge, type DataSource } from "@/components/common/source-badge";
import type { DpeClass } from "@/lib/types";

type LocalSort = "recent" | "prix-asc" | "prix-desc" | "m2-asc" | "m2-desc";
type LocalType = "all" | "appartement" | "maison";

const SORT_MAP: Record<LocalSort, ListingSort> = {
  recent: "recent",
  "prix-asc": "price_asc",
  "prix-desc": "price_desc",
  "m2-asc": "price_per_m2_asc",
  "m2-desc": "price_per_m2_desc",
};

const FALLBACK_PHOTO =
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=70";

export function AnnoncesTab({ location }: { location: ActiveLocation }) {
  const [type, setType] = useState<LocalType>("all");
  const [sort, setSort] = useState<LocalSort>("recent");

  const propertyType: PropertyType | undefined =
    type === "appartement" ? "apartment" : type === "maison" ? "house" : undefined;

  const { data, loading, error } = useAsync(
    (signal) =>
      api.getListings(
        location.insee,
        { propertyType, sort: SORT_MAP[sort], limit: 30 },
        signal,
      ),
    [location.insee, propertyType, sort],
  );

  const apiItems = data?.items ?? [];
  const apiMeta = data?.meta;
  const apiHasResults = (apiMeta?.count ?? 0) > 0 && apiItems.length > 0;

  const mockAll = location.mock
    ? getAnnoncesByCommune(location.mock.id)
    : [];

  const mockFiltered = useMemo(() => {
    let xs = mockAll;
    if (type !== "all") xs = xs.filter((a) => a.type === type);
    const sorters: Record<LocalSort, (a: typeof xs[number], b: typeof xs[number]) => number> = {
      recent: (a, b) => b.dateMiseEnLigne.localeCompare(a.dateMiseEnLigne),
      "prix-asc": (a, b) => a.prix - b.prix,
      "prix-desc": (a, b) => b.prix - a.prix,
      "m2-asc": (a, b) => a.prixM2 - b.prixM2,
      "m2-desc": (a, b) => b.prixM2 - a.prixM2,
    };
    return [...xs].sort(sorters[sort]);
  }, [mockAll, type, sort]);

  const usingApi = apiHasResults;
  const showMock = !usingApi && mockFiltered.length > 0;
  const statSource: DataSource | null = usingApi
    ? "api"
    : showMock
      ? "mock"
      : null;

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-3 pb-3">
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/50 p-3 text-sm">
          {usingApi ? (
            <>
              <Stat label="Annonces" value={formatNumber(apiMeta?.count ?? 0)} source={statSource} />
              <Stat
                label="Prix médian"
                value={
                  apiMeta?.median_price.value != null
                    ? formatEUR(apiMeta.median_price.value)
                    : "—"
                }
                source={statSource}
              />
              <Stat
                label="Surface médiane"
                value={
                  apiMeta?.median_surface.value != null
                    ? formatSurface(apiMeta.median_surface.value)
                    : "—"
                }
                source={statSource}
              />
            </>
          ) : (
            <>
              <Stat
                label="Annonces"
                value={formatNumber(mockFiltered.length)}
                source={statSource}
              />
              <Stat
                label="Prix médian"
                value={medianBy(mockFiltered.map((a) => a.prix))}
                source={statSource}
                fmt={formatEUR}
              />
              <Stat
                label="Surface médiane"
                value={medianBy(mockFiltered.map((a) => a.surface))}
                source={statSource}
                fmt={formatSurface}
              />
            </>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ToggleGroup
            value={[type]}
            onValueChange={(arr) => arr[0] && setType(arr[0] as LocalType)}
            size="sm"
            variant="outline"
          >
            <ToggleGroupItem value="all" className="px-3">
              Tous
            </ToggleGroupItem>
            <ToggleGroupItem value="appartement" className="px-3 gap-1.5">
              <HugeiconsIcon icon={Building03Icon} size={14} />
              Appart.
            </ToggleGroupItem>
            <ToggleGroupItem value="maison" className="px-3 gap-1.5">
              <HugeiconsIcon icon={House01Icon} size={14} />
              Maison
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={sort} onValueChange={(v) => v && setSort(v as LocalSort)}>
            <SelectTrigger size="sm" className="ml-auto h-8 w-[170px]">
              <HugeiconsIcon icon={FilterIcon} size={14} />
              <SelectValue placeholder="Trier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Plus récentes</SelectItem>
              <SelectItem value="prix-asc">Prix croissant</SelectItem>
              <SelectItem value="prix-desc">Prix décroissant</SelectItem>
              <SelectItem value="m2-asc">€/m² croissant</SelectItem>
              <SelectItem value="m2-desc">€/m² décroissant</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2.5 pr-1">
        {loading && (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
            Chargement des annonces…
          </div>
        )}
        {error && (
          <EmptyState title="Erreur API" description={error} icon={Tag01Icon} />
        )}
        {usingApi &&
          apiItems.map((it) => (
            <ApiListingRow key={it.id} item={it} parent={location.label} />
          ))}
        {showMock &&
          mockFiltered.map((a) => (
            <MockListingRow
              key={a.id}
              id={a.id}
              titre={a.titre}
              adresse={a.adresse}
              prix={a.prix}
              prixM2={a.prixM2}
              surface={a.surface}
              pieces={a.pieces}
              dateMiseEnLigne={a.dateMiseEnLigne}
              dpe={a.dpe}
              photo={a.photos[0]}
              propertyType={a.type === "appartement" ? "apartment" : "house"}
            />
          ))}
        {!loading && !usingApi && !showMock && !error && (
          <EmptyState
            title="Aucune annonce dans cette zone"
            description="L'API ne renvoie pas encore d'annonces pour cette commune."
            icon={Tag01Icon}
          />
        )}
      </div>
    </div>
  );
}

function ApiListingRow({ item, parent }: { item: ListingItem; parent: string }) {
  const photo =
    item.photos_urls && item.photos_urls.length > 0 ? item.photos_urls[0] : FALLBACK_PHOTO;
  const prix = item.price?.value ?? null;
  const prixM2 = item.price_per_m2?.value ?? null;
  const surface = item.surface?.value ?? null;
  const dpe = item.energy?.class_or_score as DpeClass | null;
  const date = item.listed_at ? item.listed_at.slice(0, 10) : null;

  return (
    <Link
      href={`/annonce/${item.id}`}
      className="group block rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent/30"
    >
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={photo}
            alt={item.title}
            fill
            sizes="112px"
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-1 top-1 rounded-md bg-background/90 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
            <HugeiconsIcon
              icon={item.property_type === "apartment" ? Building03Icon : House01Icon}
              size={11}
              className="-mt-0.5 mr-0.5 inline"
            />
            {labelType(item.property_type)}
            {item.listing_type === "rent" && (
              <span className="ml-1 text-primary">Loc.</span>
            )}
          </div>
          <span className="absolute right-1 top-1">
            <SourceBadge source="api" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{item.title}</div>
              <div className="truncate text-xs text-muted-foreground">{parent}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold tabular-nums">
                {prix != null ? formatEUR(prix) : "—"}
              </div>
              <div className="text-[11px] text-muted-foreground tabular-nums">
                {prixM2 != null ? formatM2(prixM2) : ""}
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {surface != null && (
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon icon={Maximize01Icon} size={13} />
                {surface} m²
              </span>
            )}
            {item.rooms != null && (
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon icon={BedIcon} size={13} />
                {item.rooms} pièces
              </span>
            )}
            {date && (
              <span className="inline-flex items-center gap-1">
                <HugeiconsIcon icon={Calendar03Icon} size={13} />
                {new Date(date).toLocaleDateString("fr-FR")}
              </span>
            )}
            {dpe && (
              <Badge variant="outline" className="ml-auto gap-1 py-0.5 pr-2 pl-1 text-[10px]">
                <DpeBadge value={dpe} size="sm" />
                DPE {dpe}
              </Badge>
            )}
          </div>
        </div>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={16}
          className="mt-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>
    </Link>
  );
}

function MockListingRow(props: {
  id: string;
  titre: string;
  adresse: string;
  prix: number;
  prixM2: number;
  surface: number;
  pieces: number;
  dateMiseEnLigne: string;
  dpe: DpeClass;
  photo: string;
  propertyType: "apartment" | "house";
}) {
  return (
    <Link
      href={`/annonce/${props.id}`}
      className="group block rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent/30"
    >
      <div className="flex items-start gap-3">
        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
          <Image
            src={props.photo}
            alt={props.titre}
            fill
            sizes="112px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute left-1 top-1 rounded-md bg-background/90 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
            <HugeiconsIcon
              icon={props.propertyType === "apartment" ? Building03Icon : House01Icon}
              size={11}
              className="-mt-0.5 mr-0.5 inline"
            />
            {props.propertyType === "apartment" ? "Appart." : "Maison"}
          </div>
          <span className="absolute right-1 top-1">
            <SourceBadge source="mock" />
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{props.titre}</div>
              <div className="truncate text-xs text-muted-foreground">{props.adresse}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold tabular-nums">{formatEUR(props.prix)}</div>
              <div className="text-[11px] text-muted-foreground tabular-nums">
                {formatM2(props.prixM2)}
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon icon={Maximize01Icon} size={13} />
              {props.surface} m²
            </span>
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon icon={BedIcon} size={13} />
              {props.pieces} pièces
            </span>
            <span className="inline-flex items-center gap-1">
              <HugeiconsIcon icon={Calendar03Icon} size={13} />
              {new Date(props.dateMiseEnLigne).toLocaleDateString("fr-FR")}
            </span>
            <Badge variant="outline" className="ml-auto gap-1 py-0.5 pr-2 pl-1 text-[10px]">
              <DpeBadge value={props.dpe} size="sm" />
              DPE {props.dpe}
            </Badge>
          </div>
        </div>
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={16}
          className="mt-3 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>
    </Link>
  );
}

function labelType(t: PropertyType) {
  switch (t) {
    case "apartment":
      return "Appart.";
    case "house":
      return "Maison";
    case "land":
      return "Terrain";
    case "commercial":
      return "Commerce";
    default:
      return "Autre";
  }
}

function Stat({
  label,
  value,
  source,
  fmt,
}: {
  label: string;
  value: string | number;
  source?: DataSource | null;
  fmt?: (v: number) => string;
}) {
  const display =
    typeof value === "number" ? (fmt ? fmt(value) : formatNumber(value)) : value;
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
        <span className="truncate">{label}</span>
        {source && <SourceBadge source={source} />}
      </div>
      <div className="mt-0.5 text-base font-semibold tabular-nums">{display}</div>
    </div>
  );
}

function medianBy(values: number[]): number {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}
