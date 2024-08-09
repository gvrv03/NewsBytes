import { Image, View, Text } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@clerk/clerk-expo";
const TabIcon = ({ icon, name, color, focused }) => {
  return (
    <View className="flex gap-1 justify-center  items-center">
      <Image
        src={icon}
        tintColor={color}
        resizeMode="contain"
        className="  w-5 h-5"
      />
      <Text
        style={{ color: color }}
        className={`${
          focused ? " font-semibold " : "text-white"
        }  text-[10px] `}
      >
        {name}
      </Text>
    </View>
  );
};
const TabLayout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={"/"} />;
  }
  return (
    <>
      <Tabs
        className="bg-gray-950"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#fde047",
          tabBarStyle: {
            backgroundColor: "#111827",
            borderTopColor: "#111827",
            paddingTop: 20,
            paddingBottom: 20,
            marginTop: 10,
            borderRadius: 5,
            height: 60,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="https://cdn-icons-png.flaticon.com/128/15889/15889429.png"
                name="Home"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "explore",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="https://cdn-icons-png.flaticon.com/128/10847/10847883.png"
                name="Explore"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon="https://cdn-icons-png.flaticon.com/128/17436/17436250.png"
                name="Profile"
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#030712" style="light" />
    </>
  );
};

export default TabLayout;
