/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  rewrites: {
    source: '/api/:path*',
    destination: 'https://finding-pets.vercel.app/:path*',
  },
}

module.exports = nextConfig
