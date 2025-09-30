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

    // Buscar todas as inscrições do evento com dados do usuário usando raw query
    const registrationsData = await prisma.$queryRaw`
      SELECT 
        er.id,
        er.status,
        er."registeredAt",
        u.id as "userId",
        u.name as "userName",
        u.email as "userEmail",
        u."profileImage" as "userProfileImage"
      FROM event_registrations er
      JOIN users u ON er."userId" = u.id
      WHERE er."eventId" = ${params.id}
      ORDER BY er."registeredAt" ASC
    `

    const registrations = (registrationsData as any[]).map(reg => ({
      id: reg.id,
      status: reg.status,
      registeredAt: reg.registeredAt,
      user: {
        id: reg.userId,
        name: reg.userName,
        email: reg.userEmail,
        profileImage: reg.userProfileImage
      }
    }))

    return NextResponse.json(registrations)

  } catch (error) {
    console.error('Erro ao buscar inscritos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}