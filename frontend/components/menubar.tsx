"use client"

import { Menubar } from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeButton } from "@/components/theme-button";
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider";

export default function AppMenuBar() {
    const router = useRouter()
    const { user } = useAuth()

    return (
        <Menubar className="w-full flex justify-between px-5 ">
            {/* Left side: Sidebar Trigger */}
            <div className="flex items-center">
                <SidebarTrigger />
            </div>

            <div className="flex items-center gap-2">
                {user ? (
                    <span>{user.username}</span>
                ) : (
                    < Button variant="ghost" onClick={() => router.push("/login")}>
                        Log In
                    </Button>

                )}
                <ThemeButton />
            </div>
        </Menubar >
    )
}
