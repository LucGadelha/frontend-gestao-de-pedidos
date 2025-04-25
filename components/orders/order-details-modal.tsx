"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatCurrency, formatDate } from "@/lib/utils"
import { OrderStatusBadge } from "./order-status-badge"
import type { OrderStatus } from "@/lib/types"

interface OrderDetailsModalProps {
  order: any
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Pedido</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
              <p className="text-sm">{order.id}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
              <OrderStatusBadge status={order.status as OrderStatus} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
            <p className="text-sm">{order.customer}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Produto</h3>
            <p className="text-sm">{order.product}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Valor</h3>
              <p className="text-sm">{formatCurrency(order.value)}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Data de Criação</h3>
              <p className="text-sm">{formatDate(order.createdAt)}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
