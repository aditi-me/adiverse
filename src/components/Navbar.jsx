import React, { useState } from 'react';
import { Volume2, VolumeX, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/sound.js';

export const Navbar = ({ darkMode, setDarkMode, isMuted, setIsMuted, profile }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Work', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Stack', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = () => {
    sounds.playClick();
    setMobileMenuOpen(false);
  };

  const handleSoundToggle = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleThemeToggle = () => {
    sounds.playPop();
    setDarkMode(!darkMode);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark-bg/80 dark:bg-[#0a0a0c]/85 border-b border-dark-border/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand & Live Status */}
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            onClick={() => sounds.playClick()}
            className="font-display font-bold text-lg tracking-tight text-white hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <span>{profile.name}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              CH
            </span>
          </a>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for work</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-xs text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              onMouseEnter={() => sounds.playHover()}
              className="hover:text-white transition-colors relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-blue-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Actions: Audio, Dark Mode, Contact */}
        <div className="flex items-center gap-3">
          {/* Sound Synthesizer Toggle */}
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title={isMuted ? "Unmute interactive audio" : "Mute interactive audio"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} className="text-blue-400" />}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={handleThemeToggle}
            className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
          </button>

          {/* Direct CTA */}
          <a
            href="#contact"
            onClick={() => sounds.playClick()}
            className="hidden sm:inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-mono font-medium bg-white text-black hover:bg-zinc-200 transition-all shadow-sm"
          >
            <span>Let's talk</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-current transform transition ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-current transform transition ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex flex-col gap-3 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavClick}
              className="py-2 text-zinc-300 hover:text-white border-b border-zinc-900"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs text-emerald-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for new projects
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
