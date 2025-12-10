
export enum DayType {
  WEEKDAY = 'WEEKDAY',
  WEEKEND = 'WEEKEND',
  HOLIDAY_SLOWDOWN = 'HOLIDAY_SLOWDOWN',
  FULL_REST = 'FULL_REST',
}

export interface CalendarDay {
  date: Date;
  type: DayType;
  label?: string;
  isPast?: boolean;
}

export interface ChecklistItem {
  id: string;
  text: string;
  subtext?: string;
  target?: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  isCustom?: boolean;
}

export interface SectionProps {
  id?: string;
  className?: string;
}
