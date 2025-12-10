import React from 'react';
import { IDENTITY_AFFIRMATIONS, QUOTES } from '../constants';
import { ShieldCheck } from 'lucide-react';

const IdentitySection: React.FC = () => {
  return (
    <div className="bg-stone-900 text-stone-200 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-64 bg-stone-800 rounded-full mix-blend-overlay filter blur-3xl -mr-32 -mt-32"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-8">
            <ShieldCheck size={32} className="text-emerald-400" />
            <h2 className="font-serif text-3xl text-white">Identity & Expectations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {IDENTITY_AFFIRMATIONS.map((text, idx) => (
                <div key={idx} className="flex gap-4 group">
                    <span className="text-stone-600 font-serif text-xl group-hover:text-emerald-500 transition-colors">0{idx + 1}</span>
                    <p className="text-stone-300 text-lg leading-relaxed group-hover:text-white transition-colors">{text}</p>
                </div>
            ))}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 text-center">
            <p className="font-serif text-2xl text-emerald-100 italic">"{QUOTES.philosophy}"</p>
        </div>
      </div>
    </div>
  );
};

export default IdentitySection;