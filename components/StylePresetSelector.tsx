
import React from 'react';
import { StylePreset } from '../types';
import { Camera, PenTool, Map, Ruler } from 'lucide-react';

interface StylePresetSelectorProps {
    selectedPreset: StylePreset | null;
    onSelectPreset: (preset: StylePreset | null) => void;
}

const styleOptions = [
    { id: 'realistic' as StylePreset, name: 'Realistik', icon: Camera },
    { id: 'sketch' as StylePreset, name: 'Eskiz', icon: PenTool },
    { id: 'site_plan' as StylePreset, name: 'Vaziyet', icon: Map },
    { id: 'section' as StylePreset, name: 'Kesit', icon: Ruler },
];

export const StylePresetSelector: React.FC<StylePresetSelectorProps> = React.memo(({ selectedPreset, onSelectPreset }) => {
    return (
        <div className="bg-white/[0.03] backdrop-blur-md p-5 rounded-3xl border border-white/5 shadow-xl">
            <label className="block text-xs font-bold text-indigo-300 uppercase tracking-widest mb-4 ml-1">Hazır Stiller</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {styleOptions.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => onSelectPreset(selectedPreset === option.id ? null : option.id)}
                        className={`group relative py-4 px-2 rounded-2xl font-medium transition-all duration-300 border backdrop-blur-sm overflow-hidden
                            ${selectedPreset === option.id 
                                ? 'bg-indigo-600/20 text-white border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.3)]' 
                                : 'bg-white/[0.03] text-gray-400 hover:bg-white/[0.08] hover:text-white border-white/5 hover:border-white/20'
                            }`
                        }
                    >
                        {selectedPreset === option.id && (
                             <div className="absolute inset-0 bg-indigo-400/10 blur-md"></div>
                        )}
                        <div className="relative flex flex-col items-center gap-2 z-10">
                            <option.icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm tracking-wide">{option.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
});
