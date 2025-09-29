# Cards de Desenvolvimento - Sprint 3

## 🎯 Metodologia: Scrum com Kanban Board

### Status dos Cards:
- 📋 **Backlog** - A fazer
- 🏗️ **Em Desenvolvimento** - Em progresso  
- ✅ **Concluído** - Finalizado
- 🧪 **Em Teste** - Sendo testado

---

## 👤 Epic 1: Sistema de Perfil de Usuário

### Card #016 - Modelo de Dados para Perfil Expandido
**Status:** 📋 Backlog  
**Pontos:** 5  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Expandir o modelo User para incluir informações de perfil completas

**Tarefas:**
- [ ] Adicionar campos ao model User (bio, location, phone, website)
- [ ] Criar campo para foto de perfil (profileImage)
- [ ] Adicionar campos de contato (linkedin, instagram, twitter)
- [ ] Configurar validações para novos campos
- [ ] Executar migrations no banco de dados

**Critérios de Aceitação:**
- Model User expandido com todos os campos necessários
- Validações implementadas (tamanho bio, formato URL, etc.)
- Migrations executadas sem erros
- Campos opcionais configurados corretamente

**Dependências:** Nenhuma

---

### Card #017 - API de Upload de Foto de Perfil
**Status:** 📋 Backlog  
**Pontos:** 8  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Implementar sistema de upload e gerenciamento de fotos de perfil

**Tarefas:**
- [ ] Criar endpoint POST /api/user/profile/image
- [ ] Implementar validação de tipo e tamanho de arquivo
- [ ] Configurar armazenamento de imagens (Cloudinary ou similar)
- [ ] Criar sistema de redimensionamento automático
- [ ] Implementar exclusão de imagem anterior

**Critérios de Aceitação:**
- Upload de imagens funcionando (JPG, PNG, WebP)
- Limite de tamanho: 5MB máximo
- Redimensionamento automático para 300x300px
- URLs de imagem retornadas corretamente
- Validações de segurança implementadas

**Dependências:** Card #016

---

### Card #018 - API de Atualização de Perfil
**Status:** 📋 Backlog  
**Pontos:** 5  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Criar endpoint para atualização das informações de perfil

**Tarefas:**
- [ ] Criar PUT /api/user/profile
- [ ] Implementar validações de dados
- [ ] Verificar autenticação e autorização
- [ ] Sanitizar dados de entrada
- [ ] Retornar perfil atualizado

**Critérios de Aceitação:**
- Endpoint funcional com validações completas
- Apenas o próprio usuário pode editar seu perfil
- Validação de formato para URLs e contatos
- Resposta adequada com dados atualizados

**Dependências:** Card #016

---

### Card #019 - Interface de Edição de Perfil
**Status:** 📋 Backlog  
**Pontos:** 13  
**Tipo:** Frontend  
**Prioridade:** Alta

**Descrição:**
Criar página e componentes para edição de perfil do usuário

**Tarefas:**
- [ ] Criar página /profile/edit
- [ ] Implementar formulário de edição de perfil
- [ ] Adicionar upload de foto com preview
- [ ] Criar validações do lado cliente
- [ ] Implementar feedback visual (loading, sucesso, erro)

**Critérios de Aceitação:**
- Formulário completo com todos os campos
- Upload de foto com preview em tempo real
- Validações client-side funcionando
- Design responsivo e intuitivo
- Integração com APIs de perfil

**Dependências:** Card #017, Card #018

---

### Card #020 - Componente de Visualização de Perfil
**Status:** 📋 Backlog  
**Pontos:** 8  
**Tipo:** Frontend  
**Prioridade:** Média

**Descrição:**
Criar componente para exibir perfil público do usuário

**Tarefas:**
- [ ] Criar página /profile/[userId]
- [ ] Implementar layout de perfil público
- [ ] Mostrar foto, bio, localização e contatos
- [ ] Adicionar botão de edição (apenas para o próprio perfil)
- [ ] Implementar design responsivo

**Critérios de Aceitação:**
- Perfil público acessível via URL
- Informações bem organizadas e legíveis
- Links de contato funcionais
- Botão de edição apenas para o próprio usuário
- Design consistente com o resto da aplicação

**Dependências:** Card #019

---

## 📜 Epic 2: Sistema de Comprovantes de Participação

