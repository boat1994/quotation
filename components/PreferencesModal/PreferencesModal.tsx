import React, { useState, useEffect, useLayoutEffect } from 'react';
import { materialKeys } from '../../constants.js';
import { t } from '../../i18n.js';
import './PreferencesModal.css';

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

  export default PreferencesModal;
