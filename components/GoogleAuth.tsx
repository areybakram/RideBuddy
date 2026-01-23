import { icons } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const GoogleAuth = () => {
  return (
    <View>
      {/* OR Divider */}
      <View className="flex flex-row justify-center items-center gap-x-3 mt-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-center text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      {/* Google Button */}
      <CustomButton
        title="Continue with Google"
        onPress={() => {}}
        className="mt-4 gap-3"
        bgVariant="outline"
        textVariant="primary"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-7"
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
};

export default GoogleAuth;
