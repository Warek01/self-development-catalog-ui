const path = require('path')

/** @type {import('next/types').NextConfig} */
module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  images: {
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 7 * 24 * 3600,
    unoptimized: false,
    domains: ['localhost', 'admin.warek.site'],
  },
  optimizeFonts: true,
  basePath: '',
  compress: true,
  crossOrigin: 'anonymous',
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  generateEtags: true,
  poweredByHeader: true,
  swcMinify: true,
  outputFileTracing: true,
}
