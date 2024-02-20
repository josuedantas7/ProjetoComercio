import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps{
    label: string;
    type: string;
    placeholder?: string;
    onChange?: (value: number) => void;
    name?: string;
}

export default function InputWithLabelNumber({name,label, type, placeholder, onChange} : InputWithLabelProps) {
  return (
    <div className="w-full">
      <Label htmlFor="email">{label}</Label>
      <Input name={name} type={type} id={label} placeholder={placeholder || label} />
    </div>
  )
}
