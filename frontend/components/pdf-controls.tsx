"use client";

import { Button } from "@/components/ui/button";

type PdfControlsProps = {
  pageNumber: number;
  numPages: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo?: (page: number) => void;
};

export function PdfControls({ pageNumber, numPages, onPrev, onNext, onGoTo }: PdfControlsProps) {
  return (
    <div className="flex items-center gap-2 w-full justify-center">
      <Button variant="outline" onClick={onPrev} disabled={pageNumber <= 1}>
        Prev
      </Button>
      <span className="text-sm">
        Page {pageNumber} / {numPages || "—"}
      </span>
      <Button variant="outline" onClick={onNext} disabled={numPages === 0 || pageNumber >= numPages}>
        Next
      </Button>
      {onGoTo && (
        <input
          type="number"
          min={1}
          max={numPages || 1}
          placeholder="Go to…"
          className="w-24 border rounded px-2 py-1 text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const v = Number((e.target as HTMLInputElement).value);
              if (!Number.isNaN(v) && v >= 1 && v <= numPages) onGoTo(v);
            }
          }}
        />
      )}
    </div>
  );
}
