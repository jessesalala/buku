// src/components/LanguageSwitcher.js
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function LanguageSwitcher() {
  const { language, switchLanguage } = useLanguage();

  return (
    <div className="language-switcher">
      <button 
        onClick={() => switchLanguage('en')}
        className={language === 'en' ? 'active' : ''}
      >
        EN
      </button>
      <span className="divider">|</span>
      <button 
        onClick={() => switchLanguage('sw')}
        className={language === 'sw' ? 'active' : ''}
      >
        SW
      </button>
    </div>
  );
}

export default LanguageSwitcher;