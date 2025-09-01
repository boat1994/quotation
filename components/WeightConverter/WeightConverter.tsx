import React, { useState } from 'react';
import { t } from '../../i18n.js';
import './WeightConverter.css';

// Conversion factor matrix from the spec
const conversionFactors = {
  sterlingSilver: { sterlingSilver: 1.00, gold9ct: 1.11, gold14ct: 1.31, gold18ct: 1.50, gold22ct: 1.73, fineGold: 1.87, platinum: 2.08 },
  gold9ct: { sterlingSilver: 0.90, gold9ct: 1.00, gold14ct: 1.18, gold18ct: 1.36, gold22ct: 1.59, fineGold: 1.72, platinum: 1.88 },
  gold14ct: { sterlingSilver: 0.76, gold9ct: 0.85, gold14ct: 1.00, gold18ct: 1.14, gold22ct: 1.29, fineGold: 1.40, platinum: 1.59 },
  gold18ct: { sterlingSilver: 0.67, gold9ct: 0.74, gold14ct: 0.88, gold18ct: 1.00, gold22ct: 1.15, fineGold: 1.25, platinum: 1.34 },
  gold22ct: { sterlingSilver: 0.58, gold9ct: 0.63, gold14ct: 0.78, gold18ct: 0.90, gold22ct: 1.00, fineGold: 1.08, platinum: 1.21 },
  fineGold: { sterlingSilver: 0.53, gold9ct: 0.58, gold14ct: 0.72, gold18ct: 0.83, gold22ct: 0.94, fineGold: 1.00, platinum: 1.11 },
  platinum: { sterlingSilver: 0.48, gold9ct: 0.53, gold14ct: 0.63, gold18ct: 0.72, gold22ct: 0.83, fineGold: 0.90, platinum: 1.00 }
};

const materialOptions = [
  { key: 'sterlingSilver', labelKey: 'sterlingSilver' },
  { key: 'gold9ct', labelKey: 'gold9ct' },
  { key: 'gold14ct', labelKey: 'gold14ct' },
  { key: 'gold18ct', labelKey: 'gold18ct' },
  { key: 'gold22ct', labelKey: 'gold22ct' },
  { key: 'fineGold', labelKey: 'fineGold' },
  { key: 'platinum', labelKey: 'platinum' }
];

interface Result {
  materialKey: string;
  weight: string;
}

const WeightConverter = ({ language }) => {
  const [originalMaterial, setOriginalMaterial] = useState('gold18ct');
  const [originalWeight, setOriginalWeight] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    const weight = parseFloat(originalWeight);
    if (isNaN(weight) || weight <= 0) {
      setError(t(language, 'weightError'));
      setResults([]);
      return;
    }
    setError('');

    const factors = conversionFactors[originalMaterial];
    const newResults = Object.keys(factors).map(targetMaterialKey => {
      const newWeight = weight * factors[targetMaterialKey];
      return {
        materialKey: targetMaterialKey,
        weight: newWeight.toFixed(2)
      };
    });

    setResults(newResults);
  };

  const isButtonDisabled = !originalWeight;

  return (
    <details className="weight-converter-details">
      <summary className="weight-converter-summary">{t(language, 'weightConverterTitle')}</summary>
      <div className="weight-converter-container">
        <div className="converter-inputs">
          <div className="form-group">
            <label htmlFor="originalMaterial">{t(language, 'originalMaterialLabel')}</label>
            <select id="originalMaterial" value={originalMaterial} onChange={e => setOriginalMaterial(e.target.value)}>
              {materialOptions.map(opt => (
                <option key={opt.key} value={opt.key}>{t(language, opt.labelKey)}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="originalWeight">{t(language, 'originalWeightLabel')}</label>
            <input 
              id="originalWeight" 
              type="number" 
              value={originalWeight} 
              onChange={e => setOriginalWeight(e.target.value)} 
              placeholder="e.g., 8.00"
              step="0.01" 
              inputMode="decimal"
            />
          </div>
        </div>
        {error && <p className="converter-error">{error}</p>}
        <button onClick={handleCalculate} disabled={isButtonDisabled} className="converter-button">
          {t(language, 'calculateBtnConverter')}
        </button>

        {results.length > 0 && (
          <div className="converter-results">
            <h3>{t(language, 'resultsHeader')}:</h3>
            <table className="results-table">
              <thead>
                <tr>
                  <th>{t(language, 'materialHeader')}</th>
                  <th>{t(language, 'calculatedWeightHeader')}</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.materialKey} className={result.materialKey === originalMaterial ? 'highlight' : ''}>
                    <td>{t(language, result.materialKey)}</td>
                    <td>{result.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </details>
  );
};

export default WeightConverter;