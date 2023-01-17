/** @type {import('next').NextConfig} */
const path = require('path');

/** @type {import('next/types').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  optimizeFonts: true,
  poweredByHeader: true,
  images: {
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 60,
    domains: ['localhost', '192.168.100.49'],
    unoptimized: false,
  },
  trailingSlash: true,
  skipTrailingSlashRedirect: false,
  staticPageGenerationTimeout: 120,
  crossOrigin: 'anonymous',
  compress: true,
  basePath: '',
};

module.exports = nextConfig;
