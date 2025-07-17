import React, { useEffect, useLayoutEffect } from 'react';
import { formatCurrency } from '../../utils.js';
import { t } from '../../i18n.js';
import './SummaryModal.css';

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
    useLayoutEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(document.body).overflow;
            document.body.style.overflow = 'hidden';
            
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);

            return () => {
                document.body.style.overflow = originalStyle;
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, onClose]);
    
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
                                <input id="finalPrice" type="number" value={finalPrice} onChange={(e) => onFinalPriceChange(e.target.value)} aria-label="Final Price" step={0.01} inputMode="decimal"/>
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
                                <input id="finalPrice" type="number" value={finalPrice} onChange={(e) => onFinalPriceChange(e.target.value)} aria-label="Final Price" step={0.01} inputMode="decimal"/>
                            </div>
                        </>
                    )}

                    <div className="remarks-section">
                        <div className="form-group">
                            <label htmlFor="remarksFactoryShop">{t(language, 'remarksForFactoryShopLabel')}</label>
                            <textarea id="remarksFactoryShop" rows={3} value={remarksForFactoryShop} onChange={e => setRemarksForFactoryShop(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="remarksCustomer">{t(language, 'remarksForCustomerLabel')}</label>
                            <textarea id="remarksCustomer" rows={3} value={remarksForCustomer} onChange={e => setRemarksForCustomer(e.target.value)} />
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
                                        <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>{t(language, 'copiedLabel')}</span></>
                                    ) : (
                                        <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg><span>{t(language, 'copyForChat')}</span></>
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

export default SummaryModal;
