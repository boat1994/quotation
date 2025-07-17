


import jsPDF from 'jspdf';
import { formatCurrency } from './utils.js';
import { sarabunBase64 } from './font.js';
import { t } from './i18n.js';
import { logoTransparentBase64 } from './logo_base64.js';


const addImagesToPdf = (doc, images, lang) => {
    if (!images || images.length === 0) return;

    doc.addPage();
    doc.setFont('Sarabun'); // Ensure font is set for new page
    doc.setFontSize(16);
    doc.text(t(lang, 'pdfRefImagesTitle'), 105, 15, { align: 'center' });

    const margin = 20;
    const pageHeight = doc.internal.pageSize.getHeight();
    const usableWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const imageGap = 10;
    let yPos = 25;

    images.forEach((image) => {
        const aspectRatio = image.height / image.width;
        const renderedHeight = usableWidth * aspectRatio;

        if (yPos + renderedHeight > pageHeight - margin) {
            doc.addPage();
            doc.setFont('Sarabun'); // Ensure font is set for new page
            doc.setFontSize(16);
            doc.text(t(lang, 'pdfRefImagesTitleCont'), 105, 15, { align: 'center' });
            yPos = 25;
        }
        
        const imageType = image.src.split(';')[0].split('/')[1].toUpperCase();
        doc.addImage(image.src, imageType, margin, yPos, usableWidth, renderedHeight);
        yPos += renderedHeight + imageGap;
    });
};

const addRemarksToPdf = (doc, remarks, yPos, lang) => {
    if (!remarks || remarks.trim() === '') return yPos;
    yPos += 10;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    doc.setFontSize(14);
    doc.text(t(lang, 'pdfRemarksLabel'), 20, yPos);
    yPos += 6;
    doc.setFontSize(11);
    const splitRemarks = doc.splitTextToSize(remarks, 170);
    doc.text(splitRemarks, 20, yPos);
    yPos += (splitRemarks.length) * 5;
    return yPos;
};

const addTermsAndConditions = (doc, lang, startY) => {
    let yPos = startY;
    const pageHeight = doc.internal.pageSize.getHeight();
    const bottomMargin = 20;

    const checkPageBreak = (spaceNeeded) => {
        if (yPos + spaceNeeded > pageHeight - bottomMargin) {
            doc.addPage();
            doc.setFont('Sarabun'); // Reset font on new page
            yPos = 20;
        }
    };
    
    checkPageBreak(25);
    yPos += 15;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    doc.setFontSize(12);
    doc.text(t(lang, 'pdfTermsTitle'), 20, yPos);
    yPos += 7;

    const addTermSection = (titleKey, textKeys) => {
        const titleText = t(lang, titleKey);
        checkPageBreak(20); // estimate space needed for a section
        
        doc.setFontSize(10);
        doc.text(titleText, 22, yPos);
        doc.setLineWidth(0.1);
        doc.line(22, yPos + 1, 22 + doc.getTextWidth(titleText), yPos + 1); // Underline
        yPos += 5;
        
        doc.setFontSize(9);

        const keys = Array.isArray(textKeys) ? textKeys : [textKeys];
        keys.forEach(key => {
            const text = t(lang, key);
            const splitText = doc.splitTextToSize(text, 166); // slightly narrower for indent
            checkPageBreak(splitText.length * 4);
            doc.text(splitText, 25, yPos, { charSpace: -0.05 });
            yPos += splitText.length * 4;
        });
        yPos += 4; // space between sections
    };

    addTermSection('pdfPriceValidityTitle', 'pdfPriceValidityText');
    addTermSection('pdfPaymentTermsTitle', ['pdfPaymentTerm1', 'pdfPaymentTerm2']);
    addTermSection('pdfPaymentMethodTitle', 'pdfPaymentMethodText');
    addTermSection('pdfLeadTimeTitle', 'pdfLeadTimeText');
    addTermSection('pdfCancellationTitle', 'pdfCancellationText');

    return yPos;
};

