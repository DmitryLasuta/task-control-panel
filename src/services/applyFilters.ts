import type { Filters, TodoWithUser } from '@/types'

export const applyTodoFilters = (
  { title: todoTitle, completed }: TodoWithUser,
  { title, completedStatus }: Filters
) => {
  return (
    (!title || todoTitle.includes(title)) &&
    (!completedStatus || (completedStatus === 'true' && completed) || (completedStatus === 'false' && !completed))
  )
}
