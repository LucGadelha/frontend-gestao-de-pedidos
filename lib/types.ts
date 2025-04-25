export type OrderStatus = "Pendente" | "Processando" | "Finalizado"

export interface Order {
  id: string
  customer: string
  product: string
  value: number
  status: OrderStatus
  createdAt: string
}

export interface PaginatedResult<T> {
  items: T[]
  pageIndex: number
  pageSize: number
  totalCount: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface OrdersResponse extends PaginatedResult<Order> {}
