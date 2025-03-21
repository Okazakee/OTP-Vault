import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { type ActiveTheme, useTheme } from '../../context/ThemeContext';
import { SwipeScreen } from '@/utils/swipeNav';

export default function OnboardingWelcome() {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';
  const styles = getStyles(activeTheme);

  const goToNextStep = () => {
    router.push('./about');
  };

  return (
    <SwipeScreen nextRoute="./about" previousRoute={null}>
      <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#FFFFFF' }]}>

        <ScrollView style={styles.scrollContent}>

          <View style={styles.content}>
            <Image
              source={require('../../assets/vault.png')}
              style={styles.image}
              onError={(e) => console.log('Image not found: vault.png')}
            />

            <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>VaultFactor</Text>

            <LinearGradient
              colors={['#ff00ff', '#00ffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientCard}
            >
              <View style={[styles.cardContent, { backgroundColor: isDark ? '#121212' : '#f0f0f0' }]}>
                <Text style={[styles.welcomeText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
                  Welcome to VaultFactor, your secure 2FA token vault
                </Text>
              </View>
            </LinearGradient>
          </View>

        </ScrollView>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={goToNextStep}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['#ff00ff', '#00ffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <View style={[styles.innerBorder, { backgroundColor: isDark ? '#121212' : '#f0f0f0' }]}>
              <View style={styles.buttonContent}>
                <Text style={[styles.buttonText, { color: isDark ? '#FFFFFF' : '#000000' }]}>GET STARTED</Text>
                <ChevronRight color={isDark ? '#FFFFFF' : '#000000'} size={24} />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SwipeScreen>
  );
}

const getStyles = (theme: ActiveTheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
      paddingTop: 40,
      paddingBottom: 40,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100%'
    },
    scrollContent: {
      flex: 1,
    },
    image: {
      width: 160,
      height: 160,
      marginBottom: 40,
      filter: theme === 'dark' ? 'invert(1)' : 'invert(0)',
    },
    title: {
      fontSize: 36,
      fontWeight: 'bold',
      marginBottom: 30,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      letterSpacing: 2,
    },
    gradientCard: {
      width: '100%',
      borderRadius: 8,
      padding: theme === 'dark' ? 2 : 1.5,
      marginVertical: 20,
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
    welcomeText: {
      fontSize: 18,
      textAlign: 'center',
      lineHeight: 28,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
    buttonContainer: {
      marginTop: 20,
      width: '100%',
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
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 2,
      marginRight: 10,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    },
  })
};