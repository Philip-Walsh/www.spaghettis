import DeviceOptimizeClient from '../../../components/device/DeviceOptimizeClient';
import DeviceHero from '../../../components/device/DeviceHero';

export const metadata = {
  title: 'Device Optimization',
  description: 'Advanced device detection and optimization with modern web technologies'
};

export default function DeviceOptimizePage() {
  return (
    <div className="p-4 md:p-8 device-theme">
      {/* Enhanced Hero Section */}
      <DeviceHero />
      
      {/* Device Optimization Component */}
      <DeviceOptimizeClient />
    </div>
  );
}