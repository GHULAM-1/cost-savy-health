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
          className={`px-2 py-1 pb-4 ${activeLetter === letter ? 'text-[#176f6f] border-b-2 border-[#176f6f] font-medium' : 'text-gray-500'} focus:outline-none`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetNav;