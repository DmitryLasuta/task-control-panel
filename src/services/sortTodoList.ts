import type { Filters, TodoWithUser } from '@/types'

export const sortTasks = (a: TodoWithUser, b: TodoWithUser, { order, sortBy: sortByFilter }: Filters) => {
  const sortOrder = order === 'asc' ? 1 : -1
  const sortBy = sortByFilter || 'id'

  if (sortBy === 'id') {
    return sortOrder * (a.id - b.id)
  } else if (sortBy === 'title') {
    return sortOrder * a.title.localeCompare(b.title)
  }
  return 0
}
