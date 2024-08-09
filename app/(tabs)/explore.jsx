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

const Explore = () => {
  const [newsData, setnewsData] = useState([]);
  const [searchdata, setsearchdata] = useState("");
  const [loading, setloading] = useState(false);
  const getData = async () => {
    setloading(true);
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${
        searchdata ? searchdata : "india"
      }&sortBy=publishedAt&apiKey=` + process.env.EXPO_PUBLIC_NEWSAPIKEY
    );
    const data = await res.json();
    setnewsData(data?.articles);
    setloading(false);
  };

  return (
    <SafeAreaView className="bg-gray-950">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex flex-row  w-full gap-5  items-center  justify-start mb-5 ">
          <TextInput
            onChangeText={(text) => setsearchdata(text)}
            className=" bg-gray-900  p-3  rounded-md text-white w-[80%] "
            keyboardType="text"
          />
          <TouchableOpacity
            onPress={getData}
            className="bg-gray-900 p-4 rounded-md"
          >
            <Image
              src="https://cdn-icons-png.flaticon.com/128/11741/11741045.png"
              className="w-5 h-5 "
            />
          </TouchableOpacity>
        </View>
        {searchdata && (
          <Text className="text-white font-bold text-lg mb-5">
            <Text className="text-white ">Searching "{searchdata}"</Text>
          </Text>
        )}
        {newsData.length == 0 && (
          <Text className="text-white">No result found</Text>
        )}
        {loading && <Text className="text-white">Loading... </Text>}
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

export default Explore;

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
