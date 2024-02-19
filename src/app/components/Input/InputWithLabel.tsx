import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InputWithLabelProps{
    label: string;
    type: string;
    placeholder?: string;
    onChange: (value: string) => void;
    value?: string;
}

export default function InputWithLabel({label, type, placeholder, onChange,value} : InputWithLabelProps) {
  return (
    <div className="w-full">
      <Label htmlFor="email">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} type={type} id={label} placeholder={placeholder || label} />
    </div>
  )
}
