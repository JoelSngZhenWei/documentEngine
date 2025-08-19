"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar"
import { FileText, Home, ScanText, User2 } from "lucide-react";
import { useRouter } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth } from "./auth-provider";
import { useLogout } from "@/lib/user-api";

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

                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => router.push('/')}>
                                    <Home />
                                    Home
                                </SidebarMenuButton>
                            </SidebarMenuItem>


                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => router.push('/infominer')}>
                                    <ScanText />
                                    Info Miner
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={() => router.push('/resumereview')}>
                                    <FileText />
                                    Resume Review
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton>
                                        <User2 /> {user.username}
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >

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