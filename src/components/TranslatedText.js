// src/components/TranslatedText.js
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const TranslatedText = ({ children }) => {
  const { language, translate } = useLanguage();
  const [translated, setTranslated] = useState(children);

  useEffect(() => {
    const updateTranslation = async () => {
      if (typeof children === 'string') {
        const result = await translate(children);
        setTranslated(result);
      }
    };

    updateTranslation();
  }, [children, language, translate]);

  return <>{translated}</>;
};

export default TranslatedText;