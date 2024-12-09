import React from 'react';

const MiniFootballPitch: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      width="800"
      height="600"
      style={{ backgroundColor: '#4CAF50' }}
    >
      {/* Terrain */}
      <rect width="800" height="600" fill="#4CAF50" />

      {/* Contours */}
      <rect x="10" y="10" width="780" height="580" fill="none" stroke="white" strokeWidth="2" />

      {/* Ligne centrale */}
      <line x1="400" y1="10" x2="400" y2="590" stroke="white" strokeWidth="2" />

      {/* Cercle central */}
      <circle cx="400" cy="300" r="50" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="400" cy="300" r="2" fill="white" />

      {/* Surface de réparation haut */}
      <rect x="300" y="10" width="200" height="100" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="400" cy="70" r="2" fill="white" />

      {/* Surface de réparation bas */}
      <rect x="300" y="490" width="200" height="100" fill="none" stroke="white" strokeWidth="2" />
      <circle cx="400" cy="530" r="2" fill="white" />

      {/* Arcs des surfaces de réparation */}
      <path
        d="M 340 100 A 60 60 0 0 1 460 100"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M 340 490 A 60 60 0 0 0 460 490"
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default MiniFootballPitch;
