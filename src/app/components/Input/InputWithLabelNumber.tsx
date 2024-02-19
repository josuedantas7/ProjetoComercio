import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps{
    label: string;
    type: string;
    placeholder?: string;
    onChange: (value: number) => void;
}

export default function InputWithLabelNumber({label, type, placeholder, onChange} : InputWithLabelProps) {
  return (
    <div className="w-full">
      <Label htmlFor="email">{label}</Label>
      <Input onChange={(e) => onChange(parseFloat(e.target.value))} type={type} id={label} placeholder={placeholder || label} />
    </div>
  )
}
