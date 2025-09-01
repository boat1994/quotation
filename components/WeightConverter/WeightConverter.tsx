import React, { useState } from 'react';
import { t } from '../../i18n.js';
import { conversionFactors } from '../../constants.js';
import './WeightConverter.css';

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
      // Ensure the target key exists in the material options for display
      if (materialOptions.some(opt => opt.key === targetMaterialKey)) {
        const newWeight = weight * factors[targetMaterialKey];
        return {
          materialKey: targetMaterialKey,
          weight: newWeight.toFixed(2)
        };
      }
      return null;
    }).filter(Boolean); // Filter out nulls for keys not in the converter's display list


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