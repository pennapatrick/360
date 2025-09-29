'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Users, UserPlus, UserMinus, Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

interface RegistrationButtonProps {
  eventId: string
  eventTitle: string
  maxAttendees?: number | null
  currentRegistrations: number
  isOrganizer: boolean
  hasStarted: boolean
  onRegistrationChange?: () => void
}

export default function RegistrationButton({
  eventId,
  eventTitle,
  maxAttendees,
  currentRegistrations,
  isOrganizer,
  hasStarted,
  onRegistrationChange
}: RegistrationButtonProps) {
  const { data: session, status } = useSession()
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Verificar status da inscrição ao carregar
  useEffect(() => {
    if (session?.user?.id && !isOrganizer) {
      checkRegistrationStatus()
    }
  }, [session, eventId, isOrganizer])

  const checkRegistrationStatus = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/register`)
      if (response.ok) {
        const data = await response.json()
        setIsRegistered(data.isRegistered)
        setRegistrationStatus(data.status)
      }
    } catch (error) {
      console.error('Erro ao verificar inscrição:', error)
    }
  }

  const handleRegister = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao se inscrever')
      }

      setIsRegistered(true)
      setRegistrationStatus('CONFIRMED')
      setSuccess('Inscrição realizada com sucesso!')
      onRegistrationChange?.()

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Erro ao se inscrever:', error)
      setError(error instanceof Error ? error.message : 'Erro ao se inscrever')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnregister = async () => {
    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch(`/api/events/${eventId}/register`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cancelar inscrição')
      }

      setIsRegistered(false)
      setRegistrationStatus('CANCELLED')
      setSuccess('Inscrição cancelada com sucesso!')
      onRegistrationChange?.()

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(''), 3000)
    } catch (error) {
      console.error('Erro ao cancelar inscrição:', error)
      setError(error instanceof Error ? error.message : 'Erro ao cancelar inscrição')
    } finally {
      setIsLoading(false)
    }
  }

  // Verificar se o evento está lotado
  const isFull = maxAttendees ? currentRegistrations >= maxAttendees : false

  // Se não está logado
  if (status === 'unauthenticated') {
    return (
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Users className="w-4 h-4 mr-2" />
          <span>
            {currentRegistrations} inscrito{currentRegistrations !== 1 ? 's' : ''}
            {maxAttendees && ` de ${maxAttendees} vagas`}
          </span>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 mb-3">
            Faça login para se inscrever neste evento
          </p>
          <Link 
            href="/auth/login" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Fazer Login
          </Link>
        </div>
      </div>
    )
  }

  // Se é o organizador
  if (isOrganizer) {
    return (
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Users className="w-4 h-4 mr-2" />
          <span>
            {currentRegistrations} inscrito{currentRegistrations !== 1 ? 's' : ''}
            {maxAttendees && ` de ${maxAttendees} vagas`}
          </span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            Você é o organizador deste evento
          </p>
        </div>
      </div>
    )
  }

  // Se o evento já começou
  if (hasStarted) {
    return (
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Users className="w-4 h-4 mr-2" />
          <span>
            {currentRegistrations} inscrito{currentRegistrations !== 1 ? 's' : ''}
            {maxAttendees && ` de ${maxAttendees} vagas`}
          </span>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-600">
            Este evento já começou
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {/* Contador de inscrições */}
      <div className="flex items-center text-sm text-gray-600">
        <Users className="w-4 h-4 mr-2" />
        <span>
          {currentRegistrations} inscrito{currentRegistrations !== 1 ? 's' : ''}
          {maxAttendees && ` de ${maxAttendees} vagas`}
        </span>
        {isFull && !isRegistered && (
          <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
            Lotado
          </span>
        )}
      </div>

      {/* Mensagens de feedback */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center">
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
          <p className="text-green-700 text-sm">{success}</p>
        </div>
      )}

      {/* Botão de ação */}
      {isRegistered ? (
        <button
          onClick={handleUnregister}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <UserMinus className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Cancelando...' : 'Cancelar Inscrição'}
        </button>
      ) : (
        <button
          onClick={handleRegister}
          disabled={isLoading || isFull}
          className={`w-full flex items-center justify-center px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            isFull 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <UserPlus className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Inscrevendo...' : isFull ? 'Evento Lotado' : 'Inscrever-se'}
        </button>
      )}

      {/* Status da inscrição */}
      {isRegistered && (
        <div className="text-center text-sm text-green-600 font-medium">
          ✓ Você está inscrito neste evento
        </div>
      )}
    </div>
  )
}