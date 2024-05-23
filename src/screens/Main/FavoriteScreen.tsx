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
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";

import { useTheme } from "@/theme";
import moment from "moment";
import Ionicons from "react-native-vector-icons/Ionicons";
import { storage } from "@/App";
import { useFocusEffect } from "@react-navigation/native";
import { getDataLike } from "@/util/mmkv-utils";

function FavoriteScreen() {
  const { t } = useTranslation(["example", "welcome"]);

  const { colors } = useTheme();
  const [dataLike, setDataLike] = useState<any>([]);

  useFocusEffect(
    useCallback(() => {
      setDataLike(getDataLike());
    }, [])
  );

  useEffect(() => {
    storage.set("like", JSON.stringify(dataLike));
  }, [dataLike]);

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 20,
        backgroundColor: colors.layoutBg,
      }}
    >
      <FlatList
        data={dataLike}
        contentContainerStyle={{ marginTop: 10 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `key-${index}`}
        renderItem={({ item, index }) => (
          <Pressable
            key={index}
            onPress={() => {
              if (dataLike.some((e: any) => e.id === item.id)) {
                // We found at least one object that we're looking for!
                setDataLike(dataLike.filter((a: any) => a.id !== item.id));
              } else {
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
          <View
            style={{
              height: Dimensions.get("screen").height / 1.2,
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            <Text>{"No data"}</Text>
          </View>
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

export default FavoriteScreen;
