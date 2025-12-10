import React from 'react';
import { Briefcase, Zap, Coffee, Dumbbell, BookOpen, MessageCircle } from 'lucide-react';

const DailyRoutine: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      {/* Weekday Routine */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 flex flex-col h-full relative overflow-hidden">
        <div className="flex items-center justify-between mb-6 relative z-10">
          <h2 className="font-serif text-2xl text-stone-800">Weekday Protocol</h2>
          <span className="px-3 py-1 bg-stone-50 border border-stone-100 text-stone-500 text-xs font-bold uppercase tracking-widest rounded-full">
            8:00 AM — 8:00 PM
          </span>
        </div>
        
        <p className="text-stone-500 mb-6 italic border-l-2 border-emerald-400/50 pl-4 relative z-10">
          "Consistency over intensity. Your job is the process, not the outcome."
        </p>

        <div className="space-y-4 flex-1 relative z-10">
          <RoutineItem 
            icon={<Briefcase className="text-emerald-600" size={20} />}
            title="Job Applications"
            metric="10-15/day"
            desc="60/week avg. Automation allowed. LinkedIn, recruiters, referrals."
            color="bg-emerald-50 border-emerald-100"
          />
          <RoutineItem 
            icon={<Zap className="text-amber-600" size={20} />}
            title="Skill & Growth"
            metric="3-5 hrs/week"
            desc="UX writing, storytelling frameworks, portfolio refinement."
            color="bg-orange-50 border-orange-100"
          />
          <RoutineItem 
            icon={<MessageCircle className="text-blue-600" size={20} />}
            title="Networking"
            metric="2-5 chats/week"
            desc="Reconnect with former colleagues. No high pressure."
            color="bg-sky-50 border-sky-100"
          />
          <RoutineItem 
            icon={<Dumbbell className="text-rose-600" size={20} />}
            title="Physical Reset"
            metric="30-60 mins"
            desc="Flexible timing. Purpose is confidence & clarity. 2hr avg/day buffer."
            color="bg-rose-50 border-rose-100"
          />
          <RoutineItem 
            icon={<BookOpen className="text-violet-600" size={20} />}
            title="Emotional Grounding"
            metric="10 mins"
            desc="Journaling or calm reflection. Notice work: low effort."
            color="bg-purple-50 border-purple-100"
          />
        </div>
      </div>

      {/* Weekend Routine */}
      <div className="bg-gradient-to-br from-stone-50 to-stone-100 rounded-2xl p-8 shadow-inner border border-stone-200/60 flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-stone-200/50 rounded-full mix-blend-overlay filter blur-3xl opacity-50 -mr-16 -mt-16"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl text-stone-800">Weekend Restoration</h2>
            <span className="px-3 py-1 bg-white/50 border border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-widest rounded-full">
              Sat — Sun
            </span>
          </div>

          <p className="text-stone-500 mb-8">
            Weekends protect your emotional identity. Applications are optional.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-stone-100 hover:border-stone-200 transition-colors">
              <h3 className="font-medium text-stone-800 flex items-center gap-2 mb-2">
                <Coffee size={18} className="text-stone-400"/> Priority: Rest
              </h3>
              <p className="text-sm text-stone-600">Emotional rest, social time, outings.</p>
            </div>
             <div className="p-4 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-stone-100 hover:border-stone-200 transition-colors">
              <h3 className="font-medium text-stone-800 flex items-center gap-2 mb-2">
                <Dumbbell size={18} className="text-stone-400"/> Physical
              </h3>
              <p className="text-sm text-stone-600">Gym or physical reset if energy allows.</p>
            </div>
             <div className="p-4 bg-white/60 backdrop-blur-md rounded-xl shadow-sm border border-stone-100 hover:border-stone-200 transition-colors">
              <h3 className="font-medium text-stone-800 flex items-center gap-2 mb-2">
                <Zap size={18} className="text-stone-400"/> Optional Momentum
              </h3>
              <p className="text-sm text-stone-600">High Energy? Micro-portfolio updates.<br/>Low Energy? No guilt. Zero.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RoutineItem: React.FC<{icon: React.ReactNode, title: string, metric: string, desc: string, color: string}> = ({ icon, title, metric, desc, color }) => (
  <div className={`flex items-start gap-4 p-3 rounded-xl transition-colors hover:bg-stone-50/80 border border-transparent hover:border-stone-100`}>
    <div className={`p-3 rounded-xl ${color} shrink-0 shadow-sm`}>
      {icon}
    </div>
    <div>
      <div className="flex items-baseline gap-2 mb-1">
        <h3 className="font-semibold text-stone-800">{title}</h3>
        <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">{metric}</span>
      </div>
      <p className="text-sm text-stone-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default DailyRoutine;