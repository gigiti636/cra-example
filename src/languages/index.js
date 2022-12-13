import en from './en.json';
import el from './el.json';
import { createContext } from "react";

const dictionaryList = { en, el };
const language = window.navigator !== undefined && navigator.language.includes('el') ? 'el' : 'en';

/*
en: 'English
el: 'Greek'
*/

export const LanguageContext = createContext();
export const defaultLanguage = dictionaryList[language];

