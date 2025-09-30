'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import ProfileImage from '@/components/ProfileImage'

interface User {
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
}

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
}

export default function EditProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    phone: '',
    website: '',
    linkedin: '',
    instagram: '',
    twitter: ''
  })

  // Verificar autenticação
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  // Carregar dados do perfil
  useEffect(() => {
    if (session?.user?.id) {
      console.log('🔄 Carregando perfil do usuário...')
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Dados do usuário carregados:', data.user)
        console.log('🖼️ Banner do usuário:', data.user.bannerImage)
        setUser(data.user)
        setFormData({
          name: data.user.name || '',
          bio: data.user.bio || '',
          location: data.user.location || '',
          phone: data.user.phone || '',
          website: data.user.website || '',
          linkedin: data.user.linkedin || '',
          instagram: data.user.instagram || '',
          twitter: data.user.twitter || ''
        })
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    setMessage('')

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/user/profile/image', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setUser(prev => prev ? { ...prev, profileImage: data.imageUrl } : null)
        setMessage('Foto atualizada com sucesso!')
      } else {
        setError(data.error || 'Erro ao fazer upload da imagem')
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      setError('Erro ao fazer upload da imagem')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    setUploading(true)
    try {
      const response = await fetch('/api/user/profile/image', {
        method: 'DELETE'
      })

      if (response.ok) {
        setUser(prev => prev ? { ...prev, profileImage: null } : null)
        setMessage('Foto removida com sucesso!')
      } else {
        setError('Erro ao remover imagem')
      }
    } catch (error) {
      console.error('Erro ao remover imagem:', error)
      setError('Erro ao remover imagem')
    } finally {
      setUploading(false)
    }
  }

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingBanner(true)
    setError('')
    setMessage('')

    const formData = new FormData()
    formData.append('banner', file)

    try {
      const response = await fetch('/api/user/profile/banner', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setUser(prev => prev ? { ...prev, bannerImage: data.bannerUrl } : null)
        setMessage('Banner atualizado com sucesso!')
      } else {
        setError(data.error || 'Erro ao fazer upload do banner')
      }
    } catch (error) {
      console.error('Erro no upload do banner:', error)
      setError('Erro ao fazer upload do banner')
    } finally {
      setUploadingBanner(false)
    }
  }

  const handleRemoveBanner = async () => {
    setUploadingBanner(true)
    try {
      const response = await fetch('/api/user/profile/banner', {
        method: 'DELETE'
      })

      if (response.ok) {
        setUser(prev => prev ? { ...prev, bannerImage: null } : null)
        setMessage('Banner removido com sucesso!')
      } else {
        setError('Erro ao remover banner')
      }
    } catch (error) {
      console.error('Erro ao remover banner:', error)
      setError('Erro ao remover banner')
    } finally {
      setUploadingBanner(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        setMessage('Perfil atualizado com sucesso!')
        // Redirecionar para a página de visualização do perfil após 1 segundo
        setTimeout(() => {
          router.push(`/profile/${session?.user?.id}`)
        }, 1000)
      } else {
        setError(data.error || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error)
      setError('Erro ao atualizar perfil')
    } finally {
      setSaving(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex justify-center items-center pt-20">
          <div className="text-lg">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6">

            {/* Banner de Perfil */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Banner do Perfil</h2>
              <div className="relative w-full h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg overflow-hidden">
                {user?.bannerImage ? (
                  <>
                    <img
                      src={user.bannerImage}
                      alt="Banner do perfil"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-white text-lg">Banner padrão</p>
                  </div>
                )}
                
                {/* Preview text overlay */}
                <div className="absolute bottom-4 left-6 text-white">
                  <h3 className="text-xl font-bold">{user?.name || 'Seu Nome'}</h3>
                  <p className="text-sm opacity-90">Preview do banner</p>
                </div>
              </div>
              
              <div className="mt-4 space-x-4 text-center">
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50">
                  {uploadingBanner ? 'Enviando...' : 'Alterar Banner'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerUpload}
                    disabled={uploadingBanner}
                  />
                </label>
                
                {user?.bannerImage && (
                  <button
                    type="button"
                    onClick={handleRemoveBanner}
                    disabled={uploadingBanner}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    {uploadingBanner ? 'Removendo...' : 'Remover Banner'}
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Recomendado: 1200x400px. Máximo: 10MB (JPG, PNG, WebP)
              </p>
            </div>

            {/* Foto de Perfil */}
            <div className="mb-8 text-center">
              <div className="relative inline-block">
                <ProfileImage
                  src={user?.profileImage}
                  alt="Foto de perfil"
                  width={120}
                  height={120}
                  className="border-4 border-gray-200"
                  fallbackInitials={user?.name?.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase() || 'U'}
                />
              </div>
              
              <div className="mt-4 space-x-4">
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 disabled:opacity-50">
                  {uploading ? 'Enviando...' : 'Alterar Foto'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                
                {user?.profileImage && (
                  <button
                    onClick={handleRemoveImage}
                    disabled={uploading}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    Remover
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            {message && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {message}
              </div>
            )}

            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={500}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Conte um pouco sobre você..."
                />
                <div className="text-sm text-gray-500 mt-1">
                  {formData.bio.length}/500 caracteres
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Localização
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Cidade, Estado"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://seusite.com"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Redes Sociais</h3>
                
                <div>
                  <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/seuperfil"
                  />
                </div>

                <div>
                  <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://instagram.com/seuperfil"
                  />
                </div>

                <div>
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://twitter.com/seuperfil"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
                
                <button
                  type="button"
                  onClick={() => router.push('/events')}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}