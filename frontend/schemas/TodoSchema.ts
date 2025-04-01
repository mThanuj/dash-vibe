import z from "zod";

export const TodoSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});
