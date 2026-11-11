export function parseListFilters(query = "") {
  const params = new URLSearchParams(query);
  return {
    search: params.get("search")?.trim() || "",
    status: params.get("status") || "All",
    category: params.get("category") || "All",
    priority: params.get("priority") || "All",
    sort: params.get("sort") || "name",
    page: Math.max(1, Number(params.get("page")) || 1),
    limit: Math.max(1, Number(params.get("limit")) || 6),
  };
}

export const assetKeys = {
  all: ["assets"],
  lists: () => [...assetKeys.all, "list"],
  list: (queryOrFilters = "") => {
    const normalized =
      typeof queryOrFilters === "string"
        ? parseListFilters(queryOrFilters)
        : {
            search: queryOrFilters.search?.trim() || "",
            status: queryOrFilters.status || "All",
            category: queryOrFilters.category || "All",
            priority: queryOrFilters.priority || "All",
            sort: queryOrFilters.sort || "name",
            page: Math.max(1, Number(queryOrFilters.page) || 1),
            limit: Math.max(1, Number(queryOrFilters.limit) || 6),
          };
    return [...assetKeys.lists(), normalized];
  },
  details: () => [...assetKeys.all, "detail"],
  detail: (id) => [...assetKeys.details(), String(id)],
  dashboards: () => [...assetKeys.all, "dashboard"],
  dashboard: (category = "All") => [...assetKeys.dashboards(), category || "All"],
};

