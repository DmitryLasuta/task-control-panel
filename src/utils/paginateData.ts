export const paginateData = <T>(data: T[], currentPage = 1, itemsPerPage: number) => {
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  return data.slice(startIndex, endIndex)
}
