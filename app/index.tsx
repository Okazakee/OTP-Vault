import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import { router } from "expo-router";
import AddButton from "./components/AddButton";
import TFAEntry from "./components/TFAEntry";

// Import our utility functions
import { getOTPEntries, type OTPEntry, deleteOTPEntry } from "../utils/otpUtils";
import SettingsButton from "./components/SettingsButton";
import { type ActiveTheme, useTheme } from "../context/ThemeContext";

export default function Index() {
  // Track entries and loading state
  const [entries, setEntries] = useState<OTPEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get theme for styling
  const { activeTheme } = useTheme();
  const styles = getStyles(activeTheme);

  // Handle deleting an entry
  const handleDelete = async (id: string) => {
    try {
      await deleteOTPEntry(id);
      // Refresh entries after deletion
      loadEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  // Load entries from storage
  const loadEntries = async () => {
    try {
      setIsLoading(true);
      const loadedEntries = await getOTPEntries();
      setEntries(loadedEntries || []);
    } catch (error) {
      console.error('Error loading entries:', error);
      setEntries([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load entries when component mounts
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    loadEntries();
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
          <View style={styles.placeholder} />
          <Text style={styles.appTitle}>OTP-Vault</Text>
          <SettingsButton />
        </View>

        {/* Empty state message */}
        {entries.length === 0 && !isLoading && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateTitle}>No OTP Entries</Text>
            <Text style={styles.emptyStateMessage}>
              Tap the Add button below to set up your first two-factor authentication code.
            </Text>
          </View>
        )}

        {/* Display the entries */}
        {entries.length > 0 && !isLoading && (
          <View style={styles.entriesContainer}>
            {entries.map((entry) => (
              <TFAEntry
                key={entry.id}
                name={entry.name}
                icon={entry.icon}
                onDelete={() => handleDelete(entry.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add button (fixed at bottom) */}
      <AddButton onPress={() => router.push('/add-otp')} />
    </View>
  );
}

// Function to return styles based on the current theme
const getStyles = (theme: ActiveTheme) => {
  return StyleSheet.create({
    entriesContainer: {
      paddingTop: 0,
      paddingBottom: 100, // Space for the add button
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',  // This pushes left and right items to edges
      alignItems: 'center',
      position: 'relative',  // Important: makes this container a positioning reference
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 10
    },
    mainContainer: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    },
    scrollContainer: {
      flex: 1,
      paddingTop: 0,
      paddingBottom: 80, // Add padding to avoid content being hidden behind the button
    },
    scrollContent: {
      flexGrow: 1, // Allow content to expand to fill available space
    },
    appTitle: {
      flex: 1,
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 25,
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
    },
    placeholder: {
      width: 44, // Same width as settings button
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