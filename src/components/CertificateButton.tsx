'use client'

import { useState } from 'react'
import { Download, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface CertificateButtonProps {
  eventId: string
  eventTitle: string
  canGenerate?: boolean
  hasEnded?: boolean
  isRegistered?: boolean
  registrationStatus?: string
}

export default function CertificateButton({
  eventId,
  eventTitle,
  canGenerate = false,
  hasEnded = false,
  isRegistered = false,
  registrationStatus
}: CertificateButtonProps) {
  const [loading, setLoading] = useState(false)
  const [certificate, setCertificate] = useState<any>(null)
  const [error, setError] = useState('')

  const checkCertificateStatus = async () => {
    try {
      const response = await fetch(`/api/events/${eventId}/certificate`)
      if (response.ok) {
        const data = await response.json()
        setCertificate(data.certificate)
        return data
      }
    } catch (error) {
      console.error('Erro ao verificar certificado:', error)
    }
    return null
  }

  const generateCertificate = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/api/events/${eventId}/certificate`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok) {
        setCertificate(data.certificate)
        // Fazer download automático do certificado
        downloadCertificate(data.certificate.pdfUrl, `Certificado-${eventTitle}`)
      } else {
        setError(data.error || 'Erro ao gerar certificado')
      }
    } catch (error) {
      console.error('Erro ao gerar certificado:', error)
      setError('Erro ao gerar certificado')
    } finally {
      setLoading(false)
    }
  }

  const downloadCertificate = (pdfUrl: string, filename: string) => {
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${filename}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadExisting = () => {
    if (certificate?.pdfUrl) {
      downloadCertificate(certificate.pdfUrl, `Certificado-${eventTitle}`)
    }
  }

  // Não mostrar botão se não estiver inscrito
  if (!isRegistered) {
    return null
  }

  // Se não confirmado
  if (registrationStatus !== 'CONFIRMED') {
    return (
      <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-md">
        <Clock className="w-4 h-4" />
        <span className="text-sm">Inscrição pendente - certificado indisponível</span>
      </div>
    )
  }

  // Se evento ainda não terminou
  if (!hasEnded) {
    return (
      <div className="flex items-center space-x-2 text-gray-600 bg-gray-50 px-3 py-2 rounded-md">
        <Clock className="w-4 h-4" />
        <span className="text-sm">Certificado disponível após o evento</span>
      </div>
    )
  }

  // Se já tem certificado
  if (certificate) {
    return (
      <div className="space-y-2">
        <button
          onClick={handleDownloadExisting}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full"
        >
          <CheckCircle className="w-4 h-4" />
          <Download className="w-4 h-4" />
          <span>Baixar Certificado</span>
        </button>
        <p className="text-xs text-gray-500 text-center">
          Emitido em {new Date(certificate.issueDate).toLocaleDateString('pt-BR')}
        </p>
      </div>
    )
  }

  // Pode gerar certificado
  if (canGenerate) {
    return (
      <div className="space-y-2">
        <button
          onClick={generateCertificate}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <FileText className="w-4 h-4" />
          )}
          <span>{loading ? 'Gerando...' : 'Gerar Certificado'}</span>
        </button>
        
        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 px-3 py-2 rounded-md">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </div>
    )
  }

  return null
}