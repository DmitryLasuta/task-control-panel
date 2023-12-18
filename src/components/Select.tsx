interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  dataSet: (string | number)[]
  label: string
}

export const Select = ({ dataSet, label, ...attributes }: SelectProps) => {
  return (
    <label className="capitalize block font-medium text-gray-700 w-full">
      <span className="block"> {label}</span>
      <select className="w-full px-2 py-1 border-2 rounded capitalize" {...attributes}>
        {!attributes.defaultValue && <option value=""></option>}
        {dataSet.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </label>
  )
}
