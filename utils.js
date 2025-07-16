import { materialPrices } from './constants.js';
import { t } from './i18n.js';

export const formatCurrency = (value, lang = 'en') =>
  (value || 0).toLocaleString(lang === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
  });

export const getStoneRemarks = (stone, lang = 'en') => {
    const qty = typeof stone.quantity === 'string' ? parseInt(stone.quantity, 10) : stone.quantity;
    const qtyText = (qty > 1 && isFinite(qty)) ? ` x ${qty}` : '';
    if (stone.useDetails) {
        if (!stone.weight) return `${t(lang, 'waitingForDetails')}${qtyText}`;
        
        const parts = [
            t(lang, stone.shape),
            `${stone.weight || '0'} ${t(lang, 'carat')}`,
            `${t(lang, 'color')}: ${stone.color}`,
            `${t(lang, 'cut')}: ${t(lang, stone.cut)}`,
            `${t(lang, 'clarity')}: ${t(lang, stone.clarity)}`,
            `${t(lang, 'polish')}: ${t(lang, stone.polish)}`
        ];
        
        return `${parts.join(', ')}${qtyText}`;
    }
    return stone.manualRemarks ? `${stone.manualRemarks}${qtyText}` : '';
};

export const calculateCosts = ({
  customerName,
  jewelryType,
  images,
  material,
  grams,
  showGramsInQuote,
  cadCost,
  mainStone,
  sideStones,
  laborCost,
  margin,
  language
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
      jewelryType,
      images,
      material,
      grams,
      showGramsInQuote,
      materialCost: calculatedMaterialCost,
      cadCost: calculatedCadCost,
      mainStoneCost: calculatedMainStoneCost,
      mainStoneRemarks: getStoneRemarks(mainStone, language),
      sideStonesCost: calculatedSideStonesCost,
      sideStonesRemarks: sideStones.map(stone => getStoneRemarks(stone, language)).filter(Boolean).join('\n'),
      laborCost: calculatedLaborCost,
      subtotal,
      marginPercentage,
      marginAmount,
      totalPrice,
    };
};