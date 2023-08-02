export interface TableState {
  selectedMark: string[];
  selectedModels: string[];
  markCounts: Record<string, number>;
  currentPage: number;
}