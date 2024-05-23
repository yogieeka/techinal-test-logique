import { instance } from "@/services/instance";
import { UserSchema } from "@/types/schemas/user";

export default async (pageParam: number) => {
  const response = await instance.get(`user?page=${pageParam}`).json();
  return UserSchema.parse(response);
};
