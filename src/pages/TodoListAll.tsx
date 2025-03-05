import { useGetInfiniteTodos } from "../hooks/useGetInfiniteTodos"; // Custom hook untuk mengambil daftar todo secara infinite scrolling
import { useIntersectionObserver } from "../hooks/useIntersectionObserver"; // Custom hook untuk mendeteksi apakah elemen masuk ke dalam viewport
import { Loader2 } from "lucide-react"; // Ikon loader dari lucide-react

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

  return (
    <div className="container mx-auto p-6 max-w-xl">
      {/* Judul halaman */}
      <h2 className="text-3xl font-bold text-center mb-4">All Todos</h2>

      {/* Daftar todo */}
      <div className="space-y-3">
        {data?.pages.map((page) =>
          page.todos.map((todo: Todo) => (
            <div key={todo.id} className="flex items-center justify-between p-3 border rounded-lg shadow-md bg-gray-50">
              {/* Menampilkan judul todo */}
              <span className="text-lg text-gray-800">{todo.title}</span>
            </div>
          ))
        )}
      </div>

      {/* Loader saat memuat halaman berikutnya */}
      <div ref={observerRef} className="mt-4 text-center text-gray-500">
        {isFetchingNextPage && <Loader2 className="animate-spin w-6 h-6 mx-auto" />}
      </div>
    </div>
  );
};
