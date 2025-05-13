
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
    image: "public/lovable-uploads/82c3db83-c030-4704-9dfb-e5c88e655cff.png",
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
    image: "public/lovable-uploads/c87a6e4d-8874-44fc-a458-4bba975e56e4.png",
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
    image: "public/lovable-uploads/3946e542-b3f4-4263-872a-b2c05bf31b02.png",
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
    image: "public/lovable-uploads/75ae1355-358a-4128-8f8f-5dc31cf928da.png",
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
    image: "public/lovable-uploads/47e27bf8-b2a3-45b1-933a-13c99d1951c6.png",
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
    image: "public/lovable-uploads/c945f230-2d4a-4146-b4e0-c25b18ddcc14.png",
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
    image: "public/lovable-uploads/0edd7213-de98-4b36-98e0-90b89ca3c57a.png",
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
    image: "public/lovable-uploads/da97287f-eb87-4d20-810e-136491a9ce63.png",
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
