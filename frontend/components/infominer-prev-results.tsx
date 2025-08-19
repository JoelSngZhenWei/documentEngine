"use client"

import { useMemo } from "react"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type Item = { id: string | number; datetime: string; name: string }

export default function PreviousResults({
  items,
  className,
}: {
  items?: Item[]
  className?: string
}) {
  const data = useMemo<Item[]>(
    () =>
      items?.length
        ? items
        : [
            { id: 1, datetime: "2025-08-10T14:32:00Z", name: "Invoice_0810.pdf" },
            { id: 2, datetime: "2025-08-12T09:05:00Z", name: "Report_Q2.pdf" },
            { id: 3, datetime: "2025-08-15T18:45:00Z", name: "Contract_Acme.pdf" },
            { id: 4, datetime: "2025-08-18T11:20:00Z", name: "Shipping_Manifest.pdf" },
          ],
    [items]
  )

  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-sm font-medium">Previous Results</div>

      <div className="space-y-2">
        {data.map((item) => {
          const formatted = new Date(item.datetime).toLocaleString()
          return (
            <Button
              key={item.id}
              variant="outline"
              className={cn(
                "w-full h-full justify-start rounded-lg px-3 py-2",
                "bg-card/40 hover:bg-card/60 transition-colors flex items-center gap-5"
              )}
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1 text-left space-y-1">
                <div className="text-sm truncate">{item.name}</div>
                <div className="text-xs text-muted-foreground">{formatted}</div>
              </div>
            </Button>
          )
        })}
      </div>
    </div>
  )
}
