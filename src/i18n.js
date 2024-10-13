import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationPT from './locales/pt/translation.json';

const resources = {
  en: {
    translation: translationEN
  },
  pt: {
    translation: translationPT
  }
};

i18n
  .use(initReactI18next) // Conecta o i18next com o React
  .init({
    resources,
    lng: 'en', // Defina o idioma padrão
    interpolation: {
      escapeValue: false // O React já faz a sanitização das strings
    }
  });

export default i18n;
