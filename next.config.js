/** @type {import('next').NextConfig} */
const path = require('path');

/** @type {import('next/types').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {},
  optimizeFonts: true,
  poweredByHeader: true,
};

module.exports = nextConfig;
