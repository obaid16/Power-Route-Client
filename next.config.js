// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Turbopack configuration – explicitly define the workspace root
  turbopack: {
    // Use the directory of this config file (the client folder) as the root
    root: __dirname,
  },
};

module.exports = nextConfig;
