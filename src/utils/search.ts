import { ArxivPaper } from '../types/arxiv';

// Advanced text preprocessing with scientific terms handling
function preprocessText(text: string): string[] {
  // Extended academic/scientific stopwords
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
    'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
    'will', 'with', 'the', 'this', 'we', 'our', 'using', 'based', 'show', 'shows',
    'shown', 'study', 'studies', 'method', 'methods', 'result', 'results',
    'paper', 'research', 'propose', 'proposed', 'approach', 'novel', 'new',
    'demonstrate', 'demonstrates', 'demonstrated', 'present', 'presents', 'presented',
    'analyze', 'analyzes', 'analyzed', 'analysis', 'experiment', 'experiments',
    'experimental', 'observe', 'observes', 'observed', 'observation', 'observations'
  ]);

  // Preserve hyphenated terms and compound words
  const preserveCompounds = text.replace(/(?<=[a-z])-(?=[a-z])/gi, '_');

  // Split into terms while preserving scientific notation and compound terms
  const terms = preserveCompounds
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .map(term => term.replace(/_/g, '-'))
    .filter(word => {
      return (word.length > 2 && !stopWords.has(word)) || 
             /\d/.test(word) || 
             word.includes('-');
    });

  return terms;
}

// Calculate semantic similarity with advanced features
export function calculateSemanticScore(query: string, paper: ArxivPaper): number {
  if (!query.trim()) return 0;

  const queryTerms = preprocessText(query);
  const paperTerms = preprocessText(`${paper.title} ${paper.summary}`);
  
  // Calculate term frequency for query terms in paper
  const termFrequencies = new Map<string, number>();
  for (const term of paperTerms) {
    termFrequencies.set(term, (termFrequencies.get(term) || 0) + 1);
  }

  let score = 0;
  const weights = {
    exactMatch: 2.0,
    partialMatch: 1.0,
    titleBoost: 1.5,
    abstractBoost: 1.0,
    categoryBoost: 1.2
  };

  // Calculate score based on term matches
  for (const queryTerm of queryTerms) {
    // Check for exact matches
    if (termFrequencies.has(queryTerm)) {
      score += weights.exactMatch * termFrequencies.get(queryTerm)!;
    }

    // Check for partial matches
    for (const paperTerm of paperTerms) {
      if (paperTerm.includes(queryTerm) || queryTerm.includes(paperTerm)) {
        score += weights.partialMatch;
      }
    }

    // Title boost
    if (paper.title.toLowerCase().includes(queryTerm)) {
      score += weights.titleBoost;
    }

    // Category boost
    if (paper.categories.some(cat => cat.toLowerCase().includes(queryTerm))) {
      score += weights.categoryBoost;
    }
  }

  // Normalize score to percentage (0-100)
  const maxPossibleScore = queryTerms.length * (
    weights.exactMatch + 
    weights.titleBoost + 
    weights.categoryBoost + 
    weights.partialMatch * 2
  );

  const normalizedScore = Math.round((score / maxPossibleScore) * 100);
  return Math.min(100, Math.max(0, normalizedScore));
}

// Enhanced paper ranking with score normalization
export function rankPapersByRelevance(papers: ArxivPaper[], query: string): (ArxivPaper & { score: number })[] {
  if (!papers.length || !query.trim()) {
    return papers.map(paper => ({ ...paper, score: 0 }));
  }

  const papersWithScores = papers.map(paper => ({
    ...paper,
    score: calculateSemanticScore(query, paper)
  }));

  return papersWithScores.sort((a, b) => b.score - a.score);
}

// Find related papers based on content similarity
export function findRelatedPapers(paper: ArxivPaper, allPapers: ArxivPaper[]): ArxivPaper[] {
  const paperText = `${paper.title} ${paper.summary} ${paper.categories.join(' ')}`.toLowerCase();
  const paperTerms = preprocessText(paperText);

  return allPapers
    .filter(p => p.id !== paper.id)
    .map(otherPaper => {
      const otherText = `${otherPaper.title} ${otherPaper.summary} ${otherPaper.categories.join(' ')}`.toLowerCase();
      const otherTerms = preprocessText(otherText);

      // Calculate Jaccard similarity
      const intersection = new Set(paperTerms.filter(term => otherTerms.includes(term)));
      const union = new Set([...paperTerms, ...otherTerms]);
      const similarity = intersection.size / union.size;

      // Category overlap boost
      const categoryOverlap = paper.categories.filter(cat => otherPaper.categories.includes(cat)).length;
      const categoryBoost = 1 + (categoryOverlap / Math.max(paper.categories.length, otherPaper.categories.length));

      // Author overlap boost
      const authorOverlap = paper.authors.filter(author => otherPaper.authors.includes(author)).length;
      const authorBoost = 1 + (authorOverlap / Math.max(paper.authors.length, otherPaper.authors.length));

      return {
        ...otherPaper,
        score: Math.round(similarity * categoryBoost * authorBoost * 100)
      };
    })
    .sort((a, b) => (b.score || 0) - (a.score || 0));
}