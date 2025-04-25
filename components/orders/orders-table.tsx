"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { OrderStatus } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/utils"
import { useOrders } from "@/lib/hooks/use-orders"
import { OrderDetailsModal } from "./order-details-modal"
import { EditOrderModal } from "./edit-order-modal"
import { DeleteOrderModal } from "./delete-order-modal"
import { OrderStatusBadge } from "./order-status-badge"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { OrdersPagination } from "./orders-pagination"
import { OrdersTableSkeleton } from "./orders-table-skeleton"

export function OrdersTable() {
  const router = useRouter()
  const { orders, isLoading, mutate, pagination } = useOrders()

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setIsDetailsOpen(true)
  }

  const handleEdit = (order: any) => {
    setSelectedOrder(order)
    setIsEditOpen(true)
  }

  const handleDelete = (order: any) => {
    setSelectedOrder(order)
    setIsDeleteOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lista de Pedidos</h2>
        <Button asChild>
          <Link href="/novo-pedido">
            <PlusIcon className="mr-2 h-4 w-4" />
            Novo Pedido
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <OrdersTableSkeleton />
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead className="hidden md:table-cell">Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders && orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatCurrency(order.value)}</TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.status as OrderStatus} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewDetails(order)}>
                            Detalhes
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(order)}>
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive"
                            onClick={() => handleDelete(order)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum pedido encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {pagination && pagination.totalPages > 1 && <OrdersPagination pagination={pagination} />}
        </>
      )}

      {selectedOrder && (
        <>
          <OrderDetailsModal order={selectedOrder} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
          <EditOrderModal
            order={selectedOrder}
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSuccess={() => {
              setIsEditOpen(false)
              mutate()
            }}
          />
          <DeleteOrderModal
            order={selectedOrder}
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onSuccess={() => {
              setIsDeleteOpen(false)
              mutate()
            }}
          />
        </>
      )}
    </div>
  )
}
