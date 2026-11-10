import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { fetchCatalog, type CatalogPayload } from "../lib/api";
import { CatalogContext } from "./catalog-context";

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CatalogPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setData(await fetchCatalog());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat katalog.");
    } finally {
      setLoading(false);
    }
  }, []);

  const reload = useCallback(() => {
    setLoading(true);
    void load();
  }, [load]);

  useEffect(() => {
    // oxlint-disable-next-line react/set-state-in-effect -- initial catalog fetch
    void load();
  }, [load]);

  const value = useMemo(() => ({ data, loading, error, reload }), [data, loading, error, reload]);

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}
