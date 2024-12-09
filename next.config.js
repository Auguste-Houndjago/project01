/** @type {import('next').NextConfig} */
const nextConfig = {
  output: undefined,


  images: { unoptimized: true },

  rules: {
    "react/no-unescaped-entities": "off", 
  },
};

module.exports = nextConfig;
