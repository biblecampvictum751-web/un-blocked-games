export const GameCategory = {
  ALL: 'All',
  ACTION: 'Action',
  PUZZLE: 'Puzzle',
  ARCADE: 'Arcade',
  RACING: 'Racing',
  SPORTS: 'Sports',
  ADVENTURE: 'Adventure',
  UTILITY: 'Utility',
  KIDS: 'Kids'
};

export const GAMES = [
  {
    id: 'roblox-proxy',
    title: 'Roblox',
    thumbnail: 'https://picsum.photos/id/124/400/300',
    iframeUrl: './roblox.html',
    category: GameCategory.ACTION,
    description: 'Play Roblox unblocked through our local proxy.'
  },
  {
    id: 'infinite-craft',
    title: 'Infinite Craft',
    thumbnail: 'https://picsum.photos/id/116/400/300',
    iframeUrl: './infinite-craft.html',
    category: GameCategory.PUZZLE,
    description: 'Craft elements including Water (💧), Fire (🔥), Wind (🌬️), and Earth (🌍) locally.'
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    thumbnail: 'https://picsum.photos/id/127/400/300',
    iframeUrl: './subway-surfers.html',
    category: GameCategory.ARCADE,
    description: 'Dodge trains and collect coins in this local HTML version.'
  },
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    thumbnail: 'https://picsum.photos/id/131/400/300',
    iframeUrl: './1v1-lol.html',
    category: GameCategory.ACTION,
    description: 'Build and shoot locally.'
  },
  {
    id: 'run-3',
    title: 'Run 3',
    thumbnail: 'https://picsum.photos/id/125/400/300',
    iframeUrl: './run-3.html',
    category: GameCategory.ACTION,
    description: 'Navigate through tunnels in space.'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    thumbnail: 'https://picsum.photos/id/126/400/300',
    iframeUrl: './retro-bowl.html',
    category: GameCategory.SPORTS,
    description: 'Armchair quarterback team management game.'
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    thumbnail: 'https://picsum.photos/id/128/400/300',
    iframeUrl: './cookie-clicker.html',
    category: GameCategory.ARCADE,
    description: 'Click the cookie and build your empire.'
  },
  {
    id: 'slope-game',
    title: 'Slope',
    thumbnail: 'https://picsum.photos/id/121/400/300',
    iframeUrl: './slope-game.html',
    category: GameCategory.ACTION,
    description: 'Control a ball rolling down a slope.'
  },
  {
    id: 'bitlife',
    title: 'BitLife',
    thumbnail: 'https://picsum.photos/id/129/400/300',
    iframeUrl: './bitlife.html',
    category: GameCategory.ADVENTURE,
    description: 'Live your life how you want to locally.'
  },
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    thumbnail: 'https://picsum.photos/id/130/400/300',
    iframeUrl: './shell-shockers.html',
    category: GameCategory.ACTION,
    description: 'Egg-based FPS action.'
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2',
    thumbnail: 'https://picsum.photos/id/132/400/300',
    iframeUrl: './paper-io-2.html',
    category: GameCategory.ARCADE,
    description: 'Capture territory to become king.'
  }
];

export const CATEGORIES = Object.values(GameCategory);