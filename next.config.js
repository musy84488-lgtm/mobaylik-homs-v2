/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
}
module.exports = nextConfig
