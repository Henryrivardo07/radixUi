import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface DialogProps {
  children: ReactNode;
}

export function DialogRoot({ children }: DialogProps) {
  return <DialogPrimitive.Root>{children}</DialogPrimitive.Root>;
}

export function DialogTrigger({ children }: DialogProps) {
  return <DialogPrimitive.Trigger className="bg-blue-600 text-white px-4 py-2 rounded-lg">{children}</DialogPrimitive.Trigger>;
}

export function DialogContent({ children }: DialogProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40" />
      <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg">{children}</DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogTitle({ children }: DialogProps) {
  return <DialogPrimitive.Title className="text-lg font-bold">{children}</DialogPrimitive.Title>;
}

export function DialogDescription({ children }: DialogProps) {
  return <DialogPrimitive.Description className="text-gray-500">{children}</DialogPrimitive.Description>;
}

export function DialogClose({ children }: DialogProps) {
  return <DialogPrimitive.Close className="bg-gray-400 text-white px-3 py-1 rounded">{children}</DialogPrimitive.Close>;
}
