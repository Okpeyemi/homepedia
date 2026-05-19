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
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Topbar } from "@/components/topbar";
import { getAnnonce, getCommune, getAnnoncesByCommune } from "@/lib/mock-data";
import { Kpi } from "@/components/common/kpi";
import { DpeBadge } from "@/components/common/dpe-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatEUR, formatM2, formatNumber, formatPct, formatSurface } from "@/lib/format";
import { HistoriqueChart } from "@/components/historique-chart";

export default async function AnnonceDetailPage({
  params,
}: PageProps<"/annonce/[id]">) {
  const { id } = await params;
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
                <HistoriqueChart communeId={commune.id} />
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
