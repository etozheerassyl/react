import { useState, useEffect, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  subscribeToApiLogs,
  getApiConfig,
  setApiConfig,
  resetDatabase,
} from "../services/service";
import {
  CACHE_POLICY,
  getCacheSnapshot,
  subscribeToQueryCache,
  invalidateAllAssetCaches,
} from "../services/queryClient";
import { assetKeys } from "../services/queryKeys";

export function useNetworkLab() {
  const queryClient = useQueryClient();
  const [apiLogs, setApiLogs] = useState([]);
  const [apiConfig, setApiConfigState] = useState(() => getApiConfig());
  const [cacheEntries, setCacheEntries] = useState(() => getCacheSnapshot());

  useEffect(() => {
    const unsubscribeLogs = subscribeToApiLogs((logEvent) => {
      setApiLogs((prev) => [logEvent, ...prev.slice(0, 49)]);
    });

    const unsubscribeCache = subscribeToQueryCache((snapshot) => {
      setCacheEntries(snapshot);
    });

    return () => {
      unsubscribeLogs();
      unsubscribeCache();
    };
  }, []);

  const updateApiConfig = useCallback((newCfg) => {
    const updated = setApiConfig(newCfg);
    setApiConfigState(updated);
    return updated;
  }, []);

  const resetDbMutation = useMutation({
    mutationFn: () => resetDatabase(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: assetKeys.all });
    },
  });

  const invalidateCache = useCallback(async () => {
    await invalidateAllAssetCaches();
  }, []);

  return {
    apiLogs,
    apiConfig,
    cacheEntries,
    cachePolicy: CACHE_POLICY,
    updateApiConfig,
    resetDatabase: resetDbMutation.mutateAsync,
    isResettingDb: resetDbMutation.isPending,
    invalidateCache,
  };
}

