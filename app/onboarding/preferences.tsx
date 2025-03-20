import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';

/**
 * Preferences screen for onboarding process
 * Allows users to set initial app preferences
 */
export default function Preferences() {
  // Preference state
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [dataSync, setDataSync] = useState(true);

  // Auth context for completing onboarding
  const { setOnboardingComplete } = useAuth();

  // Toggle handlers
  const toggleNotifications = () => setNotifications(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleDataSync = () => setDataSync(prev => !prev);

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

      // Mark onboarding as complete using context
      await setOnboardingComplete(true);
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.error('Failed to save preferences:', error);
      alert('There was an error saving your preferences. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Customize Your Experience</Text>
        <Text style={styles.subtitle}>
          Set your preferences for the app. You can always change these later in the settings.
        </Text>

        <View style={styles.preferencesContainer}>
          {/* Notifications Preference */}
          <View style={styles.preferenceItem}>
            <View>
              <Text style={styles.preferenceTitle}>Push Notifications</Text>
              <Text style={styles.preferenceDescription}>
                Receive notifications about important updates and events
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#007AFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={notifications}
            />
          </View>

          <View style={styles.separator} />

          {/* Dark Mode Preference */}
          <View style={styles.preferenceItem}>
            <View>
              <Text style={styles.preferenceTitle}>Dark Mode</Text>
              <Text style={styles.preferenceDescription}>
                Use dark theme for comfortable viewing in low light
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkMode ? '#007AFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDarkMode}
              value={darkMode}
            />
          </View>

          <View style={styles.separator} />

          {/* Data Sync Preference */}
          <View style={styles.preferenceItem}>
            <View>
              <Text style={styles.preferenceTitle}>Data Synchronization</Text>
              <Text style={styles.preferenceDescription}>
                Automatically sync your data across devices
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={dataSync ? '#007AFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleDataSync}
              value={dataSync}
            />
          </View>
        </View>
      </View>

      {/* Complete Setup Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={completeOnboarding}
        >
          <Text style={styles.buttonText}>Complete Setup</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  preferencesContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#666',
    maxWidth: '80%',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});