import { useGetTodos } from "../hooks/useGetTodos";
import { useAddTodo } from "../hooks/useAddTodo";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";
import { useState, useRef } from "react";
import { Todo } from "../types";
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../components/ui/Dialog";
import TodoCheckbox from "../components/ui/TodoCheckbox";

const TodoList = () => {
  // State untuk mengatur halaman saat pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // Menggunakan custom hook untuk mengambil daftar todo
  const { data, isLoading } = useGetTodos(page, limit);
  // ✅ Menggunakan useAddTodo dengan `page` dan `limit`
  const addTodoMutation = useAddTodo(page, limit);
  const [editTitle, setEditTitle] = useState("");
  const updateTodoMutation = useUpdateTodo(page, limit);
  const deleteTodoMutation = useDeleteTodo();

  // Ref untuk input saat menambahkan todo
  const titleRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk menambahkan todo baru
  const handleAddTodo = () => {
    if (titleRef.current && titleRef.current.value) {
      addTodoMutation.mutate({
        id: btoa(Date.now().toString()), // Generate ID unik
        title: titleRef.current.value,
        completed: false,
        date: new Date().toISOString(),
      });
      titleRef.current.value = ""; // Reset input setelah menambahkan todo
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>

      {/* Dialog untuk menambahkan todo */}
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

      {/* Menampilkan loading jika data masih diambil */}
      {isLoading ? (
        <p className="text-gray-500 text-center mt-4">Loading...</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {/* Loop melalui daftar todo dan menampilkannya */}
          {data?.todos.map((todo: Todo) => (
            <li key={todo.id} className="flex items-center gap-4 p-3 border rounded-lg shadow-md bg-gray-50">
              {/* Checkbox untuk menandai todo selesai */}
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

              {/* Dialog untuk mengedit todo */}
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

              {/* Tombol untuk menghapus todo */}
              <button onClick={() => deleteTodoMutation.mutate(todo.id)}>❌</button>
            </li>
          ))}
        </ul>
      )}

      {/* Tombol navigasi untuk pagination */}
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
