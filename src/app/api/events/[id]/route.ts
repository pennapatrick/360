import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Força a rota a ser dinâmica
export const dynamic = 'force-dynamic'

const updateEventSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().nullable().optional(),
  location: z.string().min(1, 'Local é obrigatório'),
  startDate: z.string().datetime('Data de início inválida'),
  endDate: z.string().datetime('Data de fim inválida').nullable().optional(),
  maxAttendees: z.number().int().positive('Número de participantes deve ser positivo').nullable().optional()
})

// GET - Buscar detalhes de um evento específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.$queryRaw`
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
      WHERE e.id = ${params.id} AND e."isActive" = true
    `

    if (!event || (event as any).length === 0) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 }
      )
    }

    const eventData = (event as any)[0]
    const formattedEvent = {
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
    }

    return NextResponse.json({
      event: formattedEvent,
      message: 'Evento encontrado com sucesso'
    })
  } catch (error) {
    console.error('Erro ao buscar evento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar evento (apenas organizador)
export async function PUT(
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

    // Verificar se o evento existe e se o usuário é o organizador
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: params.id,
        isActive: true
      },
      select: {
        id: true,
        organizerId: true
      }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 }
      )
    }

    if (existingEvent.organizerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para editar este evento' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Validar dados
    const validatedData = updateEventSchema.parse(body)

    // Verificar se a data de início não é no passado
    const startDate = new Date(validatedData.startDate)
    const now = new Date()
    
    if (startDate < now) {
      return NextResponse.json(
        { error: 'A data de início não pode ser no passado' },
        { status: 400 }
      )
    }

    // Verificar se a data de fim é após a data de início
    if (validatedData.endDate) {
      const endDate = new Date(validatedData.endDate)
      if (endDate <= startDate) {
        return NextResponse.json(
          { error: 'A data de fim deve ser posterior à data de início' },
          { status: 400 }
        )
      }
    }

    // Atualizar evento
    await prisma.event.update({
      where: {
        id: params.id
      },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        location: validatedData.location,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        maxAttendees: validatedData.maxAttendees,
        updatedAt: new Date()
      }
    })

    // Buscar evento atualizado com dados do organizador
    const updatedEventData = await prisma.$queryRaw`
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
      WHERE e.id = ${params.id}
    `

    const eventData = (updatedEventData as any)[0]
    const updatedEvent = {
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
    }

    return NextResponse.json({
      event: updatedEvent,
      message: 'Evento atualizado com sucesso'
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos', 
          details: error.errors.map(err => err.message).join(', ')
        },
        { status: 400 }
      )
    }

    console.error('Erro ao atualizar evento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Excluir evento (soft delete - apenas organizador)
export async function DELETE(
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

    // Verificar se o evento existe e se o usuário é o organizador
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: params.id,
        isActive: true
      },
      select: {
        id: true,
        organizerId: true,
        title: true,
        _count: {
          select: {
            registrations: true
          }
        }
      }
    })

    if (!existingEvent) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 }
      )
    }

    if (existingEvent.organizerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Você não tem permissão para excluir este evento' },
        { status: 403 }
      )
    }

    // Soft delete - marcar evento como inativo e cancelar todas as inscrições
    await prisma.$transaction(async (tx) => {
      // Primeiro, cancelar todas as inscrições do evento (alterar status para CANCELLED)
      if (existingEvent._count.registrations > 0) {
        await tx.eventRegistration.updateMany({
          where: {
            eventId: params.id,
            status: {
              in: ['PENDING', 'CONFIRMED']
            }
          },
          data: {
            status: 'CANCELLED'
          }
        })
      }

      // Depois, marcar o evento como inativo
      await tx.event.update({
        where: {
          id: params.id
        },
        data: {
          isActive: false,
          updatedAt: new Date()
        }
      })
    })

    return NextResponse.json({
      message: `Evento "${existingEvent.title}" excluído com sucesso`
    })
  } catch (error) {
    console.error('Erro ao excluir evento:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}