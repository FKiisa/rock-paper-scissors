import { useCallback } from "react";
import rawLocales from "../data/en.json";

type Locales = typeof rawLocales;

// Convert all keys in the JSON to lowercase
const locales = Object.keys(rawLocales).reduce((acc, key) => {
  const lowerCaseKey = key.toLowerCase();
  acc[lowerCaseKey] = rawLocales[key as keyof Locales];
  return acc;
}, {} as Record<string, any>);

export const useTranslation = () => {
  const translate = useCallback((key: string): string => {
    const keys = key.split(".").map((k) => k.toLowerCase()); // Convert the input key to lowercase
    let translation: any = locales;

    for (let i = 0; i < keys.length; i++) {
      if (translation[keys[i]] !== undefined) {
        translation = translation[keys[i]];
      } else {
        console.warn(`Translation key "${key}" not found.`);
        return `${key}_missing`;
      }
    }

    return typeof translation === "string" ? translation : `${key}_missing`;
  }, []);

  return translate;
};
