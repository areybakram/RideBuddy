import { images } from "@/constants";
import React from "react";
import { Image, Modal, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose?: () => void;
};

const SuccessModal = ({ visible, onClose }: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/40 justify-center items-center px-5">
        <View className="bg-white rounded-3xl p-10 items-center justify-center w-full max-w-[85%]">
          <Image
            source={images.check}
            className="w-28 h-28 mb-5"
            resizeMode="contain"
          />

          <Text className="text-3xl font-JakartaBold text-center">
            Verified!
          </Text>

          <Text className="text-base text-gray-500 font-Jakarta text-center mt-2">
            You have successfully verified your account.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
