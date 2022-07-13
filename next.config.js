/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
