import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Moon, Bell, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Preferences screen for onboarding process
 * Allows users to set initial app preferences
 */
export default function Preferences() {
  // Preference state
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [dataSync, setDataSync] = useState(true);

  // Auth context for completing onboarding
  const { setOnboardingComplete } = useAuth();

  // Toggle handlers
  const toggleNotifications = () => setNotifications(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleDataSync = () => setDataSync(prev => !prev);

  // Go back to security page
  const goBack = () => {
    router.push('/onboarding/security');
  };

  /**
   * Save preferences and mark onboarding as complete
   */
  const completeOnboarding = async () => {
    try {
      // Save all preferences
      const preferences = {
        notifications,
        darkMode,
        dataSync
      };

      console.log('Saving preferences and completing onboarding...');
      await AsyncStorage.setItem('userPreferences', JSON.stringify(preferences));
      await AsyncStorage.setItem('themeMode', darkMode ? 'dark' : 'light');

      // Mark onboarding as complete using context
      await setOnboardingComplete(true);
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.error('Failed to save preferences:', error);
      alert('There was an error saving your preferences. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ChevronLeft stroke="#ffffff" width={28} height={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>
          Set your preferences for the app. You can always change these later in settings.
        </Text>

        <LinearGradient
          colors={['#ff00ff', '#00ffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <View style={styles.cardContent}>
            {/* Dark Mode Preference */}
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIconContainer}>
                <Moon color={darkMode ? "#00ffff" : "#999999"} size={24} />
              </View>
              <View style={styles.preferenceTextContainer}>
                <Text style={styles.preferenceTitle}>Dark Mode</Text>
                <Text style={styles.preferenceDescription}>
                  Use dark theme for comfortable viewing
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
                thumbColor={darkMode ? '#00ffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleDarkMode}
                value={darkMode}
              />
            </View>

            <View style={styles.divider} />

            {/* Notifications Preference */}
            <View style={styles.preferenceItem}>
              <View style={styles.preferenceIconContainer}>
                <Bell color={notifications ? "#00ffff" : "#999999"} size={24} />
              </View>
              <View style={styles.preferenceTextContainer}>
                <Text style={styles.preferenceTitle}>Notifications</Text>
                <Text style={styles.preferenceDescription}>
                  Get alerts about security events
                </Text>
              </View>
              <Switch
                trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
                thumbColor={notifications ? '#00ffff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNotifications}
                value={notifications}
              />
            </View>
          </View>
        </LinearGradient>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={completeOnboarding}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['#ff00ff', '#00ffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.innerBorder}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>COMPLETE SETUP</Text>
              <Check color="#FFFFFF" size={24} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
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
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#AAAAAA',
    marginBottom: 30,
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  gradientCard: {
    width: '100%',
    borderRadius: 8,
    padding: 2,
    marginBottom: 30,
    shadowColor: '#ff00ff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  cardContent: {
    backgroundColor: '#121212',
    borderRadius: 6,
    padding: 20,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  preferenceTextContainer: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  preferenceDescription: {
    fontSize: 13,
    color: '#AAAAAA',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    marginVertical: 15,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    marginBottom: 30,
    shadowColor: '#ff00ff',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  gradient: {
    borderRadius: 4,
    padding: 2,
  },
  innerBorder: {
    backgroundColor: '#121212',
    borderRadius: 2,
    padding: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 2,
    marginRight: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});