import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import AuthScreen from "./assets/src/screens/AuthScreen";
import CommandeScreen from "./assets/src/screens/CommandeScreen";
import ManagerScreen from "./assets/src/screens/managercreen";
import Authresto from "./assets/src/screens/Authresto";
import Footer from "./assets/src/screens/Footer";

const Stack = createStackNavigator();

// Prevent auto hiding of the native splash screen (if applicable)
SplashScreen.preventAutoHideAsync();

const HomeScreen = () => {
  const navigation = useNavigation();
  // State to control splash image visibility
  const [showSplash, setShowSplash] = useState(true);

  // After 10 seconds, disable splash image and show the button
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // 10 seconds

    // Clear timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={require("./assets/images/background.avif")}
      style={styles.container}
    >
      <Text style={styles.title}>EatOrder</Text>
      {showSplash ? (
        // Display splash image for 10 seconds
        <Image
          source={require("./assets/images/test.png")}
          style={styles.splashImage}
          resizeMode="cover"
        />
      ) : (
        // Display active button after splash image is removed
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Authresto")}
        >
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      )}
    </ImageBackground>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Authresto" component={Authresto} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Commande" component={CommandeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    position: "absolute",
    top: 50,
    left: 20,
    fontSize: 50,
    fontWeight: "bold",
    color: "red",
  },
  button: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  splashImage: {
    // Ensure the splash image covers the entire container
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
});