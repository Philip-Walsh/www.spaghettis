import DeviceHero from '../../../components/device/DeviceHero';
import DeviceOptimizeClient from '../../../components/device/DeviceOptimizeClient';

export const metadata = {
    title: 'Device Optimization - Edge Computing Demo',
    description: 'Advanced device optimization using Netlify Edge Functions for personalized experiences'
};

export default function DeviceOptimizePage() {
    return (
        <>
            {/* Hero section with purple branding */}
            <DeviceHero />

            {/* Main device optimization interface with purple components */}
            <DeviceOptimizeClient />

            <div className="p-6 mt-8 bg-gradient-to-r from-slate-900 to-blue-800 rounded-lg border border-purple-500/20">
                <h2 className="text-xl font-bold mb-4 text-gradient">How It Works</h2>
                <p className="mb-4 text-slate-200">
                    This feature uses Netlify Edge Functions to detect your device type before the page is served. The
                    edge function adds custom headers that the React component can read to optimize the experience.
                </p>
                <p className="text-purple-200">
                    Built by Amazon Q - demonstrating edge computing capabilities for real-time personalization.
                </p>
            </div>
        </>
    );
}
