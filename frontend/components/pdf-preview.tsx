"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

type PdfPreviewProps = {
  file: File | string | ArrayBuffer;
  pageNumber: number;
  onLoadSuccess?: (numPages: number) => void;
  maxWidth?: number; // optional hard cap
};

export default function PdfPreview({
  file,
  pageNumber,
  onLoadSuccess,
  maxWidth,
}: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.floor(entry.contentRect.width);
      setContainerWidth(w);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full max-w-full overflow-auto">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => onLoadSuccess?.(numPages)}
        loading={<div className="p-4 text-sm text-muted-foreground">Loading PDF…</div>}
        error={<div className="p-4 text-sm text-danger">Failed to load PDF.</div>}
      >
        <Page
          pageNumber={pageNumber}
          // Fit to available width (optionally capped)
          width={
            containerWidth
              ? (maxWidth ? Math.min(containerWidth, maxWidth) : containerWidth)
              : undefined
          }
          renderAnnotationLayer
        />
      </Document>
    </div>
  );
}
