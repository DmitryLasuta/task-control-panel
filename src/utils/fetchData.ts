export const fetchData = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: T = await response.json()
    return data
  } catch (error) {
    const { message } = error as Error
    console.error(`Error fetching data from ${url}: ${message}`)
  }
}
