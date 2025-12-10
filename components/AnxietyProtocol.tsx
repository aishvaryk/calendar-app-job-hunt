import React, { useState } from 'react';
import { CloudRain, Wind, AlertCircle } from 'lucide-react';
import { QUOTES } from '../constants';

const AnxietyProtocol: React.FC = () => {
  const [level, setLevel] = useState<'mild' | 'moderate' | 'heavy' | null>(null);

  return (
    <div className="mb-12">
       <h2 className="font-serif text-3xl text-stone-800 mb-6">Anxiety Protocol</h2>
       
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mild */}
          <div 
            onClick={() => setLevel('mild')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${level === 'mild' ? 'bg-amber-50 border-amber-200 ring-2 ring-amber-100' : 'bg-white border-stone-200 hover:border-amber-200'}`}
          >
             <div className="flex items-center gap-3 mb-4">
                <Wind className="text-amber-500" />
                <h3 className="font-semibold text-stone-800">Mild Tension</h3>
             </div>
             <p className="text-stone-500 text-sm">Feeling jittery or distracted?</p>
             {level === 'mild' && (
                <div className="mt-4 pt-4 border-t border-amber-100 text-amber-900 text-sm space-y-2 animate-in fade-in">
                  <p>• Continue gently.</p>
                  <p>• Short journaling or quiet walk.</p>
                  <p>• Take a small 15m break.</p>
                </div>
             )}
          </div>

          {/* Moderate */}
          <div 
            onClick={() => setLevel('moderate')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${level === 'moderate' ? 'bg-orange-50 border-orange-200 ring-2 ring-orange-100' : 'bg-white border-stone-200 hover:border-orange-200'}`}
          >
             <div className="flex items-center gap-3 mb-4">
                <CloudRain className="text-orange-500" />
                <h3 className="font-semibold text-stone-800">Moderate Anxiety</h3>
             </div>
             <p className="text-stone-500 text-sm">Chest tight? Overthinking?</p>
             {level === 'moderate' && (
                <div className="mt-4 pt-4 border-t border-orange-100 text-orange-900 text-sm space-y-2 animate-in fade-in">
                  <p className="font-bold">• Stop applications for the day.</p>
                  <p>• Music, comedy, outing.</p>
                  <p>• Review portfolio highlights.</p>
                </div>
             )}
          </div>

          {/* Heavy */}
          <div 
            onClick={() => setLevel('heavy')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${level === 'heavy' ? 'bg-rose-50 border-rose-200 ring-2 ring-rose-100' : 'bg-white border-stone-200 hover:border-rose-200'}`}
          >
             <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="text-rose-500" />
                <h3 className="font-semibold text-stone-800">Heavy Overwhelm</h3>
             </div>
             <p className="text-stone-500 text-sm">Paralysis or spiral?</p>
             {level === 'heavy' && (
                <div className="mt-4 pt-4 border-t border-rose-100 text-rose-900 text-sm space-y-2 animate-in fade-in">
                  <p className="font-bold">• FULL DAY OFF.</p>
                  <p>• Emotional restoration required.</p>
                  <p>• No guilt, no self-judgment.</p>
                  <p>• Resume gently tomorrow.</p>
                </div>
             )}
          </div>
       </div>

       <div className="mt-6 text-center">
         <p className="text-stone-400 italic font-serif">"{QUOTES.anxiety}"</p>
       </div>
    </div>
  );
};

export default AnxietyProtocol;