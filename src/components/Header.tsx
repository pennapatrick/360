'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { LogOut, Plus } from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()

  const handleLogout = () => {
    signOut({ callbackUrl: '/auth/login' })
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">360°</h1>
              <span className="ml-2 text-gray-600">Eventos</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Olá, {session.user?.name}</span>
                <Link href="/events" className="text-gray-600 hover:text-gray-900">
                  Eventos
                </Link>
                <Link href="/user/registrations" className="btn-secondary">
                  Minhas Inscrições
                </Link>
                {session.user?.role === 'ORGANIZER' && (
                  <Link href="/events/create" className="btn-primary flex items-center">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Evento
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="btn-secondary flex items-center"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair
                </button>
              </div>
            ) : (
              <>
                <Link href="/events" className="text-gray-600 hover:text-gray-900">
                  Eventos
                </Link>
                <Link href="/auth/login" className="btn-secondary">
                  Entrar
                </Link>
                <Link href="/auth/register" className="btn-primary">
                  Cadastrar
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}