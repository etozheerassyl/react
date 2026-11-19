import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getItemsList,
  getItemById,
  getDashboardStats,
  createItem,
  updateItem,
  deleteItem,
} from "../services/service";
import { assetKeys } from "../services/queryKeys";

export function useItemsList(queryString = "") {
  const query = useQuery({
    queryKey: assetKeys.list(queryString),
    queryFn: ({ signal }) => getItemsList(queryString, { signal }),
  });

  return {
    items: query.data?.data ?? [],
    totalItems: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 1,
    page: query.data?.page ?? 1,
    dataSource: query.data?.meta?.source ?? "network",
    cachedAt: query.data?.meta?.cachedAt ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isStale: query.isStale,
    dataUpdatedAt: query.dataUpdatedAt,
    isOfflineError: Boolean(query.error?.isOffline),
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}

export function useItemDetail(id) {
  const query = useQuery({
    queryKey: assetKeys.detail(id),
    queryFn: ({ signal }) => getItemById(id, { signal }),
    enabled: Boolean(id),
  });

  const errorMessage = query.error?.message ?? null;
  const isMissing = Boolean(
    errorMessage &&
      (errorMessage.includes("not found") || errorMessage.includes("Invalid asset"))
  );

  const record = query.data?.item ?? (query.data && "id" in query.data ? query.data : null);
  const meta = query.data?.meta ?? null;

  return {
    item: record,
    dataSource: meta?.source ?? "network",
    cachedAt: meta?.cachedAt ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isStale: query.isStale,
    dataUpdatedAt: query.dataUpdatedAt,
    isMissing,
    isOfflineError: Boolean(query.error?.isOffline),
    error: isMissing ? null : errorMessage,
    refetch: query.refetch,
  };
}

export function useDashboardStats(selectedCategory = "All") {
  const query = useQuery({
    queryKey: assetKeys.dashboard(selectedCategory),
    queryFn: ({ signal }) => getDashboardStats(selectedCategory, { signal }),
  });

  return {
    stats: query.data ?? null,
    dataSource: query.data?.meta?.source ?? "network",
    cachedAt: query.data?.meta?.cachedAt ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isStale: query.isStale,
    dataUpdatedAt: query.dataUpdatedAt,
    isOfflineError: Boolean(query.error?.isOffline),
    error: query.error?.message ?? null,
    refetch: query.refetch,
  };
}

export function useCreateAssetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createItem(formData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: assetKeys.all });
    },
  });
}

export function useUpdateAssetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, changes }) => updateItem(id, changes),
    onSuccess: async (updatedItem, variables) => {
      queryClient.setQueryData(assetKeys.detail(variables.id), {
        item: updatedItem,
        meta: { source: "local", cachedAt: null, receivedAt: Date.now() },
      });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: assetKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: assetKeys.dashboards() }),
      ]);
    },
  });
}

export function useDeleteAssetMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteItem(id),
    onSuccess: async (_, deletedId) => {
      queryClient.removeQueries({ queryKey: assetKeys.detail(deletedId) });
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: assetKeys.lists() }),
        queryClient.invalidateQueries({ queryKey: assetKeys.dashboards() }),
      ]);
    },
  });
}
