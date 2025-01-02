/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
        // domains: ['woo.nexgi.com', 'local.nexgi-woo', 'dev.giggs.in', 'd2b9mj24vzk686.cloudfront.net'],
        // unoptimized: true,
        // path: '/checkout',

        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'woo.nexgi.com',
            },
            {
              protocol: 'http',
              hostname: 'local.nexgi-woo',
            },
            {
              protocol: 'https',
              hostname: 'dev.giggs.in',
            },
            {
              protocol: 'https',
              hostname: 'd2b9mj24vzk686.cloudfront.net',
            },
        ],
      
    },
};

export default nextConfig;
