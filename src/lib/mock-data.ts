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
    id: "aix-en-provence",
    insee: "13001",
    nom: "Aix-en-Provence",
    codePostal: "13100",
    departement: "Bouches-du-Rhône",
    region: "Provence-Alpes-Côte d'Azur",
    centre: [5.4474, 43.5297],
    population: 145325,
    populationEvol10ans: 1.4,
    tauxChomage: 9.6,
    revenuMedian: 25380,
    partProprietaires: 40,
    partResidencesPrincipales: 82,
    prixMedianM2: { appartement: 5420, maison: 6840 },
    prixMoyenM2: 5680,
    prixMinM2: 3400,
    prixMaxM2: 12200,
    evolutionPrix1an: -0.8,
    evolutionPrix3ans: 8.4,
    evolutionPrix5ans: 21.6,
    medianeDepartement: 3960,
    medianeRegion: 4180,
    volumeTransactions12m: 2120,
    evolutionVolume: -4.2,
    delaiMoyenVente: 78,
    repartitionDpe: { A: 2, B: 7, C: 24, D: 33, E: 21, F: 10, G: 3 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 78, maison: 22 },
    scores: { securite: 7.0, education: 7.8, transport: 7.2, environnement: 7.4 },
    education: {
      maternelles: 28,
      primaires: 34,
      colleges: 12,
      lycees: 8,
      distanceLyceeMoyenne: 720,
    },
    transport: { arretsRayon500m: 22, gare: true, distanceGare: 950 },
    avis: {
      nombreAvis: 1640,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 71, neutre: 21, negatif: 8 },
      topPositifs: ["Cours Mirabeau", "Marchés", "Soleil", "Patrimoine", "Festivals"],
      topNegatifs: ["Stationnement", "Prix logement", "Tourisme été", "Travaux", "Circulation"],
      wordCloud: [
        { mot: "soleil", poids: 92 },
        { mot: "fontaines", poids: 76 },
        { mot: "marché", poids: 84 },
        { mot: "festival", poids: 70 },
        { mot: "patrimoine", poids: 88 },
        { mot: "étudiant", poids: 64 },
        { mot: "cher", poids: 58 },
      ],
    },
  },
  {
    id: "mougins",
    insee: "06085",
    nom: "Mougins",
    codePostal: "06250",
    departement: "Alpes-Maritimes",
    region: "Provence-Alpes-Côte d'Azur",
    centre: [7.0028, 43.6011],
    population: 18800,
    populationEvol10ans: 0.6,
    tauxChomage: 7.4,
    revenuMedian: 36420,
    partProprietaires: 65,
    partResidencesPrincipales: 78,
    prixMedianM2: { appartement: 5320, maison: 7480 },
    prixMoyenM2: 6240,
    prixMinM2: 3600,
    prixMaxM2: 18000,
    evolutionPrix1an: 1.2,
    evolutionPrix3ans: 12.4,
    evolutionPrix5ans: 26.8,
    medianeDepartement: 4720,
    medianeRegion: 4180,
    volumeTransactions12m: 412,
    evolutionVolume: -3.1,
    delaiMoyenVente: 102,
    repartitionDpe: { A: 4, B: 12, C: 28, D: 30, E: 16, F: 8, G: 2 },
    dpeMoyen: "C",
    repartitionTypes: { appartement: 38, maison: 62 },
    scores: { securite: 8.2, education: 7.4, transport: 5.6, environnement: 8.6 },
    education: {
      maternelles: 6,
      primaires: 7,
      colleges: 3,
      lycees: 2,
      distanceLyceeMoyenne: 1620,
    },
    transport: { arretsRayon500m: 8, gare: false, distanceGare: 4200 },
    avis: {
      nombreAvis: 612,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 78, neutre: 17, negatif: 5 },
      topPositifs: ["Village perché", "Gastronomie", "Calme", "Golf", "Vues panoramiques"],
      topNegatifs: ["Voiture indispensable", "Peu de commerces", "Été chargé", "Prix"],
      wordCloud: [
        { mot: "village", poids: 94 },
        { mot: "gastronomie", poids: 86 },
        { mot: "golf", poids: 70 },
        { mot: "calme", poids: 82 },
        { mot: "résidentiel", poids: 76 },
        { mot: "haut de gamme", poids: 72 },
      ],
    },
  },
  {
    id: "bordeaux",
    insee: "33063",
    nom: "Bordeaux",
    codePostal: "33000",
    departement: "Gironde",
    region: "Nouvelle-Aquitaine",
    centre: [-0.5733, 44.8576],
    population: 257068,
    populationEvol10ans: 7.4,
    tauxChomage: 8.8,
    revenuMedian: 24820,
    partProprietaires: 36,
    partResidencesPrincipales: 84,
    prixMedianM2: { appartement: 4920, maison: 5840 },
    prixMoyenM2: 5040,
    prixMinM2: 3100,
    prixMaxM2: 8200,
    evolutionPrix1an: -3.6,
    evolutionPrix3ans: 2.4,
    evolutionPrix5ans: 18.2,
    medianeDepartement: 3680,
    medianeRegion: 3120,
    volumeTransactions12m: 3120,
    evolutionVolume: -6.4,
    delaiMoyenVente: 84,
    repartitionDpe: { A: 2, B: 6, C: 22, D: 34, E: 22, F: 11, G: 3 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 72, maison: 28 },
    scores: { securite: 6.6, education: 8.0, transport: 8.4, environnement: 7.4 },
    education: {
      maternelles: 42,
      primaires: 56,
      colleges: 19,
      lycees: 14,
      distanceLyceeMoyenne: 520,
    },
    transport: { arretsRayon500m: 38, gare: true, distanceGare: 380 },
    avis: {
      nombreAvis: 2480,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 73, neutre: 19, negatif: 8 },
      topPositifs: ["Quais", "Vins", "Architecture", "Tramway", "Gastronomie"],
      topNegatifs: ["Loyers", "Travaux", "Stationnement", "Bruit nuit", "Météo"],
      wordCloud: [
        { mot: "vin", poids: 92 },
        { mot: "quais", poids: 90 },
        { mot: "tramway", poids: 78 },
        { mot: "pierre blonde", poids: 74 },
        { mot: "étudiant", poids: 70 },
        { mot: "cher", poids: 64 },
      ],
    },
  },
  {
    id: "lege-cap-ferret",
    insee: "33236",
    nom: "Lège-Cap-Ferret",
    codePostal: "33950",
    departement: "Gironde",
    region: "Nouvelle-Aquitaine",
    centre: [-1.2444, 44.6794],
    population: 8400,
    populationEvol10ans: 1.8,
    tauxChomage: 7.6,
    revenuMedian: 28640,
    partProprietaires: 68,
    partResidencesPrincipales: 38,
    prixMedianM2: { appartement: 8200, maison: 11200 },
    prixMoyenM2: 9480,
    prixMinM2: 5400,
    prixMaxM2: 22000,
    evolutionPrix1an: 2.8,
    evolutionPrix3ans: 24.6,
    evolutionPrix5ans: 52.4,
    medianeDepartement: 3680,
    medianeRegion: 3120,
    volumeTransactions12m: 318,
    evolutionVolume: -1.6,
    delaiMoyenVente: 124,
    repartitionDpe: { A: 3, B: 8, C: 24, D: 30, E: 22, F: 10, G: 3 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 24, maison: 76 },
    scores: { securite: 8.6, education: 6.4, transport: 4.4, environnement: 9.4 },
    education: {
      maternelles: 4,
      primaires: 5,
      colleges: 1,
      lycees: 0,
      distanceLyceeMoyenne: 24000,
    },
    transport: { arretsRayon500m: 6, gare: false, distanceGare: 28000 },
    avis: {
      nombreAvis: 1840,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 86, neutre: 11, negatif: 3 },
      topPositifs: ["Plages", "Cabanes ostréiculteurs", "Phare", "Vélo", "Sauvage"],
      topNegatifs: ["Été saturé", "Distance Bordeaux", "Prix immobilier", "Services hiver"],
      wordCloud: [
        { mot: "plage", poids: 98 },
        { mot: "cabanes", poids: 86 },
        { mot: "huîtres", poids: 92 },
        { mot: "dune", poids: 80 },
        { mot: "vélo", poids: 78 },
        { mot: "résidence secondaire", poids: 72 },
      ],
    },
  },
  {
    id: "gignac-la-nerthe",
    insee: "13043",
    nom: "Gignac-la-Nerthe",
    codePostal: "13180",
    departement: "Bouches-du-Rhône",
    region: "Provence-Alpes-Côte d'Azur",
    centre: [5.2356, 43.3989],
    population: 9650,
    populationEvol10ans: 2.4,
    tauxChomage: 9.4,
    revenuMedian: 22480,
    partProprietaires: 62,
    partResidencesPrincipales: 92,
    prixMedianM2: { appartement: 3480, maison: 4180 },
    prixMoyenM2: 3680,
    prixMinM2: 2400,
    prixMaxM2: 5800,
    evolutionPrix1an: 0.4,
    evolutionPrix3ans: 6.8,
    evolutionPrix5ans: 14.2,
    medianeDepartement: 3960,
    medianeRegion: 4180,
    volumeTransactions12m: 184,
    evolutionVolume: -2.8,
    delaiMoyenVente: 92,
    repartitionDpe: { A: 1, B: 4, C: 18, D: 32, E: 26, F: 14, G: 5 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 32, maison: 68 },
    scores: { securite: 6.4, education: 6.2, transport: 5.8, environnement: 6.6 },
    education: {
      maternelles: 3,
      primaires: 4,
      colleges: 1,
      lycees: 1,
      distanceLyceeMoyenne: 2400,
    },
    transport: { arretsRayon500m: 9, gare: true, distanceGare: 1200 },
    avis: {
      nombreAvis: 248,
      source: "Google Maps",
      sentimentGlobal: { positif: 58, neutre: 28, negatif: 14 },
      topPositifs: ["Proximité Marseille", "Calme", "Prix abordables", "Train direct"],
      topNegatifs: ["Bruit aéroport", "Peu de commerces", "Voiture", "Vent"],
      wordCloud: [
        { mot: "résidentiel", poids: 78 },
        { mot: "abordable", poids: 70 },
        { mot: "train", poids: 64 },
        { mot: "aéroport", poids: 58 },
        { mot: "calme", poids: 66 },
      ],
    },
  },
  {
    id: "cannes",
    insee: "06029",
    nom: "Cannes",
    codePostal: "06400",
    departement: "Alpes-Maritimes",
    region: "Provence-Alpes-Côte d'Azur",
    centre: [7.0174, 43.5528],
    population: 73340,
    populationEvol10ans: -1.4,
    tauxChomage: 11.2,
    revenuMedian: 25620,
    partProprietaires: 44,
    partResidencesPrincipales: 56,
    prixMedianM2: { appartement: 6280, maison: 8420 },
    prixMoyenM2: 6720,
    prixMinM2: 3800,
    prixMaxM2: 18400,
    evolutionPrix1an: 0.6,
    evolutionPrix3ans: 9.8,
    evolutionPrix5ans: 22.4,
    medianeDepartement: 4720,
    medianeRegion: 4180,
    volumeTransactions12m: 1180,
    evolutionVolume: -4.6,
    delaiMoyenVente: 96,
    repartitionDpe: { A: 2, B: 7, C: 24, D: 32, E: 20, F: 11, G: 4 },
    dpeMoyen: "D",
    repartitionTypes: { appartement: 88, maison: 12 },
    scores: { securite: 6.0, education: 7.2, transport: 7.6, environnement: 7.4 },
    education: {
      maternelles: 14,
      primaires: 17,
      colleges: 6,
      lycees: 5,
      distanceLyceeMoyenne: 680,
    },
    transport: { arretsRayon500m: 28, gare: true, distanceGare: 460 },
    avis: {
      nombreAvis: 2240,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 69, neutre: 21, negatif: 10 },
      topPositifs: ["Croisette", "Festival", "Plages", "Yachting", "Vieux port"],
      topNegatifs: ["Été saturé", "Prix", "Stationnement", "Foule", "Bruit nuit"],
      wordCloud: [
        { mot: "croisette", poids: 94 },
        { mot: "festival", poids: 90 },
        { mot: "yacht", poids: 78 },
        { mot: "plage", poids: 88 },
        { mot: "luxe", poids: 80 },
        { mot: "foule", poids: 64 },
      ],
    },
  },
  {
    id: "saint-tropez",
    insee: "83119",
    nom: "Saint-Tropez",
    codePostal: "83990",
    departement: "Var",
    region: "Provence-Alpes-Côte d'Azur",
    centre: [6.6406, 43.2727],
    population: 4100,
    populationEvol10ans: -2.6,
    tauxChomage: 7.0,
    revenuMedian: 33420,
    partProprietaires: 52,
    partResidencesPrincipales: 32,
    prixMedianM2: { appartement: 13200, maison: 17400 },
    prixMoyenM2: 14820,
    prixMinM2: 7400,
    prixMaxM2: 42000,
    evolutionPrix1an: 3.4,
    evolutionPrix3ans: 28.6,
    evolutionPrix5ans: 64.2,
    medianeDepartement: 4180,
    medianeRegion: 4180,
    volumeTransactions12m: 142,
    evolutionVolume: -2.2,
    delaiMoyenVente: 156,
    repartitionDpe: { A: 4, B: 10, C: 26, D: 28, E: 18, F: 10, G: 4 },
    dpeMoyen: "C",
    repartitionTypes: { appartement: 42, maison: 58 },
    scores: { securite: 7.8, education: 6.0, transport: 4.8, environnement: 8.8 },
    education: {
      maternelles: 2,
      primaires: 3,
      colleges: 1,
      lycees: 0,
      distanceLyceeMoyenne: 22000,
    },
    transport: { arretsRayon500m: 12, gare: false, distanceGare: 38000 },
    avis: {
      nombreAvis: 2920,
      source: "Google Maps + TripAdvisor",
      sentimentGlobal: { positif: 74, neutre: 17, negatif: 9 },
      topPositifs: ["Port", "Plages Pampelonne", "Village", "Festivités", "Vues"],
      topNegatifs: ["Été saturé", "Prix", "Accès difficile", "Foule", "Vie hiver"],
      wordCloud: [
        { mot: "village", poids: 88 },
        { mot: "port", poids: 92 },
        { mot: "yacht", poids: 84 },
        { mot: "luxe", poids: 86 },
        { mot: "plage", poids: 90 },
        { mot: "exclusif", poids: 78 },
      ],
    },
  },
];

const photosApartment = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551361415-69c87624334f?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1486304873000-235643847519?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80&auto=format&fit=crop",
];

const photosHouse = [
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80&auto=format&fit=crop",
];

const photosInterior = [
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80&auto=format&fit=crop",
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
      const cover = isMaison
        ? photosHouse[Math.floor(rng() * photosHouse.length)]
        : photosApartment[Math.floor(rng() * photosApartment.length)];
      const gallery: string[] = [cover];
      for (let g = 0; g < 3; g++) {
        gallery.push(photosInterior[Math.floor(rng() * photosInterior.length)]);
      }

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
        photos: gallery,
      });
    }
  }
  return out;
})();

export function getCommune(id: string): Commune | undefined {
  return communes.find((c) => c.id === id);
}

export function getCommuneByInsee(insee: string): Commune | undefined {
  return communes.find((c) => c.insee === insee);
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
