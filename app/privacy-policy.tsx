import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { type ActiveTheme, useTheme } from '../context/ThemeContext';

export default function PrivacyPolicy() {
  const { activeTheme } = useTheme();
  const styles = getStyles(activeTheme);

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft stroke={activeTheme === 'dark' ? "#ffffff" : "#000000"} width={28} height={28} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Privacy Policy</Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>OTP Vault Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: March 21, 2025</Text>

        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.paragraph}>
          This Privacy Policy explains how OTP Vault ("we", "our", or "us") collects, uses, and protects your information when you use our mobile application ("App"). We are committed to ensuring the privacy and security of your data in compliance with the General Data Protection Regulation (GDPR) and other applicable privacy laws.
        </Text>

        <Text style={styles.sectionTitle}>Data We Collect</Text>
        <Text style={styles.paragraph}>
          OTP Vault is designed with privacy in mind. All sensitive data is stored locally on your device. We collect:
        </Text>

        <Text style={styles.subSectionTitle}>Data Stored Locally (Not Transmitted to Us):</Text>
        <Text style={styles.listItem}>• Two-factor authentication tokens and secrets</Text>
        <Text style={styles.listItem}>• Account names and icons</Text>
        <Text style={styles.listItem}>• App preferences (theme settings, notification preferences)</Text>
        <Text style={styles.listItem}>• Authentication preferences (biometric authentication settings, PIN settings)</Text>

        <Text style={styles.subSectionTitle}>Data We May Access With Your Permission:</Text>
        <Text style={styles.listItem}>• Camera access (for scanning QR codes)</Text>
        <Text style={styles.listItem}>• Biometric information (via your device's authentication system, which we don't store)</Text>

        <Text style={styles.sectionTitle}>How We Use Your Data</Text>
        <Text style={styles.paragraph}>
          The data collected is used solely to:
        </Text>
        <Text style={styles.listItem}>• Provide the core functionality of generating authentication tokens</Text>
        <Text style={styles.listItem}>• Offer personalized app settings</Text>
        <Text style={styles.listItem}>• Enable secure access to your stored authentication tokens</Text>

        <Text style={styles.sectionTitle}>Data Storage and Security</Text>
        <Text style={styles.listItem}>• All sensitive data is stored exclusively on your device</Text>
        <Text style={styles.listItem}>• Authentication tokens and secrets are encrypted using industry-standard encryption</Text>
        <Text style={styles.listItem}>• We implement biometric and/or PIN security to protect access to your data</Text>
        <Text style={styles.listItem}>• We do not transmit your authentication tokens or secrets to any external servers</Text>
        <Text style={styles.listItem}>• We do not have access to your stored authentication data</Text>

        <Text style={styles.sectionTitle}>Your Rights Under GDPR</Text>
        <Text style={styles.paragraph}>
          You have the right to:
        </Text>
        <Text style={styles.listItem}>• Access the personal data we process about you</Text>
        <Text style={styles.listItem}>• Request correction of inaccurate data</Text>
        <Text style={styles.listItem}>• Request deletion of your data</Text>
        <Text style={styles.listItem}>• Object to or restrict processing of your data</Text>
        <Text style={styles.listItem}>• Data portability</Text>
        <Text style={styles.listItem}>• Withdraw consent</Text>

        <Text style={styles.paragraph}>
          Since all sensitive data is stored locally on your device, you can exercise many of these rights directly through the app's settings.
        </Text>

        <Text style={styles.sectionTitle}>Data Sharing and Third Parties</Text>
        <Text style={styles.paragraph}>
          OTP Vault does not share your authentication data with any third parties. We do not use any third-party analytics or tracking services.
        </Text>

        <Text style={styles.sectionTitle}>Data Retention</Text>
        <Text style={styles.paragraph}>
          Your data remains stored on your device until you choose to delete it through the app or uninstall the application. We recommend backing up your data using the app's export functionality for data recovery purposes.
        </Text>

        <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </Text>

        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about this Privacy Policy or our data practices, please contact us at:
        </Text>
        <Text style={styles.paragraph}>
          Email: privacy@otp-vault.com
        </Text>

        <Text style={styles.sectionTitle}>Your Consent</Text>
        <Text style={styles.paragraph}>
          By using OTP Vault, you consent to our Privacy Policy and agree to its terms.
        </Text>

        {/* Add some bottom padding for scrolling */}
        <View style={styles.bottomPadding} />
      </ScrollView>
    </View>
  );
}

// Function to return styles based on the current theme
const getStyles = (theme: ActiveTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 50,
      paddingBottom: 15,
    },
    backButton: {
      padding: 8,
      width: 44,
      alignItems: 'flex-start',
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontWeight: 'bold',
      letterSpacing: 1,
      fontSize: 20,
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
    },
    placeholder: {
      width: 44,
    },
    scrollContainer: {
      flex: 1,
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      color: theme === 'dark' ? '#ffffff' : '#000000',
      borderBottomWidth: 2,
      borderColor: '#ff00ff'
    },
    lastUpdated: {
      fontSize: 14,
      marginBottom: 20,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      color: theme === 'dark' ? '#aaaaaa' : '#666666',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 24,
      marginBottom: 12,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      color: theme === 'dark' ? '#00ffff' : '#ff00ff',
    },
    subSectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      color: theme === 'dark' ? '#dddddd' : '#333333',
    },
    listItem: {
      fontSize: 14,
      lineHeight: 20,
      marginLeft: 8,
      marginBottom: 8,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      color: theme === 'dark' ? '#dddddd' : '#333333',
    },
    bottomPadding: {
      height: 40,
    },
  });
};