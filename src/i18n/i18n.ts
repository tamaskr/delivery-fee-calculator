import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';

// Init i18n to handle translations
const resources = { en: { translation: en } };

i18next.use(initReactI18next).init({ resources, lng: 'en' });

export default i18next;
