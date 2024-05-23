import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";

import { useTheme } from "@/theme";
import { fetchUserPost } from "@/services/users";
import moment from "moment";
import fetchUserPostByTag from "@/services/users/fetchUserPostByTag";
import { dataTag } from "@/types/schemas/post";
import Ionicons from "react-native-vector-icons/Ionicons";
import { storage } from "@/App";
import { useFocusEffect } from "@react-navigation/native";
import { getDataLike } from "@/util/mmkv-utils";

function PostScreen() {
  const { t } = useTranslation(["example", "welcome"]);
  const { colors } = useTheme();

  const [tag, setTag] = useState("");
  const [dataList, setDataList] = useState<dataTag>();

  const { isSuccess, data, refetch } = useQuery({
    queryKey: ["post", tag],
    queryFn: () => {
      return fetchUserPost();
    },
    enabled: tag.length === 0,
  });

  const {
    isSuccess: isSucessTag,
    data: dataByTag,
    refetch: refetchTag,
  } = useQuery({
    queryKey: ["postTag", tag],
    queryFn: () => {
      return fetchUserPostByTag(tag);
    },
    enabled: tag.length > 0,
  });

  const [dataLike, setDataLike] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      setDataLike(getDataLike());
    }, [])
  );

  useEffect(() => {
    console.log("-->> " + JSON.stringify(dataLike));
    storage.set("like", JSON.stringify(dataLike));
  }, [dataLike]);

  useEffect(() => {
    if (isSuccess) {
      setDataList(data);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isSucessTag) {
      setDataList(dataByTag);
    }
  }, [isSucessTag, dataByTag]);

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
        paddingHorizontal: 20,
        backgroundColor: colors.layoutBg,
      }}
    >
      {tag.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text
            style={[
              styles.cardTitle,
              { color: colors.primary, marginTop: 0, marginRight: 4 },
            ]}
          >
            {"TAG : "}
          </Text>
          <Text
            style={[
              styles.cardTitle,
              { color: colors.primary, marginTop: 0, marginRight: 4 },
            ]}
          >
            {tag}
          </Text>

          <TouchableOpacity onPress={() => setTag("")} style={{ marginTop: 1 }}>
            <Ionicons
              name="close-circle-outline"
              size={14}
              color={colors.error}
            />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={dataList?.data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            onPress={() => {
              if (dataLike.some((e: any) => e.id === item.id)) {
                // We found at least one object that we're looking for!
                // Alert.alert("1");
                setDataLike(dataLike.filter((a: any) => a.id !== item.id));
              } else {
                // Alert.alert("2");
                setDataLike([...dataLike, item]);
              }
            }}
          >
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 10,
                  marginTop: 4,
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Image
                  resizeMode="cover"
                  style={{ width: 40, height: 40, borderRadius: 20 }}
                  source={{ uri: item.owner.picture ?? "" }}
                />
                <View style={[styles.cardHeader, { marginTop: 0 }]}>
                  <Text style={[styles.cardTitle, { color: colors.primary }]}>
                    {item.owner.firstName + " "}
                  </Text>
                  <Text
                    style={[styles.cardSubTitle, { color: colors.gray400 }]}
                  >
                    {moment(item.publishDate).format("MMMM DD YYYY, h:mm a")}
                  </Text>
                </View>
              </View>

              <Image
                resizeMode="cover"
                style={styles.cardImg}
                source={{ uri: item.image ?? "" }}
              />

              <View style={styles.cardHeader}>
                <View style={styles.cardStats}>
                  {item.tags?.map((tag, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setTag(tag);
                        refetchTag();
                      }}
                      style={{
                        backgroundColor: colors.primary,
                        marginRight: 4,
                        borderRadius: 4,
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                      }}
                    >
                      <Text style={[styles.cardSubTitle, { color: "#fff" }]}>
                        {tag}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={[styles.cardSubTitle]}>{item.text + " "}</Text>

                <View style={{ marginTop: 10 }}>
                  <Text style={[styles.cardSubTitle]}>{"22 " + "Likes"}</Text>
                  {/* <Ionicons name="heart" size={18} style={{ marginTop: 4 }} /> */}
                  {dataLike.some((e: any) => e.id === item.id) ? (
                    <Ionicons
                      name="heart"
                      size={18}
                      style={{ marginTop: 4 }}
                      color={colors.error}
                    />
                  ) : (
                    <Ionicons name="heart" size={18} style={{ marginTop: 4 }} />
                  )}
                </View>
              </View>
            </View>
          </Pressable>
        )}
        ListFooterComponent={() => <View style={{ marginBottom: 40 }} />}
        ListEmptyComponent={() => (
          <ActivityIndicator
            size="large"
            color={colors.primary}
            style={{ marginBottom: 20 }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: 24,
  },
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
    width: "100%",
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
    height: 220,
  },
  cardBody: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  cardHeader: {
    flex: 1,
    flexDirection: "column",
    marginVertical: 6,
    marginLeft: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d2d2d",
  },
  cardSubTitle: {
    fontSize: 12,
    color: "#333",
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
  },
  cardStatsItem: {
    marginHorizontal: 4,
    marginRight: 4,
    flexDirection: "row",
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

export default PostScreen;
