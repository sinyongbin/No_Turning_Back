/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path*',
        // destination: 'http://192.168.0.244:8080/:path*',
        destination: 'http://localhost:8080/:path*',
      },
    ];
  },
};
