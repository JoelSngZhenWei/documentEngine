export async function ocrDocument(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(
    (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") +
      (process.env.NEXT_PUBLIC_BACKEND_OCR ?? ""),
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  )

  if (!res.ok) {
    throw new Error(await res.text())
  }

  return res.json()
}
