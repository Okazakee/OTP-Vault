import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Clipboard,
  Animated,
  Easing
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Copy } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Toast from 'react-native-toast-message';

const TFAEntry = ({
  name,
  icon,
  onDelete
}: {name: string; icon: string; onDelete: () => void;}) => {
  const [code, setCode] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(30);

  // Create an animated value for smooth transitions
  const animatedTimeValue = useRef(new Animated.Value(30)).current;

  // Start timer animation
  const startTimerAnimation = () => {
    // Reset to full value first
    animatedTimeValue.setValue(30);

    // Animate from 30 to 0 over 30 seconds
    Animated.timing(animatedTimeValue, {
      toValue: 0,
      duration: 30000, // 30 seconds
      easing: Easing.linear,
      useNativeDriver: false // Must be false for layout properties like width
    }).start();
  };

  // Generate random 6-digit code
  const generateCode = () => {
    const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
    setCode(randomCode);
    setTimeRemaining(30); // Reset timer

    // Start the smooth animation
    startTimerAnimation();
  };

  // Generate code initially and set up timers
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    generateCode(); // Initial code generation and animation start

    // Regenerate code every 30 seconds
    const interval = setInterval(() => {
      generateCode();
    }, 30000);

    // Update timeRemaining state every second (for any logic that needs it)
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  // Format code with a space in the middle for better readability
  const formattedCode = `${code.substring(0, 3)} ${code.substring(3)}`;

  // Handle copy to clipboard
  const handlePress = async () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    await Clipboard.setString(code);
    Toast.show({
      type: 'success',
      text1: 'Code Copied',
      text2: 'The code has been copied to your clipboard',
      visibilityTime: 2000,
    });
  };

  // Handle long press (delete)
  const handleLongPress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }

    Alert.alert(
      "Delete Entry",
      `Are you sure you want to delete the ${name} entry?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => onDelete?.(),
          style: "destructive"
        }
      ]
    );
  };

  // Animate width with interpolation
  const widthInterpolation = animatedTimeValue.interpolate({
    inputRange: [0, 30],
    outputRange: ['0%', '100%'],
  });

  // Animate color with interpolation
  const colorInterpolation = animatedTimeValue.interpolate({
    inputRange: [0, 15, 30],  // 0 seconds, 15 seconds, 30 seconds
    outputRange: ['rgb(255,0,0)', 'rgb(255,165,0)', 'rgb(0,255,0)']  // red, orange, green
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      onLongPress={handleLongPress}
      delayLongPress={800}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#ff00ff', '#00ffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.innerContainer}>
          {/* Icon placeholder - replace with actual icon library */}
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{icon.charAt(0)}</Text>
          </View>

          <View style={styles.codeContainer}>
            <Text style={styles.serviceName}>{name}</Text>
            <Text style={styles.codeText}>{formattedCode}</Text>
          </View>

          <View style={styles.copyIcon}>
            <Copy stroke="#ffffff" width={16} height={16} />
          </View>
        </View>

        {/* Animated Progress bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: widthInterpolation,
                backgroundColor: colorInterpolation
              }
            ]}
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#ff00ff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    borderRadius: 4,
    padding: 2, // Border thickness
    overflow: 'hidden',
  },
  innerContainer: {
    backgroundColor: '#121212',
    borderRadius: 2,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: '#2a2a2a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconText: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  codeContainer: {
    flex: 1,
  },
  serviceName: {
    color: '#aaaaaa',
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 4,
  },
  codeText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  copyIcon: {
    marginLeft: 8,
    opacity: 0.7,
  },
  progressBarContainer: {
    height: 3,
    width: '100%',
    backgroundColor: '#242424',
  },
  progressBar: {
    height: '100%',
  },
});

export default TFAEntry;