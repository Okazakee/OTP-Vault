import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Moon,
  Fingerprint,
  Bell,
  Shield,
  Trash2,
  RefreshCw,
  Clock,
  EyeOff,
  Eclipse,
  Puzzle
} from 'lucide-react-native';
import { resetOnboarding } from '../utils/resetHelper';
import { useTheme } from '../context/ThemeContext';

type ColorScheme = "light" | "dark";

export default function Settings() {
  // Get theme from context
  const { activeTheme, themeMode, setThemeMode } = useTheme();

  // State for settings options
  const [biometrics, setBiometrics] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [autoLock, setAutoLock] = useState(true);
  const [codeHiding, setCodeHiding] = useState(false);
  const [autoTheme, setAutoTheme] = useState(themeMode === 'system');
  const [darkMode, setDarkMode] = useState(activeTheme === 'dark');

  // Get styles based on color scheme
  const styles = getStyles(activeTheme);

  // Handle navigation back
  const handleBack = () => {
    router.back();
  };

  // Handle changing theme settings
  const handleAutoThemeChange = async (value: boolean) => {
    setAutoTheme(value);
    await setThemeMode(value ? 'system' : darkMode ? 'dark' : 'light');
  };

  const handleDarkModeChange = async (value: boolean) => {
    if (!autoTheme) {
      setDarkMode(value);
      await setThemeMode(value ? 'dark' : 'light');
    }
  };

  // Handle reset onboarding
  const handleResetOnboarding = () => {
    Alert.alert(
      "Reset Onboarding",
      "Are you sure you want to reset the onboarding process? The app will restart.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Reset",
          onPress: () => resetOnboarding(),
          style: "destructive"
        }
      ]
    );
  };

  // Handle reset all data
  const handleResetAllData = () => {
    Alert.alert(
      "Reset All Data",
      "WARNING: This will permanently delete all your OTP codes. This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete Everything",
          onPress: () => Alert.alert("Success", "All data has been reset."),
          style: "destructive"
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

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Eclipse
                stroke={autoTheme ? "#00ffff" : "#777777"}
                width={20}
                height={20}
              />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Auto theme</Text>
              <Text style={styles.settingDescription}>
                Use system theme for the application
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
              thumbColor={autoTheme ? '#00ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleAutoThemeChange}
              value={autoTheme}
            />
          </View>

          <View style={[
            styles.settingRow,
            autoTheme && styles.disabledSettingRow
          ]}>
            <View style={styles.settingIconContainer}>
              <Moon
                stroke={darkMode && !autoTheme ? "#00ffff" : "#777777"}
                width={20}
                height={20}
              />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={[
                styles.settingTitle,
                autoTheme && styles.disabledText
              ]}>Dark Mode</Text>
              <Text style={[
                styles.settingDescription,
                autoTheme && styles.disabledText
              ]}>
                Use dark theme for the application
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
              thumbColor={darkMode && !autoTheme ? '#00ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleDarkModeChange}
              value={darkMode}
              disabled={autoTheme}
            />
          </View>

          <View style={[styles.settingRow, styles.lastRow]}>
            <View style={styles.settingIconContainer}>
              <Bell stroke={notifications ? "#00ffff" : "#777777"} width={20} height={20} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>
                Enable push notifications
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
              thumbColor={notifications ? '#00ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setNotifications(!notifications)}
              value={notifications}
            />
          </View>

        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SECURITY</Text>

          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Fingerprint stroke={biometrics ? "#00ffff" : "#777777"} width={20} height={20} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Biometric Authentication</Text>
              <Text style={styles.settingDescription}>
                Use fingerprint or face recognition to unlock
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
              thumbColor={biometrics ? '#00ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setBiometrics(!biometrics)}
              value={biometrics}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconContainer}>
              <Clock stroke={autoLock ? "#00ffff" : "#777777"} width={20} height={20} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Auto-Lock</Text>
              <Text style={styles.settingDescription}>
                Lock app after 1 minute of inactivity
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
              thumbColor={autoLock ? '#00ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setAutoLock(!autoLock)}
              value={autoLock}
            />
          </View>

          <View style={[styles.settingRow, styles.lastRow]}>
            <View style={styles.settingIconContainer}>
              <EyeOff stroke={codeHiding ? "#00ffff" : "#777777"} width={20} height={20} />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Hide Codes</Text>
              <Text style={styles.settingDescription}>
                Mask OTP codes until tapped
              </Text>
            </View>
            <Switch
              trackColor={{ false: '#3e3e3e', true: '#81b0ff' }}
              thumbColor={codeHiding ? '#00ffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() => setCodeHiding(!codeHiding)}
              value={codeHiding}
            />
          </View>
        </View>

        {/* Data Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DATA MANAGEMENT</Text>

          <View style={styles.settingRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert("Backup", "Data backup not implemented in this version.")}
            >
              <LinearGradient
                colors={['#00ffff', '#0088ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <Shield stroke="#FFFFFF" width={20} height={20} />
                  <Text style={styles.actionText}>BACKUP YOUR DATA</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={[styles.settingRow, styles.lastRow]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => Alert.alert("Import", "Data import not implemented in this version.")}
            >
              <LinearGradient
                colors={['#00ffff', '#0088ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <RefreshCw stroke="#FFFFFF" width={20} height={20} />
                  <Text style={styles.actionText}>IMPORT FROM BACKUP</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>RESET OPTIONS</Text>

          <View style={styles.settingRow}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleResetOnboarding}
            >
              <LinearGradient
                colors={['#ff9500', '#ff0000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <RefreshCw stroke="#FFFFFF" width={20} height={20} />
                  <Text style={styles.actionText}>RESET ONBOARDING</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={[styles.settingRow, styles.lastRow]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleResetAllData}
            >
              <LinearGradient
                colors={['#ff0000', '#990000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <Trash2 stroke="#FFFFFF" width={20} height={20} />
                  <Text style={styles.actionText}>DELETE ALL DATA</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* DEBUG Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>DEBUG</Text>

          <View style={[styles.settingRow, styles.lastRow]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => router.push("/components")}
            >
              <LinearGradient
                colors={['#55f550', '#fff000']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <Puzzle stroke="#000000" width={20} height={20} />
                  <Text style={styles.actionText2}>COMPONENTS SHOWCASE</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>VaultFactor v1.0.0</Text>
          <Text style={styles.appCopyright}>Made with ❤️ by Okazakee</Text>
        </View>
      </ScrollView>
    </View>
  );
}

// Function to return styles based on the current theme
const getStyles = (theme: ColorScheme) => {
  return StyleSheet.create({
    disabledSettingRow: {
      opacity: 0.5,
    },
    disabledText: {
      color: '#666666',
    },
    container: {
      flex: 1,
      backgroundColor: theme === 'dark' ? '#000000' : '#FFFFFF',
    },
    headerGradient: {
      paddingTop: Platform.OS === 'ios' ? 30 : 20,
      paddingBottom: 15,
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',  // This pushes left and right items to edges
      alignItems: 'center',
      position: 'relative',  // Important: makes this container a positioning reference
      paddingHorizontal: 16,
      paddingBottom: 10,
      paddingTop: 50,
    },
    backButton: {
      padding: 8,
      width: 44, // Fixed width to match your icon + padding
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
      width: 44, // Same width as backButton
      // Leave empty to create visual balance
    },
    scrollContainer: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 24,
      backgroundColor: theme === 'dark' ? '#121212' : '#F8F8F8',
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: theme === 'dark' ? '#333333' : '#E0E0E0',
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 16,
      color: theme === 'dark' ? '#00ffff' : '#007AFF',
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme === 'dark' ? '#333333' : '#E0E0E0',
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    settingIconContainer: {
      marginRight: 12,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme === 'dark' ? '#2A2A2A' : '#EFEFEF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingTextContainer: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme === 'dark' ? '#FFFFFF' : '#111111',
      marginBottom: 4,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    settingDescription: {
      fontSize: 13,
      color: theme === 'dark' ? '#AAAAAA' : '#555555',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    themeTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: theme === 'dark' ? '#FFFFFF' : '#111111',
      marginVertical: 16,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    actionButton: {
      marginVertical: 8,
      width: '100%',
    },
    actionGradient: {
      borderRadius: 4,
      overflow: 'hidden',
    },
    actionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    },
    actionText: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginLeft: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    actionText2: {
      color: '#000000',
      fontWeight: 'bold',
      marginLeft: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    appInfo: {
      marginVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    appVersion: {
      fontSize: 14,
      color: theme === 'dark' ? '#ffffff' : '#555555',
      marginBottom: 4,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    appCopyright: {
      fontSize: 12,
      color: theme === 'dark' ? '#999999' : '#555555',
      marginBottom: 20,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
  });
};