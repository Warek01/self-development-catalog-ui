const path = require('path')

/** @type {import('next/types').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 3600,
    unoptimized: false,
    domains: ['localhost'],
  },
  optimizeFonts: true,
  basePath: '',
  compress: true,
  crossOrigin: 'anonymous',
}

module.exports = nextConfig
