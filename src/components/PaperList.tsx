import { ArxivPaper } from "../types/arxiv";
import { PaperCard } from "./PaperCard";
import { LoadMoreButton } from "./LoadMoreButton";

interface PaperListProps {
  title: string;
  papers: (ArxivPaper & { score?: number })[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  onViewPDF: (url: string) => void;
  onPaperClick: (paper: ArxivPaper) => void;
}

export function PaperList({
  title,
  papers,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onViewPDF,
  onPaperClick,
}: PaperListProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-black dark:text-white mb-4">
        {title}
      </h3>
      {papers.map((paper) => (
        <PaperCard
          key={paper.id}
          paper={paper}
          onViewPDF={onViewPDF}
          onClick={() => onPaperClick(paper)}
        />
      ))}
      {hasMore && onLoadMore && (
        <LoadMoreButton
          isLoading={isLoadingMore || false}
          onClick={onLoadMore}
        />
      )}
    </div>
  );
}