### Card #021 - Modelo de Dados para Certificados
**Status:** 📋 Backlog  
**Pontos:** 3  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Criar modelo para gerenciar certificados de participação

**Tarefas:**
- [ ] Criar model Certificate no Prisma
- [ ] Definir relacionamentos com User e Event
- [ ] Adicionar campos: issueDate, certificateId, pdfUrl
- [ ] Configurar índices para performance
- [ ] Executar migrations

**Critérios de Aceitação:**
- Model Certificate criado com relacionamentos corretos
- Campos obrigatórios e opcionais bem definidos
- Constraints de unicidade implementadas
- Migrations executadas com sucesso

**Dependências:** Nenhuma

---

### Card #022 - Biblioteca de Geração de PDF
**Status:** 📋 Backlog  
**Pontos:** 8  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Implementar sistema de geração de certificados em PDF

**Tarefas:**
- [ ] Configurar biblioteca jsPDF ou Puppeteer
- [ ] Criar template HTML para certificado
- [ ] Implementar função de geração de PDF
- [ ] Adicionar informações dinâmicas (nome, evento, data)
- [ ] Configurar armazenamento de PDFs

**Critérios de Aceitação:**
- PDFs gerados com qualidade profissional
- Template bonito e padronizado
- Informações dinâmicas inseridas corretamente
- PDFs salvos e acessíveis via URL
- Performance adequada na geração

**Dependências:** Card #021

---

### Card #023 - API de Geração de Certificados
**Status:** 📋 Backlog  
**Pontos:** 8  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Criar endpoint para gerar certificados de participação

**Tarefas:**
- [ ] Criar POST /api/events/[id]/certificate
- [ ] Verificar se usuário participou do evento
- [ ] Verificar se evento já foi concluído
- [ ] Gerar certificado único por participante
- [ ] Salvar registro no banco de dados

**Critérios de Aceitação:**
- Apenas participantes podem gerar certificados
- Apenas eventos concluídos geram certificados
- Um certificado por usuário por evento
- PDF gerado e URL retornada
- Registro salvo no banco para auditoria

**Dependências:** Card #022

---

### Card #024 - Interface de Download de Certificados
**Status:** 📋 Backlog  
**Pontos:** 5  
**Tipo:** Frontend  
**Prioridade:** Média

**Descrição:**
Adicionar botão de download de certificado nos eventos

**Tarefas:**
- [ ] Adicionar botão "Baixar Certificado" nos eventos
- [ ] Verificar se usuário pode gerar certificado
- [ ] Implementar download direto do PDF
- [ ] Adicionar loading durante geração
- [ ] Mostrar histórico de certificados no perfil

**Critérios de Aceitação:**
- Botão aparece apenas quando apropriado
- Download funciona corretamente
- Feedback visual durante processamento
- Histórico acessível no perfil do usuário

**Dependências:** Card #023

---

### Card #025 - Sistema de Validação de Certificados
**Status:** 📋 Backlog  
**Pontos:** 8  
**Tipo:** Fullstack  
**Prioridade:** Baixa

**Descrição:**
Implementar sistema para validar autenticidade dos certificados

**Tarefas:**
- [ ] Gerar códigos únicos de validação
- [ ] Criar página /validate/[code]
- [ ] Implementar verificação de autenticidade
- [ ] Adicionar QR Code nos certificados
- [ ] Criar banco de dados de certificados válidos

**Critérios de Aceitação:**
- Cada certificado tem código único
- Página de validação funcional
- QR Code linkando para validação
- Impossível falsificar certificados
- Interface pública de verificação

**Dependências:** Card #023

---

## 💰 Epic 3: Sistema de Eventos Pagos

### Card #026 - Modelo de Dados para Pagamentos
**Status:** 📋 Backlog  
**Pontos:** 5  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Expandir modelo de Event para suportar eventos pagos

**Tarefas:**
- [ ] Adicionar campos price, isPaid ao model Event
- [ ] Criar model Payment para transações
- [ ] Relacionar Payment com EventRegistration
- [ ] Adicionar status de pagamento (pending, paid, failed)
- [ ] Executar migrations

**Critérios de Aceitação:**
- Events podem ser gratuitos ou pagos
- Histórico completo de pagamentos
- Status de pagamento rastreável
- Relacionamentos corretos entre models

**Dependências:** Nenhuma

---

