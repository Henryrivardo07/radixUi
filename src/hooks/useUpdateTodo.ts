import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../services/todoServices";
import { Todo } from "../types";

export const useUpdateTodo = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedTodo: Todo) => {
      console.log("📡 Sending Update Request:", updatedTodo);
      return updateTodo(updatedTodo);
    },

    onMutate: async (updatedTodo: Todo) => {
      console.log("🔄 Optimistic UI: Mengubah UI sebelum request selesai", updatedTodo);

      // ❗ Batalkan fetch todos yang sedang berjalan
      await queryClient.cancelQueries({ queryKey: ["todos", page, limit] });

      // ✅ Ambil data sebelum diubah
      const previousData = queryClient.getQueryData<{
        todos: Todo[];
        totalTodos: number;
        hasNextPage: boolean;
        nextPage: number;
      }>(["todos", page, limit]);

      if (!previousData) {
        console.warn("⚠️ Cache kosong! Fetch ulang nanti.");
        return;
      }

      console.log("📂 Data todos di cache sebelum update:", previousData);

      // 🔄 Update UI dengan data baru secara optimistis
      queryClient.setQueryData(["todos", page, limit], {
        ...previousData,
        todos: previousData.todos.map((todo) => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo)),
      });

      return { previousData };
    },

    onError: (_error, _updatedTodo, context) => {
      if (context?.previousData) {
        console.log("❌ Update gagal, rollback ke data lama!", context.previousData);
        queryClient.setQueryData(["todos", page, limit], context.previousData);
      }
    },

    onSettled: () => {
      console.log("✅ Update selesai, refresh data dari server.");
      queryClient.invalidateQueries({ queryKey: ["todos", page, limit] });
    },
  });
};
