export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const API_COUNTRY = process.env.NEXT_PUBLIC_API_COUNTRY ?? "FR";

function resolvedBase(): string {
  if (typeof window === "undefined") return API_BASE;
  return "/api/proxy";
}

export type AdminLevel = "region" | "department" | "commune";

export type LocationLite = {
  id: string | number;
  code?: string;
  label: string;
  admin_level: AdminLevel;
  parent_label?: string;
  lat?: number;
  lon?: number;
};

export function locationKey(l: LocationLite): string {
  return l.code ?? String(l.id);
}

export type LocationAncestor = {
  id: string;
  label: string;
  admin_level: AdminLevel;
};

export type LocationDetail = LocationLite & {
  ancestors?: LocationAncestor[];
};

export type IndicatorKey =
  | "price.median.apartment"
  | "price.median.house"
  | "price.mean"
  | "price.range"
  | "price.evolution_3y"
  | "price.evolution_5y"
  | "transactions.count.12m"
  | "sale.duration.median"
  | "sales.volume.eur.12m"
  | "listings.active.count"
  | "listings.active.median_eur_m2"
  | "listings.split.apartment_house";

export type IndicatorPeriod = { kind: string; end?: string };
export type IndicatorComparison = {
  scope: string;
  location_id: string;
  value: number | null;
  pct_diff: number | null;
};

export type IndicatorValue =
  | number
  | [number, number]
  | { apartment: number; house: number }
  | null;

export type Indicator = {
  key: IndicatorKey;
  value: IndicatorValue;
  unit: string;
  period?: IndicatorPeriod;
  deltas?: {
    p1y: number | null;
    p3y: number | null;
    p5y: number | null;
  };
  comparisons?: IndicatorComparison[];
};

export type IndicatorsResponse = {
  location: LocationDetail;
  as_of: string;
  indicators: Indicator[];
  warnings?: string[];
};

export type PropertyType = "apartment" | "house" | "land" | "commercial" | "other";
export type ListingType = "sale" | "rent";
export type ListingSort =
  | "recent"
  | "oldest"
  | "price_asc"
  | "price_desc"
  | "price_per_m2_asc"
  | "price_per_m2_desc"
  | "area_asc"
  | "area_desc";

export type StatsPoint = Record<string, number | string | null>;
export type StatsSeries = {
  key: string;
  granularity?: string | null;
  unit?: string | null;
  groups?: string[] | null;
  summary?: unknown;
  points: StatsPoint[];
};
export type StatsResponse = { series: StatsSeries[] };

export type ApiAmount = { value: number | null; unit: string };

export type ListingItem = {
  id: number;
  listing_type: ListingType;
  property_type: PropertyType;
  title: string;
  description?: string | null;
  price?: ApiAmount;
  price_per_m2?: ApiAmount;
  surface?: ApiAmount;
  rooms?: number | null;
  bedrooms?: number | null;
  energy?: { scheme: string | null; class_or_score: string | null };
  photos_urls?: string[] | null;
  listing_url?: string | null;
  listed_at?: string | null;
  last_seen_at?: string | null;
  delisted_at?: string | null;
  source?: string | null;
  location?: LocationDetail;
};

export type ListingsResponse = {
  meta: {
    count: number;
    median_price: ApiAmount;
    median_price_per_m2: ApiAmount;
    median_surface: ApiAmount;
    split: { apartment: number; house: number };
  };
  items: ListingItem[];
  next_cursor: string | null;
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

type Query = Record<string, string | number | undefined | null>;

async function get<T>(path: string, q?: Query, signal?: AbortSignal): Promise<T> {
  const base = resolvedBase();
  if (!base) throw new ApiError(0, "NEXT_PUBLIC_API_BASE_URL not set");
  const isAbsolute = /^https?:\/\//.test(base);
  const urlString = isAbsolute
    ? `${base}${path}`
    : `${base}${path}`;
  const url = isAbsolute ? new URL(urlString) : new URL(urlString, window.location.origin);
  if (q) {
    for (const [k, v] of Object.entries(q)) {
      if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
    }
  }
  const r = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!r.ok) {
    let detail = r.statusText;
    try {
      const body = await r.json();
      detail = body?.detail ?? body?.title ?? detail;
    } catch {}
    throw new ApiError(r.status, `API ${r.status}: ${detail}`);
  }
  return (await r.json()) as T;
}

export const api = {
  searchLocations(
    q: string,
    opts?: { limit?: number; level?: AdminLevel },
    signal?: AbortSignal,
  ) {
    return get<{ results: LocationLite[] }>(
      `/v1/countries/${API_COUNTRY}/locations`,
      { q, limit: opts?.limit, level: opts?.level },
      signal,
    );
  },
  getLocation(code: string, signal?: AbortSignal) {
    return get<LocationDetail>(
      `/v1/countries/${API_COUNTRY}/locations/${code}`,
      undefined,
      signal,
    );
  },
  getIndicators(
    code: string,
    opts?: { keys?: string; compareWith?: string },
    signal?: AbortSignal,
  ) {
    return get<IndicatorsResponse>(
      `/v1/countries/${API_COUNTRY}/locations/${code}/indicators`,
      { keys: opts?.keys, compare_with: opts?.compareWith },
      signal,
    );
  },
  getStats(
    code: string,
    opts?: {
      series?: string;
      propertyType?: PropertyType;
      period?: string;
    },
    signal?: AbortSignal,
  ) {
    return get<StatsResponse>(
      `/v1/countries/${API_COUNTRY}/locations/${code}/transactions/stats`,
      {
        series: opts?.series,
        property_type: opts?.propertyType,
        period: opts?.period,
      },
      signal,
    );
  },
  getListings(
    code: string,
    opts?: {
      propertyType?: PropertyType;
      listingType?: ListingType;
      sort?: ListingSort;
      cursor?: string;
      limit?: number;
    },
    signal?: AbortSignal,
  ) {
    return get<ListingsResponse>(
      `/v1/countries/${API_COUNTRY}/locations/${code}/listings`,
      {
        property_type: opts?.propertyType,
        listing_type: opts?.listingType,
        sort: opts?.sort,
        cursor: opts?.cursor,
        limit: opts?.limit,
      },
      signal,
    );
  },
  getListing(id: number | string, signal?: AbortSignal) {
    return get<ListingItem>(
      `/v1/countries/${API_COUNTRY}/listings/${id}`,
      undefined,
      signal,
    );
  },
};

export function findIndicator(
  res: IndicatorsResponse | null | undefined,
  key: IndicatorKey,
): Indicator | undefined {
  return res?.indicators.find((i) => i.key === key);
}

export function numericIndicator(
  res: IndicatorsResponse | null | undefined,
  key: IndicatorKey,
): number | null {
  const i = findIndicator(res, key);
  if (!i || i.value == null) return null;
  return typeof i.value === "number" ? i.value : null;
}

export function rangeIndicator(
  res: IndicatorsResponse | null | undefined,
  key: IndicatorKey,
): [number, number] | null {
  const i = findIndicator(res, key);
  if (!i || !Array.isArray(i.value)) return null;
  return i.value as [number, number];
}
