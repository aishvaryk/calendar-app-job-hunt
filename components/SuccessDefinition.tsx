import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Dec', applications: 220, momentum: 60 },
  { name: 'Jan', applications: 320, momentum: 80 },
  { name: 'Feb', applications: 500, momentum: 100 },
];

const SuccessDefinition: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="font-serif text-3xl text-stone-800 mb-6">Success Definition</h2>
                <ul className="space-y-4">
                    {[
                        "Consistent applications every week",
                        "Growing interview pipeline",
                        "Daily or weekly skill momentum",
                        "Emotional composure",
                        "Weekend emotional balance",
                        "Confidence not shaken by recruiter silence",
                        "Identity not outsourced to hiring timelines"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-stone-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-emerald-900 font-medium">
                        Outcome Independence: Success is pipeline, positioning, and peace—not just offer letters.
                    </p>
                </div>
            </div>
            
            <div className="h-64 w-full">
                <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">Projected Momentum</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e5e4" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                        <Tooltip cursor={{fill: '#f5f5f4'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Bar dataKey="applications" fill="#d6d3d1" radius={[4, 4, 0, 0]} name="Cumulative Apps" />
                        <Bar dataKey="momentum" fill="#10b981" radius={[4, 4, 0, 0]} name="Confidence Level" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default SuccessDefinition;