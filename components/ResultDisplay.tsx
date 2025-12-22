
import React, { useState, useCallback } from 'react';
import { Loader } from './Loader';
import { NavigationControls } from './NavigationControls';
import { ImageViewerModal } from './ImageViewerModal';
import { ResultActions } from './ResultActions';
import { HistoryThumbnails } from './HistoryThumbnails';
import { CompareSlider } from './CompareSlider';
import { NavigationDirection } from '../types';
import { SplitSquareHorizontal } from 'lucide-react';

interface ResultDisplayProps {
    imageUrl: string;
    sourceImageUrl: string | null;
    onEdit: () => void;
    isLoading: boolean;
    loadingMessage?: string;
    onUndo: () => void;
    canUndo: boolean;
    onRegenerate: () => void;
    onGoBack: () => void;
    onGenerateVariations: () => void;
    onGenerateDifferentAngle: (file: File) => void;
    onGenerateFromSource: () => void;
    historyStack: string[];
    currentIndex: number;
    onThumbnailClick: (index: number) => void;
    isExplorerMode: boolean;
    onEnterExplorer: () => void;
    onExitExplorer: () => void;
    onNavigate: (direction: NavigationDirection) => void;
}

interface ResultDisplayPropsWithUpscale extends ResultDisplayProps {
    onUpscale: () => void;
    onNewFile: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayPropsWithUpscale> = React.memo(({ 
    imageUrl, sourceImageUrl, onEdit, isLoading, loadingMessage = "Render İşleniyor...", onUndo, canUndo, onRegenerate, onGoBack, onGenerateVariations, 
    onGenerateDifferentAngle, onGenerateFromSource, onUpscale, onNewFile, historyStack, currentIndex, onThumbnailClick,
    isExplorerMode, onEnterExplorer, onExitExplorer, onNavigate
}) => {
    
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isCompareMode, setIsCompareMode] = useState(false);

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `render-${timestamp}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleViewer = useCallback(() => {
        if (!isCompareMode) setIsViewerOpen(prev => !prev);
    }, [isCompareMode]);

    return (
        <div className="w-full h-full flex flex-col gap-6">
            
            {/* Image Container - Sci-Fi/Modern Frame */}
            <div 
                className={`relative w-full flex-grow bg-[#050505] rounded-3xl overflow-hidden shadow-2xl group flex items-center justify-center border border-white/5 ${isExplorerMode ? 'h-full' : 'min-h-[50vh]'}`}
            >
                {/* Glow Effects on Frame */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 backdrop-blur-sm z-20 pointer-events-auto p-6 text-center">
                        <Loader />
                        <p className="mt-6 text-indigo-300 font-bold tracking-wider animate-pulse text-lg italic">
                             "{loadingMessage}"
                        </p>
                    </div>
                )}
                
                {/* Main Content Area */}
                <div 
                    className={`w-full h-full relative flex items-center justify-center ${!isExplorerMode && !isLoading && !isCompareMode ? 'cursor-zoom-in' : ''}`}
                    onClick={!isExplorerMode && !isLoading && !isCompareMode ? toggleViewer : undefined}
                >
                    {isCompareMode && sourceImageUrl ? (
                        <CompareSlider beforeImage={sourceImageUrl} afterImage={imageUrl} />
                    ) : (
                        <>
                            <img src={imageUrl} alt="Generated result" className="max-w-full max-h-full object-contain" />
                            {/* Hover Overlay for Zoom Hint */}
                            {!isExplorerMode && !isLoading && (
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 pointer-events-none">
                                    <div className="bg-black/60 text-white px-5 py-2.5 rounded-full flex items-center gap-2 backdrop-blur-md border border-white/10 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                        <span className="text-sm font-semibold tracking-wide">Büyüt</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Compare Button Toggle */}
                {!isExplorerMode && sourceImageUrl && !isLoading && (
                    <div className="absolute top-4 left-4 z-30 pointer-events-auto">
                        <button
                            onClick={() => setIsCompareMode(prev => !prev)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md border transition-all duration-300 font-bold text-sm shadow-lg
                                ${isCompareMode 
                                    ? 'bg-indigo-600 text-white border-indigo-500 ring-2 ring-indigo-500/30' 
                                    : 'bg-black/40 text-gray-300 border-white/10 hover:bg-black/60 hover:text-white'}`}
                        >
                            <SplitSquareHorizontal size={18} />
                            {isCompareMode ? 'Karşılaştırmayı Kapat' : 'Öncesi / Sonrası'}
                        </button>
                    </div>
                )}

                {/* Navigation Controls (Explorer Mode) */}
                {isExplorerMode && (
                    <NavigationControls 
                        isLoading={isLoading}
                        onNavigate={onNavigate}
                        onExit={onExitExplorer}
                    />
                )}
            </div>

            {/* Thumbnails */}
            {!isExplorerMode && (
                <HistoryThumbnails 
                    historyStack={historyStack}
                    currentIndex={currentIndex}
                    onThumbnailClick={onThumbnailClick}
                />
            )}
            
            {/* Action Buttons */}
            {!isExplorerMode && (
                <ResultActions 
                    onEnterExplorer={onEnterExplorer}
                    onGoBack={onGoBack}
                    onUndo={onUndo}
                    onRegenerate={onRegenerate}
                    onGenerateFromSource={onGenerateFromSource}
                    onGenerateVariations={onGenerateVariations}
                    onGenerateDifferentAngle={onGenerateDifferentAngle}
                    onUpscale={onUpscale}
                    onEdit={onEdit}
                    onDownload={handleDownload}
                    onNewFile={onNewFile}
                    isLoading={isLoading}
                    canUndo={canUndo}
                />
            )}

            {/* Image Viewer Modal */}
            <ImageViewerModal 
                isOpen={isViewerOpen} 
                onClose={() => setIsViewerOpen(false)} 
                imageUrl={imageUrl} 
            />
        </div>
    );
});
