# Guia de Setup - Sistema 360

## 🚀 Setup Inicial

### 1. Instalar dependências
```bash
cd "c:\Users\patri\OneDrive\Área de Trabalho\360"
npm install
```

### 2. Configurar variáveis de ambiente
```bash
# Copie o arquivo de exemplo
copy .env.example .env.local
```

**Edite o arquivo `.env.local` com suas configurações:**

```env
# Database (substitua pela sua string de conexão do Neon)
DATABASE_URL="postgresql://usuario:senha@ep-exemplo.us-east-1.aws.neon.tech/360_events?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-um-secret-muito-seguro-aqui"
```

### 3. Configurar banco de dados
```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar schema ao banco
npx prisma db push

# (Opcional) Visualizar dados
npx prisma studio
```

### 4. Executar o projeto
```bash
npm run dev
```

## 🎯 Configuração do Neon PostgreSQL

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto: `360-eventos`
4. Copie a string de conexão
5. Cole no arquivo `.env.local`

## 📦 Deploy na Vercel

### Via GitHub (Recomendado)

1. **Crie repositório no GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Sistema 360"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/360.git
git push -u origin main
```

2. **Configure na Vercel:**
- Acesse [vercel.com](https://vercel.com)
- Conecte seu repositório GitHub
- Configure as variáveis de ambiente:
  - `DATABASE_URL`: String do Neon
  - `NEXTAUTH_SECRET`: Secret seguro
  - `NEXTAUTH_URL`: URL do deploy

3. **Deploy automático:**
- Cada push na branch `main` fará deploy automático

### Via CLI
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

## ✅ Checklist Sprint 1

### Infraestrutura
- [ ] Repositório GitHub criado
- [ ] Dependências instaladas
- [ ] Banco Neon configurado
- [ ] Deploy Vercel funcionando

### Funcionalidades
- [ ] Página inicial (landing)
- [ ] Cadastro de usuários
- [ ] Login/logout
- [ ] Criar eventos
- [ ] Listar eventos
- [ ] Ver detalhes do evento

### Comandos úteis
```bash
# Desenvolvimento
npm run dev              # Executar em modo desenvolvimento
npm run build           # Construir para produção
npm run start           # Executar produção

# Banco de dados
npx prisma generate     # Gerar cliente
npx prisma db push      # Aplicar schema
npx prisma studio       # Interface visual
npx prisma db seed      # Popular dados iniciais

# Deploy
vercel                  # Deploy na Vercel
vercel --prod          # Deploy produção
```

## 📋 Próximos Passos (Sprint 2)

- Edição/exclusão de eventos
- Sistema de inscrições
- Notificações
- Filtros e busca
- Dashboard do usuário

---

**Precisa de ajuda?** Consulte a documentação ou abra uma issue no repositório.
