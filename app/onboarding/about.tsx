import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, ShieldCheck, Scan, Key, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { type ActiveTheme, useTheme } from '../../context/ThemeContext';

export default function OnboardingAbout() {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';
  const styles = getStyles(activeTheme);

  const goBack = () => router.push('/onboarding/welcome');
  const goNext = () => router.push('/onboarding/security');

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <ChevronLeft stroke={isDark ? "#ffffff" : "#000000"} width={28} height={28} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>About</Text>
          <View style={styles.placeholder} />
        </View>

        <Image
          source={require('@/assets/vault.png')}
          style={styles.image}
          onError={(e) => console.log('Image not found: vault.png')}
        />

        <LinearGradient
          colors={['#ff00ff', '#00ffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <View style={[styles.cardContent, { backgroundColor: isDark ? '#121212' : '#eeeeee' }]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#000000' }]}>What is VaultFactor?</Text>
            <Text style={[styles.cardText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
              VaultFactor is a secure 2FA (Two-Factor Authentication) token generator
              that helps protect your online accounts.
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.featuresContainer}>
          <View style={[styles.featureRow, { backgroundColor: isDark ? '#121212' : '#eeeeee' }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: isDark ? '#1E1E1E' : '#d8d8d8' }]}>
              <ShieldCheck color="#ff00ff" size={24} />
            </View>
            <Text style={[styles.featureText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Generate secure TOTP codes</Text>
          </View>

          <View style={[styles.featureRow, { backgroundColor: isDark ? '#121212' : '#eeeeee' }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: isDark ? '#1E1E1E' : '#d8d8d8' }]}>
              <Scan color="#ff00ff" size={24} />
            </View>
            <Text style={[styles.featureText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Scan QR codes from websites</Text>
          </View>

          <View style={[styles.featureRow, { backgroundColor: isDark ? '#121212' : '#eeeeee' }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: isDark ? '#1E1E1E' : '#d8d8d8' }]}>
              <Key color="#ff00ff" size={24} />
            </View>
            <Text style={[styles.featureText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Secure with biometrics or PIN</Text>
          </View>

          <View style={[styles.featureRow, { backgroundColor: isDark ? '#121212' : '#eeeeee' }]}>
            <View style={[styles.featureIconContainer, { backgroundColor: isDark ? '#1E1E1E' : '#d8d8d8' }]}>
              <Clock color="#ff00ff" size={24} />
            </View>
            <Text style={[styles.featureText, { color: isDark ? '#FFFFFF' : '#000000' }]}>Time-synced tokens</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={goNext}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={['#ff00ff', '#00ffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={[styles.innerBorder, { backgroundColor: isDark ? '#121212' : '#eeeeee' }]}>
            <View style={styles.buttonContent}>
              <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>CONTINUE</Text>
              <ChevronRight color={isDark ? '#FFFFFF' : '#000000'} size={24} />
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
      paddingBottom: 40,
    },
    content: {
      flex: 1,
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
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
    image: {
      width: 80,
      height: 80,
      marginBottom: 30,
      filter: theme === 'dark' ? 'invert(1)' : 'invert(0)',
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
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 15,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      letterSpacing: 1,
    },
    cardText: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    featuresContainer: {
      width: '100%',
      marginTop: 10,
    },
    featureRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      padding: 15,
      borderRadius: 6,
    },
    featureIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 15,
    },
    featureText: {
      fontSize: 16,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      flex: 1,
    },
    buttonContainer: {
      width: '100%',
      marginTop: 20,
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