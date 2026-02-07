
import { GAMES, CATEGORIES, GameCategory } from './constants.js';

// --- State Management ---
let state = {
  searchQuery: '',
  selectedCategory: GameCategory.ALL,
  selectedGameId: null,
  favorites: JSON.parse(localStorage.getItem('nexus_favorites') || '[]')
};

function setState(updates) {
  state = { ...state, ...updates };
  if (updates.favorites) {
    localStorage.setItem('nexus_favorites', JSON.stringify(state.favorites));
  }
  render();
}

// --- Event Handlers ---
window.toggleFavorite = (id) => {
  const newFavorites = state.favorites.includes(id)
    ? state.favorites.filter(fav => fav !== id)
    : [...state.favorites, id];
  setState({ favorites: newFavorites });
};

window.setCategory = (cat) => setState({ selectedCategory: cat });
window.handleSearch = (e) => setState({ searchQuery: e.target.value });
window.openGame = (id) => {
  setState({ selectedGameId: id });
  document.body.style.overflow = 'hidden';
};
window.closeGame = () => {
  setState({ selectedGameId: null });
  document.body.style.overflow = 'auto';
};
window.toggleFullScreen = () => {
  const elem = document.getElementById('game-container');
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen();
  }
};

// --- Templates ---
function GameCardTemplate(game) {
  const isFavorite = state.favorites.includes(game.id);
  return `
    <div onclick="openGame('${game.id}')" class="group relative bg-slate-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/20 border border-slate-700 hover:border-indigo-500/50">
      <div class="aspect-[4/3] w-full overflow-hidden">
        <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
      </div>
      <div class="p-4 bg-gradient-to-t from-slate-900 to-slate-800">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">${game.title}</h3>
          <button onclick="event.stopPropagation(); toggleFavorite('${game.id}')" class="p-1.5 rounded-full transition-colors ${isFavorite ? 'text-red-500' : 'text-slate-400 hover:text-red-400'}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="${isFavorite ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        <span class="inline-block px-2 py-1 text-xs font-medium text-indigo-300 bg-indigo-500/10 rounded-md">${game.category}</span>
      </div>
    </div>
  `;
}

function PlayerOverlayTemplate(game) {
  if (!game) return '';
  return `
    <div class="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-300">
      <div class="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
        <div class="flex items-center space-x-4">
          <button onclick="closeGame()" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 class="text-xl font-bold text-white leading-none">${game.title}</h2>
            <p class="text-sm text-slate-500 mt-1">${game.category}</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button onclick="toggleFullScreen()" class="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>Full Screen</span>
          </button>
          <button onclick="closeGame()" class="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-red-500/20 rounded-lg transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div id="game-container" class="flex-1 bg-black flex items-center justify-center overflow-hidden">
        <iframe src="${game.iframeUrl}" title="${game.title}" class="w-full h-full border-0" allow="autoplay; fullscreen; keyboard" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin"></iframe>
      </div>
      <div class="px-6 py-4 bg-slate-900 border-t border-slate-800 hidden md:block">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-slate-200 font-semibold mb-1">About the game</h3>
          <p class="text-slate-400 text-sm leading-relaxed">${game.description}</p>
        </div>
      </div>
    </div>
  `;
}

// --- Core Rendering ---
function render() {
  const filtered = GAMES.filter(g => {
    const matchCat = state.selectedCategory === GameCategory.ALL || g.category === state.selectedCategory;
    const matchSearch = g.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const favorites = GAMES.filter(g => state.favorites.includes(g.id));
  const selectedGame = GAMES.find(g => g.id === state.selectedGameId);

  document.getElementById('app').innerHTML = `
    <!-- Header -->
    <header class="sticky top-0 z-40 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="bg-indigo-600 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 class="text-2xl font-black text-white tracking-tighter uppercase italic">Nexus<span class="text-indigo-500">Games</span></h1>
        </div>
        <div class="flex-1 max-w-md mx-8 hidden md:block">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input type="text" placeholder="Search for games..." oninput="handleSearch(event)" value="${state.searchQuery}" class="w-full bg-slate-800 border-none text-slate-100 pl-10 pr-4 py-2 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-500">
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <a href="#" class="text-slate-400 hover:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
      <!-- Hero Banner -->
      <div class="relative rounded-3xl overflow-hidden mb-12 bg-indigo-900 aspect-[21/9] flex items-center shadow-2xl">
        <img src="https://picsum.photos/id/180/1200/500" class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40">
        <div class="relative z-10 px-8 md:px-16 max-w-2xl">
          <span class="text-indigo-400 font-bold tracking-wider uppercase text-sm mb-4 block">New Release</span>
          <h2 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">LEVEL UP YOUR<br>BREAK TIME.</h2>
          <button onclick="openGame('geometry-dash')" class="bg-indigo-600 hover:bg-white hover:text-indigo-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg active:scale-95">Play Now</button>
        </div>
      </div>

      <!-- Categories -->
      <div class="mb-10 overflow-x-auto no-scrollbar pb-2">
        <div class="flex space-x-3">
          ${CATEGORIES.map(cat => `
            <button onclick="setCategory('${cat}')" class="whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all ${state.selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Favorites -->
      ${favorites.length > 0 && state.searchQuery === '' && state.selectedCategory === GameCategory.ALL ? `
        <section class="mb-12">
          <div class="flex items-center space-x-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <h2 class="text-2xl font-black text-slate-100 tracking-tight">Your Favorites</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${favorites.map(g => GameCardTemplate(g)).join('')}
          </div>
          <div class="h-px bg-slate-800 mt-12"></div>
        </section>
      ` : ''}

      <!-- Games Grid -->
      <section>
        <h2 class="text-2xl font-black text-slate-100 tracking-tight mb-8">
          ${state.selectedCategory === GameCategory.ALL ? 'Trending Now' : state.selectedCategory + ' Games'}
          <span class="ml-3 text-slate-500 font-medium text-lg">(${filtered.length})</span>
        </h2>
        
        ${filtered.length > 0 ? `
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            ${filtered.map(g => GameCardTemplate(g)).join('')}
          </div>
        ` : `
          <div class="flex flex-col items-center justify-center py-20 text-center">
            <div class="bg-slate-800 p-6 rounded-full mb-6 text-slate-600">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 class="text-xl font-bold text-slate-300">No games found</h3>
            <button onclick="setCategory('${GameCategory.ALL}')" class="mt-6 text-indigo-500 hover:text-indigo-400 font-semibold">Clear all filters</button>
          </div>
        `}
      </section>
    </main>

    <footer class="bg-slate-900 py-12 border-t border-slate-800 mt-auto">
      <div class="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
        © 2024 Nexus Games Portal. Built with pure performance.
      </div>
    </footer>

    <!-- Game Player Modal -->
    ${PlayerOverlayTemplate(selectedGame)}
  `;
}

// Initial render
render();
