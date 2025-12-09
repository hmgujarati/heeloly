import React from 'react';

const SwordWingsLogo = ({ className = '', size = 200 }) => {
  return (
    <div className={`sword-wings-logo ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="swordGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#c0c0c0', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#8b0000', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: '#4a4a4a', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Left Wing */}
        <g className="wing left-wing">
          <path d="M 100 150 Q 70 130, 40 140 Q 30 145, 35 155 Q 45 150, 55 155 L 95 155 Z" 
                fill="#1a1a1a" stroke="#8b0000" strokeWidth="0.5" opacity="0.9"/>
          <path d="M 95 155 Q 65 145, 35 155 Q 25 160, 30 170 Q 40 165, 50 170 L 90 165 Z" 
                fill="#0a0a0a" stroke="#8b0000" strokeWidth="0.5" opacity="0.85"/>
          <path d="M 90 165 Q 60 160, 30 170 Q 20 175, 25 185 Q 35 180, 45 185 L 85 175 Z" 
                fill="#1a1a1a" stroke="#8b0000" strokeWidth="0.5" opacity="0.8"/>
          <path d="M 85 175 Q 55 175, 25 185 Q 18 190, 23 200 Q 33 195, 43 200 L 80 185 Z" 
                fill="#0a0a0a" stroke="#8b0000" strokeWidth="0.5" opacity="0.75"/>
        </g>
        
        {/* Right Wing */}
        <g className="wing right-wing">
          <path d="M 200 150 Q 230 130, 260 140 Q 270 145, 265 155 Q 255 150, 245 155 L 205 155 Z" 
                fill="#1a1a1a" stroke="#8b0000" strokeWidth="0.5" opacity="0.9"/>
          <path d="M 205 155 Q 235 145, 265 155 Q 275 160, 270 170 Q 260 165, 250 170 L 210 165 Z" 
                fill="#0a0a0a" stroke="#8b0000" strokeWidth="0.5" opacity="0.85"/>
          <path d="M 210 165 Q 240 160, 270 170 Q 280 175, 275 185 Q 265 180, 255 185 L 215 175 Z" 
                fill="#1a1a1a" stroke="#8b0000" strokeWidth="0.5" opacity="0.8"/>
          <path d="M 215 175 Q 245 175, 275 185 Q 282 190, 277 200 Q 267 195, 257 200 L 220 185 Z" 
                fill="#0a0a0a" stroke="#8b0000" strokeWidth="0.5" opacity="0.75"/>
        </g>
        
        {/* Sword */}
        <g className="sword" filter="url(#glow)">
          {/* Blade */}
          <path d="M 148 50 L 145 180 L 150 240 L 155 180 L 152 50 Z" 
                fill="url(#swordGradient)" stroke="#c0c0c0" strokeWidth="1"/>
          
          {/* Blood glow effect */}
          <path d="M 149 80 L 148 180 L 150 200 L 152 180 L 151 80 Z" 
                fill="#8b0000" opacity="0.3"/>
          
          {/* Crossguard */}
          <rect x="130" y="175" width="40" height="8" fill="#2a2a2a" stroke="#c0c0c0" strokeWidth="1"/>
          <path d="M 125 179 L 130 175 L 130 183 Z" fill="#2a2a2a" stroke="#c0c0c0" strokeWidth="0.5"/>
          <path d="M 175 179 L 170 175 L 170 183 Z" fill="#2a2a2a" stroke="#c0c0c0" strokeWidth="0.5"/>
          
          {/* Handle */}
          <rect x="142" y="183" width="16" height="40" rx="2" fill="#1a1a1a" stroke="#4a4a4a" strokeWidth="1"/>
          <line x1="142" y1="193" x2="158" y2="193" stroke="#8b0000" strokeWidth="0.5" opacity="0.5"/>
          <line x1="142" y1="203" x2="158" y2="203" stroke="#8b0000" strokeWidth="0.5" opacity="0.5"/>
          <line x1="142" y1="213" x2="158" y2="213" stroke="#8b0000" strokeWidth="0.5" opacity="0.5"/>
          
          {/* Pommel */}
          <circle cx="150" cy="228" r="6" fill="#2a2a2a" stroke="#c0c0c0" strokeWidth="1"/>
          <circle cx="150" cy="228" r="3" fill="#8b0000" opacity="0.6"/>
        </g>
      </svg>
    </div>
  );
};

export default SwordWingsLogo;
