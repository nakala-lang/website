/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {
    config.experiments = {asyncWebAssembly: true };
    return config;
  },
  assetPrefix: isProd ? '/website/' : ''
}

module.exports = nextConfig
