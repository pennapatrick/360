/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  },
  images: {
    domains: [
      'localhost',
      'via.placeholder.com', // Para imagens mock/placeholder
      'res.cloudinary.com',  // Para quando implementarmos Cloudinary
      'images.unsplash.com', // Para imagens de exemplo
      'avatars.githubusercontent.com' // Para avatars do GitHub se usarmos OAuth
    ],
    // Para imagens locais (uploads)
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
    // Suporte para imagens Base64 (produção)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
