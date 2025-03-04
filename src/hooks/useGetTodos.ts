import { useQuery } from "@tanstack/react-query"; // Mengimpor useQuery dari React Query
import { fetchTodos } from "../services/todoServices"; // Mengimpor fungsi API untuk mengambil daftar todo

// ✅ Custom Hook untuk mendapatkan daftar todo dengan pagination
export const useGetTodos = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["todos", page, limit], // 🏷️ Key unik berdasarkan halaman dan limit untuk caching & invalidation

    queryFn: () => {
      console.log("📡 Fetching todos dari server...");
      return fetchTodos(page, limit); // 📤 Memanggil API untuk mengambil todo
    },

    placeholderData: (previousData) => {
      console.log("🔄 Pakai placeholderData:", previousData);
      return previousData; // ⏳ Menampilkan data sebelumnya sementara data baru di-fetch
    },
  });
};
