import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Buscar o evento para verificar se o usuário é o organizador
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      select: { organizerId: true }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 }
      )
    }

    // Verificar se o usuário é o organizador do evento
    if (event.organizerId !== session.user.id) {
      return NextResponse.json(
        { error: 'Apenas o organizador pode ver a lista de inscritos' },
        { status: 403 }
      )
    }

    // Buscar todas as inscrições do evento com dados do usuário
    const registrations = await prisma.eventRegistration.findMany({
      where: {
        eventId: params.id
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        registeredAt: 'asc'
      }
    })

    return NextResponse.json(registrations)

  } catch (error) {
    console.error('Erro ao buscar inscritos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}