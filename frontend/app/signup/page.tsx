import FormSignUp from "@/components/form-signup";

export default function SignUpPage() {
    return (
        <div className="flex min-h-full items-center justify-center">
            <div className="w-full max-w-md p-6">
                <h1 className="text-2xl font-semibold tracking-tight text-center mb-6">
                    Sign Up
                </h1>
                <FormSignUp/>
            </div>
        </div>
    )
}
