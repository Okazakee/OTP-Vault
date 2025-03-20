import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ScanQRButton from './components/ScanQRButton';
import { type ActiveTheme, useTheme } from '@/context/ThemeContext';



export default function AddOTP() {
  // State for form fields
  const [secretKey, setSecretKey] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [isValid, setIsValid] = useState(false);

  const { activeTheme } = useTheme();

  const styles = getStyles(activeTheme);

  // Handle navigation back
  const handleBack = () => {
    router.back();
  };

  // Handle QR scan completion (this would be connected to your QR scanner functionality)
  const handleQRScan = () => {
    // This would normally open your barcode scanner
    // For now we'll simulate finding a code
    Alert.alert(
      "QR Scan",
      "Would you like to simulate finding a valid QR code?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Simulate Valid Code",
          onPress: () => {
            // Simulate finding a valid code
            setSecretKey('JBSWY3DPEHPK3PXP');
            setServiceName('GitHub');
            setIsValid(true);
          }
        }
      ]
    );
  };

  // Validate the input secret key
  const validateSecret = (text: string) => {
    setSecretKey(text.toUpperCase().trim());

    // Basic validation - usually OTP secrets are base32 encoded
    // This is a simple check - real validation would be more extensive
    const isValidKey = /^[A-Z2-7]+=*$/.test(text.toUpperCase().trim()) && text.length >= 16;
    setIsValid(isValidKey);
  };

  // Handle add OTP
  const handleAddOTP = () => {
    if (!isValid || !serviceName) {
      Alert.alert("Error", "Please enter a valid secret key and service name");
      return;
    }

    // Here you would actually save the OTP entry
    // For now we'll just simulate success
    Alert.alert(
      "Success",
      `OTP for ${serviceName} added successfully!`,
      [
        {
          text: "OK",
          onPress: () => router.back()
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ChevronLeft stroke={activeTheme === 'dark' ? "#ffffff" : "#000000"} width={28} height={28} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add 2FA</Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Instruction text */}
        <Text style={styles.instructionText}>
          Add a new two-factor authentication entry by scanning a QR code or manually entering the secret key.
        </Text>

        {/* QR Code Scan Button */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SCAN QR CODE</Text>
          <Text style={styles.sectionDescription}>
            Scan the QR code provided by the service when setting up 2FA
          </Text>

          <View style={styles.buttonContainer}>
            <ScanQRButton onPress={handleQRScan} />
          </View>
        </View>

        {/* Manual Entry Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MANUAL ENTRY</Text>
          <Text style={styles.sectionDescription}>
            Enter the secret key provided by the service
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Service Name</Text>
            <LinearGradient
              colors={['#ff00ff', '#00ffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.inputGradient}
            >
              <TextInput
                style={styles.textInput}
                placeholder="e.g. GitHub, Google, Dropbox"
                placeholderTextColor="#666666"
                value={serviceName}
                onChangeText={setServiceName}
              />
            </LinearGradient>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Secret Key</Text>
            <LinearGradient
              colors={['#ff00ff', '#00ffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.inputGradient}
            >
              <TextInput
                style={styles.textInput}
                placeholder="Enter your secret key"
                placeholderTextColor="#666666"
                value={secretKey}
                onChangeText={validateSecret}
                autoCapitalize="characters"
                autoCorrect={false}
                spellCheck={false}
              />
            </LinearGradient>
            <Text style={styles.helper}>
              Enter the key exactly as provided, usually a string of letters and numbers
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Button (only enabled when input is valid) */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.addButton, !isValid && styles.addButtonDisabled]}
          onPress={handleAddOTP}
          disabled={!isValid}
        >
          <LinearGradient
            colors={isValid ? ['#ff00ff', '#00ffff'] : ['#444444', '#222222']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.inputGradient}
          >
            <View style={styles.addButtonContent}>
              <Plus stroke={isValid ? "#FFFFFF" : "#888888"} width={20} height={20} />
              <Text style={[styles.addButtonText, !isValid && styles.addButtonTextDisabled]}>ADD ENTRY</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
      position: 'relative',
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
      fontSize: 25,
      color: theme === 'dark' ? '#f9f9f9' : '#333333',
    },
    placeholder: {
      width: 44,
    },
    scrollContainer: {
      flex: 1,
      padding: 16,
    },
    instructionText: {
      fontSize: 16,
      lineHeight: 24,
      color: theme === 'dark' ? '#CCCCCC' : '#666666',
      marginBottom: 24,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      textAlign: 'center',
    },
    section: {
      marginBottom: 24,
      backgroundColor: theme === 'dark' ? '#121212' : '#F8F8F8',
      borderRadius: 8,
      padding: 16,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333333' : '#E0E0E0',
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      color: theme === 'dark' ? '#00ffff' : '#007AFF',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    sectionDescription: {
      fontSize: 14,
      lineHeight: 20,
      color: theme === 'dark' ? '#AAAAAA' : '#666666',
      marginBottom: 16,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    buttonContainer: {
      alignItems: 'center',
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      marginBottom: 8,
      color: theme === 'dark' ? '#FFFFFF' : '#333333',
      fontWeight: '600',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    inputGradient: {
      borderRadius: 4,
      padding: 2, // This creates the border effect
    },
    textInput: {
      backgroundColor: theme === 'dark' ? '#121212' : '#FFFFFF',
      borderRadius: 2,
      padding: 12,
      color: theme === 'dark' ? '#FFFFFF' : '#333333',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontSize: 16,
    },
    helper: {
      fontSize: 12,
      color: theme === 'dark' ? '#888888' : '#999999',
      marginTop: 4,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    footerContainer: {
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    },
    addButton: {
      shadowColor: '#00ffff',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    addButtonDisabled: {
      shadowColor: '#000000',
      shadowOpacity: 0.1,
    },
    addButtonGradient: {
      borderRadius: 4,
      overflow: 'hidden',
    },
    addButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    addButtonText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginLeft: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    addButtonTextDisabled: {
      color: '#888888',  // A medium gray color for disabled text
    },
  });
};