import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps{
    label: string;
    type: string;
    placeholder?: string;
    onChange?: (value: string) => void | null;
    value?: string;
    name?: string;
}

export default function InputWithLabel({name,label, type, placeholder, onChange,value} : InputWithLabelProps) {
  return (
    <div className="w-full">
      <Label htmlFor={label}>{label}</Label>
      <Input name={name} value={value} type={type} id={label} placeholder={placeholder || label} />
    </div>
  )
}
