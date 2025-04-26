import type { Order, OrdersResponse } from "@/lib/types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5158"

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

  const response = await fetch(`${API_URL}/api/orders${params.toString() ? `?${params.toString()}` : ''}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar pedidos: ${response.statusText}`)
  }

  // Mapear a resposta do backend para o formato esperado pelo frontend
  const data = await response.json()
  
  // Se o backend ainda não implementa paginação, adapte a resposta
  if (Array.isArray(data)) {
    const orders = data.map(item => ({
      id: item.id,
      customer: item.cliente,
      product: item.produto,
      value: item.valor,
      status: item.status,
      createdAt: item.dataCriacao
    }))
    
    return {
      items: orders,
      pageIndex: page,
      pageSize: pageSize,
      totalCount: orders.length,
      totalPages: Math.ceil(orders.length / pageSize),
      hasNextPage: page * pageSize < orders.length,
      hasPreviousPage: page > 1
    }
  }
  
  return data
}

// Função para obter um pedido pelo ID
export async function getOrderById(id: string): Promise<Order> {
  const response = await fetch(`${API_URL}/api/orders/${id}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar pedido: ${response.statusText}`)
  }

  // Mapeia a resposta do backend para o modelo do frontend
  const data = await response.json()
  return {
    id: data.id,
    customer: data.cliente,
    product: data.produto,
    value: data.valor,
    status: data.status,
    createdAt: data.dataCriacao
  }
}

// Função para criar um novo pedido
export async function createOrder(orderData: {
  customer: string
  product: string
  value: number
}): Promise<Order> {
  // Mapeamento do modelo do frontend para o backend
  const backendData = {
    cliente: orderData.customer,
    produto: orderData.product,
    valor: orderData.value
  }

  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(backendData),
  })

  if (!response.ok) {
    throw new Error(`Erro ao criar pedido: ${response.statusText}`)
  }

  // Mapeia a resposta do backend para o modelo do frontend
  const data = await response.json()
  return {
    id: data.id,
    customer: data.cliente,
    product: data.produto,
    value: data.valor,
    status: data.status,
    createdAt: data.dataCriacao
  }
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
  // Mapeamento do modelo do frontend para o backend
  const backendData = {
    cliente: orderData.customer,
    produto: orderData.product,
    valor: orderData.value
  }

  const response = await fetch(`${API_URL}/api/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(backendData),
  })

  if (!response.ok) {
    throw new Error(`Erro ao atualizar pedido: ${response.statusText}`)
  }

  // Mapeia a resposta do backend para o modelo do frontend
  const data = await response.json()
  return {
    id: data.id,
    customer: data.cliente,
    product: data.produto,
    value: data.valor,
    status: data.status,
    createdAt: data.dataCriacao
  }
}

// Função para excluir um pedido
export async function deleteOrder(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/api/orders/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`Erro ao excluir pedido: ${response.statusText}`)
  }
}
