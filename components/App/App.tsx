

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from 'react';
import {
  materialKeys,
  getInitialStoneState,
  jewelryTypeKeys,
  colorableMaterialKeys,
  materialColorKeys,
  platingColorKeys,
  CORRECT_PIN,
} from '../../constants.js';
import { calculateCosts } from '../../utils.js';
import { t } from '../../i18n.js';
import { logoBase64 } from '../../logo_base64.js';
import LockScreen from '../LockScreen/LockScreen.js';
import HeaderBar from '../HeaderBar/HeaderBar.js';
import SizeInput from '../SizeInput/SizeInput.js';
import StoneInputGroup from '../StoneInputGroup/StoneInputGroup.js';
import SummaryModal from '../SummaryModal/SummaryModal.js';
import PreferencesModal from '../PreferencesModal/PreferencesModal.js';
import { defaultMaterialPrices, defaultSettingCosts } from '../../constants.js';

import './App.css';

export interface ImageState {
  src: string;
  width: number;
  height: number;
  description: string;
}

type Stone = ReturnType<typeof getInitialStoneState>;

function App() {
  const [language, setLanguage] = useState('th');
  const [customerName, setCustomerName] = useState('');
  const [jewelryType, setJewelryType] = useState('ring');
  const [size, setSize] = useState('');
  const [material, setMaterial] = useState('gold14k');
  const [materialColor, setMaterialColor] = useState('yellowGold');
  const [platingColor, setPlatingColor] = useState('rhodium');
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
    trelloApiKey: 'eef5180b694a3948658d373b0cbe9ddf',
    trelloApiToken: '',
    trelloBoardId: '',
  });

  const [isLocked, setIsLocked] = useState(true);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [mainStone, setMainStone] = useState<Stone>(getInitialStoneState());
  const [sideStones, setSideStones] = useState<Stone[]>([]);

  const [summary, setSummary] = useState<ReturnType<typeof calculateCosts> | null>(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [remarksForFactoryShop, setRemarksForFactoryShop] = useState('');
  const [remarksForCustomer, setRemarksForCustomer] = useState('');

  useEffect(() => {
    const unlockExpiry = localStorage.getItem('unlockExpiry');
    if (unlockExpiry && new Date().getTime() < parseInt(unlockExpiry, 10)) {
        setIsLocked(false);
    }
  }, []);

  useEffect(() => {
    if (pinError) return;

    if (pinInput.length === CORRECT_PIN.length) {
        if (pinInput === CORRECT_PIN) {
            const oneDay = 24 * 60 * 60 * 1000;
            const expiry = new Date().getTime() + oneDay;
            localStorage.setItem('unlockExpiry', expiry.toString());
            setIsLocked(false);
        } else {
            setPinError(true);
            setTimeout(() => {
                setPinInput('');
                setPinError(false);
            }, 800);
        }
    }
  }, [pinInput, pinError]);

  const handlePinKeyPress = (key: string) => {
    if (pinError || pinInput.length >= CORRECT_PIN.length) return;
    setPinInput(pinInput + key);
  };

  const handlePinDelete = () => {
    if (pinError) return;
    setPinInput(pinInput.slice(0, -1));
  };


  useEffect(() => {
    const savedConfig = localStorage.getItem('jewelryConfig');
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig);
      setConfig({
        materialPrices: { ...defaultMaterialPrices, ...parsedConfig.materialPrices },
        settingCosts: { ...defaultSettingCosts, ...parsedConfig.settingCosts },
        trelloApiKey: parsedConfig.trelloApiKey || 'eef5180b694a3948658d373b0cbe9ddf',
        trelloApiToken: parsedConfig.trelloApiToken || '',
        trelloBoardId: parsedConfig.trelloBoardId || '',
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
        const files = Array.from(e.target.files).slice(0, 5);
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
                            const canvas = document.createElement('canvas');
                            const ctx = canvas.getContext('2d');
                            if (!ctx) {
                                return reject(new Error('Could not get canvas context.'));
                            }
                            canvas.width = img.width;
                            canvas.height = img.height;
                            ctx.drawImage(img, 0, 0);
                            const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                            resolve({ src: dataUrl, width: img.width, height: img.height, description: '' });
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

  const handleImageDescriptionChange = (index: number, description: string) => {
    const newImages = [...images];
    newImages[index].description = description;
    setImages(newImages);
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
        customerName, jewelryType, size, images, material, materialColor, platingColor, grams, showGramsInQuote, cadCost, laborCost, margin, mainStone, sideStones, language,
        materialPrices: config.materialPrices,
        settingCosts: config.settingCosts,
    });
    setSummary(summaryData);
    setFinalPrice(summaryData.totalPrice.toFixed(2));
    setIsModalOpen(true);
  };

  const handleCopyToClipboard = () => {
    if (!summary) return;
    const price = parseFloat(finalPrice) || 0;
    const deposit = price / 2;
    const formatForCopy = (value) => value.toLocaleString(language === 'th' ? 'th-TH' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    const parts = [];
    const customer = summary.customerName || '';
    
    parts.push(t(language, 'copy_greeting_v2', { jewelryType: t(language, summary.jewelryType) }));
    parts.push('');
    parts.push(t(language, 'copy_details_header_v2'));
    if (summary.sizeDetails) parts.push(t(language, 'copy_size_line_v2', { sizeDetails: summary.sizeDetails }));
    if (summary.mainStoneRemarksForCopy) parts.push(t(language, 'copy_main_stone_line_v2', { mainStoneRemarks: summary.mainStoneRemarksForCopy }));
    if (summary.sideStonesRemarksForCopy) {
        summary.sideStonesRemarksForCopy.split('\n').forEach(line => {
            if (line.trim()) parts.push(t(language, 'copy_side_stones_line_v2', { sideStonesRemarks: line }));
        });
    }
    parts.push(t(language, 'copy_body_line_v2', { material: summary.fullMaterialName }));
    parts.push('');
    parts.push(t(language, 'copy_total_line_v2', { finalPrice: formatForCopy(price) }));
    parts.push('');
    const depositInfo = t(language, 'copy_deposit_info_v2', { customerName: customer, depositAmount: formatForCopy(deposit) });
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
    
    navigator.clipboard.writeText(parts.join('\n'))
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  };


  const handleFinalPriceChange = (newPriceStr: string) => {
    setFinalPrice(newPriceStr);
    const newPrice = parseFloat(newPriceStr);
    if (summary && !isNaN(newPrice) && summary.subtotal > 0) {
        const newMarginValue = ((newPrice - summary.subtotal) / summary.subtotal) * 100;
        setMargin(newMarginValue.toFixed(2));
        const newMarginAmount = newPrice - summary.subtotal;
        setSummary(currentSummary => currentSummary ? { ...currentSummary, marginPercentage: newMarginValue, marginAmount: newMarginAmount, totalPrice: newPrice } : null);
    }
  };
  
  if (isLocked) {
    return (
        <LockScreen 
            language={language}
            pinInput={pinInput}
            pinError={pinError}
            correctPinLength={CORRECT_PIN.length}
            onKeyPress={handlePinKeyPress}
            onDelete={handlePinDelete}
        />
    );
  }

  return (
    <main className="container">
      <HeaderBar 
        onPreferencesOpen={() => setIsPreferencesOpen(true)}
        language={language}
        setLanguage={setLanguage}
      />
      <div className="logo-container">
        <img src={logoBase64} alt="Bogus Jewelry Logo" className="logo" />
      </div>
      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <div className="form-group">
          <label htmlFor="customerName">{t(language, 'customerNameLabel')}</label>
          <input id="customerName" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder={t(language, 'customerNamePlaceholder')} aria-label="Customer Name"/>
        </div>
        
        <div className="form-group">
          <label htmlFor="jewelryType">{t(language, 'jewelryTypeLabel')}</label>
          <select id="jewelryType" value={jewelryType} onChange={handleJewelryTypeChange}>
            {jewelryTypeKeys.map(key => <option key={key} value={key}>{t(language, key)}</option>)}
          </select>
        </div>

        <SizeInput jewelryType={jewelryType} size={size} onSizeChange={setSize} lang={language} />

        <div className="form-group">
          <label htmlFor="material">{t(language, 'materialLabel')}</label>
          <div className="grid-group">
            <select id="material" value={material} onChange={(e) => setMaterial(e.target.value)}>
              {materialKeys.map(key => <option key={key} value={key}>{t(language, key)}</option>)}
            </select>
            <input type="number" value={grams} onChange={(e) => setGrams(e.target.value)} placeholder={t(language, 'gramsPlaceholder')} aria-label="Weight in grams" step={0.01} inputMode="decimal"/>
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
          {material === 'silver925' && (
            <div className="material-color-options">
                <label className="radio-group-label">{t(language, 'platingColorLabel')}</label>
                <div className="radio-options-wrapper">
                    {platingColorKeys.map(key => (
                        <div key={key} className="radio-option">
                            <input type="radio" id={`plating-${key}`} name="platingColor" value={key} checked={platingColor === key} onChange={e => setPlatingColor(e.target.value)} />
                            <label htmlFor={`plating-${key}`}>{t(language, key)}</label>
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
                {images.map((img, i) => (
                    <div key={i} className="image-preview-item">
                        <img src={img.src} alt={`preview ${i+1}`} className="image-preview" />
                        <input
                            type="text"
                            className="image-description-input"
                            placeholder="Description"
                            value={img.description}
                            onChange={(e) => handleImageDescriptionChange(i, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>

        <div className="form-group">
          <label htmlFor="cadCost">{t(language, 'cadCostLabel')}</label>
          <input id="cadCost" type="number" value={cadCost} onChange={(e) => setCadCost(e.target.value)} placeholder={t(language, 'costPlaceholder')} aria-label="CAD cost" step={0.01} inputMode="decimal"/>
        </div>

        <StoneInputGroup label={t(language, 'mainStoneLabel')} stone={mainStone} onStoneChange={setMainStone} idPrefix="mainStone" lang={language} />

        <div className="side-stones-section">
            {sideStones.map((stone, index) => (
                <StoneInputGroup key={stone.id} label={`${t(language, 'sideStoneLabel')} ${index + 1}`} stone={stone} onStoneChange={(updatedStone) => handleSideStoneChange(stone.id, updatedStone)} idPrefix={`sideStone${index}`} isSideStone={true} onRemove={() => handleRemoveSideStone(stone.id)} lang={language}/>
            ))}
            <button type="button" className="add-stone-btn" onClick={handleAddSideStone}>{t(language, 'addSideStoneBtn')}</button>
        </div>

        <div className="form-group">
          <label htmlFor="laborCost">{t(language, 'laborCostLabel')}</label>
          <input id="laborCost" type="number" value={laborCost} onChange={(e) => setLaborCost(e.target.value)} placeholder={t(language, 'costPlaceholder')} aria-label="Labor cost" step={0.01} inputMode="decimal"/>
        </div>
        
        <div className="form-group">
          <label htmlFor="margin">{t(language, 'marginLabel')}</label>
          <input id="margin" type="number" value={margin} onChange={(e) => setMargin(e.target.value)} placeholder={t(language, 'marginPlaceholder')} aria-label="Margin in percent" step={1} inputMode="numeric"/>
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
          handleCopyToClipboard={handleCopyToClipboard}
          isCopied={isCopied}
          language={language}
          config={config}
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

export default App;