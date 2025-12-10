import React from 'react';
import { MapPin, Briefcase, TrendingUp, FileText } from 'lucide-react';
import { PROFILE } from '../constants';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-white via-rose-50/20 to-teal-50/20 rounded-2xl p-8 shadow-sm border border-stone-200 mb-8 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-100/40 to-transparent rounded-bl-full -mr-4 -mt-4"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-stone-800 mb-2">
            {PROFILE.name}'s Execution Plan
          </h1>
          <p className="text-stone-500 text-lg font-light">
            90-Day Notice Period & Career Transition
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
           <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-stone-600 flex items-center gap-2 border border-stone-100 shadow-sm">
              <MapPin size={16} className="text-rose-400" /> {PROFILE.location}
           </span>
           <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-stone-600 flex items-center gap-2 border border-stone-100 shadow-sm">
              <Briefcase size={16} className="text-blue-400" /> {PROFILE.experience}
           </span>
           <span className="px-4 py-2 bg-emerald-50/80 backdrop-blur-sm rounded-full text-sm font-medium text-emerald-800 flex items-center gap-2 border border-emerald-100 shadow-sm">
              <TrendingUp size={16} className="text-emerald-500" /> Target: {PROFILE.salaryTarget}
           </span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-stone-100/60">
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Target Role</h3>
          <p className="text-lg font-medium text-stone-800">{PROFILE.role}</p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Portfolio Status</h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-stone-800">{PROFILE.portfolioRating}</span>
            <span className="text-sm text-stone-500">({PROFILE.portfolioContent})</span>
          </div>
        </div>
        <div className="space-y-2">
           <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Link Access</h3>
           <div className="flex items-center gap-2 text-stone-600">
             <FileText size={18} className="text-stone-400" />
             <span>{PROFILE.portfolioLink} accepted</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;