import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "../services/todoServices";

export const useGetTodos = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["todos", page, limit],
    queryFn: () => {
      console.log("📡 Fetching todos dari server...");
      return fetchTodos(page, limit);
    },
    placeholderData: (previousData) => {
      console.log("🔄 Pakai placeholderData:", previousData);
      return previousData;
    },
  });
};
