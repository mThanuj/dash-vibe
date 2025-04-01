import z from "zod";

export const CreateTodoSchema = z.object({
  name: z.string().nonempty({ message: "Name of the todo cannot be empty" }),
  description: z.string(),
});
