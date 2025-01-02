import React from 'react';
import { StyleSheet, TouchableOpacity, View, Vibration } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
      router.push('/screens/Home');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleSOS = () => {
    const PATTERN = [1000, 500];
    Vibration.vibrate(PATTERN, true);

    Toast.show({
      type: 'error',
      text1: 'SOS Activated',
      position: 'top',
      backgroundColor: 'red',
    });

    setTimeout(() => {
      Vibration.cancel();
    }, 10000);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => router.push('/screens/Login/TipsPage')}
      >
        <ThemedText style={styles.footerText}>TIPS</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.footerButton}
        onPress={() => router.push('/screens/CitizenPages/Map')}
      >
        <ThemedText style={styles.footerText}>MAP</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.footerButton}
        onPress={handleLogout}
      >
        <ThemedText style={styles.footerText}>Log Out</ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#7B1FA2',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    padding: 10,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Footer;
