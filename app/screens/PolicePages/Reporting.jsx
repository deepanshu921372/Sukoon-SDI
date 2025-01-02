import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import Footer from "./Footer";
const Reporting = () => {
  const router = useRouter();
  const [reportDetails, setReportDetails] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reportDetails || !location) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: "Please fill in all fields",
        visibilityTime: 3000,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit report logic would go here
      Toast.show({
        type: "success",
        position: "top",
        text1: "Success",
        text2: "Report submitted successfully",
        visibilityTime: 3000,
      });
      setReportDetails("");
      setLocation("");
    } catch (error) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Error",
        text2: error.message || "Failed to submit report",
        visibilityTime: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
      />

      <ThemedView style={styles.formContainer}>
        <ThemedText style={styles.title}>Submit Report</ThemedText>

        <ThemedTextInput
          placeholder="Report Details"
          value={reportDetails}
          onChangeText={setReportDetails}
          multiline
          numberOfLines={4}
          style={styles.input}
        />

        <ThemedTextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <ThemedText style={styles.buttonText}>
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <ThemedText style={styles.backButtonText}>Back</ThemedText>
      </TouchableOpacity>
      <Footer />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 40,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    padding: 15,
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 16,
  },
});

export default Reporting;
