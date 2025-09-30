/**
 * Utilitários para validação e processamento de imagens
 */

export interface ImageValidationResult {
  isValid: boolean
  error?: string
}

export interface ImageUploadConfig {
  maxSizeMB: number
  allowedTypes: string[]
  maxDimensions?: {
    width: number
    height: number
  }
}

/**
 * Configuração padrão para upload de imagens de perfil
 */
export const PROFILE_IMAGE_CONFIG: ImageUploadConfig = {
  maxSizeMB: 5,
  allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
  maxDimensions: {
    width: 1024,
    height: 1024
  }
}

/**
 * Valida um arquivo de imagem
 */
export function validateImage(file: File, config: ImageUploadConfig = PROFILE_IMAGE_CONFIG): ImageValidationResult {
  // Verificar se o arquivo existe
  if (!file) {
    return {
      isValid: false,
      error: 'Nenhum arquivo foi fornecido'
    }
  }

  // Verificar tipo de arquivo
  if (!config.allowedTypes.includes(file.type)) {
    const allowedExtensions = config.allowedTypes
      .map(type => type.split('/')[1].toUpperCase())
      .join(', ')
    
    return {
      isValid: false,
      error: `Tipo de arquivo não suportado. Use: ${allowedExtensions}`
    }
  }

  // Verificar tamanho do arquivo
  const maxSizeBytes = config.maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${config.maxSizeMB}MB`
    }
  }

  return {
    isValid: true
  }
}

/**
 * Converte um arquivo para buffer
 */
export async function fileToBuffer(file: File): Promise<Buffer> {
  const bytes = await file.arrayBuffer()
  return Buffer.from(bytes)
}

/**
 * Gera uma URL mockada para desenvolvimento
 * TODO: Remover quando Cloudinary for implementado
 */
export function generateMockImageUrl(name?: string, size: number = 300): string {
  // Usar as iniciais do nome se disponível
  const initials = name 
    ? name.split(' ').map(n => n.charAt(0)).join('').substring(0, 2).toUpperCase()
    : 'U'
  
  // Cores baseadas no hash do nome para consistência
  const colors = [
    '4F46E5/FFFFFF', // Azul
    '059669/FFFFFF', // Verde
    'DC2626/FFFFFF', // Vermelho
    'D97706/FFFFFF', // Laranja
    '7C3AED/FFFFFF', // Roxo
    'DB2777/FFFFFF', // Rosa
  ]
  
  const colorIndex = name ? name.length % colors.length : 0
  const color = colors[colorIndex]
  
  return `https://via.placeholder.com/${size}x${size}/${color}?text=${encodeURIComponent(initials)}`
}

/**
 * Extrai a extensão do arquivo
 */
export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || ''
}

/**
 * Gera um nome único para o arquivo
 */
export function generateUniqueFilename(originalName: string, userId: string): string {
  const extension = getFileExtension(originalName)
  const timestamp = Date.now()
  return `profile_${userId}_${timestamp}.${extension}`
}