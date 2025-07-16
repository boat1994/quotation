export const materialPrices = {
  silver925: 50,
  gold9k: 1300,
  gold14k: 2100,
  gold18k: 2600,
  pt950: 1790,
};

export const materialKeys = ['silver925', 'gold9k', 'gold14k', 'gold18k', 'pt950'];

export const jewelryTypeKeys = ['ring', 'bracelet', 'necklace', 'earring', 'pendant'];

export const diamondShapeKeys = ['round', 'princess', 'emerald', 'oval', 'marquise', 'pear', 'cushion'];

export const diamondColors = ['D', 'E', 'F', 'G', 'H', 'I', 'J'];

export const diamondDetailKeys = ['EX', 'VG'];


export const getInitialStoneState = () => ({
  cost: '',
  useDetails: false,
  shape: 'round',
  weight: '',
  color: 'D',
  cut: 'EX',
  clarity: 'EX',
  polish: 'EX',
  manualRemarks: '',
  quantity: 1,
  id: `main-${Date.now()}`,
});