import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Github, Linkedin, Twitter, Clock } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const Contact = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateSwissTime = () => {
      const now = new Date();
      // Format time in Zurich/Geneva/Lausanne timezone
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setCurrentTime(timeStr);
    };

    updateSwissTime();
    const interval = setInterval(updateSwissTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    sounds.playSuccess();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="rounded-3xl bg-gradient-to-b from-zinc-900/60 to-zinc-950 border border-zinc-800/80 p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-8 relative z-10">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {profile.availability}
              </span>

              {/* Live Swiss Time */}
              <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Clock size={12} className="text-zinc-500" />
                <span>Lausanne, CH: {currentTime || '12:00:00'} (CET)</span>
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-tight">
                Let's build something <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">extraordinary together.</span>
              </h2>
              <p className="text-zinc-400 text-base sm:text-lg font-sans max-w-xl">
                Have an upcoming project, design system need, or luxury digital experience in mind? Reach out directly.
              </p>
            </div>

            {/* Email Contact Interaction */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={`mailto:${profile.email}`}
                onClick={() => sounds.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-mono text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 transition-all shadow-lg"
              >
                <Mail size={15} />
                <span>Send Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full font-mono text-xs font-medium bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/80 transition-colors"
                title="Click to copy email"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied {profile.email}!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy: {profile.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Channels */}
            <div className="pt-8 border-t border-zinc-800/80 flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-400">
              <span className="text-zinc-600">CONNECT ELSEWHERE:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Github size={14} />
                <span>GitHub</span>
                <ArrowUpRight size={12} className="text-zinc-600" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Linkedin size={14} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="text-zinc-600" />
              </a>
              <a
                href={profile.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sounds.playClick()}
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Twitter size={14} />
                <span>Twitter / X</span>
                <ArrowUpRight size={12} className="text-zinc-600" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
