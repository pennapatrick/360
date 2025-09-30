import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Força a rota a ser dinâmica
export const dynamic = 'force-dynamic'

// GET - Validar certificado por código de validação
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const validationCode = params.code

    if (!validationCode) {
      return NextResponse.json(
        { error: 'Código de validação é obrigatório' },
        { status: 400 }
      )
    }

    // Buscar certificado usando query SQL raw
    const certificates = await prisma.$queryRaw`
      SELECT 
        c.id, c."certificateId", c."validationCode", c."issueDate",
        u.name as user_name,
        e.title as event_title, e.description as event_description,
        e."startDate" as event_start_date, e."endDate" as event_end_date,
        e.location as event_location,
        org.name as organizer_name
      FROM certificates c
      JOIN users u ON c."userId" = u.id
      JOIN events e ON c."eventId" = e.id
      JOIN users org ON e."organizerId" = org.id
      WHERE c."validationCode" = ${validationCode}
      OR c."validationCode" = ${validationCode.toUpperCase()}
      OR c."validationCode" = ${validationCode.toLowerCase()}
      LIMIT 1
    `

    if (!certificates || (Array.isArray(certificates) && certificates.length === 0)) {
      return NextResponse.json(
        { 
          valid: false,
          error: 'Certificado não encontrado'
        },
        { status: 404 }
      )
    }

    const certificate = Array.isArray(certificates) ? certificates[0] : certificates

    // Retornar informações do certificado para validação pública
    return NextResponse.json({
      valid: true,
      certificate: {
        id: certificate.certificateId,
        participantName: certificate.user_name,
        eventTitle: certificate.event_title,
        eventDescription: certificate.event_description,
        eventDate: {
          start: certificate.event_start_date,
          end: certificate.event_end_date
        },
        eventLocation: certificate.event_location,
        organizerName: certificate.organizer_name,
        issueDate: certificate.issueDate,
        validationCode: certificate.validationCode
      },
      message: 'Certificado válido e autêntico'
    })

  } catch (error) {
    console.error('Erro ao validar certificado:', error)
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        valid: false 
      },
      { status: 500 }
    )
  }
}