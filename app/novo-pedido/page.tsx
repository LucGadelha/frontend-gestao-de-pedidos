import { CreateOrderForm } from "@/components/orders/create-order-form"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewOrderPage() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="Novo Pedido" description="Crie um novo pedido no sistema" />
        <Button asChild variant="outline">
          <Link href="/">Voltar</Link>
        </Button>
      </div>
      <div className="max-w-2xl mx-auto">
        <CreateOrderForm />
      </div>
    </main>
  )
}
