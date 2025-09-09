# 360 - Sistema de Gestão de Eventos

🌟 **360° de Eventos ao seu redor**

Sistema completo para descobrir, criar e gerenciar eventos próximos a você. Faça um 360° e veja todos os eventos que estão acontecendo na sua região!

## 🚀 Tecnologias

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Banco de Dados:** PostgreSQL (Neon)
- **Autenticação:** NextAuth.js
- **Deploy:** Vercel
- **Versionamento:** Git/GitHub

## 🎯 Funcionalidades

### Sprint 1 - MVP Fundamentos
- [x] Cadastro e autenticação de usuários
- [x] Perfis de organizador e participante
- [x] Cadastro de eventos (nome, data, local, descrição)
- [x] Listagem de eventos disponíveis
- [x] Visualização detalhada de eventos

### Sprint 2 - Interações (Planejado)
- [ ] Edição e exclusão de eventos
- [ ] Sistema de inscrições
- [ ] Notificações básicas
- [ ] Filtros e busca avançada

### Sprint 3 - Dashboard e Qualidade (Planejado)
- [ ] Dashboard do organizador
- [ ] Exportação de dados
- [ ] Melhorias de UX/UI
- [ ] Otimizações de performance

## 🛠️ Setup do Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no GitHub
- Conta no Vercel
- Conta no Neon (PostgreSQL)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/pennapatrick/360.git
cd 360
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Configure o banco de dados:
```bash
npx prisma generate
npx prisma db push
```

5. Execute o projeto:
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🗄️ Estrutura do Projeto

```
360/
├── src/
│   ├── app/           # Next.js 14 App Router
│   ├── components/    # Componentes reutilizáveis
│   ├── lib/          # Utilitários e configurações
│   └── types/        # Definições TypeScript
├── prisma/           # Schema do banco de dados
├── public/           # Arquivos estáticos
└── docs/            # Documentação adicional
```

## 📊 Métricas do Projeto

- **Sprint 1:** 22 Story Points (2 semanas)
- **Equipe:** 1 Product Owner + 1 Scrum Master + 2 Desenvolvedores
- **Metodologia:** Scrum + Kanban (Trello)

## 🚀 Deploy

O projeto está configurado para deploy automático na Vercel:
- **Produção:** [https://360-eventos.vercel.app](https://360-eventos.vercel.app)
- **Banco:** Neon PostgreSQL

## 📝 Documentação

- [Histórias de Usuário](./docs/user-stories.md)
- [Requisitos do Sistema](./docs/requirements.md)
- [Guia de Contribuição](./docs/contributing.md)

## 👥 Equipe

- **Product Owner:** [Seu Nome]
- **Scrum Master:** [Nome do Scrum Master]
- **Desenvolvedores:** [Nomes dos Devs]

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

---
*Desenvolvido com ❤️ para conectar pessoas através de eventos*
