import jsPDF from 'jspdf'

export interface CertificateData {
  participantName: string
  eventTitle: string
  eventDescription?: string
  eventDate: string
  eventLocation: string
  organizerName: string
  certificateId: string
  validationCode: string
}

export function generateCertificatePDF(data: CertificateData): string {
  // Criar novo documento PDF em formato paisagem (A4)
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  })

  // Configurar cores
  const primaryColor = '#2563eb' // blue-600
  const secondaryColor = '#64748b' // slate-500
  const goldColor = '#f59e0b' // amber-500

  // Adicionar bordas decorativas com mais espaço
  pdf.setDrawColor(primaryColor)
  pdf.setLineWidth(2)
  pdf.rect(8, 8, 281, 194) // Borda externa mais larga
  
  pdf.setLineWidth(1)
  pdf.rect(12, 12, 273, 186) // Borda interna mais larga

  // Título principal
  pdf.setFontSize(26)
  pdf.setTextColor(primaryColor)
  pdf.setFont('helvetica', 'bold')
  pdf.text('CERTIFICADO DE PARTICIPAÇÃO', 148.5, 35, { align: 'center' })

  // Linha decorativa
  pdf.setDrawColor(goldColor)
  pdf.setLineWidth(1)
  pdf.line(70, 42, 227, 42)

  // Texto de apresentação
  pdf.setFontSize(12)
  pdf.setTextColor(secondaryColor)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Certificamos que', 148.5, 55, { align: 'center' })

  // Nome do participante
  pdf.setFontSize(18)
  pdf.setTextColor(primaryColor)
  pdf.setFont('helvetica', 'bold')
  pdf.text(data.participantName.toUpperCase(), 148.5, 68, { align: 'center' })

  // Texto do evento
  pdf.setFontSize(12)
  pdf.setTextColor(secondaryColor)
  pdf.setFont('helvetica', 'normal')
  pdf.text('participou do evento', 148.5, 80, { align: 'center' })

  // Nome do evento
  pdf.setFontSize(14)
  pdf.setTextColor(primaryColor)
  pdf.setFont('helvetica', 'bold')
  
  // Quebrar título longo em múltiplas linhas
  const eventTitleLines = pdf.splitTextToSize(data.eventTitle, 200)
  let yPosition = 92
  eventTitleLines.forEach((line: string) => {
    pdf.text(line, 148.5, yPosition, { align: 'center' })
    yPosition += 6
  })

  // Informações do evento
  yPosition += 6
  pdf.setFontSize(10)
  pdf.setTextColor(secondaryColor)
  pdf.setFont('helvetica', 'normal')
  
  if (data.eventDescription) {
    const descLines = pdf.splitTextToSize(data.eventDescription, 220)
    descLines.forEach((line: string) => {
      pdf.text(line, 148.5, yPosition, { align: 'center' })
      yPosition += 4
    })
    yPosition += 2
  }

  pdf.text(`Realizado em ${data.eventDate}`, 148.5, yPosition, { align: 'center' })
  pdf.text(`Local: ${data.eventLocation}`, 148.5, yPosition + 5, { align: 'center' })

  // Rodapé posicionado mais alto sem seção de assinatura
  const footerY = 145 // Posição bem mais alta agora

  // Logo/Marca da plataforma (canto esquerdo)
  pdf.setFontSize(9)
  pdf.setTextColor(primaryColor)
  pdf.setFont('helvetica', 'bold')
  pdf.text('360° Eventos', 20, footerY, { align: 'left' })
  
  pdf.setFontSize(7)
  pdf.setTextColor(secondaryColor)
  pdf.setFont('helvetica', 'normal')
  pdf.text('Plataforma de Gestão de Eventos', 20, footerY + 4, { align: 'left' })

  // Data de emissão (centro)
  const issueDate = new Date().toLocaleDateString('pt-BR')
  pdf.setFontSize(7)
  pdf.text(`Emitido em: ${issueDate}`, 148.5, footerY, { align: 'center' })

  // Código de validação (canto direito)
  pdf.setFontSize(7)
  pdf.setTextColor(secondaryColor)
  pdf.text(`Código: ${data.validationCode}`, 277, footerY, { align: 'right' })
  pdf.text(`ID: ${data.certificateId}`, 277, footerY + 4, { align: 'right' })

  // Retornar PDF como string base64
  return pdf.output('datauristring')
}

export function generateValidationQRCodeData(validationCode: string): string {
  // URL para validação do certificado
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return `${baseUrl}/certificate/validate/${validationCode}`
}

export function formatEventDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate)
  const startFormatted = start.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  if (!endDate) {
    return startFormatted
  }

  const end = new Date(endDate)
  
  // Se for o mesmo dia
  if (start.toDateString() === end.toDateString()) {
    return startFormatted
  }

  const endFormatted = end.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })

  return `${startFormatted} a ${endFormatted}`
}