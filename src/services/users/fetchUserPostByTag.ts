import { instance } from "@/services/instance";
import { PostSchema } from "@/types/schemas/post";

export default async (tag: string) => {
  const response = await instance.get(`tag/${tag}/post`).json();
  return PostSchema.parse(response);
};
