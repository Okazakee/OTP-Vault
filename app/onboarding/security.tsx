import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { Fingerprint, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';

/**
 * Security screen for onboarding process
 * Allows users to set up biometric or PIN authentication
 */
export default function Security() {
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
   * Set up biometric authentication and complete onboarding
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
        promptMessage: 'Authenticate to complete setup',
        fallbackLabel: 'Use PIN instead',
      });

      if (result.success) {
        // Save setting and complete onboarding
        await AsyncStorage.setItem('biometricsEnabled', 'true');
        await setOnboardingComplete(true);
        // Navigation will be handled by AuthContext
      } else {
        alert('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Failed to set up biometrics:', error);
      alert('There was an error setting up biometric authentication. You can change this later in settings.');
      // Save preferences and mark onboarding as complete anyway
      await setOnboardingComplete(true);
    }
  };

  /**
   * Set up PIN authentication and complete onboarding
   */
  const setupPIN = async () => {
    try {
      // In a real app, you'd have a PIN setup flow here
      // For this prototype, we'll just simulate it
      alert('PIN setup would happen here in a real app.');

      // Save setting and complete onboarding
      await AsyncStorage.setItem('biometricsEnabled', 'false');
      await setOnboardingComplete(true);
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.error('Failed to set up PIN:', error);
      alert('There was an error setting up PIN. You can change this later in settings.');
      // Save preferences and mark onboarding as complete anyway
      await setOnboardingComplete(true);
    }
  };

  /**
   * Skip security setup for now
   */
  const skipForNow = async () => {
    try {
      // Save default preferences
      await AsyncStorage.setItem('biometricsEnabled', 'false');

      // Complete onboarding
      await setOnboardingComplete(true);
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
      alert('There was an error completing setup. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Secure Your App</Text>
        <Text style={styles.subtitle}>
          Choose how you want to protect your authentication tokens.
        </Text>

        <View style={styles.securityContainer}>
          {/* Biometric Option */}
          <TouchableOpacity
            style={styles.securityOption}
            onPress={setupBiometrics}
          >
            <LinearGradient
              colors={['#ff00ff', '#00ffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
              <View style={styles.securityContent}>
                <Fingerprint stroke="#00ffff" width={40} height={40} />
                <Text style={styles.optionTitle}>Use Biometrics</Text>
                <Text style={styles.optionDescription}>
                  Secure your tokens with fingerprint or face recognition
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          {/* PIN Option */}
          <TouchableOpacity
            style={[styles.securityOption, !showPinOption && {opacity: 0.6}]}
            onPress={setupPIN}
            disabled={!showPinOption}
          >
            <LinearGradient
              colors={showPinOption ? ['#ff00ff', '#00ffff'] : ['#444444', '#222222']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
              <View style={styles.securityContent}>
                <Lock stroke={showPinOption ? "#00ffff" : "#666666"} width={40} height={40} />
                <Text style={[styles.optionTitle, !showPinOption && {color: '#888888'}]}>
                  Use PIN
                </Text>
                <Text style={[styles.optionDescription, !showPinOption && {color: '#666666'}]}>
                  Secure your tokens with a numeric PIN code
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {/* Skip Option */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={skipForNow}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 12,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 40,
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  securityContainer: {
    marginVertical: 20,
  },
  securityOption: {
    marginBottom: 24,
    shadowColor: '#ff00ff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientBorder: {
    borderRadius: 8,
    padding: 2, // Border thickness
  },
  securityContent: {
    backgroundColor: '#121212',
    borderRadius: 6,
    padding: 20,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  optionDescription: {
    color: '#AAAAAA',
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  skipButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444444',
  },
  skipButtonText: {
    color: '#AAAAAA',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});