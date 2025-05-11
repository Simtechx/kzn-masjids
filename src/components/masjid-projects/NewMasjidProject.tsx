
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export interface NewMasjidProjectProps {
  name: string;
  location: string;
  image: string;
  completionPercentage: number;
}

const NewMasjidProject: React.FC<NewMasjidProjectProps> = ({ 
  name, 
  location, 
  image, 
  completionPercentage 
}) => {
  return (
    <Card className="h-[420px] rounded-xl overflow-hidden border-2 border-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col">
      <div className="relative h-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
          <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
          <p className="text-gray-200 mb-4 text-sm">{location}</p>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-white">Project Progress</span>
              <span className="text-sm font-medium text-amber-300">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2 bg-gray-600/50" />
          </div>
          
          <Button 
            className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold"
          >
            <DollarSign className="h-5 w-5 p-0.5 rounded-full border border-current" />
            Contribute
          </Button>
        </div>
        
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
