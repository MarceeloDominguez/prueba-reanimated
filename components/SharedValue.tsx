import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function SharedValue() {
  const random = 50;
  const randomWidth = useSharedValue(0);

  const myStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${randomWidth.value}%`, { duration: 500 }),
    };
  });

  useEffect(() => {
    randomWidth.value = random;
  }, []);

  return (
    <View>
      <Text>Shared Value</Text>
      <View>
        <View style={styles.progressBar} />
        <Animated.View style={[styles.progressBarCompleted, myStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColor: "red",
  },
  progressBarCompleted: {
    height: 10,
    backgroundColor: "violet",
    position: "absolute",
  },
});
