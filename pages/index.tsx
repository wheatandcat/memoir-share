// @generated: @expo/next-adapter@2.1.52
import React from "react";
import { StyleSheet, View } from "react-native";
import DateCards, { Props } from "components/organisms/Memoir/DateCards";

const item = () => ({
  id: "1",
  title: "買い物",
  categoryID: 9,
  date: "2021-01-01T00:00:00+09:00",
  like: false,
  dislike: false,
  createdAt: "2021-01-01T00:00:00+09:00",
  updatedAt: "2021-01-01T00:00:00+09:00",
});

const props = (): Props => ({
  items: [
    {
      ...item(),
      userID: "test",
    },
    {
      ...item(),
      id: "2",
      userID: "test",
    },
    {
      ...item(),
      id: "3",
      date: "2021-01-02T00:00:00+09:00",
      userID: "test",
    },
  ],
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

export default function App() {
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
