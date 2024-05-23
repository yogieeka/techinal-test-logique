import { instance } from "@/services/instance";
import { PostSchema } from "@/types/schemas/post";

export default async () => {
  const response = await instance.get(`post`).json();
  return PostSchema.parse(response);
};
