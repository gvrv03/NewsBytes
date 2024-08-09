import { TouchableOpacity, View, Text } from "react-native";
import React from "react";

const CustomButton = ({onPress, name}) => {
  return (
    <TouchableOpacity  onPress={onPress} className="bg-yellow-300 flex justify-center items-center rounded-lg font-bold py-3 mt-5 ">
      <Text className="font-semibold  text-xl">{name}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
