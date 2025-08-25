import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"

export async function fetchMe() {
  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + (process.env.NEXT_PUBLIC_BACKEND_ME ?? ""),
    {
      credentials: "include"   // ensures cookies sent
    })
  if (res.ok) return res.json()
  return null
}

export async function signup(values: {
  username: string
  email: string
  password: string
}) {
  const payload = JSON.stringify({ ...values, roles: ["user"] })

  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + (process.env.NEXT_PUBLIC_BACKEND_SIGNUP ?? ""),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,

    }
  )

  if (!res.ok) throw new Error("Signup failed")
  return await res.json()
}

export async function login(values: {
  username: string,
  password: string
}) {
  const payload = JSON.stringify(values)

  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + (process.env.NEXT_PUBLIC_BACKEND_LOGIN ?? ""),
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      credentials: "include"
    }
  )

  if (!res.ok) throw new Error("Login failed")

  const data = await res.json()

  return data
}

// packaged as a function to use router
export function useLogout() {
  const router = useRouter()
  const { setUser } = useAuth()
  async function logout() {
    await fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + (process.env.NEXT_PUBLIC_BACKEND_LOGOUT ?? ""),
      {
        method: "POST",
        credentials: "include"
      }
    );
    localStorage.clear();
    sessionStorage.clear();
    setUser(null)
    router.push("/");
  }
  return logout;
}