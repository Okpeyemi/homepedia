const eur = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const eurCompact = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  notation: "compact",
  maximumFractionDigits: 1,
});

const num = new Intl.NumberFormat("fr-FR");

export const formatEUR = (v: number) => eur.format(v);
export const formatEURCompact = (v: number) => eurCompact.format(v);
export const formatNumber = (v: number) => num.format(v);
export const formatPct = (v: number, fractionDigits = 1) => {
  const s = v.toFixed(fractionDigits);
  return v > 0 ? `+${s}%` : `${s}%`;
};
export const formatM2 = (v: number) => `${num.format(v)} €/m²`;
export const formatSurface = (v: number) => `${num.format(v)} m²`;

export const dpeColors: Record<"A" | "B" | "C" | "D" | "E" | "F" | "G", string> = {
  A: "#00a651",
  B: "#52b947",
  C: "#bfd734",
  D: "#fff200",
  E: "#fdb913",
  F: "#f37021",
  G: "#ed1c24",
};
