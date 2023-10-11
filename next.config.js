/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
   async rewrites() {
      return [
         {
            source: "/:path*",
            destination: "http://localhost:8080/:path*",
         },
      ];
   },
}

// module.exports = nextConfig
