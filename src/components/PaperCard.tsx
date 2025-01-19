import React, { useState } from "react";
import {
  FileText,
  Share2,
  Calendar,
  Tag,
  Users,
  ChevronDown,
  ChevronUp,
  Gauge,
  ExternalLink,
} from "lucide-react";
import { ArxivPaper } from "../types/arxiv";
import { formatDate } from "../utils/formatters";
import { ShareMenu } from "./ShareMenu";

interface PaperCardProps {
  paper: ArxivPaper;
  onViewPDF: (url: string) => void;
  onClick: () => void;
}

export function PaperCard({ paper, onViewPDF, onClick }: PaperCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handlePDFClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewPDF(paper.pdfLink);
  };

  const handleArxivClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(paper.id, "_blank");
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  const toggleShareMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-900/50 transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-pointer group relative"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-xl font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          {paper.title}
        </h4>
        <div className="flex items-center gap-2">
          {paper.score !== undefined &&
            !isNaN(paper.score) &&
            paper.score > 0 && (
              <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                <Gauge className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-500 dark:text-blue-400">
                  {paper.score}% Match
                </span>
              </div>
            )}
          <button
            onClick={toggleShareMenu}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Share2 className="h-4 w-4" />
          </button>
          {showShareMenu && (
            <ShareMenu paper={paper} onClose={() => setShowShareMenu(false)} />
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{paper.authors.length} Authors</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(paper.published)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Tag className="h-4 w-4" />
          <span>{paper.primaryCategory}</span>
        </div>
      </div>

      <p
        className={`text-gray-700 dark:text-gray-300 mb-4 ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {paper.summary}
      </p>

      {expanded && (
        <div className="space-y-4 mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Authors
              </h5>
              <div className="flex flex-wrap gap-2">
                {paper.authors.map((author, index) => (
                  <span
                    key={index}
                    className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-700 dark:text-gray-300"
                  >
                    {author}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Categories
              </h5>
              <div className="flex flex-wrap gap-2">
                {paper.categories.map((category, index) => (
                  <span
                    key={index}
                    className="text-sm bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400 px-2 py-1 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {paper.journalRef && (
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Journal Reference
              </h5>
              <p className="text-gray-700 dark:text-gray-300">
                {paper.journalRef}
              </p>
            </div>
          )}
          {paper.comments && (
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                Comments
              </h5>
              <p className="text-gray-700 dark:text-gray-300">
                {paper.comments}
              </p>
            </div>
          )}
          {paper.doi && (
            <div>
              <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                DOI
              </h5>
              <a
                href={paper.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300"
                onClick={(e) => e.stopPropagation()}
              >
                {paper.doi}
              </a>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <button
          onClick={toggleExpanded}
          className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show More
            </>
          )}
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={handleArxivClick}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            arXiv Page
          </button>
          <button
            onClick={handlePDFClick}
            className="flex items-center gap-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium"
          >
            <FileText className="h-4 w-4" />
            View PDF
          </button>
        </div>
      </div>
    </div>
  );
}
