"use client"

import { useEffect, useMemo, useRef } from "react"
import { ChevronDown, ChevronUp, FileIcon, FileText, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type Item = { id: number; file: string; datetime: string } // datetime: "YYYY-MM-DD HH:mm"

export default function PreviousResults({
  items,
  className,
  height = "h-64",
}: {
  items?: Item[]
  className?: string
  height?: string
}) {
  const data = useMemo<Item[]>(
    () =>
      items?.length
        ? items
        : [
          { id: 1, file: "resume_extraction_result.json", datetime: "2025-08-24 15:26" },
          { id: 2, file: "invoice_12345_output.json", datetime: "2025-08-23 10:12" },
          { id: 3, file: "hdb_contract_summary.json", datetime: "2025-08-21 09:41" },
          { id: 4, file: "insurance_slip_april.pdf.json", datetime: "2025-08-20 18:05" },
          { id: 5, file: "ocr_test_document.json", datetime: "2025-08-19 14:33" },
          { id: 6, file: "hdb_contract_summary.json", datetime: "2025-08-18 09:41" },
          { id: 7, file: "insurance_slip_april.pdf.json", datetime: "2025-08-17 18:05" },
          { id: 8, file: "ocr_test_document.json", datetime: "2025-08-15 14:33" },
          { id: 9, file: "hdb_contract_summary.json", datetime: "2025-08-18 09:41" },
          { id: 10, file: "insurance_slip_april.pdf.json", datetime: "2025-08-17 18:05" },
          { id: 11, file: "ocr_test_document.json", datetime: "2025-08-15 14:33" },
        ],
    [items]
  )

  // latest first (top), earliest last (bottom)
  const sorted = useMemo(
    () =>
      [...data].sort(
        (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      ),
    [data]
  )

  // Grab the Radix viewport inside ScrollArea
  const containerRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      viewportRef.current = containerRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLDivElement | null
    }
  }, [])

  const scrollToTop = () => {
    viewportRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }
  const scrollToBottom = () => {
    if (!viewportRef.current) return
    viewportRef.current.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className={cn("space-y-2", className)} ref={containerRef}>
      {/* Title + buttons in one row */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">
          Previous Results
        </p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={scrollToTop}>
            <ChevronUp className="mr-2 h-4 w-4" />
            Latest
          </Button>
          <Button size="sm" variant="outline" onClick={scrollToBottom}>
            <ChevronDown className="mr-2 h-4 w-4" />
            Earliest
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              console.log("Clear results")
            }}
          >
            <XCircle className="mr-2 h-4 w-4 text-warning" />
            Clear History
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[25rem]">
        <div className="space-y-3">
          {sorted.map((item) => (
            <Button
              key={item.id}
              variant="outline"
              className={cn(
                "w-full justify-start rounded-lg px-3 py-2",
                "bg-card/40 hover:bg-card/60 transition-colors flex items-center gap-5"
              )}
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1 text-left space-y-1">
                <p className="truncate text-sm font-medium">{item.file}</p>
                <p className="text-xs text-muted-foreground">{item.datetime}</p>
              </div>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  )
}
