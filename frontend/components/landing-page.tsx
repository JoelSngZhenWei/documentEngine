"use client"

import Link from "next/link";
import { useAuth } from "./auth-provider";

export default function LandingPage() {
    const { user } = useAuth()
    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Document Engine</h1>
            {user ? (
                <span>Welcome, {user.username}!</span>
            ) : (
                <span>
                    <Link href="/login" className="underline">
                        Log in
                    </Link>
                    &nbsp;to demo the application
                </span>
            )}

            <p className="text-sm">Made by Joel Sng</p>
        </div>
    );
}
