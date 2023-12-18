interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  type?: 'text' | 'password' | 'email' | 'tel'
  label: string
}

export const TextInput = ({ type = 'text', label, ...attributes }: TextInputProps) => {
  return (
    <label className="flex flex-col">
      <span className="block">{label}</span>
      <input className="border border-slate-300 rounded-md px-2 py-1" type={type} {...attributes} />
    </label>
  )
}