export const generateShopPdf = (summary, lang) => {
    const doc = new jsPDF({
    encryption: {
    userPassword: "151515",
    ownerPassword: "151515",
    userPermissions: ["print", "modify", "copy", "annot-forms"] // Define permissions
  }
});
    doc.addFileToVFS('Sarabun-Regular.ttf', sarabunBase64);
    doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
    doc.setFont('Sarabun');

    const dateLocale = lang === 'th' ? 'th-TH' : 'en-US';
    const dateString = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

    // Header
    doc.setFontSize(20);
    doc.text(t(lang, 'shopPdfTitle'), 105, 18, { align: 'center' });
    doc.setFontSize(11);
    doc.text('Bogus', 20, 28);
    doc.text(`${t(lang, 'pdfDateLabel')}${dateString}`, 190, 28, { align: 'right' });
    doc.setLineWidth(0.5);
    doc.line(20, 34, 190, 34);
    
    let yPos = 42;
    if (summary.customerName) {
        doc.text(`${t(lang, 'pdfForLabel')}${summary.customerName}`, 20, 40);
        yPos = 48;
    }

    doc.setFontSize(14);
    doc.text(t(lang, 'pdfProjectCostTitle'), 20, yPos);
    yPos += 8;

    const lineItem = (label, value, remarks = '') => {
      doc.setFontSize(11);
      doc.text(label, 20, yPos);
      doc.text(value, 190, yPos, { align: 'right' });
      if (remarks) {
        yPos += 5;
        doc.setFontSize(9);
        const splitRemarks = doc.splitTextToSize(remarks, 168);
        doc.text(splitRemarks, 22, yPos);
        yPos += (splitRemarks.length) * 3.5;
      }
      yPos += 8;
    };
    
    lineItem(t(lang, 'pdfMaterialPricePerGramLabel'), formatCurrency(summary.materialPricePerGram, lang), summary.fullMaterialName);
    const materialLabel = `(${summary.grams || 0}${t(lang, 'gramsUnit')}) ${t(lang, 'lossLabel')}`;
    lineItem(t(lang, 'pdfTotalMaterialCostLabel'), formatCurrency(summary.materialCost, lang), materialLabel);

    lineItem(t(lang, 'pdfCadCostLabel'), formatCurrency(summary.cadCost, lang));
    lineItem(t(lang, 'pdfMainStoneCostLabel'), formatCurrency(summary.mainStoneCost, lang), summary.mainStoneRemarks);
    lineItem(t(lang, 'pdfSideStonesCostLabel'), formatCurrency(summary.sideStonesCost, lang), summary.sideStonesRemarks);
    lineItem(t(lang, 'pdfSettingCostLabel'), formatCurrency(summary.settingCost, lang));
    lineItem(t(lang, 'pdfLaborCostLabel'), formatCurrency(summary.laborCost, lang));
    
    yPos += 1;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 6;

    lineItem(t(lang, 'pdfSubtotalLabel'), formatCurrency(summary.subtotal, lang));
    const marginText = t(lang, 'pdfMarginLabel', { marginPercentage: summary.marginPercentage });
    lineItem(marginText, formatCurrency(summary.marginAmount, lang));
    
    yPos += 4;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    doc.setFontSize(16);
    doc.text(`${t(lang, 'pdfTotalEstCostLabel')}`, 20, yPos);
    doc.text(formatCurrency(summary.totalPrice, lang), 190, yPos, { align: 'right' });
    
    yPos = addRemarksToPdf(doc, summary.remarksForFactoryShop, yPos, lang);

    addImagesToPdf(doc, summary.images, lang);
    
    return doc.output('blob');
};

