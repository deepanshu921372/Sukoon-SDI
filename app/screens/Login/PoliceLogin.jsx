import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const PoliceLogin = () => {
  const router = useRouter();
  const [batchNumber, setBatchNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!batchNumber || !password) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Please fill both batch number and password',
        visibilityTime: 3000,
      });
      return;
    }

    setIsLoading(true);
    try {
      if (batchNumber === 'TEST' && password === '1234') {
        router.replace('/screens/PolicePages/Reporting');
      } else {
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'Invalid credentials',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message || 'Failed to login',
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={require('../../../assets/images/logo.png')} 
        style={styles.logo}
      />

      <ThemedView style={styles.formContainer}>
        <ThemedText style={styles.title}>Police Login</ThemedText>
        <ThemedTextInput
          placeholder="Batch Number"
          value={batchNumber}
          onChangeText={setBatchNumber}
          style={styles.input}
        />
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Login'}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ThemedText style={styles.backButtonText}>Back</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#3699c4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#3699c4',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButtonDisabled: {
    backgroundColor: '#9e9e9e',
    opacity: 0.7,
  },
});

export default PoliceLogin;