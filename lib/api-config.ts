export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001';

export const API_ENDPOINTS = {
  orders: `${API_BASE_URL}/api/orders`,
  // Adicione outros endpoints conforme necessário
} as const;
