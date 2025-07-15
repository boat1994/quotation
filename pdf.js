import jsPDF from 'jspdf';
import { sarabunBase64 } from './font.js';
import { formatCurrency } from './utils.js';

const FONT_NAME = 'Sarabun-Regular';

// Helper to initialize the PDF and add the Thai font
const initializePdf = () => {
    const doc = new jsPDF();
    // Add the custom font to the virtual file system
    doc.addFileToVFS('Sarabun-Regular.ttf', sarabunBase64);
    // Add the font to jsPDF
    doc.addFont('Sarabun-Regular.ttf', FONT_NAME, 'normal');
    doc.addFont('Sarabun-Regular.ttf', FONT_NAME, 'bold');
    doc.addFont('Sarabun-Regular.ttf', FONT_NAME, 'italic');
    // Set the font for the entire document
    doc.setFont(FONT_NAME, 'normal');
    return doc;
};


const generatePdfHeader = (doc, title, customerName) => {
  doc.setFont(FONT_NAME, 'bold');
  doc.setFontSize(20);
  doc.text(title, 105, 18, { align: 'center' });
  
  doc.setFont(FONT_NAME, 'normal');
  doc.setFontSize(11);
  doc.text('Your Jewelry Company', 20, 28);
  doc.text(`Date: ${new Date().toLocaleDateString('en-CA')}`, 190, 28, { align: 'right' });
  
  doc.setLineWidth(0.5);
  doc.line(20, 34, 190, 34);
  
  let yPos = 42;
  if (customerName) {
      doc.text(`For: ${customerName}`, 20, 40);
      yPos = 48;
  }
  return yPos;
};

const addImagesToPdf = (doc, images) => {
    if (!images || images.length === 0) return;

    doc.addPage();
    doc.setFont(FONT_NAME, 'bold');
    doc.setFontSize(16);
    doc.text('Reference Images', 105, 15, { align: 'center' });

    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const usableWidth = pageWidth - margin * 2;
    const startY = 25;
    const gap = 8;

    const drawImage = (imgData, x, y, w, h) => {
        try {
            const imageType = imgData.split(';')[0].split('/')[1].toUpperCase();
            doc.addImage(imgData, imageType, x, y, w, h);
        } catch(e) {
            console.error("Could not add image to PDF:", e);
        }
    };

    switch (images.length) {
        case 1: {
            const imgWidth = usableWidth * 0.7;
            const x = (pageWidth - imgWidth) / 2;
            drawImage(images[0], x, startY, imgWidth, imgWidth);
            break;
        }
        case 2: {
            const imgWidth = (usableWidth - gap) / 2;
            images.forEach((img, i) => {
                const x = margin + i * (imgWidth + gap);
                drawImage(img, x, startY, imgWidth, imgWidth);
            });
            break;
        }
        case 3: {
            const imgWidth = (usableWidth - gap * 2) / 3;
            images.forEach((img, i) => {
                const x = margin + i * (imgWidth + gap);
                drawImage(img, x, startY, imgWidth, imgWidth);
            });
            break;
        }
        case 4: { // 2x2 grid
            const imgWidth = (usableWidth - gap) / 2;
            images.forEach((img, i) => {
                const row = Math.floor(i / 2);
                const col = i % 2;
                const x = margin + col * (imgWidth + gap);
                const y = startY + row * (imgWidth + gap);
                drawImage(img, x, y, imgWidth, imgWidth);
            });
            break;
        }
        case 5: { // 2 on top, 3 on bottom
            const vGap = 10;
            // Top row (2 images)
            const topImgWidth = (usableWidth - gap) / 2;
            images.slice(0, 2).forEach((img, i) => {
                const x = margin + i * (topImgWidth + gap);
                drawImage(img, x, startY, topImgWidth, topImgWidth);
            });
            // Bottom row (3 images)
            const yBot = startY + topImgWidth + vGap;
            const botImgWidth = (usableWidth - gap * 2) / 3;
            images.slice(2).forEach((img, i) => {
                const x = margin + i * (botImgWidth + gap);
                drawImage(img, x, yBot, botImgWidth, botImgWidth);
            });
            break;
        }
    }
};