export const generateCustomerPdf = (summary, lang) => {
    const doc = new jsPDF();
    doc.addFileToVFS('Sarabun-Regular.ttf', sarabunBase64);
    doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
    doc.setFont('Sarabun');

    const dateLocale = lang === 'th' ? 'th-TH' : 'en-US';
    const dateString = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

    // Header
    const logoSize = 25;
    doc.addImage(logoTransparentBase64, 'PNG', 20, 12, logoSize, logoSize);

    doc.setFontSize(20);
    doc.text(t(lang, 'customerPdfTitle'), 105, 25, { align: 'center' });
    doc.setFontSize(11);
    doc.text(`${t(lang, 'pdfDateLabel')}${dateString}`, 190, 25, { align: 'right' });
    doc.setLineWidth(0.5);
    doc.line(20, 42, 190, 42);

    let yPos = 50;
    if (summary.customerName) {
        doc.text(`${t(lang, 'pdfForLabel')}${summary.customerName}`, 20, 48);
        yPos = 56;
    }

    doc.setFontSize(14);
    doc.text(t(lang, 'pdfProjectDetailsTitle'), 20, yPos);
    yPos += 8;

    const specItem = (label, details) => {
        doc.setFontSize(11);
        doc.text(label, 20, yPos);
        const splitDetails = doc.splitTextToSize(details, 140);
        doc.text(splitDetails, 55, yPos);
        yPos += (splitDetails.length) * 5 + 3;
    };
    
    if(summary.jewelryType) specItem(t(lang, 'pdfJewelryTypeLabel'), t(lang, summary.jewelryType));
    if(summary.sizeDetails) specItem(t(lang, 'pdfSizeLabel'), summary.sizeDetails);
    const materialGrams = summary.showGramsInQuote ? ` (${summary.grams || 0}${t(lang, 'gramsUnit')})` : '';
    const materialLabel = `${summary.fullMaterialName}${materialGrams}`;
    specItem(t(lang, 'pdfMaterialLabel'), materialLabel);
    if(summary.mainStoneRemarks) specItem(t(lang, 'pdfMainStoneLabel'), summary.mainStoneRemarks);
    if(summary.sideStonesRemarks) specItem(t(lang, 'pdfSideStoneLabel'), summary.sideStonesRemarks);

    yPos += 10;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    doc.setFontSize(16);
    doc.text(`${t(lang, 'pdfTotalEstPriceLabel')}`, 20, yPos);
    doc.text(formatCurrency(summary.totalPrice, lang), 190, yPos, { align: 'right' });

    yPos = addRemarksToPdf(doc, summary.remarksForCustomer, yPos, lang);

    yPos = addTermsAndConditions(doc, lang, yPos);
    
    addImagesToPdf(doc, summary.images, lang);
    return doc.output('blob');
};

export const generateFactoryPdf = (summary, lang) => {
    const doc = new jsPDF();
    doc.addFileToVFS('Sarabun-Regular.ttf', sarabunBase64);
    doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
    doc.setFont('Sarabun');

    const dateLocale = lang === 'th' ? 'th-TH' : 'en-US';
    const dateString = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

    // Header
    doc.setFontSize(20);
    doc.text(t(lang, 'factoryPdfTitle'), 105, 18, { align: 'center' });
    doc.setFontSize(11);
    doc.text('Bogus', 20, 28);
    doc.text(`${t(lang, 'pdfDateLabel')}${dateString}`, 190, 28, { align: 'right' });
    doc.setLineWidth(0.5);
    doc.line(20, 34, 190, 34);

    let yPos = 42;
    // Customer name intentionally omitted for factory work order.

    doc.setFontSize(14);
    doc.text(t(lang, 'pdfProjectDetailsTitle'), 20, yPos);
    yPos += 8;

    const specItem = (label, details) => {
        if (!details) return;
        doc.setFontSize(11);
        doc.text(label, 20, yPos);
        const splitDetails = doc.splitTextToSize(details, 140);
        doc.text(splitDetails, 55, yPos);
        yPos += (splitDetails.length) * 5 + 3;
    };
    
    if(summary.jewelryType) specItem(t(lang, 'pdfJewelryTypeLabel'), t(lang, summary.jewelryType));
    if(summary.sizeDetails) specItem(t(lang, 'pdfSizeLabel'), summary.sizeDetails);
    
    // Factory needs weight, so always include it.
    const materialLabel = `${summary.fullMaterialName} (${summary.grams || 0}${t(lang, 'gramsUnit')})`;
    specItem(t(lang, 'pdfMaterialLabel'), materialLabel);

    if(summary.mainStoneRemarks) specItem(t(lang, 'pdfMainStoneLabel'), summary.mainStoneRemarks);
    if(summary.sideStonesRemarks) specItem(t(lang, 'pdfSideStoneLabel'), summary.sideStonesRemarks);

    yPos = addRemarksToPdf(doc, summary.remarksForFactoryShop, yPos, lang);

    addImagesToPdf(doc, summary.images, lang);
    return doc.output('blob');
};