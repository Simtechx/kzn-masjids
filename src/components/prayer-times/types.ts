
import { ReactNode } from 'react';

export interface PrayerTime {
  name: string;
  time: string;
  timestamp: number;
  icon?: ReactNode;
  bgColor: string;
  textColor: string;
}

export interface ViewModeProps {
  viewMode: 'block' | 'table';
}

export interface RegionViewModeProps {
  regionViewMode: 'icons' | 'grid' | 'tiles';
}
