'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Edit, 
  Trash2, 
  User,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import RegistrationButton from '@/components/RegistrationButton'
import RegisteredUsers from '@/components/RegisteredUsers'
import Header from '@/components/Header'
import ProfileImage from '@/components/ProfileImage'

interface Event {
  id: string
  title: string
  description: string | null
  location: string
  startDate: string
  endDate: string | null
  maxAttendees: number | null
  isActive: boolean
  organizer: {
    id: string
    name: string
    email: string
    profileImage: string | null
  }
  _count: {
    registrations: number
  }
}

export default function EventDetailsPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [registrationCount, setRegistrationCount] = useState(0)

  // Check for success messages from URL params
  useEffect(() => {
    if (searchParams.get('updated') === 'true') {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 5000)
    }
  }, [searchParams])

  // Buscar detalhes do evento
  useEffect(() => {
    fetchEventDetails()
  }, [params.id])

  const fetchEventDetails = async () => {
    try {
      const response = await fetch(`/api/events/${params.id}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          setError('Evento não encontrado')
        } else {
          setError('Erro ao carregar evento')
        }
        return
      }

      const data = await response.json()
      setEvent(data.event)
      setRegistrationCount(data.event._count.registrations)
    } catch (error) {
      console.error('Erro ao buscar evento:', error)
      setError('Erro ao conectar com o servidor')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async () => {
    if (!event) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao excluir evento')
      }

      // Redirecionar para lista de eventos
      router.push('/events?deleted=true')
    } catch (error) {
      console.error('Erro ao excluir evento:', error)
      setError(error instanceof Error ? error.message : 'Erro ao excluir evento')
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
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

  const isOrganizer = session?.user?.id === event?.organizer.id
  const hasStarted = event ? new Date(event.startDate) < new Date() : false

  const handleRegistrationChange = () => {
    // Refetch event data to update registration count
    fetchEventDetails()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center">
        <div className="text-lg text-gray-600">Carregando evento...</div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-6">
              <Link href="/events" className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-red-600">Erro</h1>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-red-500 mb-4">
              <AlertTriangle className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {error || 'Evento não encontrado'}
            </h2>
            <p className="text-gray-600 mb-6">
              O evento que você está procurando pode ter sido removido ou não existe.
            </p>
            <Link href="/events" className="btn-primary">
              Voltar para Eventos
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-800">Evento atualizado com sucesso!</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Event Header */}
          <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{event.title}</h1>
              {/* Actions for organizer */}
              {isOrganizer && (
                <div className="flex gap-2">
                  <Link
                    href={`/events/${event.id}/edit`}
                    className="flex items-center px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Editar
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="flex items-center px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Excluir
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm opacity-90">Início</div>
                  <div className="font-semibold">{formatDate(event.startDate)}</div>
                </div>
              </div>

              {event.endDate && (
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3" />
                  <div>
                    <div className="text-sm opacity-90">Término</div>
                    <div className="font-semibold">{formatDate(event.endDate)}</div>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3" />
                <div>
                  <div className="text-sm opacity-90">Local</div>
                  <div className="font-semibold">{event.location}</div>
                </div>
              </div>

              {event.maxAttendees && (
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3" />
                  <div>
                    <div className="text-sm opacity-90">Participantes</div>
                    <div className="font-semibold">
                      {event._count.registrations}/{event.maxAttendees}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8">
            {/* Description */}
            {event.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição</h2>
                <div className="prose max-w-none text-gray-700">
                  {event.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Organizer Info */}
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Organizador</h2>
              <Link 
                href={`/profile/${event.organizer.id}`}
                className="flex items-center hover:bg-gray-50 p-3 rounded-lg transition-colors group"
              >
                <ProfileImage
                  src={event.organizer.profileImage}
                  alt={`Foto de ${event.organizer.name}`}
                  width={48}
                  height={48}
                  className="mr-4 group-hover:ring-2 group-hover:ring-blue-300 transition-all"
                  fallbackInitials={event.organizer.name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()}
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {event.organizer.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {event.organizer.email}
                  </div>
                  <div className="text-blue-500 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver perfil →
                  </div>
                </div>
              </Link>
            </div>

            {/* Registration Section */}
            <div className="border-t pt-8 mt-8">
              <RegistrationButton
                eventId={event.id}
                eventTitle={event.title}
                maxAttendees={event.maxAttendees}
                currentRegistrations={registrationCount}
                isOrganizer={isOrganizer}
                hasStarted={hasStarted}
                onRegistrationChange={handleRegistrationChange}
              />
            </div>
          </div>
        </div>

        {/* Registered Users List - Only for Organizer */}
        <div className="mt-8">
          <RegisteredUsers 
            eventId={event.id}
            isOrganizer={isOrganizer}
          />
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Excluir Evento</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir o evento "{event.title}"? 
              Esta ação não pode ser desfeita e todos os dados relacionados serão perdidos.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteEvent}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}