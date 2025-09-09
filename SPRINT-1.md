# Sprint 1 - Fundamentos do Sistema 360

## 📋 Cards do Trello

### 1. Infraestrutura & Setup (8 SP)

**Card: Setup do Repositório GitHub**
- **SP:** 2
- **Descrição:** Criar repositório, configurar estrutura inicial
- **Critérios de Aceite:**
  - [ ] Repositório público no GitHub
  - [ ] README.md detalhado
  - [ ] .gitignore configurado
  - [ ] Estrutura de pastas organizada

**Card: Configurar Next.js + TypeScript + Tailwind**  
- **SP:** 3
- **Descrição:** Setup da base tecnológica do projeto
- **Critérios de Aceite:**
  - [ ] Next.js 14 instalado e funcionando
  - [ ] TypeScript configurado
  - [ ] Tailwind CSS funcionando
  - [ ] Estrutura de componentes criada

**Card: Configurar Banco Neon + Prisma**
- **SP:** 3  
- **Descrição:** Setup do banco de dados e ORM
- **Critérios de Aceite:**
  - [ ] Conta Neon criada e configurada
  - [ ] Schema Prisma definido
  - [ ] Conexão funcionando
  - [ ] Migrations aplicadas

### 2. Autenticação (8 SP)

**Card: Cadastro de Usuários**
- **SP:** 5
- **Descrição:** Como visitante, quero me cadastrar para acessar o sistema
- **Critérios de Aceite:**
  - [ ] Página de cadastro funcional
  - [ ] Validação de dados (email, senha)
  - [ ] Criptografia de senha (bcrypt)
  - [ ] Escolha de perfil (organizador/participante)
  - [ ] Redirecionamento após cadastro

**Card: Login e Autenticação**
- **SP:** 3
- **Descrição:** Como usuário cadastrado, quero fazer login para acessar minhas funcionalidades
- **Critérios de Aceite:**
  - [ ] Página de login funcional  
  - [ ] NextAuth.js configurado
  - [ ] Validação de credenciais
  - [ ] Sessão de usuário mantida
  - [ ] Logout funcionando

### 3. Gestão de Eventos (6 SP)

**Card: Cadastro de Eventos**
- **SP:** 5
- **Descrição:** Como organizador, quero cadastrar eventos com informações completas
- **Critérios de Aceite:**
  - [ ] Formulário de cadastro (nome, data, local, descrição)
  - [ ] Validação de campos obrigatórios
  - [ ] Salvamento no banco de dados
  - [ ] Apenas organizadores podem criar
  - [ ] Feedback de sucesso/erro

**Card: Listagem de Eventos**
- **SP:** 3
- **Descrição:** Como usuário, quero visualizar todos os eventos disponíveis
- **Critérios de Aceite:**
  - [ ] Página com lista de eventos
  - [ ] Exibição de informações básicas
  - [ ] Layout responsivo
  - [ ] Ordenação por data
  - [ ] Links para detalhes

**Card: Detalhes do Evento**  
- **SP:** 3
- **Descrição:** Como usuário, quero ver informações completas de um evento
- **Critérios de Aceite:**
  - [ ] Página individual do evento
  - [ ] Todas as informações visíveis
  - [ ] Data/hora formatadas
  - [ ] Informações do organizador
  - [ ] Botão para inscrever-se (futura implementação)

### 4. Design & UX (3 SP)

**Card: Wireframe das Telas Principais**
- **SP:** 3
- **Descrição:** Criar protótipo visual das principais telas
- **Critérios de Aceite:**
  - [ ] Wireframe no Figma ou similar
  - [ ] Telas: Home, Login, Cadastro, Lista de Eventos, Detalhes
  - [ ] Versão mobile e desktop
  - [ ] Aprovação da equipe
  - [ ] Link compartilhado no Trello

## 🎯 Total: 22 Story Points

## 📅 Cronograma Sugerido (2 semanas)

### Semana 1
- **Dias 1-2:** Setup infraestrutura (repositório, Next.js, banco)
- **Dias 3-4:** Autenticação (cadastro e login)
- **Dia 5:** Wireframes e revisão

### Semana 2  
- **Dias 6-8:** Gestão de eventos (criar, listar, detalhes)
- **Dias 9-10:** Testes, ajustes finais e deploy

## 🔧 Tecnologias Confirmadas

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM  
- **Banco:** PostgreSQL (Neon)
- **Auth:** NextAuth.js
- **Deploy:** Vercel
- **Design:** Figma (wireframes)

## ✨ Entregáveis da Sprint

1. ✅ **MVP funcional** com todas as features básicas
2. ✅ **Deploy em produção** (Vercel)  
3. ✅ **Repositório organizado** no GitHub
4. ✅ **Documentação** de setup e uso
5. ✅ **Wireframes** das telas principais
6. ✅ **Demo** funcionando para Sprint Review

---

**Próxima Sprint:** Inscrições, notificações, filtros e dashboard do organizador
