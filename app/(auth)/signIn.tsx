

import CustomButton from "@/components/CustomButton";
import { FormField } from "@/components/FormField";
import GoogleAuth from "@/components/GoogleAuth";
import { icons } from "@/constants";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

const SignIn = () => {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // -------- SIGN IN --------
  const handleSignIn = async () => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        router.replace("/home"); // or /(tabs)
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-1 bg-white">
        <View className="relative">
          <Image
            source={require("../../assets/images/signup-car.png")}
            className="w-full h-[250px]"
          />
        </View>
        <Text className="absolute text-3xl font-JakartaBold bottom-9 left-5">
          Welcome Areeb
        </Text>
      </View>

      {/* Form */}
      <FormField
        label="Email"
        icon={icons.email}
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(value) => setForm({ ...form, email: value })}
        keyboardType="email-address"
      />

      <FormField
        label="Password"
        icon={icons.lock}
        placeholder="Enter your Password"
        value={form.password}
        onChangeText={(value) => setForm({ ...form, password: value })}
        secureTextEntry
      />

      <CustomButton
        title="Sign In"
        onPress={handleSignIn}
        className="mt-6"
      />

      <GoogleAuth />

      <Link href="/(auth)/signUp" className="mt-8 text-center">
        <Text className="text-gray-500 text-center">
          Don&apos;t have an account?{" "}
          <Text className="text-primary-500">Sign Up</Text>
        </Text>
      </Link>
    </ScrollView>
  );
};

export default SignIn;
