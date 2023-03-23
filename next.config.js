/** @type {import('next/types').NextConfig} */
module.exports = {
  images: {
    disableStaticImages: false,
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 24 * 3600,
    unoptimized: false,
    domains: ['localhost', 'admin.warek.site'],
  },
  optimizeFonts: true,
  compress: true,
  crossOrigin: 'anonymous',
  productionBrowserSourceMaps: true,
  reactStrictMode: true,
  generateEtags: true,
  poweredByHeader: false,
  swcMinify: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    return config
  },
}
