
export const GameCategory = {
  ALL: 'All',
  ACTION: 'Action',
  PUZZLE: 'Puzzle',
  ARCADE: 'Arcade',
  RACING: 'Racing',
  SPORTS: 'Sports',
  ADVENTURE: 'Adventure'
};

export const GAMES = [
  {
    id: '2048',
    title: '2048',
    thumbnail: 'https://picsum.photos/id/1/400/300',
    iframeUrl: 'https://play2048.co/',
    category: GameCategory.PUZZLE,
    description: 'Join the numbers and get to the 2048 tile!'
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash Lite',
    thumbnail: 'https://picsum.photos/id/2/400/300',
    iframeUrl: 'https://geometrydash.io/',
    category: GameCategory.ARCADE,
    description: 'Jump and fly your way through danger in this rhythm-based action platformer!'
  },
  {
    id: 'minecraft-classic',
    title: 'Minecraft Classic',
    thumbnail: 'https://picsum.photos/id/3/400/300',
    iframeUrl: 'https://classic.minecraft.net/',
    category: GameCategory.ADVENTURE,
    description: 'The original sandbox building game.'
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    thumbnail: 'https://picsum.photos/id/4/400/300',
    iframeUrl: 'https://moto-x3m.io/',
    category: GameCategory.RACING,
    description: 'Experience pure racing fun with awesome levels and stunts.'
  },
  {
    id: 'flappy-bird',
    title: 'Flappy Bird',
    thumbnail: 'https://picsum.photos/id/5/400/300',
    iframeUrl: 'https://flappybird.io/',
    category: GameCategory.ARCADE,
    description: 'Navigate through the green pipes without crashing.'
  },
  {
    id: 'tetris',
    title: 'Tetris',
    thumbnail: 'https://picsum.photos/id/6/400/300',
    iframeUrl: 'https://tetris.com/play-tetris',
    category: GameCategory.PUZZLE,
    description: 'The world-famous block-stacking puzzle game.'
  },
  {
    id: 'basketball-stars',
    title: 'Basketball Stars',
    thumbnail: 'https://picsum.photos/id/7/400/300',
    iframeUrl: 'https://basketballstars.io/',
    category: GameCategory.SPORTS,
    description: 'Show off your skills and move on to the championship.'
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    thumbnail: 'https://picsum.photos/id/8/400/300',
    iframeUrl: 'https://drift-hunters.io/',
    category: GameCategory.RACING,
    description: 'The ultimate drifting game with realistic physics.'
  }
];

export const CATEGORIES = Object.values(GameCategory);
