// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { StyleSheet, View } from "react-native";
import Text from "share/components/atoms/Text";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
