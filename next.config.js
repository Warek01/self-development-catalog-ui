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
    minimumCacheTTL: 60,
    unoptimized: false,
    domains: ['warek01-sdc-strapi-cms.herokuapp.com', 'localhost'],
  },
};

module.exports = nextConfig;
