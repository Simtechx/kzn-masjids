
export interface MasjidProject {
  name: string;
  location: string;
  image: string;
  completionPercentage: number;
  description?: string;
  district?: string;
  region?: string;
  country?: string;
  bankingDetails?: {
    bankName?: string;
    accountNumber?: string;
    branchCode?: string;
    reference?: string;
  };
}

export const newProjects: MasjidProject[] = [
  {
    name: "Berea West Musjid and Madrasah Project",
    location: "Durban",
    image: "public/lovable-uploads/c2b0575c-2182-4135-9288-7388ec6af06c.png",
    completionPercentage: 65,
    description: "A beautiful modern masjid project serving the Berea West community.",
    district: "Durban",
    region: "Kwa Zulu Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "Standard Bank",
      accountNumber: "123456789",
      branchCode: "051001",
      reference: "Berea Masjid"
    }
  },
  {
    name: "Umzumbe",
    location: "South Coast",
    image: "public/lovable-uploads/fa817b5b-ed10-4462-ae76-4150c3dc117b.png",
    completionPercentage: 40,
    description: "Masjid construction project in the Umzumbe area.",
    district: "South Coast",
    region: "Kwa Zulu Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "ABSA Bank",
      accountNumber: "987654321",
      branchCode: "632005",
      reference: "Umzumbe Masjid"
    }
  },
  {
    name: "Kwapata",
    location: "Pietermaritzburg",
    image: "public/lovable-uploads/007ed183-626e-4d4e-9ae9-28b70f5e5489.png",
    completionPercentage: 85,
    description: "Masjid construction project in Kwapata.",
    district: "Pietermaritzburg",
    region: "Kwa Zulu Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "Nedbank",
      accountNumber: "456789123",
      branchCode: "198765",
      reference: "Kwapata Masjid"
    }
  },
  {
    name: "Isipofu",
    location: "South Coast",
    image: "public/lovable-uploads/b0e81995-5250-4611-8fe6-dbaa72564e83.png",
    completionPercentage: 25,
    description: "A community-funded masjid construction project in Isipofu.",
    district: "South Coast",
    region: "Kwa Zulu Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "FNB",
      accountNumber: "789123456",
      branchCode: "250655",
      reference: "Isipofu Masjid"
    }
  },
  {
    name: "Mariannridge",
    location: "Pinetown",
    image: "public/lovable-uploads/938414f2-d92c-4570-991c-c1f69046be9e.png",
    completionPercentage: 55,
    description: "Expansion project to include educational facilities in Mariannridge.",
    district: "Pinetown",
    region: "Kwa Zulu Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "Standard Bank",
      accountNumber: "321654987",
      branchCode: "051001",
      reference: "Mariannridge Masjid"
    }
  },
  {
    name: "Umzumbe (Completely rebuilt)",
    location: "South Coast",
    image: "public/lovable-uploads/cb701ca2-9918-4a56-bada-49d9beccbb4b.png",
    completionPercentage: 70,
    description: "Complete rebuilding of an existing masjid facility.",
    district: "South Coast",
    region: "Kwa Zulu Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "ABSA Bank",
      accountNumber: "654321987",
      branchCode: "632005",
      reference: "Umzumbe Rebuild"
    }
  },
  {
    name: "Steadville",
    location: "Ladysmith",
    image: "public/lovable-uploads/ebef1d22-0b8b-4307-b570-ea3743f343ca.png",
    completionPercentage: 45,
    description: "Major construction project in Steadville, Ladysmith.",
    district: "Ladysmith",
    region: "Northern Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "Nedbank",
      accountNumber: "159753456",
      branchCode: "198765",
      reference: "Steadville Masjid"
    }
  },
  {
    name: "Mariannhill",
    location: "Pinetown",
    image: "public/lovable-uploads/fe3dd249-f4d4-4534-b67f-28d3a8b92213.png",
    completionPercentage: 30,
    description: "New masjid construction in Mariannhill area.",
    district: "Pinetown",
    region: "Kwa Zulu Natal",
    country: "South Africa",
    bankingDetails: {
      bankName: "FNB",
      accountNumber: "852963741",
      branchCode: "250655",
      reference: "Mariannhill Masjid"
    }
  }
];
