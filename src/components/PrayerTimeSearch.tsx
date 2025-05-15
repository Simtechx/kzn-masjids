
import React from 'react';
import { usePrayerTimeSearch } from '@/hooks/usePrayerTimeSearch';
import RegionSelector from './prayer-time-search/RegionSelector';
import SubRegionSelector from './prayer-time-search/SubRegionSelector';
import PrayerTimeSelection from './prayer-time-search/PrayerTimeSelection';
import PrayerTimesDisplay from './prayer-time-search/PrayerTimesDisplay';
import RegionTable from './prayer-time-search/RegionTable';
import RegionTiles from './prayer-time-search/RegionTiles';
import PrayerTimeHeader from './prayer-time-search/PrayerTimeHeader';
import ViewToggle from './prayer-time-search/ViewToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { toast } from './ui/use-toast';

const PrayerTimeSearch = () => {
  const {
    selectedRegion,
    selectedSubRegion,
    searchType,
    activePrayer,
    selectedTime,
    viewMode,
    regionViewMode,
    handleRegionSelection,
    handleSubRegionSelection,
    handlePrayerSelection,
    handleTimeSelection,
    getFilteredPrayerTimes,
    setSearchType,
    setViewMode,
    setRegionViewMode,
    searchQuery,
    setSearchQuery
  } = usePrayerTimeSearch();
  
  const isMobile = useIsMobile();
  const [isContributeDialogOpen, setIsContributeDialogOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    masjidName: '',
    address: '',
    whatsapp: ''
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Information Received",
      description: "Thank you for contributing to our database.",
    });
    setFormData({
      masjidName: '',
      address: '',
      whatsapp: ''
    });
    setIsContributeDialogOpen(false);
  };
  
  return (
    <section className="py-10 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mt-2">
          <PrayerTimeHeader 
            selectedRegion={selectedRegion}
            selectedSubRegion={selectedSubRegion}
            regionViewMode={regionViewMode}
            onRegionViewModeChange={setRegionViewMode}
          />
          
          {/* Top Search Bar */}
          <div className="mb-6 mt-4">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <Input 
                  placeholder="Search for masjids, areas or districts..." 
                  className="pl-10 bg-white border h-10 text-gray-800 rounded-l-md focus:ring-amber-300 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black h-10 px-5 rounded-r-md">
                Search
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-6">
          {/* Region Selection - Conditionally render based on view mode */}
          {regionViewMode === 'icons' ? (
            <RegionSelector 
              selectedRegion={selectedRegion}
              onSelectRegion={handleRegionSelection}
            />
          ) : regionViewMode === 'grid' ? (
            <RegionTable 
              selectedRegion={selectedRegion}
              onSelectRegion={handleRegionSelection}
            />
          ) : (
            <RegionTiles
              selectedRegion={selectedRegion}
              onSelectRegion={handleRegionSelection}
            />
          )}
          
          {/* Instructional Text */}
          <div className="text-center text-gray-700">
            {isMobile ? (
              <>
                <p className="text-base font-medium">Discover Salaah Times in KwaZulu-Natal</p>
                <p className="text-base font-medium">Select a Region to View Details</p>
              </>
            ) : (
              <p className="text-lg font-medium">Discover Salaah Times in KwaZulu-Natal – Select a Region to View Details</p>
            )}
          </div>
          
          {/* Sub-region Selection */}
          {selectedRegion && (
            <SubRegionSelector
              selectedRegion={selectedRegion}
              selectedSubRegion={selectedSubRegion}
              onSelectSubRegion={handleSubRegionSelection}
            />
          )}
          
          {/* Salaah Time Blocks */}
          {selectedRegion && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <PrayerTimeSelection
                selectedRegion={selectedRegion}
                activePrayer={activePrayer}
                selectedTime={selectedTime}
                onSelectPrayer={handlePrayerSelection}
                onSelectTime={handleTimeSelection}
              />
              
              {/* Salaah Time View Toggle */}
              <ViewToggle 
                viewMode={viewMode} 
                onViewChange={setViewMode} 
              />
              
              {/* Salaah Times Display */}
              <PrayerTimesDisplay
                selectedRegion={selectedRegion}
                selectedSubRegion={selectedSubRegion}
                selectedTime={selectedTime}
                activePrayer={activePrayer}
                searchType={searchType}
                filteredPrayerTimes={getFilteredPrayerTimes()}
                viewMode={viewMode}
              />
            </div>
          )}

          {/* Contribute Information Button */}
          <div className="flex justify-center mt-4">
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-black py-2 px-4 rounded-md"
              onClick={() => setIsContributeDialogOpen(true)}
            >
              Contribute Information
            </Button>
          </div>
        </div>

        {/* Contribution Form Dialog */}
        <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Contribute Masjid Information</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmitForm}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="masjidName" className="text-sm font-medium">Masjid Name</label>
                  <Input
                    id="masjidName"
                    name="masjidName"
                    value={formData.masjidName}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="address" className="text-sm font-medium">Address</label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp Number</label>
                  <Input
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleFormChange}
                    className="col-span-3"
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-teal-600 text-white hover:bg-teal-700">
                  Submit Information
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default PrayerTimeSearch;
