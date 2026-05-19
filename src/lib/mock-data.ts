import type {
  Annonce,
  Commune,
  DistributionPrix,
  DpeClass,
  RepartitionPieces,
  SeriePrix,
} from "./types";

export const communes: Commune[] = [
  {
    id: "paris-11",
    nom: "Paris 11e",
    codePostal: "75011",
    departement: "Paris",
    region: "Île-de-France",
    centre: [2.3789, 48.8589],
    population: 147017,
    populationEvol10ans: -1.8,
    tauxChomage: 9.2,
    revenuMedian: 28940,
    partProprietaires: 33,
    partResidencesPrincipales: 89,
    prixMedianM2: { appartement: 10620, maison: 12400 },
    prixMoyenM2: 10880,
    prixMinM2: 7200,
    prixMaxM2: 16800,
    evolutionPrix1an: -2.4,
    evolutionPrix3ans: 4.1,
    evolutionPrix5ans: 12.6,
    medianeDepartement: 10450,
    medianeRegion: 6920,
    volumeTransactions12m: 1842,
    evolutionVolume: -8.3,
    delaiMoyenVente: 64,
    repartitionDpe: { A: 1, B: 4, C: 18, D: 36, E: 24, F: 12, G: 5 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 96, maison: 4 },
    scores: { securite: 6.2, education: 8.1, transport: 9.6, environnement: 6.8 },
    education: {
      maternelles: 18,
      primaires: 22,
      colleges: 9,
      lycees: 6,
      distanceLyceeMoyenne: 480,
    },
    transport: { arretsRayon500m: 48, gare: true, distanceGare: 220 },
    avis: {
      nombreAvis: 1284,
      source: "Google Maps + Yelp",
      sentimentGlobal: { positif: 62, neutre: 24, negatif: 14 },
      topPositifs: ["Vie de quartier", "Restaurants", "Transports", "Bars", "Marchés"],
      topNegatifs: ["Bruit nocturne", "Propreté", "Prix logement", "Tourisme", "Travaux"],
      wordCloud: [
        { mot: "animé", poids: 92 },
        { mot: "bobo", poids: 64 },
        { mot: "restos", poids: 88 },
        { mot: "bruyant", poids: 58 },
        { mot: "transports", poids: 76 },
        { mot: "vert", poids: 32 },
        { mot: "vivant", poids: 70 },
        { mot: "cher", poids: 60 },
      ],
    },
  },
  {
    id: "lyon-6",
    nom: "Lyon 6e",
    codePostal: "69006",
    departement: "Rhône",
    region: "Auvergne-Rhône-Alpes",
    centre: [4.8536, 45.7714],
    population: 51612,
    populationEvol10ans: 3.2,
    tauxChomage: 8.0,
    revenuMedian: 31420,
    partProprietaires: 41,
    partResidencesPrincipales: 87,
    prixMedianM2: { appartement: 6420, maison: 7980 },
    prixMoyenM2: 6610,
    prixMinM2: 4100,
    prixMaxM2: 11200,
    evolutionPrix1an: -1.1,
    evolutionPrix3ans: 8.4,
    evolutionPrix5ans: 22.1,
    medianeDepartement: 4980,
    medianeRegion: 3640,
    volumeTransactions12m: 1124,
    evolutionVolume: -4.6,
    delaiMoyenVente: 58,
    repartitionDpe: { A: 2, B: 6, C: 22, D: 34, E: 22, F: 10, G: 4 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 92, maison: 8 },
    scores: { securite: 7.4, education: 8.3, transport: 8.6, environnement: 7.6 },
    education: {
      maternelles: 9,
      primaires: 11,
      colleges: 5,
      lycees: 4,
      distanceLyceeMoyenne: 510,
    },
    transport: { arretsRayon500m: 32, gare: true, distanceGare: 680 },
    avis: {
      nombreAvis: 642,
      source: "Google Maps",
      sentimentGlobal: { positif: 71, neutre: 20, negatif: 9 },
      topPositifs: ["Parc Tête d'Or", "Commerces", "Sécurité", "Famille", "Calme"],
      topNegatifs: ["Stationnement", "Prix", "Travaux tram", "Bouchons", "Manque commerces nuit"],
      wordCloud: [
        { mot: "résidentiel", poids: 84 },
        { mot: "Tête d'Or", poids: 92 },
        { mot: "famille", poids: 70 },
        { mot: "calme", poids: 78 },
        { mot: "huppé", poids: 56 },
        { mot: "cher", poids: 58 },
        { mot: "métro", poids: 62 },
      ],
    },
  },
  {
    id: "marseille-8",
    nom: "Marseille 8e",
    codePostal: "13008",
    departement: "Bouches-du-Rhône",
    region: "Provence-Alpes-Côte d'Azur",
    centre: [5.3853, 43.2598],
    population: 84421,
    populationEvol10ans: 1.4,
    tauxChomage: 11.6,
    revenuMedian: 25840,
    partProprietaires: 52,
    partResidencesPrincipales: 78,
    prixMedianM2: { appartement: 4680, maison: 6240 },
    prixMoyenM2: 4910,
    prixMinM2: 2800,
    prixMaxM2: 9200,
    evolutionPrix1an: 1.8,
    evolutionPrix3ans: 14.2,
    evolutionPrix5ans: 28.6,
    medianeDepartement: 3920,
    medianeRegion: 4180,
    volumeTransactions12m: 1488,
    evolutionVolume: 2.1,
    delaiMoyenVente: 72,
    repartitionDpe: { A: 3, B: 8, C: 24, D: 32, E: 20, F: 9, G: 4 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 78, maison: 22 },
    scores: { securite: 6.6, education: 7.2, transport: 6.4, environnement: 8.4 },
    education: {
      maternelles: 14,
      primaires: 16,
      colleges: 7,
      lycees: 5,
      distanceLyceeMoyenne: 620,
    },
    transport: { arretsRayon500m: 22, gare: false, distanceGare: 2400 },
    avis: {
      nombreAvis: 894,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 68, neutre: 22, negatif: 10 },
      topPositifs: ["Plages", "Calanques", "Soleil", "Vue mer", "Restaurants"],
      topNegatifs: ["Trafic l'été", "Stationnement", "Transports", "Tourisme", "Prix montent"],
      wordCloud: [
        { mot: "mer", poids: 96 },
        { mot: "plage", poids: 88 },
        { mot: "Prado", poids: 74 },
        { mot: "calanques", poids: 70 },
        { mot: "soleil", poids: 82 },
        { mot: "bouchons", poids: 52 },
        { mot: "vue", poids: 68 },
      ],
    },
  },
  {
    id: "bordeaux-centre",
    nom: "Bordeaux Centre",
    codePostal: "33000",
    departement: "Gironde",
    region: "Nouvelle-Aquitaine",
    centre: [-0.5792, 44.8378],
    population: 84200,
    populationEvol10ans: 4.6,
    tauxChomage: 9.4,
    revenuMedian: 24180,
    partProprietaires: 36,
    partResidencesPrincipales: 84,
    prixMedianM2: { appartement: 4920, maison: 5840 },
    prixMoyenM2: 5040,
    prixMinM2: 3100,
    prixMaxM2: 8200,
    evolutionPrix1an: -3.6,
    evolutionPrix3ans: 6.2,
    evolutionPrix5ans: 19.4,
    medianeDepartement: 3680,
    medianeRegion: 3120,
    volumeTransactions12m: 1018,
    evolutionVolume: -11.4,
    delaiMoyenVente: 68,
    repartitionDpe: { A: 2, B: 5, C: 20, D: 36, E: 22, F: 11, G: 4 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 82, maison: 18 },
    scores: { securite: 6.8, education: 8.0, transport: 8.2, environnement: 7.8 },
    education: {
      maternelles: 11,
      primaires: 13,
      colleges: 6,
      lycees: 5,
      distanceLyceeMoyenne: 540,
    },
    transport: { arretsRayon500m: 28, gare: true, distanceGare: 420 },
    avis: {
      nombreAvis: 716,
      source: "Google Maps",
      sentimentGlobal: { positif: 73, neutre: 19, negatif: 8 },
      topPositifs: ["Vie nocturne", "Pierre blonde", "Tramway", "Vélo", "Vins"],
      topNegatifs: ["Loyers", "Bruit nuit", "Stationnement", "Été chaud", "Tourisme"],
      wordCloud: [
        { mot: "pierre", poids: 86 },
        { mot: "tram", poids: 80 },
        { mot: "vélo", poids: 76 },
        { mot: "Garonne", poids: 84 },
        { mot: "animé", poids: 72 },
        { mot: "chaud", poids: 48 },
      ],
    },
  },
  {
    id: "nantes-centre",
    nom: "Nantes Centre",
    codePostal: "44000",
    departement: "Loire-Atlantique",
    region: "Pays de la Loire",
    centre: [-1.5536, 47.2184],
    population: 81600,
    populationEvol10ans: 6.2,
    tauxChomage: 8.6,
    revenuMedian: 23980,
    partProprietaires: 38,
    partResidencesPrincipales: 86,
    prixMedianM2: { appartement: 3940, maison: 4720 },
    prixMoyenM2: 4080,
    prixMinM2: 2400,
    prixMaxM2: 6900,
    evolutionPrix1an: -4.2,
    evolutionPrix3ans: 7.8,
    evolutionPrix5ans: 24.6,
    medianeDepartement: 3240,
    medianeRegion: 2840,
    volumeTransactions12m: 942,
    evolutionVolume: -9.8,
    delaiMoyenVente: 76,
    repartitionDpe: { A: 4, B: 9, C: 26, D: 34, E: 18, F: 7, G: 2 },
    dpeMoyen: "C",
    repartitionTypes: { appartement: 74, maison: 26 },
    scores: { securite: 7.6, education: 8.4, transport: 8.4, environnement: 8.6 },
    education: {
      maternelles: 12,
      primaires: 14,
      colleges: 6,
      lycees: 5,
      distanceLyceeMoyenne: 560,
    },
    transport: { arretsRayon500m: 26, gare: true, distanceGare: 380 },
    avis: {
      nombreAvis: 538,
      source: "Google Maps",
      sentimentGlobal: { positif: 78, neutre: 16, negatif: 6 },
      topPositifs: ["Île de Nantes", "Tram", "Familles", "Vélo", "Vert"],
      topNegatifs: ["Pluie", "Travaux", "Sécurité gare", "Loyers", "Stationnement"],
      wordCloud: [
        { mot: "vert", poids: 88 },
        { mot: "tram", poids: 82 },
        { mot: "Loire", poids: 78 },
        { mot: "famille", poids: 76 },
        { mot: "vélo", poids: 72 },
        { mot: "pluie", poids: 46 },
      ],
    },
  },
  {
    id: "lille-vieux",
    nom: "Lille Vieux-Lille",
    codePostal: "59800",
    departement: "Nord",
    region: "Hauts-de-France",
    centre: [3.0626, 50.6406],
    population: 21800,
    populationEvol10ans: 1.2,
    tauxChomage: 10.4,
    revenuMedian: 26420,
    partProprietaires: 39,
    partResidencesPrincipales: 81,
    prixMedianM2: { appartement: 3680, maison: 4180 },
    prixMoyenM2: 3820,
    prixMinM2: 2200,
    prixMaxM2: 6400,
    evolutionPrix1an: -2.8,
    evolutionPrix3ans: 5.6,
    evolutionPrix5ans: 16.2,
    medianeDepartement: 2840,
    medianeRegion: 2240,
    volumeTransactions12m: 412,
    evolutionVolume: -6.4,
    delaiMoyenVente: 81,
    repartitionDpe: { A: 1, B: 4, C: 16, D: 30, E: 26, F: 16, G: 7 },
    dpeMoyen: "E",
    repartitionTypes: { appartement: 86, maison: 14 },
    scores: { securite: 7.0, education: 7.8, transport: 8.8, environnement: 6.8 },
    education: {
      maternelles: 5,
      primaires: 6,
      colleges: 3,
      lycees: 2,
      distanceLyceeMoyenne: 480,
    },
    transport: { arretsRayon500m: 24, gare: true, distanceGare: 560 },
    avis: {
      nombreAvis: 392,
      source: "Google Maps",
      sentimentGlobal: { positif: 74, neutre: 18, negatif: 8 },
      topPositifs: ["Architecture", "Restos", "Marchés", "Estaminets", "Convivial"],
      topNegatifs: ["Pluie", "Stationnement", "Gris", "Bruit nocturne", "Prix"],
      wordCloud: [
        { mot: "briques", poids: 84 },
        { mot: "estaminet", poids: 72 },
        { mot: "marché", poids: 68 },
        { mot: "convivial", poids: 78 },
        { mot: "pluie", poids: 54 },
      ],
    },
  },
  {
    id: "toulouse-capitole",
    nom: "Toulouse Capitole",
    codePostal: "31000",
    departement: "Haute-Garonne",
    region: "Occitanie",
    centre: [1.4437, 43.6043],
    population: 28400,
    populationEvol10ans: 2.8,
    tauxChomage: 9.1,
    revenuMedian: 24820,
    partProprietaires: 32,
    partResidencesPrincipales: 82,
    prixMedianM2: { appartement: 3720, maison: 4480 },
    prixMoyenM2: 3860,
    prixMinM2: 2300,
    prixMaxM2: 6100,
    evolutionPrix1an: -1.6,
    evolutionPrix3ans: 8.2,
    evolutionPrix5ans: 20.4,
    medianeDepartement: 3120,
    medianeRegion: 2680,
    volumeTransactions12m: 524,
    evolutionVolume: -3.2,
    delaiMoyenVente: 66,
    repartitionDpe: { A: 3, B: 7, C: 22, D: 34, E: 22, F: 9, G: 3 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 84, maison: 16 },
    scores: { securite: 6.8, education: 8.2, transport: 8.4, environnement: 7.4 },
    education: {
      maternelles: 6,
      primaires: 8,
      colleges: 4,
      lycees: 3,
      distanceLyceeMoyenne: 460,
    },
    transport: { arretsRayon500m: 32, gare: true, distanceGare: 740 },
    avis: {
      nombreAvis: 612,
      source: "Google Maps",
      sentimentGlobal: { positif: 76, neutre: 18, negatif: 6 },
      topPositifs: ["Place du Capitole", "Restos", "Soleil", "Garonne", "Étudiants"],
      topNegatifs: ["Chaleur été", "Stationnement", "Métro saturé", "Loyers", "Tourisme"],
      wordCloud: [
        { mot: "rose", poids: 86 },
        { mot: "soleil", poids: 90 },
        { mot: "Capitole", poids: 80 },
        { mot: "Garonne", poids: 72 },
        { mot: "animé", poids: 76 },
      ],
    },
  },
  {
    id: "nice-promenade",
    nom: "Nice Promenade",
    codePostal: "06000",
    departement: "Alpes-Maritimes",
    region: "Provence-Alpes-Côte d'Azur",
    centre: [7.2620, 43.6960],
    population: 36800,
    populationEvol10ans: -0.6,
    tauxChomage: 9.8,
    revenuMedian: 23420,
    partProprietaires: 46,
    partResidencesPrincipales: 68,
    prixMedianM2: { appartement: 5840, maison: 7820 },
    prixMoyenM2: 6080,
    prixMinM2: 3600,
    prixMaxM2: 12400,
    evolutionPrix1an: 0.8,
    evolutionPrix3ans: 11.6,
    evolutionPrix5ans: 24.8,
    medianeDepartement: 4720,
    medianeRegion: 4180,
    volumeTransactions12m: 686,
    evolutionVolume: -2.4,
    delaiMoyenVente: 84,
    repartitionDpe: { A: 2, B: 6, C: 22, D: 32, E: 22, F: 12, G: 4 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 92, maison: 8 },
    scores: { securite: 6.4, education: 7.0, transport: 7.6, environnement: 8.0 },
    education: {
      maternelles: 7,
      primaires: 9,
      colleges: 4,
      lycees: 3,
      distanceLyceeMoyenne: 580,
    },
    transport: { arretsRayon500m: 26, gare: true, distanceGare: 820 },
    avis: {
      nombreAvis: 824,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 70, neutre: 22, negatif: 8 },
      topPositifs: ["Vue mer", "Soleil", "Promenade", "Vieille ville", "Aéroport"],
      topNegatifs: ["Tourisme été", "Stationnement", "Prix", "Bruit avions", "Foule"],
      wordCloud: [
        { mot: "mer", poids: 94 },
        { mot: "soleil", poids: 90 },
        { mot: "promenade", poids: 82 },
        { mot: "vieille ville", poids: 74 },
        { mot: "touristes", poids: 60 },
      ],
    },
  },
];

