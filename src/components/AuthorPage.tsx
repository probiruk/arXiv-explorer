import React, { useEffect } from "react";
import { ArxivPaper } from "../types/arxiv";
import { PaperCard } from "./PaperCard";
import { searchArxiv } from "../utils/arxiv";

interface AuthorPageProps {
  authorName: string;
  onClose: () => void;
  onViewPDF: (url: string) => void;
  onPaperClick: (paper: ArxivPaper) => void;
}

export function AuthorPage({
  authorName,
  onClose,
  onViewPDF,
  onPaperClick,
}: AuthorPageProps) {
  const [papers, setPapers] = React.useState<ArxivPaper[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const loadAuthorPapers = async () => {
      try {
        const results = await searchArxiv(authorName, 0, {
          category: "",
          dateFrom: "",
          dateTo: "",
          sortBy: "submitted",
          sortOrder: "descending",
          author: true,
          abstract: false,
          title: false,
          journalRef: false,
          yearFrom: "",
          yearTo: "",
        });

        const filteredResults = results.filter((paper) =>
          paper.authors.some((author) =>
            author.toLowerCase().includes(authorName.toLowerCase())
          )
        );

        setPapers(filteredResults);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to load author papers");
      } finally {
        setIsLoading(false);
      }
    };

    loadAuthorPapers();
  }, [authorName]);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto"
      style={{ paddingTop: "64px" }}
    >
      <div className="min-h-[calc(100vh-64px)] py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Papers by {authorName}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Loading papers...
                </p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600 dark:text-red-400">
                {error}
              </div>
            ) : papers.length === 0 ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                No papers found for this author.
              </div>
            ) : (
              <div className="space-y-6">
                {papers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onViewPDF={onViewPDF}
                    onClick={() => onPaperClick(paper)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
