/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    config.experiments = {asyncWebAssembly: true, layers: true};
    return config;
  },
  experimental: {
    images: {
      unoptimized: true
    }
  },
  assetPrefix: isProd ? '/website/' : '',
}

module.exports = nextConfig
