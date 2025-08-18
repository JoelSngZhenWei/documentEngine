"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar"
import { Home, Layers, LogIn } from "lucide-react";
import { ThemeButton } from "@/components/theme-button";
import { useRouter } from "next/navigation"

const items = [
    {
        title: "Home",
        url: "/",
        icon: Home
    },
    // {
    //     title: "Sign Up",
    //     url: "/signup",
    //     icon: UserPlus
    // },
    {
        title: "Log In",
        url: "login",
        icon: LogIn
    },
    {
        title: "Tech Stack",
        url: "/techstack",
        icon: Layers
    }
]

export function AppSidebar() {
    const router = useRouter()

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
            </SidebarFooter>
        </Sidebar>
    )
}