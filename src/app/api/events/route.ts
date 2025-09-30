import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import { z } from 'zod'

const eventSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  location: z.string().min(3, 'Local deve ter pelo menos 3 caracteres'),
  startDate: z.string().datetime('Data de início inválida'),
  endDate: z.string().datetime('Data de fim inválida').optional(),
  maxAttendees: z.number().positive('Número máximo de participantes deve ser positivo').optional(),
})

export async function GET() {
  try {
    const eventsData = await prisma.$queryRaw`
      SELECT 
        e.id,
        e.title,
        e.description,
        e.location,
        e."startDate",
        e."endDate",
        e."maxAttendees",
        e."isActive",
        u.id as "organizerId",
        u.name as "organizerName",
        u.email as "organizerEmail",
        u."profileImage" as "organizerProfileImage",
        (SELECT COUNT(*) FROM event_registrations er WHERE er."eventId" = e.id)::int as "registrationCount"
      FROM events e
      JOIN users u ON e."organizerId" = u.id
      WHERE e."isActive" = true
      ORDER BY e."startDate" ASC
    `

    const events = (eventsData as any[]).map(eventData => ({
      id: eventData.id,
      title: eventData.title,
      description: eventData.description,
      location: eventData.location,
      startDate: eventData.startDate,
      endDate: eventData.endDate,
      maxAttendees: eventData.maxAttendees,
      isActive: eventData.isActive,
      organizer: {
        id: eventData.organizerId,
        name: eventData.organizerName,
        email: eventData.organizerEmail,
        profileImage: eventData.organizerProfileImage
      },
      _count: {
        registrations: eventData.registrationCount
      }
    }))

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Erro ao buscar eventos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, location, startDate, endDate, maxAttendees } = eventSchema.parse(body)

    // Verificar se o usuário é organizador
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!user || user.role !== 'ORGANIZER') {
      return NextResponse.json(
        { error: 'Apenas organizadores podem criar eventos' },
        { status: 403 }
      )
    }

    // Criar evento
    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        maxAttendees,
        organizerId: session.user.id,
      },
      include: {
        organizer: {
          select: { id: true, name: true, email: true }
        }
      }
    })

    return NextResponse.json(
      { 
        message: 'Evento criado com sucesso',
        event
      },
      { status: 201 }
    )

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Erro ao criar evento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
