'use client'

import { useState, useEffect } from 'react'
import { Users, Mail, User, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import ProfileImage from './ProfileImage'

interface Registration {
  id: string
  status: string
  registeredAt: string
  user: {
    id: string
    name: string | null
    email: string
    profileImage: string | null
  }
}

interface RegisteredUsersProps {
  eventId: string
  isOrganizer: boolean
}

export default function RegisteredUsers({ eventId, isOrganizer }: RegisteredUsersProps) {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(isOrganizer) // Inicia carregando se for organizador
  const [error, setError] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (isOrganizer) {
      fetchRegistrations()
    }
  }, [eventId, isOrganizer])

  const fetchRegistrations = async () => {
    if (!isOrganizer) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/events/${eventId}/registrations`)
      
      if (!response.ok) {
        throw new Error('Erro ao carregar inscritos')
      }

      const data = await response.json()
      setRegistrations(data)
    } catch (err) {
      setError('Erro ao carregar lista de inscritos')
      console.error('Erro:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'  
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmado'
      case 'PENDING':
        return 'Pendente'
      case 'CANCELLED':
        return 'Cancelado'
      default:
        return status
    }
  }

  const handleToggleExpanded = () => {
    const newExpanded = !isExpanded
    setIsExpanded(newExpanded)
    
    // Atualizar dados quando expandir (para garantir dados frescos)
    if (newExpanded && isOrganizer) {
      fetchRegistrations()
    }
  }

  if (!isOrganizer) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <button
        onClick={handleToggleExpanded}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center">
          <Users className="w-5 h-5 text-blue-600 mr-3" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Lista de Inscritos
            </h3>
            <p className="text-sm text-gray-600">
              {loading && !isExpanded ? (
                <span className="inline-flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600 mr-2"></div>
                  Carregando...
                </span>
              ) : (
                `${registrations.length} pessoa${registrations.length !== 1 ? 's' : ''} inscrita${registrations.length !== 1 ? 's' : ''}`
              )}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {isExpanded && (
        <div className="border-t border-gray-200">
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Carregando inscritos...
              </div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">
              {error}
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p>Nenhuma pessoa inscrita ainda</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                {registrations.map((registration) => (
                  <div
                    key={registration.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {/* Avatar clicável */}
                      <Link 
                        href={`/profile/${registration.user.id}`}
                        className="shrink-0 hover:ring-2 hover:ring-blue-300 rounded-full transition-all"
                      >
                        <ProfileImage
                          src={registration.user.profileImage}
                          alt={`Foto de ${registration.user.name || 'Usuário'}`}
                          width={48}
                          height={48}
                          fallbackInitials={
                            registration.user.name 
                              ? registration.user.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
                              : 'U'
                          }
                        />
                      </Link>
                      
                      {/* Informações do usuário */}
                      <div className="flex-1">
                        <Link 
                          href={`/profile/${registration.user.id}`}
                          className="block hover:text-blue-600 transition-colors"
                        >
                          <h4 className="font-medium text-gray-900">
                            {registration.user.name || 'Nome não informado'}
                          </h4>
                        </Link>
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-1" />
                          {registration.user.email}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          Inscrito em {formatDate(registration.registeredAt)}
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(registration.status)}`}>
                        {getStatusText(registration.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resumo */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total de inscritos:</span>
                  <span className="font-medium">{registrations.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>Confirmados:</span>
                  <span className="font-medium text-green-600">
                    {registrations.filter(r => r.status === 'CONFIRMED').length}
                  </span>
                </div>
                {registrations.filter(r => r.status === 'PENDING').length > 0 && (
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Pendentes:</span>
                    <span className="font-medium text-yellow-600">
                      {registrations.filter(r => r.status === 'PENDING').length}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}