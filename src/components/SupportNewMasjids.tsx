
import React, { useState, useEffect, useRef } from 'react';
import { newProjects } from '@/data/masjidProjectsData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useIsMobile } from '@/hooks/use-mobile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LayoutGrid, List, Info } from 'lucide-react';
import NewMasjidProject from './masjid-projects/NewMasjidProject';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const SupportNewMasjids: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewMode, setViewMode] = useState<'projects' | 'list'>('projects');
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
            {/* Responsive Gallery-style Slider */}
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
                    <div className="relative h-full">
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
                        />
                      </AspectRatio>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination indicators - Updated color to match #062C25 */}
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
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
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
      </div>
    </section>
  );
};

export default SupportNewMasjids;
