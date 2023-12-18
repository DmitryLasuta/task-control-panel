import { useId } from 'react'

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'id'> {
  dataSet: (string | number)[]
  label: string
}

export const Select = ({ dataSet, label, ...attributes }: SelectProps) => {
  const selectId = useId()
  return (
    <>
      <label htmlFor={selectId} className="capitalize block font-medium text-gray-700">
        {label}
      </label>
      <select className="w-full border-2 rounded capitalize" id={selectId} {...attributes}>
        {!attributes.defaultValue && <option value=""></option>}
        {dataSet.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  )
}
