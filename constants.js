



export const DEFAULT_PIN = import.meta.env.VITE_DEFAULT_PIN ;


export const defaultMaterialPrices = {
  silver925: 100,
  gold9k: 1500,
  gold14k: 2300,
  gold18k: 2800,
  pt950: 1890,
};

export const defaultSettingCosts = {
    mainStone: 100,
    sideStone: 15,
};

export const materialKeys = ['silver925', 'gold9k', 'gold14k', 'gold18k', 'pt950'];

export const colorableMaterialKeys = ['gold9k', 'gold14k', 'gold18k'];
export const materialColorKeys = ['yellowGold', 'whiteGold', 'roseGold'];
export const platingColorKeys = ['rhodium', 'yellowGoldPlating', 'roseGoldPlating'];

export const jewelryTypeKeys = ['ring', 'bracelet', 'necklace', 'earring', 'pendant'];
export const earringSizeKeys = ['s', 'm', 'l', 'xl'];

export const diamondShapeKeys = ['round', 'princess', 'emerald', 'oval', 'marquise', 'pear', 'cushion'];

export const diamondColors = ['D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const diamondDetailKeys = ['EX', 'VG'];
export const diamondClarityKeys = ['VVS', 'VS', 'SI'];

export const diamondConversionTableLimited = [
  { "diameter_mm": "0.80", "weight_ct": "0.0025" },
  { "diameter_mm": "0.90", "weight_ct": "0.004" },
  { "diameter_mm": "1.00", "weight_ct": "0.005" },
  { "diameter_mm": "1.10", "weight_ct": "0.006" },
  { "diameter_mm": "1.15", "weight_ct": "0.007" },
  { "diameter_mm": "1.20", "weight_ct": "0.008" },
  { "diameter_mm": "1.25", "weight_ct": "0.009" },
  { "diameter_mm": "1.30", "weight_ct": "0.01" },
  { "diameter_mm": "1.35", "weight_ct": "0.011" },
  { "diameter_mm": "1.40", "weight_ct": "0.012" },
  { "diameter_mm": "1.45", "weight_ct": "0.013" },
  { "diameter_mm": "1.50", "weight_ct": "0.014" },
  { "diameter_mm": "1.55", "weight_ct": "0.015" },
  { "diameter_mm": "1.60", "weight_ct": "0.018" },
  { "diameter_mm": "1.70", "weight_ct": "0.021" },
  { "diameter_mm": "1.80", "weight_ct": "0.025" },
  { "diameter_mm": "1.90", "weight_ct": "0.03" },
  { "diameter_mm": "2.00", "weight_ct": "0.035" },
  { "diameter_mm": "2.10", "weight_ct": "0.04" },
  { "diameter_mm": "2.20", "weight_ct": "0.045" },
  { "diameter_mm": "2.30", "weight_ct": "0.05" },
  { "diameter_mm": "2.40", "weight_ct": "0.06" },
  { "diameter_mm": "2.50", "weight_ct": "0.065" },
  { "diameter_mm": "2.60", "weight_ct": "0.07" },
  { "diameter_mm": "2.70", "weight_ct": "0.08" },
  { "diameter_mm": "2.80", "weight_ct": "0.09" },
  { "diameter_mm": "2.90", "weight_ct": "0.095" },
  { "diameter_mm": "3.00", "weight_ct": "0.10" },
  { "diameter_mm": "3.10", "weight_ct": "0.11" },
  { "diameter_mm": "3.20", "weight_ct": "0.12" },
  { "diameter_mm": "3.30", "weight_ct": "0.14" },
  { "diameter_mm": "3.40", "weight_ct": "0.15" },
  { "diameter_mm": "3.50", "weight_ct": "0.16" },
  { "diameter_mm": "3.60", "weight_ct": "0.17" },
  { "diameter_mm": "3.70", "weight_ct": "0.18" },
  { "diameter_mm": "3.80", "weight_ct": "0.2" },
  { "diameter_mm": "3.90", "weight_ct": "0.22" }
];

// This is the single source of truth for weight conversion factors.
// All values are ratios of density relative to 18ct Gold, based on the original matrix
// to maintain pricing consistency.
const baseRatios = {
  sterlingSilver: 0.67,
  gold9ct: 0.74,
  gold14ct: 0.88,
  gold18ct: 1.00,
  gold22ct: 1.15,
  fineGold: 1.25,
  platinum: 1.34
};

// Map app-specific keys (like 'gold9k') to the canonical keys used in baseRatios ('gold9ct').
// This allows both the main form and the weight converter tool to use the same matrix.
const keyMap = {
  silver925: 'sterlingSilver',
  gold9k: 'gold9ct',
  gold14k: 'gold14ct',
  gold18k: 'gold18ct',
  pt950: 'platinum',
};

// Combine all possible keys from the app and the converter tool.
const allMaterialKeys = [...new Set([
  ...Object.keys(baseRatios),
  ...Object.keys(keyMap)
])];

// Programmatically generate a fully reciprocal conversion matrix.
// This ensures that converting a weight back and forth (e.g., 18k -> 14k -> 18k)
// results in the original value, eliminating rounding drift.
export const conversionFactors = {};
allMaterialKeys.forEach(fromKey => {
  conversionFactors[fromKey] = {};
  allMaterialKeys.forEach(toKey => {
    // Resolve to the canonical key to look up the base ratio.
    const canonicalFrom = keyMap[fromKey] || fromKey;
    const canonicalTo = keyMap[toKey] || toKey;

    if (baseRatios[canonicalFrom] && baseRatios[canonicalTo]) {
      const fromRatio = baseRatios[canonicalFrom];
      const toRatio = baseRatios[canonicalTo];
      // The conversion factor is the ratio of the densities (and thus weights for a given volume).
      conversionFactors[fromKey][toKey] = toRatio / fromRatio;
    }
  });
});

export const getInitialStoneState = () => ({
  cost: '',
  calculationMode: 'manual', // 'manual', 'details', 'byDiameter'
  shape: 'round',
  weight: '',
  color: 'D',
  cut: 'EX',
  clarity: 'VVS',
  polish: 'EX',
  manualRemarks: '',
  additionalRemarks: '',
  quantity: 1,
  id: `main-${Date.now()}`,
  diameter: '1.00',
  pricePerCarat: '',
});