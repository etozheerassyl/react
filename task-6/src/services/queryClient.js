import { QueryClient } from "@tanstack/react-query";
import { assetKeys } from "./queryKeys.js";

export const CACHE_POLICY = {
  staleTimeMs: 30 * 1000, // 30 seconds fresh window before background revalidation
  gcTimeMs: 5 * 60 * 1000, // 5 minutes inactive cache expiration / garbage collection
};

function isNonRetriableError(error) {
  const msg = error?.message || "";
  return msg.includes("not found") || msg.includes("Invalid asset");
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: CACHE_POLICY.staleTimeMs,
      gcTime: CACHE_POLICY.gcTimeMs,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: (failureCount, error) => {
        if (isNonRetriableError(error)) return false;
        return failureCount < 1;
      },
    },
  },
});

export function getCacheSnapshot() {
  return queryClient
    .getQueryCache()
    .getAll()
    .map((query) => ({
      queryHash: query.queryHash,
      queryKey: query.queryKey,
      status: query.state.status,
      fetchStatus: query.state.fetchStatus,
      isStale: query.isStale(),
      dataUpdatedAt: query.state.dataUpdatedAt,
      observersCount: query.getObserversCount(),
    }));
}

export function subscribeToQueryCache(callback) {
  return queryClient.getQueryCache().subscribe(() => {
    callback(getCacheSnapshot());
  });
}

export async function invalidateAllAssetCaches() {
  await queryClient.invalidateQueries({ queryKey: assetKeys.all });
}

