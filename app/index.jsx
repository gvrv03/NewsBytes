import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Text className="text-white font-bold text-xl">
        Welcome to <Text className="text-yellow-300 text-2xl uil uil-estate ">NewsBytes</Text>{" "}
      </Text>
      <Link  className="text-white mt-20 " href="/home" >Home</Link>
    </View>
  );
}