const titres = [
  "Lumineux 3 pièces refait à neuf",
  "Studio cosy proche métro",
  "Maison familiale avec jardin",
  "Appartement de standing avec balcon",
  "Duplex atypique sous les toits",
  "T2 idéal investisseur",
  "Grande maison de ville rénovée",
  "Loft industriel en hyper-centre",
  "Charmant T3 vue dégagée",
  "Penthouse avec terrasse",
];

const adresses = [
  "12 rue de la République",
  "48 avenue Jean Jaurès",
  "3 place du Marché",
  "27 boulevard Voltaire",
  "8 rue des Lilas",
  "65 avenue de la Gare",
  "14 cours Mirabeau",
  "5 impasse des Acacias",
  "92 rue Pasteur",
  "31 quai des Charmes",
];

const dpeOrder: DpeClass[] = ["A", "B", "C", "D", "E", "F", "G"];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export const annonces: Annonce[] = (() => {
  const out: Annonce[] = [];
  for (const commune of communes) {
    const rng = seededRandom(commune.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0));
    const count = 24 + Math.floor(rng() * 16);
    for (let i = 0; i < count; i++) {
      const isMaison = rng() < (commune.repartitionTypes.maison / 100);
      const type = isMaison ? "maison" : "appartement";
      const surface = isMaison
        ? 70 + Math.floor(rng() * 110)
        : 18 + Math.floor(rng() * 90);
      const pieces = Math.max(1, Math.min(7, Math.round(surface / 22)));
      const baseM2 = isMaison
        ? commune.prixMedianM2.maison
        : commune.prixMedianM2.appartement;
      const variation = 0.65 + rng() * 0.85;
      const prixM2 = Math.round(baseM2 * variation);
      const prix = Math.round(prixM2 * surface);
      const dpe = dpeOrder[Math.min(6, Math.floor(rng() * 7))];
      const energie = 50 + Math.floor(rng() * 380);
      const daysAgo = Math.floor(rng() * 180);
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      const [lon, lat] = commune.centre;
      const jitter = 0.012;
      out.push({
        id: `${commune.id}-${i.toString().padStart(3, "0")}`,
        communeId: commune.id,
        type,
        prix,
        surface,
        pieces,
        prixM2,
        dpe,
        energie,
        dateMiseEnLigne: date.toISOString().slice(0, 10),
        titre: titres[Math.floor(rng() * titres.length)],
        adresse: `${adresses[Math.floor(rng() * adresses.length)]}, ${commune.codePostal} ${commune.nom}`,
        position: [lon + (rng() - 0.5) * jitter * 2, lat + (rng() - 0.5) * jitter],
        description:
          "Bien rare proposé à la vente dans un quartier recherché. Volumes généreux, prestations soignées, exposition agréable. Idéal résidence principale ou investissement locatif.",
      });
    }
  }
  return out;
})();

