import React, { useState } from 'react';
import { ExternalLink, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { ProjectModal } from './ProjectModal.jsx';
import { sounds } from '../utils/sound.js';

export const Projects = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Luxury & E-Commerce', 'Open Source & Utility', 'Creative & Interactive', 'Platform & Tourism'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleCategoryChange = (cat) => {
    sounds.playClick();
    setSelectedCategory(cat);
  };

  const handleCardClick = (project) => {
    sounds.playPop();
    setActiveModalProject(project);
  };

  return (
    <section id="projects" className="py-24 border-b border-dark-border/50 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
              <Sparkles size={12} className="text-blue-400" />
              <span>Selected Works (2022 — 2024)</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Crafted with precision & motion.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-sans">
              High-profile luxury flagships, native developer utilities, and interactive web installations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-zinc-950 font-semibold shadow-md'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              onMouseEnter={() => sounds.playHover()}
              className="group relative rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-300 p-6 flex flex-col justify-between cursor-pointer overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Image Preview with Hover Zoom */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-950 mb-6 border border-zinc-800/60">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top overlay pills */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
                    {project.year}
                  </span>
                </div>

                {/* Hover CTA Indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-zinc-950 font-mono text-xs font-semibold shadow-lg">
                    <span>View Case Study</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-2xl text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500">
                    {project.client}
                  </span>
                </div>

                <p className="text-zinc-400 text-sm font-sans line-clamp-2">
                  {project.subtitle}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 text-[11px] font-mono text-zinc-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
};

