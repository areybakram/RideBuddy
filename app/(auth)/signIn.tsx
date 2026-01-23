import CustomButton from "@/components/CustomButton";
import { FormField } from "@/components/FormField";
import GoogleAuth from "@/components/GoogleAuth";
import { icons } from "@/constants";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const SignUp = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });

  const handleSignUp = () => {
    // will build this later
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative">
          <Image
            source={require("../../assets/images/signup-car.png")}
            className="w-full h-[250px]"
          />
        </View>
        <Text className=" absolute text-3xl font-JakartaBold text-center bottom-9 left-5">
          Welcom Areeb
        </Text>
      </View>
      
      <FormField
        label="Email"
        icon={icons.email}
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(value) => setform({ ...form, email: value })}
      />
      <FormField
        label="Password"
        icon={icons.lock}
        placeholder="Enter your Password"
        value={form.password}
        onChangeText={(value) => setform({ ...form, password: value })}
      />

      <CustomButton title="SignUp" onPress={handleSignUp} className={"mt-6"} />

      <GoogleAuth />

      <Link href='/(auth)/signUp' className="mt-8"><Text className="text-gray-500 text-center">Don't have an account? </Text>
      <Text className="text-primary-500">Sign Up</Text></Link>

    </ScrollView>
  );
};

export default SignUp;
