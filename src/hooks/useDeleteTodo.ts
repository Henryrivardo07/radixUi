import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "../services/todoServices";

// ✅ Custom Hook untuk menghapus todo dari daftar
export const useDeleteTodo = () => {
  const queryClient = useQueryClient(); // 🔄 Mengakses QueryClient untuk caching & update data

  return useMutation({
    mutationFn: deleteTodo, // 📤 Memanggil fungsi API untuk menghapus todo berdasarkan ID

    onSuccess: () => {
      // ✅ Jika sukses, invalidasi query agar daftar todo diperbarui
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
/*
📌 Penjelasan Tiap Bagian:
Menggunakan useMutation untuk Menghapus Todo

mutationFn: deleteTodo → Memanggil API deleteTodo untuk menghapus todo berdasarkan ID.
Menggunakan onSuccess untuk Refresh Data

queryClient.invalidateQueries({ queryKey: ["todos"] })
Fungsi ini memastikan daftar todo diperbarui setelah ada yang dihapus.
Mencegah tampilan usang yang masih menampilkan todo yang telah dihapus.
Menggunakan useQueryClient untuk Cache Management

Dengan queryClient, kita dapat mengatur ulang data secara efisien tanpa harus reload seluruh aplikasi.
*/
