import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
} from "react-native";
import React from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  return (
    <SafeAreaView className="bg-gray-950">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" flex gap-5  rounded-md ">
          <View className="flex flex-row items-center  justify-start" >
            <View>
              <Image src={user?.imageUrl} className="w-16 rounded-full h-16" />
            </View>
            <View className="ml-4" >
              <Text className="text-white font-bold text-3xl">Welcome!</Text>
              <Text className="text-gray-300 font-semibold text-xl">
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
          </View>
         
          <TouchableOpacity
            className="  bg-yellow-300 py-2 romd "
            onPress={() => {
              signOut();
              router.push("/");
            }}
          >
            <Text className="text-black font-bold text-xl text-center">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#030712" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
