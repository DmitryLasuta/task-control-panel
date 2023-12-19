import { TodoTable } from '@/components'

export const App = () => {
  return (
    <main className="p-4">
      <h1 className="text-3xl uppercase mb-6">Task Control Panel</h1>
      <TodoTable />
    </main>
  )
}
