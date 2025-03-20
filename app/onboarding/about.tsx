import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { router } from 'expo-router';
import { ChevronLeft, ChevronRight, ShieldCheck, Scan, Key, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OnboardingAbout() {
  const goBack = () => router.push('/onboarding/welcome');
  const goNext = () => router.push('/onboarding/security');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <ChevronLeft stroke="#ffffff" width={28} height={28} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
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
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>What is VaultFactor?</Text>
            <Text style={styles.cardText}>
              VaultFactor is a secure 2FA (Two-Factor Authentication) token generator
              that helps protect your online accounts.
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <View style={styles.featureIconContainer}>
              <ShieldCheck color="#00ffff" size={24} />
            </View>
            <Text style={styles.featureText}>Generate secure TOTP codes</Text>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconContainer}>
              <Scan color="#00ffff" size={24} />
            </View>
            <Text style={styles.featureText}>Scan QR codes from websites</Text>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconContainer}>
              <Key color="#00ffff" size={24} />
            </View>
            <Text style={styles.featureText}>Secure with biometrics or PIN</Text>
          </View>

          <View style={styles.featureRow}>
            <View style={styles.featureIconContainer}>
              <Clock color="#00ffff" size={24} />
            </View>
            <Text style={styles.featureText}>Time-synced tokens</Text>
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
          <View style={styles.innerBorder}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>CONTINUE</Text>
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
    backgroundColor: '#000000',
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
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  placeholder: {
    width: 44,
  },
  image: {
    filter: 'invert(1)',
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  gradientCard: {
    width: '100%',
    borderRadius: 8,
    padding: 2,
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
    backgroundColor: '#121212',
    borderRadius: 6,
    padding: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    letterSpacing: 1,
  },
  cardText: {
    fontSize: 16,
    color: '#FFFFFF',
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
    backgroundColor: '#121212',
    padding: 15,
    borderRadius: 6,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
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