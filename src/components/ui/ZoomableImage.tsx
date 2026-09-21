'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function ZoomableImage({ src, alt, width, height, fill, className, priority }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    closingRef.current = false;
    document.body.style.overflow = 'hidden';
    
    // Push a dummy state to history to trap the mobile hardware back button
    window.history.pushState({ isZoomModal: true }, '');

    const handlePopState = () => {
      setIsOpen(false);
    };

    // Listen for the back button (popstate)
    window.addEventListener('popstate', handlePopState);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen]);

  const handleManualClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (closingRef.current) return;
    closingRef.current = true;
    
    // Instead of setting isOpen(false) directly, we mimic a back button press.
    // This pops the dummy state we added and triggers handlePopState, 
    // which cleanly closes the modal without leaving junk in the history stack.
    window.history.back();
  };

  return (
    <>
      <div className="cursor-pointer relative group w-full h-full" onClick={() => setIsOpen(true)}>
        <Image src={src} alt={alt} width={width} height={height} fill={fill} className={className} priority={priority} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-xl flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 bg-black/70 text-white text-[10px] md:text-xs px-2 py-1 rounded backdrop-blur-sm transition-opacity shadow-lg">Click to Expand</span>
        </div>
      </div>
      
      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 p-4 md:p-10" onClick={handleManualClose}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full" 
            onClick={handleManualClose}
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
