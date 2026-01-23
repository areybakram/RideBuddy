// import CustomButton from "@/components/CustomButton";
// import { FormField } from "@/components/FormField";
// import GoogleAuth from "@/components/GoogleAuth";
// import { icons } from "@/constants";
// import { Link } from "expo-router";
// import React, { useState } from "react";
// import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

// const SignUp = () => {
//   const [form, setform] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSignUp = () => {
//     // will build this later
//   };
//   return (
//     <ScrollView className="flex-1 bg-white">
//       <View className="flex-1 bg-white">
//         <View className="relative">
//           <Image
//             source={require("../../assets/images/signup-car.png")}
//             className="w-full h-[250px]"
//           />
//         </View>
//         <Text className=" absolute text-3xl font-JakartaBold text-center bottom-9 left-5">
//           Create an account
//         </Text>
//       </View>
//       <FormField
//         label="Full Name"
//         icon={icons.person}
//         placeholder="Enter your full name"
//         value={form.name}
//         onChangeText={(value) => setform({ ...form, name: value })}
//       />
//       <FormField
//         label="Email"
//         icon={icons.email}
//         placeholder="Enter your Email"
//         value={form.email}
//         onChangeText={(value) => setform({ ...form, email: value })}
//       />
//       <FormField
//         label="Password"
//         icon={icons.lock}
//         placeholder="Enter your Password"
//         value={form.password}
//         onChangeText={(value) => setform({ ...form, password: value })}
//       />

//       <CustomButton title="SignUp" onPress={handleSignUp} className={"mt-6"} />

//       <GoogleAuth />

//       <Link href='/(auth)/signIn' className="mt-8"><Text className="text-gray-500 text-center">Already have an account? </Text>
//       <Text className="text-primary-500">Sign In</Text></Link>

//     </ScrollView>
//   );
// };

// export default SignUp;


import CustomButton from "@/components/CustomButton";
import { FormField } from "@/components/FormField";
import GoogleAuth from "@/components/GoogleAuth";
import { icons } from "@/constants";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

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

  // -------- SIGN UP --------
  const handleSignUp = async () => {
    if (!isLoaded) return;

    try {
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
    }
  };

  // -------- VERIFY EMAIL --------
  const handleVerify = async () => {
    if (!isLoaded) return;

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
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

  // ================== VERIFY SCREEN ==================
  if (pendingVerification) {
    return (
      <ScrollView className="flex-1 bg-white px-5">
        <View className="mt-24">
          <Text className="text-3xl font-JakartaBold mb-2">
            Verify your email
          </Text>
          <Text className="text-gray-500 mb-6">
            Enter the verification code sent to your email
          </Text>

          <FormField
            label="Verification Code"
            placeholder="Enter code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />

          <CustomButton
            title="Verify"
            onPress={handleVerify}
            className="mt-6"
          />
        </View>
      </ScrollView>
    );
  }

  // ================== SIGN UP SCREEN ==================
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

      <CustomButton
        title="Sign Up"
        onPress={handleSignUp}
        className="mt-6"
      />

      <GoogleAuth />

      <Link href="/(auth)/signIn" className="mt-8 text-center">
        <Text className="text-gray-500 text-center">
          Already have an account?{" "}
          <Text className="text-primary-500">Sign In</Text>
        </Text>
      </Link>
    </ScrollView>
  );
};

export default SignUp;
