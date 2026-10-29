import React, { useState } from 'react';
import { ArrowDown, Copy, Check, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import { Mascot3D } from './Mascot3D.jsx';
import { sounds } from '../utils/sound.js';

export const Hero = ({ profile, activeSection }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-32 pb-20 flex flex-col justify-center border-b border-dark-border/50">
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Bios */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/20 text-xs font-mono text-blue-400">
                <Terminal size={12} />
                Frontend & Creative Tech
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.08] text-white">
                Designing <span className="text-zinc-500 font-normal">substance,</span> <br />
                engineering <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">motion.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-sans leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Key Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4 max-w-lg border-t border-zinc-800/80">
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">{profile.experienceYears}</p>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">{profile.projectsCompleted}</p>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">Shipped Projects</p>
              </div>
              <div>
                <p className="font-display font-bold text-2xl sm:text-3xl text-white">{profile.awardsCount}</p>
                <p className="text-xs font-mono text-zinc-500 mt-0.5">Design Awards</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-lg hover:shadow-blue-500/10"
              >
                <span>Explore Work</span>
                <ArrowDown size={14} />
              </a>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-mono text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
                title="Click to copy email"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied to clipboard!</span>
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

          {/* Right Column: Interactive 3D Mascot Character */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-sm w-full max-w-sm flex flex-col items-center shadow-2xl">
              
              {/* Badge above mascot */}
              <div className="w-full flex items-center justify-between pb-4 mb-2 border-b border-zinc-800/80 text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-amber-400" />
                  Interactive Companion
                </span>
                <span className="text-zinc-600">Three.js</span>
              </div>

              {/* 3D Canvas */}
              <Mascot3D activeSection={activeSection} />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

