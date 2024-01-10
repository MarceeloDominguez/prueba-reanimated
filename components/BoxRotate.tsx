import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function BoxRotate() {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  return (
    <View>
      <Text>Modifiers</Text>
      <View style={{ flexDirection: "row" }}>
        <Animated.View
          style={[styles.box, { backgroundColor: "violet" }, animatedStyle]}
        />
        <Animated.View
          style={[styles.box, { backgroundColor: "red" }, animatedStyle]}
        />
        <Animated.View
          style={[styles.box, { backgroundColor: "green" }, animatedStyle]}
        />
      </View>
      <Button
        //onPress={() => (rotation.value = withRepeat(withTiming(80), 6, true))}
        title="Press"
        onPress={() => {
          rotation.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withRepeat(withTiming(25, { duration: 100 }), 12, true),
            withTiming(0, { duration: 50 })
          );
        }}
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
