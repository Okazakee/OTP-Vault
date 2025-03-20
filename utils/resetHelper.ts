import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as Updates from 'expo-updates';

/**
 * Completely resets the onboarding state and reloads the app
 * This is a more reliable way to reset the app state than just navigation
 */
export async function resetOnboarding() {
  try {
    console.log('Completely resetting onboarding...');

    // Clear ALL onboarding related items
    const keysToRemove = [
      'onboardComplete',
      'userPreferences',
      'biometricsEnabled',
      'userPIN'
    ];

    // Remove all keys
    await AsyncStorage.multiRemove(keysToRemove);

    // Double check they're gone
    const verifyValue = await AsyncStorage.getItem('onboardComplete');
    console.log('After reset, onboardComplete =', verifyValue);

    // Set a temporary flag to indicate we're in the process of resetting
    await AsyncStorage.setItem('resetting', 'true');

    // Alert the user before reloading
    alert('Onboarding has been reset. The app will now restart.');

    // In development, we'll use router navigation
    if (__DEV__) {
      // Use router.navigate instead of replace
      router.navigate('/onboarding/welcome');
    } else {
      // In production, we can use Expo Updates to reload the app completely
      await Updates.reloadAsync();
    }
  } catch (error) {
    console.error('Failed to reset onboarding:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    alert(`Error resetting onboarding: ${errorMessage}`);
  }
}