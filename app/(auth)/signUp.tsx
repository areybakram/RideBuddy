import CustomButton from "@/components/CustomButton";
import { FormField } from "@/components/FormField";
import GoogleAuth from "@/components/GoogleAuth";
import SkeletonLoader from "@/components/SkeletonLoader";
import VerificationModal from "@/components/VerificationModal";
import { icons } from "@/constants";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  // const [loading, setLoading] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
  }, [isLoaded]);

  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
      setSigningUp(true);

      // await signUp.reset();

      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setSigningUp(false);
    }
  };

  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      setVerifying(true);

      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({
          session: result.createdSessionId,
        });

        router.replace("/home");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setVerifying(false);
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
          Create an account
        </Text>
      </View>

      {/* Form */}
      <FormField
        label="Full Name"
        icon={icons.person}
        placeholder="Enter your full name"
        value={form.name}
        onChangeText={(value) => setForm({ ...form, name: value })}
      />

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

      {signingUp ? (
        <SkeletonLoader width={380} height={56} borderRadius={12} />
      ) : (
        <CustomButton title="Sign Up" onPress={handleSignUp} className="mt-6" />
      )}

      <GoogleAuth />

      <Link href="/(auth)/signIn" className="mt-8 text-center">
        <Text className="text-gray-500 text-center">
          Already have an account?{" "}
          <Text className="text-primary-500">Sign In</Text>
        </Text>
      </Link>

      <VerificationModal
        visible={pendingVerification}
        code={code}
        setCode={setCode}
        onVerify={handleVerify}
        verifying={verifying}
        onClose={() => setPendingVerification(false)}
      />
    </ScrollView>
  );
};

export default SignUp;
