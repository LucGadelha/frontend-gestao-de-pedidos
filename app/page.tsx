import { OrdersTable } from "@/components/orders/orders-table"
import { PageHeader } from "@/components/page-header"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <PageHeader title="Gestão de Pedidos" description="Gerencie todos os pedidos do sistema" />
      <OrdersTable />
    </main>
  )
}
