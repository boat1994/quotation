import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatCurrency, getFullMaterialName } from './utils.js';
import { sarabunBase64 } from './font.js';
import { t } from './i18n.js';
import { logoTransparentBase64 } from './logo_base64.js';
import { CORRECT_PIN } from './constants.js';


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
        let totalBlockHeight = renderedHeight;

        const descriptionLineHeight = 6;
        const descriptionMargin = 6; // One row margin

        if (image.description) {
            doc.setFontSize(14);
            const splitDesc = doc.splitTextToSize(image.description, usableWidth);
            totalBlockHeight += descriptionMargin + splitDesc.length * descriptionLineHeight + 2; // description height + padding
        }

        if (yPos + totalBlockHeight > pageHeight - margin) {
            doc.addPage();
            doc.setFont('Sarabun'); // Ensure font is set for new page
            doc.setFontSize(16);
            doc.text(t(lang, 'pdfRefImagesTitleCont'), 105, 15, { align: 'center' });
            yPos = 25;
        }
        
        const imageType = image.src.split(';')[0].split('/')[1].toUpperCase();
        doc.addImage(image.src, imageType, margin, yPos, usableWidth, renderedHeight);
        yPos += renderedHeight;

        if (image.description) {
            yPos += descriptionMargin;
            doc.setFontSize(14);
            const splitDesc = doc.splitTextToSize(image.description, usableWidth);
            doc.text(splitDesc, margin, yPos);
            yPos += splitDesc.length * descriptionLineHeight + 2;
        }

        yPos += imageGap;
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
    addTermSection('pdfWeightVariationTitle', 'pdfWeightVariationText');
    addTermSection('pdfCancellationTitle', 'pdfCancellationText');

    return yPos;
};

// Common function to initialize a new jsPDF document
const initializeDoc = (userPassword = null) => {
    const options = userPassword ? {
        encryption: {
            userPassword,
            ownerPassword: CORRECT_PIN,
            userPermissions: ["print"]
        }
    } : {};
    const doc = new jsPDF(options);
    doc.addFileToVFS('Sarabun-Regular.ttf', sarabunBase64);
    doc.addFont('Sarabun-Regular.ttf', 'Sarabun', 'normal');
    doc.setFont('Sarabun');
    return doc;
};

// Common header for all PDFs
const addHeader = (doc, lang, title, dateString, customerName) => {
    doc.setFontSize(20);
    doc.text(title, 105, 18, { align: 'center' });
    doc.setFontSize(11);
    doc.addImage(logoTransparentBase64, 'PNG', 20, 20, 30, 30);
    doc.text(`${t(lang, 'pdfDateLabel')}${dateString}`, 190, 28, { align: 'right' });
    if (customerName) {
        doc.text(`${t(lang, 'pdfForLabel')}${customerName}`, 190, 36, { align: 'right' });
    }
    doc.setLineWidth(0.5);
    doc.line(20, 45, 190, 45);
};

