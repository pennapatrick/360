import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Força a rota a ser dinâmica
export const dynamic = 'force-dynamic'

// GET - Buscar certificados do usuário
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    const certificates = await prisma.certificate.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            startDate: true,
            endDate: true,
            location: true,
            organizer: {
              select: {
                name: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      certificates,
      message: 'Certificados carregados com sucesso'
    })

  } catch (error) {
    console.error('Erro ao buscar certificados:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}