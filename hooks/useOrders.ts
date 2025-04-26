import { useState, useEffect } from 'react';
import { apiService, Order } from '@/lib/api-service';

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      const data = await apiService.getOrders();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch orders'));
    } finally {
      setLoading(false);
    }
  }

  async function createOrder(order: Omit<Order, 'id' | 'createdAt'>) {
    try {
      const newOrder = await apiService.createOrder(order);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create order'));
      throw err;
    }
  }

  async function updateOrder(id: string, orderData: Partial<Order>) {
    try {
      const updatedOrder = await apiService.updateOrder(id, orderData);
      setOrders(prev => prev.map(order => 
        order.id === id ? updatedOrder : order
      ));
      return updatedOrder;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update order'));
      throw err;
    }
  }

  async function deleteOrder(id: string) {
    try {
      await apiService.deleteOrder(id);
      setOrders(prev => prev.filter(order => order.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete order'));
      throw err;
    }
  }

  return {
    orders,
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
    refreshOrders: fetchOrders,
  };
}
