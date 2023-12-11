import { I18n } from "i18n-js"
import DiskCacheManager from "../Managers/DiskCacheManager"
import Constants from "./Constants"

export const translations = {
  en: {
    searchText: "egypt",
    home: "Home",
    settings: "Settings",
    newsDetails: "News Details",
    search: "Search",
    description: "Description",
    seeMore: "See More...",
    language: "Language",
    arabic: "Arabic",
    english: "English",
    appearance: "Appearance",
    dark: "Dark",
    light: "Light",
  },

  ar: {
    searchText: "مصر",
    home: "الرئيسية",
    settings: "الاعدادات",
    newsDetails: "تفاصيل الخبر",
    search: "بحث",
    description: "الوصف",
    seeMore: "للمزيد...",
    language: "اللغة",
    arabic: "العربية",
    english: "الانجليزية",
    appearance: "المظهر",
    dark: "داكن",
    light: "فاتح",
  },
}

const i18n = new I18n(translations)
i18n.locale = "en"
i18n.enableFallback = true
