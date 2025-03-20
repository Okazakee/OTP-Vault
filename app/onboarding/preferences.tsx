import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Moon, Bell, Check } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type ActiveTheme, useTheme } from '../../context/ThemeContext';

export default function Preferences() {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';
  const styles = getStyles(activeTheme);

  // Preference state
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(isDark);
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
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ChevronLeft stroke={isDark ? "#ffffff" : "#000000"} width={28} height={28} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>Preferences</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.subtitle, { color: isDark ? '#AAAAAA' : '#666666' }]}>
          Set your preferences for the app. You can always change these later in settings.
        </Text>

        <LinearGradient
          colors={['#ff00ff', '#00ffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <View style={[styles.cardContent, { backgroundColor: isDark ? '#121212' : '#f8f8f8' }]}>
            {/* Dark Mode Preference */}
            <View style={styles.preferenceItem}>
              <View style={[styles.preferenceIconContainer, { backgroundColor: isDark ? '#2A2A2A' : '#e0e0e0' }]}>
                <Moon color={darkMode ? "#ff00ff" : "#999999"} size={24} />
              </View>
              <View style={styles.preferenceTextContainer}>
                <Text style={[styles.preferenceTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>Dark Mode</Text>
                <Text style={[styles.preferenceDescription, { color: isDark ? '#AAAAAA' : '#666666' }]}>
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

            <View style={[styles.divider, { backgroundColor: isDark ? '#333333' : '#e0e0e0' }]} />

            {/* Notifications Preference */}
            <View style={styles.preferenceItem}>
              <View style={[styles.preferenceIconContainer, { backgroundColor: isDark ? '#2A2A2A' : '#e0e0e0' }]}>
                <Bell color={notifications ? "#ff00ff" : "#999999"} size={24} />
              </View>
              <View style={styles.preferenceTextContainer}>
                <Text style={[styles.preferenceTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>Notifications</Text>
                <Text style={[styles.preferenceDescription, { color: isDark ? '#AAAAAA' : '#666666' }]}>
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
          <View style={[styles.innerBorder, { backgroundColor: isDark ? '#121212' : '#f8f8f8' }]}>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>COMPLETE SETUP</Text>
              <Check color={isDark ? '#FFFFFF' : '#000000'} size={24} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ActiveTheme) => {
  return StyleSheet.create({
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
    content: {
      flex: 1,
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 30,
      lineHeight: 24,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    gradientCard: {
      width: '100%',
      borderRadius: 8,
      padding: theme === 'dark' ? 2 : 1.5,
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
      marginBottom: 4,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    preferenceDescription: {
      fontSize: 13,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    divider: {
      height: 1,
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
      padding: theme === 'dark' ? 2 : 1.5,
    },
    innerBorder: {
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
  })
};