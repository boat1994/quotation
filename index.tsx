/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  materialKeys,
  diamondShapeKeys,
  diamondColors,
  diamondDetailKeys,
  getInitialStoneState,
  jewelryTypeKeys,
  diamondConversionTableLimited,
} from './constants.js';
import { formatCurrency, calculateCosts } from './utils.js';
import { generateShopPdf, generateCustomerPdf, generateFactoryPdf } from './pdf.js';
import { t } from './i18n.js';
import { logoBase64 } from './logo_base64.js'
 
interface ImageState {
  src: string;
  width: number;
  height: number;
}

const SummaryItem = ({ label, value, remarks = '', lang }) => (
    <div className="summary-item">
      <div>
        <span>{label}</span>
        {remarks && <span className="item-remarks" style={{whiteSpace: 'pre-wrap'}}>{remarks}</span>}
      </div>
      <span>{formatCurrency(value, lang)}</span>
    </div>
);
  
const SpecItem = ({label, value}) => (
    <div className="customer-spec-item">
      <span className="spec-label">{label}</span>
      <span className="spec-value" style={{whiteSpace: 'pre-wrap'}}>{value}</span>
    </div>
);

const PasswordModal = ({ isOpen, onClose, onSuccess, language }) => {
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setPasswordInput('');
            setPasswordError('');
        }
    }, [isOpen]);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Initial password '151515' encoded in base64 is 'MTUxNTE1'
        if (typeof btoa === 'function' && btoa(passwordInput) === 'MTUxNTE1') {
            setPasswordError('');
            onSuccess();
        } else {
            setPasswordError(t(language, 'incorrectPasswordError'));
        }
    };

    useLayoutEffect(() => {
        if (isOpen) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    onClose();
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="password-heading" onClick={onClose}>
            <div className="modal-content password-modal-content" onClick={e => e.stopPropagation()}>
                <div className="password-prompt">
                    <h2 id="password-heading">{t(language, 'passwordPromptTitle')}</h2>
                    <form onSubmit={handlePasswordSubmit} className="password-form" noValidate>
                        <div className="form-group">
                            <label htmlFor="shopPassword">{t(language, 'passwordLabel')}</label>
                            <input
                                type="password"
                                id="shopPassword"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                autoFocus
                                aria-describedby={passwordError ? "password-error-msg" : undefined}
                            />
                            {passwordError && <p id="password-error-msg" className="password-error" role="alert">{passwordError}</p>}
                        </div>
                        <button type="submit" className="unlock-btn">{t(language, 'unlockBtn')}</button>
                    </form>
                </div>
            </div>
        </div>
    );
};


