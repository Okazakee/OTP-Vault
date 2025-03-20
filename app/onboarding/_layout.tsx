import React from 'react';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { StatusBar } from 'expo-status-bar';


export default function OnboardingLayout() {

  const { activeTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: activeTheme === 'dark' ? '#000000' : '#FFFFFF' }}>
      <StatusBar style={activeTheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            gestureEnabled: true,
          }}
        >
          <Stack.Screen name="welcome" />
          <Stack.Screen name="about" />
          <Stack.Screen name="security" />
          <Stack.Screen name="preferences" />
        </Stack>
      </View>
  );
}