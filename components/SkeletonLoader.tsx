import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");

const SkeletonLoader = ({ width = 250, height = 20, borderRadius = 10 }) => {
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    shimmerValue.value = withRepeat(
      withTiming(1, { duration: 1500 }),
      -1,
      false,
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            shimmerValue.value,
            [0, 1],
            [-screenWidth, screenWidth],
          ),
        },
      ],
    };
  });

  return (
    <View style={[styles.skeletonContainer, { width, height, borderRadius }]}>
      <Animated.View
        style={[
          styles.shimmer,
          shimmerStyle,
          { width: screenWidth * 2, height },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
    position: "relative",
  },
  shimmer: {
    position: "absolute",
    height: "100%",
    backgroundColor: "#0286FF",
    opacity: 0.3,
  },
});

export default SkeletonLoader;
