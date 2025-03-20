import type React from 'react';
import { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, Text } from 'react-native';
import { router, useSegments, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Define the context type
type AuthContextType = {
  onboardingComplete: boolean;
  setOnboardingComplete: (value: boolean) => Promise<void>;
  resetOnboarding: () => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  onboardingComplete: false,
  setOnboardingComplete: async () => {},
  resetOnboarding: async () => {},
});

// Ensure the splash screen stays visible
SplashScreen.preventAutoHideAsync();

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  // Set onboarding status
  const setOnboardingComplete = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('onboardComplete', value ? 'true' : 'false');
      setOnboardingCompleteState(value);
    } catch (error) {
      console.error('Failed to save onboarding status:', error);
    }
  };

  // Reset onboarding
  const resetOnboarding = async () => {
    try {
      // Clear all onboarding related data
      const keysToRemove = [
        'onboardComplete',
        'userPreferences',
        'biometricsEnabled',
        'userPIN'
      ];

      await AsyncStorage.multiRemove(keysToRemove);
      setOnboardingCompleteState(false);

      // Navigate to onboarding
      router.replace('/onboarding/welcome');
    } catch (error) {
      console.error('Failed to reset onboarding:', error);
    }
  };

  // Check onboarding status on mount
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Force a fresh read of the value
        await AsyncStorage.flushGetRequests();
        const value = await AsyncStorage.getItem('onboardComplete');
        console.log('Onboarding status:', value);

        // Only set to true if explicitly 'true'
        setOnboardingCompleteState(value === 'true');
      } catch (error) {
        console.error('Failed to load onboarding status:', error);
        setOnboardingCompleteState(false);
      } finally {
        setIsLoading(false);
        await SplashScreen.hideAsync();
      }
    };

    checkOnboardingStatus();
  }, []);

  // Handle routing based on auth state
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'onboarding';

    if (!onboardingComplete && !inAuthGroup) {
      console.log('Redirecting to onboarding from segments:', segments);
      router.replace('/onboarding/welcome');
    } else if (onboardingComplete && inAuthGroup) {
      console.log('Redirecting to home from onboarding');
      router.replace('/');
    }
  }, [onboardingComplete, segments, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000' }}>
        <ActivityIndicator size="large" color="#FD01FF" />
        <Text style={{ marginTop: 20, color: '#ffffff' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        onboardingComplete,
        setOnboardingComplete,
        resetOnboarding
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);