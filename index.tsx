/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState } from 'react';
import ReactDOM from 'react-dom-client';
import jsPDF from 'jspdf';

// Hardcoded sample prices per gram for materials
const materialPrices = {
  silver925: 50,
  gold9k: 1300,
  gold14k: 2100,
  gold18k: 2600,
  pt950: 1790,
};

// Diamond options
const diamondShapes = {
  round: 'Round Cut',
  princess: 'Princess Cut',
  emerald: 'Emerald Cut',
  oval: 'Oval Cut',
  marquise: 'Marquise Cut',
  pear: 'Pear Cut',
  cushion: 'Cushion Cut',
};
const diamondColors = ['D', 'E', 'F', 'G', 'H', 'I', 'J'];
const diamondCuts = { EX: 'Excellent', VG: 'Very Good' };
const diamondClarities = { EX: 'Excellent', VG: 'Very Good' };

// Helper to format currency
const formatCurrency = (value) =>
  (value || 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'THB',
  });
  
const StoneInputGroup = ({ label, stone, onStoneChange, idPrefix }) => {
  const handleInputChange = (field, value) => {
    onStoneChange({ ...stone, [field]: value });
  };

  const toggleDetails = () => {
    onStoneChange({ ...stone, useDetails: !stone.useDetails });
  };

  return (
    <div className="form-group stone-group">
      <label htmlFor={`${idPrefix}Cost`}>{label}</label>
      <div className="grid-group">
        <input
          id={`${idPrefix}Cost`}
          type="number"
          value={stone.cost}
          onChange={(e) => handleInputChange('cost', e.target.value)}
          placeholder="Cost"
          aria-label={`${label} cost`}
          step="0.01"
        />
        <button type="button" className="toggle-details-btn" onClick={toggleDetails}>
          {stone.useDetails ? 'Enter Remarks Manually' : 'Add Diamond Details'}
        </button>
      </div>

      {stone.useDetails ? (
        <div className="details-grid">
          <select value={stone.shape} onChange={(e) => handleInputChange('shape', e.target.value)} aria-label={`${label} Shape`}>
             {Object.entries(diamondShapes).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
          <input type="number" value={stone.weight} onChange={(e) => handleInputChange('weight', e.target.value)} placeholder="Weight (ct)" step="0.01" aria-label={`${label} Weight`}/>
          <select value={stone.color} onChange={(e) => handleInputChange('color', e.target.value)} aria-label={`${label} Color`}>
             {diamondColors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={stone.cut} onChange={(e) => handleInputChange('cut', e.target.value)} aria-label={`${label} Cut`}>
             {Object.entries(diamondCuts).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
          <select value={stone.clarity} onChange={(e) => handleInputChange('clarity', e.target.value)} aria-label={`${label} Clarity`}>
             {Object.entries(diamondClarities).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </select>
        </div>
      ) : (
        <input
          type="text"
          value={stone.manualRemarks}
          onChange={(e) => handleInputChange('manualRemarks', e.target.value)}
          placeholder="Remarks (e.g., Blue Sapphire, 2ct)"
          aria-label={`${label} remarks`}
        />
      )}
    </div>
  );
};

function App() {
  const [material, setMaterial] = useState('silver925');
  const [grams, setGrams] = useState('');
  const [cadCost, setCadCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [margin, setMargin] = useState('20');
  const [summaryView, setSummaryView] = useState('shop'); // 'shop' or 'customer'

  const initialStoneState = {
    cost: '',
    useDetails: false,
    shape: 'round',
    weight: '',
    color: 'D',
    cut: 'EX',
    clarity: 'EX',
    manualRemarks: '',
  };

  const [mainStone, setMainStone] = useState(initialStoneState);
  const [sideStones, setSideStones] = useState(initialStoneState);

  const [summary, setSummary] = useState(null);
  
  const getStoneRemarks = (stone) => {
    if (stone.useDetails) {
        if (!stone.weight) return 'Diamond details pending...';
        return `${diamondShapes[stone.shape]}, ${stone.weight || '0'}ct, Color: ${stone.color}, Cut: ${stone.cut}, Clarity: ${stone.clarity}`;
    }
    return stone.manualRemarks;
  };

  const calculateCosts = () => {
    const materialBasePrice = materialPrices[material] || 0;
    const calculatedMaterialCost = (parseFloat(grams) || 0) * materialBasePrice * 1.15;
    const calculatedCadCost = parseFloat(cadCost) || 0;
    const calculatedMainStoneCost = parseFloat(mainStone.cost) || 0;
    const calculatedSideStonesCost = parseFloat(sideStones.cost) || 0;
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
      materialCost: calculatedMaterialCost,
      cadCost: calculatedCadCost,
      mainStoneCost: calculatedMainStoneCost,
      mainStoneRemarks: getStoneRemarks(mainStone),
      sideStonesCost: calculatedSideStonesCost,
      sideStonesRemarks: getStoneRemarks(sideStones),
      laborCost: calculatedLaborCost,
      subtotal,
      marginPercentage,
      marginAmount,
      totalPrice,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSummary(calculateCosts());
  };

  const generatePdfHeader = (doc, title) => {
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 105, 22, { align: 'center' });
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Jewelry Company', 20, 32);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 190, 32, { align: 'right' });
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);
    return 50; // Return starting Y position
  };

  const handleDownloadShopPDF = () => {
    if (!summary) return;
    const doc = new jsPDF();
    let yPos = generatePdfHeader(doc, 'Quotation (Shop)');
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Project Cost Breakdown', 20, yPos);
    yPos += 10;

    const lineItem = (label, value, remarks = '') => {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(label, 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 190, yPos, { align: 'right' });
      if (remarks) {
        yPos += 6;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        const splitRemarks = doc.splitTextToSize(remarks, 168);
        doc.text(splitRemarks, 22, yPos);
        yPos += (splitRemarks.length - 1) * 4;
      }
      yPos += 10;
    };
    
    const materialLabel = `${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())} (${grams || 0}g)`;
    lineItem('Material Cost (+15%)', formatCurrency(summary.materialCost), materialLabel);
    lineItem('CAD Cost', formatCurrency(summary.cadCost));
    lineItem('Main Stone Cost', formatCurrency(summary.mainStoneCost), summary.mainStoneRemarks);
    lineItem('Side Stones Cost', formatCurrency(summary.sideStonesCost), summary.sideStonesRemarks);
    lineItem('Labor Cost', formatCurrency(summary.laborCost));
    
    yPos += 2;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 8;

    lineItem('Subtotal', formatCurrency(summary.subtotal));
    lineItem(`Margin (${summary.marginPercentage}%)`, formatCurrency(summary.marginAmount));
    
    yPos += 5;
    doc.setLineWidth(0.2);
    doc.line(20, yPos, 190, yPos);
    yPos += 12;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Estimated Cost:', 20, yPos);
    doc.text(formatCurrency(summary.totalPrice), 190, yPos, { align: 'right' });
    
    doc.save('Shop_Quotation.pdf');
  };

  const handleDownloadCustomerPDF = () => {
    if (!summary) return;
    const doc = new jsPDF();
    let yPos = generatePdfHeader(doc, 'Project Quotation');

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Project Specifications', 20, yPos);
    yPos += 10;

    const specItem = (label, details) => {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(label, 20, yPos);
        doc.setFont('helvetica', 'normal');
        const splitDetails = doc.splitTextToSize(details, 140);
        doc.text(splitDetails, 55, yPos);
        yPos += (splitDetails.length) * 6 + 4;
    };

    specItem('Material:', `${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())} (${grams || 0}g)`);
    if(summary.mainStoneRemarks) specItem('Main Stone:', summary.mainStoneRemarks);
    if(summary.sideStonesRemarks) specItem('Side Stones:', summary.sideStonesRemarks);

    yPos += 15;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    yPos += 15;

    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Total Estimated Price:', 20, yPos);
    doc.text(formatCurrency(summary.totalPrice), 190, yPos, { align: 'right' });

    yPos += 25;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Notes:', 20, yPos);
    yPos += 5;
    doc.text('- Prices are estimates and subject to change based on final design and market fluctuations.', 22, yPos);
    yPos += 5;
    doc.text('- This quotation is valid for 30 days.', 22, yPos);
    
    doc.save('Customer_Quotation.pdf');
  };
  
  const SummaryItem = ({ label, value, remarks }) => (
    <div className="summary-item">
      <div>
        <span>{label}</span>
        {remarks && <span className="item-remarks">{remarks}</span>}
      </div>
      <span>{formatCurrency(value)}</span>
    </div>
  );
  
  const SpecItem = ({label, value}) => (
      <div className="customer-spec-item">
        <span className="spec-label">{label}</span>
        <span className="spec-value">{value}</span>
      </div>
  );


  return (
    <main className="container">
      <h1>Jewelry Pricing Calculator</h1>
      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <div className="form-group">
          <label htmlFor="material">Material</label>
          <div className="grid-group">
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="silver925">Silver 925</option>
              <option value="gold9k">Gold 9k</option>
              <option value="gold14k">Gold 14k</option>
              <option value="gold18k">Gold 18k</option>
              <option value="pt950">Platinum 950</option>
            </select>
            <input
              type="number"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              placeholder="Grams (e.g., 5.5)"
              aria-label="Weight in grams"
              step="0.01"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="cadCost">CAD Cost</label>
          <input
            id="cadCost"
            type="number"
            value={cadCost}
            onChange={(e) => setCadCost(e.target.value)}
            placeholder="Enter cost"
            aria-label="CAD cost"
            step="0.01"
          />
        </div>

        <StoneInputGroup label="Main Stone" stone={mainStone} onStoneChange={setMainStone} idPrefix="mainStone"/>

        <StoneInputGroup label="Side Stones" stone={sideStones} onStoneChange={setSideStones} idPrefix="sideStones"/>

        <div className="form-group">
          <label htmlFor="laborCost">Labor Cost</label>
          <input
            id="laborCost"
            type="number"
            value={laborCost}
            onChange={(e) => setLaborCost(e.target.value)}
            placeholder="Enter cost"
            aria-label="Labor cost"
            step="0.01"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="margin">Margin (%)</label>
          <input
            id="margin"
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            placeholder="e.g., 20"
            aria-label="Margin in percent"
            step="1"
          />
        </div>

        <button type="submit">Calculate Total Price</button>
      </form>

      {summary !== null && (
        <section className="summary" aria-live="polite">
            <div className="view-switcher">
                <button className={summaryView === 'shop' ? 'active' : ''} onClick={() => setSummaryView('shop')}>For Shop</button>
                <button className={summaryView === 'customer' ? 'active' : ''} onClick={() => setSummaryView('customer')}>For Customer</button>
            </div>
            {summaryView === 'shop' ? (
                <>
                    <h2>Cost Breakdown</h2>
                    <div className="summary-details">
                        <SummaryItem label="Material Cost (+15%)" value={summary.materialCost} remarks={`${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())} (${grams || 0}g)`}/>
                        <SummaryItem label="CAD Cost" value={summary.cadCost} remarks="" />
                        <SummaryItem label="Main Stone Cost" value={summary.mainStoneCost} remarks={summary.mainStoneRemarks}/>
                        <SummaryItem label="Side Stones Cost" value={summary.sideStonesCost} remarks={summary.sideStonesRemarks}/>
                        <SummaryItem label="Labor Cost" value={summary.laborCost} remarks="" />
                    </div>
                    <div className="summary-item summary-subtotal">
                      <span>Subtotal</span>
                      <span>{formatCurrency(summary.subtotal)}</span>
                    </div>
                    <div className="summary-item">
                      <span>Margin ({summary.marginPercentage}%)</span>
                      <span>{formatCurrency(summary.marginAmount)}</span>
                    </div>
                    <p className="total-price">{formatCurrency(summary.totalPrice)}</p>
                </>
            ) : (
                <>
                    <h2>Quotation</h2>
                    <div className="customer-spec-list">
                      <SpecItem label="Material" value={`${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())} (${grams || 0}g)`} />
                      {summary.mainStoneRemarks && <SpecItem label="Main Stone" value={summary.mainStoneRemarks} />}
                      {summary.sideStonesRemarks && <SpecItem label="Side Stones" value={summary.sideStonesRemarks} />}
                    </div>
                    <p className="total-price">{formatCurrency(summary.totalPrice)}</p>
                </>
            )}
            <div className="download-grid">
                <button type="button" className="download-btn shop" onClick={handleDownloadShopPDF}>Download Shop PDF</button>
                <button type="button" className="download-btn customer" onClick={handleDownloadCustomerPDF}>Download Customer PDF</button>
            </div>
        </section>
      )}
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);