### Card #027 - Integração com Gateway de Pagamento
**Status:** 📋 Backlog  
**Pontos:** 13  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Implementar integração com Stripe para processamento de pagamentos

**Tarefas:**
- [ ] Configurar conta Stripe e chaves de API
- [ ] Instalar e configurar biblioteca Stripe
- [ ] Implementar criação de Payment Intent
- [ ] Configurar webhooks para confirmação
- [ ] Implementar tratamento de erros

**Critérios de Aceitação:**
- Integração Stripe funcionando em sandbox
- Payment Intents criados corretamente
- Webhooks processando confirmações
- Tratamento adequado de falhas
- Logs de transações implementados

**Dependências:** Card #026

---

### Card #028 - API de Processamento de Pagamentos
**Status:** 📋 Backlog  
**Pontos:** 13  
**Tipo:** Backend  
**Prioridade:** Alta

**Descrição:**
Criar endpoints para gerenciar pagamentos de eventos

**Tarefas:**
- [ ] Criar POST /api/events/[id]/payment
- [ ] Implementar criação de sessão de pagamento
- [ ] Criar webhook /api/webhooks/stripe
- [ ] Confirmar inscrição após pagamento
- [ ] Implementar reembolsos (se necessário)

**Critérios de Aceitação:**
- Sessões de pagamento criadas corretamente
- Webhooks processando confirmações
- Inscrições confirmadas automaticamente
- Segurança implementada em todos os endpoints
- Logs detalhados de transações

**Dependências:** Card #027

---

### Card #029 - Interface de Pagamento
**Status:** 📋 Backlog  
**Pontos:** 13  
**Tipo:** Frontend  
**Prioridade:** Alta

**Descrição:**
Implementar checkout e interface de pagamento

**Tarefas:**
- [ ] Integrar Stripe Checkout no frontend
- [ ] Criar fluxo de pagamento para eventos pagos
- [ ] Implementar página de sucesso/falha
- [ ] Adicionar indicadores de preço nos cards
- [ ] Mostrar status de pagamento nas inscrições

**Critérios de Aceitação:**
- Checkout Stripe funcionando corretamente
- Fluxo de pagamento intuitivo
- Preços visíveis em todos os lugares apropriados
- Redirecionamentos após pagamento funcionando
- Status de pagamento sempre visível

**Dependências:** Card #028

---

### Card #030 - Dashboard de Pagamentos para Organizadores
**Status:** 📋 Backlog  
**Pontos:** 8  
**Tipo:** Frontend  
**Prioridade:** Média

**Descrição:**
Criar interface para organizadores acompanharem receitas

**Tarefas:**
- [ ] Criar página de dashboard financeiro
- [ ] Mostrar receita total por evento
- [ ] Listar todas as transações
- [ ] Implementar filtros por período
- [ ] Adicionar gráficos de receita

**Critérios de Aceitação:**
- Dashboard acessível apenas para organizadores
- Receitas calculadas corretamente
- Histórico completo de transações
- Filtros funcionais
- Gráficos informativos e precisos

**Dependências:** Card #029

---

## 🔧 Epic 4: Melhorias e Integrações

### Card #031 - Configuração de Upload de Imagens
**Status:** 📋 Backlog  
**Pontos:** 5  
**Tipo:** DevOps  
**Prioridade:** Alta

**Descrição:**
Configurar serviço de upload e armazenamento de imagens

**Tarefas:**
- [ ] Configurar conta Cloudinary
- [ ] Implementar configurações de ambiente
- [ ] Criar helpers para upload
- [ ] Configurar transformações automáticas
- [ ] Implementar limpeza de imagens não utilizadas

**Critérios de Aceitação:**
- Cloudinary configurado e funcionando
- Upload de imagens rápido e confiável
- Transformações automáticas aplicadas
- Variáveis de ambiente configuradas
- Sistema de limpeza implementado

**Dependências:** Nenhuma

---

### Card #032 - Sistema de Notificações por Email
**Status:** 📋 Backlog  
**Pontos:** 8  
**Tipo:** Backend  
**Prioridade:** Média

**Descrição:**
Implementar envio de emails para confirmações e atualizações

**Tarefas:**
- [ ] Configurar serviço de email (SendGrid/Resend)
- [ ] Criar templates de email
- [ ] Implementar envio de confirmação de inscrição
- [ ] Enviar email quando certificado for gerado
- [ ] Criar sistema de notificações de pagamento

