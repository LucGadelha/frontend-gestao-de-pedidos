"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { updateOrder } from "@/lib/api/orders"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  customer: z.string().min(1, "Nome do cliente é obrigatório").max(100),
  product: z.string().min(1, "Nome do produto é obrigatório").max(100),
  value: z.coerce.number().min(0.01, "Valor deve ser maior que zero").nonnegative("Valor não pode ser negativo"),
})

type FormValues = z.infer<typeof formSchema>

interface EditOrderModalProps {
  order: any
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function EditOrderModal({ order, isOpen, onClose, onSuccess }: EditOrderModalProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: order.customer,
      product: order.product,
      value: order.value,
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      await updateOrder(order.id, data)
      toast({
        title: "Pedido atualizado com sucesso!",
        description: "As informações do pedido foram atualizadas.",
      })
      onSuccess()
    } catch (error) {
      console.error("Erro ao atualizar pedido:", error)
      toast({
        title: "Erro ao atualizar pedido",
        description: "Ocorreu um erro ao tentar atualizar o pedido. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Pedido</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Cliente</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Produto</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
