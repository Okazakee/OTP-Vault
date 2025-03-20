import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function OnboardingPage1() {
  const goToNextStep = () => {
    // Instead of completing onboarding, go to the next step
    router.push('/onboarding/preferences');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require('@/assets/vault.png')} // Make sure vault.png exists
          style={styles.image}
          // Add a fallback for missing image during development
          onError={(e) => console.log('Image not found: vault.png')}
        />
        <Text style={styles.title}>Welcome to the App!</Text>
        <Text style={styles.subtitle}>
          Before you start, we need to set up a few things to enhance your experience and keep your data secure.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={goToNextStep}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 30,
    // This will prevent the app from crashing if the image is missing
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});