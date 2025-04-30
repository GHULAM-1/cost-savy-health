"use client";
import React from 'react';

interface AlphabetNavProps {
  activeLetter: string;
  onLetterChange: (letter: string) => void;
}

const AlphabetNav: React.FC<AlphabetNavProps> = ({ activeLetter, onLetterChange }) => {
  const alphabet = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 bg-[#F7FBFB]">
      {alphabet.map((letter) => (
        <button 
          key={letter}
          onClick={() => onLetterChange(letter)}
          className={`px-2 py-1 pb-4 ${activeLetter === letter ? 'text-[#8C2F5D] border-b-2 border-[#8C2F5D] font-medium' : 'text-gray-500'} focus:outline-none`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetNav;