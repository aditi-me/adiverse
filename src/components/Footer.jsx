import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const Footer = ({ profile }) => {
  const scrollToTop = () => {
    sounds.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-zinc-800/80 bg-zinc-950 font-mono text-xs text-zinc-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Copyright & location */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-center sm:text-left">
          <span className="text-zinc-400">© {new Date().getFullYear()} {profile.name}</span>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <span>Crafted in Lausanne, Switzerland 🇨🇭</span>
        </div>

        {/* Center: Style note */}
        <div className="text-zinc-600 text-center">
          Inspired by <a href="https://www.sebg.ch" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white underline">sebg.ch</a>
        </div>

        {/* Right: Scroll to top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => sounds.playHover()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
        >
          <span>Top</span>
          <ArrowUp size={12} />
        </button>

      </div>
    </footer>
  );
};
