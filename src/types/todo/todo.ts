import type { User } from '@/types'

export interface Todo {
  userId: User['id']
  id: number
  title: string
  completed: boolean
}
