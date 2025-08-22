"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, Copy, Upload, Check } from "lucide-react"
import KeyValueEditor from "@/components/key-value-input"
import { PdfControls } from "@/components/pdf-controls"
import { ocrDocument } from "@/lib/doc-api"
import { toast } from "sonner"
import { useAuth } from "@/components/auth-provider"
import AuthOverlay from "@/components/auth-overlay"
import PreviousResults from "@/components/infominer-prev-results"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

const PdfPreview = dynamic(() => import("@/components/pdf-preview"), { ssr: false })

type Pair = { field: string; info: string }

export default function InfoMiner() {
    const { user } = useAuth()

    const [copied, setCopied] = useState(false)
    const handleCopy = async () => {
        await navigator.clipboard.writeText(
            Array.isArray(ocrResult) ? ocrResult.join("\n\n") : ocrResult ?? ""
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 3000) // reset after 2s
    }

    const [file, setFile] = useState<File | null>(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [numPages, setNumPages] = useState(0)
    const MAX_SIZE_MB = 10
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (!f) return
        if (f.type !== "application/pdf") {
            alert("Please upload a PDF")
            setFile(null)
            return
        }
        if (f.size > MAX_SIZE_MB * 1024 * 1024) {
            alert(`File must be smaller than ${MAX_SIZE_MB} MB`)
            setFile(null)
            return
        }
        setFile(f)
        setPageNumber(1)
        toast("File uploaded successfully.", {
            icon: <CheckCircle className="text-success" />,
        })
        handleOCR(f)
    }

    const prev = () => setPageNumber((p) => Math.max(1, p - 1))
    const next = () => setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p))

    const [pairs, setPairs] = useState<Pair[]>([])

    // Optional: turn pairs into a key→value object (handles duplicate keys)
    const pairsToObject = (rows: Pair[]) =>
        rows
            .filter(p => p.field.trim()) // ignore empty keys
            .reduce((acc, { field, info }) => {
                const key = field.trim()
                if (acc[key] === undefined) acc[key] = info
                else acc[key] = Array.isArray(acc[key]) ? [...acc[key], info] : [acc[key] as string, info]
                return acc
            }, {} as Record<string, string | string[]>)

    const [ocrResult, setOcrResult] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleOCR = async (f: File) => {
        setLoading(true)
        try {
            const result = await ocrDocument(f)
            setOcrResult(result.text)
            toast("File scanned successfully.", {
                icon: <CheckCircle className="text-success" />,
            })
        } catch (err) {
            console.log("Error uploading file: " + err)
            toast("Error uploading file: " + err, {
                icon: <Upload className="text-danger" />,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full px-4 py-8 space-y-3">
            <h1 className="text-2xl font-bold mb-6">Document Miner – PDF Upload & OCR Preview</h1>

            {/* Single hidden input shared by both upload buttons */}
            <Input
                id="document"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                {/* Left: Upload + PDF preview */}
                <div className="space-y-3 ">
                    <div className="flex items-center justify-between gap-4 h-16">
                        <span>Upload PDF</span>

                        {/* Top-right trigger for file input */}
                        <label htmlFor="document">
                            <Button asChild variant="outline" size="sm" className="flex items-center gap-2 cursor-pointer">
                                <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload
                                </span>
                            </Button>
                        </label>
                    </div>

                    <div className="h-[30rem] border rounded-lg p-4 overflow-auto bg-background flex items-center justify-center">
                        {file ? (
                            <PdfPreview
                                file={file}
                                pageNumber={pageNumber}
                                onLoadSuccess={(n) => {
                                    setNumPages(n)
                                    setPageNumber((p) => Math.min(Math.max(1, p), n))
                                }}
                            />
                        ) : (

                            <label htmlFor="document">
                                <Button asChild variant="outline" className="flex items-center gap-2 cursor-pointer">
                                    <span>
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Document
                                    </span>
                                </Button>
                            </label>
                        )}
                    </div>
                </div>

                {/* Right: OCR Output */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 h-16">
                        <span>OCR Output</span>
                        <Button variant="outline" size="sm" onClick={handleCopy}>
                            {copied ? (
                                <>
                                    <Check className="mr-2 text-success" />
                                    Copy
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-2" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>

                    <div
                        id="ocr-output"
                        aria-live="polite"
                        className={`h-[30rem] border rounded-lg p-4 overflow-scroll bg-background ${!ocrResult ? "flex items-center justify-center" : ""}`}

                    >
                        {loading ? (
                            <div className="w-full h-full space-y-3">
                                <div className="text-center text-sm mb-2">
                                    Scanning in progress...
                                </div>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-6 w-full" />
                                <Skeleton className="h-6 w-5/6" />
                                <Skeleton className="h-6 w-2/3" />
                                <Skeleton className="h-6 w-1/2" />
                                <Skeleton className="h-6 w-5/6" />
                                <Skeleton className="h-6 w-2/3" />
                                <Skeleton className="h-6 w-5/6" />
                                <Skeleton className="h-6 w-2/3" />
                            </div>
                        ) : ocrResult ? (
                            <pre className="whitespace-pre-wrap">{ocrResult[pageNumber - 1]}</pre>
                        ) : (
                            <div>Upload a document begin OCR scanning.</div>
                        )}
                    </div>
                </div>
            </div>

            <PdfControls
                pageNumber={pageNumber}
                numPages={numPages}
                onPrev={prev}
                onNext={next}
                onGoTo={(p) => setPageNumber(p)}
            />

            <Separator />

            <form className="space-y-3">
                <KeyValueEditor
                    onChange={setPairs}
                />

                <Button variant={"outline"} type="submit">
                    <Check className="w-4 h-4" />
                    Submit Extraction Request
                </Button>
            </form>

            <Separator />

            <PreviousResults />

            {!user && <AuthOverlay message="Please log in with a guest account to continue. This is a security measure against spam." />}

        </div >
    )
}
