
import React, { useState, useEffect, useRef } from 'react';
import { newProjects } from '@/data/masjidProjectsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LayoutGrid, List, Info, CreditCard } from 'lucide-react';
import NewMasjidProject from './masjid-projects/NewMasjidProject';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SupportNewMasjids: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'projects' | 'list'>('projects');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-slide effect with a slower speed (4 seconds)
  useEffect(() => {
    if (!isPaused && viewMode === 'projects') {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % newProjects.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [isPaused, newProjects.length, viewMode]);
  
  // Set transform style direct on container
  const transformStyle = {
    transform: `translateX(-${currentSlide * 100}%)`
  };

  const handleOpenProjectDetails = (projectIndex: number) => {
    setSelectedProject(projectIndex);
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-gray-100 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-teal-50 opacity-70"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
          Support New and Upcoming Masjid Projects
        </h2>
        
        {/* Added slogan line below header */}
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
          Help build places of worship for future generations by contributing to these ongoing projects.
        </p>
        
        {/* Toggle view mode between Projects and List */}
        <div className="flex justify-center mb-6">
          <div className="flex space-x-2 bg-white shadow-sm rounded-md">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center ${
                viewMode === 'projects' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100'
              }`}
              onClick={() => setViewMode('projects')}
            >
              <LayoutGrid className="h-4 w-4 mr-1" />
              Projects
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center ${
                viewMode === 'list' ? 'bg-yellow-500 text-black' : 'hover:bg-gray-100'
              }`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>
        
        {viewMode === 'projects' ? (
          <>
            {/* Full-sized Project Card Slider for both mobile and desktop */}
            <div 
              className="relative overflow-hidden rounded-xl w-full max-w-5xl mx-auto"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              ref={sliderRef}
            >
              {/* Carousel track with proper transform */}
              <div 
                className="flex transition-transform duration-700 ease-in-out w-full"
                style={transformStyle}
              >
                {newProjects.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4 md:px-8">
                    <div className="relative">
                      <AspectRatio ratio={16/10} className="bg-muted overflow-hidden rounded-md">
                        <NewMasjidProject 
                          name={project.name}
                          location={project.location}
                          image={project.image}
                          completionPercentage={project.completionPercentage}
                          description={project.description}
                          district={project.district}
                          region={project.region}
                          country={project.country}
                          bankingDetails={project.bankingDetails}
                          onMoreInfo={() => handleOpenProjectDetails(index)}
                        />
                      </AspectRatio>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {newProjects.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 rounded-full transition-all ${
                      currentSlide === index ? "w-8 bg-yellow-500" : "w-3 bg-[#062C25]"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          // List view showing all projects in a table
          <div className="bg-white rounded-lg shadow-lg p-4 max-w-5xl mx-auto">
            <h3 className="text-xl font-bold mb-4 text-[#062C25]">All Masjid Projects</h3>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#062C25]">
                    <TableHead className="text-white">Project Name</TableHead>
                    <TableHead className="text-white">Location</TableHead>
                    <TableHead className="text-white">District</TableHead>
                    <TableHead className="text-white text-center">Progress</TableHead>
                    <TableHead className="text-white text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newProjects.map((project, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{project.name}</TableCell>
                      <TableCell>{project.location}</TableCell>
                      <TableCell>{project.district}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={project.completionPercentage}
                            className="h-2 flex-grow"
                          />
                          <span className="text-sm font-medium">{project.completionPercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          className="bg-yellow-600 hover:bg-yellow-700"
                          onClick={() => handleOpenProjectDetails(index)}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          More Info
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
        
        {/* Project Details Dialog */}
        <AlertDialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject !== null && (
              <>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl text-[#062C25]">{newProjects[selectedProject].name}</AlertDialogTitle>
                  <AlertDialogDescription className="text-base text-gray-700">
                    {newProjects[selectedProject].location}, {newProjects[selectedProject].district}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div>
                    <img 
                      src={newProjects[selectedProject].image} 
                      alt={newProjects[selectedProject].name} 
                      className="w-full h-auto rounded-md object-cover max-h-[300px]" 
                    />
                    
                    <div className="mt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Project Progress</span>
                        <span className="font-medium text-amber-600">{newProjects[selectedProject].completionPercentage}%</span>
                      </div>
                      <Progress value={newProjects[selectedProject].completionPercentage} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {newProjects[selectedProject].description && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">About this project</h4>
                        <p className="text-gray-700">{newProjects[selectedProject].description}</p>
                      </div>
                    )}
                    
                    {newProjects[selectedProject].name === "Berea West Musjid and Madrasah Project" && (
                      <div className="bg-teal-50 border border-teal-100 p-3 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-2">PHASE 5 BEREA WEST MUSJID AND MADRASAH PROJECT</h4>
                        <p className="text-sm text-gray-700 mb-2">
                          Alhamdulillah with Grace and Mercy of ALLAH TA'ALA we are now nearing completion of the Project.
                        </p>
                        <h5 className="font-medium text-gray-900 mb-1">Scope of work to be completed:</h5>
                        <p className="text-sm text-gray-700 mb-2">
                          Musjid and Madrasah: Balustrades, Metalworks incl Gates, Final Fix Plumbing and Electrical, 
                          HVAC, Ceilings, Joinery, Painting.
                          Completion of Minaret, Boundary Wall, Paving.
                        </p>
                        <p className="text-sm text-gray-700 mb-1">
                          <span className="font-medium">Phase 5 Target:</span> R2,500,000
                        </p>
                        <p className="text-sm text-gray-700 mb-2">
                          <span className="font-medium">5000 Shares Available @ R500 each.</span>
                        </p>
                        <p className="text-sm text-gray-700">
                          During this Mubarak month of Ramadaan when rewards are multiplied manifold maximize your rewards 
                          by spending generously for this noble cause.
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                          Open your heart and spend in the Path of Allah, this could possibly be your last golden 
                          opportunity as the project nears the end.
                        </p>
                      </div>
                    )}
                    
                    {newProjects[selectedProject].bankingDetails && (
                      <div className="border border-yellow-200 bg-yellow-50 rounded-md p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CreditCard className="h-5 w-5 text-yellow-700" />
                          <h4 className="font-bold text-gray-900">Banking Details</h4>
                        </div>
                        
                        <div className="space-y-2">
                          {newProjects[selectedProject].name === "Berea West Musjid and Madrasah Project" ? (
                            <>
                              <p className="text-sm"><span className="font-medium">Name of Account:</span> Berea West Educational Trust</p>
                              <p className="text-sm"><span className="font-medium">Bank:</span> HBZ Bank Limited</p>
                              <p className="text-sm"><span className="font-medium">Type of Account:</span> Current</p>
                              <p className="text-sm"><span className="font-medium">Account Number:</span> 18 901 314636</p>
                              <p className="text-sm"><span className="font-medium">Branch Code:</span> 570226</p>
                              <p className="text-sm"><span className="font-medium">Reference:</span> BWMM Your Cell NO.</p>
                            </>
                          ) : (
                            <>
                              {newProjects[selectedProject].bankingDetails.bankName && (
                                <p className="text-sm">
                                  <span className="font-medium">Bank:</span> {newProjects[selectedProject].bankingDetails.bankName}
                                </p>
                              )}
                              {newProjects[selectedProject].bankingDetails.accountNumber && (
                                <p className="text-sm">
                                  <span className="font-medium">Account Number:</span> {newProjects[selectedProject].bankingDetails.accountNumber}
                                </p>
                              )}
                              {newProjects[selectedProject].bankingDetails.branchCode && (
                                <p className="text-sm">
                                  <span className="font-medium">Branch Code:</span> {newProjects[selectedProject].bankingDetails.branchCode}
                                </p>
                              )}
                              {newProjects[selectedProject].bankingDetails.reference && (
                                <p className="text-sm">
                                  <span className="font-medium">Reference:</span> {newProjects[selectedProject].bankingDetails.reference}
                                </p>
                              )}
                            </>
                          )}
                        </div>
                        
                        {newProjects[selectedProject].name === "Berea West Musjid and Madrasah Project" && (
                          <div className="mt-4 border-t pt-3 border-yellow-200">
                            <p className="text-sm font-medium mb-1">For more information, contact:</p>
                            <p className="text-sm">Zahed Mahomedy: 072 118 7700</p>
                            <p className="text-sm">Abdul Hafiz Mirza: 072 428 9621</p>
                            <p className="text-sm">Hajee Yusuf Lockhat: 083 790 7773</p>
                            <p className="text-sm mt-2">
                              Please email proof of payment to: <span className="text-blue-600">bereawestmm@gmail.com</span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <AlertDialogFooter>
                  <AlertDialogAction className="bg-yellow-600 hover:bg-yellow-700 text-white">
                    Close
                  </AlertDialogAction>
                </AlertDialogFooter>
              </>
            )}
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </section>
  );
};

export default SupportNewMasjids;
