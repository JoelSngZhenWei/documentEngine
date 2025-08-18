"use client"
import { useEffect } from "react"
import { useTheme } from "next-themes"

export function ThemeDebug() {
    const { theme, systemTheme } = useTheme()
    useEffect(() => {
        const tick = () => {
            console.log("theme:", theme, "system:", systemTheme, "html.className:", document.documentElement.className)
        }
        tick()
        const id = setInterval(tick, 1000)
        return () => clearInterval(id)
    }, [theme, systemTheme])
    return null
}
