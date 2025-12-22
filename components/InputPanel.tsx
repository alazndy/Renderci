import React from 'react';
import { Loader } from './Loader';
import { StyleReferenceUploader } from './StyleReferenceUploader';
import { StylePresetSelector } from './StylePresetSelector';
import { PromptLibraryModal } from './PromptLibraryModal';
import { MaterialPalette } from './MaterialPalette';
import { StylePreset, SavedPrompt } from '../types';
import { Rocket, Sparkles, Book, RefreshCcw } from 'lucide-react';

interface InputPanelProps {
    stylePreviewUrl: string | null;
    onStyleFileSelect: (file: File) => void;
    onStyleFileRemove: () => void;
    selectedStylePreset: StylePreset | null;
    onSelectPreset: (preset: StylePreset | null) => void;
    prompt: string;
    setPrompt: React.Dispatch<React.SetStateAction<string>>;
    onPromptKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onRender: () => void;
    isLoading: boolean;
    loadingMessage?: string;
    resultImageUrl: string | null;
    onShowResult: () => void;
    savedPrompts: SavedPrompt[];
    onSavePrompt: (title: string, content: string) => void;
    onDeletePrompt: (id: number) => void;
    isPromptLibOpen: boolean;
    onOpenPromptLib: () => void;
    onClosePromptLib: () => void;
    onNewFile: () => void;
}

export const InputPanel: React.FC<InputPanelProps> = React.memo(({
    stylePreviewUrl,
    onStyleFileSelect,
    onStyleFileRemove,
    selectedStylePreset,
    onSelectPreset,
    prompt,
    setPrompt,
    onPromptKeyDown,
    onRender,
    isLoading,
    loadingMessage = "İşleniyor...",
    resultImageUrl,
    onShowResult,
    savedPrompts,
    onSavePrompt,
    onDeletePrompt,
    isPromptLibOpen,
    onOpenPromptLib,
    onClosePromptLib,
    onNewFile
}) => {

    const handleAddMaterial = (materialText: string) => {
        setPrompt((prev) => {
            const separator = prev.trim().length > 0 ? ', ' : '';
            return `${prev.trim()}${separator}${materialText}`;
        });
    };

    return (
        <div className="space-y-6 pb-6">
            <StyleReferenceUploader 
                onFileSelect={onStyleFileSelect}
                onFileRemove={onStyleFileRemove}
                previewUrl={stylePreviewUrl}
            />
            
            <StylePresetSelector 
                selectedPreset={selectedStylePreset}
                onSelectPreset={onSelectPreset}
            />
            
            <MaterialPalette onAddMaterial={handleAddMaterial} />

            <div className="bg-white/[0.03] backdrop-blur-md p-5 rounded-3xl border border-white/5 shadow-xl relative">
                <div className="flex justify-between items-center mb-3 ml-1">
                    <label htmlFor="prompt" className="block text-xs font-bold text-indigo-300 uppercase tracking-widest">Ekstra Talimatlar</label>
                    <button 
                        onClick={onOpenPromptLib}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-lg transition-colors border border-indigo-500/20 hover:border-indigo-500/40"
                    >
                        <Book size={14} />
                        Büyü Kitabı
                    </button>
                </div>
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-50 blur transition duration-500"></div>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={onPromptKeyDown}
                        placeholder="Örn: Cyberpunk şehir, neon ışıklar, yağmurlu atmosfer... (Materyal paletinden de ekleme yapabilirsiniz)"
                        className="relative w-full h-32 p-4 bg-[#0a0a12] border border-white/10 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:text-white transition-colors resize-none leading-relaxed"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                    onClick={onRender}
                    disabled={isLoading}
                    className="w-full py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 -skew-x-12 -translate-x-full"></div>
                    {isLoading ? (
                        <div className="flex items-center gap-2 max-w-full px-2">
                             <Loader /> 
                             <span className="truncate text-sm">{loadingMessage}</span>
                        </div>
                    ) : (
                        resultImageUrl ? 
                        <span className="flex items-center gap-2"><Sparkles className="w-5 h-5" /> Tekrar Render Al</span> : 
                        <span className="flex items-center gap-2"><Rocket className="w-5 h-5" /> Render Al</span>
                    )}
                </button>
                {resultImageUrl && (
                        <button
                        onClick={onShowResult}
                        disabled={isLoading}
                        className="w-full py-4 text-lg font-bold text-white bg-gray-800/80 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-gray-700 disabled:bg-gray-800 disabled:opacity-50 transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        Sonucu Görüntüle
                    </button>
                )}
            </div>
            
            <div className="pt-2">
                <button 
                    onClick={onNewFile} 
                    className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-red-500/20 hover:border-red-500/40 rounded-xl transition-all flex items-center justify-center gap-2 font-medium text-sm"
                >
                    <RefreshCcw size={16} />
                    Görseli Değiştir / Yeni Dosya
                </button>
            </div>

            <PromptLibraryModal
                isOpen={isPromptLibOpen}
                onClose={onClosePromptLib}
                savedPrompts={savedPrompts}
                currentPrompt={prompt}
                onSaveCurrent={onSavePrompt}
                onDelete={onDeletePrompt}
                onSelect={setPrompt}
            />
        </div>
    );
});