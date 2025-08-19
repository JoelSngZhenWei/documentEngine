export async function uploadDocument(
    file: File,
    fields: Record<string, string | string[]>,
    text?: string
  ) {
    const formData = new FormData()
    formData.append("fields", JSON.stringify(fields))
    formData.append("file", file)

    if (text) {
        formData.append("text", text)
    }
  
    const res = await fetch(
        (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + (process.env.NEXT_PUBLIC_BACKEND_UPLOAD ?? ""),
        {
      method: "POST",
      body: formData,
    })
  
    if (!res.ok) {
      throw new Error(await res.text())
    }
  
    return res.json()
  }