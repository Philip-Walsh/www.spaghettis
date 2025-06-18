// Edge function to optimize content based on device type
export default async function deviceOptimize(request, context) {
  // Get user agent from request
  const userAgent = request.headers.get('user-agent') || '';
  
  // Determine device type
  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);
  
  // Add custom header for client-side usage
  const response = await context.next();
  response.headers.set('X-Device-Type', isMobile ? 'mobile' : 'desktop');
  response.headers.set('X-Built-By', 'Amazon Q');
  
  return response;
}

export const config = {
  path: '/*',
};