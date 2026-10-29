import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sounds } from '../utils/sound.js';

export const Mascot3D = ({ activeSection = 'hero' }) => {
  const mountRef = useRef(null);
  const [mood, setMood] = useState('curious');
  const [speech, setSpeech] = useState("Hey there! I'm Seb's virtual bot.");
  const [outfitIndex, setOutfitIndex] = useState(0);

  const outfits = [
    { name: 'Standard Dev', color: 0x3b82f6, eyeColor: 0x60a5fa, accessory: 'antenna' },
    { name: 'Swiss Luxury', color: 0xd97706, eyeColor: 0xfbbf24, accessory: 'monocle' },
    { name: 'Retro Cyber', color: 0x10b981, eyeColor: 0x34d399, accessory: 'visor' },
    { name: 'Dark Mode Stealth', color: 0x8b5cf6, eyeColor: 0xa78bfa, accessory: 'horns' }
  ];

  const currentOutfit = outfits[outfitIndex];

  useEffect(() => {
    // Dynamic speech based on current section
    if (activeSection === 'hero') {
      setSpeech("Welcome to the portfolio! Explore around.");
    } else if (activeSection === 'projects') {
      setSpeech("Check out the luxury watch & open-source work!");
    } else if (activeSection === 'experience') {
      setSpeech("Over 8+ years crafting interactive web magic.");
    } else if (activeSection === 'contact') {
      setSpeech("Need a project built? Hit the copy button!");
    }
  }, [activeSection]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(220, 220);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(currentOutfit.color, 2, 8);
    pointLight.position.set(-2, -1, 3);
    scene.add(pointLight);

    // Root Mascot Group
    const mascotGroup = new THREE.Group();
    scene.add(mascotGroup);

    // Robot Head (Dithered / Polygonal Chamfered Box)
    const headGeo = new THREE.BoxGeometry(2.2, 1.8, 1.8, 4, 4, 4);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.35,
      metalness: 0.7,
      wireframe: false,
    });
    const head = new THREE.Mesh(headGeo, headMat);
    mascotGroup.add(head);

    // Wireframe overlay for the signature sebg.ch dithered/retro digital feel
    const wireMat = new THREE.MeshBasicMaterial({
      color: currentOutfit.color,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireOverlay = new THREE.Mesh(headGeo, wireMat);
    head.add(wireOverlay);

    // Robot Screen / Face Plate
    const screenGeo = new THREE.BoxGeometry(1.8, 1.2, 0.1);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 0, 0.91);
    head.add(screen);

    // Animated Digital Eyes
    const eyeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: currentOutfit.eyeColor });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.45, 0.1, 0.98);
    head.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.45, 0.1, 0.98);
    head.add(rightEye);

    // Ears / Bolts
    const earGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.3, 12);
    const earMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, metalness: 0.8 });
    
    const leftEar = new THREE.Mesh(earGeo, earMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-1.25, 0, 0);
    head.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, earMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(1.25, 0, 0);
    head.add(rightEar);

    // Antenna on top
    const antennaStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8);
    const antennaStem = new THREE.Mesh(antennaStemGeo, earMat);
    antennaStem.position.set(0, 1.2, 0);
    head.add(antennaStem);

    const tipGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const tipMat = new THREE.MeshBasicMaterial({ color: currentOutfit.color });
    const antennaTip = new THREE.Mesh(tipGeo, tipMat);
    antennaTip.position.set(0, 1.6, 0);
    head.add(antennaTip);

    // Tracking mouse movements
    let targetRotX = 0;
    let targetRotY = 0;
    let isSpinning = false;
    let spinVelocity = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetRotY = Math.max(-0.6, Math.min(0.6, deltaX * 0.8));
      targetRotX = Math.max(-0.5, Math.min(0.5, deltaY * 0.6));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      head.rotation.y += (targetRotY - head.rotation.y) * 0.08;
      head.rotation.x += (targetRotX - head.rotation.x) * 0.08;

      // Gentle floating / breathing
      mascotGroup.position.y = Math.sin(elapsed * 2.2) * 0.14;

      // Click spin effect
      if (isSpinning) {
        head.rotation.y += spinVelocity;
        spinVelocity *= 0.92;
        if (spinVelocity < 0.01) {
          isSpinning = false;
        }
      }

      // Antenna glow pulse
      antennaTip.scale.setScalar(1 + Math.sin(elapsed * 5) * 0.15);

      renderer.render(scene, camera);
    };

    animate();

    // Trigger click reaction
    const handleClick = () => {
      sounds.playPop();
      isSpinning = true;
      spinVelocity = 0.45;
      const responses = [
        "Wheee! Clean code in motion!",
        "Awwwards Honorable Mention vibe!",
        "Exploring the interactive 3D stack!",
        "Zero bugs detected in this sector!",
        "Crafting delightful micro-interactions!"
      ];
      setSpeech(responses[Math.floor(Math.random() * responses.length)]);
    };

    container.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      headGeo.dispose();
      headMat.dispose();
      wireGeoDispose: if (wireMat) wireMat.dispose();
    };
  }, [outfitIndex]);

  const cycleOutfit = (e) => {
    e.stopPropagation();
    sounds.playClick();
    const nextIdx = (outfitIndex + 1) % outfits.length;
    setOutfitIndex(nextIdx);
    setSpeech(`Switched outfit to: ${outfits[nextIdx].name}!`);
  };

  return (
    <div className="relative group flex flex-col items-center">
      {/* Interactive Speech Bubble */}
      <div className="mb-2 px-3 py-1.5 rounded-full bg-dark-card/90 dark:bg-white/10 backdrop-blur-md border border-dark-border dark:border-white/15 text-xs text-dark-text dark:text-zinc-200 shadow-xl transition-all duration-300 pointer-events-none text-center max-w-[220px]">
        <span className="font-mono text-blue-400 mr-1.5">◆</span>
        {speech}
      </div>

      {/* 3D Canvas Box */}
      <div 
        ref={mountRef} 
        className="w-[200px] h-[200px] cursor-pointer flex items-center justify-center transition-transform hover:scale-105"
        title="Click me to spin!"
      />

      {/* Outfit Switcher Pill */}
      <button
        onClick={cycleOutfit}
        className="mt-1 flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60 transition-colors shadow-sm"
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `#${currentOutfit.color.toString(16)}` }} />
        <span>Outfit: {currentOutfit.name}</span>
      </button>
      <span className="text-[10px] text-zinc-500 font-mono mt-1">Click bot to spin / Click pill to change</span>
    </div>
  );
};
