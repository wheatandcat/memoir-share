// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { StyleSheet, View } from "react-native";
import DateCards, { Props } from "components/organisms/Memoir/DateCards";
import { items } from "__mockData__/item";

const props = (): Props => ({
  items: items().map((v) => ({ ...v, userID: "test" })),
  pageInfo: {
    hasNextPage: false,
    endCursor: "",
  },
  onItem: () => null,
  onLoadMore: () => null,
  loading: false,
  startDate: "2020-01-01",
  endDate: "2020-01-07",
  users: [
    {
      id: "test",
      displayName: "suzuki",
      image: "https://placehold.jp/150x150.png",
    },
  ],
});

function App() {
  return (
    <View style={styles.container}>
      <DateCards {...props()} />
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

export default App;
