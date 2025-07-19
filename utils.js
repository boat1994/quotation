


import { diamondConversionTableLimited, colorableMaterialKeys } from './constants.js';
import { t } from './i18n.js';

export const formatCurrency = (value, lang = 'en') =>
  (value || 0).toLocaleString(lang === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
  });

export const getStoneRemarks = (stone, lang = 'en') => {
    let autoRemarks = '';
    
    if (stone.calculationMode === 'byDiameter') {
        const conversion = diamondConversionTableLimited.find(d => d.diameter_mm === String(stone.diameter));
        let baseRemark;
        if (conversion) {
            const weight = parseFloat(conversion.weight_ct);
            baseRemark = `${t(lang, 'round')} ${stone.diameter}${t(lang, 'mmUnit')} (${weight.toFixed(3)}${t(lang, 'carat')})`;
        } else {
            baseRemark = `${t(lang, 'round')} ${stone.diameter}${t(lang, 'mmUnit')}`;
        }
        
        const details = [
            `${t(lang, 'color')}: ${stone.color}`,
            `${t(lang, 'clarity')}: ${t(lang, stone.clarity)}`
        ];

        autoRemarks = [baseRemark, ...details].join(', ');
    }

    if (stone.calculationMode === 'details') {
        if (!stone.weight) {
            autoRemarks = t(lang, 'waitingForDetails');
        } else {
            const parts = [
                t(lang, stone.shape),
                `${stone.weight || '0'} ${t(lang, 'carat')}`,
                `${t(lang, 'color')}: ${stone.color}`,
                `${t(lang, 'cut')}: ${t(lang, stone.cut)}`,
                `${t(lang, 'clarity')}: ${t(lang, stone.clarity)}`,
                `${t(lang, 'polish')}: ${t(lang, stone.polish)}`
            ];
            autoRemarks = parts.join(', ');
        }
    }

    if (stone.calculationMode === 'manual') {
        autoRemarks = stone.manualRemarks || '';
    }
    
    const parts = [autoRemarks];
    const qty = typeof stone.quantity === 'string' ? parseInt(stone.quantity, 10) : stone.quantity;
    if (qty > 1 && isFinite(qty)) {
        parts.push(`x ${qty} ${t(lang, 'pcsUnit')}`);
    }

    if (stone.additionalRemarks) {
        parts.push(`${t(lang, 'remarksLabel')}${stone.additionalRemarks}`);
    }
    
    return parts.filter(Boolean).join('\n');
};

export const getStoneRemarksForCopy = (stone, lang = 'en') => {
    let baseRemark = '';
    if (stone.calculationMode === 'byDiameter') {
        const shapeText = t(lang, 'round');
        baseRemark = `${shapeText} ${stone.diameter}${t(lang, 'mmUnit')}`;
    } else if (stone.calculationMode === 'details') {
        if (!stone.weight) {
            baseRemark = '';
        } else {
            const parts = [
                t(lang, stone.shape),
                `${stone.weight || '0'} ${t(lang, 'carat')}`
            ];
            baseRemark = parts.join(' ');
        }
    } else { // manual mode
        baseRemark = stone.manualRemarks || '';
    }

    const parts = [baseRemark];
    const qty = typeof stone.quantity === 'string' ? parseInt(stone.quantity, 10) : stone.quantity;
    if (qty > 1 && isFinite(qty)) {
        parts.push(`x ${qty} ${t(lang, 'pcsUnit')}`);
    }

    if (stone.additionalRemarks) {
        parts.push(`${t(lang, 'remarksLabel')}${stone.additionalRemarks}`);
    }
    
    return parts.filter(Boolean).join('\n');
};

export const calculateCosts = ({
  customerName,
  jewelryType,
  size,
  images,
  material,
  materialColor,
  platingColor,
  grams,
  showGramsInQuote,
  cadCost,
  mainStone,
  sideStones,
  laborCost,
  margin,
  language,
  materialPrices,
  settingCosts,
}) => {
    const materialBasePrice = materialPrices[material] || 0;
    const calculatedMaterialCost = (parseFloat(grams) || 0) * materialBasePrice * 1.15;
    const calculatedCadCost = parseFloat(cadCost) || 0;
    const calculatedMainStoneCost = parseFloat(mainStone.cost) || 0;
    const calculatedSideStonesCost = sideStones.reduce(
        (total, stone) => total + ((parseFloat(stone.cost) || 0) * (parseInt(String(stone.quantity), 10) || 1)), 0
    );

    const mainStoneSettingCost = (parseFloat(mainStone.cost) || 0) > 0 ? (settingCosts.mainStone || 0) : 0;
    const sideStonesTotalQuantity = sideStones.reduce(
        (total, stone) => total + (parseInt(String(stone.quantity), 10) || 0), 0
    );
    const sideStonesSettingCost = sideStonesTotalQuantity * (settingCosts.sideStone || 0);
    const calculatedSettingCost = mainStoneSettingCost + sideStonesSettingCost;

    const calculatedLaborCost = parseFloat(laborCost) || 0;

    const subtotal =
      calculatedMaterialCost +
      calculatedCadCost +
      calculatedMainStoneCost +
      calculatedSideStonesCost +
      calculatedSettingCost +
      calculatedLaborCost;

    const marginPercentage = parseFloat(margin) || 0;
    const marginAmount = subtotal * (marginPercentage / 100);
    const totalPrice = subtotal + marginAmount;

    const isColorable = colorableMaterialKeys.includes(material);
    let fullMaterialName;
    if (material === 'silver925') {
        fullMaterialName = `${t(language, material)} (${t(language, platingColor)})`;
    } else if (isColorable) {
        const materialTextEn = t('en', material); // e.g. "Gold 14k"
        const qualityMatch = materialTextEn.match(/\d+k/);
        const quality = qualityMatch ? qualityMatch[0] : ''; // "14k"
        
        const colorTextEn = t('en', materialColor); // e.g. "White Gold"

        fullMaterialName = `${quality} ${colorTextEn}`; // "14k White Gold", same for both languages
    } else {
        fullMaterialName = t(language, material);
    }
        
    let sizeDetails = '';
    if (size) {
        switch (jewelryType) {
            case 'ring':
                sizeDetails = `${size}`;
                break;
            case 'necklace':
            case 'bracelet':
                sizeDetails = `${size} ${t(language, 'cmUnit')}`;
                break;
            case 'earring':
                sizeDetails = t(language, size);
                break;
        }
    }

    return {
      customerName,
      jewelryType,
      sizeDetails,
      images,
      material,
      materialColor,
      isColorable,
      fullMaterialName,
      grams,
      showGramsInQuote,
      materialPricePerGram: materialBasePrice,
      materialCost: calculatedMaterialCost,
      cadCost: calculatedCadCost,
      mainStoneCost: calculatedMainStoneCost,
      mainStoneRemarks: getStoneRemarks(mainStone, language),
      sideStonesCost: calculatedSideStonesCost,
      sideStonesRemarks: sideStones.map(stone => getStoneRemarks(stone, language)).filter(Boolean).join('\n'),
      mainStoneRemarksForCopy: getStoneRemarksForCopy(mainStone, language),
      sideStonesRemarksForCopy: sideStones.map(stone => getStoneRemarksForCopy(stone, language)).filter(Boolean).join('\n'),
      settingCost: calculatedSettingCost,
      laborCost: calculatedLaborCost,
      subtotal,
      marginPercentage,
      marginAmount,
      totalPrice,
    };
};