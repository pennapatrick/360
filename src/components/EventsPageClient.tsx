'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Calendar, MapPin, User, Clock, Filter } from 'lucide-react'
import Header from '@/components/Header'

interface Event {
  id: string
  title: string
  description: string | null
  location: string
  startDate: string
  endDate: string | null
  maxAttendees: number | null
  organizer: {
    name: string
  }
  _count?: {
    registrations: number
  }
}

type FilterType = 'all' | 'upcoming' | 'expired' | 'full'

export default function EventsPageClient() {
  const { data: session } = useSession()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Erro ao buscar eventos:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const isEventExpired = (endDateString: string | null, startDateString: string) => {
    const now = new Date()
    const eventDate = endDateString ? new Date(endDateString) : new Date(startDateString)
    return eventDate < now
  }

  const isEventFull = (event: Event) => {
    if (!event.maxAttendees) return false
    const currentRegistrations = event._count?.registrations || 0
    return currentRegistrations >= event.maxAttendees
  }

  const getFilteredEvents = () => {
    switch (filter) {
      case 'upcoming':
        return events.filter(event => !isEventExpired(event.endDate, event.startDate) && !isEventFull(event))
      case 'expired':
        return events.filter(event => isEventExpired(event.endDate, event.startDate))
      case 'full':
        return events.filter(event => !isEventExpired(event.endDate, event.startDate) && isEventFull(event))
      default:
        return events
    }
  }

  const getEventCardStyles = (event: Event) => {
    const expired = isEventExpired(event.endDate, event.startDate)
    const full = isEventFull(event)
    
    if (expired) {
      return {
        cardStyle: 'card p-6 bg-gray-50 border-gray-200 opacity-75',
        titleStyle: 'text-xl font-semibold text-gray-500 mb-2',
        badgeStyle: 'px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full',
        badgeText: 'Expirado'
      }
    } else if (full) {
      return {
        cardStyle: 'card p-6 hover:shadow-lg transition-shadow bg-amber-50 border-amber-200',
        titleStyle: 'text-xl font-semibold text-secondary-900 mb-2',
        badgeStyle: 'px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full',
        badgeText: 'Lotado'
      }
    } else {
      return {
        cardStyle: 'card p-6 hover:shadow-lg transition-shadow bg-white border-green-200',
        titleStyle: 'text-xl font-semibold text-secondary-900 mb-2',
        badgeStyle: 'px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full',
        badgeText: 'Disponível'
      }
    }
  }

  const filteredEvents = getFilteredEvents()
  const upcomingCount = events.filter(event => !isEventExpired(event.endDate, event.startDate) && !isEventFull(event)).length
  const expiredCount = events.filter(event => isEventExpired(event.endDate, event.startDate)).length
  const fullCount = events.filter(event => !isEventExpired(event.endDate, event.startDate) && isEventFull(event)).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando eventos...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-4">
            Eventos Disponíveis
          </h1>
          <p className="text-lg text-secondary-600">
            Descubra eventos incríveis acontecendo ao seu redor
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filtrar Eventos</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos ({events.length})
            </button>
            
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'upcoming'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Disponíveis ({upcomingCount})
            </button>
            
            <button
              onClick={() => setFilter('full')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'full'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lotados ({fullCount})
            </button>
            
            <button
              onClick={() => setFilter('expired')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'expired'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Expirados ({expiredCount})
            </button>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'upcoming' && 'Nenhum evento disponível'}
              {filter === 'expired' && 'Nenhum evento expirado'}
              {filter === 'full' && 'Nenhum evento lotado'}
              {filter === 'all' && 'Nenhum evento encontrado'}
            </h3>
            <p className="text-gray-600">
              {filter === 'upcoming' && 'Não há eventos futuros no momento.'}
              {filter === 'expired' && 'Não há eventos expirados.'}
              {filter === 'full' && 'Não há eventos com capacidade esgotada.'}
              {filter === 'all' && 'Seja o primeiro a criar um evento!'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event: Event) => {
              const styles = getEventCardStyles(event)
              const expired = isEventExpired(event.endDate, event.startDate)
              const full = isEventFull(event)
              
              return (
                <div key={event.id} className={styles.cardStyle}>
                  {/* Event Status Badge */}
                  <div className="mb-3 flex justify-between items-start">
                    <span className={styles.badgeStyle}>
                      {styles.badgeText}
                    </span>
                    {expired && (
                      <Clock className="w-4 h-4 text-red-500" />
                    )}
                    {full && !expired && (
                      <User className="w-4 h-4 text-amber-600" />
                    )}
                  </div>

                  <div className="mb-4">
                    <h3 className={styles.titleStyle}>
                      {event.title}
                    </h3>
                    <p className={`text-sm line-clamp-2 ${expired ? 'text-gray-400' : 'text-secondary-600'}`}>
                      {event.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className={`flex items-center ${expired ? 'text-gray-400' : 'text-secondary-600'}`}>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    
                    <div className={`flex items-center ${expired ? 'text-gray-400' : 'text-secondary-600'}`}>
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <div className={`flex items-center ${expired ? 'text-gray-400' : 'text-secondary-600'}`}>
                      <User className="w-4 h-4 mr-2" />
                      <span>{event.organizer.name}</span>
                    </div>

                    {event.maxAttendees && (
                      <div className={`flex items-center ${
                        expired ? 'text-gray-400' : full ? 'text-amber-600 font-medium' : 'text-secondary-600'
                      }`}>
                        <User className="w-4 h-4 mr-2" />
                        <span>
                          {event._count?.registrations || 0}/{event.maxAttendees} inscritos
                        </span>
                      </div>
                    )}
                  </div>

                  <Link 
                    href={`/events/${event.id}`}
                    className={`block text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                      expired 
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                        : full
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {expired ? 'Evento Expirado' : full ? 'Ver Detalhes (Lotado)' : 'Ver Detalhes'}
                  </Link>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}