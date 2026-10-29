import React, { useEffect } from 'react';
import { X, ExternalLink, Tag, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sounds.playPop();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-zinc-950 border border-zinc-800 text-zinc-100 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
          title="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-blue-400">
              {project.category}
            </span>
            <span>•</span>
            <span>{project.year}</span>
            <span>•</span>
            <span>Client: {project.client}</span>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
            {project.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-sans">
            {project.subtitle}
          </p>
        </div>

        {/* Project Hero Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-zinc-800/80 bg-zinc-900">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
        </div>

        {/* Details & Scope */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono">
          <div>
            <span className="text-zinc-500 block mb-1">MY ROLE</span>
            <span className="text-white font-medium">{project.role}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">CLIENT / ENTITY</span>
            <span className="text-white font-medium">{project.client}</span>
          </div>
          <div>
            <span className="text-zinc-500 block mb-1">TIMELINE</span>
            <span className="text-white font-medium">{project.year}</span>
          </div>
        </div>

        {/* Description & Impact */}
        <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
          <h3 className="font-display font-bold text-lg text-white">Project Overview & Engineering</h3>
          <p>{project.description}</p>

          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-blue-400 shrink-0 mt-0.5" />
            <div className="text-xs font-mono text-blue-200">
              <span className="font-bold block text-blue-300 mb-0.5">Key Impact:</span>
              {project.impact}
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="space-y-3 pt-2">
          <h3 className="font-mono text-xs text-zinc-400 uppercase tracking-wider">Technologies & Tools</h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Live Link Button */}
        <div className="pt-4 flex items-center justify-between border-t border-zinc-800">
          <span className="text-xs font-mono text-zinc-500">Live Case Study</span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sounds.playClick()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-colors"
          >
            <span>Visit Project</span>
            <ExternalLink size={14} />
          </a>
        </div>

      </div>
    </div>
  );
};

