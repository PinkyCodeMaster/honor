"use client"

import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList, } from "@/components/ui/command"
// import { filterProducts } from "@/lib/actions/product"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import * as React from "react"

// type ProductGroup = NonNullable<
//   Awaited<ReturnType<typeof filterProducts>>["data"]
// >[number]

export function ProductsCombobox() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300)
  // const [data, setData] = React.useState<ProductGroup[] | null>(null)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (debouncedQuery.length <= 0) {
      // setData(null)
      return
    }

    async function fetchData() {
      setLoading(true)
      // const { data, error } = await filterProducts({ query: debouncedQuery })

      // if (error) {
      //   setLoading(false)
      //   return
      // }
      // setData(data)
      setLoading(false)
    }

    void fetchData()
  }, [debouncedQuery])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const onSelect = React.useCallback((callback: () => unknown) => {
    setOpen(false)
    callback()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Search products...</span>
        <span className="sr-only">Search products</span>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
          if (!open) {
            setQuery("")
          }
        }}
      >
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(loading ? "hidden" : "py-6 text-center text-sm")}
          >
            No products found.
          </CommandEmpty>
          {loading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            // data?.map((group) => (
            //   <CommandGroup
            //     key={group.name}
            //     className="capitalize"
            //     heading={group.name}
            //   >
            //     {group.products.map((item) => {
            //       return (
            //         <CommandItem
            //           key={item.id}
            //           className="h-9"
            //           value={item.name}
            //           onSelect={() =>
            //             onSelect(() => router.push(`/product/${item.id}`))
            //           }
            //         >

            //           <span className="truncate">{item.name}</span>
            //         </CommandItem>
            //       )
            //     })}
            //   </CommandGroup>

            <CommandItem key="1" value="1" onSelect={() => onSelect(() => router.push(`/product/1`))}>
              <span className="truncate">Product 1</span>
            </CommandItem>

          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
