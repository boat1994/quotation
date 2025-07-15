import { materialPrices, diamondShapes } from './constants.js';

export const formatCurrency = (value) =>
  (value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'THB',
  });

export const getStoneRemarks = (stone) => {
    const qty = typeof stone.quantity === 'string' ? parseInt(stone.quantity, 10) : stone.quantity;
    const qtyText = (qty > 1 && isFinite(qty)) ? ` x ${qty}` : '';
    if (stone.useDetails) {
        if (!stone.weight) return `Diamond details pending...${qtyText}`;
        return `${diamondShapes[stone.shape]}, ${stone.weight || '0'}ct, Color: ${stone.color}, Cut: ${stone.cut}, Clarity: ${stone.clarity}${qtyText}`;
    }
    return stone.manualRemarks ? `${stone.manualRemarks}${qtyText}` : '';
};

export const calculateCosts = ({
  customerName,
  images,
  material,
  grams,
  showGramsInQuote,
  cadCost,
  mainStone,
  sideStones,
  laborCost,
  margin,
}) => {
    const materialBasePrice = materialPrices[material] || 0;
    const calculatedMaterialCost = (parseFloat(grams) || 0) * materialBasePrice * 1.15;
    const calculatedCadCost = parseFloat(cadCost) || 0;
    const calculatedMainStoneCost = parseFloat(mainStone.cost) || 0;
    const calculatedSideStonesCost = sideStones.reduce(
        (total, stone) => total + ((parseFloat(stone.cost) || 0) * (parseInt(String(stone.quantity), 10) || 1)), 0
    );
    const calculatedLaborCost = parseFloat(laborCost) || 0;

    const subtotal =
      calculatedMaterialCost +
      calculatedCadCost +
      calculatedMainStoneCost +
      calculatedSideStonesCost +
      calculatedLaborCost;

    const marginPercentage = parseFloat(margin) || 0;
    const marginAmount = subtotal * (marginPercentage / 100);
    const totalPrice = subtotal + marginAmount;

    return {
      customerName,
      images,
      material,
      grams,
      showGramsInQuote,
      materialCost: calculatedMaterialCost,
      cadCost: calculatedCadCost,
      mainStoneCost: calculatedMainStoneCost,
      mainStoneRemarks: getStoneRemarks(mainStone),
      sideStonesCost: calculatedSideStonesCost,
      sideStonesRemarks: sideStones.map(getStoneRemarks).filter(Boolean).join('\n'),
      laborCost: calculatedLaborCost,
      subtotal,
      marginPercentage,
      marginAmount,
      totalPrice,
    };
};
