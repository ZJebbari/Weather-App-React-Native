import { Alert, ImageBackground, Platform, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "./pages/Home";
import { s } from "./App.style";
import background from "./assets/background.png";
import { WeatherApi } from "./api/weather";
import { Forecasts } from "./pages/Forecasts/Forecasts";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

const Stack = createNativeStackNavigator();

const navTheme = {
  colors: {
    background: "transparent",
  },
};

export default function App() {
  const [coordinates, setCoordinates] = useState();
  const [weather, setWeather] = useState();
  const [address, setAddress] = useState();

  const [isFontLoaded] = useFonts({
    "Alata-Regular": require("./assets/fonts/Alata-Regular.ttf"),
  });

  useEffect(() => {
    subscribeToNotifications();
    // App is in background or killed and then the notification is pressed
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(
        "addNotificationResponseReceivedListener",
        response.notification.request.content.data
      );
    });
    // App is opened and notification and is received
    Notifications.addNotificationReceivedListener((notification) => {
      console.log(
        "addNotificationReceivedListener",
        notification.request.content.data
      );
    });
    getUserCoordinates();
  }, []);

  useEffect(() => {
    if (coordinates) {
      fetchWeatherByCoords(coordinates);
      fetchAddressByCoords(coordinates);
    }
  }, [coordinates]);

  async function subscribeToNotifications() {
    let token;
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Failed to get permissions");
          return;
        }
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        })
      ).data;
      console.log("Token EXPO", token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  const fetchWeatherByCoords = async (coords) => {
    const weatherResponse = await WeatherApi.fetchWeatherByCoords(coords);
    setWeather(weatherResponse);
  };

  const fetchAddressByCoords = async (coords) => {
    const addressResponse = await WeatherApi.fetchAddressByCoords(coords);
    setAddress(addressResponse);
  };

  const fetchCoordsByCity = async (city) => {
    try {
      const coordsResponse = await WeatherApi.fetchCoordsByCity(city);
      setCoordinates(coordsResponse);
    } catch (err) {
      Alert.alert("Error", err);
    }
  };

  const getUserCoordinates = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } else {
      setCoordinates({ lat: "33.5731°", lng: "7.5898°" });
    }
  };

  // console.log(coordinates);
  // console.log(weather);
  return (
    <NavigationContainer theme={navTheme}>
      <ImageBackground
        imageStyle={s.img}
        style={s.img_background}
        source={background}
      >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded && weather && (
              <Stack.Navigator
                screenOptions={{ headerShown: false, animation: "fade" }}
                initialRouteName="Home"
              >
                <Stack.Screen name="Home">
                  {() => (
                    <Home
                      weather={weather}
                      address={address}
                      onSubmitSearch={fetchCoordsByCity}
                    />
                  )}
                </Stack.Screen>

                <Stack.Screen name="Forecasts" component={Forecasts} />
              </Stack.Navigator>
            )}
          </SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>
  );
}
