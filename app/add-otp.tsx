import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, Platform } from "react-native";
import AddButton from "./components/AddButton";
import { router } from "expo-router";
import TFAEntry from "./components/TFAEntry";
import ScanQRButton from "./components/ScanQRButton";
import ThemeSelector, { type ThemeOption } from "./components/ThemeSelector";

type ColorScheme = "light" | "dark";
type Preferences = {
  notifications: boolean;
  darkMode: boolean;
  dataSync: boolean;
};

export default function AddOTP() {

  return (
    <ScrollView style={getStyles('dark').container}>
      <Text style={getStyles("dark").infoTitle}>Showcase for app components</Text>
      <View style={getStyles('dark').innerContainer}>
        <Text style={getStyles("dark").infoLabel}>2fa entries</Text>
        <TFAEntry name="Github" icon="Github" onDelete={() => console.log('delete entry')} />
        <TFAEntry name="Aruba" icon="Aruba" onDelete={() => console.log('delete entry')} />
        <TFAEntry name="LinkedIn" icon="LinkedIn" onDelete={() => console.log('delete entry')} />
        <Text style={getStyles("dark").infoLabel}>scan qr btn</Text>
        <ScanQRButton onPress={() => router.push('/components')} />
        <Text style={getStyles("dark").infoLabel}>theme selector</Text>
        <ThemeSelector />
        <Text style={getStyles("dark").infoLabel}>add btn</Text>
      </View>
      <AddButton onPress={() => router.push('/components')} />
    </ScrollView>
  );
}

// Function to return styles based on the current theme
const getStyles = (theme: ColorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    },
    innerContainer: {
      paddingBottom: 100

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
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      marginTop: 20,
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
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
      textAlign: 'center',
      alignSelf: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    infoValue: {
      fontSize: 16,
      fontWeight: '500',
      color: theme === 'dark' ? '#fff' : '#333',
    },
    buttonContainer: {
      padding: 20,
      paddingBottom: 40,
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