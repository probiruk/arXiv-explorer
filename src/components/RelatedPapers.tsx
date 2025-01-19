import React from 'react';
import { ArxivPaper } from '../types/arxiv';
import { PaperCard } from './PaperCard';
import { findRelatedPapers } from '../utils/search';

interface RelatedPapersProps {
  paper: ArxivPaper;
  allPapers: ArxivPaper[];
  onViewPDF: (url: string) => void;
  onPaperClick: (paper: ArxivPaper) => void;
}

export function RelatedPapers({ paper, allPapers, onViewPDF, onPaperClick }: RelatedPapersProps) {
  const relatedPapers = React.useMemo(
    () => findRelatedPapers(paper, allPapers).slice(0, 5),
    [paper, allPapers]
  );

  if (!relatedPapers.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Related Papers
      </h3>
      <div className="space-y-4">
        {relatedPapers.map((relatedPaper) => (
          <PaperCard
            key={relatedPaper.id}
            paper={relatedPaper}
            onViewPDF={onViewPDF}
            onClick={() => onPaperClick(relatedPaper)}
          />
        ))}
      </div>
    </div>
  );
}