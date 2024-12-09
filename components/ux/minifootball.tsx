import React from 'react';

const MiniFootballField: React.FC = () => {
  return (
    <div className='w-full absolute'>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Terrain */}
      <rect width="100%" height="100%" fill="#4CAF50" />
      {/* Lignes du terrain */}
      <rect x="10" y="10" width="280" height="180" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="150" y1="10" x2="150" y2="190" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="150" cy="100" r="30" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="10" y="80" width="15" height="40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="275" y="80" width="15" height="40" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
    </div>
  );
};

export default MiniFootballField;