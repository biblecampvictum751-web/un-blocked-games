
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
  ADVENTURE = 'Adventure'
}

export interface AppState {
  searchQuery: string;
  selectedCategory: GameCategory;
  selectedGameId: string | null;
  favorites: string[];
}
