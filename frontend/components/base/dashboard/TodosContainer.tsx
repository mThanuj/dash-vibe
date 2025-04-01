"use client";

import {
  getAllTodosByUserid,
  completeTodo,
  deleteTodo,
} from "@/actions/todo.actions";
import { useSession } from "@clerk/nextjs";
import React from "react";
import type { Todo } from "@prisma/client";
import TodoBox from "./TodoBox";

const TodosContainer = ({
  todos,
  setTodos,
}: {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const { session, isLoaded } = useSession();

  React.useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getAllTodosByUserid(session!.user.id);
      setTodos(fetchedTodos);
    }

    if (session) {
      fetchTodos();
    } else {
      setTodos([]);
    }
  }, [session]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleCompleteTodo = async (id: string) => {
    const response = await completeTodo(id, session!.user.id);

    if (response.error) {
      console.log(response.error);
    }

    if (response.success) {
      setTodos((prevTodos: Todo[]) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: true } : todo,
        ),
      );
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const response = await deleteTodo(id, session!.user.id);

    if (response.error) {
      console.log(response.error);
    }

    if (response.success) {
      setTodos((prevTodos: Todo[]) =>
        prevTodos.filter((todo) => todo.id !== id),
      );
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-3/4 mt-4 gap-4">
      {todos &&
        todos.map((todo: Todo) => (
          <TodoBox
            key={todo.id}
            todo={todo}
            completeTodo={handleCompleteTodo}
            deleteTodo={handleDeleteTodo}
          />
        ))}
    </div>
  );
};

export default TodosContainer;
