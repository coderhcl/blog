export type catecoryType = {
  id: number
  categoryname: string
}

export type tagType = {
  id: number
  tagname: string
}

export type articleDataType = {
  title: string
  category: string
  tags: string
  status: string
  isTop: boolean
  craetrd_at?: string
}
