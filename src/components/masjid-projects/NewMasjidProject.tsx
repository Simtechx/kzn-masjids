
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export interface NewMasjidProjectProps {
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
  onMoreInfo?: () => void;
}

const NewMasjidProject: React.FC<NewMasjidProjectProps> = ({ 
  name, 
  location, 
  image, 
  completionPercentage,
  description,
  district,
  region,
  country,
  bankingDetails,
  onMoreInfo
}) => {
  return (
    <Card className="h-full rounded-xl overflow-hidden border-2 border-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col relative">
      <div className="relative h-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
          {/* Semi-transparent light block behind content for better visibility */}
          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
            <p className="text-gray-200 mb-4 text-sm">{location}</p>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white">Project Progress</span>
                <span className="text-sm font-medium text-amber-300">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2 bg-gray-600/50" />
            </div>
            
            {/* More Info button */}
            <Button 
              className="w-full mt-2 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold"
              onClick={onMoreInfo}
            >
              <Info className="h-5 w-5 p-0.5 rounded-full border border-current" />
              More Info
            </Button>
          </div>
        </div>
        
        {/* Completion percentage badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-[#094941] text-white rounded-full text-sm font-medium shadow-md">
            {completionPercentage}% Complete
          </span>
        </div>
      </div>
    </Card>
  );
};

export default NewMasjidProject;