export function getCommune(id: string): Commune | undefined {
  return communes.find((c) => c.id === id);
}

export function getAnnoncesByCommune(communeId: string): Annonce[] {
  return annonces.filter((a) => a.communeId === communeId);
}

export function getAnnonce(id: string): Annonce | undefined {
  return annonces.find((a) => a.id === id);
}

export function serieHistoriquePrix(commune: Commune): SeriePrix[] {
  const months = 60;
  const out: SeriePrix[] = [];
  const rng = seededRandom(commune.id.length * 7);
  const baseA = commune.prixMedianM2.appartement;
  const baseM = commune.prixMedianM2.maison;
  const startA = baseA / (1 + commune.evolutionPrix5ans / 100);
  const startM = baseM / (1 + commune.evolutionPrix5ans / 100);
  for (let i = 0; i < months; i++) {
    const t = i / (months - 1);
    const noise = (rng() - 0.5) * 0.04;
    const appartement = Math.round(startA + (baseA - startA) * t + baseA * noise);
    const maison = Math.round(startM + (baseM - startM) * t + baseM * noise);
    const d = new Date();
    d.setMonth(d.getMonth() - (months - 1 - i));
    out.push({ date: d.toISOString().slice(0, 7), appartement, maison });
  }
  return out;
}

export function distributionPrix(commune: Commune): DistributionPrix[] {
  const items = getAnnoncesByCommune(commune.id);
  const buckets: Record<string, number> = {
    "< 100k": 0,
    "100–200k": 0,
    "200–300k": 0,
    "300–500k": 0,
    "500k–1M": 0,
    "> 1M": 0,
  };
  for (const a of items) {
    if (a.prix < 100_000) buckets["< 100k"]++;
    else if (a.prix < 200_000) buckets["100–200k"]++;
    else if (a.prix < 300_000) buckets["200–300k"]++;
    else if (a.prix < 500_000) buckets["300–500k"]++;
    else if (a.prix < 1_000_000) buckets["500k–1M"]++;
    else buckets["> 1M"]++;
  }
  return Object.entries(buckets).map(([tranche, count]) => ({ tranche, count }));
}

