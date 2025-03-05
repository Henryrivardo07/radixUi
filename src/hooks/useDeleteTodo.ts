import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../services/todoServices";
import { Todo } from "../types";

// ✅ Custom Hook untuk menghapus todo dengan Optimistic UI
export const useDeleteTodo = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: string) => {
      console.log("📡 Menghapus todo:", todoId);
      return deleteTodo(todoId);
    },

    onMutate: async (todoId: string) => {
      console.log("🔄 Optimistic UI: Menghapus todo sebelum server merespons", todoId);

      // ❗ Batalkan fetch todo yang sedang berjalan agar tidak bentrok
      await queryClient.cancelQueries({ queryKey: ["todos", page, limit] });

      // ✅ Simpan data sebelumnya sebelum dihapus
      const previousData = queryClient.getQueryData<{ todos: Todo[]; totalTodos: number; hasNextPage: boolean; nextPage: number }>(["todos", page, limit]);

      if (!previousData) {
        console.warn("⚠️ Cache kosong! Fetch ulang nanti.");
        return;
      }

      console.log("📂 Data todos di cache sebelum delete:", previousData);

      // 🔄 Optimistis hapus todo dari cache
      queryClient.setQueryData(["todos", page, limit], {
        ...previousData,
        todos: previousData.todos.filter((todo) => todo.id !== todoId),
      });

      return { previousData };
    },

    onError: (_error, _todoId, context) => {
      if (context?.previousData) {
        console.log("❌ Hapus gagal, rollback ke data lama!", context.previousData);
        queryClient.setQueryData(["todos", page, limit], context.previousData);
      }
    },

    onSettled: () => {
      console.log("✅ Hapus selesai, refresh data dari server.");
      queryClient.invalidateQueries({ queryKey: ["todos", page, limit] });
    },
  });
};
