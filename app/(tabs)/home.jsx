import {
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [newsData, setnewsData] = useState([]);
  const [loading, setloading] = useState(false);
  const getData = async () => {
    setloading(true);
    const res = await fetch(
      "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=" +
        process.env.EXPO_PUBLIC_NEWSAPIKEY
    );
    const data = await res.json();
    setnewsData(data?.articles);
    setloading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const { user } = useUser();
  return (
    <SafeAreaView className="bg-gray-950">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-row pb-5 items-center  justify-start">
          <View>
            <Image src={user?.imageUrl} className="w-16 rounded-full h-16" />
          </View>
          <View className="ml-4">
            <Text className="text-white font-bold text-3xl">Welcome!</Text>
            <Text className="text-gray-300 font-semibold text-xl">
              {user?.firstName} {user?.lastName}
            </Text>
          </View>
        </View>
        {loading && <Text className="text-white" >Loading...</Text>}
        {!loading && (
          <FlatList
            data={newsData}
            renderItem={({ item }) => (
              <NewsCard
                title={item?.title}
                desc={item?.description}
                imgUrl={item?.urlToImage}
                author={item?.author}
              />
            )}
            keyExtractor={({ title }) => title}
          />
        )}
      </ScrollView>
      <StatusBar backgroundColor="#030712" style="light" />
    </SafeAreaView>
  );
};

export default Home;

const NewsCard = ({ title, imgUrl, desc, author }) => {
  return (
    <View className="mb-10 rounded-md">
      <Image src={imgUrl} className="w-full rounded-md h-44" />
      <Text className="text-white font-bold mt-2 text-xl">{title}</Text>
      <Text className="text-gray-500 text-sm mt-2 font-bold ">{desc}</Text>
      <Text className="text-gray-200 text-sm mt-2 font-bold ">{author}</Text>
    </View>
  );
};