export const generateShopPdf = (summary, { material, grams }) => {
    const doc = initializePdf();
    let yPos = generatePdfHeader(doc, 'Quotation (Shop)', summary.customerName);

    doc.setFont(FONT_NAME, 'bold');
    doc.setFontSize(14);
    doc.text('Project Cost Breakdown', 20, yPos);
    yPos += 8;

    const lineItem = (label, value, remarks = '') => {
      doc.setFont(FONT_NAME, 'bold');
      doc.setFontSize(11);
      doc.text(label, 20, yPos);
      
      doc.setFont(FONT_NAME, 'normal');
      doc.text(value, 190, yPos, { align: 'right' });
      
      if (remarks) {
        yPos += 5;
        doc.setFont(FONT_NAME, 'italic');
        doc.setFontSize(9);
        const splitRemarks = doc.splitTextToSize(remarks, 168);
        doc.text(splitRemarks, 22, yPos);
        yPos += (splitRemarks.length) * 3.5;
      }
      yPos += 8;
    };
    
    const materialLabel = `${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())} (${grams || 0}g)`;
    lineItem('Material Cost (+15%)', formatCurrency(summary.materialCost), materialLabel);
    lineItem('CAD Cost', formatCurrency(summary.cadCost));
    lineItem('Main Stone Cost', formatCurrency(summary.mainStoneCost), summary.mainStoneRemarks);
    lineItem('Side Stones Cost', formatCurrency(summary.sideStonesCost), summary.sideStonesRemarks);
    lineItem('Labor Cost', formatCurrency(summary.laborCost));
    
    yPos += 1;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 6;

    lineItem('Subtotal', formatCurrency(summary.subtotal));
    lineItem(`Margin (${summary.marginPercentage}%)`, formatCurrency(summary.marginAmount));
    
    yPos += 4;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    doc.setFont(FONT_NAME, 'bold');
    doc.setFontSize(16);
    doc.text('Total Estimated Cost:', 20, yPos);
    doc.text(formatCurrency(summary.totalPrice), 190, yPos, { align: 'right' });

    addImagesToPdf(doc, summary.images);
    doc.save('Shop_Quotation.pdf');
};

export const generateCustomerPdf = (summary, { material, grams }) => {
    const doc = initializePdf();
    let yPos = generatePdfHeader(doc, 'Project Quotation', summary.customerName);
    
    doc.setFont(FONT_NAME, 'bold');
    doc.setFontSize(14);
    doc.text('Project Specifications', 20, yPos);
    yPos += 8;

    const specItem = (label, details) => {
        doc.setFont(FONT_NAME, 'bold');
        doc.setFontSize(11);
        doc.text(label, 20, yPos);

        doc.setFont(FONT_NAME, 'normal');
        const splitDetails = doc.splitTextToSize(details, 140);
        doc.text(splitDetails, 55, yPos);
        yPos += (splitDetails.length) * 5 + 3;
    };
    
    const materialGrams = summary.showGramsInQuote ? ` (${grams || 0}g)` : '';
    const materialLabel = `${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}${materialGrams}`;
    specItem('Material:', materialLabel);
    if(summary.mainStoneRemarks) specItem('Main Stone:', summary.mainStoneRemarks);
    if(summary.sideStonesRemarks) specItem('Side Stones:', summary.sideStonesRemarks.replace(/\n/g, ', '));

    yPos += 10;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 10;

    doc.setFont(FONT_NAME, 'bold');
    doc.setFontSize(16);
    doc.text('Total Estimated Price:', 20, yPos);
    doc.text(formatCurrency(summary.totalPrice), 190, yPos, { align: 'right' });

    yPos += 15;
    doc.setFont(FONT_NAME, 'normal');
    doc.setFontSize(9);
    doc.text('Notes:', 20, yPos);
    yPos += 4;
    doc.text('- Prices are estimates and subject to change based on final design and market fluctuations.', 22, yPos);
    yPos += 4;
    doc.text('- This quotation is valid for 30 days.', 22, yPos);
    
    addImagesToPdf(doc, summary.images);
    doc.save('Customer_Quotation.pdf');
};