import React from "react";
import { X, FileText, ExternalLink, Calendar, Tag, Users } from "lucide-react";
import { ArxivPaper } from "../types/arxiv";
import { formatDate } from "../utils/formatters";

interface PaperModalProps {
  paper: ArxivPaper;
  onClose: () => void;
  darkMode: boolean;
}

export function PaperModal({ paper, onClose }: PaperModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl dark:shadow-black/50 w-full max-w-3xl max-h-[90vh] overflow-y-auto transition-colors">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/80 dark:bg-gray-800/80">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Paper Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6">
          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">
            {paper.title}
          </h3>

          {/* Authors */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Users className="h-5 w-5" />
              <span className="font-medium">Authors</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {paper.authors.map((author, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {author}
                </span>
              ))}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Published</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {formatDate(paper.published)}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="h-5 w-5" />
                <span className="font-medium">Last Updated</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {formatDate(paper.updated)}
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Tag className="h-5 w-5" />
              <span className="font-medium">Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {paper.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Abstract
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {paper.summary}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <a
              href={paper.pdfLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
            >
              <FileText className="h-5 w-5" />
              View PDF
            </a>
            <a
              href={paper.id}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              arXiv Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
