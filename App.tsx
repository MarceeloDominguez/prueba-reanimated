import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import SharedValue from "./components/SharedValue";
import Box from "./components/Box";
import BoxRotate from "./components/BoxRotate";
import EventsExample from "./components/EventsExample";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SharedValue />
      <Box />
      <BoxRotate />
      <EventsExample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 50,
  },
});
