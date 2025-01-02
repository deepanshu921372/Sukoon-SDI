import React from 'react';
import { router } from 'expo-router';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>SUKOON - WOMEN SAFETY</ThemedText>
      </ThemedView>
      
      <ThemedView style={styles.logoContainer}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
        />
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.policeButton]}
          onPress={() => router.push('/screens/Login/PoliceLogin')}
        >
          <ThemedText style={styles.buttonText}>Police/Law Enforcement Login</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.citizenButton]}
          onPress={() => router.push('/screens/Login/CitizenLogin')}  
        >
          <ThemedText style={styles.buttonText}>Citizen Login</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.anonymousButton]}
          onPress={() => router.push('/screens/Login/TipsPage')}  
        >
          <ThemedText style={styles.buttonText}>Anonymous Tip</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 16,
    marginTop: 20, 
    paddingHorizontal: 10, 
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  logo: {
    width: 250,  
    height: 250, 
    borderRadius: 20,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '85%',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    color: 'white',
  },
  policeButton: {
    backgroundColor: '#3699c4', 
    borderRadius: 20,
  },
  citizenButton: {
    backgroundColor: '#7B1FA2', 
    borderRadius: 20,
  },
  anonymousButton: {
    backgroundColor: '#534e99', 
    borderRadius: 20,
  },
  buttonText: {
    color: props => props.style?.backgroundColor === '#C5CAE9' ? '#2C1B6A' : '#FFFFFF',
    fontSize: 20, 
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'white',
  },
});

export default Home;