import { createContext } from "react";
import type { CatalogPayload } from "../lib/api";

export type CatalogContextValue = {
  data: CatalogPayload | null;
  loading: boolean;
  error: string | null;
  reload: () => void;
};

export const CatalogContext = createContext<CatalogContextValue | null>(null);
