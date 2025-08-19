"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function InfoMiner() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfUrl(URL.createObjectURL(file))
    } else {
      alert("Please upload a valid PDF file")
      setPdfUrl(null)
    }
  }

  return (
    <div className="grid w-full max-w-sm gap-3">
      <Label htmlFor="document">Document</Label>
      <Input id="document" type="file" accept="application/pdf" onChange={handleFileChange} />

      {pdfUrl && (
        <div className="mt-4 w-full h-96 border">
          <iframe src={pdfUrl} className="w-full h-full" />
        </div>
      )}
    </div>
  )
}
