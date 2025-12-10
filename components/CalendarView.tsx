import React from 'react';
import { DayType, CalendarDay } from '../types';
import { QUOTES } from '../constants';

const CalendarView: React.FC = () => {
  const generateDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    const startDate = new Date('2024-12-12');
    const endDate = new Date('2025-02-28');
    
    let current = new Date(startDate);
    while (current <= endDate) {
      const date = new Date(current);
      let type = DayType.WEEKDAY;
      let label = undefined;

      // Logic
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const month = date.getMonth(); // 11 is Dec, 0 is Jan
      const day = date.getDate();

      // Holiday Slowdown: Dec 20 - Jan 5
      const isDecSlowdown = month === 11 && day >= 20;
      const isJanSlowdown = month === 0 && day <= 5;
      
      if (isDecSlowdown || isJanSlowdown) {
        type = DayType.HOLIDAY_SLOWDOWN;
      }

      if (isWeekend) {
        type = DayType.WEEKEND;
      }

      // Hard Rest
      if ((month === 11 && day === 25) || (month === 0 && day === 1)) {
        type = DayType.FULL_REST;
        label = month === 11 ? "Xmas" : "New Year";
      }

      days.push({ date, type, label });
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const days = generateDays();

  // Helper to render months
  const renderMonth = (monthName: string, monthDays: CalendarDay[]) => (
    <div className="mb-8">
      <h3 className="font-serif text-xl text-stone-800 mb-4 border-b border-stone-200 pb-2 flex justify-between items-baseline">
        {monthName}
        <span className="text-xs font-sans text-stone-400 font-normal uppercase tracking-widest">Execution Phase</span>
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {['S','M','T','W','T','F','S'].map((d, i) => (
           <div key={i} className="text-center text-xs font-bold text-stone-300 mb-2">{d}</div>
        ))}
        {/* Fillers for start of month alignment */}
        {Array.from({ length: monthDays[0].date.getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}
        {monthDays.map((d, idx) => (
          <DayCard key={idx} day={d} />
        ))}
      </div>
    </div>
  );

  const decDays = days.filter(d => d.date.getMonth() === 11);
  const janDays = days.filter(d => d.date.getMonth() === 0);
  const febDays = days.filter(d => d.date.getMonth() === 1);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 mb-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
           <h2 className="font-serif text-3xl text-stone-800 mb-2">90-Day Visual Map</h2>
           <p className="text-stone-500">Dec 12 — Feb 28</p>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></div>
            <span className="text-stone-600">Momentum (Weekday)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-amber-50 border border-amber-100"></div>
            <span className="text-stone-600">Rest (Weekend)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-blue-50 border border-blue-100"></div>
            <span className="text-stone-600">Slowdown</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-rose-100 border border-rose-200"></div>
            <span className="text-stone-600">Full Off</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {renderMonth("December", decDays)}
        {renderMonth("January", janDays)}
        {renderMonth("February", febDays)}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-xl text-center">
        <p className="font-serif italic text-blue-800 text-lg">"{QUOTES.slowdown}"</p>
        <p className="text-xs text-blue-600 mt-2 uppercase tracking-wide">Holiday Protocol: Dec 20 — Jan 5</p>
      </div>
    </div>
  );
};

const DayCard: React.FC<{ day: CalendarDay }> = ({ day }) => {
  let bgClass = 'bg-emerald-50 border-emerald-100 text-emerald-900'; // Default Weekday
  
  if (day.type === DayType.WEEKEND) {
    bgClass = 'bg-amber-50 border-amber-100 text-amber-800 opacity-80';
  } else if (day.type === DayType.HOLIDAY_SLOWDOWN) {
    bgClass = 'bg-blue-50 border-blue-100 text-blue-800';
  } else if (day.type === DayType.FULL_REST) {
    bgClass = 'bg-rose-100 border-rose-200 text-rose-800 font-bold';
  }

  // Override weekend check inside slowdown if needed visually, 
  // but logically usually weekend overrides specific slowdown color to show rest within slowdown
  if (day.type === DayType.WEEKEND && (day.date.getMonth() === 11 && day.date.getDate() >= 20 || day.date.getMonth() === 0 && day.date.getDate() <= 5)) {
      bgClass = 'bg-blue-50 border-blue-100 text-blue-800 opacity-60'; 
  }

  return (
    <div className={`aspect-square rounded-lg border ${bgClass} flex flex-col items-center justify-center relative transition-transform hover:scale-105 cursor-default`}>
      <span className="text-sm">{day.date.getDate()}</span>
      {day.label && <span className="text-[0.5rem] absolute bottom-1 uppercase tracking-tighter">{day.label}</span>}
    </div>
  );
};

export default CalendarView;