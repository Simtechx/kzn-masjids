
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Info, X } from 'lucide-react';
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
  bankingDetails
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="h-[420px] rounded-xl overflow-hidden border-2 border-amber-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col relative">
      <div className="relative h-full overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
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
            
            {/* Changed from Contribute to More Info */}
            <Button 
              className="w-full mt-2 bg-yellow-700 hover:bg-yellow-800 text-white font-semibold"
              onClick={() => setShowDetails(true)}
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
        
        {/* Project Details Modal */}
        {showDetails && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-10 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-md p-5 relative max-h-[90%] overflow-y-auto">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 top-2"
                onClick={() => setShowDetails(false)}
              >
                <X className="h-5 w-5" />
              </Button>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">{name}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Location</h4>
                  <p className="text-gray-600">{location}, {district || ''}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Region</h4>
                  <p className="text-gray-600">{region}, {country}</p>
                </div>
                
                {description && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Description</h4>
                    <p className="text-gray-600">{description}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Progress</h4>
                  <div className="flex items-center gap-2">
                    <Progress value={completionPercentage} className="h-2 flex-grow" />
                    <span className="font-medium">{completionPercentage}%</span>
                  </div>
                </div>
                
                {bankingDetails && (
                  <div className="border-t pt-3 mt-3">
                    <h4 className="font-medium text-gray-700 mb-2">Banking Details</h4>
                    <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 space-y-1">
                      {bankingDetails.bankName && (
                        <p className="text-sm">
                          <span className="font-medium">Bank:</span> {bankingDetails.bankName}
                        </p>
                      )}
                      {bankingDetails.accountNumber && (
                        <p className="text-sm">
                          <span className="font-medium">Account Number:</span> {bankingDetails.accountNumber}
                        </p>
                      )}
                      {bankingDetails.branchCode && (
                        <p className="text-sm">
                          <span className="font-medium">Branch Code:</span> {bankingDetails.branchCode}
                        </p>
                      )}
                      {bankingDetails.reference && (
                        <p className="text-sm">
                          <span className="font-medium">Reference:</span> {bankingDetails.reference}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                <Button className="w-full mt-2 bg-yellow-700 hover:bg-yellow-800 text-white">
                  <DollarSign className="h-4 w-4 mr-1" />
                  Contribute Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default NewMasjidProject;
