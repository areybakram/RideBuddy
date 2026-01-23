import CustomButton from "@/components/CustomButton";
import { FormField } from "@/components/FormField";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import SkeletonLoader from "./SkeletonLoader";

// const [verifying, setVerifying] = useState(false);

type Props = {
  visible: boolean;
  code: string;
  setCode: (val: string) => void;
  onVerify: () => void;
  onClose?: () => void;
  verifying: boolean;
};

const VerificationModal = ({
  visible,
  code,
  setCode,
  onVerify,
  onClose,
  verifying,
}: Props) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <View className="flex-1 bg-black/40 justify-end">
        {/* Modal Content */}
        <View className="bg-white rounded-t-3xl px-5 pt-6 pb-10 h-[50%]">
          <Text className="text-2xl font-JakartaBold mb-2">
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

          {verifying ? (
            <SkeletonLoader width={380} height={56} borderRadius={12} />
          ) : (
            <CustomButton title="Verify" onPress={onVerify} className="mt-6" />
          )}

          {!verifying && onClose && (
            <TouchableOpacity className="mt-4" onPress={onClose}>
              <Text className="text-center text-gray-400">Cancel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default VerificationModal;
