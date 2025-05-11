
export interface MasjidProject {
  name: string;
  location: string;
  image: string;
  completionPercentage: number;
  description?: string; // Adding description as an optional field
}

export const newProjects: MasjidProject[] = [
  {
    name: "Masjid Al-Noor",
    location: "Phoenix, Durban",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
    completionPercentage: 65,
    description: "A beautiful modern masjid serving the Phoenix community."
  },
  {
    name: "Masjid Al-Furqan",
    location: "Pietermaritzburg",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
    completionPercentage: 40,
    description: "Expanding to accommodate the growing Muslim community."
  },
  {
    name: "Musgrave Islamic Center",
    location: "Musgrave, Durban",
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80",
    completionPercentage: 85,
    description: "A central hub for Islamic activities in Musgrave."
  },
  {
    name: "Juma Masjid",
    location: "Verulam",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80",
    completionPercentage: 25,
    description: "A community-funded masjid construction project."
  },
  {
    name: "Masjid Al-Rahma",
    location: "Chatsworth",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80",
    completionPercentage: 55,
    description: "Expansion project to include educational facilities."
  },
  {
    name: "Masjid Al-Taqwa",
    location: "Westville",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80",
    completionPercentage: 70,
    description: "Renovation and expansion of existing facilities."
  },
  {
    name: "Central Mosque",
    location: "Durban CBD",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80",
    completionPercentage: 45,
    description: "Major renovation project in the heart of Durban."
  }
];
