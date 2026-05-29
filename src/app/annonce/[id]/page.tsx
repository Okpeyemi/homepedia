import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft01Icon,
  Building03Icon,
  House01Icon,
  Maximize01Icon,
  BedIcon,
  Calendar03Icon,
  Money01Icon,
  ChartLineData01Icon,
  Location04Icon,
  ChartHistogramIcon,
  ArrowUpRight01Icon,
  ArrowDownRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Topbar } from "@/components/topbar";
import {
  getAnnonce,
  getCommune,
  getAnnoncesByCommune,
} from "@/lib/mock-data";
import { Kpi } from "@/components/common/kpi";
import { DpeBadge } from "@/components/common/dpe-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  formatEUR,
  formatM2,
  formatNumber,
  formatPct,
  formatSurface,
} from "@/lib/format";
import { HistoriqueChart } from "@/components/historique-chart";
import {
  API_BASE,
  API_COUNTRY,
  type ListingItem,
  type PropertyType,
} from "@/lib/api";
import type { DpeClass } from "@/lib/types";

const FALLBACK_PHOTOS = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=70",
];

async function fetchApiListing(id: number): Promise<ListingItem | null> {
  if (!API_BASE) return null;
  try {
    const r = await fetch(
      `${API_BASE}/v1/countries/${API_COUNTRY}/listings/${id}`,
      { headers: { Accept: "application/json" }, next: { revalidate: 60 } },
    );
    if (!r.ok) return null;
    return (await r.json()) as ListingItem;
  } catch {
    return null;
  }
}

export default async function AnnonceDetailPage({
  params,
}: PageProps<"/annonce/[id]">) {
  const { id } = await params;
  const numericId = Number(id);
  const isApiId = Number.isFinite(numericId) && /^\d+$/.test(id);

  if (isApiId) {
    const item = await fetchApiListing(numericId);
    if (!item) notFound();
    return <ApiDetail item={item} />;
  }
  return <MockDetail id={id} />;
}

