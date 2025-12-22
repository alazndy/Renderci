
import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Plus } from 'lucide-react';

interface MaterialPaletteProps {
    onAddMaterial: (text: string) => void;
}

const categories = [
    {
        id: 'wall',
        name: 'Duvar',
        materials: [
            { name: 'Brüt Beton', value: 'exposed concrete wall texture' },
            { name: 'Kırmızı Tuğla', value: 'aged red brick wall' },
            { name: 'Beyaz Sıva', value: 'clean white stucco wall' },
            { name: 'Ahşap Kaplama', value: 'vertical timber cladding' },
            { name: 'Doğal Taş', value: 'rough natural stone wall' }
        ]
    },
    {
        id: 'floor',
        name: 'Zemin',
        materials: [
            { name: 'Ahşap Parke', value: 'herringbone oak flooring' },
            { name: 'Mermer', value: 'white carrara marble flooring' },
            { name: 'Cilalı Beton', value: 'polished concrete floor' },
            { name: 'Seramik', value: 'large format grey ceramic tiles' },
            { name: 'Çim', value: 'manicured green grass' }
        ]
    },
    {
        id: 'glass',
        name: 'Cam & Metal',
        materials: [
            { name: 'Reflektif Cam', value: 'reflective blue facade glass' },
            { name: 'Şeffaf Cam', value: 'clear floor-to-ceiling glass' },
            { name: 'Siyah Metal', value: 'matte black metal frames' },
            { name: 'Bakır', value: 'oxidized copper panels' },
            { name: 'Korten Çelik', value: 'rusted corten steel' }
        ]
    },
    {
        id: 'atmosphere',
        name: 'Atmosfer',
        materials: [
            { name: 'Gün Batımı', value: 'golden hour dramatic lighting' },
            { name: 'Bulutlu', value: 'overcast soft diffused lighting' },
            { name: 'Gece', value: 'night time with interior lights glowing' },
            { name: 'Yağmurlu', value: 'rainy cinematic atmosphere, wet reflections' },
            { name: 'Sisli', value: 'foggy mysterious atmosphere' }
        ]
    }
];

export const MaterialPalette: React.FC<MaterialPaletteProps> = ({ onAddMaterial }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('wall');

    return (
        <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl border border-white/5 shadow-xl overflow-hidden transition-all duration-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 flex items-center justify-between text-indigo-300 font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <Layers size={16} />
                    <span>Materyal & Atmosfer Paleti</span>
                </div>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {isOpen && (
                <div className="p-4 pt-0 animate-fadeIn">
                    {/* Tabs */}
                    <div className="flex space-x-1 mb-4 overflow-x-auto scrollbar-thin pb-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                                    activeTab === cat.id 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-2">
                        {categories.find(c => c.id === activeTab)?.materials.map((mat, idx) => (
                            <button
                                key={idx}
                                onClick={() => onAddMaterial(mat.value)}
                                className="group flex items-center justify-between px-3 py-2 bg-black/20 hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/50 rounded-lg text-left transition-all"
                            >
                                <span className="text-gray-300 text-xs group-hover:text-white truncate">{mat.name}</span>
                                <Plus size={12} className="text-gray-500 group-hover:text-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
