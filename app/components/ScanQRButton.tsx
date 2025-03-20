import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { QrCode } from 'lucide-react-native';

const ScanQRButton = ({ onPress }: {onPress: () => void}) => {
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={['#ff00ff', '#00ffff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.innerBorder}>
          <View style={styles.content}>
            <QrCode color={'#FFFFFF'} size={24} strokeWidth={2} />
            <Text style={styles.buttonText}>Scan QR</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    display: 'flex',
    marginVertical: 20,
    alignSelf: 'center',
    width: '95%', // This will extend the width to 80% of parent container
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
    // Once you've loaded the custom font: fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', // Fallback
    // fontFamily: 'PixelFont', // Use this line after setting up custom fonts
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    fontFamily: 'monospace',
  },
});

export default ScanQRButton;