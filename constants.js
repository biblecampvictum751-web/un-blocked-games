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
    id: 'free-friend',
    title: 'Free Friend!',
    thumbnail: 'https://picsum.photos/id/102/400/300',
    iframeUrl: 'https://bonzibudbuddy.org/download.html',
    category: GameCategory.ARCADE,
    description: 'Your new best friend is just a click away! Enjoy the company of a digital pal.'
  },
  {
    id: 'agar-io',
    title: 'Agar.io',
    thumbnail: 'https://picsum.photos/id/112/400/300',
    iframeUrl: 'https://agar.io/',
    category: GameCategory.ACTION,
    description: 'The smash-hit game! Control your cell and eat other players to grow larger. Play with millions of players around the world!'
  },
  {
    id: 'deadshot-io',
    title: 'Deadshot.io',
    thumbnail: 'https://picsum.photos/id/111/400/300',
    iframeUrl: 'https://deadshot.io/',
    category: GameCategory.ACTION,
    description: 'Deadshot.io is a fast-paced first-person shooter (FPS) game that tests your reflexes and tactical skills.'
  },
  {
    id: 'more-games-portal',
    title: 'more games cuz im too lay to get all of thears htmls',
    thumbnail: 'https://picsum.photos/id/108/400/300',
    iframeUrl: 'https://playgama.com/?cntscp=curated&utm_source=bing&utm_medium=cpc&utm_campaign=Bing_Search_US_eng_Desktop_General_eCPA&utm_campaign_id=522280371&utm_adgroup=general&utm_adgroup_id=1312819378275024&utm_term=unblocked+games+pc&utm_content=82051445738855&utm_target=kwd-82052466699003:loc-190&utm_network=o&utm_device=c&msclkid=68fec05226c415cbc6d8a9d595689227',
    category: GameCategory.ADVENTURE,
    description: 'A massive collection of more games for you to explore when one portal isn\'t enough!'
  },
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    thumbnail: 'https://picsum.photos/id/101/400/300',
    iframeUrl: 'https://smashkarts.io/',
    category: GameCategory.ACTION,
    description: 'Smash Karts is a free io Multiplayer Kart Battle Arena game. Drive fast. Fire rockets. Make big explosions.'
  },
  {
    id: 'soccer-random',
    title: 'Soccer Random',
    thumbnail: 'https://picsum.photos/id/105/400/300',
    iframeUrl: 'https://soccerrandom.vercel.app/',
    category: GameCategory.SPORTS,
    description: 'Soccer Random is a 2-player physics-based soccer game. Jump and kick the ball to score!'
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    thumbnail: 'https://picsum.photos/id/26/400/300',
    iframeUrl: 'https://basketrandom.vercel.app/',
    category: GameCategory.SPORTS,
    description: 'Basket Random is a 2-player arcade game with ragdoll physics. Jump and fight for the ball through various fields.'
  },
  {
    id: 'volley-random',
    title: 'Volley Random',
    thumbnail: 'https://picsum.photos/id/106/400/300',
    iframeUrl: 'https://volleyrandom.vercel.app/',
    category: GameCategory.SPORTS,
    description: 'Volley Random is a fun 2-player volleyball game with ragdoll physics. Hit the ball to the opponent\'s side!'
  },
  {
    id: 'boxing-random',
    title: 'Boxing Random',
    thumbnail: 'https://picsum.photos/id/107/400/300',
    iframeUrl: 'https://boxingrandom.vercel.app/',
    category: GameCategory.SPORTS,
    description: 'Boxing Random features ragdoll-style boxing matches. Try to hit your opponent\'s head to win!'
  },
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