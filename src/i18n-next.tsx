import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en/en.json';
import es from './i18n/es/es.json';

i18n.use(initReactI18next).init({
  debug: !import.meta.env.PROD,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    es,
  },
});

export default i18n;
