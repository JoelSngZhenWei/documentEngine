import { useEffect, useState } from "react"
import { remark } from "remark"
import html from "remark-html"

export default function OCRPreview({ text }: { text: string }) {
  const [content, setContent] = useState("")

  useEffect(() => {
    const process = async () => {
      const file = await remark().use(html).process(text)
      setContent(String(file))
    }
    process()
  }, [text])

  return (
    <div
      className="prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
