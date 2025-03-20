import React from 'react';
import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="page1" options={{ headerShown: false }} />
      {/* Add more onboarding screens as needed */}
    </Stack>
  );
}