'use client';
import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

export default function ZoomableImage({ src, alt, width, height, className, priority }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="cursor-pointer relative group" onClick={() => setIsOpen(true)}>
        <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm transition-opacity">Click to Expand</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10" onClick={() => setIsOpen(false)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors" 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <X size={36} />
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image src={src} alt={alt} fill className="object-contain" unoptimized />
          </div>
        </div>
      )}
    </>
  );
}
