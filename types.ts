
export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  iframeUrl: string;
  category: GameCategory;
  description: string;
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  ARCADE = 'Arcade',
  RACING = 'Racing',
  SPORTS = 'Sports',
  ADVENTURE = 'Adventure',
  UTILITY = 'Utility',
  KIDS = 'Kids'
}

export interface AppState {
  searchQuery: string;
  selectedCategory: GameCategory;
  activeGameIds: string[];
  activeTabIndex: number;
  favorites: string[];
}
