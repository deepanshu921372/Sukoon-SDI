import * as TaskManager from 'expo-task-manager';
import { Accelerometer } from 'expo-sensors';
import * as BackgroundFetch from 'expo-background-fetch';
import { Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';

const BACKGROUND_TASK_NAME = 'BACKGROUND_SOS_DETECTION';
const DOUBLE_TAP_THRESHOLD = 800; // ms between taps
const ACCELERATION_THRESHOLD = 2.0; // Adjust sensitivity as needed
const SOS_DURATION = 9000; // 9 seconds

let lastTapTimestamp = 0;
let isSOSActive = false;

// Define the background task
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    // Start listening to accelerometer
    Accelerometer.setUpdateInterval(100);
    
    Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      
      const now = Date.now();
      if (acceleration > ACCELERATION_THRESHOLD) {
        if (now - lastTapTimestamp < DOUBLE_TAP_THRESHOLD) {
          // Double tap detected
          if (!isSOSActive) {
            activateSOS();
          }
        }
        lastTapTimestamp = now;
      }
    });

    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error('Background task error:', error);
    return BackgroundFetch.Result.Failed;
  }
});

const activateSOS = async () => {
  isSOSActive = true;
  
  try {
    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    
    // Vibration pattern
    const PATTERN = [1000, 500, 1000, 500, 1000];
    Vibration.vibrate(PATTERN, true);
    
    // Show toast notification
    Toast.show({
      type: 'error',
      text1: 'SOS Activated',
      text2: 'Emergency services will be notified',
      position: 'top',
      visibilityTime: 3000,
    });

    // Save SOS event
    const sosData = {
      timestamp: new Date().toISOString(),
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      status: 'Active',
    };

    // Store in AsyncStorage
    const existingSOSList = await AsyncStorage.getItem('sosHistory');
    const sosList = existingSOSList ? JSON.parse(existingSOSList) : [];
    sosList.unshift(sosData);
    await AsyncStorage.setItem('sosHistory', JSON.stringify(sosList));

    // Deactivate after SOS_DURATION
    setTimeout(() => {
      Vibration.cancel();
      isSOSActive = false;
      Toast.show({
        type: 'info',
        text1: 'SOS Deactivated',
        position: 'top',
        visibilityTime: 2000,
      });
    }, SOS_DURATION);

  } catch (error) {
    console.error('SOS activation error:', error);
    isSOSActive = false;
  }
};

export const registerBackgroundService = async () => {
  try {
    // Request permissions
    const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
    if (locationStatus !== 'granted') {
      throw new Error('Location permission denied');
    }

    // Register background task
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 1, // 1 second
      stopOnTerminate: false,
      startOnBoot: true,
    });

    console.log('Background service registered successfully');
  } catch (error) {
    console.error('Failed to register background service:', error);
    throw error;
  }
};