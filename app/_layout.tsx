import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <>
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
    </>
  );
}