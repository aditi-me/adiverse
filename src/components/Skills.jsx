import React, { useState } from 'react';
import { Layers, Code2, Sparkles, Cpu } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const Skills = ({ skills }) => {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Frontend', 'Creative & 3D', 'Styling', 'Architecture', 'Backend'];

  const filteredSkills = activeTab === 'All'
    ? skills
    : skills.filter(s => s.category === activeTab);

  return (
    <section id="skills" className="py-24 border-b border-dark-border/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">TOOLKIT & ARSENAL</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Technologies & Methodologies
            </h2>
            <p className="text-zinc-400 text-sm font-sans max-w-xl">
              Specialized in modern JavaScript frameworks, component libraries, WebGL 3D, and frictionless developer ergonomics.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sounds.playClick();
                  setActiveTab(cat);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  activeTab === cat
                    ? 'bg-white text-zinc-950 font-semibold'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sounds.playHover()}
              className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/80 text-zinc-400 group-hover:text-blue-300 transition-colors">
                  {skill.category}
                </span>
                <span className="text-[10px] font-mono text-emerald-400">
                  {skill.level}
                </span>
              </div>

              <div>
                <h3 className="font-display font-semibold text-white text-base group-hover:text-blue-400 transition-colors">
                  {skill.name}
                </h3>
              </div>

              {/* Progress bar visual indicator */}
              <div className="w-full h-1 rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500 group-hover:bg-blue-400"
                  style={{ width: skill.level === 'Expert' ? '95%' : '80%' }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
