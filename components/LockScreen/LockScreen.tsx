import React from 'react';
import { t } from '../../i18n.js';
import './LockScreen.css';

interface LockScreenProps {
    language: string;
    pinInput: string;
    pinError: boolean;
    correctPinLength: number;
    onKeyPress: (key: string) => void;
    onDelete: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({
    language,
    pinInput,
    pinError,
    correctPinLength,
    onKeyPress,
    onDelete
}) => (
    <div className="lock-screen-container">
        <h2 className="pin-prompt">{t(language, 'enterPinPrompt')}</h2>
        <div className={`pin-dots-container ${pinError ? 'shake' : ''}`}>
            {Array.from({ length: correctPinLength }).map((_, index) => (
                <div key={index} className={`pin-dot ${index < pinInput.length ? 'filled' : ''}`}></div>
            ))}
        </div>
        <div className="keypad">
            {'123456789'.split('').map(key => (
                <button key={key} onClick={() => onKeyPress(key)} className="keypad-btn">
                    {key}
                </button>
            ))}
            <div />
            <button onClick={() => onKeyPress('0')} className="keypad-btn">0</button>
            <button onClick={onDelete} className="keypad-btn action">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path>
                <line x1="18" y1="9" x2="12" y2="15"></line>
                <line x1="12" y1="9" x2="18" y2="15"></line>
                </svg>
            </button>
        </div>
    </div>
);

export default LockScreen;
