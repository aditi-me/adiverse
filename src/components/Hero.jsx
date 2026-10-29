import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Terminal, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import { Mascot3D } from './Mascot3D.jsx';
import { sounds } from '../utils/sound.js';

export const Hero = ({ profile, currentNarrative }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 border-b border-zinc-200 dark:border-zinc-800/80">
      
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-300">
              <MapPin size={12} className="text-blue-500" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-500/20 text-xs font-mono text-blue-600 dark:text-blue-400">
              <Terminal size={12} />
              Frontend & Creative Developer
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Available for freelance & collaborations</span>
          </div>
        </div>

        {/* Main Grid: Left Story / Right Mascot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & Tour Intro */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Personal Portfolio & Interactive Tour</span>
              </div>
              
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-zinc-950 dark:text-white tracking-tight leading-[1.08]">
                Hi, I'm Seb. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Scroll down
                </span> and I'll show you around.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              I'm a full-stack & frontend developer based in Lausanne, Switzerland, working at Liip. I specialize in fast, accessible web experiences with interactive 3D, responsive micro-interactions, and component-driven design systems.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">8+</p>
                <p className="text-[11px] font-mono text-zinc-500">Years Exp</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">35+</p>
                <p className="text-[11px] font-mono text-zinc-500">Shipped Projects</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white">Awwwards</p>
                <p className="text-[11px] font-mono text-zinc-500">Honorable Mention</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md"
              >
                <span>Start Tour (Selected Work)</span>
                <ArrowDown size={14} />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-mono text-xs font-medium bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-800 transition-colors"
                title="Click to copy email"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied {profile.email}!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>{profile.email}</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Right Column: The Star of the Show — 3D Interactive Mascot */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <Mascot3D currentNarrative={currentNarrative} />
          </div>

        </div>

      </div>
    </section>
  );
};
