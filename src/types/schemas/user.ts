import { z } from "zod";

export const UserSchema = z.object({
  data: z.array(
    z.object({
      id: z.string().nullable(),
      title: z.string().nullable(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      picture: z.string().nullable(),
    })
  ),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
