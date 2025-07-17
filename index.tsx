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
  diamondClarityKeys,
  getInitialStoneState,
  jewelryTypeKeys,
  diamondConversionTableLimited,
  defaultMaterialPrices,
  defaultSettingCosts,
  colorableMaterialKeys,
  materialColorKeys,
  earringSizeKeys,
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
    handleDownloadShopPDF,
    handleDownloadCustomerPDF,
    handleDownloadFactoryPDF,
    handleCopyToClipboard,
    isCopied,
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
    
    // Reset view when summary changes (modal opens with new data)
    useEffect(() => {
        if (summary) {
            setSummaryView('shop');
        }
    }, [summary, setSummaryView]);

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
                                <SummaryItem lang={language} label={t(language, 'materialPricePerGramLabel')} value={summary.materialPricePerGram} remarks={summary.fullMaterialName}/>
                                <SummaryItem lang={language} label={t(language, 'totalMaterialCostLabel')} value={summary.materialCost} remarks={`(${summary.grams || 0}${t(language, 'gramsUnit')}) ${t(language, 'lossLabel')}`}/>
                                <SummaryItem lang={language} label={t(language, 'cadCostLabel')} value={summary.cadCost} />
                                <SummaryItem lang={language} label={t(language, 'mainStoneLabel')} value={summary.mainStoneCost} remarks={summary.mainStoneRemarks}/>
                                <SummaryItem lang={language} label={t(language, 'sideStonesCostLabel')} value={summary.sideStonesCost} remarks={summary.sideStonesRemarks}/>
                                <SummaryItem lang={language} label={t(language, 'settingCostLabel')} value={summary.settingCost} />
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
                              {summary.sizeDetails && <SpecItem label={t(language, 'sizeLabel')} value={summary.sizeDetails} />}
                              <SpecItem label={t(language, 'materialLabel')} value={`${summary.fullMaterialName}${summary.showGramsInQuote ? ` (${summary.grams || 0}${t(language, 'gramsUnit')})` : ''}`} />
                              {summary.mainStoneRemarks && <SpecItem label={t(language, 'mainStoneLabel')} value={summary.mainStoneRemarks} />}
                              {summary.sideStonesRemarks && <SpecItem label={t(language, 'sideStoneLabel')} value={summary.sideStonesRemarks} />}
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
                        {summaryView === 'shop' ? (
                            <>
                           <button type="button" className="download-btn customer" onClick={handleDownloadCustomerPDF}><span>{t(language, 'downloadCustomerPDF')}</span></button>
                                <button type="button" className="download-btn factory" onClick={handleDownloadFactoryPDF}><span>{t(language, 'downloadFactoryPDF')}</span></button>
                            </>
                        ) : (
                            <>
                                <button type="button" className="download-btn customer" onClick={handleDownloadCustomerPDF}><span>{t(language, 'downloadCustomerPDF')}</span></button>
                                <button type="button" className="download-btn copy" onClick={handleCopyToClipboard} disabled={isCopied}>
                                    {isCopied ? (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            <span>{t(language, 'copiedLabel')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                            <span>{t(language, 'copyForChat')}</span>
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PreferencesModal = ({ isOpen, onClose, currentConfig, onSave, lang }) => {
    const [localConfig, setLocalConfig] = useState(currentConfig);
  
    useEffect(() => {
      setLocalConfig(currentConfig);
    }, [currentConfig, isOpen]);
  
    useLayoutEffect(() => {
        if (isOpen) {
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);
  
    const handleMaterialChange = (key, value) => {
      setLocalConfig(prev => ({
        ...prev,
        materialPrices: { ...prev.materialPrices, [key]: parseFloat(value) || 0 }
      }));
    };
  
    const handleSettingCostChange = (key, value) => {
      setLocalConfig(prev => ({
        ...prev,
        settingCosts: { ...prev.settingCosts, [key]: parseFloat(value) || 0 }
      }));
    };
  
    const handleSave = () => {
      onSave(localConfig);
      onClose();
    };

    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <h2>{t(lang, 'preferencesTitle')}</h2>
  
          <div className="config-section">
            <h3>{t(lang, 'materialPricesLabel')}</h3>
            <div className="config-grid">
              {materialKeys.map(key => (
                <div key={key} className="config-item">
                  <label htmlFor={`config-${key}`}>{t(lang, key)}</label>
                  <input
                    id={`config-${key}`}
                    type="number"
                    value={localConfig.materialPrices[key]}
                    onChange={e => handleMaterialChange(key, e.target.value)}
                    step="0.01"
                  />
                </div>
              ))}
            </div>
          </div>
  
          <div className="config-section">
            <h3>{t(lang, 'settingCostsLabel')}</h3>
            <div className="config-grid">
              <div className="config-item">
                <label htmlFor="config-mainStone">{t(lang, 'mainStoneSettingCostLabel')}</label>
                <input
                  id="config-mainStone"
                  type="number"
                  value={localConfig.settingCosts.mainStone}
                  onChange={e => handleSettingCostChange('mainStone', e.target.value)}
                />
              </div>
              <div className="config-item">
                <label htmlFor="config-sideStone">{t(lang, 'sideStoneSettingCostLabel')}</label>
                <input
                  id="config-sideStone"
                  type="number"
                  value={localConfig.settingCosts.sideStone}
                  onChange={e => handleSettingCostChange('sideStone', e.target.value)}
                />
              </div>
            </div>
          </div>
  
          <div className="modal-actions">
            <button onClick={onClose} className="cancel-btn">{t(lang, 'cancelBtn')}</button>
            <button onClick={handleSave} className="save-btn">{t(lang, 'saveBtn')}</button>
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
          <div className="details-item">
            <label htmlFor={`${idPrefix}Shape`}>{t(lang, 'shapeLabel')}</label>
            <select id={`${idPrefix}Shape`} value={stone.shape} onChange={(e) => handleInputChange('shape', e.target.value)}>
               {diamondShapeKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
            </select>
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}Weight`}>{t(lang, 'weightPlaceholder')}</label>
            <input id={`${idPrefix}Weight`} type="number" value={stone.weight} onChange={(e) => handleInputChange('weight', e.target.value)} placeholder={t(lang, 'weightPlaceholder')} step={0.01} inputMode="decimal" />
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}Color`}>{t(lang, 'color')}</label>
            <select id={`${idPrefix}Color`} value={stone.color} onChange={(e) => handleInputChange('color', e.target.value)}>
               {diamondColors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}Cut`}>{t(lang, 'cut')}</label>
            <select id={`${idPrefix}Cut`} value={stone.cut} onChange={(e) => handleInputChange('cut', e.target.value)}>
               {diamondDetailKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
            </select>
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}Clarity`}>{t(lang, 'clarity')}</label>
            <select id={`${idPrefix}Clarity`} value={stone.clarity} onChange={(e) => handleInputChange('clarity', e.target.value)}>
               {diamondClarityKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
            </select>
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}Polish`}>{t(lang, 'polish')}</label>
            <select id={`${idPrefix}Polish`} value={stone.polish} onChange={(e) => handleInputChange('polish', e.target.value)}>
               {diamondDetailKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
            </select>
          </div>
        </div>
      )}

      {stone.calculationMode === 'byDiameter' && isSideStone && (
        <div className="details-grid">
          <div className="details-item">
            <label htmlFor={`${idPrefix}Diameter`}>{t(lang, 'diameterLabel')}</label>
            <select id={`${idPrefix}Diameter`} value={stone.diameter} onChange={(e) => handleDiameterModeChange('diameter', e.target.value)} aria-label={`${label} Diameter`}>
              {diamondConversionTableLimited.map(d => <option key={d.diameter_mm} value={d.diameter_mm}>{d.diameter_mm} {t(lang, 'mmUnit')}</option>)}
            </select>
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}PricePerCarat`}>{t(lang, 'pricePerCaratLabel')}</label>
            <input id={`${idPrefix}PricePerCarat`} type="number" value={stone.pricePerCarat} onChange={(e) => handleDiameterModeChange('pricePerCarat', e.target.value)} placeholder={t(lang, 'pricePerCaratPlaceholder')} aria-label={`${label} Price per Carat`} step={0.01} inputMode="decimal" />
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}Quantity`}>{t(lang, 'qtyPlaceholder')}</label>
            <input id={`${idPrefix}Quantity`} type="number" value={stone.quantity} onChange={(e) => handleDiameterModeChange('quantity', e.target.value)} placeholder={t(lang, 'qtyPlaceholder')} aria-label={`${label} quantity`} step={1} min="1" inputMode="numeric" />
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}ColorDiameter`}>{t(lang, 'color')}</label>
            <select id={`${idPrefix}ColorDiameter`} value={stone.color} onChange={(e) => handleDiameterModeChange('color', e.target.value)} aria-label={`${label} Color`}>
               {diamondColors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="details-item">
            <label htmlFor={`${idPrefix}ClarityDiameter`}>{t(lang, 'clarity')}</label>
            <select id={`${idPrefix}ClarityDiameter`} value={stone.clarity} onChange={(e) => handleDiameterModeChange('clarity', e.target.value)} aria-label={`${label} Clarity`}>
               {diamondClarityKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

const SizeInput = ({ jewelryType, size, onSizeChange, lang }) => {
    if (jewelryType === 'pendant') {
        return null;
    }

    const handleInputChange = (e) => onSizeChange(e.target.value);

    let inputField;
    const inputId = `sizeInput-${jewelryType}`;

    if (jewelryType === 'earring') {
        inputField = (
            <select id={inputId} value={size} onChange={handleInputChange}>
                {earringSizeKeys.map(key => <option key={key} value={key}>{t(lang, key)}</option>)}
            </select>
        );
    } else {
        const unit = jewelryType === 'ring' ? t(lang, 'mmUnit') : t(lang, 'cmUnit');
        inputField = (
            <div className="size-grid-group">
                <input id={inputId} type="number" value={size} onChange={handleInputChange} step="0.1" inputMode="decimal" />
                <span className="size-unit-label">{unit}</span>
            </div>
        );
    }

    return (
        <div className="form-group">
            <label htmlFor={inputId}>{t(lang, 'sizeLabel')}</label>
            {inputField}
        </div>
    );
};


function App() {
  const [language, setLanguage] = useState('th');
  const [customerName, setCustomerName] = useState('');
  const [jewelryType, setJewelryType] = useState('ring');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('gold14k');
  const [materialColor, setMaterialColor] = useState('yellowGold');
  const [grams, setGrams] = useState('');
  const [showGramsInQuote, setShowGramsInQuote] = useState(true);
  const [images, setImages] = useState<ImageState[]>([]);
  const [cadCost, setCadCost] = useState('');
  const [laborCost, setLaborCost] = useState('');
  const [margin, setMargin] = useState('30');
  const [summaryView, setSummaryView] = useState('shop');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [config, setConfig] = useState({
    materialPrices: defaultMaterialPrices,
    settingCosts: defaultSettingCosts,
  });


  type Stone = ReturnType<typeof getInitialStoneState>;

  const [mainStone, setMainStone] = useState<Stone>(getInitialStoneState());
  const [sideStones, setSideStones] = useState<Stone[]>([]);

  const [summary, setSummary] = useState<ReturnType<typeof calculateCosts> | null>(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [remarksForFactoryShop, setRemarksForFactoryShop] = useState('');
  const [remarksForCustomer, setRemarksForCustomer] = useState('');

  useEffect(() => {
    const savedConfig = localStorage.getItem('jewelryConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      // Merge with defaults to ensure all keys are present
      setConfig({
        materialPrices: { ...defaultMaterialPrices, ...parsedConfig.materialPrices },
        settingCosts: { ...defaultSettingCosts, ...parsedConfig.settingCosts },
      });
    }
  }, []);

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    localStorage.setItem('jewelryConfig', JSON.stringify(newConfig));
  };


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

  const handleJewelryTypeChange = (e) => {
    const newType = e.target.value;
    setJewelryType(newType);
    if (newType === 'earring') {
        setSize('s');
    } else {
        setSize('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summaryData = calculateCosts({
        customerName, jewelryType, size, images, material, materialColor, grams, showGramsInQuote, cadCost, laborCost, margin, mainStone, sideStones, language,
        materialPrices: config.materialPrices,
        settingCosts: config.settingCosts,
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

  const handleCopyToClipboard = () => {
    if (!summary) return;

    const price = parseFloat(finalPrice) || 0;
    const deposit = price / 2;

    const formatForCopy = (value) => {
        const numberLocale = language === 'th' ? 'th-TH' : 'en-US';
        return value.toLocaleString(numberLocale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    const parts = [];
    const customer = summary.customerName || '';
    
    parts.push(t(language, 'copy_greeting_v2', { jewelryType: t(language, summary.jewelryType) }));
    parts.push('');
    parts.push(t(language, 'copy_details_header_v2'));
    
    if (summary.sizeDetails) {
        parts.push(t(language, 'copy_size_line_v2', { sizeDetails: summary.sizeDetails }));
    }
    if (summary.mainStoneRemarksForCopy) {
        parts.push(t(language, 'copy_main_stone_line_v2', { mainStoneRemarks: summary.mainStoneRemarksForCopy }));
    }
    if (summary.sideStonesRemarksForCopy) {
        const sideStonesLines = summary.sideStonesRemarksForCopy.split('\n');
        sideStonesLines.forEach(line => {
            if (line.trim()) {
                parts.push(t(language, 'copy_side_stones_line_v2', { sideStonesRemarks: line }));
            }
        });
    }
    parts.push(t(language, 'copy_body_line_v2', { material: summary.fullMaterialName }));
    parts.push('');

    const finalPriceString = formatForCopy(price);
    const depositString = formatForCopy(deposit);

    parts.push(t(language, 'copy_total_line_v2', { finalPrice: finalPriceString }));
    parts.push('');
    
    const depositInfo = t(language, 'copy_deposit_info_v2', { customerName: customer, depositAmount: depositString });
    parts.push(...depositInfo.split('\n'));
    
    parts.push('');
    parts.push(t(language, 'copy_payment_header_v2'));
    parts.push('');
    parts.push(t(language, 'copy_payment_details_v2'));
    parts.push('');
    parts.push(t(language, 'copy_post_payment_info_v2'));
    parts.push('');
    parts.push(t(language, 'copy_cancellation_header_v2'));
    parts.push(t(language, 'copy_cancellation_info_v2'));
    parts.push('');
    parts.push(t(language, 'copy_closing_v2'));
    
    const textToCopy = parts.join('\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
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
      <div className="header-bar">
        <button onClick={() => setIsPreferencesOpen(true)} className="preferences-btn" aria-label="Preferences">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
        </button>
        <div className="language-switcher">
          <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('en'); }} className={language === 'en' ? 'active' : ''}>English</a>
          <span>|</span>
          <a href="#" onClick={(e) => { e.preventDefault(); setLanguage('th'); }} className={language === 'th' ? 'active' : ''}>ไทย</a>
        </div>
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
            onChange={handleJewelryTypeChange}
          >
            {jewelryTypeKeys.map(key => <option key={key} value={key}>{t(language, key)}</option>)}
          </select>
        </div>

        <SizeInput jewelryType={jewelryType} size={size} onSizeChange={setSize} lang={language} />

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
          {colorableMaterialKeys.includes(material) && (
            <div className="material-color-options">
                <label className="radio-group-label">{t(language, 'materialColorLabel')}</label>
                <div className="radio-options-wrapper">
                    {materialColorKeys.map(key => (
                        <div key={key} className="radio-option">
                            <input type="radio" id={`color-${key}`} name="materialColor" value={key} checked={materialColor === key} onChange={e => setMaterialColor(e.target.value)} />
                            <label htmlFor={`color-${key}`}>{t(language, key)}</label>
                        </div>
                    ))}
                </div>
            </div>
          )}
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
          handleDownloadShopPDF={handleDownloadShopPDF}
          handleDownloadCustomerPDF={handleDownloadCustomerPDF}
          handleDownloadFactoryPDF={handleDownloadFactoryPDF}
          handleCopyToClipboard={handleCopyToClipboard}
          isCopied={isCopied}
          language={language}
      />

      <PreferencesModal 
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        currentConfig={config}
        onSave={handleSaveConfig}
        lang={language}
      />
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);