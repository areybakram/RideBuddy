import CustomButton from "@/components/CustomButton";
import { FormField } from "@/components/FormField";
import { icons } from "@/constants";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const [form, setform] = useState({
    name: "",
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
          Create an account
        </Text>
      </View>
      <FormField
        label="Full Name"
        icon={icons.person}
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(value) => setform({ ...form, name: value })}
      />
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
    </ScrollView>
  );
};

export default SignUp;
