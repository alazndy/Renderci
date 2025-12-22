
import React from 'react';
import { HardHat, RotateCcw, Image as ImageIcon } from 'lucide-react';

interface HeaderProps {
    onGalleryClick: () => void;
    onReset: () => void;
}

export const Header: React.FC<HeaderProps> = React.memo(({ onGalleryClick, onReset }) => {
    return (
        <header className="px-6 py-4 border-b border-white/5 relative bg-[#020617]/60 backdrop-blur-xl sticky top-0 z-40">
            <div className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2">
                <button 
                    onClick={onReset} 
                    className="p-2.5 bg-white/5 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-full transition-all duration-300 border border-white/5 group hover:shadow-[0_0_15px_rgba(248,113,113,0.3)]"
                    aria-label="Uygulamayı sıfırla"
                    title="Her şeyi sıfırla"
                >
                    <RotateCcw className="h-5 w-5 group-hover:-rotate-180 transition-transform duration-500" />
                </button>
            </div>
            
            <div className="text-center flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3 select-none">
                    <span className="rgb-text-flow animate-pulse">
                        Rendercı Muhittin
                    </span>
                    <HardHat className="h-8 w-8 text-yellow-500 filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                </h1>
            </div>

            <div className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2">
                <button 
                    onClick={onGalleryClick} 
                    className="flex items-center gap-2 px-5 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 font-semibold rounded-xl transition-all duration-300 border border-indigo-500/30 hover:border-indigo-500/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                >
                    <ImageIcon className="h-5 w-5" />
                    <span className="hidden md:inline">Galeri</span>
                </button>
            </div>
        </header>
    );
});
