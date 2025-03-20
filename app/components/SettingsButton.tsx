import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

/**
 * A settings icon button that navigates to the settings screen
 * The icon changes to a gradient color when touched
 */
const SettingsButton = () => {
  // Track whether the button is being pressed
  const [isPressed, setIsPressed] = useState(false);

    const { activeTheme, themeMode, setThemeMode } = useTheme();

  // Navigate to settings screen when pressed
  const handlePress = () => {
    router.push('/settings');
  };

  // SVG path for gear icon (similar to Lucide Settings icon)
  const gearPath = "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z";

  return (
    <TouchableOpacity
      style={styles.iconButton}
      onPress={handlePress}
      activeOpacity={0.7}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={isPressed ? "url(#gradient)" : activeTheme === 'light' ? '#000000' : '#FFFFFF'} strokeWidth={2} strokeLinecap="square" strokeLinejoin="miter">
        {isPressed && (
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#ff00ff" />
              <Stop offset="100%" stopColor="#00ffff" />
            </LinearGradient>
          </Defs>
        )}
        <Path d={gearPath} />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 8,
    marginLeft: 'auto',
    justifyContent: 'center', // Add vertical centering
    alignItems: 'center',     // Add horizontal centering
    alignSelf: 'center',      // Center the button itself in its parent
  }
});

export default SettingsButton;