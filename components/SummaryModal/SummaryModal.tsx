import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { formatCurrency, getFullMaterialName } from '../../utils.js';
import { t } from '../../i18n.js';
import { generateShopPdf, generateCustomerPdf, generateFactoryPdf, generateComparisonPdf } from '../../pdf.js';
import { CORRECT_PIN, conversionFactors } from '../../constants.js';
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

const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);
};

const getFormattedDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yy = String(today.getFullYear()).slice(-2);
    return `${dd}-${mm}-${yy}`;
};

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
    isCopied,
    handleCopyToClipboard,
    language,
    config,
    onMaterialChangeRequest,
}) => {
    const modalContentRef = useRef<HTMLDivElement>(null);
    const [trelloLists, setTrelloLists] = useState([]);
    const [selectedTrelloListId, setSelectedTrelloListId] = useState('');
    const [trelloStatus, setTrelloStatus] = useState({ loading: false, message: '' });
    const [trelloPin, setTrelloPin] = useState('');
    const [trelloPinError, setTrelloPinError] = useState(false);
    const [comparisonData, setComparisonData] = useState([]);

    useLayoutEffect(() => {
        if (isOpen) {
            if (modalContentRef.current) {
                modalContentRef.current.scrollTo(0, 0);
            }
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
        if (isOpen) {
            setSummaryView('shop');
        }
    }, [isOpen, setSummaryView]);

    useEffect(() => {
        if (summary && ['gold9k', 'gold14k', 'gold18k', 'pt950'].includes(summary.material)) {
            const compareMaterials = ['gold9k', 'gold14k', 'gold18k', 'pt950'];
            const baseMaterialKey = summary.material;
            const baseGrams = parseFloat(summary.grams) || 0;

            const data = compareMaterials.map(targetMaterialKey => {
                const conversionFactor = conversionFactors[baseMaterialKey]?.[targetMaterialKey] || 1;
                const newWeight = baseGrams * conversionFactor;

                const materialPrices = config.materialPrices;
                const materialBasePrice = materialPrices[targetMaterialKey] || 0;
                const newMaterialCost = newWeight * materialBasePrice * 1.15;
                
                const oldSubtotalWithoutMaterial = summary.subtotal - summary.materialCost;
                const newSubtotal = oldSubtotalWithoutMaterial + newMaterialCost;
                
                const marginPercentage = summary.marginPercentage;
                const newMarginAmount = newSubtotal * (marginPercentage / 100);
                const newTotalPrice = newSubtotal + newMarginAmount;

                const fullMaterialName = getFullMaterialName(targetMaterialKey, summary.materialColor, '', language);

                return {
                    material: targetMaterialKey,
                    name: fullMaterialName,
                    weight: newWeight.toFixed(2),
                    price: newTotalPrice
                };
            });
            setComparisonData(data);
        } else {
            setComparisonData([]);
        }
    }, [summary, language, config.materialPrices]);

    useEffect(() => {
        if (isOpen && summaryView === 'shop' && config.trelloApiKey && config.trelloApiToken && config.trelloBoardId) {
            setTrelloStatus({ loading: true, message: '' });
            setTrelloLists([]);
            fetch(`https://api.trello.com/1/boards/${config.trelloBoardId}/lists?key=${config.trelloApiKey}&token=${config.trelloApiToken}`)
                .then(response => {
                    if (!response.ok) throw new Error('Failed to fetch');
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        setTrelloLists(data);
                        if (data.length > 0) {
                            setSelectedTrelloListId(data[0].id);
                        }
                    }
                    setTrelloStatus({ loading: false, message: '' });
                })
                .catch(() => {
                    setTrelloStatus({ loading: false, message: t(language, 'trelloErrorFetching') });
                });
        }
    }, [isOpen, summaryView, config.trelloApiKey, config.trelloApiToken, config.trelloBoardId, language]);
    
    const handleDownloadShopPDF = () => {
        if (!summary) return;
        const updatedSummary = { ...summary, totalPrice: parseFloat(finalPrice) || summary.totalPrice, remarksForFactoryShop };
        const blob = generateShopPdf(updatedSummary, language);
        const date = getFormattedDate();
        const customerName = summary.customerName || 'customer';
        const filename = t(language, 'shopPdfFilename', { customerName, date });
        downloadBlob(blob, filename);
    };

    const handleDownloadCustomerPDF = () => {
        if (!summary) return;
        const updatedSummary = { ...summary, totalPrice: parseFloat(finalPrice) || summary.totalPrice, remarksForCustomer };
        const blob = generateCustomerPdf(updatedSummary, language);
        const date = getFormattedDate();
        const customerName = summary.customerName || 'customer';
        const filename = t(language, 'customerPdfFilename', { customerName, date });
        downloadBlob(blob, filename);
    };

    const handleDownloadFactoryPDF = () => {
        if (!summary) return;
        const updatedSummary = { ...summary, remarksForFactoryShop };
        const blob = generateFactoryPdf(updatedSummary, language);
        const date = getFormattedDate();
        const customerName = summary.customerName || 'customer';
        const filename = t(language, 'factoryPdfFilename', {
            jewelryType: t(language, summary.jewelryType),
            material: summary.fullMaterialName,
            customerName,
            date,
        });
        downloadBlob(blob, filename);
    };

    const handleExportComparisonPdf = () => {
        if (!summary || comparisonData.length === 0) return;
        const updatedSummary = { ...summary, remarksForCustomer };
        const blob = generateComparisonPdf(updatedSummary, comparisonData, language);
        const date = getFormattedDate();
        const customerName = summary.customerName || 'customer';
        const filename = t(language, 'comparisonPdfFilename', { customerName, date });
        downloadBlob(blob, filename);
    };
    
    const executeCreateTrelloCard = async () => {
        if (!summary || !selectedTrelloListId) return;
    
        setTrelloStatus({ loading: true, message: t(language, 'creatingTrelloCard') });
    
        const cardName = `${t(language, 'jewelryTypeLabel')}: ${t(language, summary.jewelryType)} - ${t(language, 'customerNameLabel')}: ${summary.customerName || 'N/A'}`;
        
        const cardDesc = `
### ${t(language, 'quotation')} for ${summary.customerName || 'Customer'}

**${t(language, 'pdfProjectDetailsTitle')}**
- **${t(language, 'pdfJewelryTypeLabel')}** ${t(language, summary.jewelryType)}
- **${t(language, 'pdfSizeLabel')}** ${summary.sizeDetails || 'N/A'}
- **${t(language, 'pdfMaterialLabel')}** ${summary.fullMaterialName}${summary.showGramsInQuote ? ` (${summary.grams || 0}${t(language, 'gramsUnit')})` : ''}

**Stones**
- **${t(language, 'pdfMainStoneLabel')}**
> ${summary.mainStoneRemarks || 'N/A'}
- **${t(language, 'pdfSideStoneLabel')}**
> ${summary.sideStonesRemarks.replace(/\n/g, '\n> ') || 'N/A'}

---

### **${t(language, 'totalCustomerLabel')} ${formatCurrency(parseFloat(finalPrice) || summary.totalPrice, language)}**

---

### Shop Details
- **Subtotal:** ${formatCurrency(summary.subtotal, language)}
- **Margin (${summary.marginPercentage.toFixed(2)}%):** ${formatCurrency(summary.marginAmount, language)}
- **Total Cost:** ${formatCurrency(summary.subtotal + summary.marginAmount, language)}

---

**${t(language, 'remarksForFactoryShopLabel')}**
> ${remarksForFactoryShop || 'N/A'}

**${t(language, 'remarksForCustomerLabel')}**
> ${remarksForCustomer || 'N/A'}
        `;
    
        const cardData = {
            name: cardName,
            desc: cardDesc,
            idList: selectedTrelloListId,
            key: config.trelloApiKey,
            token: config.trelloApiToken,
        };
        
        const dataURLtoBlob = (dataurl) => {
            const arr = dataurl.split(',');
            if (arr.length < 2) return null;
            const mimeMatch = arr[0].match(/:(.*?);/);
            if (!mimeMatch) return null;
            const mime = mimeMatch[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type:mime});
        };
    
        try {
            const cardResponse = await fetch(`https://api.trello.com/1/cards`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cardData)
            });
    
            if (!cardResponse.ok) throw new Error('Failed to create Trello card');
            const newCard = await cardResponse.json();
            const cardId = newCard.id;
    
            setTrelloStatus({ loading: true, message: t(language, 'uploadingAttachments') });
    
            const attachmentsToUpload = [];
            // Images
            summary.images.forEach((image, index) => {
                const blob = dataURLtoBlob(image.src);
                if(blob) attachmentsToUpload.push({ blob, name: `reference-${index + 1}.jpeg` });
            });
    
            // PDFs
            const updatedSummary = { ...summary, totalPrice: parseFloat(finalPrice) || summary.totalPrice, remarksForFactoryShop, remarksForCustomer };
            const date = getFormattedDate();
            const customerName = summary.customerName || 'customer';

            const customerPdfFilename = t(language, 'customerPdfFilename', { customerName, date });
            const shopPdfFilename = t(language, 'shopPdfFilename', { customerName, date });
            const factoryPdfFilename = t(language, 'factoryPdfFilename', {
                jewelryType: t(language, summary.jewelryType),
                material: summary.fullMaterialName,
                customerName,
                date,
            });

            attachmentsToUpload.push({ blob: generateCustomerPdf(updatedSummary, language), name: customerPdfFilename });
            attachmentsToUpload.push({ blob: generateShopPdf(updatedSummary, language), name: shopPdfFilename });
            attachmentsToUpload.push({ blob: generateFactoryPdf(updatedSummary, language), name: factoryPdfFilename });
    
            const uploadPromises = attachmentsToUpload.map(attachment => {
                const formData = new FormData();
                formData.append('key', config.trelloApiKey);
                formData.append('token', config.trelloApiToken);
                formData.append('file', attachment.blob, attachment.name);
    
                return fetch(`https://api.trello.com/1/cards/${cardId}/attachments`, {
                    method: 'POST',
                    body: formData,
                });
            });
    
            await Promise.all(uploadPromises);
    
            setTrelloStatus({ loading: false, message: t(language, 'trelloCardCreated') });
            setTimeout(() => setTrelloStatus({ loading: false, message: '' }), 3000);
        } catch (error) {
            console.error('Error creating Trello card:', error);
            setTrelloStatus({ loading: false, message: t(language, 'trelloCreationFailed') });
        }
    };

    const handleAttemptCreateTrelloCard = () => {
        if (trelloStatus.loading) return;
        if (trelloPin === CORRECT_PIN) {
            setTrelloPinError(false);
            setTrelloPin(''); // Reset PIN on success
            executeCreateTrelloCard();
        } else {
            setTrelloPinError(true);
            setTrelloPin(''); // Reset PIN on failure
            setTrelloStatus({ loading: true, message: t(language, 'tryAgainLater') });
            setTimeout(() => {
                setTrelloPinError(false);
                setTrelloStatus({ loading: false, message: '' });
            }, 2000);
        }
    };


    if (!isOpen || !summary) {
        return null;
    }

    const trelloConfigured = config.trelloApiKey && config.trelloApiToken && config.trelloBoardId;

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="summary-heading" onClick={onClose}>
            <div ref={modalContentRef} className="modal-content" onClick={e => e.stopPropagation()}>
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
                              <SpecItem label={t(language, 'materialLabel')} value={`${summary.fullMaterialName}${summary.showGramsInQuote ? ` (~${summary.grams || 0}${t(language, 'gramsUnit')})` : ''}`} />
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

                    {summaryView === 'customer' && comparisonData.length > 0 && (
                        <div className="material-comparison-section">
                            <h4>{t(language, 'materialConversionTitle')}</h4>
                            <table className="comparison-table">
                                <thead>
                                    <tr>
                                        <th>{t(language, 'comparisonMaterial')}</th>
                                        <th>{`${t(language, 'comparisonWeight')} (${t(language, 'gramsUnit')})`}</th>
                                        <th>{t(language, 'comparisonPrice')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonData.sort((a, b) => {
                                        const order = { 'gold9k': 1, 'gold14k': 2, 'gold18k': 3, 'pt950': 4 };
                                        return order[a.material] - order[b.material];
                                    }).map(item => (
                                        <tr 
                                            key={item.material} 
                                            className={item.material === summary.material ? 'highlight' : ''}
                                            onClick={() => onMaterialChangeRequest(item.material, item.weight, item.name)}
                                            tabIndex={0}
                                            role="button"
                                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onMaterialChangeRequest(item.material, item.weight, item.name)}
                                        >
                                            <td>{item.name}</td>
                                            <td>{item.weight}</td>
                                            <td>{formatCurrency(item.price, language)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                    
                    <div className="download-grid">
                        {summaryView === 'shop' ? (
                            <>
                                <button type="button" className="download-btn shop" onClick={handleDownloadShopPDF}><span>{t(language, 'downloadShopPDF')}</span></button>
                                <button type="button" className="download-btn factory" onClick={handleDownloadFactoryPDF}><span>{t(language, 'downloadFactoryPDF')}</span></button>
                            </>
                        ) : (
                            <>
                                <button type="button" className="download-btn customer" onClick={handleDownloadCustomerPDF}><span>{t(language, 'downloadCustomerPDF')}</span></button>
                                <button type="button" className="download-btn copy" onClick={handleCopyToClipboard} disabled={isCopied}>
                                    {isCopied ? (
                                        <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>{t(language, 'copiedLabel')}</span></>
                                    ) : (
                                        <><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><span>{t(language, 'copyForChat')}</span></>
                                    )}
                                </button>
                            </>
                        )}
                    </div>

                    {summaryView === 'shop' && trelloConfigured && (
                        <div className="trello-section">
                            <h4>{t(language, 'trelloIntegration')}</h4>
                            <div className="trello-controls">
                                <div className="form-group">
                                    <label htmlFor="trelloList">{t(language, 'trelloList')}</label>
                                    <select id="trelloList" value={selectedTrelloListId} onChange={(e) => setSelectedTrelloListId(e.target.value)} disabled={trelloStatus.loading || trelloLists.length === 0}>
                                        {trelloLists.map(list => <option key={list.id} value={list.id}>{list.name}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="trelloPin">{t(language, 'enterPinPrompt')}</label>
                                    <input
                                        id="trelloPin"
                                        type="password"
                                        value={trelloPin}
                                        onChange={(e) => setTrelloPin(e.target.value)}
                                        className={trelloPinError ? 'error' : ''}
                                        disabled={trelloStatus.loading}
                                        maxLength={CORRECT_PIN.length}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <button className="download-btn trello" onClick={handleAttemptCreateTrelloCard} disabled={trelloStatus.loading || !selectedTrelloListId || trelloPin.length !== CORRECT_PIN.length}>
                                {t(language, 'createTrelloCard')}
                            </button>
                            {trelloStatus.message && <p className="trello-status-message">{trelloStatus.message}</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SummaryModal;