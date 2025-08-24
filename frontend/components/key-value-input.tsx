"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

type Row = { id: number; field: string; info: string }

export default function KeyValueEditor({
  onChange,
  initial = [{ id: 1, field: "", info: "" }],
}: {
  onChange?: (data: { field: string; info: string }[]) => void
  initial?: Row[]
}) {
  const [rows, setRows] = useState<Row[]>(initial)

  const addRow = () => setRows(r => [...r, { id: Date.now(), field: "", info: "" }])
  const removeRow = (id: number) => setRows(r => (r.length > 1 ? r.filter(x => x.id !== id) : r))

  const update = (id: number, key: "field" | "info", value: string) => {
    const next = rows.map(r => (r.id === id ? { ...r, [key]: value } : r))
    setRows(next)
    onChange?.(next.map(({ field, info }) => ({ field, info })))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const row = rows.find(r => r.id === id)
      if (row && (row.field || row.info)) addRow()
    }
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="grid grid-cols-[1fr_3fr_max-content] gap-2 text-sm">
        <span>Field</span>
        <span>Information</span>
        <span className="sr-only">Actions</span>
      </div>

      {/* Rows */}
      <div className="space-y-2">
        {rows.map(r => (
          <div
            key={r.id}
            className="group grid grid-cols-[1fr_3fr_max-content] gap-2 items-stretch"
          >
            <Input
              placeholder="e.g. Invoice Number"
              value={r.field}
              onChange={e => update(r.id, "field", e.target.value)}
              onKeyDown={e => handleKeyDown(e, r.id)}
              className="min-w-0 h-full text-foreground"
            />

            <Textarea
              placeholder="e.g. INV-2025-0819"
              value={r.info}
              onChange={e => update(r.id, "info", e.target.value)}
              onKeyDown={e => handleKeyDown(e, r.id)}
              className="min-w-0 resize-none text-foreground"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeRow(r.id)}
              disabled={rows.length === 1}
              title="Remove row"
              className="opacity-0 group-hover:opacity-100 transition-opacity justify-self-end size-8 text-danger focus:text-danger hover:text-danger"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={addRow}>
          <Plus className="w-4 h-4 mr-2" /> Add row
        </Button>
      </div>
    </div>
  )
}
