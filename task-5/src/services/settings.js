export const DATA_KEY = "aegis_task5_assets_db";

export const API_CONFIG = {
  minDelay: 250,
  maxDelay: 500,
  errorChance: 0.0, // Default 0% failure for smooth experience, configurable via Defense Lab
};

let currentConfig = { ...API_CONFIG };

export function getApiConfig() {
  return { ...currentConfig };
}

export function setApiConfig(newConfig) {
  currentConfig = {
    ...currentConfig,
    ...newConfig,
  };
  return { ...currentConfig };
}

