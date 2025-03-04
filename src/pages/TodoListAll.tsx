import { useGetInfiniteTodos } from "../hooks/useGetInfiniteTodos";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { DialogRoot, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../components/ui/Dialog";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@radix-ui/themes";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const TodoListAll = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteTodos();
  const observerRef = useIntersectionObserver(() => {
    if (hasNextPage) fetchNextPage();
  });
  const [editTitle, setEditTitle] = useState("");

  return (
    <div className="container mx-auto p-6 max-w-xl">
      <h2 className="text-3xl font-bold text-center mb-4">All Todos</h2>

      <div className="space-y-3">
        {data?.pages.map((page) =>
          page.todos.map((todo: Todo) => (
            <div key={todo.id} className="flex items-center justify-between p-3 border rounded-lg shadow-md bg-gray-50">
              <span className="text-lg text-gray-800">{todo.title}</span>
              <DialogRoot>
                <DialogTrigger>
                  <Button className="bg-blue-500 text-white px-3 py-1 rounded">✏️ Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Edit Todo</DialogTitle>
                  <DialogDescription>Modify your task below.</DialogDescription>
                  <input type="text" className="border p-2 w-full mt-2" defaultValue={todo.title} onChange={(e) => setEditTitle(e.target.value)} />
                  <div className="flex justify-end gap-2 mt-4">
                    <DialogClose>Cancel</DialogClose>
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2">Save {isFetchingNextPage && <Loader2 className="animate-spin w-4 h-4" />}</Button>
                  </div>
                </DialogContent>
              </DialogRoot>
            </div>
          ))
        )}
      </div>
      <div ref={observerRef} className="mt-4 text-center text-gray-500">
        {isFetchingNextPage && <Loader2 className="animate-spin w-6 h-6 mx-auto" />}
      </div>
    </div>
  );
};
