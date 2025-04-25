import type { Order, OrdersResponse } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// Função para obter todos os pedidos com paginação
export async function getOrders(page = 1, pageSize = 10, sortBy?: string, sortDesc?: boolean): Promise<OrdersResponse> {
  const params = new URLSearchParams({
    pageIndex: page.toString(),
    pageSize: pageSize.toString(),
  })

  if (sortBy) {
    params.append("sortBy", sortBy)
    params.append("sortDesc", sortDesc ? "true" : "false")
  }

  const response = await fetch(`${API_URL}/orders?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar pedidos: ${response.statusText}`)
  }

  return await response.json()
}

// Função para obter um pedido pelo ID
export async function getOrderById(id: string): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${id}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar pedido: ${response.statusText}`)
  }

  return await response.json()
}

// Função para criar um novo pedido
export async function createOrder(orderData: {
  customer: string
  product: string
  value: number
}): Promise<Order> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    throw new Error(`Erro ao criar pedido: ${response.statusText}`)
  }

  return await response.json()
}

// Função para atualizar um pedido existente
export async function updateOrder(
  id: string,
  orderData: {
    customer: string
    product: string
    value: number
  },
): Promise<Order> {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    throw new Error(`Erro ao atualizar pedido: ${response.statusText}`)
  }

  return await response.json()
}

// Função para excluir um pedido
export async function deleteOrder(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Erro ao excluir pedido: ${response.statusText}`)
  }
}
