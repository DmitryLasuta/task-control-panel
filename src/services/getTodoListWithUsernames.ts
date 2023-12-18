import type { Todo, User } from '@/types'

import { fetchData } from '@/utils'

interface TodoWithUser extends Todo {
  username: string
}

export const getTodoListWithUsernames = async (): Promise<TodoWithUser[]> => {
  const todoList = await fetchData<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  const users = await fetchData<User[]>('https://jsonplaceholder.typicode.com/users')

  if (todoList && users) {
    return todoList.map(todo => ({
      ...todo,
      username: users.find(user => user.id === todo.userId)?.name || 'unknown',
    }))
  } else {
    return []
  }
}
