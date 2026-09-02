"use client";
import { useEffect, useState } from "react";
import SynapseLogo from "./SynapseLogo";

const BOOT_SEQUENCE = [
  "> initializing protocol_402…",
  "> linking neural nodes…",
  "> synchronizing cognitive grid…",
  "> verifying signal integrity…",
  "> cognitive layer ready.",
];

export default function Welcome({ onEnter }: { onEnter: () => void }) {
  const [logoVisible, setLogoVisible] = useState(false);
  const [bootIndex, setBootIndex] = useState(-1);
  const [bootComplete, setBootComplete] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Hide NavBar when welcome screen is shown
    const header = document.querySelector('header');
    if (header) {
      header.style.display = 'none';
    }
    return () => {
      if (header) {
        header.style.display = '';
      }
    };
  }, []);

  useEffect(() => {
    // Logo appears first
    const timer1 = setTimeout(() => setLogoVisible(true), 300);
    
    // Boot sequence starts after logo
    const timer2 = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < BOOT_SEQUENCE.length) {
          setBootIndex(index);
          index++;
        } else {
          clearInterval(interval);
          setBootComplete(true);
          setTimeout(() => setContentVisible(true), 500);
        }
      }, 800);
      return () => clearInterval(interval);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-dark-primary via-dark-secondary to-dark-primary">
      {/* Central glow effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-[600px] h-[600px] rounded-full opacity-30 blur-3xl transition-opacity duration-2000 welcome-glow"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.4) 0%, rgba(168, 85, 247, 0.3) 50%, transparent 70%)'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 px-4 max-w-2xl">
        {/* Logo */}
        <div 
          className={`transition-all duration-1000 ${logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        >
          <SynapseLogo size={160} className="animate-pulse" style={{ animationDuration: '3s' }} />
        </div>

        {/* Brand */}
        <div 
          className={`text-center transition-all duration-1000 ${logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h1 className="font-heading text-5xl sm:text-6xl font-bold text-neon-cyan neon-glow-strong mb-2">
            NEURA402
          </h1>
          <p className="text-lg text-neon-cyan/70 font-mono uppercase tracking-wider">
            Cognitive Layer Online
          </p>
        </div>

        {/* Boot sequence */}
        <div className="w-full max-w-md">
          <div className="font-mono text-sm text-neon-cyan/80 space-y-1 min-h-[120px]" style={{ fontFamily: "'JetBrains Mono', 'Space Mono', monospace" }}>
            {BOOT_SEQUENCE.map((line, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  bootIndex >= index
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Main content - appears after boot */}
        <div 
          className={`text-center space-y-6 transition-all duration-1000 ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="space-y-3">
            <h2 className="font-heading text-2xl sm:text-3xl text-neon-light neon-glow">
              Welcome to NEURA402.
            </h2>
            <p className="text-base sm:text-lg text-neon-cyan/80 leading-relaxed max-w-lg mx-auto">
              The decentralized cognitive network powered by Robinhood.<br />
              Each thought, each mention — a signal of intent.
            </p>
          </div>

          {/* Enter button */}
          <button
            onClick={onEnter}
            className="btn-neon px-8 py-4 text-lg font-heading tracking-wider uppercase relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(168, 85, 247, 0.2))',
              border: '1px solid rgba(0, 229, 255, 0.4)',
              boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              ENTER THE NEURAL GRID
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </span>
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
          </button>
        </div>

        {/* Footer */}
        <div 
          className={`text-xs text-neon-cyan/50 font-mono transition-opacity duration-1000 ${
            contentVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Protocol 402 v2.1 — powered by attention
        </div>
      </div>
    </div>
  );
}
