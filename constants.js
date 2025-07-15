export const materialPrices = {
  silver925: 50,
  gold9k: 1300,
  gold14k: 2100,
  gold18k: 2600,
  pt950: 1790,
};

export const diamondShapes = {
  round: 'Round Cut',
  princess: 'Princess Cut',
  emerald: 'Emerald Cut',
  oval: 'Oval Cut',
  marquise: 'Marquise Cut',
  pear: 'Pear Cut',
  cushion: 'Cushion Cut',
};

export const diamondColors = ['D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const diamondCuts = { EX: 'Excellent', VG: 'Very Good' };
export const diamondClarities = { EX: 'Excellent', VG: 'Very Good' };

export const getInitialStoneState = () => ({
  cost: '',
  useDetails: false,
  shape: 'round',
  weight: '',
  color: 'D',
  cut: 'EX',
  clarity: 'EX',
  manualRemarks: '',
  quantity: '1',
  id: `main-${Date.now()}`,
});