**Critérios de Aceitação:**
- Emails enviados corretamente
- Templates profissionais e responsivos
- Confirmações automáticas funcionando
- Notificações de pagamento implementadas
- Sistema confiável e rápido

**Dependências:** Card #023, Card #028

---

### Card #033 - Melhorias de UX no Sistema de Filtros
**Status:** 📋 Backlog  
**Pontos:** 5  
**Tipo:** Frontend  
**Prioridade:** Baixa

**Descrição:**
Adicionar filtro por tipo de evento (gratuito/pago)

**Tarefas:**
- [ ] Adicionar filtro "Eventos Gratuitos"
- [ ] Adicionar filtro "Eventos Pagos"
- [ ] Atualizar sistema de contadores
- [ ] Implementar combinação de filtros
- [ ] Melhorar animações dos filtros

**Critérios de Aceitação:**
- Novos filtros funcionando corretamente
- Contadores atualizados para todos os filtros
- Combinações de filtros possíveis
- Animações suaves e profissionais

**Dependências:** Card #026

---

## 📊 Resumo dos Cards - Sprint 3

### Por Status:
- 📋 **Backlog:** 18 cards
- 🏗️ **Em Desenvolvimento:** 0 cards  
- 🧪 **Em Teste:** 0 cards
- ✅ **Concluídos:** 0 cards

### Por Tipo:
- **Backend:** 9 cards (61 pontos)
- **Frontend:** 7 cards (59 pontos)
- **Fullstack:** 1 card (8 pontos)
- **DevOps:** 1 card (5 pontos)

### Por Epic:
- **Epic 1 - Sistema de Perfil:** 39 pontos (5 cards)
- **Epic 2 - Comprovantes de Participação:** 32 pontos (5 cards)
- **Epic 3 - Sistema de Eventos Pagos:** 62 pontos (5 cards)
- **Epic 4 - Melhorias e Integrações:** 18 pontos (3 cards)

### Por Prioridade:
- **Alta:** 10 cards (85 pontos)
- **Média:** 5 cards (39 pontos)
- **Baixa:** 3 cards (13 pontos)

**Total de Pontos da Sprint:** 151 pontos  
**Duração Estimada:** 3 semanas  
**Complexidade:** Alta (sistema de pagamentos)

---

## 🎯 Definition of Ready - Sprint 3

Cada card deve atender aos critérios:
- [ ] História de usuário clara com benefício definido
- [ ] Critérios de aceitação específicos e testáveis
- [ ] Estimativa de pontos baseada em complexidade
- [ ] Dependências identificadas e mapeadas
- [ ] Wireframes/mockups para cards de frontend
- [ ] Pesquisa técnica para integrações (Stripe, Cloudinary)
- [ ] Aprovação do Product Owner

## ✅ Definition of Done - Sprint 3

Cada card será considerado concluído quando:
- [ ] Código desenvolvido seguindo padrões do projeto
- [ ] Testes unitários com cobertura > 80%
- [ ] Integração com APIs externas testada em sandbox
- [ ] Code review aprovado por outro desenvolvedor
- [ ] Funcionalidade testada em ambiente de desenvolvimento
- [ ] Critérios de aceitação 100% validados
- [ ] Deploy em ambiente de homologação realizado
- [ ] Documentação técnica atualizada
- [ ] Configurações de segurança implementadas

---

## 🚨 Riscos e Dependências

### Riscos Identificados:
1. **Complexidade do Stripe:** Primeira integração com gateway de pagamento
2. **Geração de PDFs:** Performance pode ser afetada com muitos certificados
3. **Upload de Imagens:** Necessita configuração de serviço externo
4. **Webhooks:** Configuração de produção pode ser complexa

### Mitigações:
- Começar com integrações em sandbox
- Implementar testes extensivos para pagamentos
- Configurar monitoramento para uploads
- Documentar bem as configurações de webhook

### Dependências Externas:
- **Stripe Account:** Necessário para pagamentos
- **Cloudinary Account:** Necessário para imagens
- **Email Service:** Para notificações automáticas

---

**Sprint 3 - Pronta para Início! 🚀**  
**Foco:** Perfil de Usuário + Certificados + Pagamentos  
**Complexidade:** Alta - MVP de Monetização**