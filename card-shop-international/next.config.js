/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    unoptimized: true,
  },
  output: 'export',
  basePath: '/cardshop-hp-miyabi',
}

export default nextConfig