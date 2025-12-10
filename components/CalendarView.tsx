
import React, { useState, useEffect } from 'react';
import { DayType, CalendarDay, Task } from '../types';
import { QUOTES, DEFAULT_DAILY_TASKS } from '../constants';
import { X, Check, Plus, Trash2, Calendar as CalendarIcon, Save, Cloud, Loader2 } from 'lucide-react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CalendarView: React.FC = () => {
  const [taskData, setTaskData] = useState<Record<string, Task[]>>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [status, setStatus] = useState<'syncing' | 'saved' | 'offline' | 'error'>('syncing');

  // Firebase Listener
  useEffect(() => {
    setStatus('syncing');
    const unsub = onSnapshot(doc(db, "bhavika_tracker", "tasks"), (docSnapshot) => {
      if (docSnapshot.exists()) {
        setTaskData(docSnapshot.data() as Record<string, Task[]>);
        setStatus('saved');
      } else {
        setStatus('saved');
      }
    }, (error) => {
      console.error("Firebase sync error:", error);
      setStatus('error');
    });

    return () => unsub();
  }, []);

  const saveToFirebase = async (newData: Record<string, Task[]>) => {
    try {
      setStatus('syncing');
      await setDoc(doc(db, "bhavika_tracker", "tasks"), newData, { merge: true });
      setStatus('saved');
    } catch (e) {
      console.error("Error writing to firebase", e);
      setStatus('error');
    }
  };

  const generateDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];
    
    // Fixed Range: Dec 1, 2025 to Feb 28, 2026
    // Note: Month is 0-indexed (11 = December, 0 = January, 1 = February)
    const start = new Date(2025, 11, 1); 
    const end = new Date(2026, 1, 28);    
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let current = new Date(start);
    
    while (current <= end) {
      const date = new Date(current);
      date.setHours(0, 0, 0, 0); // Normalize

      let type = DayType.WEEKDAY;
      let label = undefined;

      const dayOfWeek = date.getDay();
      const month = date.getMonth(); 
      const dayOfMonth = date.getDate();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Holiday Slowdown: Dec 20 - Jan 5
      const isDecSlowdown = month === 11 && dayOfMonth >= 20;
      const isJanSlowdown = month === 0 && dayOfMonth <= 5;
      
      if (isDecSlowdown || isJanSlowdown) type = DayType.HOLIDAY_SLOWDOWN;
      else if (isWeekend) type = DayType.WEEKEND;

      // Hard Rest
      if ((month === 11 && dayOfMonth === 25) || (month === 0 && dayOfMonth === 1)) {
        type = DayType.FULL_REST;
        label = month === 11 ? "Xmas" : "New Year";
      }

      // Past check
      const isPast = date.getTime() < today.getTime();

      days.push({ date: new Date(current), type, label, isPast });
      current.setDate(current.getDate() + 1);
    }
    return days;
  };

  const days = generateDays();

  const getTaskKey = (date: Date) => {
     const d = new Date(date);
     d.setHours(0,0,0,0);
     const offset = d.getTimezoneOffset() * 60000;
     return new Date(d.getTime() - offset).toISOString().split('T')[0];
  };

  const handleDayClick = (day: CalendarDay) => {
    const dateKey = getTaskKey(day.date);
    if (!taskData[dateKey]) {
       setTaskData(prev => ({
        ...prev,
        [dateKey]: JSON.parse(JSON.stringify(DEFAULT_DAILY_TASKS))
      }));
    }
    setSelectedDate(day.date);
    setIsModalOpen(true);
  };

  const toggleTask = async (taskId: string) => {
    if (!selectedDate) return;
    const dateKey = getTaskKey(selectedDate);
    const updatedTasks = taskData[dateKey].map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    const newData = { ...taskData, [dateKey]: updatedTasks };
    setTaskData(newData);
    await saveToFirebase(newData);
  };

  const addTask = async () => {
    if (!selectedDate || !newTaskInput.trim()) return;
    const dateKey = getTaskKey(selectedDate);
    const newTask: Task = {
      id: Date.now().toString(),
      text: newTaskInput,
      completed: false,
      isCustom: true
    };
    const updatedTasks = [...(taskData[dateKey] || []), newTask];
    const newData = { ...taskData, [dateKey]: updatedTasks };
    setTaskData(newData);
    setNewTaskInput('');
    await saveToFirebase(newData);
  };

  const deleteTask = async (taskId: string) => {
    if (!selectedDate) return;
    const dateKey = getTaskKey(selectedDate);
    const updatedTasks = taskData[dateKey].filter(t => t.id !== taskId);
    const newData = { ...taskData, [dateKey]: updatedTasks };
    setTaskData(newData);
    await saveToFirebase(newData);
  };

  // Render Helper
  const renderMonth = (monthName: string, monthDays: CalendarDay[]) => {
    if (monthDays.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h3 className="font-serif text-xl text-stone-800 mb-4 border-b border-stone-200 pb-2 flex justify-between items-baseline">
          {monthName}
          <span className="text-xs font-sans text-stone-400 font-normal uppercase tracking-widest">Execution Phase</span>
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {['S','M','T','W','T','F','S'].map((d, i) => (
             <div key={i} className="text-center text-xs font-bold text-stone-300 mb-2">{d}</div>
          ))}
          {Array.from({ length: monthDays[0].date.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square"></div>
          ))}
          {monthDays.map((d, idx) => (
            <DayCard 
              key={idx} 
              day={d} 
              onClick={() => handleDayClick(d)}
              hasData={!!taskData[getTaskKey(d.date)]}
            />
          ))}
        </div>
      </div>
    );
  };

  const decDays = days.filter(d => d.date.getMonth() === 11);
  const janDays = days.filter(d => d.date.getMonth() === 0);
  const febDays = days.filter(d => d.date.getMonth() === 1);

  return (
    <>
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-stone-200 mb-12 relative">
        <div className="absolute top-8 right-8 flex items-center gap-2">
           {status === 'syncing' && <span className="flex items-center gap-1 text-xs text-stone-400"><Loader2 size={12} className="animate-spin"/> Syncing...</span>}
           {status === 'saved' && <span className="flex items-center gap-1 text-xs text-emerald-500"><Cloud size={12}/> Cloud Saved</span>}
           {status === 'error' && <span className="flex items-center gap-1 text-xs text-rose-500"><X size={12}/> Sync Error</span>}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="font-serif text-3xl text-stone-800 mb-2">90-Day Visual Map</h2>
            <p className="text-stone-500">Dec 2025 — Feb 2026</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200"></div>
              <span className="text-stone-600">Momentum</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-stone-100 border border-stone-200"></div>
              <span className="text-stone-600">Passed (Logged)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-50 border border-blue-100"></div>
              <span className="text-stone-600">Slowdown</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {renderMonth("December '25", decDays)}
          {renderMonth("January '26", janDays)}
          {renderMonth("February '26", febDays)}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl text-center">
          <p className="font-serif italic text-blue-800 text-lg">"{QUOTES.slowdown}"</p>
          <p className="text-xs text-blue-600 mt-2 uppercase tracking-wide">Holiday Protocol: Dec 20 — Jan 5</p>
        </div>
      </div>

      {/* Task Modal */}
      {isModalOpen && selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="bg-stone-50 p-6 border-b border-stone-100 flex justify-between items-center">
              <div>
                 <h3 className="font-serif text-2xl text-stone-800">
                   {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                 </h3>
                 <div className="flex items-center gap-2 mt-1">
                   <p className="text-xs text-stone-500 uppercase tracking-wide">Daily Log</p>
                   {status === 'saved' ? 
                     <span className="text-xs text-emerald-500 flex items-center gap-1"><Check size={10} /> Saved</span> : 
                     <span className="text-xs text-stone-400 flex items-center gap-1"><Loader2 size={10} className="animate-spin" /> Saving...</span>
                   }
                 </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                 {taskData[getTaskKey(selectedDate)]?.map((task) => (
                   <div key={task.id} className="group flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-stone-300'}`}
                      >
                        {task.completed && <Check size={14} className="text-white" />}
                      </button>
                      <span className={`flex-1 text-sm ${task.completed ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                        {task.text}
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-stone-300 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                 ))}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-stone-100 pt-4">
                 <input 
                   type="text"
                   value={newTaskInput}
                   onChange={(e) => setNewTaskInput(e.target.value)}
                   onKeyDown={(e) => e.key === 'Enter' && addTask()}
                   placeholder="Add new task..."
                   className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-200"
                 />
                 <button 
                   onClick={addTask}
                   className="p-2 bg-stone-800 text-white rounded-lg hover:bg-stone-700 transition-colors"
                 >
                   <Plus size={20} />
                 </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DayCard: React.FC<{ day: CalendarDay; onClick: () => void; hasData: boolean }> = ({ day, onClick, hasData }) => {
  let bgClass = 'bg-emerald-50 border-emerald-100 text-emerald-900'; 
  
  if (day.type === DayType.WEEKEND) {
    bgClass = 'bg-amber-50 border-amber-100 text-amber-800 opacity-80';
  } else if (day.type === DayType.HOLIDAY_SLOWDOWN) {
    bgClass = 'bg-blue-50 border-blue-100 text-blue-800';
  } else if (day.type === DayType.FULL_REST) {
    bgClass = 'bg-rose-100 border-rose-200 text-rose-800 font-bold';
  }

  // Visual override for PAST DAYS - Subtle grey, no crossing out.
  if (day.isPast) {
     bgClass = 'bg-stone-100 border-stone-200 text-stone-400';
  }

  // If weekend AND past, make it even subtler
  if (day.isPast && day.type === DayType.WEEKEND) {
     bgClass = 'bg-stone-100/50 border-stone-200/50 text-stone-300';
  }

  return (
    <div 
      onClick={onClick}
      className={`aspect-square rounded-lg border ${bgClass} flex flex-col items-center justify-center relative transition-transform hover:scale-105 cursor-pointer group`}
    >
      <span className="text-sm">{day.date.getDate()}</span>
      
      {day.label && !day.isPast && <span className="text-[0.5rem] absolute bottom-1 uppercase tracking-tighter">{day.label}</span>}

      {hasData && (
        <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${day.isPast ? 'bg-stone-400' : 'bg-emerald-500'}`}></div>
      )}
    </div>
  );
};

export default CalendarView;
