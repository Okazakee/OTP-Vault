import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';

export default function OnboardingWelcome() {
  const goToNextStep = () => {
    router.push('./about');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('../../assets/vault.png')}
          style={styles.image}
          onError={(e) => console.log('Image not found: vault.png')}
        />

        <Text style={styles.title}>VaultFactor</Text>

        <LinearGradient
          colors={['#ff00ff', '#00ffff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientCard}
        >
          <View style={styles.cardContent}>
            <Text style={styles.welcomeText}>
              Welcome to VaultFactor, your secure 2FA token vault
            </Text>
          </View>
        </LinearGradient>
      </View>

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
          <View style={styles.innerBorder}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>GET STARTED</Text>
              <ChevronRight color="#FFFFFF" size={24} />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000000',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    filter: 'invert(1)',
    width: 160,
    height: 160,
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 2,
  },
  gradientCard: {
    width: '100%',
    borderRadius: 8,
    padding: 2,
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
    backgroundColor: '#121212',
    borderRadius: 6,
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#FFFFFF',
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
    padding: 2,
  },
  innerBorder: {
    backgroundColor: '#121212',
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
});