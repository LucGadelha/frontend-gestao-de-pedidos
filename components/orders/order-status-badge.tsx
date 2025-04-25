import { Badge } from "@/components/ui/badge"
import type { OrderStatus } from "@/lib/types"
import { cn } from "@/lib/utils"

interface OrderStatusBadgeProps {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusConfig = {
    Pendente: {
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    },
    Processando: {
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    },
    Finalizado: {
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    },
  }

  return (
    <Badge variant="outline" className={cn("font-medium", statusConfig[status]?.color || "bg-gray-100 text-gray-800")}>
      {status}
    </Badge>
  )
}
