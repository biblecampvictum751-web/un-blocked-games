import { Game, GameCategory } from './types';

export const GAMES: Game[] = [
  {
    id: 'roblox-proxy',
    title: 'Roblox',
    thumbnail: 'https://picsum.photos/id/124/400/300',
    iframeUrl: './roblox.html',
    category: GameCategory.ACTION,
    description: 'Play Roblox unblocked through our local proxy. This helps bypass simple network filters.'
  },
  {
    id: 'infinite-craft',
    title: 'Infinite Craft',
    thumbnail: 'https://picsum.photos/id/116/400/300',
    iframeUrl: './infinite-craft.html',
    category: GameCategory.PUZZLE,
    description: 'Craft elements including Water (💧), Fire (🔥), Wind (🌬️), and Earth (🌍) locally in this portal.'
  },
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    thumbnail: 'https://picsum.photos/id/127/400/300',
    iframeUrl: './subway-surfers.html',
    category: GameCategory.ARCADE,
    description: 'Dodge trains and collect coins in this local HTML version featuring the San Francisco update.'
  },
  {
    id: '1v1-lol',
    title: '1v1.LOL',
    thumbnail: 'https://picsum.photos/id/131/400/300',
    iframeUrl: './1v1-lol.html',
    category: GameCategory.ACTION,
    description: 'Build and shoot locally. Optimized for performance and bypassing filters.'
  },
  {
    id: 'run-3',
    title: 'Run 3',
    thumbnail: 'https://picsum.photos/id/125/400/300',
    iframeUrl: './run-3.html',
    category: GameCategory.ACTION,
    description: 'A fast-paced runner game set in space. Navigate through tunnels and avoid falling into the void.'
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    thumbnail: 'https://picsum.photos/id/126/400/300',
    iframeUrl: './retro-bowl.html',
    category: GameCategory.SPORTS,
    description: 'The perfect game for the armchair quarterback. Can you manage your team to the ultimate prize?'
  },
  {
    id: 'cookie-clicker',
    title: 'Cookie Clicker',
    thumbnail: 'https://picsum.photos/id/128/400/300',
    iframeUrl: './cookie-clicker.html',
    category: GameCategory.ARCADE,
    description: 'Click the cookie and build your empire in this local version of the ultimate idle game.'
  },
  {
    id: 'slope-game',
    title: 'Slope',
    thumbnail: 'https://picsum.photos/id/121/400/300',
    iframeUrl: './slope-game.html',
    category: GameCategory.ACTION,
    description: 'A fast-paced 3D running game. Control a ball rolling down a slope and avoid obstacles.'
  },
  {
    id: 'bitlife',
    title: 'BitLife',
    thumbnail: 'https://picsum.photos/id/129/400/300',
    iframeUrl: './bitlife.html',
    category: GameCategory.ADVENTURE,
    description: 'Live your life how you want to in this local life simulator.'
  },
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    thumbnail: 'https://picsum.photos/id/130/400/300',
    iframeUrl: './shell-shockers.html',
    category: GameCategory.ACTION,
    description: 'The world\'s most popular egg-based FPS.'
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2',
    thumbnail: 'https://picsum.photos/id/132/400/300',
    iframeUrl: './paper-io-2.html',
    category: GameCategory.ARCADE,
    description: 'Capture as much territory as possible and become the king of the map!'
  },
  {
    id: 'google-search',
    title: 'Google',
    thumbnail: 'https://picsum.photos/id/119/400/300',
    iframeUrl: 'https://www.google.com/search?igu=1',
    category: GameCategory.UTILITY,
    description: 'The world\'s most popular search engine, optimized for iframing in this portal.'
  },
  {
    id: 'bing-search',
    title: 'Bing',
    thumbnail: 'https://picsum.photos/id/122/400/300',
    iframeUrl: 'https://www.bing.com',
    category: GameCategory.UTILITY,
    description: 'Microsoft\'s search engine.'
  },
  {
    id: 'yahoo-search',
    title: 'Yahoo',
    thumbnail: 'https://picsum.photos/id/123/400/300',
    iframeUrl: 'https://www.yahoo.com',
    category: GameCategory.UTILITY,
    description: 'Yahoo search and news portal.'
  },
  {
    id: 'pbs-kids',
    title: 'PBS Kids',
    thumbnail: 'https://picsum.photos/id/120/400/300',
    iframeUrl: 'https://pbskids.org/',
    category: GameCategory.KIDS,
    description: 'Educational games and videos from your favorite PBS KIDS shows.'
  },
  {
    id: 'ai-studio',
    title: 'Google AI Studio',
    thumbnail: 'https://picsum.photos/id/115/400/300',
    iframeUrl: 'https://aistudio.google.com',
    category: GameCategory.ADVENTURE,
    description: 'Explore the cutting edge of AI development.'
  }
];

export const CATEGORIES = Object.values(GameCategory);