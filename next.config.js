/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined,

  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  typescript:{
    ignoreBuildErrors: true
  },
};

module.exports = nextConfig;
