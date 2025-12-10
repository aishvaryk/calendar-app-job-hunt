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
}

export interface ChecklistItem {
  id: string;
  text: string;
  subtext?: string;
  target?: string;
}

export interface SectionProps {
  id?: string;
  className?: string;
}