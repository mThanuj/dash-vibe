import type { Todo } from "@prisma/client";
import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const Analytics = ({ todos }: { todos: Todo[] }) => {
  const [completedTodos, setCompletedTodos] = React.useState<Todo[]>([]);
  const [uncompletedTodos, setUncompletedTodos] = React.useState<Todo[]>([]);
  console.log(todos);

  React.useEffect(() => {
    const completed = todos.filter((todo) => todo.completed);
    const uncompleted = todos.filter((todo) => !todo.completed);
    setCompletedTodos(completed);
    setUncompletedTodos(uncompleted);
  }, [todos]);

  const totalTodos = completedTodos.length + uncompletedTodos.length;
  const completedPercentage =
    totalTodos > 0 ? Math.round((completedTodos.length / totalTodos) * 100) : 0;
  const uncompletedPercentage =
    totalTodos > 0
      ? Math.round((uncompletedTodos.length / totalTodos) * 100)
      : 0;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Todo Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-100 p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-green-800">Completed</h3>
            <p className="text-4xl font-bold text-green-900">
              {completedTodos.length}
            </p>
            <p className="text-sm text-green-700">
              {completedPercentage}% of total
            </p>
          </div>
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        <div className="bg-red-100 p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-red-800">Uncompleted</h3>
            <p className="text-4xl font-bold text-red-900">
              {uncompletedTodos.length}
            </p>
            <p className="text-sm text-red-700">
              {uncompletedPercentage}% of total
            </p>
          </div>
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
      </div>
      <div className="mt-6 text-center text-sm text-gray-600">
        Total Todos: {totalTodos}
      </div>
    </div>
  );
};

export default Analytics;
