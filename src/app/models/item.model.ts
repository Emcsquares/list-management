export interface Item {
  id: string
  text: string
  done: boolean
  createdAt: number
  updatedAt: number
}

export type FilterType = "all" | "active" | "done"
