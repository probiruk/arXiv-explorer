import React from 'react';
import { ArxivPaper } from '../types/arxiv';
import { PaperPage } from './PaperPage';
import { AuthorPage } from './AuthorPage';

interface ModalStackItem {
  type: 'paper' | 'author';
  data: ArxivPaper | string;
  zIndex: number;
}

interface ModalStackProps {
  modalStack: ModalStackItem[];
  papers: ArxivPaper[];
  onClose: (index: number) => void;
  onViewPDF: (url: string) => void;
  onPaperClick: (paper: ArxivPaper) => void;
  onAuthorClick: (author: string) => void;
}

export function ModalStack({
  modalStack,
  papers,
  onClose,
  onViewPDF,
  onPaperClick,
  onAuthorClick
}: ModalStackProps) {
  return (
    <>
      {modalStack.map((modal, index) => (
        <div key={index} style={{ zIndex: modal.zIndex }}>
          {modal.type === 'paper' ? (
            <PaperPage
              paper={modal.data as ArxivPaper}
              allPapers={papers}
              onClose={() => onClose(index)}
              onViewPDF={onViewPDF}
              onPaperClick={onPaperClick}
              onAuthorClick={onAuthorClick}
            />
          ) : (
            <AuthorPage
              authorName={modal.data as string}
              onClose={() => onClose(index)}
              onViewPDF={onViewPDF}
              onPaperClick={onPaperClick}
            />
          )}
        </div>
      ))}
    </>
  );
}