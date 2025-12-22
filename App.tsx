
import React, { useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { Loader } from './components/Loader';
import { ImageModal } from './components/ImageModal';
import { GalleryModal } from './components/GalleryModal';
import { InputPanel } from './components/InputPanel';
import { ThreeDViewer } from './components/ThreeDViewer';
import { useAppState } from './hooks/useAppState';

const App: React.FC = () => {
    const {
        sourceFile, setSourceFile,
        styleReferenceFile,
        previewUrl,
        stylePreviewUrl,
        selectedStylePreset,
        resolution, setResolution,
        prompt, setPrompt,
        isLoading,
        error, setError,
        threeDFile, setThreeDFile,
        resetKey,
        resultImageUrl,
        history,
        view,
        gallery,
        savedPrompts,
        isGalleryOpen, setIsGalleryOpen,
        isPromptLibOpen, 
        isModalOpen,
        isCorrecting,
        isExplorerMode,
        tool, setTool,
        layers, setLayers,
        activeLayerId, setActiveLayerId,
        isRestoringSession,
        dominantColor,
        loadingMessage,
        
        // Handlers
        reset,
        handleNewFile,
        handleFileSelect,
        handleThreeDCapture,
        handleStyleFileSelect,
        handleStyleFileRemove,
        handleSelectPreset,
        handleRender,
        handleRegenerate,
        handleGenerateVariations,
        handleGenerateFromSource,
        handleGenerateDifferentAngle,
        handleUpscale,
        handleOpenModal,
        handleCloseModal,
        handleCorrectionSubmit,
        handleNavigateScene,
        handleUndo,
        handleGoBack,
        handleShowResult,
        handleHistoryThumbnailClick,
        handleSelectFromGallery,
        handleGalleryClick,
        onEnterExplorer,
        onExitExplorer,
        handleSavePrompt,
        handleDeletePrompt,
        handlePromptLibraryOpen,
        handlePromptLibraryClose
    } = useAppState();

    const handlePromptKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!isLoading) {
                handleRender();
            }
        }
    }, [handleRender, isLoading]);

    const renderMainContent = () => {
        if (isRestoringSession) {
             return (
                <div className="flex flex-col justify-center items-center h-full">
                    <Loader />
                    <p className="mt-4 text-indigo-300 animate-pulse font-medium">Sistem Yükleniyor...</p>
                </div>
            );
        }
        
        // Show 3D Viewer if a 3dm file is loaded
        if (threeDFile) {
            return (
                <ThreeDViewer 
                    file={threeDFile} 
                    onCapture={handleThreeDCapture} 
                    onCancel={() => setThreeDFile(null)} 
                />
            );
        }

        if (view === 'result' && resultImageUrl) {
            return (
                <ResultDisplay
                    key={`result-${resetKey}`}
                    imageUrl={resultImageUrl}
                    sourceImageUrl={previewUrl}
                    onEdit={handleOpenModal}
                    isLoading={isCorrecting}
                    loadingMessage={loadingMessage}
                    onUndo={handleUndo}
                    canUndo={history.index > 0}
                    onRegenerate={handleRegenerate}
                    onGoBack={handleGoBack}
                    onGenerateVariations={handleGenerateVariations}
                    onGenerateDifferentAngle={handleGenerateDifferentAngle}
                    onGenerateFromSource={handleGenerateFromSource}
                    onUpscale={handleUpscale}
                    onNewFile={handleNewFile}
                    historyStack={history.stack}
                    currentIndex={history.index}
                    onThumbnailClick={handleHistoryThumbnailClick}
                    isExplorerMode={isExplorerMode}
                    onEnterExplorer={onEnterExplorer}
                    onExitExplorer={onExitExplorer}
                    onNavigate={handleNavigateScene}
                />
            );
        }

        if (sourceFile) {
            return (
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn h-full">
                    <div className="flex flex-col h-full relative group">
                         {/* Source Image Panel with Glow */}
                         <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                         <div className="relative glass-panel p-2 rounded-3xl h-full max-h-[60vh] lg:max-h-full flex items-center justify-center overflow-hidden border border-white/5">
                            <img src={previewUrl || ''} alt="Source" className="max-w-full max-h-full object-contain rounded-2xl shadow-xl" />
                         </div>
                    </div>
                    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 scrollbar-thin">
                        <InputPanel 
                            key={`input-panel-${resetKey}`}
                            stylePreviewUrl={stylePreviewUrl}
                            onStyleFileSelect={handleStyleFileSelect}
                            onStyleFileRemove={handleStyleFileRemove}
                            selectedStylePreset={selectedStylePreset}
                            onSelectPreset={handleSelectPreset}
                            prompt={prompt}
                            setPrompt={setPrompt}
                            onPromptKeyDown={handlePromptKeyDown}
                            onRender={handleRender}
                            isLoading={isLoading}
                            loadingMessage={loadingMessage}
                            resultImageUrl={resultImageUrl}
                            onShowResult={handleShowResult}
                            savedPrompts={savedPrompts}
                            onSavePrompt={handleSavePrompt}
                            onDeletePrompt={handleDeletePrompt}
                            isPromptLibOpen={isPromptLibOpen}
                            onOpenPromptLib={handlePromptLibraryOpen}
                            onClosePromptLib={handlePromptLibraryClose}
                            onNewFile={handleNewFile}
                        />
                    </div>
                </div>
            );
        }
        
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh]">
                <div className="w-full max-w-3xl animate-float">
                    <ImageUploader key={`uploader-empty-${resetKey}`} onImageSelect={handleFileSelect} previewUrl={null} />
                </div>
            </div>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-transparent text-gray-100 font-sans selection:bg-indigo-500/30 selection:text-white overflow-hidden relative">
            {/* Dynamic Ambient Background Layer */}
            <div 
                className="absolute inset-0 z-[-1] transition-colors duration-[2000ms] ease-in-out pointer-events-none"
                style={{ 
                    backgroundColor: dominantColor,
                    opacity: dominantColor === 'transparent' ? 0 : 0.25 
                }}
            >
                <div className="absolute inset-0 bg-black/60 mix-blend-overlay"></div>
            </div>

            <Header onGalleryClick={handleGalleryClick} onReset={reset} />
            <main className="flex-1 w-full relative overflow-hidden">
                <div className="w-full h-full p-4 md:p-8 overflow-y-auto scrollbar-thin">
                    <div className="max-w-[1920px] mx-auto w-full h-full relative flex flex-col">
                        {isLoading && !resultImageUrl && !threeDFile && (
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#020617]/80 backdrop-blur-md z-50 rounded-3xl border border-white/5 p-8 text-center">
                                <Loader />
                                <p className="mt-8 text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300 animate-pulse italic">
                                    "{loadingMessage}"
                                </p>
                                <p className="text-sm text-gray-500 mt-3 font-mono">Muhittin Abi söylüyor...</p>
                            </div>
                        )}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl flex justify-between items-center shadow-[0_0_20px_rgba(220,38,38,0.2)] backdrop-blur-md flex-shrink-0 animate-fadeIn">
                                <span className="flex items-center gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">{error}</span>
                                </span>
                                <button onClick={() => setError(null)} className="p-2 hover:bg-red-500/20 rounded-full transition-colors font-bold">&times;</button>
                            </div>
                        )}
                        {renderMainContent()}
                    </div>
                </div>
            </main>
            <ImageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                imageUrl={resultImageUrl || ''}
                tool={tool}
                setTool={setTool}
                layers={layers}
                setLayers={setLayers}
                activeLayerId={activeLayerId}
                setActiveLayerId={setActiveLayerId}
                onSubmit={handleCorrectionSubmit}
                isLoading={isCorrecting}
            />
            <GalleryModal
                isOpen={isGalleryOpen}
                onClose={() => setIsGalleryOpen(false)}
                images={gallery}
                onImageSelect={handleSelectFromGallery}
            />
        </div>
    );
};

export default App;
