"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type Pair = { field: string; info: string }

export default function KeyValueResults({
  results,
}: {
  results?: Record<string, string> | Pair[]
}) {
  let rows: Pair[] = []

  if (Array.isArray(results)) {
    rows = results
  } else if (results && typeof results === "object") {
    rows = Object.entries(results).map(([field, info]) => ({
      field,
      info: String(info),
    }))
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-[1fr_3fr] gap-2 text-sm">
        <span>Field</span>
        <span>Information</span>
      </div>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={`${r.field}-${i}`}
            className="grid grid-cols-[1fr_3fr] gap-2 items-stretch"
          >
            <Input
              value={r.field}
              readOnly
              className="min-w-0 text-foreground h-full"
            />
            <Textarea
              value={r.info}
              readOnly
              className="min-w-0 resize-none text-foreground"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
