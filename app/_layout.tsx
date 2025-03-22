import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// RootLayoutNav wraps our navigation with theme controls
function RootLayoutNav() {
  const { activeTheme } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: activeTheme === 'dark' ? '#000000' : '#FFFFFF' }}>
      <StatusBar style='auto' />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: activeTheme === 'dark' ? '#000000' : '#FFFFFF'
          }
        }}
      />
      <Toast />
    </View>
  );
}

// Root layout wraps everything with our providers
export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <ThemeProvider>
            <RootLayoutNav />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}