
import { ReactNode } from 'react';

export interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
  icon?: ReactNode;
  bgColor: string;
  textColor: string;
}
