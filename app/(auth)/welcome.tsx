import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { Onboarding } from "../../constants/index";

export default function OnBoarding() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setactiveIndex] = useState(0);
  const isLastSlide = activeIndex === Onboarding.length - 1;
  const handleNext = () => {
    if (activeIndex < Onboarding.length - 1) {
      swiperRef.current?.scrollBy(1);
    } else {
      router.replace("/(auth)/signUp");
    }
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/signUp")}
        className="flex justify-end items-end p-[3%]"
      >
        <Text className=" text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>
      <Swiper
        className=""
        ref={swiperRef}
        loop={false}
        dot={<View className="w-12 h-2 bg-gray-300 rounded-full mx-1" />}
        activeDot={<View className="w-12 h-2 bg-blue-500 rounded-full mx-1" />}
        onIndexChanged={(index) => setactiveIndex(index)}
      >
        {Onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />

            <Text className="text-3xl font-bold mt-5">{item.title}</Text>

            <Text className="text-lg text-center text-[#858585] font-JakartaSemiBold mt-2">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"} 
      onPress={handleNext} />
    </SafeAreaView>
  );
}
