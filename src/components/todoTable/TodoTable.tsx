import { applyTodoFilters, getTodoListWithUsernames, sortTasks } from '@/services'

import { FilterPanel } from './FilterPanel'
import type { Filters } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const TodoTable = () => {
  const {
    data: todoList,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ['todoList'],
    queryFn: getTodoListWithUsernames,
  })

  const [filters, setFilters] = useState<Filters>({
    title: '',
    completedStatus: '',
    sortBy: 'id',
    order: 'asc',
  })

  const filteredTodoList = (isSuccess ? todoList : [])
    .filter(todo => applyTodoFilters(todo, filters))
    .sort((a, b) => sortTasks(a, b, filters))

  if (isError) return <div>failed to load</div>

  return (
    <>
      <FilterPanel filters={filters} setFilters={setFilters} />
      <div className="overflow-x-auto w-full max-w-[95%] mx-auto bg-white rounded border-2">
        <table className="w-full whitespace-pre-line">
          <thead className="text-xs font-semibold uppercase text-white bg-gray-500 text-left">
            <tr>
              <th className="p-2">id</th>
              <th className="p-2">user</th>
              <th className="p-2">title</th>
              <th className="p-2">completed</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {isLoading ? (
              <tr className="p-2">
                <td colSpan={4}>loading</td>
              </tr>
            ) : (
              filteredTodoList.map(({ completed, id, title, username }) => (
                <tr key={id}>
                  <td className="p-2">{id}</td>
                  <td className="p-2">{username}</td>
                  <td className="p-2">{title}</td>
                  <td className="p-2">{String(completed)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
