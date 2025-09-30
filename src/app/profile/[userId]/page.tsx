'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/Header'
import ProfileImage from '@/components/ProfileImage'

interface UserProfile {
  id: string
  name: string
  email: string
  profileImage?: string | null
  bannerImage?: string | null
  bio?: string | null
  location?: string | null
  phone?: string | null
  website?: string | null
  linkedin?: string | null
  instagram?: string | null
  twitter?: string | null
  createdAt: string
}

export default function ProfilePage() {
  const params = useParams()
  const { data: session } = useSession()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const userId = params?.userId as string
  const isOwnProfile = session?.user?.id === userId

  useEffect(() => {
    if (userId) {
      fetchProfile()
    }
  }, [userId])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/user/profile?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else if (response.status === 404) {
        setError('Usuário não encontrado')
      } else {
        setError('Erro ao carregar perfil')
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error)
      setError('Erro ao carregar perfil')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center pt-20">
          <div className="text-lg">Carregando perfil...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
            <Link
              href="/events"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Voltar aos Eventos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Header do Perfil */}
            <div className="relative p-6 text-white overflow-hidden">
              {/* Banner personalizado ou gradiente padrão */}
              {user.bannerImage ? (
                <>
                  <img
                    src={user.bannerImage}
                    alt="Banner do perfil"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              )}
              
              {/* Conteúdo sobre o banner */}
              <div className="relative z-10">
                {/* Botão de Edição para o próprio perfil */}
                {isOwnProfile && (
                  <div className="absolute top-0 right-0">
                    <Link
                      href="/profile/edit"
                      className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-opacity-30 transition-all duration-200 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </Link>
                  </div>
                )}
                
              <div className="flex items-center space-x-6">
                <ProfileImage
                  src={user.profileImage}
                  alt={`Foto de ${user.name}`}
                  width={120}
                  height={120}
                  className="border-4 border-white/20"
                  fallbackInitials={user.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()}
                />
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  {user.location && (
                    <p className="text-white/80 flex items-center mt-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {user.location}
                    </p>
                  )}
                  <p className="text-white/60 mt-2">
                    Membro desde {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>
              </div>
            </div>

            {/* Conteúdo do Perfil */}
            <div className="p-6">
              {/* Bio */}
              {user.bio && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Sobre</h2>
                  <p className="text-gray-700 whitespace-pre-wrap">{user.bio}</p>
                </div>
              )}

              {/* Informações de Contato */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contatos */}
                {(user.phone || user.website) && (
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-3">Contato</h3>
                    <div className="space-y-2">
                      {user.phone && (
                        <div className="flex items-center text-gray-600">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          {user.phone}
                        </div>
                      )}
                      {user.website && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.148.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.029 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                          </svg>
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Redes Sociais */}
                {(user.linkedin || user.instagram || user.twitter) && (
                  <div>
                    <h3 className="text-md font-semibold text-gray-900 mb-3">Redes Sociais</h3>
                    <div className="space-y-2">
                      {user.linkedin && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                          <a
                            href={user.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            LinkedIn
                          </a>
                        </div>
                      )}
                      {user.instagram && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297z"/>
                          </svg>
                          <a
                            href={user.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Instagram
                          </a>
                        </div>
                      )}
                      {user.twitter && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                          <a
                            href={user.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Twitter
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Placeholder para futuras funcionalidades */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-center">
                  Mais informações do perfil em breve...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}