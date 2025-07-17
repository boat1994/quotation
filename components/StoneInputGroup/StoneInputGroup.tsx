import React from 'react';
import {
    diamondShapeKeys,
    diamondColors,
    diamondDetailKeys,
    diamondClarityKeys,
    getInitialStoneState,
    diamondConversionTableLimited,
} from '../../constants.js';
import { t } from '../../i18n.js';
import './StoneInputGroup.css';

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

  export default StoneInputGroup;
