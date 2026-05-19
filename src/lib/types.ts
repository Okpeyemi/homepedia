export type DpeClass = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export type BienType = "appartement" | "maison";

export type Commune = {
  id: string;
  nom: string;
  codePostal: string;
  departement: string;
  region: string;
  centre: [number, number]; // [lon, lat]
  population: number;
  populationEvol10ans: number; // %
  tauxChomage: number; // %
  revenuMedian: number; // €/UC
  partProprietaires: number; // %
  partResidencesPrincipales: number; // %
  prixMedianM2: { appartement: number; maison: number };
  prixMoyenM2: number;
  prixMinM2: number;
  prixMaxM2: number;
  evolutionPrix1an: number; // %
  evolutionPrix3ans: number;
  evolutionPrix5ans: number;
  medianeDepartement: number;
  medianeRegion: number;
  volumeTransactions12m: number;
  evolutionVolume: number; // %
  delaiMoyenVente: number; // jours
  repartitionDpe: Record<DpeClass, number>; // %
  dpeMoyen: DpeClass;
  repartitionTypes: { appartement: number; maison: number }; // %
  scores: {
    securite: number;
    education: number;
    transport: number;
    environnement: number;
  };
  education: {
    maternelles: number;
    primaires: number;
    colleges: number;
    lycees: number;
    distanceLyceeMoyenne: number; // m
  };
  transport: {
    arretsRayon500m: number;
    gare: boolean;
    distanceGare: number; // m
  };
  avis: {
    nombreAvis: number;
    source: string;
    sentimentGlobal: { positif: number; neutre: number; negatif: number };
    topPositifs: string[];
    topNegatifs: string[];
    wordCloud: { mot: string; poids: number }[];
  };
};

export type Annonce = {
  id: string;
  communeId: string;
  type: BienType;
  prix: number;
  surface: number;
  pieces: number;
  prixM2: number;
  dpe: DpeClass;
  energie: number; // kWh/m²/an
  dateMiseEnLigne: string; // ISO
  titre: string;
  adresse: string;
  position: [number, number]; // [lon, lat]
  description: string;
};

export type SeriePrix = {
  date: string; // YYYY-MM
  appartement: number;
  maison: number;
};

export type DistributionPrix = {
  tranche: string;
  count: number;
};

export type RepartitionPieces = {
  type: "T1" | "T2" | "T3" | "T4" | "T5+";
  count: number;
  surfaceMediane: number;
};
