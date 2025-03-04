import { useGetTodos } from "../hooks/useGetTodos";
import { useAddTodo } from "../hooks/useAddTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useState, useRef } from "react";
import { Todo } from "../types";
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../components/ui/Dialog";
import TodoCheckbox from "../components/ui/TodoCheckbox";

const TodoList = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetTodos(page, 10);
  const addTodoMutation = useAddTodo();
  const [editTitle, setEditTitle] = useState("");

  const updateTodoMutation = useUpdateTodo(page, 10);
  const deleteTodoMutation = useDeleteTodo();
  const titleRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    if (titleRef.current && titleRef.current.value) {
      addTodoMutation.mutate({
        id: btoa(Date.now().toString()),
        title: titleRef.current.value,
        completed: false,
        date: new Date().toISOString(),
      });
      titleRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
      <DialogRoot>
        <DialogTrigger>+ Add Todo</DialogTrigger>
        <DialogContent>
          <DialogTitle>Add New Todo</DialogTitle>
          <DialogDescription>Enter a title for your new task.</DialogDescription>
          <input ref={titleRef} type="text" className="border p-2 w-full mt-2" placeholder="Todo title" />
          <div className="flex justify-end gap-2 mt-4">
            <DialogClose>Cancel</DialogClose>
            <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
              Add
            </button>
          </div>
        </DialogContent>
      </DialogRoot>

      {isLoading ? (
        <p className="text-gray-500 text-center mt-4">Loading...</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {data?.todos.map((todo: Todo) => (
            <li key={todo.id} className="flex items-center gap-4 p-3 border rounded-lg shadow-md bg-gray-50">
              <TodoCheckbox.Root
                defaultChecked={todo.completed}
                onCheckedChange={() =>
                  updateTodoMutation.mutate({
                    id: todo.id,
                    title: todo.title,
                    completed: !todo.completed,
                    date: todo.date ?? new Date().toISOString(),
                  })
                }
              />
              <span className={`flex-1 text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todo.title}</span>
              <DialogRoot>
                <DialogTrigger>✏️</DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit Todo</DialogTitle>
                  <input type="text" className="border p-2 w-full mt-2" defaultValue={todo.title} onChange={(e) => setEditTitle(e.target.value)} />
                  <div className="flex justify-end gap-2 mt-4">
                    <DialogClose>Cancel</DialogClose>
                    <button
                      onClick={() =>
                        updateTodoMutation.mutate({
                          id: todo.id,
                          title: editTitle || todo.title,
                          completed: todo.completed,
                          date: todo.date ?? new Date().toISOString(),
                        })
                      }
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                  </div>
                </DialogContent>
              </DialogRoot>
              <button onClick={() => deleteTodoMutation.mutate(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex justify-between mt-6">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-300 text-black px-4 py-2 rounded disabled:opacity-50">
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} className="bg-gray-300 text-black px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default TodoList;
