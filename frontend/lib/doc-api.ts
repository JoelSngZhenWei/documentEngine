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

  console.log(res)

  if (!res.ok) {
    throw new Error(await res.text())
  }

  const { jobId } = await res.json()

  const timeoutMs = 2 * 60 * 1000 // 2 minutes
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    const statusRes = await fetch(
      (process.env.NEXT_PUBLIC_BACKEND_URL ?? "") + (process.env.NEXT_PUBLIC_BACKEND_STATUS ?? "") + `/${jobId}`,
      {
        credentials: "include"
      }
    )
    const data = await statusRes.json()
    console.log(data)
    if(data.status === "done") {
      return data
    }
    await new Promise(r => setTimeout(r, 2000))
  }
}
