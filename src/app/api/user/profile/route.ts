import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateProfileSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome muito longo'),
  bio: z.string().max(500, 'Bio muito longa (máximo 500 caracteres)').optional().nullable(),
  location: z.string().max(100, 'Localização muito longa').optional().nullable(),
  phone: z.string().max(20, 'Telefone muito longo').optional().nullable(),
  website: z.string().url('URL inválida').optional().nullable().or(z.literal('')),
  linkedin: z.string().url('URL do LinkedIn inválida').optional().nullable().or(z.literal('')),
  instagram: z.string().url('URL do Instagram inválida').optional().nullable().or(z.literal('')),
  twitter: z.string().url('URL do Twitter inválida').optional().nullable().or(z.literal(''))
})

// Força a rota a ser dinâmica
export const dynamic = 'force-dynamic'

// GET - Buscar perfil do usuário (próprio ou público)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    // Se não especificar userId, buscar o próprio perfil
    if (!userId) {
      if (!session?.user?.id) {
        return NextResponse.json(
          { error: 'Acesso negado. Faça login.' },
          { status: 401 }
        )
      }

      const userData = await prisma.$queryRaw`
        SELECT 
          id, name, email, "profileImage", "bannerImage", bio, 
          location, phone, website, linkedin, instagram, twitter, 
          "createdAt", "updatedAt"
        FROM users 
        WHERE id = ${session.user.id}
      `
      
      const user = (userData as any[])[0] || null

      if (!user) {
        return NextResponse.json(
          { error: 'Usuário não encontrado' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        user,
        message: 'Perfil carregado com sucesso'
      })
    }

    // Buscar perfil público de outro usuário
    const isOwnProfile = session?.user?.id === userId
    const userData = await prisma.$queryRaw`
      SELECT 
        id, name, 
        ${isOwnProfile ? 'email' : 'NULL as email'}, 
        "profileImage", "bannerImage", bio, location, 
        ${isOwnProfile ? 'phone' : 'NULL as phone'}, 
        website, linkedin, instagram, twitter, "createdAt"
      FROM users 
      WHERE id = ${userId}
    `
    
    const user = (userData as any[])[0] || null

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      user,
      message: 'Perfil carregado com sucesso'
    })

  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT - Atualizar perfil do usuário
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validar dados
    const validatedData = updateProfileSchema.parse(body)

    // Converter strings vazias para null
    const processedData = {
      name: validatedData.name,
      bio: validatedData.bio || null,
      location: validatedData.location || null,
      phone: validatedData.phone || null,
      website: validatedData.website || null,
      linkedin: validatedData.linkedin || null,
      instagram: validatedData.instagram || null,
      twitter: validatedData.twitter || null
    }

    // Atualizar perfil do usuário
    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        ...processedData,
        updatedAt: new Date()
      }
    })

    // Buscar usuário atualizado com raw query
    const userData = await prisma.$queryRaw`
      SELECT 
        id, name, email, "profileImage", "bannerImage", bio, 
        location, phone, website, linkedin, instagram, twitter, "updatedAt"
      FROM users 
      WHERE id = ${session.user.id}
    `
    
    const updatedUser = (userData as any[])[0]

    return NextResponse.json({
      user: updatedUser,
      message: 'Perfil atualizado com sucesso'
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos', 
          details: error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
        },
        { status: 400 }
      )
    }

    console.error('Erro ao atualizar perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}