# 📋 SPRINT 1 - CARDS PARA O TRELLO

## 🔧 INFRAESTRUTURA (8 SP)

### Card 1: Setup do Repositório GitHub (2 SP)
**Como Product Owner, quero um repositório organizado para versionar o código**

**Critérios de Aceite:**
- [x] Repositório público criado no GitHub  
- [x] README.md com descrição do projeto
- [x] .gitignore configurado para Node.js/Next.js
- [x] Estrutura de pastas definida
- [x] Primeiro commit realizado

### Card 2: Configurar Stack Tecnológica (3 SP)
**Como desenvolvedor, quero a base tecnológica configurada**

**Critérios de Aceite:**
- [x] Next.js 14 instalado e configurado
- [x] TypeScript configurado com paths
- [x] Tailwind CSS funcionando
- [x] ESLint e configurações básicas
- [x] Scripts do package.json configurados

### Card 3: Configurar Banco de Dados (3 SP) 
**Como desenvolvedor, quero o banco de dados estruturado**

**Critérios de Aceite:**
- [x] Conta Neon PostgreSQL criada
- [x] Schema Prisma definido (User, Event, Registration)
- [x] Cliente Prisma gerado
- [ ] Conexão testada e funcionando
- [ ] Variáveis de ambiente configuradas

## 🔐 AUTENTICAÇÃO (8 SP)

### Card 4: Cadastro de Usuários (5 SP)
**Como visitante, quero me cadastrar para usar o sistema**

**Critérios de Aceite:**
- [x] Página de cadastro (/auth/register)
- [x] Formulário com nome, email, senha, tipo de perfil
- [x] Validação de dados com Zod
- [x] API de registro (/api/auth/register)
- [x] Criptografia de senha com bcrypt
- [x] Verificação de email único
- [ ] Redirecionamento após sucesso

### Card 5: Login e Autenticação (3 SP)
**Como usuário cadastrado, quero fazer login**

**Critérios de Aceite:**
- [x] Página de login (/auth/login)
- [x] NextAuth.js configurado
- [x] Provider de credentials
- [x] Validação de credenciais
- [ ] Sessão de usuário mantida
- [ ] Redirecionamento para dashboard
- [ ] Logout funcionando

## 📅 GESTÃO DE EVENTOS (9 SP)

### Card 6: Cadastro de Eventos (5 SP)
**Como organizador, quero criar eventos**

**Critérios de Aceite:**
- [x] API para criar eventos (/api/events)
- [x] Validação de dados do evento
- [x] Verificação se usuário é organizador
- [ ] Página de criação de evento
- [ ] Formulário com todos os campos
- [ ] Validação client-side
- [ ] Feedback de sucesso/erro

### Card 7: Listagem de Eventos (2 SP)
**Como usuário, quero ver eventos disponíveis**

**Critérios de Aceite:**
- [x] Página de listagem (/events)
- [x] Layout responsivo com cards
- [x] Informações básicas dos eventos
- [x] Data formatada em português
- [x] Link para detalhes
- [ ] Integração com API real

### Card 8: Detalhes do Evento (2 SP)
**Como usuário, quero ver informações completas de um evento**

**Critérios de Aceite:**
- [ ] Página individual (/events/[id])
- [ ] Todas as informações do evento
- [ ] Informações do organizador
- [ ] Contador de inscrições
- [ ] Botão de inscrição (placeholder)
- [ ] Layout responsivo

## 🎨 DESIGN E UX (3 SP)

### Card 9: Wireframes e Design System (3 SP)
**Como equipe, queremos um design consistente**

**Critérios de Aceite:**
- [x] Design system básico no Tailwind
- [x] Componentes CSS reutilizáveis (.btn, .input, .card)
- [x] Paleta de cores definida
- [x] Layout responsivo implementado
- [ ] Wireframes no Figma
- [ ] Aprovação da equipe

---

## 🎯 TOTAL: 25 STORY POINTS

## ✅ STATUS ATUAL (PROGRESS UPDATE)

### ✅ CONCLUÍDO (15 SP)
- Setup do repositório e stack tecnológica
- Sistema de cadastro completo
- Estrutura de autenticação
- API de eventos
- Listagem de eventos
- Design system básico

### 🔄 EM DESENVOLVIMENTO (7 SP)  
- Login funcional (falta testar)
- Cadastro de eventos (falta UI)
- Detalhes do evento (estrutura pronta)

### ⏳ PENDENTE (3 SP)
- Wireframes no Figma
- Configuração final do banco
- Testes integrados

## 📱 COMO USAR NO TRELLO

### 1. Cole cada card acima como um item no Trello
### 2. Configure as colunas:
- **Backlog do Produto**
- **Sprint 1 - To Do** 
- **In Progress**
- **Testing** 
- **Done**

### 3. Aplique os Labels:
- **Sprint 1** (azul)
- **Feature** (verde)
- **Tech** (cinza)
- **Prioridade Alta** (vermelho)

### 4. Configure Story Points como Custom Field

### 5. Mova cards conforme o progresso

## 🚀 PRÓXIMOS PASSOS

1. **Configure o banco Neon** e teste a conexão
2. **Complete o login funcional** com redirecionamentos
3. **Crie a página de criação de eventos**
4. **Implemente detalhes do evento**
5. **Faça wireframes no Figma**
6. **Teste tudo integrado**
7. **Deploy na Vercel**

---
**DEADLINE SPRINT 1:** 2 semanas a partir de hoje
**PRÓXIMA CERIMÔNIA:** Sprint Review + Retrospectiva
