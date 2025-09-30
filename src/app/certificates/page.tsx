'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Award, Search, FileCheck, Download } from 'lucide-react'

export default function CertificatesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/login')
    }
  }, [session, status, router])

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
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Award className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Certificados
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gerencie seus certificados de participação ou valide certificados de outros participantes
          </p>
        </div>

        {/* Options Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Meus Certificados Card */}
          <Link 
            href="/certificates/my-certificates"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 hover:border-blue-300"
          >
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300 p-4 rounded-full">
                  <FileCheck className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Meus Certificados
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visualize e baixe todos os seus certificados de participação em eventos
              </p>
              
              <div className="flex items-center justify-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                <Download className="h-4 w-4 mr-2" />
                Ver Certificados
              </div>
            </div>
          </Link>

          {/* Validar Certificado Card */}
          <Link 
            href="/certificates/validate"
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 hover:border-green-300"
          >
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 group-hover:bg-green-200 transition-colors duration-300 p-4 rounded-full">
                  <Search className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Validar Certificado
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Verifique a autenticidade de um certificado usando seu código de validação
              </p>
              
              <div className="flex items-center justify-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                <Search className="h-4 w-4 mr-2" />
                Validar Agora
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Como funciona?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Meus Certificados</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Acesse todos os seus certificados em um só lugar</li>
                <li>• Baixe PDFs profissionais</li>
                <li>• Compartilhe com empregadores</li>
                <li>• Histórico completo de participações</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Validação de Certificados</h4>
              <ul className="text-gray-600 space-y-1 text-sm">
                <li>• Verifique a autenticidade de qualquer certificado</li>
                <li>• Use o código de validação único</li>
                <li>• Confirmação instantânea</li>
                <li>• Seguro e confiável</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}