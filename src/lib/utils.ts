
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get image dimensions and calculate aspect ratio
 * @param src Image source URL
 * @returns Promise with image dimensions and aspect ratio
 */
export function getImageDimensions(src: string): Promise<{ width: number; height: number; aspectRatio: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      });
    };
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Format a prayer time string for display
 * @param time Time string in "HH:MM" format
 * @returns Formatted time string
 */
export function formatPrayerTime(time: string): string {
  if (!time) return "";
  
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
  
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}
