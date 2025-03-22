import React from 'react';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {

  return (
      <Stack
        screenOptions={({ route }) => {
          // Create a properly typed variable with an explicit type assertion
          const params = route.params as { direction?: 'back' | 'forward' } | undefined;

          return {
            headerShown: false,
            animation: params?.direction === 'back' ? 'slide_from_left' : 'slide_from_right',
            gestureEnabled: true,
          };
        }}
      >
        <Stack.Screen name="welcome" />
        <Stack.Screen name="about" />
        <Stack.Screen name="security" />
        <Stack.Screen name="preferences" />
      </Stack>
  );
}