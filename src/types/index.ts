export type NavItem = {
  id: string;
  label: string;
  icon: string;
  color?: string;
};

export type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

export type AppView =
  | 'discover'
  | 'applications'
  | 'games'
  | 'arcade'
  | 'create'
  | 'work'
  | 'play'
  | 'develop'
  | 'categories'
  | 'updates';

export type SortStep = {
  array: number[];
  comparing: number[];
  swapped: number[];
  sorted: number[];
};

export type AlgorithmCard = {
  id: SortAlgorithm;
  title: string;
  subtitle: string;
  complexity: string;
  spaceComplexity: string;
  stable: boolean;
  color: string;
  emoji: string;
};
