import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Footer = () => {
  const router = useRouter();
  const [isOnDuty, setIsOnDuty] = useState(false);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPassword');
      router.push('/screens/Home');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  

  const toggleDuty = () => {
    setIsOnDuty(!isOnDuty);
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity 
        style={[styles.footerButton, { backgroundColor: isOnDuty ? '#4CAF50' : '#F44336' }]}
        onPress={toggleDuty}
      >
        <ThemedText style={styles.footerText}>
          {isOnDuty ? 'ON DUTY' : 'OFF DUTY'}
        </ThemedText>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7B1FA2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerButton: {
    padding: 10,
    borderRadius: 5,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Footer;
