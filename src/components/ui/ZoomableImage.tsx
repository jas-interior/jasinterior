'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function ZoomableImage({ src, alt, width, height, className, priority }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div className="cursor-pointer relative group" onClick={() => setIsOpen(true)}>
        <Image src={src} alt={alt} width={width} height={height} className={className} priority={priority} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white text-[10px] md:text-xs px-2 py-1 rounded backdrop-blur-sm transition-opacity shadow-lg">Click to Expand</span>
        </div>
      </div>
      
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 md:p-10" onClick={() => setIsOpen(false)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full" 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
            <Image src={src} alt={alt} fill className="object-contain" unoptimized />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