export const generateShopPdf = (summary, lang) => {
    const doc = initializeDoc(summary.customerName.replace(/\s/g, '').toLowerCase());
    const dateLocale = lang === 'th' ? 'th-TH' : 'en-US';
    const dateString = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });
    
    addHeader(doc, lang, t(lang, 'shopPdfTitle'), dateString, summary.customerName);

    doc.setFontSize(16);
    doc.text(t(lang, 'pdfProjectCostTitle'), 105, 60, { align: 'center' });

    const body = [
        [t(lang, 'pdfMaterialPricePerGramLabel'), `${summary.fullMaterialName} @ ${formatCurrency(summary.materialPricePerGram, lang)}/${t(lang, 'gramsUnit')}`],
        [t(lang, 'pdfTotalMaterialCostLabel'), formatCurrency(summary.materialCost, lang), `(${summary.grams || 0}${t(lang, 'gramsUnit')}) ${t(lang, 'lossLabel')}`],
        [t(lang, 'pdfCadCostLabel'), formatCurrency(summary.cadCost, lang)],
        [{ content: t(lang, 'pdfMainStoneLabel'), styles: {fontStyle: 'bold'} }, '', summary.mainStoneRemarks],
        ['', formatCurrency(summary.mainStoneCost, lang)],
        [{ content: t(lang, 'pdfSideStoneLabel'), styles: {fontStyle: 'bold'} }, '', summary.sideStonesRemarks],
        ['', formatCurrency(summary.sideStonesCost, lang)],
        [t(lang, 'pdfSettingCostLabel'), formatCurrency(summary.settingCost, lang)],
        [t(lang, 'pdfLaborCostLabel'), formatCurrency(summary.laborCost, lang)],
        [{ content: t(lang, 'pdfSubtotalLabel'), styles: { fontStyle: 'bold' } }, { content: formatCurrency(summary.subtotal, lang), styles: { fontStyle: 'bold', halign: 'right' } }],
        [t(lang, 'pdfMarginLabel', { marginPercentage: summary.marginPercentage.toFixed(2) }), { content: formatCurrency(summary.marginAmount, lang), styles: { halign: 'right' } }],
        [{ content: t(lang, 'pdfTotalEstCostLabel'), styles: { fontStyle: 'bold', fillColor: [220, 220, 220], textColor: [0, 0, 0] } }, { content: formatCurrency(summary.totalPrice, lang), colSpan: 2, styles: { fontStyle: 'bold', halign: 'right', fillColor: [220, 220, 220], textColor: [0, 0, 0] } }]
    ].filter(row => row.some(cell => (typeof cell === 'object' ? cell.content : cell) ));

    autoTable(doc, {
        startY: 68,
        body,
        theme: 'grid',
        styles: { font: 'Sarabun', cellPadding: 3, fontSize: 11 },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 35, halign: 'right' },
            2: { cellWidth: 'auto', minCellWidth: 65 },
        },
        didParseCell: (data) => {
            if (data.row.raw[2]) {
                data.cell.styles.halign = 'left';
            }
        }
    });

    let finalY = doc.lastAutoTable.finalY;
    finalY = addRemarksToPdf(doc, summary.remarksForFactoryShop, finalY, lang);
    addImagesToPdf(doc, summary.images, lang);
    
    return doc.output('blob');
};

