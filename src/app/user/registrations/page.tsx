'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Calendar, 
  MapPin, 
  Clock, 
  User, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  ArrowLeft 
} from 'lucide-react'
import Header from '@/components/Header'

interface Registration {
  id: string
  status: string
  registeredAt: string
  event: {
    id: string
    title: string
    description: string | null
    location: string
    startDate: string
    endDate: string | null
    organizer: {
      name: string
    }
  }
}

export default function MyRegistrationsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (status === 'authenticated') {
      fetchRegistrations()
    }
  }, [status])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch('/api/user/registrations')
      
      if (!response.ok) {
        throw new Error('Erro ao carregar inscrições')
      }

      const data = await response.json()
      setRegistrations(data.registrations)
    } catch (error) {
      console.error('Erro ao buscar inscrições:', error)
      setError('Erro ao carregar suas inscrições')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'CANCELLED':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'PENDING':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'Confirmada'
      case 'CANCELLED':
        return 'Cancelada'
      case 'PENDING':
        return 'Pendente'
      default:
        return 'Desconhecido'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Carregando suas inscrições...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {registrations.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhuma inscrição encontrada
            </h3>
            <p className="text-gray-500 mb-6">
              Você ainda não se inscreveu em nenhum evento.
            </p>
            <Link href="/events" className="btn-primary">
              Explorar Eventos
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {registrations.length} inscrição{registrations.length !== 1 ? 'ões' : ''}
              </h2>
            </div>

            {registrations.map((registration) => (
              <div key={registration.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {registration.event.title}
                    </h3>
                    {registration.event.description && (
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {registration.event.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center ml-4">
                    {getStatusIcon(registration.status)}
                    <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(registration.status)}`}>
                      {getStatusText(registration.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(registration.event.startDate)}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{registration.event.location}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>Por: {registration.event.organizer.name}</span>
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Inscrito em: {formatDate(registration.registeredAt)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/events/${registration.event.id}`}
                    className="btn-primary"
                  >
                    Ver Detalhes
                  </Link>
                  
                  {registration.status === 'CONFIRMED' && 
                   new Date(registration.event.startDate) > new Date() && (
                    <Link
                      href={`/events/${registration.event.id}`}
                      className="btn-secondary"
                    >
                      Gerenciar Inscrição
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}