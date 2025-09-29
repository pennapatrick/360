import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'
import Header from '@/components/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Descubra eventos
            <span className="text-blue-600"> ao seu redor</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Faça um 360° e veja todos os eventos que estão acontecendo na sua região. 
            Conecte-se, participe e crie experiências únicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register" className="btn-primary text-lg px-8 py-3">
              Começar agora
            </Link>
            <Link href="/events" className="btn-secondary text-lg px-8 py-3">
              Ver eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Crie Eventos</h3>
              <p className="text-gray-600">
                Organize seus próprios eventos e alcance mais pessoas
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Encontre Próximo</h3>
              <p className="text-gray-600">
                Descubra eventos interessantes na sua região
              </p>
            </div>
            
            <div className="card p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Conecte-se</h3>
              <p className="text-gray-600">
                Participe e conheça pessoas com interesses similares
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h3>
          <p className="text-blue-100 mb-8 text-lg">
            Junte-se à comunidade 360° e descubra eventos incríveis
          </p>
          <Link href="/auth/register" className="btn bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
            Criar conta gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 360° Eventos. Conectando pessoas através de experiências.</p>
        </div>
      </footer>
    </div>
  )
}
