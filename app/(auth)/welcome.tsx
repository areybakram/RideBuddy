import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View , Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import {Onboarding} from "../../constants/index";

export default function OnBoarding() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setactiveIndex] = useState(0);
  return (
    <SafeAreaView className="flex h-full bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/signUp")}
        className="flex justify-end items-end p-5"
      >
        <Text className=" text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-12 h-2 bg-gray-300 rounded-full mx-1" />}
        activeDot={
          <View className="w-12 h-2 bg-blue-500 rounded-full mx-1" />}
        onIndexChanged={(index) => setactiveIndex(index)}
      >
        {Onboarding.map((item) => (
            <View key={item.id}>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
              <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"/>
            </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
}
