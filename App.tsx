import React, { useState } from 'react';
import ProfileCard from './components/ProfileCard';
import DailyRoutine from './components/DailyRoutine';
import CalendarView from './components/CalendarView';
import ChecklistPanel from './components/ChecklistPanel';
import AnxietyProtocol from './components/AnxietyProtocol';
import IdentitySection from './components/IdentitySection';
import SuccessDefinition from './components/SuccessDefinition';
import { ArrowDown, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Routine', id: 'routine' },
    { name: 'Calendar', id: 'calendar' },
    { name: 'Trackers', id: 'goals' },
    { name: 'Protocol', id: 'anxiety' },
    { name: 'Identity', id: 'identity' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-20 relative">
      {/* Background flare */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-50 via-slate-50 to-teal-50"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      {/* Navigation / Header */}
      <nav className="w-full bg-white/80 border-b border-stone-200 sticky top-0 z-50 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <span 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-serif font-bold text-stone-800 text-lg cursor-pointer hover:text-stone-600 transition-colors"
            >
              Bhavika's 90 Days
            </span>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 text-sm font-medium text-stone-500">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={`#${link.id}`} 
                    onClick={(e) => scrollToSection(e, link.id)}
                    className="hover:text-stone-900 hover:bg-stone-50 px-3 py-1.5 rounded-md transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-stone-600 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-stone-200 shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.id}`} 
                onClick={(e) => scrollToSection(e, link.id)}
                className="text-stone-600 text-base font-medium py-2 border-b border-stone-100 last:border-0"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
        <ProfileCard />
        
        <div className="flex flex-col items-center justify-center my-12 text-stone-300">
            <ArrowDown size={24} className="animate-bounce" />
        </div>

        <section id="routine" className="scroll-mt-24">
            <DailyRoutine />
        </section>

        <section id="calendar" className="scroll-mt-24">
            <CalendarView />
        </section>

        <section id="goals" className="scroll-mt-24">
            <ChecklistPanel />
        </section>

        <section id="anxiety" className="scroll-mt-24">
            <AnxietyProtocol />
        </section>

        <section id="identity" className="scroll-mt-24">
            <IdentitySection />
        </section>

        <section id="success" className="scroll-mt-24">
            <SuccessDefinition />
        </section>

        <footer className="text-center py-12 text-stone-400 text-sm">
            <p>© {new Date().getFullYear()} Execution Framework. Created for Bhavika.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;