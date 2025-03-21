import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Fingerprint, Lock, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { type ActiveTheme, useTheme } from '../../context/ThemeContext';
import { SwipeScreen } from '@/utils/swipeNav';

export default function Security() {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';
  const styles = getStyles(activeTheme);

  // Security preferences
  const [useBiometric, setUseBiometric] = useState(true);
  const [showPinOption, setShowPinOption] = useState(false);

  // Auth context for completing onboarding
  const { setOnboardingComplete } = useAuth();

  // Check if device supports biometrics
  React.useEffect(() => {
    const checkBiometricSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        setUseBiometric(false);
        setShowPinOption(true);
      }
    };

    checkBiometricSupport();
  }, []);

  /**
   * Set up biometric authentication and continue to preferences
   */
  const setupBiometrics = async () => {
    try {
      // Check if device supports biometrics
      const compatible = await LocalAuthentication.hasHardwareAsync();

      if (!compatible) {
        // If biometrics not supported, show PIN option
        setShowPinOption(true);
        return;
      }

      // Check if biometrics are enrolled
      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!enrolled) {
        alert('Please set up biometric authentication in your device settings first.');
        return;
      }

      // Try to authenticate to make sure it works
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to continue setup',
        fallbackLabel: 'Use PIN instead',
      });

      if (result.success) {
        // Save setting and continue to preferences
        await AsyncStorage.setItem('biometricsEnabled', 'true');
        // Navigate to preferences instead of completing onboarding
        router.push('/onboarding/preferences');
      } else {
        alert('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Failed to set up biometrics:', error);
      alert('There was an error setting up biometric authentication. You can change this later in settings.');
      // Navigate to preferences anyway
      router.push('/onboarding/preferences');
    }
  };

  /**
   * Set up PIN authentication and continue to preferences
   */
  const setupPIN = async () => {
    try {
      // In a real app, you'd have a PIN setup flow here
      // For this prototype, we'll just simulate it
      alert('PIN setup would happen here in a real app.');

      // Save setting and continue to preferences
      await AsyncStorage.setItem('biometricsEnabled', 'false');
      router.push('/onboarding/preferences');
    } catch (error) {
      console.error('Failed to set up PIN:', error);
      alert('There was an error setting up PIN. You can change this later in settings.');
      // Continue to preferences anyway
      router.push('/onboarding/preferences');
    }
  };

  /**
   * Skip security setup for now and continue to preferences
   */
  const skipForNow = async () => {
    try {
      // Save default preferences
      await AsyncStorage.setItem('biometricsEnabled', 'false');

      // Continue to preferences
      router.push('/onboarding/preferences');
    } catch (error) {
      console.error('Failed to skip security setup:', error);
      alert('There was an error. Please try again.');
    }
  };

  // Go back to about page
  const goBack = () => {
    router.push('./about');
  };

  return (
    <SwipeScreen nextRoute="./preferences" previousRoute={'./about'}>
      <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <ChevronLeft stroke={isDark ? "#ffffff" : "#000000"} width={28} height={28} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>Security</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollContent}>
          <Text style={[styles.subtitle, { color: isDark ? '#AAAAAA' : '#666666' }]}>
            Choose how you want to protect your authentication tokens.
          </Text>

          <View style={styles.securityOptions}>
            {/* Biometric Option */}
            <TouchableOpacity
              style={styles.optionContainer}
              onPress={setupBiometrics}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={['#ff00ff', '#00ffff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              >
                <View style={[styles.innerBorder, { backgroundColor: isDark ? '#121212' : '#f8f8f8' }]}>
                  <View style={styles.optionContent}>
                    <Fingerprint color="#00ffff" size={40} />
                    <Text style={[styles.optionTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>Use Biometrics</Text>
                    <Text style={[styles.optionDescription, { color: isDark ? '#AAAAAA' : '#666666' }]}>
                      Secure your tokens with fingerprint or face recognition
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            {/* PIN Option */}
            <TouchableOpacity
              style={[styles.optionContainer, !showPinOption && styles.disabledOption]}
              onPress={setupPIN}
              disabled={!showPinOption}
              activeOpacity={0.7}
            >
              <LinearGradient
                colors={showPinOption ? ['#ff00ff', '#00ffff'] : ['#333333', '#222222']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
              >
                <View style={[styles.innerBorder, { backgroundColor: isDark ? '#121212' : '#f8f8f8' }]}>
                  <View style={styles.optionContent}>
                    <Lock color={showPinOption ? "#00ffff" : "#666666"} size={40} />
                    <Text style={[styles.optionTitle, !showPinOption && styles.disabledText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                      Use PIN Code
                    </Text>
                    <Text style={[styles.optionDescription, !showPinOption && styles.disabledText, { color: isDark ? '#AAAAAA' : '#666666' }]}>
                      Secure your tokens with a numeric PIN code
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Skip Option */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={skipForNow}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#ff00ff', '#00ffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={[styles.innerBorder, { backgroundColor: isDark ? '#121212' : '#f0f0f0' }]}>
              <View style={styles.buttonContent}>
                <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Skip for now</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SwipeScreen>
  );
}

const getStyles = (theme: ActiveTheme) => {
  return StyleSheet.create({
    buttonContainer: {
      marginTop: 20,
      width: '100%',
      shadowColor: '#ff00ff',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 2,
      marginRight: 10,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    container: {
      flex: 1,
      padding: 20,
      paddingTop: 50,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 30,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontWeight: 'bold',
      fontSize: 24,
      letterSpacing: 1,
    },
    placeholder: {
      width: 44,
    },
    scrollContent: {
      flex: 1,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 30,
      lineHeight: 24,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    securityOptions: {
      marginBottom: 30,
    },
    optionContainer: {
      marginBottom: 20,
      shadowColor: '#ff00ff',
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
    disabledOption: {
      opacity: 0.6,
      shadowOpacity: 0.2,
    },
    gradient: {
      borderRadius: 8,
      padding: theme === 'dark' ? 2 : 1.5,
    },
    innerBorder: {
      borderRadius: 6,
      padding: 20,
    },
    optionContent: {
      alignItems: 'center',
    },
    optionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    optionDescription: {
      textAlign: 'center',
      lineHeight: 20,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    disabledText: {
      color: '#666666',
    },
    skipButton: {
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      borderWidth: 1,
      marginBottom: 30,
    },
    skipButtonText: {
      fontWeight: '600',
      fontSize: 16,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
  })
};