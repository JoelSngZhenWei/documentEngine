"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar"
import { ChevronUp, Home, Layers, LogIn, User2 } from "lucide-react";
import { ThemeButton } from "@/components/theme-button";
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth } from "./auth-provider";
import { useLogout } from "@/lib/user-api";

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home
    },
    {
        title: "Tech Stack",
        url: "/techstack",
        icon: Layers
    }
]

export function AppSidebar() {
    const router = useRouter()
    const { user } = useAuth()
    const logout = useLogout()
    return (
        <Sidebar collapsible={"icon"} className={"border-muted"}>
            <SidebarContent>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarGroupLabel className="flex items-center justify-between">
                            <span className="truncate group-data-[collapsible=icon]:hidden">
                                Document Engine
                            </span>
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        onClick={() => router.push(item.url)}
                                    >
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem className="flex justify-center">
                            <ThemeButton />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 /> {user.username}
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        <span>Account</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>
                                        <span>Sign out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <SidebarMenuButton onClick={() => router.push("\login")}>
                                <User2 />
                                <span>Log in</span>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}