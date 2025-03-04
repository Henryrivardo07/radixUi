import { useInfiniteQuery } from "@tanstack/react-query"; // Mengimpor hook untuk infinite query
import { fetchTodos } from "../services/todoServices"; // Mengimpor fungsi API untuk mengambil daftar todo

// ✅ Custom Hook untuk mendapatkan daftar todo secara infinite scroll
export const useGetInfiniteTodos = () => {
  return useInfiniteQuery({
    queryKey: ["todos"], // 🏷️ Key unik untuk query caching dan invalidation

    // 🔄 Fungsi yang mengambil data todos dari API berdasarkan halaman
    queryFn: ({ pageParam = 1 }) => fetchTodos(pageParam, 10),
    initialPageParam: 1,

    // 📌 Menentukan halaman berikutnya untuk pagination
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextPage : undefined),
  });
};

/* 📌 Penjelasan Tiap Bagian

🔹 Menggunakan useInfiniteQuery untuk Infinite Scrolling
   - useInfiniteQuery memungkinkan pagination otomatis saat pengguna scroll ke bawah.

🔹 queryKey: ["todos"]
   - Menggunakan key "todos" agar data ini bisa dikelola oleh React Query (caching, refetching, dsb.).

🔹 Fungsi queryFn (Fetch Data per Halaman)
   - pageParam = 1 → Halaman default pertama yang akan diambil.
   - fetchTodos(pageParam, 10) → Memanggil API untuk mengambil 10 todo per halaman.

🔹 Fungsi getNextPageParam (Menentukan Halaman Berikutnya)
   - lastPage.hasNextPage ? lastPage.nextPage : undefined
   - Jika masih ada halaman berikutnya, kita kembalikan lastPage.nextPage sebagai pageParam untuk fetch berikutnya.
   - Jika tidak ada halaman berikutnya, kita kembalikan undefined, yang akan menghentikan infinite scroll.
*/
