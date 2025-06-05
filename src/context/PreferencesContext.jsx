import { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';




const PreferencesContext = createContext(null);

const STORAGE_KEY = "@user_preferences";

const defaultPreferences = {
  language: "en",
  blockedTopics: [],
  blockedDomains: [],
  countryCode: "us"
};

export const PreferencesProvider = ({ children }) => {
  const [preferences, setPreferences] = useState(defaultPreferences);

  useEffect(() => {
    const loadPreferences = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setPreferences(JSON.parse(stored));
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const updateLanguage = (lang) => {
    setPreferences(prev => ({ ...prev, language: lang }));
  };

  const updateCountry = (country) => {
    setPreferences(prev => ({...prev, countryCode: country}))
  };

  const toggleBlockedTopic = (topic) => {
    setPreferences(prev => ({
      ...prev,
      blockedTopics: prev.blockedTopics.includes(topic)
        ? prev.blockedTopics.filter(t => t !== topic)
        : [...prev.blockedTopics, topic],
    }));
  };

  const toggleBlockedDomain = (domain) => {
    setPreferences(prev => ({
      ...prev,
      blockedDomains: prev.blockedDomains.includes(domain)
        ? prev.blockedDomains.filter(d => d !== domain)
        : [...prev.blockedDomains, domain],
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updateLanguage,
        updateCountry,
        toggleBlockedTopic,
        toggleBlockedDomain,
        resetPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences debe usarse dentro de PreferencesProvider");
  return ctx;
};