import React, { useLayoutEffect } from 'react';
import { t } from '../../i18n.js';
import './ConfirmationModal.css';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    language: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message, language }) => {
    useLayoutEffect(() => {
        if (isOpen) {
            const handleKeyDown = (event) => {
                if (event.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay confirmation-modal-overlay" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="modal-content confirmation-modal-content" onClick={e => e.stopPropagation()}>
                <h2>{title}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button onClick={onClose} className="cancel-btn">{t(language, 'cancelBtn')}</button>
                    <button onClick={onConfirm} className="save-btn confirm-btn">{t(language, 'confirmBtn')}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
