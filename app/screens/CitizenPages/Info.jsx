import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import Footer from './Footer';

const Info = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Info Page Content</ThemedText>
      <Footer />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60, // Add padding to account for footer height
  },
});

export default Info;
