

export const CORRECT_PIN = '151515';


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

export const conversionFactors = {
  sterlingSilver: { sterlingSilver: 1.00, gold9k: 1.11, gold14k: 1.31, gold18k: 1.50, gold22ct: 1.73, fineGold: 1.87, platinum: 2.08 },
  gold9k: { sterlingSilver: 0.90, gold9k: 1.00, gold14k: 1.18, gold18k: 1.36, gold22ct: 1.59, fineGold: 1.72, platinum: 1.88 },
  gold14k: { sterlingSilver: 0.76, gold9k: 0.85, gold14k: 1.00, gold18k: 1.14, gold22ct: 1.29, fineGold: 1.40, platinum: 1.59 },
  gold18k: { sterlingSilver: 0.67, gold9k: 0.74, gold14k: 0.88, gold18k: 1.00, gold22ct: 1.15, fineGold: 1.25, platinum: 1.34 },
  gold22ct: { sterlingSilver: 0.58, gold9k: 0.63, gold14k: 0.78, gold18k: 0.90, gold22ct: 1.00, fineGold: 1.08, platinum: 1.21 },
  fineGold: { sterlingSilver: 0.53, gold9k: 0.58, gold14k: 0.72, gold18k: 0.83, gold22ct: 0.94, fineGold: 1.00, platinum: 1.11 },
  platinum: { sterlingSilver: 0.48, gold9k: 0.53, gold14k: 0.63, gold18k: 0.72, gold22ct: 0.83, fineGold: 0.90, platinum: 1.00 }
};

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