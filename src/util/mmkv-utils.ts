import { storage } from "@/App";

export const getDataLike = () => {
  const likeString = storage.getString("like");
  const jsonLike = JSON.parse(likeString ?? "");
  return jsonLike;
};

export const getDataFriend = () => {
  const fiendString = storage.getString("friend");
  const jsonFriend = JSON.parse(fiendString ?? "");
  return jsonFriend;
};
