import type { Filters, Todo, TodoWithUser, User } from '@/types'
import { useEffect, useState } from 'react'

import { fetchData } from '@/utils'

export const useTodoList = <T extends Filters>(filtersObject: T, limit = 15) => {
  const [filters, setFilters] = useState<T>(filtersObject)
  const [currentPage, setCurrentPage] = useState(1)
  const [todoListWithUsernames, setTodoListWithUsernames] = useState<TodoWithUser[]>([])
  const [todoListLength, setTodoListLength] = useState(0)

  useEffect(() => {
    const getTodoListWithUsernames = async () => {
      const { completedStatus, sortBy, order } = filters
      const [todoList, users] = await Promise.all([
        fetchData<Todo[]>(
          `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${currentPage}&_sort=${sortBy}&_order=${order}&title_like=${filters}&completed_like=${completedStatus}`
        ),
        fetchData<User[]>('https://jsonplaceholder.typicode.com/users'),
      ])
      if (todoList && users) {
        setTodoListWithUsernames(
          todoList.map(todo => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { userId, ...rest } = todo
            return {
              ...rest,
              username: users.find(user => user.id === todo.userId)?.name || 'unknown',
            }
          })
        )
      }
    }

    getTodoListWithUsernames()
  }, [currentPage, filters, limit])

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  useEffect(() => {
    const getTotalPages = async () => {
      const todoList = await fetchData<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      setTodoListLength(todoList?.length || 0)
    }

    getTotalPages()
  }, [])

  return {
    todoList: {
      data: todoListWithUsernames,
      length: todoListLength,
      currentPage,
      setCurrentPage,
    },

    filtering: {
      filters,
      setFilters,
    },
  }
}
