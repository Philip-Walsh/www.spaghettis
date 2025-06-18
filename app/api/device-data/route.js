import { NextResponse } from 'next/server';

/**
 * API route that returns device-specific data
 * Uses the X-Device-Type header set by our edge function
 */
export async function GET(request) {
  // Get device type from headers (set by our edge function)
  // If header is not available, detect from user agent
  const deviceType = request.headers.get('X-Device-Type') || 
                    (/mobile|android|iphone|ipad|ipod/i.test(request.headers.get('user-agent') || '') 
                      ? 'mobile' 
                      : 'desktop');
  
  const builtBy = request.headers.get('X-Built-By') || 'Amazon Q';
  
  // Return different data based on device type
  const data = {
    deviceType,
    builtBy,
    timestamp: new Date().toISOString(),
    features: deviceType === 'mobile' 
      ? ['Simplified UI', 'Touch optimized', 'Reduced data usage']
      : ['Full feature set', 'Advanced interactions', 'High-resolution content'],
    recommendations: deviceType === 'mobile'
      ? ['Use landscape mode for better experience', 'Enable notifications for updates']
      : ['Try keyboard shortcuts for faster navigation', 'Explore advanced filtering options']
  };
  
  // Add CORS headers to allow requests from any origin
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}