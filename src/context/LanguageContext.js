// src/context/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { translateText } from '../services/translation';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('sw'); // Default to Swahili
  const [translations, setTranslations] = useState({});
  const [isTranslating, setIsTranslating] = useState(false);

  const translate = async (text) => {
    if (language === 'en') return text; // No translation needed for English
    if (translations[text]) return translations[text]; // Use cached translation

    setIsTranslating(true);
    try {
      const translatedText = await translateText(text, language);
      setTranslations(prev => ({ ...prev, [text]: translatedText }));
      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    } finally {
      setIsTranslating(false);
    }
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  useEffect(() => {
    // Load preferred language from localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      switchLanguage,
      translate,
      isTranslating
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}