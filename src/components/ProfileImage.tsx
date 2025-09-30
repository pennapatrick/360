'use client'

import Image from 'next/image'

interface ProfileImageProps {
  src?: string | null
  alt: string
  width: number
  height: number
  className?: string
  fallbackInitials?: string
}

export default function ProfileImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  fallbackInitials = 'U' 
}: ProfileImageProps) {
  // Se não há imagem, mostrar placeholder
  if (!src) {
    return (
      <div 
        className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-white font-bold" style={{ fontSize: Math.min(width, height) * 0.4 }}>
          {fallbackInitials}
        </span>
      </div>
    )
  }

  // Se é Base64, usar img normal - SEMPRE REDONDO
  if (src.startsWith('data:image/')) {
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`object-cover rounded-full ${className}`}
        style={{ width, height }}
      />
    )
  }

  // Se é URL normal, usar Next.js Image - SEMPRE REDONDO
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover rounded-full ${className}`}
    />
  )
}