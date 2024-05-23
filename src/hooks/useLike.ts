import React, { useState } from "react";
import { storage } from "@/App";
import { Alert } from "react-native";

const useLike = () => {
  const getLike = () => {
    const likeString = storage.getString("like");
    const userLike = JSON.parse(likeString ?? "");
    return userLike;
  };

  const [like, setLike] = useState(getLike());
  const saveLike = (userLike: any) => {
    storage.set("like", JSON.stringify(userLike));
    setLike(userLike);
  };
  return {
    setLike: saveLike,
    like,
  };
};

export default useLike;
