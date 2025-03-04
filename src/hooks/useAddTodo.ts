import { useMutation, useQueryClient } from "@tanstack/react-query"; // Mengimpor hook dari React Query
import { addTodo } from "../services/todoServices"; // Mengimpor fungsi untuk menambahkan todo
import { Todo } from "../types"; // Mengimpor tipe Todo

// Custom hook untuk menambah todo dengan Optimistic UI
export const useAddTodo = () => {
  const queryClient = useQueryClient(); // Mendapatkan instance queryClient untuk mengelola cache

  return useMutation({
    mutationFn: addTodo, // Fungsi yang akan dieksekusi saat mutation terjadi

    onMutate: async (newTodo: Todo) => {
      console.log("🔄 Optimistic UI: Menambah todo sebelum request selesai", newTodo);

      await queryClient.cancelQueries({ queryKey: ["todos"] }); // Membatalkan fetch yang sedang berlangsung untuk mencegah konflik

      const previousTodos = queryClient.getQueryData<{ todos: Todo[] }>(["todos"]) || { todos: [] };
      console.log("🗂️ Cache lama sebelum diubah:", previousTodos);

      // ✅ Pakai setQueriesData supaya UI langsung update dengan todo baru
      queryClient.setQueriesData(["todos"], (oldData: any) => ({
        todos: [newTodo, ...(oldData?.todos || [])], // Menambahkan todo baru ke cache lokal
      }));

      console.log("🆕 Cache setelah ditambahkan:", queryClient.getQueryData(["todos"]));

      return { previousTodos }; // Mengembalikan cache lama untuk rollback jika gagal
    },

    onError: (error, _, context) => {
      console.error("❌ Gagal menambah todo, rollback ke data lama!", error);
      if (context?.previousTodos) {
        queryClient.setQueriesData(["todos"], context.previousTodos); // Mengembalikan cache lama jika terjadi error
      }
    },

    onSettled: async () => {
      console.log("🔄 Refresh data dari server setelah todo berhasil ditambahkan");
      await queryClient.invalidateQueries({ queryKey: ["todos"] }); // Memastikan data terbaru diambil dari server
    },
  });
};
