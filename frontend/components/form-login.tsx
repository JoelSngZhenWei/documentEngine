"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import Link from "next/link"
import { login } from "@/lib/user-api"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { toast } from "sonner"

const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }).regex(/[0-9]/, { message: "Password must contain at least one number." }),
})


export default function FormLogIn() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
    const [show, setShow] = useState(false)
    const router = useRouter()
    const { setUser } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { username: "", password: "" },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setStatus("loading")
            const data = await login(values)
            setUser(data)
            setStatus("success")
            toast("Log in successful. Redirecting...", {
                icon: <CheckCircle className="h-5 w-5 text-success" />
            })
            setTimeout(() => {
                router.replace("/")
            }, 2000)
        } catch (err) {
            console.error("Error during login: ", err)
            setStatus("error")
            toast("Log in failed. " + err, {
                icon: <XCircle className="h-5 w-5 text-danger" />
            })
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
                        <Button
                            type="submit"
                            variant="outline"
                            className="border-input"
                            disabled={status === "loading"}
                        >
                            Log In
                        </Button>
                    </div>

                    <p className="text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    )
}
