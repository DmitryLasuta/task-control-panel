import { useId } from 'react'

interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className' | 'id'> {
  type?: 'text' | 'password' | 'email' | 'tel'
  label: string
}

export const TextInput = ({ type = 'text', label, ...attributes }: TextInputProps) => {
  const inputId = useId()

  return (
    <div className="flex flex-col gap-1">
      <label className="block" htmlFor={inputId}>
        {label}
      </label>
      <input className="border border-slate-300 rounded-md px-2 py-1" type={type} id={inputId} {...attributes} />
    </div>
  )
}
