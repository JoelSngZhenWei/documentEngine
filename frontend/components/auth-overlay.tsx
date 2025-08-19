"use client"

import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Props = {
    message?: string
}

export default function AuthOverlay({ message }: Props) {
    const router = useRouter()
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center
                    bg-background/70 backdrop-blur-xs text-center p-6">
            <Lock className="w-12 h-12 mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">
                {message ?? "Please log in with a guest account to proceed."}
            </p>
            <Button variant={"outline"} onClick={() => router.push("login")}>
                Go to Login
            </Button>
        </div>
    )
}
