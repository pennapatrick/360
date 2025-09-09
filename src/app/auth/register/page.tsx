'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PARTICIPANT'
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/auth/login?message=registered')
      } else {
        const data = await response.json()
        setError(data.error || 'Erro ao criar conta')
      }
    } catch (err) {
      setError('Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-2xl font-bold text-primary-600">
            360° <span className="ml-1 text-secondary-600">Eventos</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-secondary-900">
            Criar sua conta
          </h2>
          <p className="mt-2 text-secondary-600">
            Já tem uma conta?{' '}
            <Link href="/auth/login" className="text-primary-600 hover:text-primary-500">
              Fazer login
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-1">
                Nome completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="input"
                placeholder="Mínimo 6 caracteres"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-secondary-700 mb-1">
                Tipo de perfil
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input"
              >
                <option value="PARTICIPANT">Participante - Quero encontrar eventos</option>
                <option value="ORGANIZER">Organizador - Quero criar eventos</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-base font-medium disabled:opacity-50"
            >
              {isLoading ? 'Criando conta...' : 'Criar conta gratuita'}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-secondary-500">
          Ao criar uma conta, você concorda com nossos{' '}
          <Link href="/terms" className="text-primary-600 hover:text-primary-500">
            Termos de Uso
          </Link>{' '}
          e{' '}
          <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
            Política de Privacidade
          </Link>
        </p>
      </div>
    </div>
  )
}
