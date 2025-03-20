import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';
export type ActiveTheme = 'light' | 'dark';

type ThemeContextType = {
  themeMode: ThemeMode;
  activeTheme: ActiveTheme;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  activeTheme: 'dark', // Default to dark
  setThemeMode: async () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const systemColorScheme = useColorScheme() as ActiveTheme || 'dark';
  const [activeTheme, setActiveTheme] = useState<ActiveTheme>('dark');
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  // Check onboarding status
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('onboardComplete');
        setOnboardingComplete(value === 'true');
      } catch (error) {
        console.error('Failed to check onboarding status:', error);
        setOnboardingComplete(false);
      }
    };

    checkOnboarding();
  }, []);

  // Load saved theme on startup
  useEffect(() => {
    const loadTheme = async () => {
      try {
        // Only load saved theme if onboarding is complete
        if (onboardingComplete) {
          const savedMode = await AsyncStorage.getItem('themeMode');
          if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
            setThemeModeState(savedMode as ThemeMode);
          }
        } else if (onboardingComplete === false) {
          // Force system theme during onboarding
          setThemeModeState('system');
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      }
    };

    // Only run when onboardingComplete has been determined
    if (onboardingComplete !== null) {
      loadTheme();
    }
  }, [onboardingComplete]);

  // Update active theme when theme mode or system theme changes
  useEffect(() => {
    if (themeMode === 'system') {
      setActiveTheme(systemColorScheme);
    } else {
      setActiveTheme(themeMode as ActiveTheme);
    }
  }, [themeMode, systemColorScheme]);

  // Function to change theme mode and save it
  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem('themeMode', mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        activeTheme,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);