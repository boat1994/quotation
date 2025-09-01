import React from 'react';
import { earringSizeKeys } from '../../constants.js';
import { t } from '../../i18n.js';
import './SizeInput.css';

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

export default SizeInput;
