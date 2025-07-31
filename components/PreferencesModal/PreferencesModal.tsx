
import { useState, useEffect, useLayoutEffect } from 'react';
import { materialKeys } from '../../constants.js';
import { t } from '../../i18n.js';
import './PreferencesModal.css';

interface Config {
  materialPrices: { [key: string]: number };
  settingCosts: { mainStone: number; sideStone: number };
  trelloApiKey: string;
  trelloApiToken: string;
  trelloBoardId: string;
}

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: Config;
  onSave: (config: Config) => void;
  lang: string;
}

const PreferencesModal = ({ isOpen, onClose, currentConfig, onSave, lang }: PreferencesModalProps) => {
    const [localConfig, setLocalConfig] = useState<Config>(currentConfig);
  
    useEffect(() => {
      setLocalConfig(currentConfig);
    }, [currentConfig, isOpen]);
  
    useLayoutEffect(() => {
        if (isOpen) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);
  
    const handleChange = (section: 'materialPrices' | 'settingCosts', key: string, value: string) => {
      setLocalConfig(prev => ({
        ...prev,
        [section]: { ...prev[section], [key]: parseFloat(value) || 0 }
      }));
    };

    const handleTrelloChange = (key: keyof Config, value: string) => {
      setLocalConfig(prev => ({ ...prev, [key]: value }));
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
                    onChange={e => handleChange('materialPrices', key, e.target.value)}
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
                  onChange={e => handleChange('settingCosts', 'mainStone', e.target.value)}
                />
              </div>
              <div className="config-item">
                <label htmlFor="config-sideStone">{t(lang, 'sideStoneSettingCostLabel')}</label>
                <input
                  id="config-sideStone"
                  type="number"
                  value={localConfig.settingCosts.sideStone}
                  onChange={e => handleChange('settingCosts', 'sideStone', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="config-section">
            <h3>{t(lang, 'trelloIntegration')}</h3>
            <div className="config-grid">
              <div className="config-item full-width">
                <label htmlFor="trelloApiKey">{t(lang, 'trelloApiKey')}</label>
                <input id="trelloApiKey" type="text" value={localConfig.trelloApiKey} onChange={(e) => handleTrelloChange('trelloApiKey', e.target.value)} />
              </div>
              <div className="config-item full-width">
                <label htmlFor="trelloApiToken">{t(lang, 'trelloApiToken')}</label>
                <input id="trelloApiToken" type="password" value={localConfig.trelloApiToken} onChange={(e) => handleTrelloChange('trelloApiToken', e.target.value)} />
              </div>
              <div className="config-item full-width">
                <label htmlFor="trelloBoardId">{t(lang, 'trelloBoardId')}</label>
                <input id="trelloBoardId" type="text" value={localConfig.trelloBoardId} onChange={(e) => handleTrelloChange('trelloBoardId', e.target.value)} />
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