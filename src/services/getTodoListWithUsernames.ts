import type { Todo, TodoWithUser, User } from '@/types'

import { fetchData } from '@/utils'

export const getTodoListWithUsernames = async (): Promise<TodoWithUser[]> => {
  const [todoList, users] = await Promise.all([
    fetchData<Todo[]>('https://jsonplaceholder.typicode.com/todos'),
    fetchData<User[]>('https://jsonplaceholder.typicode.com/users'),
  ])

  if (todoList && users) {
    return todoList.map(todo => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { userId, ...rest } = todo
      return {
        ...rest,
        username: users.find(user => user.id === todo.userId)?.name || 'unknown',
      }
    })
  } else {
    return []
  }
}
