import type React from 'react';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { type RelativePathString, router } from 'expo-router';

export function SwipeScreen({
  children,
  nextRoute,
  previousRoute
}: { children: React.ReactNode, nextRoute: RelativePathString | null, previousRoute: RelativePathString | null }) {
  const swipeGesture = Gesture.Pan()
    .runOnJS(true)
    .onEnd((event) => {
      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        if (event.translationX > 100 && previousRoute) {
          router.push(previousRoute);
        } else if (event.translationX < -100 && nextRoute) {
          router.push(nextRoute);
        }
      }
    });

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </GestureDetector>
  );
}