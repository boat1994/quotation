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
  DEFAULT_PIN,
} from '../../constants.js';
import { calculateCosts, formatCurrency, getFullMaterialName } from '../../utils.js';
import { t } from '../../i18n.js';
import { logoBase64 } from '../../logo_base64.js';
import LockScreen from '../LockScreen/LockScreen.tsx';
import HeaderBar from '../HeaderBar/HeaderBar.tsx';
import SizeInput from '../SizeInput/SizeInput.tsx';
import StoneInputGroup from '../StoneInputGroup/StoneInputGroup.tsx';
import SummaryModal from '../SummaryModal/SummaryModal.tsx';
import PreferencesModal from '../PreferencesModal/PreferencesModal.tsx';
import { defaultMaterialPrices, defaultSettingCosts } from '../../constants.js';
import WeightConverter from '../WeightConverter/WeightConverter.tsx';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal.tsx';


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
  const [config, setConfig] = useState(() => {
    const savedConfig = localStorage.getItem('jewelryPricingConfig');
    const parsedConfig = savedConfig ? JSON.parse(savedConfig) : {};
    return {
      materialPrices: { ...defaultMaterialPrices, ...(parsedConfig.materialPrices || {}) },
      settingCosts: { ...defaultSettingCosts, ...(parsedConfig.settingCosts || {}) },
      trelloApiKey: parsedConfig.trelloApiKey || '',
      trelloApiToken: parsedConfig.trelloApiToken || '',
      trelloBoardId: parsedConfig.trelloBoardId || '',
      pin: parsedConfig.pin || DEFAULT_PIN,
    };
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [mainStone, setMainStone] = useState<Stone>(getInitialStoneState());
  const [sideStones, setSideStones] = useState<Stone[]>([]);
  const [summaryData, setSummaryData] = useState(null);
  const [finalPrice, setFinalPrice] = useState('');
  const [remarksForFactoryShop, setRemarksForFactoryShop] = useState('');
  const [remarksForCustomer, setRemarksForCustomer] = useState('');
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [materialChangeData, setMaterialChangeData] = useState(null);


  useEffect(() => {
    localStorage.setItem('jewelryPricingConfig', JSON.stringify(config));
  }, [config]);

  const handlePinKeyPress = (key) => {
    if (pinInput.length < config.pin.length) {
      const newPin = pinInput + key;
      setPinInput(newPin);
      if (newPin.length === config.pin.length) {
        if (newPin === config.pin) {
          setIsUnlocked(true);
        } else {
          setPinError(true);
          setTimeout(() => {
            setPinInput('');
            setPinError(false);
          }, 820);
        }
      }
    }
  };

  const handlePinDelete = () => {
    setPinInput(pinInput.slice(0, -1));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 5 - images.length);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
              canvas.width = img.width;
              canvas.height = img.height;
              // Draw a white background to handle transparent PNGs
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
              // Convert to JPEG format which is reliably supported by jsPDF
              const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
              setImages(prev => [...prev, { src: dataUrl, width: img.width, height: img.height, description: '' }]);
            } else {
              // Fallback for safety, though it's unlikely getContext would fail
              setImages(prev => [...prev, { src: img.src, width: img.width, height: img.height, description: '' }]);
            }
          };
          img.src = event.target.result as string;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageDescriptionChange = (index, description) => {
    const newImages = [...images];
    newImages[index].description = description;
    setImages(newImages);
  };

  const addSideStone = () => {
    setSideStones([...sideStones, { ...getInitialStoneState(), id: `side-${Date.now()}` }]);
  };

  const removeSideStone = (id: string) => {
    setSideStones(sideStones.filter(stone => stone.id !== id));
  };
  
  const handleSideStoneChange = (index, updatedStone) => {
    const newSideStones = [...sideStones];
    newSideStones[index] = updatedStone;
    setSideStones(newSideStones);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const costs = calculateCosts({
      customerName, jewelryType, size, images, material, materialColor, platingColor, grams, showGramsInQuote, cadCost,
      mainStone, sideStones, laborCost, margin, language,
      materialPrices: config.materialPrices, settingCosts: config.settingCosts
    });
    setSummaryData(costs);
    setFinalPrice(costs.totalPrice.toFixed(2));
    setIsModalOpen(true);
  };

  const handleFinalPriceChange = (newPriceStr: string) => {
    setFinalPrice(newPriceStr);
    const newPrice = parseFloat(newPriceStr);
    if (summaryData && !isNaN(newPrice) && summaryData.subtotal > 0) {
        const newMarginValue = ((newPrice - summaryData.subtotal) / summaryData.subtotal) * 100;
        setMargin(newMarginValue.toFixed(2));
        const newMarginAmount = newPrice - summaryData.subtotal;
        setSummaryData(currentSummary => currentSummary ? { ...currentSummary, marginPercentage: newMarginValue, marginAmount: newMarginAmount, totalPrice: newPrice } : null);
    }
  };

  const handleCopyToClipboard = () => {
    if (!summaryData) return;

    const depositAmount = formatCurrency((parseFloat(finalPrice) || summaryData.totalPrice) * 0.5, language);
    const finalPriceFormatted = formatCurrency(parseFloat(finalPrice) || summaryData.totalPrice, language);
    const materialText = getFullMaterialName(material, materialColor, platingColor, language);

    const textToCopy = [
        t(language, 'copy_greeting_v2', { jewelryType: t(language, summaryData.jewelryType) }),
        '',
        `**${t(language, 'copy_details_header_v2')}**`,
        summaryData.sizeDetails && t(language, 'copy_size_line_v2', { sizeDetails: summaryData.sizeDetails }),
        summaryData.mainStoneRemarksForCopy && t(language, 'copy_main_stone_line_v2', { mainStoneRemarks: summaryData.mainStoneRemarksForCopy }),
        summaryData.sideStonesRemarksForCopy && t(language, 'copy_side_stones_line_v2', { sideStonesRemarks: summaryData.sideStonesRemarksForCopy }),
        t(language, 'copy_body_line_v2', { material: materialText }),
        '',
        `**${t(language, 'copy_total_line_v2', { finalPrice: finalPriceFormatted })}**`,
        '',
        t(language, 'copy_deposit_info_v2', { customerName, depositAmount }),
        '',
        `**${t(language, 'copy_payment_header_v2')}**`,
        t(language, 'copy_payment_details_v2'),
        '',
        t(language, 'copy_post_payment_info_v2'),
        '',
        `**${t(language, 'copy_cancellation_header_v2')}**`,
        t(language, 'copy_cancellation_info_v2'),
        '',
        t(language, 'copy_closing_v2')
    ].filter(Boolean).join('\n');


    navigator.clipboard.writeText(textToCopy).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleMaterialChangeRequest = (newMaterial, newWeight, materialName) => {
    setMaterialChangeData({ newMaterial, newWeight, materialName });
    setIsConfirmationModalOpen(true);
  };
  
  const handleConfirmMaterialChange = () => {
    if (materialChangeData) {
      setMaterial(materialChangeData.newMaterial);
      setGrams(materialChangeData.newWeight);
      setIsModalOpen(false); // Close the summary modal
    }
    setIsConfirmationModalOpen(false);
    setMaterialChangeData(null);
  };
  
  const handleCancelMaterialChange = () => {
    setIsConfirmationModalOpen(false);
    setMaterialChangeData(null);
  };

  if (!isUnlocked) {
    return <LockScreen 
              language={language}
              pinInput={pinInput}
              pinError={pinError}
              correctPinLength={config.pin.length}
              onKeyPress={handlePinKeyPress}
              onDelete={handlePinDelete}
           />;
  }

  return (
    <div className="container">
      <HeaderBar 
          onPreferencesOpen={() => setIsPreferencesOpen(true)}
          language={language}
          setLanguage={setLanguage}
      />
      <WeightConverter language={language} />
      <div className="logo-container">
        <img src={logoBase64} alt="Bogus Jewelry Logo" className="logo" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid-group">
            <div className="form-group">
              <label htmlFor="customerName">{t(language, 'customerNameLabel')}</label>
              <input id="customerName" type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder={t(language, 'customerNamePlaceholder')} />
            </div>
            <div className="form-group">
                <label htmlFor="jewelryType">{t(language, 'jewelryTypeLabel')}</label>
                <select id="jewelryType" value={jewelryType} onChange={(e) => { setJewelryType(e.target.value); setSize(''); }}>
                    {jewelryTypeKeys.map(key => <option key={key} value={key}>{t(language, key)}</option>)}
                </select>
            </div>
        </div>
        
        <SizeInput jewelryType={jewelryType} size={size} onSizeChange={setSize} lang={language} />
        
        <div className="grid-group">
            <div className="form-group">
                <label htmlFor="material">{t(language, 'materialLabel')}</label>
                <select id="material" value={material} onChange={e => setMaterial(e.target.value)}>
                    {materialKeys.map(key => <option key={key} value={key}>{t(language, key)}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="grams">{t(language, 'gramsPlaceholder')}</label>
                <input id="grams" type="number" value={grams} onChange={(e) => setGrams(e.target.value)} placeholder={t(language, 'gramsPlaceholder')} step="0.01" inputMode="decimal" />
            </div>
        </div>

        <div className="radio-container">
            {colorableMaterialKeys.includes(material) && (
                <div className="material-color-options">
                    <span className="radio-group-label">{t(language, 'materialColorLabel')}</span>
                    <div className="radio-options-wrapper">
                      {materialColorKeys.map(key => (
                          <div key={key} className="radio-option">
                              <input type="radio" id={`materialColor-${key}`} name="materialColor" value={key} checked={materialColor === key} onChange={(e) => setMaterialColor(e.target.value)} />
                              <label htmlFor={`materialColor-${key}`}>{t(language, key)}</label>
                          </div>
                      ))}
                    </div>
                </div>
            )}
            {material === 'silver925' && (
                <div className="material-color-options">
                    <span className="radio-group-label">{t(language, 'platingColorLabel')}</span>
                    <div className="radio-options-wrapper">
                      {platingColorKeys.map(key => (
                          <div key={key} className="radio-option">
                              <input type="radio" id={`platingColor-${key}`} name="platingColor" value={key} checked={platingColor === key} onChange={(e) => setPlatingColor(e.target.value)} />
                              <label htmlFor={`platingColor-${key}`}>{t(language, key)}</label>
                          </div>
                      ))}
                    </div>
                </div>
            )}
            <div className="grams-visibility-options">
                <span className="radio-group-label">{t(language, 'gramsVisibilityLabel')}</span>
                <div className="radio-options-wrapper">
                    <div className="radio-option">
                        <input type="radio" id="showGrams" name="gramsVisibility" value="show" checked={showGramsInQuote} onChange={() => setShowGramsInQuote(true)} />
                        <label htmlFor="showGrams">{t(language, 'showGramsRadio')}</label>
                    </div>
                    <div className="radio-option">
                        <input type="radio" id="hideGrams" name="gramsVisibility" value="hide" checked={!showGramsInQuote} onChange={() => setShowGramsInQuote(false)} />
                        <label htmlFor="hideGrams">{t(language, 'hideGramsRadio')}</label>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="form-group">
            <label htmlFor="refImages">{t(language, 'refImagesLabel')}</label>
            <input id="refImages" type="file" multiple accept="image/*" onChange={handleImageChange} />
            <div className="image-preview-container">
              {images.map((image, index) => (
                <div key={index} className="image-preview-item">
                  <img src={image.src} alt={`Reference ${index + 1}`} className="image-preview" />
                  <textarea
                    value={image.description}
                    onChange={(e) => handleImageDescriptionChange(index, e.target.value)}
                    placeholder={t(language, 'remarksPlaceholder')}
                    className="image-description-input"
                    rows={3}
                  />
                </div>
              ))}
            </div>
        </div>

        <div className="grid-group">
            <div className="form-group">
                <label htmlFor="cadCost">{t(language, 'cadCostLabel')}</label>
                <input id="cadCost" type="number" value={cadCost} onChange={(e) => setCadCost(e.target.value)} placeholder={t(language, 'costPlaceholder')} step={0.01} inputMode="decimal" />
            </div>
            <div className="form-group">
                <label htmlFor="laborCost">{t(language, 'laborCostLabel')}</label>
                <input id="laborCost" type="number" value={laborCost} onChange={(e) => setLaborCost(e.target.value)} placeholder={t(language, 'costPlaceholder')} step={0.01} inputMode="decimal" />
            </div>
        </div>
        
        <StoneInputGroup label={t(language, 'mainStoneLabel')} stone={mainStone} onStoneChange={setMainStone} idPrefix="main" lang={language} />

        <div className="side-stones-section">
            {sideStones.map((stone, index) => (
                <StoneInputGroup
                    key={stone.id}
                    label={`${t(language, 'sideStoneLabel')} ${index + 1}`}
                    stone={stone}
                    onStoneChange={(updatedStone) => handleSideStoneChange(index, updatedStone)}
                    idPrefix={`side-${index}`}
                    isSideStone={true}
                    onRemove={() => removeSideStone(stone.id)}
                    lang={language}
                />
            ))}
            <button type="button" onClick={addSideStone} className="add-stone-btn">{t(language, 'addSideStoneBtn')}</button>
        </div>
        
        <div className="form-group">
            <label htmlFor="margin">{t(language, 'marginLabel')}</label>
            <input id="margin" type="number" value={margin} onChange={(e) => setMargin(e.target.value)} placeholder={t(language, 'marginPlaceholder')} step={0.01} inputMode="decimal" />
        </div>

        <button type="submit">{t(language, 'calculateBtn')}</button>
      </form>

      <SummaryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        summary={summaryData}
        summaryView={summaryView}
        setSummaryView={setSummaryView}
        finalPrice={finalPrice}
        onFinalPriceChange={handleFinalPriceChange}
        remarksForFactoryShop={remarksForFactoryShop}
        setRemarksForFactoryShop={setRemarksForFactoryShop}
        remarksForCustomer={remarksForCustomer}
        setRemarksForCustomer={setRemarksForCustomer}
        isCopied={isCopied}
        handleCopyToClipboard={handleCopyToClipboard}
        language={language}
        config={config}
        onMaterialChangeRequest={handleMaterialChangeRequest}
      />
      
      <PreferencesModal 
        isOpen={isPreferencesOpen} 
        onClose={() => setIsPreferencesOpen(false)}
        currentConfig={config}
        onSave={setConfig}
        lang={language}
      />

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCancelMaterialChange}
        onConfirm={handleConfirmMaterialChange}
        title={t(language, 'confirmMaterialChangeTitle')}
        message={materialChangeData ? t(language, 'confirmMaterialChangeMessage', { materialName: materialChangeData.materialName, weight: materialChangeData.newWeight }) : ''}
        language={language}
      />
    </div>
  );
}

export default App;