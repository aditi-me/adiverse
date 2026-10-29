import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { Projects } from './components/Projects.jsx';
import { Experience } from './components/Experience.jsx';
import { Skills } from './components/Skills.jsx';
import { About } from './components/About.jsx';
import { Contact } from './components/Contact.jsx';
import { Footer } from './components/Footer.jsx';
import { FloatingCompanion } from './components/FloatingCompanion.jsx';
import { portfolioData } from './data/portfolioData.js';

export function App() {
  // Default to light mode for the authentic sebg.ch clean Swiss editorial look
  const [darkMode, setDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProject, setActiveProject] = useState(null);
  const [currentNarrative, setCurrentNarrative] = useState("Hi, I'm Seb. Scroll down and I'll show you around.");

  // Section-based narratives (like on sebg.ch)
  const sectionNarratives = {
    hero: "Hi, I'm Seb. Scroll down and I'll show you around.",
    projects: "Take a look at my work for Swiss luxury watchmakers and open-source utilities!",
    experience: "I've been building for the web for 8+ years, currently at Liip in Lausanne.",
    skills: "My core arsenal: Vue, React, Astro, Three.js, Tailwind, and Storybook design systems.",
    about: "Where technical rigor meets creative play. Zero-jank animations and component systems.",
    contact: "Want the tour again? Or let's build something extraordinary together!"
  };

  // Scroll listener to update narrative dynamically as user scrolls down the page
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
            if (activeSection !== sectionId) {
              setActiveSection(sectionId);
              setActiveProject(null); // Reset specific project when scrolling
              setCurrentNarrative(sectionNarratives[sectionId] || sectionNarratives.hero);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // Handler when user hovers or clicks a specific project
  const handleProjectHover = (project) => {
    setActiveProject(project);
    if (project.mascotQuote) {
      setCurrentNarrative(project.mascotQuote);
    }
  };

  return (
    <div className={`min-h-screen selection:bg-blue-500 selection:text-white transition-colors duration-300 ${
      darkMode 
        ? 'dark bg-[#0a0a0c] text-[#f4f4f6]' 
        : 'bg-[#fafafa] text-[#09090b]'
    }`}>
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
          currentNarrative={currentNarrative} 
        />
        <Projects 
          projects={portfolioData.projects}
          onProjectHover={handleProjectHover}
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

      {/* Floating companion that stays with the user and comments on everything */}
      <FloatingCompanion
        currentNarrative={currentNarrative}
        activeSection={activeSection}
        activeProject={activeProject}
      />

      <Footer profile={portfolioData.profile} />
    </div>
  );
}

export default App;
