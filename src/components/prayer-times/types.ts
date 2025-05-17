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

export interface PrayerSettings {
  calculationMethod: string;
  fajrAngle: string;
  ishaAngle: string;
  dhuhrAdjustment: string;
  maghribAdjustment: string;
  juristicMethod: string;
  hijriAdjustment: string;
  autoLocation: boolean;
  location: string;
  latitude: string;
  longitude: string;
  timezone: string;
}
