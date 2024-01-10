import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function Box() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 300 }],
    };
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 300, {
            damping: 40,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  return (
    <View>
      <Text>Default Spring</Text>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Text>Custom Spring</Text>
      <Animated.View style={[styles.box, customSpringStyles]} />
      <Button
        onPress={() => (offset.value = withSpring(Math.random()))}
        title="Mover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 80,
    width: 80,
    backgroundColor: "orange",
    borderRadius: 10,
  },
});
