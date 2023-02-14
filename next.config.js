const path = require('path')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  generateEtags: true,
  poweredByHeader: true,
  swcMinify: true,
  outputFileTracing: true,
}

module.exports = withBundleAnalyzer(nextConfig)
