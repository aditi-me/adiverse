import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sounds } from '../utils/sound.js';
import { Sparkles, Move, Camera, Volume2 } from 'lucide-react';

export const Mascot3D = ({ 
  currentNarrative = "Hi, I'm Seb. Scroll down and I'll show you around.", 
  onActionTriggered 
}) => {
  const mountRef = useRef(null);
  const containerRef = useRef(null);
  const [speech, setSpeech] = useState(currentNarrative);
  const [activeAction, setActiveAction] = useState(null);
  const [isTickled, setIsTickled] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [outfitIndex, setOutfitIndex] = useState(0);

  // Position state for dragging
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  // Character outfits
  const outfits = [
    { name: 'Casual Hoodie', primary: 0x3b82f6, accent: 0x60a5fa, wire: 0x93c5fd },
    { name: 'Swiss Watchmaker', primary: 0xd97706, accent: 0xfbbf24, wire: 0xfde68a },
    { name: 'Cyber Neon', primary: 0x10b981, accent: 0x34d399, wire: 0xa7f3d0 },
    { name: 'Stealth Noir', primary: 0x6366f1, accent: 0x818cf8, wire: 0xc7d2fe },
  ];
  const outfit = outfits[outfitIndex];

  // Actions list (exactly as on sebg.ch)
  const actionsList = [
    { id: 'dance', label: 'Dance', sound: 'playDance' },
    { id: 'punch', label: 'Punching bag', sound: 'playPunch' },
    { id: 'panic', label: 'Panic', sound: 'playTickle' },
    { id: 'fly', label: 'Fly', sound: 'playFly' },
    { id: 'vanish', label: 'Vanish', sound: 'playPop' },
    { id: 'hiccup', label: 'Hiccup', sound: 'playHiccup' },
    { id: 'peekaboo', label: 'Peekaboo', sound: 'playPop' },
    { id: 'selfie', label: 'Selfie', sound: 'playCamera' },
    { id: 'dizzy', label: 'Dizzy', sound: 'playDance' },
    { id: 'sneeze', label: 'Sneeze', sound: 'playSneeze' },
    { id: 'sulk', label: 'Sulk', sound: 'playClick' },
  ];

  // Update speech when narrative prop changes (as user scrolls through site)
  useEffect(() => {
    if (!activeAction && !isTickled) {
      setSpeech(currentNarrative);
    }
  }, [currentNarrative, activeAction, isTickled]);

  // Three.js Scene Setup & Animation Engine
  const animState = useRef({
    action: null,
    actionTime: 0,
    rotX: 0,
    rotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    punchVelocity: 0,
    punchAngle: 0,
    flyY: 0,
    vanishScale: 1,
    dancePhase: 0,
    shakeIntensity: 0,
    sulkAngle: 0,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Setup Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(240, 240);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(outfit.accent, 0.6);
    backLight.position.set(-5, -3, -4);
    scene.add(backLight);

    // Root Group
    const mascotRoot = new THREE.Group();
    scene.add(mascotRoot);

    // Head (Polygonal Dithered Character)
    const headGeo = new THREE.BoxGeometry(2.0, 1.8, 1.8, 4, 4, 4);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f23,
      roughness: 0.35,
      metalness: 0.6,
    });
    const headMesh = new THREE.Mesh(headGeo, headMat);
    headMesh.position.y = 0.5;
    mascotRoot.add(headMesh);

    // Signature sebg.ch dithered wireframe grid overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: outfit.wire,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireMesh = new THREE.Mesh(headGeo, wireMat);
    headMesh.add(wireMesh);

    // Face Screen
    const screenGeo = new THREE.BoxGeometry(1.6, 1.1, 0.1);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, 0.91);
    headMesh.add(screenMesh);

    // Eyes
    const eyeGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const eyeMat = new THREE.MeshBasicMaterial({ color: outfit.accent });

    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.42, 0.08, 0.98);
    headMesh.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.42, 0.08, 0.98);
    headMesh.add(rightEye);

    // Pupils / Highlights
    const pupilGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const leftPupil = new THREE.Mesh(pupilGeo, pupilMat);
    leftPupil.position.set(-0.38, 0.12, 1.14);
    headMesh.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeo, pupilMat);
    rightPupil.position.set(0.46, 0.12, 1.14);
    headMesh.add(rightPupil);

    // Body (Torso with Outfit color)
    const bodyGeo = new THREE.BoxGeometry(1.5, 1.4, 1.2, 3, 3, 3);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: outfit.primary,
      roughness: 0.5,
      metalness: 0.3,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.set(0, -1.15, 0);
    mascotRoot.add(bodyMesh);

    // Body wireframe accent
    const bodyWireMat = new THREE.MeshBasicMaterial({
      color: outfit.accent,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const bodyWireMesh = new THREE.Mesh(bodyGeo, bodyWireMat);
    bodyMesh.add(bodyWireMesh);

    // Movable Arms
    const armGeo = new THREE.BoxGeometry(0.35, 1.0, 0.35);
    const armMat = new THREE.MeshStandardMaterial({ color: 0x27272a });

    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-1.05, -1.0, 0);
    mascotRoot.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(1.05, -1.0, 0);
    mascotRoot.add(rightArm);

    // Cap / Antenna Top
    const capGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6, 8);
    const capMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46 });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.set(0, 1.2, 0);
    headMesh.add(capMesh);

    const antennaTipGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const antennaTipMat = new THREE.MeshBasicMaterial({ color: outfit.accent });
    const antennaTip = new THREE.Mesh(antennaTipGeo, antennaTipMat);
    antennaTip.position.set(0, 1.5, 0);
    headMesh.add(antennaTip);

    // Mouse Tracking Event
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

      animState.current.targetRotY = Math.max(-0.65, Math.min(0.65, deltaX * 0.9));
      animState.current.targetRotX = Math.max(-0.5, Math.min(0.5, deltaY * 0.7));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const s = animState.current;

      // Base idle breathing & hover
      let baseHover = Math.sin(elapsed * 2.2) * 0.12;
      mascotRoot.position.y = baseHover;

      // Smooth mouse follow
      s.rotY += (s.targetRotY - s.rotY) * 0.08;
      s.rotX += (s.targetRotX - s.rotX) * 0.08;

      headMesh.rotation.y = s.rotY;
      headMesh.rotation.x = s.rotX;

      // Reset base scale
      mascotRoot.scale.set(1, 1, 1);

      // ACTION ANIMATIONS (The signature sebg.ch actions)
      if (s.action === 'dance') {
        s.actionTime += delta;
        const phase = s.actionTime * 9;
        headMesh.rotation.z = Math.sin(phase) * 0.28;
        headMesh.rotation.y = Math.cos(phase * 0.7) * 0.5;
        mascotRoot.position.y = baseHover + Math.abs(Math.sin(phase * 2)) * 0.4;
        leftArm.rotation.x = Math.sin(phase) * 1.4;
        rightArm.rotation.x = -Math.sin(phase) * 1.4;
        if (s.actionTime > 3.2) s.action = null;
      } else if (s.action === 'punch') {
        // Punching bag recoil oscillation
        s.actionTime += delta;
        s.punchAngle += s.punchVelocity;
        s.punchVelocity -= s.punchAngle * 0.25;
        s.punchVelocity *= 0.94;
        mascotRoot.rotation.z = s.punchAngle;
        headMesh.rotation.x = -Math.abs(s.punchAngle) * 0.4;
        if (Math.abs(s.punchVelocity) < 0.005 && Math.abs(s.punchAngle) < 0.01) {
          mascotRoot.rotation.z = 0;
          s.action = null;
        }
      } else if (s.action === 'panic') {
        s.actionTime += delta;
        const shake = Math.sin(s.actionTime * 45) * 0.18;
        mascotRoot.position.x = shake;
        headMesh.rotation.z = shake * 1.2;
        leftEye.scale.set(1.5, 1.5, 1.5);
        rightEye.scale.set(1.5, 1.5, 1.5);
        if (s.actionTime > 2.8) {
          leftEye.scale.set(1, 1, 1);
          rightEye.scale.set(1, 1, 1);
          mascotRoot.position.x = 0;
          s.action = null;
        }
      } else if (s.action === 'fly') {
        s.actionTime += delta;
        if (s.actionTime < 1.2) {
          // Rocket upward
          s.flyY += 0.12;
          mascotRoot.position.y = baseHover + s.flyY;
          mascotRoot.rotation.x = -0.4;
        } else if (s.actionTime < 2.5) {
          // Hover top
          mascotRoot.position.y = baseHover + 2.8;
          mascotRoot.rotation.y += 0.08;
        } else {
          // Float back down
          s.flyY *= 0.92;
          mascotRoot.position.y = baseHover + s.flyY;
          mascotRoot.rotation.x *= 0.9;
          if (s.flyY < 0.05) {
            mascotRoot.position.y = baseHover;
            s.flyY = 0;
            s.action = null;
          }
        }
      } else if (s.action === 'vanish') {
        s.actionTime += delta;
        if (s.actionTime < 1.0) {
          s.vanishScale = Math.max(0.01, 1 - s.actionTime * 1.2);
          mascotRoot.rotation.y += 0.3;
        } else if (s.actionTime < 2.0) {
          s.vanishScale = 0.001;
        } else {
          s.vanishScale = Math.min(1, (s.actionTime - 2.0) * 2.5);
          mascotRoot.rotation.y = 0;
          if (s.vanishScale >= 1) {
            s.action = null;
          }
        }
        mascotRoot.scale.set(s.vanishScale, s.vanishScale, s.vanishScale);
      } else if (s.action === 'hiccup') {
        s.actionTime += delta;
        if (s.actionTime < 0.18) {
          mascotRoot.position.y = baseHover + 0.6;
          headMesh.rotation.x = -0.3;
        } else {
          mascotRoot.position.y = baseHover;
          headMesh.rotation.x *= 0.8;
          if (s.actionTime > 1.2) s.action = null;
        }
      } else if (s.action === 'peekaboo') {
        s.actionTime += delta;
        if (s.actionTime < 1.2) {
          headMesh.rotation.y = Math.PI; // Face backwards
        } else {
          headMesh.rotation.y = 0; // Snap forward
          if (s.actionTime > 2.2) s.action = null;
        }
      } else if (s.action === 'selfie') {
        s.actionTime += delta;
        headMesh.rotation.z = -0.25;
        headMesh.rotation.y = 0.35;
        rightArm.rotation.x = -1.2;
        rightArm.position.z = 0.6;
        if (s.actionTime > 2.2) {
          headMesh.rotation.z = 0;
          rightArm.rotation.x = 0;
          rightArm.position.z = 0;
          s.action = null;
        }
      } else if (s.action === 'dizzy') {
        s.actionTime += delta;
        if (s.actionTime < 1.5) {
          headMesh.rotation.y += 0.45; // Fast spin
        } else {
          // Wobbly recovery
          headMesh.rotation.z = Math.sin(s.actionTime * 8) * 0.35;
          if (s.actionTime > 3.0) {
            headMesh.rotation.z = 0;
            s.action = null;
          }
        }
      } else if (s.action === 'sneeze') {
        s.actionTime += delta;
        if (s.actionTime < 0.6) {
          // Inhale windup
          headMesh.rotation.x = 0.4;
          mascotRoot.scale.set(1.2, 1.2, 1.2);
        } else if (s.actionTime < 1.0) {
          // Violent sneeze
          headMesh.rotation.x = -0.7;
          mascotRoot.position.z = 0.4;
        } else {
          headMesh.rotation.x *= 0.85;
          mascotRoot.position.z *= 0.85;
          mascotRoot.scale.set(1, 1, 1);
          if (s.actionTime > 1.8) s.action = null;
        }
      } else if (s.action === 'sulk') {
        s.actionTime += delta;
        headMesh.rotation.x = 0.55; // Slump forward
        bodyMesh.position.y = -1.3;
        if (s.actionTime > 3.0) {
          headMesh.rotation.x *= 0.9;
          bodyMesh.position.y = -1.15;
          if (headMesh.rotation.x < 0.05) s.action = null;
        }
      }

      // Tickled wiggle
      if (isTickled) {
        mascotRoot.position.x = Math.sin(elapsed * 30) * 0.12;
        headMesh.rotation.z = Math.cos(elapsed * 25) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      headGeo.dispose();
      headMat.dispose();
      wireMat.dispose();
      bodyGeo.dispose();
      bodyMat.dispose();
    };
  }, [outfitIndex, isTickled]);

  // Action execution handler
  const triggerAction = (action) => {
    if (sounds[action.sound]) {
      sounds[action.sound]();
    } else {
      sounds.playPop();
    }

    setActiveAction(action.id);
    const s = animState.current;
    s.action = action.id;
    s.actionTime = 0;

    // Custom dialogues for each action
    const dialogues = {
      dance: "🕺 Look at those moves! Coding to the rhythm!",
      punch: "🥊 Ouch! Swinging like a championship speed bag!",
      panic: "😱 AHH! 404 error detected! Just kidding!",
      fly: "🚀 Up, up and away into the WebGL cloud!",
      vanish: "✨ Now you see me... now you don't! Poof!",
      hiccup: "😮 *Hic!* Excuse me! That was unexpected.",
      peekaboo: "🙈 Peek-a-boo! I see you exploring the site!",
      selfie: "📸 Smile! Capturing this moment for the portfolio!",
      dizzy: "💫 Woah... everything is spinning in 360 degrees!",
      sneeze: "🤧 Ah... ah... ACHOO! Excuse my digital dust!",
      sulk: "🥺 Aww, don't leave yet. There is more to see!",
    };

    setSpeech(dialogues[action.id] || "Interacting in real-time!");

    if (action.id === 'punch') {
      s.punchAngle = -0.65;
      s.punchVelocity = 0.42;
    } else if (action.id === 'selfie') {
      setCameraFlash(true);
      setTimeout(() => setCameraFlash(false), 220);
    }

    if (onActionTriggered) onActionTriggered(action.id);
  };

  // Draggable mascot handlers (Hold me to pick me up!)
  const handleMouseDown = (e) => {
    // Check for rapid click (tickling!)
    const now = Date.now();
    if (now - lastClickTimeRef.current < 350) {
      clickCountRef.current += 1;
      if (clickCountRef.current >= 3) {
        sounds.playTickle();
        setIsTickled(true);
        setSpeech("😂 Stop, stop! I'm ticklish! Hahaha!");
        setTimeout(() => {
          setIsTickled(false);
          clickCountRef.current = 0;
          setSpeech(currentNarrative);
        }, 2200);
      }
    } else {
      clickCountRef.current = 1;
    }
    lastClickTimeRef.current = now;

    // Start Drag
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y
    };
    sounds.playPop();
    setSpeech("Wheee! You're carrying me around!");
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPosition({
        x: dragStartRef.current.posX + dx,
        y: dragStartRef.current.posY + dy,
      });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        sounds.playClick();
        setSpeech("Landed! Let's keep exploring.");
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const cycleOutfit = () => {
    sounds.playClick();
    const next = (outfitIndex + 1) % outfits.length;
    setOutfitIndex(next);
    setSpeech(`Fresh fit: ${outfits[next].name}!`);
  };

  return (
    <div className="flex flex-col items-center select-none">
      
      {/* Camera shutter flash effect */}
      {cameraFlash && (
        <div className="fixed inset-0 bg-white z-[9999] pointer-events-none animate-ping opacity-90 transition-opacity" />
      )}

      {/* Draggable Mascot Wrapper */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        className={`relative flex flex-col items-center transition-shadow ${
          isDragging ? 'z-50 scale-105' : 'z-20'
        }`}
      >
        {/* Dynamic Explanatory Speech Bubble */}
        <div className="mb-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-[280px] text-xs font-mono text-center leading-snug relative group">
          <div className="font-bold text-blue-500 mb-0.5 flex items-center justify-center gap-1">
            <Sparkles size={11} />
            <span>SEB SAYS:</span>
          </div>
          {speech}
          {/* Arrow */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45" />
        </div>

        {/* 3D Model Mount */}
        <div 
          ref={mountRef} 
          className="w-[240px] h-[240px] flex items-center justify-center filter drop-shadow-2xl"
          title="Click to tickle • Hold & drag to pick me up!"
        />

        {/* Drag & Outfit Hint */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
            <Move size={10} />
            Hold & drag to move me
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              cycleOutfit();
            }}
            className="text-[10px] font-mono text-blue-500 hover:text-blue-600 dark:text-blue-400 underline"
          >
            Fit: {outfit.name} ↻
          </button>
        </div>
      </div>

      {/* The Signature sebg.ch Action Bar: "What should I do?" */}
      <div className="mt-6 w-full max-w-xl p-4 rounded-2xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 backdrop-blur-sm shadow-sm space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-600 dark:text-zinc-400">
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            What should I do?
          </span>
          <span className="text-[11px] text-zinc-400">Click any action to watch bot react</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {actionsList.map((action) => (
            <button
              key={action.id}
              onClick={() => triggerAction(action)}
              className={`px-2.5 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                activeAction === action.id
                  ? 'bg-blue-600 text-white font-semibold scale-105 shadow-md'
                  : 'bg-white dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-blue-400 hover:text-blue-500 dark:hover:text-blue-400'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
