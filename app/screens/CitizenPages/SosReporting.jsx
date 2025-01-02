import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Footer from "./Footer";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createMaterialTopTabNavigator();

const RecentSOSTab = ({ resetTrigger }) => {
  const [recentSOSList, setRecentSOSList] = useState([]);

  useEffect(() => {
    loadRecentSOS().then((list) => setRecentSOSList(list));
  }, [resetTrigger]);

  const loadRecentSOS = async () => {
    try {
      const savedSOSList = await AsyncStorage.getItem("recentSOSList");
      if (savedSOSList) {
        return JSON.parse(savedSOSList);
      }
      return [];
    } catch (error) {
      console.error("Error loading recent SOS:", error);
      return [];
    }
  };

  const handleReload = () => {
    loadRecentSOS();
  };

  const handleReset = async () => {
    try {
      await AsyncStorage.removeItem("recentSOSList");
      setRecentSOSList([]);
    } catch (error) {
      console.error("Error resetting SOS list:", error);
    }
  };

  return (
    <View style={styles.container}>
      {recentSOSList.length === 0 ? (
        <ThemedText style={styles.noSOS}>No recent SOS calls</ThemedText>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {recentSOSList.map((sos, index) => (
            <TouchableOpacity key={sos.time} style={styles.recentSOSContainer}>
              <View style={styles.sosDetails}>
                <ThemedText style={styles.sosStatus}>{sos.status}</ThemedText>
                <ThemedText style={styles.sosTime}>
                  {new Date(sos.time).toLocaleTimeString()}
                </ThemedText>
              </View>
              <ThemedText style={styles.sosLocation}>{sos.location}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const SosReporting = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [location, setLocation] = useState("Fetching location...");

  const loadRecentSOS = async () => {
    try {
      const savedSOSList = await AsyncStorage.getItem("recentSOSList");
      if (savedSOSList) {
        return JSON.parse(savedSOSList);
      }
      return [];
    } catch (error) {
      console.error("Error loading recent SOS:", error);
      return [];
    }
  };

  const handleReset = async () => {
    try {
      await AsyncStorage.removeItem("recentSOSList");
      setResetTrigger((prev) => !prev);
      Toast.show({
        type: "success",
        text1: "All SOS records cleared",
        position: "top",
      });
    } catch (error) {
      console.error("Error resetting SOS list:", error);
      Toast.show({
        type: "error",
        text1: "Failed to clear SOS records",
        position: "top",
      });
    }
  };

  const [resetTrigger, setResetTrigger] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Location permission denied");
        return;
      }

      const locationSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          try {
            const reverseGeocode = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });

            if (reverseGeocode[0]) {
              const address = reverseGeocode[0];
              const locationName = `${address.name || ""} ${
                address.street || ""
              }, ${address.district || ""}, ${address.city || ""}, ${
                address.region || ""
              }, ${address.country || ""}, ${address.postalCode || ""}`
                .replace(/\s+/g, " ")
                .trim();
              setLocation(
                `${locationName}\n(${latitude.toFixed(4)}, ${longitude.toFixed(
                  4
                )})`
              );
            }
          } catch (error) {
            setLocation(
              `Unable to get location name\n(${latitude.toFixed(
                4
              )}, ${longitude.toFixed(4)})`
            );
          }
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.then((sub) => sub.remove());
        }
      };
    };

    getLocation();
    return () => {
      clearInterval(timer);
    };
  }, []);

  const saveSOSToStorage = async () => {
    try {
      const existingSOSList = await AsyncStorage.getItem("recentSOSList");
      let sosList = existingSOSList ? JSON.parse(existingSOSList) : [];

      const sosData = {
        time: new Date().toISOString(),
        location: location,
        status: "Active",
      };
      sosList.unshift(sosData);

      await AsyncStorage.setItem("recentSOSList", JSON.stringify(sosList));
    } catch (error) {
      console.error("Error saving SOS:", error);
    }
  };

  return (
    <ThemedView style={[styles.container, { height: "auto" }]}>
      <ThemedText style={styles.title}>SOS Reporting</ThemedText>

      <ThemedView style={styles.sosButtonContainer}>
        <ThemedText style={styles.timeText}>{time}</ThemedText>
        <ThemedText style={styles.locationText}>{location}</ThemedText>
        <TouchableOpacity
          style={styles.sosButton}
          onPress={() => {
            const PATTERN = [1000, 500];
            Vibration.vibrate(PATTERN, true);
            Toast.show({
              type: "error",
              text1: "SOS Activated",
              position: "top",
              backgroundColor: "red",
            });
            saveSOSToStorage();
            setTimeout(() => {
              Vibration.cancel();
            }, 9000);
          }}
        >
          <ThemedText style={styles.sosButtonText}>SOS</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={async () => {
            const list = await loadRecentSOS();
            setResetTrigger((prev) => !prev);
          }}
          style={styles.headerButton}
        >
          <ThemedText style={styles.headerButtonText}>Reload</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.headerTitle}>Recent SOS</ThemedText>

        <TouchableOpacity onPress={handleReset} style={styles.headerButton}>
          <ThemedText style={styles.headerButtonText}>Reset All</ThemedText>
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        key={resetTrigger}
        screenOptions={{
          tabBarStyle: { display: "none" },
        }}
        style={{ height: "auto", marginBottom: 80 }}
      >
        <Tab.Screen name="Recent" component={RecentSOSTab} />
      </Tab.Navigator>

      <Footer />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
  sosItem: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sosText: {
    fontSize: 18,
    fontWeight: "500",
  },
  sosNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
  },
  sosButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },
  sosButton: {
    backgroundColor: "#FF0000",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sosButtonText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  timeText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
  },
  locationText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  recentSOSContainer: {
    backgroundColor: "#f59b9b",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffcdd2",
    height: "auto",
  },
  sosDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sosStatus: {
    color: "#d32f2f",
    fontWeight: "bold",
  },
  sosTime: {
    color: "#000000",
    fontWeight: "bold",
  },
  sosLocation: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  noSOS: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 1000,
    elevation: 1000,
    backgroundColor: "#f59b9b",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    color: "#fff",
  },
  headerButton: {
    padding: 8,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    minWidth: 80,
    zIndex: 1000,
    elevation: 1000,
  },
  headerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SosReporting;
