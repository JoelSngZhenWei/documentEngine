// OCR Document Path
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

  if (typeof window !== "undefined") localStorage.setItem("ocr:jobId", jobId);

  const timeoutMs = 2 * 60 * 1000
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
    if (data.status === "done") {
      return data
    }
    await new Promise(r => setTimeout(r, 2000))
  }
}

// Extracting Document Info Path
export type Pair = { field: string; info: string };

export const pairsToObject = (rows: Pair[]) =>
  rows.filter(p => p.field?.trim()).reduce((acc, { field, info }) => {
    acc[field.trim()] = info;
    return acc;
  }, {} as Record<string, string>);

export async function extractDocumentInfo(jobId?: string, pairs?: Pair[]) {
  const id =
    jobId ??
    (typeof window !== "undefined"
      ? localStorage.getItem("ocr:jobId")
      : null);
  if (!id) throw new Error("Missing jobId");

  const payload: Record<string, unknown> = { jobId: id };
  if (pairs?.length) payload.fields = pairsToObject(pairs);

  const base = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
  const extractPath = process.env.NEXT_PUBLIC_BACKEND_EXTRACTION ?? "/api/extraction/extract";
  const statusBase = process.env.NEXT_PUBLIC_BACKEND_STATUS_EXTRACTION ?? "/api/extraction/status";

  const extractUrl = new URL(extractPath, base).toString();
  const statusUrl = new URL(`${statusBase}/${encodeURIComponent(id)}`, base).toString();

  const res = await fetch(
    extractUrl,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Extraction start failed: ${res.status} ${msg}`)
  };
  const extractionStarted = await res.json();
  console.log("Extraction started: ", extractionStarted);

  const controller = new AbortController();
  const timeoutMs = 2 * 60 * 1000;
  const start = Date.now();
  let delay = 1000;

  while (Date.now() - start < timeoutMs) {
    const statusRes = await fetch(statusUrl, {
      credentials: "include",
      signal: controller.signal
    });

    if (!statusRes.ok) {
      const msg = await statusRes.text().catch(() => "");
      throw new Error(`Status check failed: ${statusRes.status} ${msg}`);
    }

    const data = await statusRes.json();
    console.log("status:", data);

    if (data.status === "done" || data.status === "error") {
      return data;
    }
    await new Promise((r) => setTimeout(r, delay));
    // cap backoff at ~4s
    delay = Math.min(delay * 1.5, 4000);
  }
  controller.abort();
  throw new Error("Timed out waiting for extraction result.")
}
