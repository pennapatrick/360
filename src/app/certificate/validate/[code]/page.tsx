'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'

interface CertificateData {
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

interface ValidationResult {
  valid: boolean
  certificate?: CertificateData
  message: string
  error?: string
}

export default function ValidateCertificatePage() {
  const params = useParams()
  const [result, setResult] = useState<ValidationResult | null>(null)
  const [loading, setLoading] = useState(true)

  const validationCode = params?.code as string

  useEffect(() => {
    if (validationCode) {
      validateCertificate()
    }
  }, [validationCode])

  const validateCertificate = async () => {
    try {
      const response = await fetch(`/api/certificate/validate/${validationCode}`)
      const data = await response.json()
      
      setResult(data)
    } catch (error) {
      console.error('Erro ao validar certificado:', error)
      setResult({
        valid: false,
        message: 'Erro ao conectar com o servidor',
        error: 'Erro de conexão'
      })
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

  const formatEventDate = (eventDate: { start: string; end?: string }) => {
    const start = formatDate(eventDate.start)
    
    if (!eventDate.end) {
      return start
    }

    const end = formatDate(eventDate.end)
    
    // Se for o mesmo dia
    if (eventDate.start.split('T')[0] === eventDate.end.split('T')[0]) {
      return start
    }

    return `${start} a ${end}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/certificates"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Certificados
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Validação de Certificado
            </h1>
            <p className="text-gray-600">
              Código: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{validationCode}</span>
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Validando certificado...</p>
            </div>
          )}

          {/* Results */}
          {!loading && result && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Status Header */}
              <div className={`px-6 py-4 ${
                result.valid 
                  ? 'bg-green-50 border-l-4 border-green-400' 
                  : 'bg-red-50 border-l-4 border-red-400'
              }`}>
                <div className="flex items-center">
                  {result.valid ? (
                    <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 mr-3" />
                  )}
                  <div>
                    <h2 className={`text-lg font-semibold ${
                      result.valid ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {result.valid ? 'Certificado Válido' : 'Certificado Inválido'}
                    </h2>
                    <p className={`text-sm ${
                      result.valid ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              {result.valid && result.certificate && (
                <div className="p-6 space-y-6">
                  {/* Participant Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Informações do Participante
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xl font-bold text-blue-600 mb-2">
                        {result.certificate.participantName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Certificado emitido em {formatDate(result.certificate.issueDate)}
                      </p>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Informações do Evento
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Título
                        </label>
                        <p className="text-gray-900 font-semibold">
                          {result.certificate.eventTitle}
                        </p>
                      </div>

                      {result.certificate.eventDescription && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição
                          </label>
                          <p className="text-gray-600">
                            {result.certificate.eventDescription}
                          </p>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data do Evento
                          </label>
                          <p className="text-gray-900">
                            {formatEventDate(result.certificate.eventDate)}
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Local
                          </label>
                          <p className="text-gray-900">
                            {result.certificate.eventLocation}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Organizador
                        </label>
                        <p className="text-gray-900">
                          {result.certificate.organizerName}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Certificate ID */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">
                      Identificação do Certificado
                    </h3>
                    <div className="space-y-1">
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">ID:</span> {result.certificate.id}
                      </p>
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Código de Validação:</span> {result.certificate.validationCode}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Details */}
              {!result.valid && (
                <div className="p-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">
                        Possíveis causas:
                      </h3>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Código de validação digitado incorretamente</li>
                        <li>• Certificado não existe ou foi revogado</li>
                        <li>• Link de validação expirado ou inválido</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Info Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Sobre a Validação
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                • Os certificados são validados em tempo real contra nossa base de dados
              </p>
              <p>
                • Certificados autênticos contêm informações detalhadas do evento e participante
              </p>
              <p>
                • Em caso de dúvidas, entre em contato com o organizador do evento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}