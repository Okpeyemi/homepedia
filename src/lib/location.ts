import type { Commune } from "./types";
import type { AdminLevel } from "./api";

export type ActiveLocation = {
  insee: string;
  label: string;
  level: AdminLevel;
  parentLabel?: string;
  mock?: Commune;
};

export function fromMockCommune(c: Commune): ActiveLocation {
  return {
    insee: c.insee,
    label: c.nom,
    level: "commune",
    parentLabel: c.departement,
    mock: c,
  };
}
