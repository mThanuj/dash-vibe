"use server";
import { prisma } from "@/prisma/prisma";
import { CreateTodoSchema } from "@/schemas/CreateTodoSchema";
import z from "zod";

export const getAllTodosByUserid = async (clerk_id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerk_id,
      },
    });

    if (!user) {
      return [];
    }

    const { id } = user;

    const todos = await prisma.todo.findMany({
      where: {
        user_id: id,
      },
    });

    return todos;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createTodo = async (
  data: z.infer<typeof CreateTodoSchema>,
  clerk_id: string,
) => {
  const user = await prisma.user.findUnique({
    where: {
      clerk_id,
    },
  });

  if (!user) {
    return {
      error: "User not found",
    };
  }

  const { id } = user;

  try {
    const validatedData = CreateTodoSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        error: "Invalid data",
      };
    }

    const { name, description } = validatedData.data;

    await prisma.todo.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id,
          },
        },
      },
    });

    return {
      success: "Todo created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};

export const completeTodo = async (id: string, clerk_id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerk_id,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const { id: userId } = user;

    await prisma.todo.update({
      where: {
        id,
        user_id: userId,
      },
      data: {
        completed: true,
      },
    });

    return {
      success: "Todo completed successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};

export const deleteTodo = async (id: string, clerk_id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerk_id,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const { id: userId } = user;

    await prisma.todo.delete({
      where: {
        id,
        user_id: userId,
      },
    });

    return {
      success: "Todo deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};

export const getComletedTodos = async (clerk_id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerk_id,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const { id } = user;

    const todos = await prisma.todo.findMany({
      where: {
        user_id: id,
        completed: true,
      },
    });

    return {
      todos,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};

export const getUncompletedTodos = async (clerk_id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        clerk_id,
      },
    });

    if (!user) {
      return {
        error: "User not found",
      };
    }

    const { id } = user;

    const todos = await prisma.todo.findMany({
      where: {
        user_id: id,
        completed: false,
      },
    });

    return { todos };
  } catch (error) {
    console.log(error);
    return {
      error,
    };
  }
};
