import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateCertificatePDF, formatEventDate, type CertificateData } from '@/lib/utils/certificate'
import { nanoid } from 'nanoid'

// Força a rota a ser dinâmica
export const dynamic = 'force-dynamic'

// POST - Gerar certificado de participação
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    const eventId = params.id

    // Verificar se o evento existe
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organizer: {
          select: {
            name: true
          }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se o evento já terminou
    const now = new Date()
    const eventEndDate = event.endDate || event.startDate
    
    if (eventEndDate > now) {
      return NextResponse.json(
        { error: 'Certificados só podem ser gerados após o término do evento' },
        { status: 400 }
      )
    }

    // Verificar se o usuário participou do evento
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId
        }
      }
    })

    if (!registration || registration.status !== 'CONFIRMED') {
      return NextResponse.json(
        { error: 'Você precisa estar inscrito e confirmado no evento para gerar o certificado' },
        { status: 403 }
      )
    }

    // Verificar se já existe um certificado para este usuário e evento
    let certificate = await prisma.certificate.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId
        }
      }
    })

    // Se já existe, retornar o certificado existente
    if (certificate) {
      return NextResponse.json({
        certificate: {
          id: certificate.id,
          certificateId: certificate.certificateId,
          validationCode: certificate.validationCode,
          pdfUrl: certificate.pdfUrl,
          issueDate: certificate.issueDate
        },
        message: 'Certificado já existente retornado'
      })
    }

    // Gerar códigos únicos
    const certificateId = `CERT-${nanoid(10).toUpperCase()}`
    const validationCode = nanoid(16).toUpperCase()

    // Buscar dados do usuário
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    // Preparar dados para o certificado
    const certificateData: CertificateData = {
      participantName: user.name,
      eventTitle: event.title,
      eventDescription: event.description || undefined,
      eventDate: formatEventDate(event.startDate.toISOString(), event.endDate?.toISOString()),
      eventLocation: event.location,
      organizerName: event.organizer.name,
      certificateId,
      validationCode
    }

    // Gerar PDF do certificado
    const pdfDataUri = generateCertificatePDF(certificateData)
    
    // Para este exemplo, vamos armazenar o PDF como Base64 no banco
    // Em produção, você pode querer usar um serviço de armazenamento como AWS S3
    const pdfBase64 = pdfDataUri.split(',')[1] // Remove o prefixo "data:application/pdf;base64,"
    const pdfUrl = `data:application/pdf;base64,${pdfBase64}`

    // Salvar certificado no banco de dados
    certificate = await prisma.certificate.create({
      data: {
        certificateId,
        validationCode,
        pdfUrl,
        userId: session.user.id,
        eventId: eventId
      }
    })

    return NextResponse.json({
      certificate: {
        id: certificate.id,
        certificateId: certificate.certificateId,
        validationCode: certificate.validationCode,
        pdfUrl: certificate.pdfUrl,
        issueDate: certificate.issueDate
      },
      message: 'Certificado gerado com sucesso!'
    })

  } catch (error) {
    console.error('Erro ao gerar certificado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// GET - Verificar status do certificado
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    const eventId = params.id

    // Verificar se existe certificado para este usuário e evento
    const certificate = await prisma.certificate.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId
        }
      },
      select: {
        id: true,
        certificateId: true,
        validationCode: true,
        issueDate: true,
        pdfUrl: true
      }
    })

    // Verificar informações do evento para determinar se pode gerar certificado
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      select: {
        title: true,
        startDate: true,
        endDate: true
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se usuário está inscrito
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId: session.user.id,
          eventId: eventId
        }
      },
      select: {
        status: true
      }
    })

    const now = new Date()
    const eventEndDate = event.endDate || event.startDate
    const canGenerateCertificate = 
      registration?.status === 'CONFIRMED' && 
      eventEndDate <= now

    return NextResponse.json({
      certificate,
      canGenerateCertificate,
      event: {
        title: event.title,
        hasEnded: eventEndDate <= now
      },
      isRegistered: !!registration,
      registrationStatus: registration?.status
    })

  } catch (error) {
    console.error('Erro ao verificar certificado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}