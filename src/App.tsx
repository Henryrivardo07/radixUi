import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import { TodoListAll } from "./pages/TodoListAll";

const AppRoutes = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/all" element={<TodoListAll />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
