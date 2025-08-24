"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function KeyValueResultsPlaceholder({
  count = 3, // number of fields requested
}: {
  count?: number
}) {
  return (
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
  )
}
