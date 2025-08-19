"use client"

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";

export default function LandingPage() {
    const { user } = useAuth()
    const router = useRouter()

    const handleProtectedClick = (path: string) => {
        if (user) {
            router.push(path)
        } else {
            toast("Please log in with a guest account. This is a security measure against spam.", {
                icon: <Lock className="h-5 w-5 text-foreground" />
            })
        }
    }

    return (
        <div className="space-y-6 w-6xl ">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Document Engine</h1>
                {user ? (
                    <span>Welcome, {user.username}!</span>
                ) : (
                    <span>
                        <Link href="/login" className="underline">
                            Log in
                        </Link>
                        &nbsp;with a guest account to demo the application
                    </span>
                )}
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
                    {/* Card 1 */}
                    <Card
                        onClick={() => handleProtectedClick("/infominer")}
                        className="cursor-pointer hover:bg-muted border border-transparent hover:border-foreground transition"
                    >
                        <CardHeader>
                            <CardTitle>
                                Info Miner
                            </CardTitle>
                            <CardDescription>
                                Upload complex documents and quickly
                                extract structured information like names, dates, amounts, and
                                key clauses.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="h-full">
                            <span className="flex items-center gap-2 text-sm font-medium w-full justify-end">
                                Use this tool
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </CardFooter>
                    </Card>

                    {/* Card 2 */}
                    <Card
                        onClick={() => handleProtectedClick("/resumereview")}
                        className="cursor-pointer hover:bg-muted border border-transparent hover:border-foreground transition"
                    >
                        <CardHeader>
                            <CardTitle>Resume Review</CardTitle>
                            <CardDescription>
                                Get instant feedback on your resume: formatting, clarity, keyword
                                optimization, and suggestions to improve job application success.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="h-full">
                            <span className="flex items-center gap-2 text-sm font-medium w-full justify-end ">
                                Use this tool
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </CardFooter>
                    </Card>

                    {/* Card 3 */}
                    <Card
                        onClick={() => router.push("/techstack")}
                        className="cursor-pointer hover:bg-muted border border-transparent hover:border-foreground transition"
                    >
                        <CardHeader>
                            <CardTitle>About this Project</CardTitle>
                            <CardDescription>
                                Learn about the technologies powering Document Engine — from
                                Spring Boot and Next.js to Redis, LangChain, and AI models.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="h-full">
                            <span className="flex items-center gap-2 text-sm font-medium w-full justify-end">
                                Read more
                                <ArrowRight className="h-4 w-4" />
                            </span>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="text-center">
                <p className="text-sm">Joel Sng</p>
            </div>
        </div>
    );
}
