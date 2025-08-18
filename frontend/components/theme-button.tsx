"use client"

import * as React from "react"
import { FaAdjust } from "react-icons/fa"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeButton() {
    const { setTheme } = useTheme()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => {
                setTheme((prev) => (prev === "light" ? "dark" : "light"));
            }}
        >
            <FaAdjust className="h-5 w-5" aria-hidden />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
