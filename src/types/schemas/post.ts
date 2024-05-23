import { z } from "zod";

export const PostSchema = z.object({
  data: z.array(
    z.object({
      id: z.string().nullable(),
      image: z.string().nullable(),
      likes: z.number().nullable(),
      tags: z.array(z.string()).nullable(),
      text: z.string().nullable(),
      publishDate: z.string().nullable(),
      owner: z.object({
        id: z.string().nullable(),
        title: z.string().nullable(),
        firstName: z.string().nullable(),
        lastName: z.string().nullable(),
        picture: z.string().nullable(),
      }),
    })
  ),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});

export type dataTag = z.infer<typeof PostSchema>;
