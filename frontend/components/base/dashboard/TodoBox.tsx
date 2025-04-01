import React from "react";
import type { Todo } from "@prisma/client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2 } from "lucide-react";

const TodoBox = ({
  todo,
  deleteTodo,
  completeTodo,
}: {
  todo: Todo;
  deleteTodo: (id: string) => void;
  completeTodo: (id: string) => void;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border border-primary rounded-2xl p-4 shadow-md transition-all overflow-hidden",
        todo.completed ? "bg-green-100" : "bg-red-100",
      )}
    >
      <div className="flex-1 overflow-hidden">
        <div>
          <h1 className="font-semibold text-lg text-gray-900 break-words">
            {todo.name}
          </h1>
          {todo.description && (
            <p className="text-sm text-gray-600 mt-1 break-words">
              {todo.description}
            </p>
          )}
        </div>
        <div>
          <p className="text-sm text-gray-600 mt-4">
            Created on:{" "}
            <span className="font-semibold">
              {new Date(todo.created_at).toDateString()}
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant={"outline"}
          size="icon"
          className="hover:bg-green-200"
          onClick={() => completeTodo(todo.id)}
          disabled={todo.completed}
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
        </Button>
        <Button
          variant={"destructive"}
          size="icon"
          className="hover:bg-red-200"
          onClick={() => deleteTodo(todo.id)}
        >
          <Trash2 className="w-5 h-5 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default TodoBox;
