import type { Todo } from './todo'

export interface TodoWithUser extends Omit<Todo, 'userId'> {
  username: string
}
