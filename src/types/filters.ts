export interface Filters {
  title: string
  completedStatus: '' | 'false' | 'true'
  sortBy: 'id' | 'title'
  order: 'asc' | 'desc'
}
