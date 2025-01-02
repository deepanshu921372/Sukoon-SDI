import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { registerBackgroundService } from '../app/services/BackgroundService';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  useEffect(() => {
    // Initialize background service
    const initializeBackgroundService = async () => {
      try {
        await registerBackgroundService();
        Toast.show({
          type: 'success',
          text1: 'Background Service Active',
          text2: 'Double tap back of phone for SOS',
          position: 'top',
          visibilityTime: 4000,
        });
      } catch (error) {
        console.error('Failed to initialize background service:', error);
        Toast.show({
          type: 'error',
          text1: 'Background Service Error',
          text2: 'Failed to initialize background monitoring',
          position: 'top',
        });
      }
    };

    initializeBackgroundService();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="screens/Login/PoliceLogin" />
        <Stack.Screen name="screens/Login/CitizenLogin" />
        <Stack.Screen name="screens/Login/TipsPage" />
        <Stack.Screen name="screens/CitizenPages/SosReporting" />
        <Stack.Screen name="info" options={{ title: 'Information' }} />
        <Stack.Screen name="screens/CitizenPages/Map" />
        <Stack.Screen name="screens/PolicePages/Reporting" />
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});