import { Image, View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
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
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#fde047",
        tabBarStyle: {
          backgroundColor: "#111827",
          borderTopColor: "111827",
          paddingTop: 20,
          paddingBottom: 20,
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
              icon="https://cdn-icons-png.flaticon.com/512/3884/3884432.png"
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
  );
};

export default TabLayout;
