"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "./ui/button"
import { Copy, Download } from "lucide-react"

export default function KeyValueResultsPlaceholder({
  count = 3, // number of fields requested
}: {
  count?: number
}) {
  return (
    <div className="space-y-2">
      {/* Title + buttons in one row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Extraction Results
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {/* Header */}
        <div className="grid grid-cols-[1fr_3fr] gap-2 text-sm">
          <span>Field</span>
          <span>Information</span>
        </div>

        {/* Skeleton rows */}
        <div className="space-y-2">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_3fr] gap-2 items-center"
            >
              <Skeleton className="min-w-0 h-8 w-full" />
              <Skeleton className="min-w-0 h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
