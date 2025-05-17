
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormDescription 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Info } from 'lucide-react';

const prayerSettingsSchema = z.object({
  calculationMethod: z.string().default('2'), // ISNA is 2 by default
  fajrAngle: z.string().default('15.0'),
  ishaAngle: z.string().default('15.0'),
  dhuhrAdjustment: z.string().default('1'),
  maghribAdjustment: z.string().default('1'),
  juristicMethod: z.string().default('1'), // Standard is 1, Hanafi is 2
  hijriAdjustment: z.string().default('0'),
  autoLocation: z.boolean().default(true),
  location: z.string().default('Durban, South Africa'),
  latitude: z.string().default('-29.8587'),
  longitude: z.string().default('31.0218'),
  timezone: z.string().default('Africa/Johannesburg'),
});

type PrayerSettingsFormValues = z.infer<typeof prayerSettingsSchema>;

interface PrayerTimeSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSettingsChange?: (settings: PrayerSettingsFormValues) => void;
}

const PrayerTimeSettings: React.FC<PrayerTimeSettingsProps> = ({ 
  open, 
  onOpenChange,
  onSettingsChange 
}) => {
  const form = useForm<PrayerSettingsFormValues>({
    resolver: zodResolver(prayerSettingsSchema),
    defaultValues: {
      calculationMethod: '2', // ISNA
      fajrAngle: '15.0',
      ishaAngle: '15.0',
      dhuhrAdjustment: '1',
      maghribAdjustment: '1',
      juristicMethod: '1', // Standard
      hijriAdjustment: '0',
      autoLocation: true,
      location: 'Durban, South Africa',
      latitude: '-29.8587',
      longitude: '31.0218',
      timezone: 'Africa/Johannesburg',
    }
  });
  
  const onSubmit = (data: PrayerSettingsFormValues) => {
    console.log('Prayer settings saved:', data);
    if (onSettingsChange) {
      onSettingsChange(data);
    }
    toast.success('Prayer time settings saved');
    onOpenChange(false);
  };
  
  const autoLocation = form.watch('autoLocation');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Settings</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">PRAYER CALCULATION</h3>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="calculationMethod"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="mr-2">Calculation Method</FormLabel>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">Umm Al-Qura (Default)</SelectItem>
                            <SelectItem value="1">Egyptian General Authority</SelectItem>
                            <SelectItem value="3">Muslim World League</SelectItem>
                            <SelectItem value="4">Karachi</SelectItem>
                            <SelectItem value="5">ISNA</SelectItem>
                            <SelectItem value="7">Institute of Geophysics, Tehran</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fajrAngle"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Fajr angle</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select angle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15.0">15.0</SelectItem>
                            <SelectItem value="16.0">16.0</SelectItem>
                            <SelectItem value="17.0">17.0</SelectItem>
                            <SelectItem value="18.0">18.0 (Default)</SelectItem>
                            <SelectItem value="19.0">19.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ishaAngle"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Isha angle</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select angle" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15.0">15.0</SelectItem>
                            <SelectItem value="16.0">16.0</SelectItem>
                            <SelectItem value="17.0">17.0 (Default)</SelectItem>
                            <SelectItem value="18.0">18.0</SelectItem>
                            <SelectItem value="19.0">19.0</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dhuhrAdjustment"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Dhuhr time after Zawal</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 minute (Default)</SelectItem>
                            <SelectItem value="2">2 minutes</SelectItem>
                            <SelectItem value="3">3 minutes</SelectItem>
                            <SelectItem value="4">4 minutes</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="maghribAdjustment"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Maghrib time after Sunset</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 minute (Default)</SelectItem>
                            <SelectItem value="2">2 minutes</SelectItem>
                            <SelectItem value="3">3 minutes</SelectItem>
                            <SelectItem value="4">4 minutes</SelectItem>
                            <SelectItem value="5">5 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="juristicMethod"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Juristic settings</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select juristic method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Standard (Shafi, Maliki, Hanbali)</SelectItem>
                            <SelectItem value="2">Hanafi</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="hijriAdjustment"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Hijri Date Adjustment</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select adjustment" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="-2">-2</SelectItem>
                            <SelectItem value="-1">-1</SelectItem>
                            <SelectItem value="0">0 (Default)</SelectItem>
                            <SelectItem value="1">+1</SelectItem>
                            <SelectItem value="2">+2</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">LOCATION</h3>
                <FormField
                  control={form.control}
                  name="autoLocation"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel>Auto location</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter location name" disabled={autoLocation} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Latitude</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="Enter latitude" disabled={autoLocation} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel className="mr-2">Longitude</FormLabel>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <FormControl>
                          <Input {...field} placeholder="Enter longitude" disabled={autoLocation} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="timezone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel className="mr-2">Time zone</FormLabel>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={autoLocation}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Africa/Johannesburg">Africa/Johannesburg</SelectItem>
                          <SelectItem value="Asia/Riyadh">Asia/Riyadh</SelectItem>
                          <SelectItem value="Europe/London">Europe/London</SelectItem>
                          <SelectItem value="America/New_York">America/New_York</SelectItem>
                          <SelectItem value="Australia/Sydney">Australia/Sydney</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save Settings</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PrayerTimeSettings;
