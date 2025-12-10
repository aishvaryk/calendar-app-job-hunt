
import React, { useState } from 'react';
import { WEEKLY_CHECKLIST, MONTHLY_GOALS } from '../constants';
import { CheckCircle2, Circle } from 'lucide-react';

const ChecklistPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 mb-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-3xl text-stone-800">Tracking Progress</h2>
        <div className="flex bg-stone-100 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('weekly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'weekly' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500'}`}
          >
            Weekly Rhythm
          </button>
          <button 
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'monthly' ? 'bg-white shadow-sm text-stone-800' : 'text-stone-500'}`}
          >
            Monthly Milestones
          </button>
        </div>
      </div>

      {activeTab === 'weekly' ? (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <p className="text-stone-500 mb-6">Reset every Sunday. Purpose = predictable rhythm without anxiety.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WEEKLY_CHECKLIST.map((item) => (
              <div key={item.id} className="p-4 border border-stone-100 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-stone-800">{item.text}</h3>
                  <div className="h-5 w-5 rounded-full border-2 border-stone-300"></div>
                </div>
                <p className="text-emerald-700 font-bold text-sm mb-1">{item.target}</p>
                {item.subtext && <p className="text-xs text-stone-500">{item.subtext}</p>}
              </div>
            ))}
            {/* Custom Metric Card */}
            <div className="p-4 border border-stone-100 rounded-xl bg-white flex flex-col justify-center items-center text-center">
                <h3 className="font-semibold text-stone-800 mb-2">Small Emotional Win</h3>
                <p className="text-xs text-stone-500">Identify one small moment of calm or success this week.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 grid grid-cols-1 md:grid-cols-3 gap-8">
           <MonthColumn title="Month 1" items={MONTHLY_GOALS.phase1} isLast={false} />
           <MonthColumn title="Month 2" items={MONTHLY_GOALS.phase2} isLast={false} />
           <MonthColumn title="Month 3" items={MONTHLY_GOALS.phase3} isLast={true} />
        </div>
      )}
    </div>
  );
};

const MonthColumn: React.FC<{title: string, items: string[], isLast: boolean}> = ({ title, items, isLast }) => (
  <div className={`flex flex-col h-full ${isLast ? '' : 'md:border-r md:border-stone-100'} pr-0 md:pr-6`}>
    <h3 className="font-serif text-xl text-stone-800 mb-4">{title}</h3>
    <ul className="space-y-4">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-stone-600">
          <CheckCircle2 size={16} className="text-stone-300 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default ChecklistPanel;
