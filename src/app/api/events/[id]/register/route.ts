import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// POST - Inscrever-se em um evento
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login para se inscrever.' },
        { status: 401 }
      )
    }

    const eventId = params.id
    const userId = session.user.id

    // Verificar se o evento existe e está ativo
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
        isActive: true
      },
      include: {
        _count: {
          select: {
            registrations: {
              where: {
                status: 'CONFIRMED'
              }
            }
          }
        }
      }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Evento não encontrado ou inativo' },
        { status: 404 }
      )
    }

    // Verificar se o evento já passou
    if (new Date(event.startDate) < new Date()) {
      return NextResponse.json(
        { error: 'Não é possível se inscrever em eventos que já começaram' },
        { status: 400 }
      )
    }

    // Verificar se o usuário é o organizador do evento
    if (event.organizerId === userId) {
      return NextResponse.json(
        { error: 'Organizadores não podem se inscrever nos próprios eventos' },
        { status: 400 }
      )
    }

    // Verificar se já está inscrito
    const existingRegistration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId
        }
      }
    })

    if (existingRegistration) {
      if (existingRegistration.status === 'CONFIRMED') {
        return NextResponse.json(
          { error: 'Você já está inscrito neste evento' },
          { status: 400 }
        )
      } else if (existingRegistration.status === 'CANCELLED') {
        // Se estava cancelado, reativar
        const updatedRegistration = await prisma.eventRegistration.update({
          where: {
            id: existingRegistration.id
          },
          data: {
            status: 'CONFIRMED',
            registeredAt: new Date()
          }
        })

        return NextResponse.json({
          registration: updatedRegistration,
          message: 'Inscrição reativada com sucesso'
        })
      }
    }

    // Verificar limite de vagas
    if (event.maxAttendees && event._count.registrations >= event.maxAttendees) {
      return NextResponse.json(
        { error: 'Este evento já atingiu o limite de participantes' },
        { status: 400 }
      )
    }

    // Criar nova inscrição
    const registration = await prisma.eventRegistration.create({
      data: {
        userId,
        eventId,
        status: 'CONFIRMED'
      },
      include: {
        event: {
          select: {
            title: true,
            startDate: true,
            location: true
          }
        }
      }
    })

    return NextResponse.json({
      registration,
      message: 'Inscrição realizada com sucesso'
    })
  } catch (error) {
    console.error('Erro ao processar inscrição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Cancelar inscrição
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

    const eventId = params.id
    const userId = session.user.id

    // Verificar se existe inscrição ativa
    const registration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId
        },
        status: 'CONFIRMED'
      },
      include: {
        event: {
          select: {
            title: true,
            startDate: true
          }
        }
      }
    })

    if (!registration) {
      return NextResponse.json(
        { error: 'Você não está inscrito neste evento' },
        { status: 404 }
      )
    }

    // Verificar se o evento já começou
    if (new Date(registration.event.startDate) < new Date()) {
      return NextResponse.json(
        { error: 'Não é possível cancelar inscrição em eventos que já começaram' },
        { status: 400 }
      )
    }

    // Cancelar inscrição (soft delete)
    await prisma.eventRegistration.update({
      where: {
        id: registration.id
      },
      data: {
        status: 'CANCELLED'
      }
    })

    return NextResponse.json({
      message: `Inscrição cancelada para o evento "${registration.event.title}"`
    })
  } catch (error) {
    console.error('Erro ao cancelar inscrição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// GET - Verificar status da inscrição
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({
        isRegistered: false,
        status: null
      })
    }

    const eventId = params.id
    const userId = session.user.id

    const registration = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: {
          userId,
          eventId
        }
      },
      select: {
        status: true,
        registeredAt: true
      }
    })

    return NextResponse.json({
      isRegistered: registration?.status === 'CONFIRMED',
      status: registration?.status || null,
      registeredAt: registration?.registeredAt || null
    })
  } catch (error) {
    console.error('Erro ao verificar inscrição:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}