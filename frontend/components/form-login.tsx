"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import Link from "next/link"

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }).regex(/[0-9]/, { message: "Password must contain at least one number." }),
})

export default function FormLogIn() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [show, setShow] = useState(false) // <-- move hook to top-level (no hooks inside render callbacks)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { username: "", password: "" },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setStatus("loading")
            const payload = JSON.stringify(values)
            const res = await fetch(
                (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + (process.env.NEXT_PUBLIC_BACKEND_LOGIN ?? ""),
                { method: "POST", headers: { "Content-Type": "application/json" }, body: payload }
            )
            if (!res.ok) throw new Error("Request failed")

            const data = await res.json()
            console.log("Login response:", data)

            setStatus("success")
        } catch (err) {
            console.error("Error during login:", err)
            setStatus("error")
        }
    }

    return (
        <div className="flex-1">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl><Input placeholder="Username" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-2">
                                        <Input type={show ? "text" : "password"} placeholder="Password" {...field} />
                                        <Button type="button" variant="outline" size="icon" className="border-input" onClick={() => setShow(!show)}>
                                            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-center">
                        <Button type="submit" variant="outline" className="border-input">Log In</Button>
                    </div>

                    <p className="text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </p>

                    {status === "loading" && <p>Submitting...</p>}
                    {status === "success" && <p className="text-green-600">Log in successful!</p>}
                    {status === "error" && <p className="text-red-600">Log in failed.</p>}
                </form>
            </Form>
        </div>
    )
}
