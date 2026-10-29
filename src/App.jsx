import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { Projects } from './components/Projects.jsx';
import { Experience } from './components/Experience.jsx';
import { Skills } from './components/Skills.jsx';
import { About } from './components/About.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { portfolioData } from './data/portfolioData.js';

export function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for 3D Mascot speech bubble reactivity
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'experience', 'skills', 'about', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen selection:bg-blue-500 selection:text-white transition-colors duration-300 ${darkMode ? 'dark bg-[#0a0a0c] text-[#f4f4f6]' : 'bg-[#fafafa] text-[#09090b]'}`}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        profile={portfolioData.profile}
      />

      <main>
        <Hero 
          profile={portfolioData.profile} 
          activeSection={activeSection} 
        />
        <Projects 
          projects={portfolioData.projects} 
        />
        <Experience 
          experience={portfolioData.experience} 
          awards={portfolioData.awards} 
        />
        <Skills 
          skills={portfolioData.skills} 
        />
        <About 
          profile={portfolioData.profile} 
        />
        <Contact 
          profile={portfolioData.profile} 
        />
      </main>

      <Footer profile={portfolioData.profile} />
    </div>
  );
}

export default App;
