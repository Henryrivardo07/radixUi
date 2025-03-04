import * as DialogPrimitive from "@radix-ui/react-dialog"; // Mengimpor semua komponen Dialog dari Radix UI sebagai "DialogPrimitive"
import { ReactNode } from "react"; // Mengimpor ReactNode untuk mendefinisikan tipe prop children

// Mendefinisikan interface untuk properti komponen Dialog
interface DialogProps {
  children: ReactNode; // children digunakan untuk menerima elemen React sebagai anak komponen
}

// Komponen utama DialogRoot yang membungkus semua elemen dialog
export function DialogRoot({ children }: DialogProps) {
  return <DialogPrimitive.Root>{children}</DialogPrimitive.Root>; // Menggunakan Root dari Radix UI sebagai container utama
}

// Komponen untuk memicu dialog muncul (button atau elemen interaktif lain)
export function DialogTrigger({ children }: DialogProps) {
  return (
    <DialogPrimitive.Trigger className="bg-blue-600 text-white px-4 py-2 rounded-lg">
      {children} {/* Menampilkan isi tombol trigger */}
    </DialogPrimitive.Trigger>
  );
}

// Komponen untuk menampilkan konten utama dialog
export function DialogContent({ children }: DialogProps) {
  return (
    <DialogPrimitive.Portal>
      {" "}
      {/* Memastikan dialog ditampilkan di luar hirarki DOM utama */}
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" /> {/* Overlay semi-transparan */}
      <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">
        {children} {/* Menampilkan konten di dalam dialog */}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

// Komponen untuk judul dialog
export function DialogTitle({ children }: DialogProps) {
  return <DialogPrimitive.Title className="text-lg font-bold">{children}</DialogPrimitive.Title>;
}

// Komponen untuk deskripsi dialog
export function DialogDescription({ children }: DialogProps) {
  return <DialogPrimitive.Description className="text-gray-500">{children}</DialogPrimitive.Description>;
}

// Komponen untuk tombol menutup dialog
export function DialogClose({ children }: DialogProps) {
  return (
    <DialogPrimitive.Close className="bg-gray-400 text-white px-3 py-1 rounded">
      {children} {/* Tombol untuk menutup dialog */}
    </DialogPrimitive.Close>
  );
}
