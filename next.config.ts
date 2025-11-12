import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  
  // Add experimental features for better proxy handling
  experimental: {
    proxyTimeout: 30000, // 30 second timeout
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com/',
        port: '',
        pathname: '/**',
      },
    ]
  },
   async rewrites() {
    return [
      // Try HTTP first, then fallback to HTTPS if needed
      { source: '/_apps/statistics/:path*', destination: 'http://statistics.unche.or.ug/:path*' },
      { source: '/_apps/ojs/:path*',        destination: 'http://ojs.unche.or.ug/:path*' },
      
      // Fallback rewrites for HTTPS (commented out for now)
      // { source: '/_apps/statistics/:path*', destination: 'https://statistics.unche.or.ug/:path*' },
      // { source: '/_apps/ojs/:path*',        destination: 'https://ojs.unche.or.ug/:path*' },
    ];
  },
  async headers() {
    return [
      // Headers for the proxied apps
      {
        source: '/_apps/:path*',
        headers: [
          // Remove X-Frame-Options to allow iframe embedding
          { key: 'X-Frame-Options', value: '' },
          
          // Use Content-Security-Policy instead for better control
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' http://localhost:3000 http://localhost:3001 http://127.0.0.1:3000 http://127.0.0.1:3001",
          },
          
          // Other security headers
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'geolocation=(), camera=(), microphone=()' },
        ],
      },
    ];
  },
  
};

export default nextConfig;
