import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useNavigation } from "@react-navigation/native";

const TipsPage = () => {
  const navigation = useNavigation();
  const [tips] = useState([
    "Take deep breaths when feeling anxious",
    "Practice mindfulness daily",
    "Stay hydrated and maintain a healthy diet",
    "Get regular exercise",
    "Maintain a consistent sleep schedule"
  ]);

  return (
    <ThemedView style={styles.container}>
    <ThemedView style={styles.logoContainer}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </ThemedView>

    <ThemedView style={styles.formContainer}>
      <ThemedText style={styles.title}>Daily Wellness Tips</ThemedText>
      
      {tips.map((tip, index) => (
        <ThemedView key={index} style={styles.tipContainer}>
          <ThemedText style={styles.tipText}>• {tip}</ThemedText>
        </ThemedView>
      ))}
    </ThemedView>

    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.navigate("(tabs)")}
    >
      <ThemedText style={styles.backButtonText}>Login</ThemedText>
    </TouchableOpacity>
  </ThemedView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  formContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: '#e1f832',
  },
  tipContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tipText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#534e99",
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default TipsPage;