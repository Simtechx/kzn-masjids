
export interface MasjidProject {
  name: string;
  location: string;
  image: string;
  completionPercentage: number;
}

export const newProjects: MasjidProject[] = [
  {
    name: "Masjid Al-Noor",
    location: "Phoenix, Durban",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&q=80",
    completionPercentage: 65
  },
  {
    name: "Masjid Al-Furqan",
    location: "Pietermaritzburg",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80",
    completionPercentage: 40
  },
  {
    name: "Musgrave Islamic Center",
    location: "Musgrave, Durban",
    image: "https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80",
    completionPercentage: 85
  },
  {
    name: "Juma Masjid",
    location: "Verulam",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80",
    completionPercentage: 25
  },
  {
    name: "Masjid Al-Rahma",
    location: "Chatsworth",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80",
    completionPercentage: 55
  },
  {
    name: "Masjid Al-Taqwa",
    location: "Westville",
    image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80",
    completionPercentage: 70
  },
  {
    name: "Central Mosque",
    location: "Durban CBD",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80",
    completionPercentage: 45
  }
];
