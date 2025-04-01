"use client";
import { getAllTodosByUserid } from "@/actions/todo.actions";
import Analytics from "@/components/base/dashboard/Analytics";
import TodosContainer from "@/components/base/dashboard/TodosContainer";
import { useSession } from "@clerk/nextjs";
import { Todo } from "@prisma/client";
import React from "react";

const page = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const { session, isLoaded } = useSession();

  React.useEffect(() => {
    async function fetchTodos() {
      const fetchedTodos = await getAllTodosByUserid(session!.user.id);
      setTodos(fetchedTodos);
    }

    if (session) fetchTodos();
  }, [session]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-center">
      <div className="flex items-center justify-center flex-1">
        <TodosContainer todos={todos} setTodos={setTodos} />
      </div>
      <div>
        <Analytics todos={todos} />
      </div>
    </div>
  );
};

export default page;
