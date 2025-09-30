import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { validateImage, fileToBuffer, generateMockImageUrl, PROFILE_IMAGE_CONFIG } from '@/lib/utils/image'

// Força a rota a ser dinâmica
export const dynamic = 'force-dynamic'

// POST - Upload de foto de perfil (SEMPRE salva Base64 no banco Neon)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('image') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'Nenhuma imagem foi enviada' },
        { status: 400 }
      )
    }

    // Validar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Tipo de arquivo não suportado. Use JPG, PNG ou WebP.' },
        { status: 400 }
      )
    }

    // Validar tamanho do arquivo (5MB máximo)
    const maxSize = 5 * 1024 * 1024 // 5MB em bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Tamanho máximo: 5MB.' },
        { status: 400 }
      )
    }

    // Converter arquivo para buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // SEMPRE usar banco Neon - Salvar como Base64
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`
    const imageUrl = base64Image

    // Atualizar foto de perfil do usuário no banco usando SQL direto para contornar problemas de tipo
    await prisma.$executeRaw`
      UPDATE users 
      SET "profileImage" = ${imageUrl}, "updatedAt" = NOW() 
      WHERE id = ${session.user.id}
    `
    
    // Buscar usuário atualizado
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    }) as any

    return NextResponse.json({
      user: updatedUser,
      imageUrl: imageUrl,
      message: 'Foto de perfil atualizada com sucesso'
    })

  } catch (error) {
    console.error('Erro no upload da foto de perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Remover foto de perfil
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    // Remover foto de perfil do usuário usando SQL direto
    await prisma.$executeRaw`
      UPDATE users 
      SET "profileImage" = NULL, "updatedAt" = NOW() 
      WHERE id = ${session.user.id}
    `
    
    // Buscar usuário atualizado
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    }) as any

    return NextResponse.json({
      user: updatedUser,
      message: 'Foto de perfil removida com sucesso'
    })

  } catch (error) {
    console.error('Erro ao remover foto de perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}