import FormLogIn from "@/components/form-login";

export default function LogInPage() {
    return (
        <div className="flex min-h-full items-center justify-center">
            <div className="w-full max-w-md p-6">
                <h1 className="text-2xl font-semibold tracking-tight text-center mb-6">
                    Log In
                </h1>
                <p className="text-sm text-muted-foreground text-center mb-6">
                    We ask you to log in to keep the platform secure, prevent spam, and manage session tokens reliably.
                </p>
                <FormLogIn />
            </div>
        </div>
    )
}
