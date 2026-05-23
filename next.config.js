// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add any existing Next.js config here (e.g., images, rewrites, etc.)
  // ------------------------------------------------------------
  // Turbopack configuration – explicitly define the workspace root
  turbopack: {
    // Use the directory of this config file (the client folder) as the root
    root: __dirname,
  },
};

module.exports = nextConfig;
