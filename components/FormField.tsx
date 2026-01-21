import { InputFieldProps } from "@/assets/icons/types/type";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const FormField = ({
  label,
  labelStyle,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  icon,
  ...props
}:InputFieldProps) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 mx-4 ">
          <Text className={`text-lg font-JakartaBold ${labelStyle}`}>
            {label}
          </Text>

          <View className="relative flex-row items-center border border-neutral-200 focus:border-primary-500 bg-gray-100 rounded-full mt-2 px-5 py-2">
            {icon && (
              <Image source={icon} className={`w-6 h-6 mr-3 ${iconStyle}`} />
            )}

            <TextInput
              secureTextEntry={secureTextEntry}
              className={`flex-1 text-base font-JakartaRegular text-black  ${inputStyle}`}
              placeholderTextColor="#A0A0A0"
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
