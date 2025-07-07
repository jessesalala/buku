// src/services/translation.js
const API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

// Get cached translations
const getCachedTranslation = (text, targetLang) => {
  const cacheKey = `${targetLang}:${text}`;
  const cached = localStorage.getItem(`translation:${cacheKey}`);
  if (!cached) return null;

  const { translation, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRY) return null;

  return translation;
};

// Save translation to cache
const cacheTranslation = (text, targetLang, translation) => {
  const cacheKey = `${targetLang}:${text}`;
  const cacheValue = {
    translation,
    timestamp: Date.now()
  };
  localStorage.setItem(`translation:${cacheKey}`, JSON.stringify(cacheValue));
};

export const translateText = async (text, targetLang = 'sw') => {
  // Check cache first
  const cached = getCachedTranslation(text, targetLang);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target: targetLang,
        }),
      }
    );
    
    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    
    // Cache the translation
    cacheTranslation(text, targetLang, translatedText);
    
    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};