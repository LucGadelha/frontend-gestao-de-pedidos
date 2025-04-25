"use client"

import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteOrder } from "@/lib/api/orders"
import { useToast } from "@/components/ui/use-toast"

interface DeleteOrderModalProps {
  order: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function DeleteOrderModal({ order, isOpen, onClose, onSuccess }: DeleteOrderModalProps) {
  const { toast } = useToast()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)
    try {
      await deleteOrder(order.id)
      toast({
        title: "Pedido excluído com sucesso!",
        description: "O pedido foi removido do sistema.",
      })
      onSuccess()
    } catch (error) {
      console.error("Erro ao excluir pedido:", error)
      toast({
        title: "Erro ao excluir pedido",
        description: "Ocorreu um erro ao tentar excluir o pedido. Tente novamente.",
        variant: "destructive",
      })
      onClose()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir o pedido de <strong>{order.customer}</strong>? Esta ação não pode ser
            desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
