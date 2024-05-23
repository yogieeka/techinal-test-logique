import { useCallback, useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useTheme } from "@/theme";
import { fetchOne } from "@/services/users";
import { ApplicationScreenProps } from "@/types/navigation";

const UserScreen = ({ navigation, route }: ApplicationScreenProps) => {
  const { t } = useTranslation(["example", "welcome"]);

  const { colors } = useTheme();

  const { isSuccess, data, fetchNextPage, refetch, isFetching } =
    useInfiniteQuery({
      queryKey: ["user"],
      queryFn: async ({ pageParam }: any) => {
        return fetchOne(pageParam);
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage: any) => lastPage.page + 1,
    });

  useEffect(() => {
    if (isSuccess) {
      console.log(JSON.stringify(data));
    }
  }, [isSuccess, data]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: colors.layoutBg,
      }}
    >
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
        data={data?.pages.map((page: any) => page.data).flat()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            onPress={() => {
              navigation.navigate("UserDetail", { data: item });
            }}
          >
            <View style={styles.card}>
              <Image
                resizeMode="cover"
                style={styles.cardImg}
                source={{ uri: item.picture ?? "" }}
              />
              {/* <View style={styles.cardBody}> */}
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.firstName + " "}</Text>
              </View>
              {/* </View> */}
            </View>
          </Pressable>
        )}
        ListFooterComponent={
          <View>
            {isFetching ? (
              <ActivityIndicator
                size="large"
                color={colors.primary}
                style={{ marginBottom: 20 }}
              />
            ) : (
              <View />
            )}
          </View>
        }
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  /** Card */
  card: {
    width: 150,
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardTop: {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardImg: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardBody: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 6,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: "600",
    color: "#2d2d2d",
  },
  cardPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#444",
  },
  cardStats: {
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: -12,
  },
  cardStatsItem: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  cardStatsItemText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#48496c",
    marginLeft: 4,
  },
  cardFooter: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#e9e9e9",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardFooterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#909090",
  },
});

export default UserScreen;
