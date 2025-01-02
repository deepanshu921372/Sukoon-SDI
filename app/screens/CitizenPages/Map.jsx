import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import Footer from './Footer';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { ThemedText } from '@/components/ThemedText';

const Map = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      // Get address details
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });

        if (reverseGeocode[0]) {
          const loc = reverseGeocode[0];
          setAddress({
            street: loc.street,
            city: loc.city,
            region: loc.region,
            country: loc.country,
            postalCode: loc.postalCode,
          });
        }
      } catch (error) {
        console.error('Error getting address:', error);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ThemedText style={styles.title}>Location Information</ThemedText>
        
        {errorMsg ? (
          <ThemedText style={styles.errorText}>{errorMsg}</ThemedText>
        ) : !location ? (
          <ThemedText style={styles.loadingText}>Loading location...</ThemedText>
        ) : (
          <>
            <View style={styles.infoSection}>
              <ThemedText style={styles.sectionTitle}>Coordinates:</ThemedText>
              <ThemedText style={styles.coordinateText}>
                Latitude: {location.coords.latitude.toFixed(6)}
              </ThemedText>
              <ThemedText style={styles.coordinateText}>
                Longitude: {location.coords.longitude.toFixed(6)}
              </ThemedText>
            </View>

            {address && (
              <View style={styles.infoSection}>
                <ThemedText style={styles.sectionTitle}>Address:</ThemedText>
                {address.street && (
                  <ThemedText style={styles.addressText}>{address.street}</ThemedText>
                )}
                <ThemedText style={styles.addressText}>
                  {[address.city, address.region, address.postalCode]
                    .filter(Boolean)
                    .join(', ')}
                </ThemedText>
                {address.country && (
                  <ThemedText style={styles.addressText}>{address.country}</ThemedText>
                )}
              </View>
            )}
          </>
        )}
      </View>
      <Footer />
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#fff',
  },
  infoSection: {
    backgroundColor: '#920000',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  coordinateText: {
    fontSize: 16,
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Map;
