/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export',
    images: {
        domains: ['woo.nexgi.com', 'local.nexgi-woo', 'dev.giggs.in'],
        unoptimized: true,
        // path: '/checkout',
    },
};

export default nextConfig;