export function repartitionPieces(commune: Commune): RepartitionPieces[] {
  const items = getAnnoncesByCommune(commune.id);
  const groups: Record<RepartitionPieces["type"], number[]> = {
    T1: [],
    T2: [],
    T3: [],
    T4: [],
    "T5+": [],
  };
  for (const a of items) {
    const key: RepartitionPieces["type"] =
      a.pieces <= 1 ? "T1" : a.pieces === 2 ? "T2" : a.pieces === 3 ? "T3" : a.pieces === 4 ? "T4" : "T5+";
    groups[key].push(a.surface);
  }
  return (Object.keys(groups) as RepartitionPieces["type"][]).map((type) => {
    const arr = groups[type].sort((a, b) => a - b);
    const med = arr.length ? arr[Math.floor(arr.length / 2)] : 0;
    return { type, count: arr.length, surfaceMediane: med };
  });
}

export function saisonnaliteVolumes(commune: Commune): { mois: string; count: number }[] {
  const mois = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
  const rng = seededRandom(commune.population);
  const base = commune.volumeTransactions12m / 12;
  return mois.map((m, i) => {
    const seasonal = i >= 4 && i <= 6 ? 1.25 : i === 7 ? 0.7 : i >= 8 && i <= 9 ? 1.18 : 0.92;
    return { mois: m, count: Math.round(base * seasonal * (0.85 + rng() * 0.3)) };
  });
}

export function trimestresPrix(commune: Commune): { trimestre: string; prixMedian: number }[] {
  const series = serieHistoriquePrix(commune);
  const grouped: Record<string, number[]> = {};
  for (const s of series) {
    const [year, month] = s.date.split("-").map(Number);
    const q = Math.floor((month - 1) / 3) + 1;
    const key = `${year} T${q}`;
    grouped[key] = grouped[key] || [];
    grouped[key].push((s.appartement + s.maison) / 2);
  }
  return Object.entries(grouped)
    .slice(-8)
    .map(([trimestre, vals]) => ({
      trimestre,
      prixMedian: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length),
    }));
}
