import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar"
import React from "react";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";
import AppMenuBar from "@/components/menubar";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
    title: "DocEngine",
    description: "Document Engine for all your Document Processing Needs",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

    return (
        <html lang={"en"} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AuthProvider>
                        {/*<ThemeDebug />*/}
                        <SidebarProvider defaultOpen={defaultOpen}>
                            <div className="flex min-h-screen w-full">
                                <AppSidebar />
                                <main className={"flex-1"}>
                                    <AppMenuBar />
                                    <div className="flex-1">
                                        {children}
                                    </div>
                                </main>
                            </div>
                            <Toaster />
                        </SidebarProvider>
                    </AuthProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
