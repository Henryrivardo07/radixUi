import { forwardRef } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

interface TodoCheckboxProps {
  children: React.ReactNode;
}

const TodoCheckbox = ({ children }: TodoCheckboxProps) => {
  return <div className="flex items-center gap-2">{children}</div>;
};

interface TodoCheckboxRootProps extends React.ComponentPropsWithoutRef<typeof Checkbox.Root> {
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

TodoCheckbox.Root = forwardRef<HTMLButtonElement, TodoCheckboxRootProps>(({ defaultChecked, onCheckedChange, ...props }, ref) => {
  return (
    <Checkbox.Root ref={ref} className="w-5 h-5 border rounded flex items-center justify-center data-[state=checked]:bg-blue-500" defaultChecked={defaultChecked} onCheckedChange={onCheckedChange} {...props}>
      <Checkbox.Indicator>
        <CheckIcon className="w-4 h-4 text-white" />
      </Checkbox.Indicator>
    </Checkbox.Root>
  );
});

TodoCheckbox.Indicator = () => {
  return (
    <Checkbox.Indicator>
      <CheckIcon className="w-4 h-4 text-white" />
    </Checkbox.Indicator>
  );
};

export default TodoCheckbox;
