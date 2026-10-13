// Key to store data in localStorage
export const DATA_KEY = "fake-tech-assets-v2";

// Configs for fake API
export const API_CONFIG = {
  minDelay: 600,
  maxDelay: 2200,
  errorChance: 0.05,
};

// Helper to dynamically adjust latency and errorChance for demonstrations
export function getApiConfig() {
  return { ...API_CONFIG };
}

export function setApiConfig(newConfig) {
  if (typeof newConfig.minDelay === "number") API_CONFIG.minDelay = Math.max(0, newConfig.minDelay);
  if (typeof newConfig.maxDelay === "number") API_CONFIG.maxDelay = Math.max(API_CONFIG.minDelay, newConfig.maxDelay);
  if (typeof newConfig.errorChance === "number") API_CONFIG.errorChance = Math.min(1, Math.max(0, newConfig.errorChance));
  return { ...API_CONFIG };
}
