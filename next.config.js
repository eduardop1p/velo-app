/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cryptocompare.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
