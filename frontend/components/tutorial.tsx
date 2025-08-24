"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Info } from "lucide-react"

export function TutorialButton() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-warning ">
                    <Info className="" />
                    How to use
                </Button>
            </DialogTrigger>
            <DialogContent className="border-muted">
                <DialogHeader>
                    <DialogTitle>How to use Info Miner</DialogTitle>
                    <DialogDescription>
                        Quick steps to get started:
                    </DialogDescription>
                </DialogHeader>

                {/* Instruction text */}
                <div className="space-y-2">
                    <p>1. Upload your file (PDF, DOCX, PPTX).</p>
                    <p>2. The document will be automatically scanned using OCR.</p>
                    <p>3. Define what information you want to extract and optional additional information to refine search.</p>
                </div>

                {/* Visual flow diagram */}
                <div className="mt-6 space-y-3 text-3xl text-background">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-muted-foreground flex items-center justify-center h-32 rounded-md">
                            1
                        </div>
                        <div className="bg-muted-foreground flex items-center justify-center h-32 rounded-md">
                            2
                        </div>
                    </div>
                    <div className="bg-muted-foreground flex items-center justify-center h-32 rounded-md">
                        3
                    </div>
                </div>

                <Button 
                onClick={() => setOpen(false)} 
                variant={"outline"} 
                className="mt-6">
                    Got it
                </Button>
            </DialogContent>
        </Dialog>
    )
}
