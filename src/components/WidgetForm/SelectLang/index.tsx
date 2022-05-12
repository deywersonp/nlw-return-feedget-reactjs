import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE
} from "../../../utils/constants";

const SELECTED_LANG = 'widget-app-selectedLang';

export function SelectLang() {
  const { i18n } = useTranslation();

  const [selectedLang, setSelectedLang] = useState(DEFAULT_LANGUAGE);

  const handleChangeLanguage = (value: string) => {
    i18n.changeLanguage(value);
    setSelectedLang(value);
    localStorage.setItem(SELECTED_LANG, value);
  };

  useEffect(() => {
    const language = localStorage.getItem(SELECTED_LANG);
    if (language) {
      setSelectedLang(language);
      i18n.changeLanguage(language);
    }
  }, []);

  return (
    <div className="">
      <select
        className={'bg-zinc-900 ml-2 pr-8 py-1'}
        onChange={(event) => handleChangeLanguage(event.target.value)}
        value={selectedLang}
      >
        {
          AVAILABLE_LANGUAGES.map(lang => (
            <option key={lang} value={lang}>{lang.toUpperCase()}</option>
          ))
        }
      </select>
    </div>
  );
}