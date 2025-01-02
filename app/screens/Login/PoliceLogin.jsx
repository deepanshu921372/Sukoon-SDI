import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { useNavigation } from '@react-navigation/native';

const PoliceLogin = () => {
  const navigation = useNavigation();
  const [batchNumber, setBatchNumber] = useState('');
  const [password, setPassword] = useState('');

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
        <TouchableOpacity style={styles.loginButton}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('(tabs)')}
      >
        <ThemedText style={styles.backButtonText}>Back to Home</ThemedText>
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
});

export default PoliceLogin;