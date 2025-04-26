import { useOrders } from '@/hooks/useOrders';

export function OrdersList() {
  const { orders, loading, error, refreshOrders } = useOrders();

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Pedidos</h2>
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={refreshOrders}
      >
        Atualizar lista
      </button>
      {loading && <div>Carregando pedidos...</div>}
      {error && <div className="text-red-600">Erro: {error.message}</div>}
      {!loading && orders.length === 0 && <div>Nenhum pedido encontrado.</div>}
      <ul className="space-y-4">
        {orders.map(order => (
          <li key={order.id} className="border p-4 rounded shadow">
            <div className="font-semibold">Cliente: {order.customerName}</div>
            <div>Status: {order.status}</div>
            <div>Criado em: {new Date(order.createdAt).toLocaleString()}</div>
            <div>Itens:
              <ul className="ml-4 list-disc">
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.productName} - {item.quantity} x R$ {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
