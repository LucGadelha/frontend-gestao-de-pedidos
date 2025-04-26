import { API_ENDPOINTS } from './api-config';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, await response.text());
  }
  return response.json();
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  status: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
}

export const apiService = {
  // Buscar todos os pedidos
  async getOrders(): Promise<Order[]> {
    const response = await fetch(API_ENDPOINTS.orders);
    return handleResponse<Order[]>(response);
  },

  // Buscar um pedido específico
  async getOrder(id: string): Promise<Order> {
    const response = await fetch(`${API_ENDPOINTS.orders}/${id}`);
    return handleResponse<Order>(response);
  },

  // Criar um novo pedido
  async createOrder(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const response = await fetch(API_ENDPOINTS.orders, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return handleResponse<Order>(response);
  },

  // Atualizar um pedido
  async updateOrder(id: string, order: Partial<Order>): Promise<Order> {
    const response = await fetch(`${API_ENDPOINTS.orders}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    return handleResponse<Order>(response);
  },

  // Deletar um pedido
  async deleteOrder(id: string): Promise<void> {
    const response = await fetch(`${API_ENDPOINTS.orders}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse<void>(response);
  },
};
