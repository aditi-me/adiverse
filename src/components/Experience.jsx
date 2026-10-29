import React from 'react';
import { Briefcase, Award, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const Experience = ({ experience, awards }) => {
  return (
    <section id="experience" className="py-24 border-b border-dark-border/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Career Journey */}
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-3">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">CAREER TIMELINE</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Experience & Roles
              </h2>
              <p className="text-zinc-400 text-sm font-sans">
                A track record of engineering scalable frontend architectures and design systems for enterprise and luxury brands.
              </p>
            </div>

            {/* Timeline List */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-zinc-800">
              {experience.map((item, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => sounds.playHover()}
                  className="relative pl-10 space-y-3 group"
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-zinc-900 border-2 border-blue-500 group-hover:scale-125 transition-transform" />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display font-bold text-xl text-white group-hover:text-blue-400 transition-colors">
                      {item.role}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
                      {item.period}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                    <span className="text-zinc-200 font-medium">{item.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-zinc-500">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 font-sans leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="space-y-1.5 pt-1 text-xs font-mono text-zinc-400">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <ChevronRight size={12} className="text-blue-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Awards & Recognitions */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">HONORS & RECOGNITION</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Industry Awards
              </h2>
              <p className="text-zinc-400 text-sm font-sans">
                Accolades celebrating creative interaction, motion, and web craft.
              </p>
            </div>

            <div className="space-y-4">
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => sounds.playHover()}
                  className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-amber-500/30 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-amber-400 group-hover:rotate-12 transition-transform" />
                      <span className="font-display font-semibold text-white text-base">
                        {award.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                      {award.year}
                    </span>
                  </div>

                  <p className="text-xs font-mono text-blue-400">
                    Project: {award.project}
                  </p>

                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {award.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Swiss Quality badge */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-400 space-y-2">
              <div className="text-white font-bold flex items-center gap-2">
                <span>🇨🇭</span>
                <span>Swiss Design Standards</span>
              </div>
              <p className="text-zinc-500">
                Prioritizing clean typography, ruthless performance optimization, zero-layout-shift rendering, and robust accessibility (WCAG AA).
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

