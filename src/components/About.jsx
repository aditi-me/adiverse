import React from 'react';
import { Heart, Terminal, Compass, Layers, Github, ExternalLink } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const About = ({ profile }) => {
  return (
    <section id="about" className="py-24 border-b border-dark-border/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">PHILOSOPHY & CRAFT</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              Where technical rigor meets creative play.
            </h2>

            <div className="space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed">
              <p>
                I believe the best digital experiences are rooted in balance: rock-solid engineering under the hood paired with fluid, delightful interaction on the surface.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                Whether creating bespoke interactive tools for century-old Swiss watchmakers or crafting open-source macOS menu bar utilities, my work revolves around component-driven design systems, micro-interactions, and accessible typography.
              </p>
              <p className="text-zinc-400 text-sm sm:text-base">
                When not coding client flagships at Liip, you will find me tinkering with Three.js shaders, contributing to open-source UI tools, or exploring Alpine trails in Valais.
              </p>
            </div>

            {/* Principles Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
                <span className="text-blue-400 font-mono text-xs flex items-center gap-1.5">
                  <Terminal size={14} />
                  01 / Performance First
                </span>
                <h4 className="font-display font-bold text-white text-base">Zero-Jank Motion</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Animations rendered strictly on the GPU compositor (transforms & opacity) ensuring locked 60/120fps.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-2">
                <span className="text-emerald-400 font-mono text-xs flex items-center gap-1.5">
                  <Layers size={14} />
                  02 / Design Systems
                </span>
                <h4 className="font-display font-bold text-white text-base">Design Tokens & Storybook</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Reusable, documented UI primitives that allow design and engineering teams to ship cohesive features fast.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Site Colophon & Open Source */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Colophon Card */}
            <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">COLOPHON / HOW THIS SITE IS BUILT</span>
              <h3 className="font-display font-bold text-xl text-white">Behind The Screen</h3>
              
              <ul className="space-y-3 text-xs font-mono text-zinc-400">
                <li className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Framework</span>
                  <span className="text-white">React 18 / Static Architecture</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Interactive 3D</span>
                  <span className="text-white">Three.js WebGL (Interactive Mascot)</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Styling & Grid</span>
                  <span className="text-white">Tailwind CSS (Swiss Minimalist)</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Audio Feedback</span>
                  <span className="text-white">Web Audio API (Procedural Synthesis)</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
                  <span className="text-zinc-500">Deployment</span>
                  <span className="text-emerald-400">Netlify / Vercel Edge CDN</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-zinc-500">Database</span>
                  <span className="text-zinc-400">Zero (Static Content File)</span>
                </li>
              </ul>
            </div>

            {/* Open Source Highlight Box */}
            <div className="p-6 rounded-3xl bg-blue-950/20 border border-blue-500/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400">OPEN SOURCE CREATION</span>
                <Github size={16} className="text-blue-400" />
              </div>
              <h4 className="font-display font-bold text-white text-lg">StableBar for macOS</h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                A native, ultra-customizable status bar replacement with AeroSpace/yabai tiling window manager integration.
              </p>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 font-medium"
              >
                <span>View on GitHub</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

