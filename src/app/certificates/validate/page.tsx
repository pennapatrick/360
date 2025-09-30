'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search, ArrowLeft, CheckCircle, XCircle, Award, Calendar, MapPin, User } from 'lucide-react'
import Link from 'next/link'

interface CertificateValidation {
  valid: boolean
  certificate?: {
    id: string
    participantName: string
    eventTitle: string
    eventDescription?: string
    eventDate: {
      start: string
      end?: string
    }
    eventLocation: string
    organizerName: string
    issueDate: string
    validationCode: string
  }
}

export default function ValidateCertificatePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [validationCode, setValidationCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<CertificateValidation | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/login')
    }
  }, [session, status, router])

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validationCode.trim()) {
      setError('Por favor, insira um código de validação')
      return
    }

    try {
      setLoading(true)
      setError('')
      setResult(null)

      const response = await fetch(`/api/certificate/validate/${validationCode.trim()}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao validar certificado')
      }

      setResult(data)
    } catch (error) {
      console.error('Erro ao validar certificado:', error)
      setError(error instanceof Error ? error.message : 'Erro ao validar certificado')
            setResult({ valid: false })
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/certificates" 
            className="mr-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Validar Certificado
            </h1>
            <p className="text-gray-600 mt-2">
              Verifique a autenticidade de um certificado usando seu código de validação
            </p>
          </div>
        </div>

        {/* Validation Form */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <form onSubmit={handleValidate} className="space-y-6">
            <div>
              <label htmlFor="validationCode" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Validação
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="validationCode"
                  value={validationCode}
                  onChange={(e) => setValidationCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-center text-lg tracking-wider"
                  placeholder="Ex: ABC123XYZ0"
                  maxLength={20}
                  disabled={loading}
                />
                <Search className="absolute right-3 top-3 h-6 w-6 text-gray-400" />
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Insira o código de validação encontrado no certificado
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !validationCode.trim()}
              className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Validando...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Validar Certificado
                </>
              )}
            </button>
          </form>
        </div>

        {/* Validation Result */}
        {result && (
          <div className="bg-white rounded-xl shadow-md p-8">
            {result.valid && result.certificate ? (
              <div>
                {/* Success Header */}
                <div className="flex items-center mb-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold text-green-800">
                      Certificado Válido ✓
                    </h3>
                    <p className="text-green-600">
                      Este certificado é autêntico e foi emitido pela plataforma 360° Eventos
                    </p>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="border border-green-200 rounded-lg p-6 bg-green-50">
                  <div className="flex items-start mb-4">
                    <Award className="h-6 w-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {result.certificate.eventTitle}
                      </h4>
                      
                      {result.certificate.eventDescription && (
                        <p className="text-gray-700 mb-4">
                          {result.certificate.eventDescription}
                        </p>
                      )}
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center text-gray-700">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">Participante:</span>
                            <span className="ml-2">{result.certificate.participantName}</span>
                          </div>
                          
                          <div className="flex items-center text-gray-700">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">Data do Evento:</span>
                            <span className="ml-2">
                              {formatDate(result.certificate.eventDate.start)}
                              {result.certificate.eventDate.end && 
                               result.certificate.eventDate.end !== result.certificate.eventDate.start && (
                                <span> - {formatDate(result.certificate.eventDate.end)}</span>
                              )}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-gray-700">
                            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="font-medium">Local:</span>
                            <span className="ml-2">{result.certificate.eventLocation}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-gray-700">
                            <span className="font-medium">Organizador:</span>
                            <span className="ml-2">{result.certificate.organizerName}</span>
                          </div>
                          
                          <div className="text-gray-700">
                            <span className="font-medium">Data de Emissão:</span>
                            <span className="ml-2">{formatDate(result.certificate.issueDate)}</span>
                          </div>
                          
                          <div className="text-gray-700">
                            <span className="font-medium">ID do Certificado:</span>
                            <span className="ml-2 font-mono text-xs">{result.certificate.id}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Error Header */}
                <div className="flex items-center mb-6">
                  <XCircle className="h-8 w-8 text-red-500 mr-3" />
                  <div>
                    <h3 className="text-xl font-semibold text-red-800">
                      Certificado Inválido ✗
                    </h3>
                    <p className="text-red-600">
                      O código informado não corresponde a nenhum certificado válido
                    </p>
                  </div>
                </div>

                <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                  <p className="text-red-700 mb-4">
                    Possíveis motivos:
                  </p>
                  <ul className="text-red-600 space-y-1 text-sm list-disc list-inside">
                    <li>Código de validação incorreto ou inexistente</li>
                    <li>Certificado pode ter sido revogado</li>
                    <li>Código digitado com erro (verifique maiúsculas e minúsculas)</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">
            Como funciona a validação?
          </h3>
          <p className="text-blue-800 text-sm">
            Cada certificado possui um código único de validação que permite verificar sua autenticidade. 
            Este código é gerado automaticamente e não pode ser falsificado. A validação é feita em tempo real 
            contra nossa base de dados segura.
          </p>
        </div>
      </div>
    </div>
  )
}