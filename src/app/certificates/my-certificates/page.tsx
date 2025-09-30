'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Award, Download, Calendar, MapPin, Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Certificate {
  id: string
  certificateId: string
  validationCode: string
  pdfUrl: string
  createdAt: string
  event: {
    id: string
    title: string
    startDate: string
    endDate?: string
    location: string
    description?: string
  }
}

export default function MyCertificatesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/login')
      return
    }

    fetchCertificates()
  }, [session, status, router])

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/certificates')
      
      if (!response.ok) {
        throw new Error('Erro ao carregar certificados')
      }

      const data = await response.json()
      setCertificates(data.certificates || [])
    } catch (error) {
      console.error('Erro ao carregar certificados:', error)
      setError('Erro ao carregar certificados. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCertificate = (pdfUrl: string, eventTitle: string) => {
    if (pdfUrl) {
      // Se o PDF está em base64, criar um link de download
      const link = document.createElement('a')
      link.href = pdfUrl
      link.download = `Certificado - ${eventTitle}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando seus certificados...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Meus Certificados
            </h1>
            <p className="text-gray-600 mt-2">
              {certificates.length > 0 
                ? `${certificates.length} certificado${certificates.length > 1 ? 's' : ''} encontrado${certificates.length > 1 ? 's' : ''}`
                : 'Nenhum certificado encontrado'
              }
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum certificado ainda
            </h3>
            <p className="text-gray-600 mb-6">
              Participe de eventos para receber seus certificados de participação
            </p>
            <Link 
              href="/events" 
              className="btn-primary inline-flex items-center"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Ver Eventos Disponíveis
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {certificates.map((certificate) => (
              <div 
                key={certificate.id} 
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-start mb-3">
                      <Award className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {certificate.event.title}
                        </h3>
                        
                        {certificate.event.description && (
                          <p className="text-gray-600 mb-3 line-clamp-2">
                            {certificate.event.description}
                          </p>
                        )}
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(certificate.event.startDate)}
                            {certificate.event.endDate && certificate.event.endDate !== certificate.event.startDate && (
                              <span> - {formatDate(certificate.event.endDate)}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {certificate.event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mt-4">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">ID do Certificado:</span>
                          <span className="ml-2 text-gray-600 font-mono">{certificate.certificateId}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Código de Validação:</span>
                          <span className="ml-2 text-gray-600 font-mono">{certificate.validationCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                    <Link
                      href={`/certificate/validate/${certificate.validationCode}`}
                      className="btn-secondary flex items-center justify-center"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Link>
                    
                    <button
                      onClick={() => handleDownloadCertificate(certificate.pdfUrl, certificate.event.title)}
                      className="btn-primary flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Baixar PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}