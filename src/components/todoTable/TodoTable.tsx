import { FilterPanel } from './FilterPanel'
import { Filters } from '@/types'
import { Pagination } from '@/components'
import { useTodoList } from '@/hooks'

const ITEMS_PER_PAGE = 15

export const TodoTable = () => {
  const { todoList, filtering } = useTodoList<Filters>(
    {
      completedStatus: '',
      order: 'asc',
      sortBy: 'id',
      title: '',
    },
    ITEMS_PER_PAGE
  )

  const totalPages = Math.ceil((todoList.length || 0) / ITEMS_PER_PAGE)

  return (
    <>
      <FilterPanel filters={filtering.filters} setFilters={filtering.setFilters} />
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
              todoList.data.map(({ completed, id, title, username }) => (
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
      <Pagination currentPage={todoList.currentPage} totalPages={totalPages} onPageChange={todoList.setCurrentPage} />
    </>
  )
}
