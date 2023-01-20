/** @type {import('next').NextConfig} */
const path = require('path');

/** @type {import('next/types').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 30,
    unoptimized: false,
    domains: ['warek01-sdc-strapi-cms.herokuapp.com', 'localhost'],
  },
  optimizeFonts: true,
  basePath: '',
  compress: true,
  crossOrigin: 'anonymous',
  staticPageGenerationTimeout: 60,
  skipTrailingSlashRedirect: true,
  poweredByHeader: true,
  env: {},
  experimental: {},
  generateEtags: true,
};

module.exports = nextConfig;
