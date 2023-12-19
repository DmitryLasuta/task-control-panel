import { Select, TextInput } from '@/components/common'

import type { Filters } from '@/types'

interface FilterPanelProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

const selectData: { label: string; name: keyof Filters; options: string[] }[] = [
  { label: 'Completed', name: 'completedStatus', options: ['', 'true', 'false'] },
  { label: 'Sort by', name: 'sortBy', options: ['id', 'title'] },
  { label: 'Order', name: 'order', options: ['asc', 'desc'] },
]

export const FilterPanel = ({ filters, setFilters }: FilterPanelProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <TextInput
        label="title"
        value={filters.title}
        onChange={({ target }) => setFilters({ ...filters, title: target.value })}
      />
      {selectData.map(({ label, name, options }) => (
        <Select
          key={name}
          label={label}
          dataSet={options}
          value={filters[name]}
          onChange={({ target }) => setFilters({ ...filters, [name]: target.value })}
        />
      ))}
    </div>
  )
}
