import { ArxivPaper } from "../types/arxiv";
import { RelatedPapers } from "./RelatedPapers";
import { formatDate } from "../utils/formatters";
import { FileText, Calendar, Tag, ExternalLink } from "lucide-react";

interface PaperPageProps {
  paper: ArxivPaper;
  allPapers: ArxivPaper[];
  onClose: () => void;
  onViewPDF: (url: string) => void;
  onPaperClick: (paper: ArxivPaper) => void;
  onAuthorClick: (author: string) => void;
}

export function PaperPage({
  paper,
  allPapers,
  onClose,
  onViewPDF,
  onPaperClick,
  onAuthorClick,
}: PaperPageProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto"
      style={{ paddingTop: "64px" }}
    >
      <div className="min-h-[calc(100vh-64px)] py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {paper.title}
              </h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Published: {formatDate(paper.published)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Updated: {formatDate(paper.updated)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Tag className="h-4 w-4" />
                <span>{paper.primaryCategory}</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Authors */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Authors
              </h2>
              <div className="flex flex-wrap gap-2">
                {paper.authors.map((author, index) => (
                  <button
                    key={index}
                    onClick={() => onAuthorClick(author)}
                    className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {author}
                  </button>
                ))}
              </div>
            </div>

            {/* Abstract */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Abstract
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {paper.summary}
              </p>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {paper.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 px-3 py-1 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            {(paper.journalRef || paper.doi || paper.comments) && (
              <div className="space-y-4">
                {paper.journalRef && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Journal Reference
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {paper.journalRef}
                    </p>
                  </div>
                )}
                {paper.doi && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      DOI
                    </h2>
                    <a
                      href={paper.doi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                    >
                      {paper.doi}
                    </a>
                  </div>
                )}
                {paper.comments && (
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Comments
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {paper.comments}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => onViewPDF(paper.pdfLink)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <FileText className="h-5 w-5" />
                View PDF
              </button>
              <a
                href={paper.id}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
                arXiv Page
              </a>
            </div>

            {/* Related Papers */}
            <RelatedPapers
              paper={paper}
              allPapers={allPapers}
              onViewPDF={onViewPDF}
              onPaperClick={onPaperClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