export const generateCustomerPdf = (summary, lang) => {
    const doc = initializeDoc();
    const dateLocale = lang === 'th' ? 'th-TH' : 'en-US';
    const dateString = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

    addHeader(doc, lang, t(lang, 'customerPdfTitle'), dateString, summary.customerName);

    doc.setFontSize(16);
    doc.text(t(lang, 'pdfProjectDetailsTitle'), 20, 60);

    const specs = [
        [t(lang, 'pdfJewelryTypeLabel'), t(lang, summary.jewelryType)],
        summary.sizeDetails ? [t(lang, 'pdfSizeLabel'), summary.sizeDetails] : null,
        [t(lang, 'pdfMaterialLabel'), `${summary.fullMaterialName}${summary.showGramsInQuote ? ` (~${summary.grams || 0}${t(lang, 'gramsUnit')})` : ''}`],
        summary.mainStoneRemarks ? [t(lang, 'pdfMainStoneLabel'), summary.mainStoneRemarks] : null,
        summary.sideStonesRemarks ? [t(lang, 'pdfSideStoneLabel'), summary.sideStonesRemarks] : null,
    ].filter(Boolean);

    autoTable(doc, {
        startY: 68,
        body: specs,
        theme: 'plain',
        styles: { font: 'Sarabun', fontSize: 12 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    });

    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(16);
    doc.setFont('Sarabun', 'bold');
    doc.text(t(lang, 'pdfTotalEstPriceLabel'), 20, finalY);
    doc.text(formatCurrency(summary.totalPrice, lang), 190, finalY, { align: 'right' });
    doc.setFont('Sarabun', 'normal');

    finalY = addRemarksToPdf(doc, summary.remarksForCustomer, finalY, lang);
    finalY = addTermsAndConditions(doc, lang, finalY);
    addImagesToPdf(doc, summary.images, lang);

    return doc.output('blob');
};

export const generateFactoryPdf = (summary, lang) => {
    const doc = initializeDoc();
    const dateLocale = lang === 'th' ? 'th-TH' : 'en-US';
    const dateString = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

    addHeader(doc, lang, t(lang, 'factoryPdfTitle'), dateString, summary.customerName);
    
    doc.setFontSize(16);
    doc.text(t(lang, 'pdfProjectDetailsTitle'), 20, 60);

    const specs = [
        [t(lang, 'pdfJewelryTypeLabel'), t(lang, summary.jewelryType)],
        summary.sizeDetails ? [t(lang, 'pdfSizeLabel'), summary.sizeDetails] : null,
        [t(lang, 'pdfMaterialLabel'), `${summary.fullMaterialName} (${summary.grams || 0}${t(lang, 'gramsUnit')})`],
        summary.mainStoneRemarks ? [t(lang, 'pdfMainStoneLabel'), summary.mainStoneRemarks] : null,
        summary.sideStonesRemarks ? [t(lang, 'pdfSideStoneLabel'), summary.sideStonesRemarks] : null,
    ].filter(Boolean);

    autoTable(doc, {
        startY: 68,
        body: specs,
        theme: 'plain',
        styles: { font: 'Sarabun', fontSize: 12 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    });
    
    let finalY = doc.lastAutoTable.finalY;
    finalY = addRemarksToPdf(doc, summary.remarksForFactoryShop, finalY, lang);
    addImagesToPdf(doc, summary.images, lang);

    return doc.output('blob');
};

export const generateComparisonPdf = (summary, comparisonData, lang) => {
    const doc = initializeDoc();
    const dateLocale = lang === 'th' ? 'th-TH' : 'en-US';
    const dateString = new Date().toLocaleDateString(dateLocale, { year: 'numeric', month: 'long', day: 'numeric' });

    addHeader(doc, lang, t(lang, 'comparisonPdfTitle'), dateString, summary.customerName);

    doc.setFontSize(16);
    doc.text(t(lang, 'pdfProjectDetailsTitle'), 20, 60);

    const specs = [
        [t(lang, 'pdfJewelryTypeLabel'), t(lang, summary.jewelryType)],
        summary.sizeDetails ? [t(lang, 'pdfSizeLabel'), summary.sizeDetails] : null,
        summary.mainStoneRemarks ? [t(lang, 'pdfMainStoneLabel'), summary.mainStoneRemarks] : null,
        summary.sideStonesRemarks ? [t(lang, 'pdfSideStoneLabel'), summary.sideStonesRemarks] : null,
    ].filter(Boolean);

    autoTable(doc, {
        startY: 68,
        body: specs,
        theme: 'plain',
        styles: { font: 'Sarabun', fontSize: 12 },
        columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 } },
    });
    
    let finalY = doc.lastAutoTable.finalY + 10;

    const comparisonHead = [[
        t(lang, 'comparisonMaterial'),
        `${t(lang, 'comparisonWeight')} (${t(lang, 'gramsUnit')})`,
        t(lang, 'comparisonPrice')
    ]];

    const sortedComparisonData = [...comparisonData].sort((a, b) => {
        const order = { 'gold9k': 1, 'gold14k': 2, 'gold18k': 3 };
        return order[a.material] - order[b.material];
    });

    const comparisonBody = sortedComparisonData.map(item => [
        item.name,
        item.weight,
        formatCurrency(item.price, lang)
    ]);
    
    autoTable(doc, {
        startY: finalY,
        head: comparisonHead,
        body: comparisonBody,
        theme: 'grid',
        styles: { font: 'Sarabun', cellPadding: 3, fontSize: 11 },
        headStyles: { fontStyle: 'bold', fillColor: [220, 220, 220], textColor: [0, 0, 0] },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 50, halign: 'right' },
            2: { cellWidth: 50, halign: 'right' },
        },
        didParseCell: (data) => {
            const originalMaterialName = getFullMaterialName(summary.material, summary.materialColor, '', lang);
            if (data.section === 'body' && data.row.raw[0] === originalMaterialName) {
                data.cell.styles.fontStyle = 'bold';
            }
        },
    });

    finalY = doc.lastAutoTable.finalY;

    finalY = addRemarksToPdf(doc, summary.remarksForCustomer, finalY, lang);
    finalY = addTermsAndConditions(doc, lang, finalY);
    addImagesToPdf(doc, summary.images, lang);

    return doc.output('blob');
};