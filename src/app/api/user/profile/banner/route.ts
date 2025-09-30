import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Força a rota a ser dinâmica
export const dynamic = 'force-dynamic'

// POST - Upload de banner de perfil (SEMPRE salva Base64 no banco Neon)
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
    const file = formData.get('banner') as File
    
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

    // Validar tamanho do arquivo (10MB máximo para banner)
    const maxSize = 10 * 1024 * 1024 // 10MB em bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Arquivo muito grande. Tamanho máximo: 10MB.' },
        { status: 400 }
      )
    }

    // Converter arquivo para buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // SEMPRE usar banco Neon - Salvar como Base64
    const base64Image = `data:${file.type};base64,${buffer.toString('base64')}`
    const bannerUrl = base64Image

    // Atualizar banner de perfil do usuário no banco usando SQL direto
    await prisma.$executeRaw`
      UPDATE users 
      SET "bannerImage" = ${bannerUrl}, "updatedAt" = NOW() 
      WHERE id = ${session.user.id}
    `
    
    // Buscar usuário atualizado
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    }) as any

    return NextResponse.json({
      user: updatedUser,
      bannerUrl: bannerUrl,
      message: 'Banner de perfil atualizado com sucesso'
    })

  } catch (error) {
    console.error('Erro no upload do banner de perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Remover banner de perfil
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Acesso negado. Faça login.' },
        { status: 401 }
      )
    }

    // Remover banner de perfil do usuário usando SQL direto
    await prisma.$executeRaw`
      UPDATE users 
      SET "bannerImage" = NULL, "updatedAt" = NOW() 
      WHERE id = ${session.user.id}
    `
    
    // Buscar usuário atualizado
    const updatedUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    }) as any

    return NextResponse.json({
      user: updatedUser,
      message: 'Banner de perfil removido com sucesso'
    })

  } catch (error) {
    console.error('Erro ao remover banner de perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}