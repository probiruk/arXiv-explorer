export const ARXIV_CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'cs.AI', label: 'Artificial Intelligence' },
  { value: 'cs.CL', label: 'Computation and Language' },
  { value: 'cs.CV', label: 'Computer Vision' },
  { value: 'cs.LG', label: 'Machine Learning' },
  { value: 'cs.NE', label: 'Neural and Evolutionary Computing' },
  { value: 'cs.RO', label: 'Robotics' },
  { value: 'cs.SE', label: 'Software Engineering' },
  { value: 'math.ST', label: 'Statistics Theory' },
  { value: 'physics', label: 'Physics' },
  { value: 'q-bio', label: 'Quantitative Biology' },
  { value: 'q-fin', label: 'Quantitative Finance' },
] as const;

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'lastUpdated', label: 'Last Updated' },
  { value: 'submitted', label: 'Submission Date' },
] as const;

export const SEARCH_FIELDS = [
  { value: 'title', label: 'Title' },
  { value: 'abstract', label: 'Abstract' },
  { value: 'author', label: 'Author' },
  { value: 'journalRef', label: 'Journal Reference' },
] as const;