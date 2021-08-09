import React, { memo, useCallback } from "react";
import {
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  useWindowDimensions,
} from "react-native";
import View from "share/components/atoms/View";
import Loading from "share/components/atoms/Loading";
import DateText from "share/components/molecules/Memoir/DateText";
import dayjs from "share/lib/dayjs";
import {
  ItemsInPeriodQuery as Query,
  ItemsInPeriodQueryHookResult as QueryHookResult,
} from "share/queries/api/index";
import Header from "share/components/molecules/Memoir/Header";
import theme from "share/config/theme";
import { getModeCountMax } from "share/lib/utility";
import Divider from "share/components/atoms/Divider";
import Image from "share/components/atoms/Image";
import Card from "share/components/organisms/Memoir/Card";

type QueryProps = Pick<QueryHookResult, "loading" | "error">;

type PlainProps = QueryProps & {
  startDate: string;
  endDate: string;
  users: User[];
  onItem: () => void;
  onLoadMore: (after: string | null) => void;
  items: NonNullable<EdgesNode<Query["itemsInPeriod"]>>[];
  pageInfo: PageInfo<Query["itemsInPeriod"]>;
};

type Item = ArrayType<PlainProps["items"]>;

export type Props = Pick<
  PlainProps,
  "items" | "loading" | "onLoadMore" | "onItem" | "pageInfo" | "users"
> & {
  startDate: string;
  endDate: string;
};

type User = {
  id: string;
  displayName: string;
  image: string;
};

type Card = Item & {
  user: User;
};

type RenderedItem = {
  date: string | null;
  contents?: Card;
  categoryID?: number;
  last?: boolean;
  width: number;
};

const renderItem = (
  { item, index }: ListRenderItemInfo<RenderedItem>,
  props: Props
) => {
  if (item.date) {
    return <DateText date={item.date} categoryID={Number(item.categoryID)} />;
  }

  return (
    <View key={`${index}-contents`}>
      <View mb={3} mx={3}>
        <Card
          title={item?.contents?.title || ""}
          categoryID={item?.contents?.categoryID || 0}
          user={item?.contents?.user as User}
          onPress={props.onItem}
        />
        {!item?.last && <Divider />}
      </View>
      {!!item?.last && (
        <Image
          source={require("../../../share/img/icon/border_dotted@2x.png")}
          width={item.width}
          height={2}
        />
      )}
    </View>
  );
};

const ListFooterComponent = memo<{ loading: boolean }>((props) => {
  if (props.loading) {
    return (
      <View style={styles.footer}>
        <Loading size="large" />
      </View>
    );
  }

  return <View style={styles.footer} />;
});

const DateCards: React.FC<Props> = (props) => {
  const windowWidth = useWindowDimensions().width;

  const dates = Array.from(
    new Set(props.items.map((v) => dayjs(v.date).format("YYYY-MM-DD")))
  );

  const dateItems = dates.sort().map((date) => {
    const contents = date;

    return {
      date,
      contents,
    };
  });

  const data = dateItems
    .map((v1) => {
      const sameDateItems = props.items.filter(
        (v2) => dayjs(v2.date).format("YYYY-MM-DD") === v1.date
      );

      const item: RenderedItem[] = sameDateItems.map((v2, index) => {
        const user: User | undefined = props.users.find(
          (v) => v.id === v2.userID
        );

        return {
          date: null,
          contents: {
            ...v2,
            user: user || {
              id: "",
              displayName: "",
              image: "",
            },
          },
          last: sameDateItems.length === index + 1,
          width: windowWidth,
        };
      });

      const categoryID = item.map((v) => Number(v.contents?.categoryID));

      const dateItem: RenderedItem = {
        date: v1.date,
        categoryID: getModeCountMax(categoryID),
        width: windowWidth,
      };

      return [dateItem, ...item];
    })
    .flat();

  const renderItemCall = useCallback(
    (item: ListRenderItemInfo<RenderedItem>) => {
      return renderItem(item, props);
    },
    [props]
  );

  const handleLoadMore = useCallback(() => {
    if (!props.pageInfo.hasNextPage) return;
    if (props.loading) return;

    props.onLoadMore(props?.pageInfo.endCursor);
  }, [props]);

  return (
    <View style={styles.root}>
      <FlatList<RenderedItem>
        keyExtractor={(_, index) => `search_${index}`}
        data={data}
        renderItem={renderItemCall}
        ListHeaderComponent={
          <Header startDate={props.startDate} endDate={props.endDate} />
        }
        ListFooterComponent={<ListFooterComponent loading={props.loading} />}
        onEndReachedThreshold={0.8}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};

export default memo(DateCards);

const styles = StyleSheet.create({
  root: {
    height: "100%",
  },
  footer: {
    paddingTop: theme().space(2),
    height: 200,
  },
});