const SummaryModal = ({
    isOpen,
    onClose,
    summary,
    summaryView,
    setSummaryView,
    finalPrice,
    onFinalPriceChange,
    remarksForFactoryShop,
    setRemarksForFactoryShop,
    remarksForCustomer,
    setRemarksForCustomer,
    handleRequestShopPDF,
    handleDownloadCustomerPDF,
    handleRequestFactoryPDF,
    language,
}) => {
    // Scroll locking effect
    useLayoutEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            const originalScrollY = window.scrollY;
            document.body.style.overflow = 'hidden';
            
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') {
                    onClose();
                }
            };
            window.addEventListener('keydown', handleKeyDown);

            return () => {
                document.body.style.overflow = originalStyle;
                window.scrollTo(0, originalScrollY);
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);
    
    // Reset view when modal opens
    useEffect(() => {
        if (summary && isOpen) {
            setSummaryView('shop');
        }
    }, [summary, isOpen, setSummaryView]);


    if (!isOpen || !summary) {
        return null;
    }

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="summary-heading" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="summary">
                    <div className="view-switcher">
                        <button className={summaryView === 'shop' ? 'active' : ''} onClick={() => setSummaryView('shop')}>{t(language, 'shopView')}</button>
                        <button className={summaryView === 'customer' ? 'active' : ''} onClick={() => setSummaryView('customer')}>{t(language, 'customerView')}</button>
                    </div>

                    <button className="modal-back-btn" onClick={onClose} aria-label={t(language, 'backBtnLabel')}>
                        {t(language, 'backBtn')}
                    </button>

                    {summaryView === 'shop' ? (
                        <>
                            <h2 id="summary-heading">{t(language, 'costBreakdown')}</h2>
                            <div className="summary-details">
                                <SummaryItem lang={language} label={t(language, 'materialCostLabel')} value={summary.materialCost} remarks={`${t(language, summary.material)} (${summary.grams || 0}${t(language, 'gramsUnit')})`}/>
                                <SummaryItem lang={language} label={t(language, 'cadCostLabel')} value={summary.cadCost} />
                                <SummaryItem lang={language} label={t(language, 'mainStoneLabel')} value={summary.mainStoneCost} remarks={summary.mainStoneRemarks}/>
                                <SummaryItem lang={language} label={t(language, 'sideStonesCostLabel')} value={summary.sideStonesCost} remarks={summary.sideStonesRemarks}/>
                                <SummaryItem lang={language} label={t(language, 'laborCostLabel')} value={summary.laborCost} />
                            </div>
                            <div className="summary-item summary-subtotal">
                              <span>{t(language, 'subtotalLabel')}</span>
                              <span>{formatCurrency(summary.subtotal, language)}</span>
                            </div>
                            <div className="summary-item">
                              <span>{t(language, 'marginAmountLabel', { marginPercentage: summary.marginPercentage.toFixed(2) })}</span>
                              <span>{formatCurrency(summary.marginAmount, language)}</span>
                            </div>
                            <div className="total-price-group">
                                <label htmlFor="finalPrice">{t(language, 'totalShopLabel')}</label>
                                <input
                                    id="finalPrice"
                                    type="number"
                                    value={finalPrice}
                                    onChange={(e) => onFinalPriceChange(e.target.value)}
                                    aria-label="Final Price"
                                    step={0.01}
                                    inputMode="decimal"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 id="summary-heading">{t(language, 'quotation')}</h2>
                            <div className="customer-spec-list">
                              {summary.jewelryType && <SpecItem label={t(language, 'jewelryTypeLabel')} value={t(language, summary.jewelryType)} />}
                              <SpecItem label={t(language, 'materialLabel')} value={`${t(language, summary.material)}${summary.showGramsInQuote ? ` (${summary.grams || 0}${t(language, 'gramsUnit')})` : ''}`} />
                              {summary.mainStoneRemarks && <SpecItem label={t(language, 'mainStoneLabel')} value={summary.mainStoneRemarks} />}
                              {summary.sideStonesRemarks && <SpecItem label={t(language, 'sideStoneLabel')} value={summary.sideStonesRemarks.replace(/\n/g, ', ')} />}
                            </div>
                            <div className="total-price-group customer">
                                <label htmlFor="finalPrice">{t(language, 'totalCustomerLabel')}</label>
                                <input
                                    id="finalPrice"
                                    type="number"
                                    value={finalPrice}
                                    onChange={(e) => onFinalPriceChange(e.target.value)}
                                    aria-label="Final Price"
                                    step={0.01}
                                    inputMode="decimal"
                                />
                            </div>
                        </>
                    )}

                    <div className="remarks-section">
                        <div className="form-group">
                            <label htmlFor="remarksFactoryShop">{t(language, 'remarksForFactoryShopLabel')}</label>
                            <textarea 
                                id="remarksFactoryShop" 
                                rows={3} 
                                value={remarksForFactoryShop} 
                                onChange={e => setRemarksForFactoryShop(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="remarksCustomer">{t(language, 'remarksForCustomerLabel')}</label>
                            <textarea 
                                id="remarksCustomer" 
                                rows={3} 
                                value={remarksForCustomer} 
                                onChange={e => setRemarksForCustomer(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="download-grid">
                        <button type="button" className="download-btn shop" onClick={handleRequestShopPDF}>{t(language, 'downloadShopPDF')}</button>
                        <button type="button" className="download-btn customer" onClick={handleDownloadCustomerPDF}>{t(language, 'downloadCustomerPDF')}</button>
                        <button type="button" className="download-btn factory" onClick={handleRequestFactoryPDF}>{t(language, 'downloadFactoryPDF')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StoneInputGroup = ({ label, stone, onStoneChange, idPrefix, isSideStone = false, onRemove = null, lang }) => {
  const handleInputChange = (field, value) => {
    onStoneChange({ ...stone, [field]: value });
  };

  const handleModeChange = (mode) => {
    // Reset cost when changing mode to avoid carrying over values
    onStoneChange({ ...getInitialStoneState(), ...stone, calculationMode: mode, cost: '' });
  };

  const handleDiameterModeChange = (field, value) => {
    const newStone = { ...stone, [field]: value };
    const diameter = field === 'diameter' ? value : newStone.diameter;
    const pricePerCarat = field === 'pricePerCarat' ? value : newStone.pricePerCarat;

    if (diameter && pricePerCarat) {
        const conversion = diamondConversionTableLimited.find(d => d.diameter_mm === String(diameter));
        if (conversion) {
            const weight = parseFloat(conversion.weight_ct);
            const calculatedCost = weight * (parseFloat(pricePerCarat) || 0);
            newStone.cost = isNaN(calculatedCost) ? '' : calculatedCost.toString();
        } else {
            newStone.cost = '';
        }
    } else {
        newStone.cost = '';
    }
    onStoneChange(newStone);
  };

  return (
    <div className="form-group stone-group">
      <label>{label}</label>
      {isSideStone && onRemove && (
        <button type="button" onClick={onRemove} className="remove-stone-btn" aria-label={`Remove ${label}`}>&times;</button>
      )}
      <div className="mode-switcher-container">
        <div className="mode-switcher">
            <button type="button" className={stone.calculationMode === 'manual' ? 'active' : ''} onClick={() => handleModeChange('manual')}>{t(lang, 'modeRemarks')}</button>
            <button type="button" className={stone.calculationMode === 'details' ? 'active' : ''} onClick={() => handleModeChange('details')}>{t(lang, 'modeDetails')}</button>
            {isSideStone && <button type="button" className={stone.calculationMode === 'byDiameter' ? 'active' : ''} onClick={() => handleModeChange('byDiameter')}>{t(lang, 'modeDiameter')}</button>}
        </div>
      </div>
      
      {(stone.calculationMode === 'manual' || stone.calculationMode === 'details') && (
        <div className={`grid-group ${isSideStone ? 'side-stone-manual' : 'main-stone-manual'}`}>
            <input id={`${idPrefix}Cost`} type="number" value={stone.cost} onChange={(e) => handleInputChange('cost', e.target.value)} placeholder={t(lang, 'costPerStonePlaceholder')} aria-label={`${label} cost`} step={0.01} inputMode="decimal" />
            {isSideStone && <input type="number" value={stone.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} placeholder={t(lang, 'qtyPlaceholder')} aria-label={`${label} quantity`} step={1} min="1" inputMode="numeric" />}
        </div>
      )}

      {stone.calculationMode === 'manual' && (
        <input type="text" value={stone.manualRemarks} onChange={(e) => handleInputChange('manualRemarks', e.target.value)} placeholder={t(lang, 'remarksPlaceholder')} aria-label={`${label} remarks`} />
      )}

      {stone.calculationMode === 'details' && (
        <div className="details-grid">
          <select value={stone.shape} onChange={(e) => handleInputChange('shape', e.target.value)} aria-label={`${label} Shape`}>
             {diamondShapeKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
          </select>
          <input type="number" value={stone.weight} onChange={(e) => handleInputChange('weight', e.target.value)} placeholder={t(lang, 'weightPlaceholder')} step={0.01} aria-label={`${label} Weight`} inputMode="decimal" />
          <select value={stone.color} onChange={(e) => handleInputChange('color', e.target.value)} aria-label={`${label} Color`}>
             {diamondColors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={stone.cut} onChange={(e) => handleInputChange('cut', e.target.value)} aria-label={`${label} Cut`}>
             {diamondDetailKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
          </select>
          <select value={stone.clarity} onChange={(e) => handleInputChange('clarity', e.target.value)} aria-label={`${label} Clarity`}>
             {diamondDetailKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
          </select>
          <select value={stone.polish} onChange={(e) => handleInputChange('polish', e.target.value)} aria-label={`${label} Polish`}>
             {diamondDetailKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
          </select>
        </div>
      )}

      {stone.calculationMode === 'byDiameter' && isSideStone && (
        <div className="grid-group side-stone-diameter">
          <select value={stone.diameter} onChange={(e) => handleDiameterModeChange('diameter', e.target.value)} aria-label={`${label} Diameter`}>
            {diamondConversionTableLimited.map(d => <option key={d.diameter_mm} value={d.diameter_mm}>{d.diameter_mm} {t(lang, 'mmUnit')}</option>)}
          </select>
          <input type="number" value={stone.pricePerCarat} onChange={(e) => handleDiameterModeChange('pricePerCarat', e.target.value)} placeholder={t(lang, 'pricePerCaratPlaceholder')} aria-label={`${label} Price per Carat`} step={0.01} inputMode="decimal" />
          <input type="number" value={stone.quantity} onChange={(e) => handleDiameterModeChange('quantity', e.target.value)} placeholder={t(lang, 'qtyPlaceholder')} aria-label={`${label} quantity`} step={1} min="1" inputMode="numeric" />
        </div>
      )}
    </div>
  );
};

function App() {
  const [language, setLanguage] = useState('th');
  const [customerName, setCustomerName] = useState('');
  const [jewelryType, setJewelryType] = useState('ring');
  const [material, setMaterial] = useState('silver925');
  const [grams, setGrams] = useState('');
  const [showGramsInQuote, setShowGramsInQuote] = useState(true);
  const [images, setImages] = useState<ImageState[]>([]);
  const [cadCost, setCadCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [margin, setMargin] = useState('20');
  const [summaryView, setSummaryView] = useState('shop');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pdfTypeToDownload, setPdfTypeToDownload] = useState<'shop' | null>(null);
  const [lastPasswordSuccessTime, setLastPasswordSuccessTime] = useState<number | null>(null);

  type Stone = ReturnType<typeof getInitialStoneState>;

  const [mainStone, setMainStone] = useState<Stone>(getInitialStoneState());
  const [sideStones, setSideStones] = useState<Stone[]>([]);

  const [summary, setSummary] = useState<ReturnType<typeof calculateCosts> | null>(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [remarksForFactoryShop, setRemarksForFactoryShop] = useState('');
  const [remarksForCustomer, setRemarksForCustomer] = useState('');


  const handleAddSideStone = () => {
    setSideStones([...sideStones, { ...getInitialStoneState(), quantity: 1, id: `side-${Date.now()}` }]);
  };

  const handleRemoveSideStone = (id: string) => {
    setSideStones(sideStones.filter(stone => stone.id !== id));
  };

  const handleSideStoneChange = (id: string, updatedStone: Stone) => {
    setSideStones(sideStones.map(stone => stone.id === id ? updatedStone : stone));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        const files = Array.from(e.target.files).slice(0, 5); // Limit to 5

        if (Array.from(e.target.files).length > 5) {
          alert("You can only upload a maximum of 5 images.");
        }

        const imagePromises = files.map(file => {
            return new Promise<ImageState>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (typeof reader.result === 'string') {
                        const img = new Image();
                        img.onload = () => {
                            resolve({
                                src: reader.result as string,
                                width: img.width,
                                height: img.height
                            });
                        };
                        img.onerror = reject;
                        img.src = reader.result as string;
                    } else {
                        reject(new Error('File could not be read as data URL string.'));
                    }
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then(imageData => { setImages(imageData); })
            .catch(error => console.error("Error reading files:", error));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summaryData = calculateCosts({
        customerName, jewelryType, images, material, grams, showGramsInQuote, cadCost, laborCost, margin, mainStone, sideStones, language
    });
    setSummary(summaryData);
    setFinalPrice(summaryData.totalPrice.toFixed(2));
    setIsModalOpen(true);
  };
  
  const handleDownloadShopPDF = () => {
    if (!summary) return;
    const updatedSummary = { 
        ...summary, 
        totalPrice: parseFloat(finalPrice) || summary.totalPrice,
        remarksForFactoryShop,
    };
    generateShopPdf(updatedSummary, language);
  };

  const handleDownloadCustomerPDF = () => {
    if (!summary) return;
    const updatedSummary = { 
        ...summary, 
        totalPrice: parseFloat(finalPrice) || summary.totalPrice,
        remarksForCustomer,
    };
    generateCustomerPdf(updatedSummary, language);
  };

  const handleDownloadFactoryPDF = () => {
    if (!summary) return;
    const updatedSummary = {
        ...summary,
        remarksForFactoryShop,
    };
    generateFactoryPdf(updatedSummary, language);
  };
  
  const handleRequestShopPDF = () => {
      const TEN_MINUTES = 10 * 60 * 1000;
      if (lastPasswordSuccessTime && (Date.now() - lastPasswordSuccessTime < TEN_MINUTES)) {
          handleDownloadShopPDF();
          return;
      }
      setPdfTypeToDownload('shop');
      setIsPasswordModalOpen(true);
  };
  
  const handleRequestFactoryPDF = () => {
      handleDownloadFactoryPDF();
  };

  const handlePasswordSuccess = () => {
      setLastPasswordSuccessTime(Date.now());
      if (pdfTypeToDownload === 'shop') {
          handleDownloadShopPDF();
      }
      setIsPasswordModalOpen(false);
      setPdfTypeToDownload(null);
  };

  const handleFinalPriceChange = (newPriceStr: string) => {
    setFinalPrice(newPriceStr);

    const newPrice = parseFloat(newPriceStr);
    if (summary && !isNaN(newPrice) && summary.subtotal > 0) {
        const newMarginValue = ((newPrice - summary.subtotal) / summary.subtotal) * 100;
        setMargin(newMarginValue.toFixed(2));

        const newMarginAmount = newPrice - summary.subtotal;
        setSummary(currentSummary => {
            if (!currentSummary) return null;
            return {
                ...currentSummary,
                marginPercentage: newMarginValue,
                marginAmount: newMarginAmount,
                totalPrice: newPrice,
            }
        });
    }
  };
  

  return (
    <main className="container">
      <div className="language-switcher">
        <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('en'); }} className={language === 'en' ? 'active' : ''}>English</a>
        <span>|</span>
        <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('th'); }} className={language === 'th' ? 'active' : ''}>ไทย</a>
      </div>
      <div className="logo-container">
        <img src={logoBase64} alt="Bogus Jewelry Logo" className="logo" />
      </div>
      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <div className="form-group">
          <label htmlFor="customerName">{t(language, 'customerNameLabel')}</label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder={t(language, 'customerNamePlaceholder')}
            aria-label="Customer Name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="jewelryType">{t(language, 'jewelryTypeLabel')}</label>
          <select
            id="jewelryType"
            value={jewelryType}
            onChange={(e) => setJewelryType(e.target.value)}
          >
            {jewelryTypeKeys.map(key => <option key={key} value={key}>{t(language, key)}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="material">{t(language, 'materialLabel')}</label>
          <div className="grid-group">
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              {materialKeys.map(key => <option key={key} value={key}>{t(language, key)}</option>)}
            </select>
            <input
              type="number"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              placeholder={t(language, 'gramsPlaceholder')}
              aria-label="Weight in grams"
              step={0.01}
              inputMode="decimal"
            />
          </div>
          <div className="radio-container">
            <label className="radio-group-label">{t(language, 'gramsVisibilityLabel')}</label>
            <div className="radio-options-wrapper">
                <div className="radio-option">
                    <input type="radio" id="showGrams" name="gramsVisibility" checked={showGramsInQuote} onChange={() => setShowGramsInQuote(true)} />
                    <label htmlFor="showGrams">{t(language, 'showGramsRadio')}</label>
                </div>
                <div className="radio-option">
                    <input type="radio" id="hideGrams" name="gramsVisibility" checked={!showGramsInQuote} onChange={() => setShowGramsInQuote(false)} />
                    <label htmlFor="hideGrams">{t(language, 'hideGramsRadio')}</label>
                </div>
            </div>
          </div>
        </div>

        <div className="form-group">
            <label htmlFor="images">{t(language, 'refImagesLabel')}</label>
            <input type="file" id="images" multiple accept="image/*" onChange={handleImageChange} aria-label="Reference Images" />
            <div className="image-preview-container">
                {images.map((img, i) => <img key={i} src={img.src} alt={`preview ${i+1}`} className="image-preview" />)}
            </div>
        </div>


        <div className="form-group">
          <label htmlFor="cadCost">{t(language, 'cadCostLabel')}</label>
          <input
            id="cadCost"
            type="number"
            value={cadCost}
            onChange={(e) => setCadCost(e.target.value)}
            placeholder={t(language, 'costPlaceholder')}
            aria-label="CAD cost"
            step={0.01}
            inputMode="decimal"
          />
        </div>

        <StoneInputGroup label={t(language, 'mainStoneLabel')} stone={mainStone} onStoneChange={setMainStone} idPrefix="mainStone" lang={language} />

        <div className="side-stones-section">
            {sideStones.map((stone, index) => (
                <StoneInputGroup 
                    key={stone.id}
                    label={`${t(language, 'sideStoneLabel')} ${index + 1}`} 
                    stone={stone}
                    onStoneChange={(updatedStone) => handleSideStoneChange(stone.id, updatedStone)}
                    idPrefix={`sideStone${index}`}
                    isSideStone={true}
                    onRemove={() => handleRemoveSideStone(stone.id)}
                    lang={language}
                />
            ))}
            <button type="button" className="add-stone-btn" onClick={handleAddSideStone}>{t(language, 'addSideStoneBtn')}</button>
        </div>


        <div className="form-group">
          <label htmlFor="laborCost">{t(language, 'laborCostLabel')}</label>
          <input
            id="laborCost"
            type="number"
            value={laborCost}
            onChange={(e) => setLaborCost(e.target.value)}
            placeholder={t(language, 'costPlaceholder')}
            aria-label="Labor cost"
            step={0.01}
            inputMode="decimal"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="margin">{t(language, 'marginLabel')}</label>
          <input
            id="margin"
            type="number"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            placeholder={t(language, 'marginPlaceholder')}
            aria-label="Margin in percent"
            step={1}
            inputMode="numeric"
          />
        </div>

        <button type="submit">{t(language, 'calculateBtn')}</button>
      </form>
      
      <SummaryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          summary={summary}
          summaryView={summaryView}
          setSummaryView={setSummaryView}
          finalPrice={finalPrice}
          onFinalPriceChange={handleFinalPriceChange}
          remarksForFactoryShop={remarksForFactoryShop}
          setRemarksForFactoryShop={setRemarksForFactoryShop}
          remarksForCustomer={remarksForCustomer}
          setRemarksForCustomer={setRemarksForCustomer}
          handleRequestShopPDF={handleRequestShopPDF}
          handleDownloadCustomerPDF={handleDownloadCustomerPDF}
          handleRequestFactoryPDF={handleRequestFactoryPDF}
          language={language}
      />

      <PasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          onSuccess={handlePasswordSuccess}
          language={language}
      />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
