import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../services/todoServices";
import { Todo } from "../types";

export const useAddTodo = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,

    onMutate: async (newTodo: Todo) => {
      console.log("🔄 Optimistic UI: Menambah todo sebelum request selesai", newTodo);

      await queryClient.cancelQueries({ queryKey: ["todos", page, limit] });

      // Ambil daftar todos dari cache halaman saat ini
      const previousTodos = queryClient.getQueryData<{ todos: Todo[]; totalTodos: number }>(["todos", page, limit]);

      console.log("🗂️ Cache lama sebelum diubah:", previousTodos);

      if (previousTodos) {
        queryClient.setQueryData(["todos", page, limit], {
          ...previousTodos,
          todos: [newTodo, ...previousTodos.todos], // Tambah todo baru di depan
          totalTodos: previousTodos.totalTodos + 1, // Update jumlah total
        });
      }

      console.log("🆕 Cache setelah ditambahkan:", queryClient.getQueryData(["todos", page, limit]));

      return { previousTodos };
    },

    onError: (error, _, context) => {
      console.error("❌ Gagal menambah todo, rollback ke data lama!", error);
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos", page, limit], context.previousTodos);
      }
    },

    onSettled: async () => {
      console.log("🔄 Refresh data dari server setelah todo berhasil ditambahkan");
      await queryClient.invalidateQueries({ queryKey: ["todos", page, limit] });
    },
  });
};
