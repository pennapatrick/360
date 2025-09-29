import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Buscar todas as inscrições do usuário
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    const registrations = await prisma.eventRegistration.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            startDate: true,
            endDate: true,
            organizer: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        registeredAt: 'desc'
      }
    })

    return NextResponse.json({
      registrations,
      total: registrations.length,
      message: 'Inscrições encontradas com sucesso'
    })
  } catch (error) {
    console.error('Erro ao buscar inscrições:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}