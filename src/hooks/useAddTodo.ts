import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../services/todoServices";
import { Todo } from "../types";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,

    onMutate: async (newTodo: Todo) => {
      console.log("🔄 Optimistic UI: Menambah todo sebelum request selesai", newTodo);

      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData<{ todos: Todo[] }>(["todos"]) || { todos: [] };
      console.log("🗂️ Cache lama sebelum diubah:", previousTodos);

      // **✅ Pakai setQueriesData supaya UI langsung update**
      queryClient.setQueriesData(["todos"], (oldData: any) => ({
        todos: [newTodo, ...(oldData?.todos || [])],
      }));

      console.log("🆕 Cache setelah ditambahkan:", queryClient.getQueryData(["todos"]));

      return { previousTodos };
    },

    onError: (error, _, context) => {
      console.error("❌ Gagal menambah todo, rollback ke data lama!", error);
      if (context?.previousTodos) {
        queryClient.setQueriesData(["todos"], context.previousTodos);
      }
    },

    onSettled: async () => {
      console.log("🔄 Refresh data dari server setelah todo berhasil ditambahkan");
      await queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
