import { GAMES, CATEGORIES, GameCategory } from './constants.js';

// --- Environment Check ---
const isPortable = !!window.__NEXUS_PORTABLE__;

// --- State Management ---
let state = {
  searchQuery: '',
  selectedCategory: GameCategory.ALL,
  selectedGameId: null,
  showDownloadInstructions: false,
  favorites: JSON.parse(localStorage.getItem('nexus_favorites') || '[]'),
  randomGameLoadCount: 0
};

function setState(updates) {
  state = { ...state, ...updates };
  if (updates.favorites) {
    localStorage.setItem('nexus_favorites', JSON.stringify(state.favorites));
  }
  render();
}

// --- Cloaking Logic (about:blank) ---
window.cloakSite = () => {
  const win = window.open('about:blank', '_blank');
  if (!win) {
    alert('Popup blocked! Please allow popups for cloaking to work.');
    return;
  }
  
  const doc = win.document;
  doc.title = 'Classes'; // Stealth title
  
  const iframe = doc.createElement('iframe');
  const style = iframe.style;
  style.position = 'fixed';
  style.top = style.bottom = style.left = style.right = 0;
  style.width = style.height = '100%';
  style.border = 'none';
  
  iframe.src = window.location.href;
  doc.body.appendChild(iframe);
  doc.body.style.margin = '0';
  doc.body.style.padding = '0';
  doc.body.style.overflow = 'hidden';
  
  // Go to a non-suspicious site in the original tab
  window.location.replace('https://classroom.google.com');
};

// --- Event Handlers ---
window.goHome = () => {
  setState({ 
    searchQuery: '', 
    selectedCategory: GameCategory.ALL, 
    selectedGameId: null,
    showDownloadInstructions: false,
    randomGameLoadCount: 0
  });
  document.body.style.overflow = 'auto';
};

window.toggleFavorite = (id) => {
  const newFavorites = state.favorites.includes(id)
    ? state.favorites.filter(fav => fav !== id)
    : [...state.favorites, id];
  setState({ favorites: newFavorites });
};

window.setCategory = (cat) => setState({ selectedCategory: cat });
window.handleSearch = (e) => setState({ searchQuery: e.target.value });

window.openGame = (id) => {
  setState({ selectedGameId: id, randomGameLoadCount: 0 });
  document.body.style.overflow = 'hidden';
};

window.closeGame = () => {
  setState({ selectedGameId: null, randomGameLoadCount: 0 });
  document.body.style.overflow = 'auto';
};

window.openInNewTabDirect = (url) => {
  window.open(url, '_blank');
};

window.handleIframeLoad = (id) => {
  const randomGames = ['basket-random', 'soccer-random', 'volley-random', 'boxing-random'];
  if (randomGames.includes(id)) {
    state.randomGameLoadCount++;
    if (state.randomGameLoadCount > 1) {
      window.closeGame();
    }
  }
};

window.closeInstructions = () => {
  setState({ showDownloadInstructions: false });
};

window.toggleFullScreen = () => {
  const elem = document.getElementById('game-container');
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => console.error(err));
  } else {
    document.exitFullscreen();
  }
};

// --- Download Site Functionality ---
window.downloadSite = async () => {
  if (isPortable) return;
  window.goHome();
  setState({ showDownloadInstructions: true });

  try {
    const responseConstants = await fetch('./constants.js');
    const constantsText = await responseConstants.text();
    
    const responseIndex = await fetch('./index.js');
    let indexText = await responseIndex.text();

    // Remove imports
    indexText = indexText.replace(/import\s+{[^}]+}\s+from\s+['"].\/constants\.js['"];?/g, '');
    
    const standaloneHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nexus Games Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; background-color: #0f172a; color: #f8fafc; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
    </style>
</head>
<body>
    <div id="app" class="min-h-screen flex flex-col"></div>
    <script type="module">
        window.__NEXUS_PORTABLE__ = true;
        ${constantsText.replace(/export /g, '')}
        ${indexText}
    </script>
</body>
</html>`;

    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nexus-games-unblocked.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download failed', err);
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
          <button onclick="openInNewTabDirect('${game.iframeUrl}')" class="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-colors border border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span class="hidden sm:inline">Open in New Tab</span>
          </button>
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
        <iframe src="${game.iframeUrl}" title="${game.title}" onload="handleIframeLoad('${game.id}')" class="w-full h-full border-0" allow="autoplay; fullscreen; keyboard" sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin"></iframe>
      </div>
    </div>
  `;
}

function InstructionsModalTemplate() {
  if (isPortable || !state.showDownloadInstructions) return '';
  return `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in zoom-in duration-200">
      <div class="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-lg w-full shadow-2xl">
        <div class="flex items-center space-x-3 mb-6">
          <div class="bg-indigo-600 p-2 rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
          </div>
          <h3 class="text-2xl font-black text-white italic tracking-tight">how to run game:</h3>
        </div>
        <p class="text-slate-300 text-lg leading-relaxed mb-8">
          after the downlode is compleat go to websim.com and make a new project with a prompt that says 'make a button that loads this html' and atactch the html if you want you can also upload the project
        </p>
        <button onclick="closeInstructions()" class="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
          Got it!
        </button>
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
    <header class="sticky top-0 z-40 w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div onclick="goHome()" class="flex items-center space-x-2 cursor-pointer group">
          <div class="bg-indigo-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
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
          ${!isPortable ? `
            <button onclick="cloakSite()" title="Incognito Mode" class="p-2 text-slate-400 hover:text-indigo-400 transition-all bg-slate-800 rounded-lg hover:bg-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
            <button onclick="downloadSite()" title="Download Portable Version" class="flex items-center space-x-2 px-3 py-2 text-slate-400 hover:text-indigo-400 transition-all bg-slate-800 rounded-lg hover:bg-slate-700">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
               </svg>
               <span class="hidden sm:inline text-sm font-semibold">Riptide</span>
            </button>
          ` : ''}
          <a href="https://github.com" target="_blank" class="text-slate-400 hover:text-white transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z"/></svg>
          </a>
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
      <div class="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-8 flex items-center space-x-3 text-amber-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span class="text-sm font-medium">some games wont work becus the person who made this is fucking stupid</span>
      </div>

      <div class="mb-10 overflow-x-auto no-scrollbar pb-2">
        <div class="flex space-x-3">
          ${CATEGORIES.map(cat => `
            <button onclick="setCategory('${cat}')" class="whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-bold transition-all ${state.selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}">
              ${cat}
            </button>
          `).join('')}
        </div>
      </div>

      <section>
        <h2 class="text-2xl font-black text-slate-100 tracking-tight mb-8">
          ${state.selectedCategory === GameCategory.ALL ? 'Trending Now' : state.selectedCategory + ' Games'}
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          ${filtered.map(g => GameCardTemplate(g)).join('')}
        </div>
      </section>
    </main>

    ${PlayerOverlayTemplate(selectedGame)}
    ${InstructionsModalTemplate()}
  `;
}

render();