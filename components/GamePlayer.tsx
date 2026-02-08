import React, { useState, useRef, useEffect } from 'react';
import { Game } from '../types';

interface GamePlayerProps {
  games: Game[];
  activeTabIndex: number;
  onCloseTab: (index: number) => void;
  onSwitchTab: (index: number) => void;
}

export const GamePlayer: React.FC<GamePlayerProps> = ({ games, activeTabIndex, onCloseTab, onSwitchTab }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const activeGame = games[activeTabIndex];

  const toggleFullScreen = () => {
    const elem = document.getElementById('game-viewport-container');
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const openInNewTab = () => {
    if (activeGame) {
      window.open(activeGame.iframeUrl, '_blank');
    }
  };

  if (!activeGame) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-300">
      {/* Tab Bar */}
      <div className="flex items-center bg-slate-900 border-b border-slate-800 px-2 pt-2 space-x-1 overflow-x-auto no-scrollbar">
        {games.map((game, idx) => (
          <div 
            key={`${game.id}-${idx}`}
            onClick={() => onSwitchTab(idx)}
            className={`flex items-center min-w-[120px] max-w-[200px] px-3 py-2 rounded-t-xl cursor-pointer transition-all ${
              idx === activeTabIndex 
              ? 'bg-slate-950 text-indigo-400 border-t border-l border-r border-slate-800' 
              : 'text-slate-500 hover:bg-slate-800/50'
            }`}
          >
            <span className="text-xs font-bold truncate flex-1">{game.title}</span>
            <button 
              onClick={(e) => { e.stopPropagation(); onCloseTab(idx); }}
              className="ml-2 p-0.5 rounded-full hover:bg-slate-700 text-slate-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        <button 
          onClick={() => onCloseTab(-1)} // Special value to close everything and return home
          className="p-2 text-slate-500 hover:text-white"
          title="Close All & Exit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white leading-none">{activeGame.title}</h2>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{activeGame.category}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={openInNewTab}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors border border-slate-700"
            title="Open in New Tab"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
          <button 
            onClick={toggleFullScreen}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors border border-slate-700"
            title="Toggle Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Viewport View (renders all active tabs to keep state, but hides inactive ones) */}
      <div id="game-viewport-container" className="flex-1 bg-black relative">
        {games.map((game, idx) => (
          <div 
            key={`${game.id}-iframe-${idx}`}
            className={`absolute inset-0 transition-opacity duration-300 ${idx === activeTabIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <iframe 
              src={game.iframeUrl} 
              title={game.title}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; keyboard; geolocation; microphone; camera"
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin"
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};