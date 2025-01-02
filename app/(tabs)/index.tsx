import { useState, useEffect } from 'react';
import HomeScreen from "../screens/Home";
import SplashScreen from "../screens/SplashScreen";

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? <SplashScreen /> : <HomeScreen />}
    </>
  );
}