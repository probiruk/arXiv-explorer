import { useEffect } from "react";

interface PDFViewerProps {
  pdfUrl: string;
  onClose: () => void;
}

export function PDFViewer({ pdfUrl, onClose }: PDFViewerProps) {
  useEffect(() => {
    const cleanPdfUrl = pdfUrl.replace("abs", "pdf");
    window.open(cleanPdfUrl, "_blank");
    onClose();
  }, [pdfUrl, onClose]);

  return null;
}
