"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface OrdersPaginationProps {
  pagination: {
    pageIndex: number
    pageSize: number
    totalCount: number
    totalPages: number
  }
}

export function OrdersPagination({ pagination }: OrdersPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { pageIndex, totalPages } = pagination

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Button variant="outline" size="icon" onClick={() => router.push(createPageURL(1))} disabled={pageIndex <= 1}>
        <ChevronsLeftIcon className="h-4 w-4" />
        <span className="sr-only">Primeira página</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.push(createPageURL(pageIndex - 1))}
        disabled={pageIndex <= 1}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="sr-only">Página anterior</span>
      </Button>
      <span className="text-sm">
        Página {pageIndex} de {totalPages}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.push(createPageURL(pageIndex + 1))}
        disabled={pageIndex >= totalPages}
      >
        <ChevronRightIcon className="h-4 w-4" />
        <span className="sr-only">Próxima página</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => router.push(createPageURL(totalPages))}
        disabled={pageIndex >= totalPages}
      >
        <ChevronsRightIcon className="h-4 w-4" />
        <span className="sr-only">Última página</span>
      </Button>
    </div>
  )
}
