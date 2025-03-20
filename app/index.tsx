import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import { useColorScheme } from 'react-native';
import { router } from "expo-router";
import AddButton from "./components/AddButton";

// Import our utility function (which we'll create later)
import { getOTPEntries } from "../utils/otpUtils";
import SettingsButton from "./components/SettingsButton";
import { Settings } from "lucide-react-native";

type ColorScheme = "light" | "dark";

export default function Index() {
  // Track if we have entries and loading state
  const [hasEntries, setHasEntries] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get system color scheme for styling
  const systemColorScheme = useColorScheme() as ColorScheme || "light";
  const styles = getStyles(systemColorScheme);

  // Check for entries when component mounts
  useEffect(() => {
    // Function to check if we have any entries
    const checkForEntries = async () => {
      try {
        setIsLoading(true);

        // This function doesn't exist yet - we'll implement it later
        // For now, it will always return null (empty)
        const entries = await getOTPEntries();

        // Update state based on whether entries exist
        setHasEntries(entries !== null && entries.length > 0);
      } catch (error) {
        console.error('Error checking for entries:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkForEntries();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* Main scrollable content area */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        {/* App title */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>VaultFactor</Text>
          <SettingsButton />
        </View>

        {/* Empty state message */}
        {!hasEntries && !isLoading && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>No OTP Entries</Text>
            <Text style={styles.emptyStateMessage}>
              Tap the Add button below to set up your first two-factor authentication code.
            </Text>
          </View>
        )}

        {/* Later, we'll add the entries list here when hasEntries is true */}
      </ScrollView>

      {/* Add button (fixed at bottom) */}
      <AddButton onPress={() => router.push('/add-otp')} />
    </View>
  );
}

// Function to return styles based on the current theme
const getStyles = (theme: ColorScheme) => {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'relative',
      paddingHorizontal: 16,
      paddingTop: 40,          // Increase top padding to give more room for the title
      paddingBottom: 20,       // Increase bottom padding for better balanced appearance
      height: 80,              // Set a specific height to ensure consistent centering
    },
    mainContainer: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      flex: 1,
      paddingBottom: 80, // Add padding to avoid content being hidden behind the button
    },
    scrollContent: {
      flexGrow: 1, // Allow content to expand to fill available space
    },
    appTitle: {
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 25,
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
      // Center the title vertically with these properties:
      top: 0,
      bottom: 0,
      textAlignVertical: 'center', // For Android
      // Use lineHeight to help center text vertically
      lineHeight: 90,          // Match the header height
    },

    // Add placeholder style for left side of header
    headerPlaceholder: {
      width: 44,               // Match the width of your settings button
      height: 44,              // Ensure consistent height
      // Uncomment to visualize the placeholder
      // backgroundColor: 'rgba(255,0,0,0.2)',
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
      marginTop: 40,
    },
    emptyStateTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    emptyStateMessage: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
      color: theme === 'dark' ? '#aaaaaa' : '#666666',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
  });
};