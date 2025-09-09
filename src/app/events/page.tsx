import Link from 'next/link'
import { Calendar, MapPin, User, Clock } from 'lucide-react'

// Esta seria uma função para buscar eventos (por enquanto mock)
async function getEvents() {
  // TODO: Implementar busca real da API
  return [
    {
      id: '1',
      title: 'Workshop de JavaScript Avançado',
      description: 'Aprenda conceitos avançados de JavaScript com foco em performance e boas práticas.',
      location: 'Centro de Convenções - Sala 301',
      startDate: '2025-01-15T19:00:00Z',
      organizer: {
        name: 'Tech Community',
        email: 'contato@techcommunity.com'
      },
      _count: {
        registrations: 42
      },
      maxAttendees: 50
    },
    {
      id: '2',
      title: 'Meetup de Design UX/UI',
      description: 'Encontro mensal para designers discutirem tendências e trocarem experiências.',
      location: 'Coworking Innovation Hub',
      startDate: '2025-01-20T14:00:00Z',
      organizer: {
        name: 'Design Collective',
        email: 'hello@designcollective.com'
      },
      _count: {
        registrations: 28
      },
      maxAttendees: 40
    }
  ]
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">360°</h1>
              <span className="ml-2 text-secondary-600">Eventos</span>
            </Link>
            <nav className="flex space-x-4">
              <Link href="/auth/login" className="btn-secondary">
                Entrar
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Cadastrar
              </Link>
            </nav>
          </div>
        </div>
      </header>

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

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-secondary-600 text-sm line-clamp-2">
                  {event.description}
                </p>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center text-secondary-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(event.startDate)}</span>
                </div>
                
                <div className="flex items-center text-secondary-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center text-secondary-600">
                  <User className="w-4 h-4 mr-2" />
                  <span>Por {event.organizer.name}</span>
                </div>

                <div className="flex items-center text-secondary-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>
                    {event._count.registrations} inscritos
                    {event.maxAttendees && ` / ${event.maxAttendees} vagas`}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Link 
                  href={`/events/${event.id}`}
                  className="btn-secondary flex-1 text-center"
                >
                  Ver detalhes
                </Link>
                <button className="btn-primary px-4">
                  Inscrever-se
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">
              Nenhum evento encontrado
            </h3>
            <p className="text-secondary-600 mb-6">
              Seja o primeiro a criar um evento na plataforma!
            </p>
            <Link href="/auth/register" className="btn-primary">
              Criar conta e organizar evento
            </Link>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-primary-600 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Organize seu próprio evento
          </h3>
          <p className="text-primary-100 mb-6">
            Crie eventos incríveis e conecte pessoas com interesses similares
          </p>
          <Link href="/auth/register" className="btn bg-white text-primary-600 hover:bg-primary-50">
            Começar agora
          </Link>
        </div>
      </main>
    </div>
  )
}
