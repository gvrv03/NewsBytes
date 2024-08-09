//  New_API_key=d589bfe45c584589976fe428d0bd96bf

import React from "react";
import { Slot, Stack } from "expo-router";
import {
  ClerkLoaded,
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import { ScrollView, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Landing from "../components/Landing";
const RootLayout = () => {
  const [loading, setloading] = useState(false);
  const tokenCache = {
    async getToken(key) {
      try {
        const item = await SecureStore.getItemAsync(key);
        if (item) {
          console.log(`${key} was used 🔐 \n`);
        } else {
          console.log("No values stored under key: " + key);
        }
        return item;
      } catch (error) {
        console.error("SecureStore get item error: ", error);
        await SecureStore.deleteItemAsync(key);
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ClerkLoaded>
        <SafeAreaView className="h-full bg-gray-950 px-5 pb-5 ">
          <ScrollView contentContainerStyle={{ height: "100%" }}>
            <Slot />
          
          </ScrollView>
          <StatusBar backgroundColor="#030712" style="light" />
        </SafeAreaView>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
