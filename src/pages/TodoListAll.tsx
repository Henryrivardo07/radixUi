import { useGetInfiniteTodos } from "../hooks/useGetInfiniteTodos"; // Custom hook untuk mengambil daftar todo secara infinite scrolling
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"; // Custom hook untuk mendeteksi apakah elemen masuk ke dalam viewport
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../components/ui/Dialog"; // Komponen dialog berbasis Radix UI
import { useState } from "react"; // Hook bawaan React untuk state management
import { Loader2 } from "lucide-react"; // Ikon loader dari lucide-react
import { Button } from "@radix-ui/themes"; // Button dari Radix UI

// Definisi tipe untuk Todo
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoListAll = () => {
  // Menggunakan custom hook untuk mengambil todo secara infinite scrolling
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteTodos();

  // Menggunakan Intersection Observer untuk memuat halaman berikutnya ketika mencapai elemen terakhir
  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage) fetchNextPage();
  });

  // State untuk menyimpan teks yang diubah pada dialog edit
  const [editTitle, setEditTitle] = useState("");

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <div ref={observerRef} className="mt-4 text-center text-gray-500">
        {isFetchingNextPage && <Loader2 className="animate-spin w-6 h-6 mx-auto" />}
      </div>
      {/* Judul halaman */}
      <h2 className="text-3xl font-bold text-center mb-4">All Todos</h2>

      {/* Daftar todo */}
      <div className="space-y-3">
        {data?.pages.map((page) =>
          page.todos.map((todo: Todo) => (
            <div key={todo.id} className="flex items-center justify-between p-3 border rounded-lg shadow-md bg-gray-50">
              {/* Menampilkan judul todo */}
              <span className="text-lg text-gray-800">{todo.title}</span>

              {/* Dialog untuk mengedit todo */}
              <DialogRoot>
                <DialogTrigger>
                  <Button className="bg-blue-500 text-white px-3 py-1 rounded">✏️ Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit Todo</DialogTitle>
                  <DialogDescription>Modify your task below.</DialogDescription>

                  {/* Input untuk mengedit todo */}
                  <input type="text" className="border p-2 w-full mt-2" defaultValue={todo.title} onChange={(e) => setEditTitle(e.target.value)} />

                  {/* Tombol untuk menyimpan perubahan atau membatalkan */}
                  <div className="flex justify-end gap-2 mt-4">
                    <DialogClose>Cancel</DialogClose>
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">Save {isFetchingNextPage && <Loader2 className="animate-spin w-4 h-4" />}</Button>
                  </div>
                </DialogContent>
              </DialogRoot>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
