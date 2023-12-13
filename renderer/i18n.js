import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from 'i18next-resources-to-backend';

function initLocale(locale) {
    return i18n.use(initReactI18next) // passes i18n down to react-i18next
        .use(LanguageDetector)
        .use(resourcesToBackend((language) => import(`../locales/${language}.json`)))
        .init({
            fallbackLng: false,
            lng: locale || 'en',
            //debug: true,

            interpolation: {
                escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
            }
        })
}

const defaultLocale = 'en'

const Locale = { locale: 'en' | 'it' }

export { i18n, initLocale, defaultLocale, Locale }