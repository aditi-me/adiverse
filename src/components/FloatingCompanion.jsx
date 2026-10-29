import React, { useState } from 'react';
import { MessageSquare, X, ChevronUp, ChevronDown, Volume2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const FloatingCompanion = ({ 
  currentNarrative, 
  activeSection, 
  activeProject 
}) => {
  const [minimized, setMinimized] = useState(false);

  // Dynamic context message based on scroll
  const getContextLabel = () => {
    if (activeProject) return `Explaining: ${activeProject.title}`;
    if (activeSection === 'projects') return 'Explaining: Selected Works';
    if (activeSection === 'experience') return 'Explaining: Career Timeline';
    if (activeSection === 'skills') return 'Explaining: Tech Stack';
    if (activeSection === 'about') return 'Explaining: Philosophy';
    if (activeSection === 'contact') return 'Explaining: Get In Touch';
    return "Guided Tour Guide";
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm pointer-events-auto font-mono">
      {minimized ? (
        <button
          onClick={() => {
            sounds.playPop();
            setMinimized(false);
          }}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl flex items-center gap-2 border border-blue-400 transition-all hover:scale-105"
          title="Open Seb's Tour Guide"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-bold">Seb's Tour Guide</span>
          <MessageSquare size={16} />
        </button>
      ) : (
        <div className="p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-2 text-zinc-900 dark:text-zinc-100 transition-all">
          <div className="flex items-center justify-between text-[11px] pb-1 border-b border-zinc-200 dark:border-zinc-800 text-zinc-500">
            <span className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {getContextLabel()}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(true)}
                className="p-1 hover:text-zinc-900 dark:hover:text-white rounded"
                title="Minimize guide"
              >
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <p className="text-xs font-sans leading-relaxed text-zinc-700 dark:text-zinc-300">
            "{currentNarrative}"
          </p>

          <div className="flex items-center justify-between pt-1 text-[10px] text-zinc-400">
            <span>Scrolls dynamically as you browse</span>
            <a 
              href="#hero" 
              onClick={() => sounds.playClick()}
              className="text-blue-500 hover:underline"
            >
              Back to Mascot ↑
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
