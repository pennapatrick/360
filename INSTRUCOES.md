# 🚀 Instruções Completas - Sistema 360

## ✅ Status do Projeto
- [x] Estrutura básica criada
- [x] Dependências configuradas
- [x] Banco de dados modelado (Prisma)
- [x] Autenticação estruturada (NextAuth.js)
- [x] Páginas principais criadas
- [x] APIs básicas implementadas

## 📋 Próximos Passos para Completar a Sprint 1

### 1. Configurar Variáveis de Ambiente
Crie o arquivo `.env.local`:

```bash
copy .env.example .env.local
```

**Edite `.env.local` com:**
```env
# Database - Configure com seu banco Neon
DATABASE_URL="postgresql://usuario:senha@ep-exemplo.us-east-1.aws.neon.tech/360_events?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000" 
NEXTAUTH_SECRET="seu-secret-super-seguro-aqui"
```

### 2. Configurar Banco de Dados (Neon)

**Como criar no Neon:**
1. Acesse https://neon.tech
2. Crie conta gratuita
3. Novo projeto: "360-eventos"
4. Copie a Connection String
5. Cole no `.env.local`

**Aplicar o schema:**
```bash
npx prisma db push
```

### 3. Testar o Projeto
```bash
npm run dev
```

Acesse: http://localhost:3000

### 4. Funcionalidades para Testar
- ✅ Página inicial (landing page)
- ✅ Cadastro de usuários (/auth/register)
- ✅ Login (/auth/login) 
- ✅ Lista de eventos (/events)
- 🔄 Criar eventos (precisa implementar página)
- 🔄 Dashboard do usuário (precisa implementar)

## 🎯 Tarefas Restantes da Sprint 1

### A. Página de Criação de Eventos
- Formulário para organizadores
- Validação de campos
- Integração com API

### B. Dashboard do Usuário
- Área logada
- Eventos criados (organizador)
- Eventos inscritos (participante)

### C. Página de Detalhes do Evento
- Informações completas
- Botão de inscrição

### D. Melhorias de UX
- Loading states
- Messages de erro/sucesso
- Responsividade

## 🚀 Deploy (Opcional para Sprint 1)

### GitHub + Vercel
```bash
# Commit inicial
git add .
git commit -m "Sprint 1: MVP básico do Sistema 360"

# Criar repo no GitHub e enviar
git remote add origin https://github.com/SEU_USUARIO/360.git
git push -u origin main

# Deploy na Vercel
# 1. Conecte repositório no vercel.com
# 2. Configure variáveis de ambiente
# 3. Deploy automático
```

## 📊 Cards do Trello - Status

### ✅ Concluídos (15 SP)
- [x] Setup Repositório GitHub (2 SP)
- [x] Configurar Next.js + TypeScript + Tailwind (3 SP) 
- [x] Configurar Banco Neon + Prisma (3 SP)
- [x] Cadastro de Usuários (5 SP)
- [x] Listagem de Eventos (3 SP) - com mock data

### 🔄 Em Progresso (7 SP)
- [ ] Login e Autenticação (3 SP) - 80% concluído
- [ ] Cadastro de Eventos (5 SP) - API pronta, falta página
- [ ] Detalhes do Evento (3 SP) - estrutura criada

### ⏳ A Fazer (3 SP)  
- [ ] Wireframe das Telas Principais (3 SP)

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Rodar em desenvolvimento
npm run build           # Build produção
npm run start           # Rodar produção

# Banco de dados  
npx prisma generate     # Gerar cliente
npx prisma db push      # Aplicar mudanças no schema
npx prisma studio       # Interface visual do DB
npx prisma db seed      # Popular dados (quando criado)

# Git
git add .
git commit -m "feat: implementar funcionalidade X"
git push

# Deploy
vercel                  # Deploy na Vercel
```

## 🎨 Design System (Implementado)

### Cores
- **Primary:** Azul (#3b82f6)  
- **Secondary:** Cinza (#64748b)
- **Success:** Verde
- **Error:** Vermelho

### Componentes CSS
- `.btn-primary` - Botão principal
- `.btn-secondary` - Botão secundário
- `.input` - Campos de formulário
- `.card` - Cards/containers

## 📱 Responsividade
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Grid responsivo implementado

## ⚡ Performance
- Next.js 14 com App Router
- Server Components por padrão
- Lazy loading de componentes
- Otimização de imagens (Next/Image)

## 🔐 Segurança Implementada
- Senhas criptografadas (bcrypt)
- Validação de entrada (Zod)
- CSRF protection (NextAuth)
- SQL injection protection (Prisma)

---

**📞 Suporte:** Se precisar de ajuda, consulte a documentação ou crie uma issue no repositório.

**🎯 Objetivo:** Entregar MVP funcional até o final da Sprint 1 com todas as funcionalidades básicas operando.
