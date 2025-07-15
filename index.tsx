/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  diamondShapes,
  diamondColors,
  diamondCuts,
  diamondClarities,
  getInitialStoneState,
} from './constants.js';
import { formatCurrency, calculateCosts } from './utils.js';
import { generateShopPdf, generateCustomerPdf } from './pdf.js';

const StoneInputGroup = ({ label, stone, onStoneChange, idPrefix, isSideStone = false, onRemove = null }) => {
  const handleInputChange = (field, value) => {
    onStoneChange({ ...stone, [field]: value });
  };

  const toggleDetails = () => {
    onStoneChange({ ...stone, useDetails: !stone.useDetails });
  };

  return (
    <div className="form-group stone-group">
      <div className="stone-group-header">
        <label htmlFor={`${idPrefix}Cost`}>{label}</label>
        {isSideStone && onRemove && (
          <button type="button" onClick={onRemove} className="remove-stone-btn" aria-label={`Remove ${label}`}>&times;</button>
        )}
      </div>
      <div className={`grid-group ${isSideStone ? 'side-stone' : ''}`}>
        <input
          id={`${idPrefix}Cost`}
          type="number"
          value={stone.cost}
          onChange={(e) => handleInputChange('cost', e.target.value)}
          placeholder="Cost Per Stone"
          aria-label={`${label} cost`}
          step="0.01"
        />
        {isSideStone && (
          <input
            type="number"
            value={stone.quantity}
            onChange={(e) => handleInputChange('quantity', e.target.value)}
            placeholder="Qty"
            aria-label={`${label} quantity`}
            step="1"
            min="1"
          />
        )}
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
  const [customerName, setCustomerName] = useState('');
  const [material, setMaterial] = useState('silver925');
  const [grams, setGrams] = useState('');
  const [showGramsInQuote, setShowGramsInQuote] = useState(true);
  const [images, setImages] = useState([]);
  const [cadCost, setCadCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [margin, setMargin] = useState('20');
  const [summaryView, setSummaryView] = useState('shop');

  const [mainStone, setMainStone] = useState(getInitialStoneState());
  const [sideStones, setSideStones] = useState([]);

  const [summary, setSummary] = useState(null);

  const handleAddSideStone = () => {
    setSideStones([...sideStones, { ...getInitialStoneState(), id: `side-${Date.now()}` }]);
  };

  const handleRemoveSideStone = (id) => {
    setSideStones(sideStones.filter(stone => stone.id !== id));
  };

  const handleSideStoneChange = (id, updatedStone) => {
    setSideStones(sideStones.map(stone => stone.id === id ? updatedStone : stone));
  };
  
  const handleImageChange = (e) => {
    if (e.target.files) {
        const files = Array.from(e.target.files).slice(0, 5); // Limit to 5

        if (e.target.files.length > 5) {
          alert("You can only upload a maximum of 5 images.");
        }

        const imagePromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        resolve(reader.result);
                    } else {
                        reject(new Error('File could not be read as data URL string.'));
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then(base64Images => { setImages(base64Images); })
            .catch(error => console.error("Error reading files:", error));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const summaryData = calculateCosts({
        customerName, material, grams, showGramsInQuote, images, cadCost, laborCost, margin, mainStone, sideStones
    });
    setSummary(summaryData);
  };
  
  const handleDownloadShopPDF = () => {
    if (!summary) return;
    generateShopPdf(summary, { material, grams });
  };

  const handleDownloadCustomerPDF = () => {
    if (!summary) return;
    generateCustomerPdf(summary, { material, grams });
  };
  
  const SummaryItem = ({ label, value, remarks = '' }) => (
    <div className="summary-item">
      <div>
        <span>{label}</span>
        {remarks && <span className="item-remarks" style={{whiteSpace: 'pre-wrap'}}>{remarks}</span>}
      </div>
      <span>{value}</span>
    </div>
  );
  
  const SpecItem = ({label, value}) => (
      <div className="customer-spec-item">
        <span className="spec-label">{label}</span>
        <span className="spec-value" style={{whiteSpace: 'pre-wrap'}}>{value}</span>
      </div>
  );


  return (
    <main className="container">
      <h1>Jewelry Pricing Calculator</h1>
      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer's name"
            aria-label="Customer Name"
          />
        </div>

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
          <div className="checkbox-group">
              <input type="checkbox" id="showGrams" checked={showGramsInQuote} onChange={(e) => setShowGramsInQuote(e.target.checked)} />
              <label htmlFor="showGrams">Show grams in customer quotation</label>
          </div>
        </div>

        <div className="form-group">
            <label htmlFor="images">Reference Images (up to 5)</label>
            <input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} aria-label="Reference Images" />
            <div className="image-preview-container">
                {images.map((img, i) => <img key={i} src={img} alt={`preview ${i+1}`} className="image-preview" />)}
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

        <div className="side-stones-section">
            {sideStones.map((stone, index) => (
                <StoneInputGroup 
                    key={stone.id}
                    label={`Side Stone ${index + 1}`} 
                    stone={stone}
                    onStoneChange={(updatedStone) => handleSideStoneChange(stone.id, updatedStone)}
                    idPrefix={`sideStone${index}`}
                    isSideStone={true}
                    onRemove={() => handleRemoveSideStone(stone.id)}
                />
            ))}
            <button type="button" className="add-stone-btn" onClick={handleAddSideStone}>+ Add Side Stone Type</button>
        </div>


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
                        <SummaryItem label="Material Cost (+15%)" value={formatCurrency(summary.materialCost)} remarks={`${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())} (${grams || 0}g)`}/>
                        <SummaryItem label="CAD Cost" value={formatCurrency(summary.cadCost)} />
                        <SummaryItem label="Main Stone Cost" value={formatCurrency(summary.mainStoneCost)} remarks={summary.mainStoneRemarks}/>
                        <SummaryItem label="Side Stones Cost" value={formatCurrency(summary.sideStonesCost)} remarks={summary.sideStonesRemarks}/>
                        <SummaryItem label="Labor Cost" value={formatCurrency(summary.laborCost)} />
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
                      <SpecItem label="Material" value={`${material.replace(/([a-z])([A-Z0-9])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}${summary.showGramsInQuote ? ` (${grams || 0}g)` : ''}`} />
                      {summary.mainStoneRemarks && <SpecItem label="Main Stone" value={summary.mainStoneRemarks} />}
                      {summary.sideStonesRemarks && <SpecItem label="Side Stones" value={summary.sideStonesRemarks.replace(/\n/g, ', ')} />}
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