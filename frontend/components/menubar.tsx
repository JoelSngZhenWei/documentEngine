"use client"

import { Menubar } from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeButton } from "@/components/theme-button";
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useLogout } from "@/lib/user-api";

export default function AppMenuBar() {
    const router = useRouter()
    const { user } = useAuth()
    const logout = useLogout()

    return (
        <Menubar className="w-full flex justify-between px-5 py-5 border-muted-foreground sticky top-0 z-50 bg-background">
            {/* Left side: Sidebar Trigger */}
            <div className="flex items-center">
                <SidebarTrigger />
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant={"ghost"}
                    onClick={() => window.open("https://github.com/JoelSngZhenWei/documentEngine", "_blank")}
                >
                    GitHub
                </Button>
                <Button
                    variant={"ghost"}
                    onClick={() => router.push("/techstack")}
                >
                    Tech stack
                </Button>
                {user ? (
                    // <Button variant={"ghost"}>
                    //     {user.username}
                    // </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                            >
                                {user.username}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>

                            <DropdownMenuItem onClick={logout}>
                                <span>Sign out</span>
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
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