function ApiDetail({ item }: { item: ListingItem }) {
  const photos =
    item.photos_urls && item.photos_urls.length > 0
      ? item.photos_urls
      : FALLBACK_PHOTOS;
  const prix = item.price?.value ?? null;
  const prixM2 = item.price_per_m2?.value ?? null;
  const surface = item.surface?.value ?? null;
  const dpe = item.energy?.class_or_score as DpeClass | null;
  const isApartment = item.property_type === "apartment";

  return (
    <>
      <Topbar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            Retour à la carte
          </Link>

          <header className="grid items-end gap-6 border-b border-border pb-6 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <HugeiconsIcon
                  icon={isApartment ? Building03Icon : House01Icon}
                  size={13}
                />
                {labelType(item.property_type)}
                <span>·</span>
                <span>{item.listing_type === "rent" ? "Location" : "Vente"}</span>
                {item.source && (
                  <>
                    <span>·</span>
                    <HugeiconsIcon icon={Location04Icon} size={13} />
                    {item.source}
                  </>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                {item.title}
              </h1>
              {item.listing_url && (
                <a
                  href={item.listing_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs text-primary underline-offset-2 hover:underline"
                >
                  Voir la source ↗
                </a>
              )}
            </div>

            <div className="flex flex-col items-end gap-1 rounded-2xl border border-border bg-card px-5 py-4">
              <div className="text-3xl font-semibold tabular-nums">
                {prix != null ? formatEUR(prix) : "—"}
                {item.listing_type === "rent" && (
                  <span className="ml-1 text-base text-muted-foreground">/mois</span>
                )}
              </div>
              <div className="text-sm tabular-nums text-muted-foreground">
                {prixM2 != null && surface != null
                  ? `${formatM2(prixM2)} · ${formatSurface(surface)}`
                  : surface != null
                    ? formatSurface(surface)
                    : ""}
              </div>
            </div>
          </header>

          <section className="mt-6 grid gap-2 sm:grid-cols-[2fr_1fr_1fr] sm:grid-rows-2 sm:h-[420px]">
            <div className="relative overflow-hidden rounded-2xl bg-muted sm:row-span-2">
              <Image
                src={photos[0]}
                alt={item.title}
                fill
                priority
                unoptimized
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
              />
            </div>
            {photos.slice(1, 5).map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-2xl bg-muted sm:aspect-auto"
              >
                <Image
                  src={src}
                  alt={`${item.title} – photo ${i + 2}`}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Kpi label="Prix" value={prix != null ? formatEUR(prix) : "—"} icon={Money01Icon} />
            <Kpi
              label="Surface"
              value={surface != null ? formatSurface(surface) : "—"}
              icon={Maximize01Icon}
            />
            <Kpi
              label="Pièces"
              value={item.rooms != null ? String(item.rooms) : "—"}
              icon={BedIcon}
              hint={item.bedrooms != null ? `${item.bedrooms} ch.` : undefined}
            />
            <Kpi
              label="Prix au m²"
              value={prixM2 != null ? formatM2(prixM2) : "—"}
              icon={ChartLineData01Icon}
            />
            <Card className="ring-1 ring-inset ring-border border-0 shadow-none">
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    DPE
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {dpe ? `Classe ${dpe}` : "non renseigné"}
                  </p>
                </div>
                {dpe ? (
                  <DpeBadge value={dpe} size="lg" />
                ) : (
                  <Badge variant="outline">—</Badge>
                )}
              </CardContent>
            </Card>
          </section>

          {item.description && (
            <section className="mt-8">
              <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p className="whitespace-pre-line">{item.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.listed_at && (
                      <Badge variant="outline" className="gap-1.5">
                        <HugeiconsIcon icon={Calendar03Icon} size={12} />
                        Mise en ligne{" "}
                        {new Date(item.listed_at).toLocaleDateString("fr-FR")}
                      </Badge>
                    )}
                    {item.source && (
                      <Badge variant="outline">Source : {item.source}</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

function MockDetail({ id }: { id: string }) {
  const annonce = getAnnonce(id);
  if (!annonce) notFound();
  const commune = getCommune(annonce.communeId);
  if (!commune) notFound();

  const peers = getAnnoncesByCommune(commune.id).filter(
    (a) => a.type === annonce.type && a.id !== annonce.id,
  );
  const ecartCommune =
    ((annonce.prixM2 - commune.prixMedianM2[annonce.type]) /
      commune.prixMedianM2[annonce.type]) *
    100;
  const ecartDept =
    ((annonce.prixM2 - commune.medianeDepartement) / commune.medianeDepartement) * 100;

  const peerM2 = peers.map((p) => p.prixM2).sort((a, b) => a - b);
  const cheaper = peerM2.filter((v) => v > annonce.prixM2).length;
  const percentile = peerM2.length
    ? Math.round((cheaper / peerM2.length) * 100)
    : 50;

  return (
    <>
      <Topbar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 lg:px-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
            Retour à la carte
          </Link>

          <header className="grid items-end gap-6 border-b border-border pb-6 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <HugeiconsIcon
                  icon={annonce.type === "appartement" ? Building03Icon : House01Icon}
                  size={13}
                />
                {annonce.type}
                <span>·</span>
                <HugeiconsIcon icon={Location04Icon} size={13} />
                {commune.nom}
                <Badge variant="outline" className="ml-1 text-[10px]">Démo</Badge>
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                {annonce.titre}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{annonce.adresse}</p>
            </div>

            <div className="flex flex-col items-end gap-1 rounded-2xl border border-border bg-card px-5 py-4">
              <div className="text-3xl font-semibold tabular-nums">
                {formatEUR(annonce.prix)}
              </div>
              <div className="text-sm tabular-nums text-muted-foreground">
                {formatM2(annonce.prixM2)} · {formatSurface(annonce.surface)}
              </div>
            </div>
          </header>

          <section className="mt-6 grid gap-2 sm:grid-cols-[2fr_1fr_1fr] sm:grid-rows-2 sm:h-[420px]">
            <div className="relative overflow-hidden rounded-2xl bg-muted sm:row-span-2">
              <Image
                src={annonce.photos[0]}
                alt={annonce.titre}
                fill
                priority
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
              />
            </div>
            {annonce.photos.slice(1, 5).map((src, i) => (
              <div
                key={i}
                className="relative aspect-square overflow-hidden rounded-2xl bg-muted sm:aspect-auto"
              >
                <Image
                  src={src}
                  alt={`${annonce.titre} – photo ${i + 2}`}
                  fill
                  sizes="(min-width: 1024px) 300px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </section>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <Kpi label="Prix" value={formatEUR(annonce.prix)} icon={Money01Icon} />
            <Kpi label="Surface" value={formatSurface(annonce.surface)} icon={Maximize01Icon} />
            <Kpi label="Pièces" value={annonce.pieces} icon={BedIcon} />
            <Kpi
              label="Prix au m²"
              value={formatM2(annonce.prixM2)}
              icon={ChartLineData01Icon}
            />
            <Card className="ring-1 ring-inset ring-border border-0 shadow-none">
              <CardContent className="flex items-center justify-between gap-3 p-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
                    DPE
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {annonce.energie} kWh/m²/an
                  </p>
                </div>
                <DpeBadge value={annonce.dpe} size="lg" />
              </CardContent>
            </Card>
          </section>

          <section className="mt-8 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-0 ring-1 ring-inset ring-border shadow-none">
              <CardHeader>
                <CardTitle className="text-base font-semibold">
                  Positionnement marché
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Comparison
                  label={`vs médiane ${annonce.type === "appartement" ? "appart." : "maison"} ${commune.nom}`}
                  selfValue={annonce.prixM2}
                  refValue={commune.prixMedianM2[annonce.type]}
                  ecart={ecartCommune}
                />
                <Comparison
                  label={`vs médiane département (${commune.departement})`}
                  selfValue={annonce.prixM2}
                  refValue={commune.medianeDepartement}
                  ecart={ecartDept}
                />
                <div className="rounded-xl bg-muted/40 px-4 py-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Percentile dans la commune
                    </span>
                    <span className="font-semibold tabular-nums">
                      Top {percentile}%
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Moins cher que {percentile}% des biens similaires ({peers.length} biens
                    comparés)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Description</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>{annonce.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="outline" className="gap-1.5">
                    <HugeiconsIcon icon={Calendar03Icon} size={12} />
                    Mise en ligne{" "}
                    {new Date(annonce.dateMiseEnLigne).toLocaleDateString("fr-FR")}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <DpeBadge value={annonce.dpe} size="sm" />
                    DPE {annonce.dpe}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mt-6 grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-0 ring-1 ring-inset ring-border shadow-none">
              <CardHeader className="flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base font-semibold">
                  Évolution du prix médian / m² · {commune.nom}
                </CardTitle>
                <span className="text-xs text-muted-foreground">3 ans</span>
              </CardHeader>
              <CardContent>
                <HistoriqueChart insee={commune.insee} />
              </CardContent>
            </Card>

            <Card className="border-0 ring-1 ring-inset ring-border shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <HugeiconsIcon icon={ChartHistogramIcon} size={16} />
                  Marché local
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <Row
                  label="Transactions / 12 mois"
                  value={formatNumber(commune.volumeTransactions12m)}
                />
                <Row
                  label="Évolution 1 an"
                  value={
                    <span
                      className={
                        commune.evolutionPrix1an > 0
                          ? "text-emerald-600 dark:text-emerald-400 tabular-nums"
                          : "text-rose-600 dark:text-rose-400 tabular-nums"
                      }
                    >
                      {formatPct(commune.evolutionPrix1an)}
                    </span>
                  }
                />
                <Row
                  label="Évolution 5 ans"
                  value={
                    <span
                      className={
                        commune.evolutionPrix5ans > 0
                          ? "text-emerald-600 dark:text-emerald-400 tabular-nums"
                          : "text-rose-600 dark:text-rose-400 tabular-nums"
                      }
                    >
                      {formatPct(commune.evolutionPrix5ans)}
                    </span>
                  }
                />
                <Row
                  label="Délai moyen vente"
                  value={`${commune.delaiMoyenVente} j`}
                />
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}

function labelType(t: PropertyType) {
  switch (t) {
    case "apartment":
      return "Appartement";
    case "house":
      return "Maison";
    case "land":
      return "Terrain";
    case "commercial":
      return "Commerce";
    default:
      return "Bien";
  }
}

function Comparison({
  label,
  selfValue,
  refValue,
  ecart,
}: {
  label: string;
  selfValue: number;
  refValue: number;
  ecart: number;
}) {
  const positive = ecart > 0;
  const ratio = Math.min(1, Math.abs(ecart) / 30);
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span
          className={
            positive
              ? "font-semibold text-rose-600 dark:text-rose-400 tabular-nums"
              : "font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums"
          }
        >
          {positive ? "+" : ""}
          {ecart.toFixed(1)}% · {positive ? "plus cher" : "moins cher"}
          <HugeiconsIcon
            icon={positive ? ArrowUpRight01Icon : ArrowDownRight01Icon}
            size={12}
            className="ml-1 inline align-text-bottom"
          />
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 text-xs text-muted-foreground tabular-nums">
        <span>Bien : {formatM2(selfValue)}</span>
        <span className="text-right">Référence : {formatM2(refValue)}</span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={positive ? "h-full bg-rose-500" : "h-full bg-emerald-500"}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-1.5 last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium tabular-nums">{value}</span>
    </div>
  );
}
