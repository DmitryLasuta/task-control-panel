import type { Filters, TodoWithUser } from '@/types'
import { applyTodoFilters, getTodoListWithUsernames, sortTasks } from '@/services'
import { useEffect, useState } from 'react'

import { FilterPanel } from './FilterPanel'
import { Pagination } from '@/components'
import { paginateData } from '@/utils'

const ITEMS_PER_PAGE = 15

export const TodoTable = () => {
  const [todoList, setTodoList] = useState<TodoWithUser[]>([])

  useEffect(() => {
    getTodoListWithUsernames().then(setTodoList)
  }, [])

  const [filters, setFilters] = useState<Filters>({
    title: '',
    completedStatus: '',
    sortBy: 'id',
    order: 'asc',
  })
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const filteredTodoList = todoList
    .filter(todo => applyTodoFilters(todo, filters))
    .sort((a, b) => sortTasks(a, b, filters))

  const paginatedTodoList = paginateData(filteredTodoList, currentPage, ITEMS_PER_PAGE)

  const totalPages = Math.ceil((filteredTodoList?.length || 0) / ITEMS_PER_PAGE)

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
            {todoList.length === 0 ? (
              <tr className="p-2">
                <td colSpan={4}>loading</td>
              </tr>
            ) : (
              paginatedTodoList.map(({ completed, id, title, username }) => (
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
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  )
}
