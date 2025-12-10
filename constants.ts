import { ChecklistItem } from './types';

export const PROFILE = {
  name: "Bhavika",
  role: "Senior Writer (Product)",
  location: "Bangalore (Remote/Hybrid)",
  experience: "4 Years",
  salaryTarget: "18–20 LPA",
  portfolioRating: "9/10",
  portfolioContent: "Storytelling, Product Funnels, UX Writing, Case Studies",
  portfolioLink: "Google Drive",
};

export const QUOTES = {
  slowdown: "Silence is seasonal, not personal.",
  anxiety: "Productivity serves wellbeing — not the other way around.",
  philosophy: "Talent is stable, market timing is temporary.",
};

export const WEEKLY_CHECKLIST: ChecklistItem[] = [
  { id: 'w1', text: 'Job Applications', target: '60 (40-60 in slowdown)', subtext: 'Automation allowed, all channels.' },
  { id: 'w2', text: 'Skill / Growth', target: '3-5 Hours', subtext: 'UX writing, portfolio refinement.' },
  { id: 'w3', text: 'Networking', target: '2-5 Conversations', subtext: 'Former colleagues, referrals.' },
  { id: 'w4', text: 'Emotional Check-in', target: 'Review', subtext: 'Rate stress & confidence (1-10).' },
  { id: 'w5', text: 'Portfolio Micro-update', target: '1 Review', subtext: 'Keep it fresh, no pressure.' },
];

export const MONTHLY_GOALS = {
  december: [
    "200–240 Cumulative Applications",
    "Observe emotional resilience during slowdown",
    "Light portfolio review",
    "Establish routine momentum"
  ],
  january: [
    "300–350 Cumulative Applications",
    "Gather interview insights",
    "Fine-tune resume/portfolio based on feedback",
    "Reduce emotional spirals"
  ],
  february: [
    "450–550 Cumulative Applications",
    "Interviews across multiple stages",
    "Strong emotional resilience",
    "Outcome independence established"
  ]
};

export const IDENTITY_AFFIRMATIONS = [
  "I should not measure emotional safety by recruiter silence.",
  "I should not panic or project worst-case outcomes.",
  "I should not attach identity to interview frequency.",
  "I should remember that a holiday slowdown is normal.",
  "I should prioritize calmness and stability over urgency.",
  "I should treat the plan itself as emotional structure.",
  "I should not absorb anxiety as identity.",
  "I should remember that talent is stable, market timing is temporary."
];