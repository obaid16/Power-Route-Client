/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    qualities: [75, 100],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
