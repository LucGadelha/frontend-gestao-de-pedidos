"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createOrder } from "@/lib/api/orders"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  customer: z.string().min(1, "Nome do cliente é obrigatório").max(100),
  product: z.string().min(1, "Nome do produto é obrigatório").max(100),
  value: z.coerce.number().min(0.01, "Valor deve ser maior que zero").nonnegative("Valor não pode ser negativo"),
})

type FormValues = z.infer<typeof formSchema>

export function CreateOrderForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      product: "",
      value: 0, // Definir um valor inicial em vez de undefined
    },
  })

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true)
    try {
      await createOrder(data)
      toast({
        title: "Pedido criado com sucesso!",
        description: "O pedido foi adicionado ao sistema.",
      })
      router.push("/")
    } catch (error) {
      console.error("Erro ao criar pedido:", error)
      toast({
        title: "Erro ao criar pedido",
        description: "Ocorreu um erro ao tentar criar o pedido. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do cliente" {...field} />
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
                <Input placeholder="Digite o nome do produto" {...field} />
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
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/")} disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Criando..." : "Criar Pedido"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
