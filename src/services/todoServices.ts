import { api } from './api';

// ✅ Fetch Todos
export const fetchTodos = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/todos?page=${page}&limit=${limit}&order=dsc`
  );
  console.log('📥 Fetch Todos Response:', response.data);
  return response.data;
};

// ✅ Add Todo
export const addTodo = async (todo: {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}) => {
  const response = await api.post('/todos', todo);
  return response.data;
};

// ✅ Update Todo
export const updateTodo = async ({
  id,
  title,
  completed,
  date,
}: {
  id: string;
  title: string;
  completed: boolean;
  date?: string;
}) => {
  const formattedData = {
    title,
    completed: Boolean(completed),
    date: date ? new Date(date).toISOString() : undefined,
  };

  console.log('📡 Sending Update Request:', formattedData);

  const response = await api.put(`/todos/${id}`, formattedData);
  return response.data;
};

// ✅ Delete Todo
export const deleteTodo = async (id: string) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};
