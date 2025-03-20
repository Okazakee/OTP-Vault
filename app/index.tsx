import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../context/AuthContext";
import { resetOnboarding } from "@/utils/resetHelper";
import AddButton from "./components/AddButton";
import { router } from "expo-router";
import TFAEntry from "./components/TFAEntry";

type ColorScheme = "light" | "dark";
type Preferences = {
  notifications: boolean;
  darkMode: boolean;
  dataSync: boolean;
};

export default function Index() {
  // Get system color scheme
  const systemColorScheme = useColorScheme() as ColorScheme;

  // State for user preferences and authentication method
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [authMethod, setAuthMethod] = useState<string>('None');

  // Determine which color scheme to use based on user preference
  const colorScheme = preferences?.darkMode ? "dark" : systemColorScheme;
  const styles = getStyles(colorScheme);

  useEffect(() => {
    // Load user preferences and authentication settings
    const loadUserSettings = async () => {
      try {
        // Load preferences
        const prefsString = await AsyncStorage.getItem('userPreferences');
        if (prefsString) {
          setPreferences(JSON.parse(prefsString));
        } else {
          // Set default preferences if none exist
          setPreferences({
            notifications: true,
            darkMode: false,
            dataSync: true
          });
        }

        // Determine authentication method
        const biometricsEnabled = await AsyncStorage.getItem('biometricsEnabled');
        const pinEnabled = await AsyncStorage.getItem('userPIN');

        if (biometricsEnabled === 'true') {
          setAuthMethod('Biometrics');
        } else if (pinEnabled) {
          setAuthMethod('PIN');
        } else {
          setAuthMethod('None');
        }
      } catch (error) {
        console.error('Error loading user settings:', error);
      }
    };

    loadUserSettings();
  }, []);

  // For demonstration purposes - allows resetting onboarding
  const handleResetOnboarding = () => {
    resetOnboarding();
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.infoTitle}>VaultFactor</Text>
      </ScrollView>

      <AddButton onPress={() => router.push('/components')} />
    </View>
  );

}

// Function to return styles based on the current theme
const getStyles = (theme: ColorScheme) => {
  return StyleSheet.create({
    mainContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#000000', // Or whatever your background color is
    },
    scrollContainer: {
      flex: 1,
      paddingBottom: 80, // Add padding to avoid content being hidden behind the button
    },
    header: {
      padding: 20,
      paddingTop: 60,
      backgroundColor: theme === 'dark' ? '#1E1E1E' : '#f8f8f8',
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#333' : '#e0e0e0',
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme === 'dark' ? '#aaa' : '#666',
    },
    infoCard: {
      margin: 20,
      padding: 20,
      backgroundColor: theme === 'dark' ? '#2a2a2a' : '#ffffff',
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    infoTitle: {
      fontFamily: 'monospace',
      fontWeight: 'bold',
      letterSpacing: 1,
      alignSelf: 'center',
      fontSize: 25,
      marginBottom: 20,
      marginTop: 10,
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#444' : '#f0f0f0',
    },
    infoLabel: {
      fontSize: 16,
      color: theme === 'dark' ? '#ccc' : '#555',
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '500',
      color: theme === 'dark' ? '#fff' : '#333',
    },
    buttonContainer: {
      padding: 20,
      paddingBottom: 0,
    },
    resetButton: {
      backgroundColor: '#ff3b30',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
    },
    resetButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    }
  });
};