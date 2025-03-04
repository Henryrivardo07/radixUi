import { api } from "./api"; // Import instance API yang sudah dikonfigurasi sebelumnya

// ✅ Fetch Todos - Mengambil daftar todo dengan pagination
export const fetchTodos = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/todos?page=${page}&limit=${limit}&order=dsc` // Mengambil todos dari server dengan parameter page, limit, dan sorting descending
  );
  console.log("📥 Fetch Todos Response:", response.data); // Log hasil response untuk debugging
  return response.data; // Mengembalikan data todos
};

// ✅ Add Todo - Menambahkan todo baru ke server
export const addTodo = async (todo: { id: string; title: string; completed: boolean; date: string }) => {
  const response = await api.post("/todos", todo); // Mengirim data todo baru ke server menggunakan metode POST
  return response.data; // Mengembalikan data hasil response dari server
};

// ✅ Update Todo - Memperbarui todo berdasarkan ID
export const updateTodo = async ({ id, title, completed, date }: { id: string; title: string; completed: boolean; date?: string }) => {
  // Menyiapkan data yang akan dikirim dengan format yang sesuai
  const formattedData = {
    title,
    completed: Boolean(completed), // Memastikan nilai completed berupa boolean
    date: date ? new Date(date).toISOString() : undefined, // Mengonversi tanggal ke format ISO jika tersedia
  };

  console.log("📡 Sending Update Request:", formattedData); // Log data yang akan dikirim untuk debugging

  const response = await api.put(`/todos/${id}`, formattedData); // Mengirim data update ke server menggunakan metode PUT
  return response.data; // Mengembalikan data hasil response dari server
};

// ✅ Delete Todo - Menghapus todo berdasarkan ID
export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`); // Mengirim permintaan DELETE ke server
  return response.data; // Mengembalikan data hasil response dari server
};
