import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Eclipse, Sun, Moon } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export type ThemeOption = 'auto' | 'light' | 'dark';

interface ThemeSelectorProps {
  initialTheme?: ThemeOption;
  onThemeChange?: (theme: ThemeOption) => void;
}

const ThemeSelector = ({ initialTheme = 'auto', onThemeChange }: ThemeSelectorProps) => {
  // Define theme options
  const themeOptions: ThemeOption[] = ['auto', 'light', 'dark'];
  const [currentTheme, setCurrentTheme] = useState<ThemeOption>(initialTheme);

  // Get appropriate icon for each theme
  const getThemeIcon = (theme: ThemeOption) => {
    switch (theme) {
      case 'auto':
        return <Eclipse stroke="#ffffff" width={24} height={24} strokeWidth={2} />;
      case 'light':
        return <Sun stroke="#ffffff" width={24} height={24} strokeWidth={2} />;
      case 'dark':
        return <Moon stroke="#ffffff" width={24} height={24} strokeWidth={2} />;
    }
  };

  // Get display name for each theme
  const getThemeName = (theme: ThemeOption) => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  // Handle theme selection
  const handleThemeSelect = (theme: ThemeOption) => {
    setCurrentTheme(theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  };

  return (
    <View style={styles.wrapper}>

      {/* Options container with subtle border */}
      <View style={styles.optionsContainer}>
        {themeOptions.map((theme) => (
          <TouchableOpacity
            key={theme}
            style={[
              styles.buttonContainer,
              currentTheme === theme && styles.selectedButton
            ]}
            onPress={() => handleThemeSelect(theme)}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={currentTheme === theme ? ['#ff00ff', '#00ffff'] : ['#333333', '#444444']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <View style={styles.innerBorder}>
                <View style={styles.content}>
                  {getThemeIcon(theme)}
                  <Text style={styles.buttonText}>{getThemeName(theme)}</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '95%',
    marginVertical: 20,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  headerGradient: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: 2,
  },
  headerInner: {
    backgroundColor: '#121212',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  headerText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 3,
    textAlign: 'center',
  },
  optionsContainer: {
    backgroundColor: '#101010',
    borderWidth: 2,
    borderTopWidth: 2,
    borderColor: '#333333',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  container: {
    width: '100%',
    marginVertical: 10,
  },
  buttonContainer: {
    display: 'flex',
    marginVertical: 10,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#444444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedButton: {
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
    padding: 2, // Border thickness
  },
  innerBorder: {
    backgroundColor: '#121212',
    borderRadius: 2,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure content takes full width
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
});

export default ThemeSelector;