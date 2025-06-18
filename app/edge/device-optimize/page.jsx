import EdgeFunctionDemo from '../../../components/EdgeFunctionDemo';

export const metadata = {
  title: 'Device Optimization',
  description: 'Edge function demo for device-specific content optimization'
};

export default function DeviceOptimizePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Device Optimized Experience</h1>
      
      <p className="mb-6">
        This page uses an Edge Function to detect your device type and optimize content accordingly.
        The detection happens at the edge, before the page is served to your browser.
      </p>
      
      {/* Client component that uses edge function data */}
      <EdgeFunctionDemo />
      
      <div className="bg-blue-900 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-bold mb-4">How It Works</h2>
        <p className="mb-4">
          This feature uses Netlify Edge Functions to detect your device type before the page is served.
          The edge function adds custom headers that the React component can read to optimize the experience.
        </p>
        <p>
          Built by Amazon Q - demonstrating edge computing capabilities for real-time personalization.
        </p>
      </div>
    </div>
  );
}