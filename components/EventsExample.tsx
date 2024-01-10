import React from "react";
import { StyleSheet } from "react-native";
import {
  TapGestureHandler,
  GestureHandlerRootView,
  TapGestureHandlerGestureEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

interface GestureHandlerContext {
  startX: number;
  startY: number;
  [key: string]: number;
}

export default function EventsExample() {
  const startingPosition = 100;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const pressed = useSharedValue(false);
  const pressed2 = useSharedValue(false);

  const eventHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
    {
      onStart: (event, ctx) => {
        pressed.value = true;
      },
      onEnd: (event, ctx) => {
        pressed.value = false;
      },
    }
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "red" : "gray",
      transform: [{ scale: withSpring(pressed.value ? 2 : 1) }],
    };
  });

  const eventHandler2 = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    GestureHandlerContext
  >({
    onStart: (event, ctx) => {
      pressed2.value = true;
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = ctx.startX + event.translationX;
      y.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      pressed2.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
    },
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed2.value ? "red" : "gray",
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <GestureHandlerRootView style={{ backgroundColor: "yellow", flex: 1 }}>
      <TapGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </TapGestureHandler>
      <PanGestureHandler onGestureEvent={eventHandler2}>
        <Animated.View style={[styles.ball, animatedStyle2]} />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  ball: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
