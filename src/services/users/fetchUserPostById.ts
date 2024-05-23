import { instance } from "@/services/instance";
import { PostSchema } from "@/types/schemas/post";

export default async (id: string) => {
  const response = await instance.get(`user/${id}/post`).json();
  return PostSchema.parse(response);
};
