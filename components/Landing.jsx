import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { Link, Redirect, router, Stack } from "expo-router";
import CustomButton from "./Utility/CustomButton";
import * as WebBrowser from "expo-web-browser";
import { useAuth, useClerk, useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const Landing = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View className="bg-gray-950  py-10 h-full">
      <Text className="text-white font-bold  text-3xl">
        Welcome to{" "}
        <Text className="text-yellow-300 text-2xl uil uil-estate ">
          NewsBytes
        </Text>{" "}
      </Text>
      <Text className="text-gray-400  px-5 text-center mt-10 text-lg  ">
        Make it easy for users to access the latest and most recent news quickly
        and easily from a sigle platform
      </Text>
      <CustomButton name="Login to Continue" onPress={onPress} />
    </View>
  );
};

export default Landing;
