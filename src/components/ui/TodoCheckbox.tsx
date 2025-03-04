import { forwardRef } from "react"; // Mengimpor forwardRef untuk meneruskan ref ke elemen anak
import * as Checkbox from "@radix-ui/react-checkbox"; // Mengimpor komponen Checkbox dari Radix UI
import { CheckIcon } from "@radix-ui/react-icons"; // Mengimpor ikon centang dari Radix UI

// Mendefinisikan tipe props untuk komponen TodoCheckbox
interface TodoCheckboxProps {
  children: React.ReactNode; // children digunakan untuk menerima elemen React
}

// Komponen utama TodoCheckbox sebagai wrapper
const TodoCheckbox = ({ children }: TodoCheckboxProps) => {
  return <div className="flex items-center gap-2">{children}</div>; // Membuat container flex untuk checkbox dan teks
};

// Mendefinisikan tipe props untuk Root Checkbox
interface TodoCheckboxRootProps extends React.ComponentPropsWithoutRef<typeof Checkbox.Root> {
  defaultChecked?: boolean; // Status default dari checkbox (checked / unchecked)
  onCheckedChange?: (checked: boolean) => void; // Callback saat checkbox berubah
}

// Menambahkan properti Root ke dalam TodoCheckbox sebagai komponen utama checkbox
TodoCheckbox.Root = forwardRef<HTMLButtonElement, TodoCheckboxRootProps>(({ defaultChecked, onCheckedChange, ...props }, ref) => {
  return (
    <Checkbox.Root
      ref={ref} // Meneruskan ref ke Checkbox
      className="w-5 h-5 border rounded flex items-center justify-center data-[state=checked]:bg-blue-500"
      defaultChecked={defaultChecked} // Menentukan apakah checkbox default dicentang
      onCheckedChange={onCheckedChange} // Menjalankan callback saat perubahan terjadi
      {...props} // Menyebarkan properti tambahan
    >
      <Checkbox.Indicator>
        <CheckIcon className="w-4 h-4 text-white" /> {/* Ikon centang muncul saat checkbox dicentang */}
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
});

// Menambahkan indikator checkbox ke dalam TodoCheckbox
TodoCheckbox.Indicator = () => {
  return (
    <Checkbox.Indicator>
      <CheckIcon className="w-4 h-4 text-white" /> {/* Ikon centang */}
    </Checkbox.Indicator>
  );
};

export default TodoCheckbox; // Mengekspor komponen utama TodoCheckbox
