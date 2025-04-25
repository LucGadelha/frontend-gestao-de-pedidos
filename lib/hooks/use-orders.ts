"use client"
import { useSearchParams } from "next/navigation"
import { getOrders } from "@/lib/api/orders"
import useSWR from "swr"

export function useOrders() {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page") || "1")
  const pageSize = 10

  const { data, error, isLoading, mutate } = useSWR([`orders`, page, pageSize], () => getOrders(page, pageSize), {
    revalidateOnFocus: false,
  })

  return {
    orders: data?.items || [],
    pagination: data
      ? {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
          totalCount: data.totalCount,
          totalPages: data.totalPages,
          hasNextPage: data.hasNextPage,
          hasPreviousPage: data.hasPreviousPage,
        }
      : null,
    isLoading,
    isError: error,
    mutate,
  }
}
