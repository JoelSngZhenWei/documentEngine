"use client"

import { useMemo, useState } from "react"
import { ChevronDown, ChevronUp, FileText, RefreshCcw, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type Item = {
  jobId: string;
  fileName: string;
  filePath: string;
  status: string;
  text: string[];
  dateTime: string;
}

export default function PreviousResults({
  results,
  className,
  onRefresh,
  onSelect,
  onClear,
}: {
  results?: Item[]
  className?: string
  onRefresh?: () => void
  onSelect?: (item: Item) => void
  onClear?: () => void
}) {
  const [sortOrder, setSortOrder] = useState<"latest" | "earliest">("latest")

  const data = useMemo<Item[]>(() => {
    if (!results?.length) return []
    return [...results].sort((a, b) => {
      const timeA = new Date(a.dateTime).getTime()
      const timeB = new Date(b.dateTime).getTime()
      return sortOrder === "latest"
        ? timeB - timeA // newest first
        : timeA - timeB // oldest first
    })
  }, [results, sortOrder])

  return (
    <div className={cn("space-y-2", className)}>
      {/* Title + buttons in one row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Previous Results
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCcw />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => setSortOrder("latest")}>
            <ChevronUp />
            Latest
          </Button>
          <Button variant="outline" onClick={() => setSortOrder("earliest")}>
            <ChevronDown />
            Earliest
          </Button>
          <Button variant="outline" onClick={onClear}>
            <XCircle className="text-warning" />
            Clear History
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[25rem]">
        <div className="space-y-3">
          {data.map((item) => (
            <Button
              key={item.jobId}
              variant="outline"
              onClick={() => onSelect?.(item)}
              className={cn(
                "w-full justify-start rounded-lg px-3 py-2",
                "bg-card/40 hover:bg-card/60 transition-colors flex items-center gap-5"
              )}
            >
              <FileText className="text-muted-foreground" />
              <div className="min-w-0 flex-1 text-left space-y-1">
                <p className="truncate text-sm font-medium">{item.fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(item.dateTime).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
