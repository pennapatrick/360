# 📝 HISTÓRIAS DE USUÁRIO DETALHADAS - Sistema 360

## 🎯 **TEMPLATE E EXEMPLOS PRÁTICOS**

### **📋 FORMATO PADRÃO DAS USER STORIES**

```
[ID] Como [persona]
Quero [objetivo/funcionalidade]  
Para que [benefício/valor]

CRITÉRIOS DE ACEITE:
□ Critério 1 - [Comportamento esperado]
□ Critério 2 - [Validação necessária]  
□ Critério 3 - [Condição de erro]

STORY POINTS: [X]
PRIORIDADE: [Alta/Média/Baixa]
ÉPICO: [Nome do épico]
SPRINT: [Número da sprint]
```

---

## 🚀 **ÉPICO 1: INFRAESTRUTURA E AUTENTICAÇÃO**

### **[US-001] Setup do Projeto**
```
Como desenvolvedor
Quero configurar o ambiente Next.js completo
Para que tenhamos uma base sólida para desenvolvimento

CRITÉRIOS DE ACEITE:
□ Next.js 14 instalado com TypeScript
□ Estrutura de pastas organizada (src/app, src/lib, src/components)
□ ESLint e Prettier configurados
□ Scripts de build e dev funcionando
□ Repositório Git inicializado

STORY POINTS: 3
PRIORIDADE: Alta
ÉPICO: Infraestrutura
SPRINT: 1
```

### **[US-004] Cadastro de Usuário**
```
Como visitante do site
Quero me cadastrar na plataforma
Para que eu possa criar uma conta e acessar funcionalidades exclusivas

CRITÉRIOS DE ACEITE:
□ Formulário com campos: nome, email, senha, confirmação de senha
□ Validação de email único no sistema
□ Senha deve ter mínimo 6 caracteres
□ Feedback visual para campos inválidos
□ Redirecionamento para login após cadastro bem-sucedido
□ Mensagem de erro clara se email já existir
□ Hash da senha antes de salvar no banco

STORY POINTS: 5
PRIORIDADE: Alta
ÉPICO: Autenticação
SPRINT: 1
```

### **[US-005] Login de Usuário**
```
Como usuário cadastrado
Quero fazer login no sistema
Para que eu possa acessar minha conta e funcionalidades protegidas

CRITÉRIOS DE ACEITE:
□ Formulário com campos email e senha
□ Validação de credenciais no backend
□ Criação de sessão JWT válida
□ Redirecionamento para dashboard após login
□ Mensagem de erro para credenciais inválidas
□ Opção "Lembrar-me" para sessão persistente
□ Loading state durante autenticação

STORY POINTS: 3
PRIORIDADE: Alta
ÉPICO: Autenticação
SPRINT: 1
```

---

## 📅 **ÉPICO 2: GESTÃO DE EVENTOS**

### **[US-008] Criação de Eventos**
```
Como organizador de eventos
Quero criar novos eventos na plataforma
Para que eu possa divulgar minhas atividades para o público interessado

CRITÉRIOS DE ACEITE:
□ Formulário com campos obrigatórios: título, descrição, local, data início
□ Campos opcionais: data fim, máximo de participantes, imagem
□ Validação de data (não pode ser no passado)
□ Preview do evento antes de salvar
□ Associação automática do evento ao usuário logado
□ Confirmação visual após criação bem-sucedida
□ Redirecionamento para lista de eventos do organizador

STORY POINTS: 8
PRIORIDADE: Alta
ÉPICO: Gestão de Eventos
SPRINT: 1-2
```

### **[US-009] Listagem de Eventos**
```
Como usuário da plataforma
Quero visualizar uma lista de eventos disponíveis
Para que eu possa descobrir atividades interessantes na minha região

CRITÉRIOS DE ACEITE:
□ Lista exibe eventos ativos ordenados por data
□ Card de evento mostra: título, data, local, organizador
□ Paginação para mais de 10 eventos
□ Loading state durante carregamento
□ Mensagem quando não há eventos disponíveis
□ Link para detalhes de cada evento
□ Indicação visual de eventos com vagas limitadas

STORY POINTS: 5
PRIORIDADE: Alta
ÉPICO: Gestão de Eventos  
SPRINT: 1
```

### **[US-013] Busca de Eventos**
```
Como usuário interessado em eventos
Quero buscar eventos por palavras-chave
Para que eu possa encontrar rapidamente o que me interessa

CRITÉRIOS DE ACEITE:
□ Campo de busca visível na página de eventos
□ Busca em título, descrição e local do evento
□ Resultados em tempo real (debounce de 300ms)
□ Highlighting dos termos encontrados
□ Contador de resultados encontrados
□ Opção para limpar busca
□ Busca case-insensitive e sem acentos

STORY POINTS: 5
PRIORIDADE: Alta
ÉPICO: Gestão de Eventos
SPRINT: 2
```

---

## 🎫 **ÉPICO 3: SISTEMA DE INSCRIÇÕES**

### **[US-014] Inscrição em Eventos**
```
Como participante interessado
Quero me inscrever em um evento
Para que eu possa garantir minha participação na atividade

CRITÉRIOS DE ACEITE:
□ Botão "Inscrever-se" visível em eventos disponíveis
□ Verificação se usuário já está inscrito
□ Verificação de vagas disponíveis (se limitado)
□ Confirmação antes de realizar inscrição
□ Atualização imediata do status na interface
□ Envio de email de confirmação
□ Impossibilidade de inscrição dupla no mesmo evento

STORY POINTS: 8
PRIORIDADE: Alta
ÉPICO: Inscrições
SPRINT: 3
```

### **[US-016] Lista de Inscritos**
```
Como organizador de evento
Quero ver a lista de participantes inscritos
Para que eu possa gerenciar e se comunicar com os participantes

CRITÉRIOS DE ACEITE:
□ Acesso apenas para organizador do evento
□ Lista com nome e email dos inscritos
□ Data de inscrição de cada participante
□ Contador total de inscrições
□ Opção de exportar lista em CSV
□ Status da inscrição (confirmada, pendente, cancelada)
□ Filtro por status de inscrição

STORY POINTS: 5
PRIORIDADE: Alta
ÉPICO: Inscrições
SPRINT: 3
```

---

## 🔍 **ÉPICO 4: BUSCA E FILTROS**

### **[US-019] Filtro por Data**
```
Como usuário buscando eventos
Quero filtrar eventos por período de data
Para que eu possa encontrar eventos quando tenho disponibilidade

CRITÉRIOS DE ACEITE:
□ Filtros: "Hoje", "Esta semana", "Este mês", "Personalizado"
□ Date picker para período personalizado
□ Aplicação imediata dos filtros
□ Indicação visual de filtros ativos
□ Contagem de eventos encontrados
□ Opção para limpar todos os filtros
□ Combinação com outros filtros

STORY POINTS: 5
PRIORIDADE: Alta
ÉPICO: Busca e Filtros
SPRINT: 4
```

### **[US-020] Filtro por Localização**
```
Como usuário local
Quero filtrar eventos por proximidade
Para que eu possa encontrar eventos perto de mim

CRITÉRIOS DE ACEITE:
□ Lista de bairros/regiões disponíveis
□ Busca por CEP ou endereço
□ Filtro por distância (1km, 5km, 10km, sem limite)
□ Geolocalização opcional do usuário
□ Mapa com pontos dos eventos (futuro)
□ Combinação com outros filtros
□ Cache das localizações consultadas

STORY POINTS: 8
PRIORIDADE: Alta
ÉPICO: Busca e Filtros
SPRINT: 4
```

---

## 👤 **ÉPICO 5: PERFIL DE USUÁRIO**

### **[US-024] Edição de Perfil**
```
Como usuário da plataforma
Quero editar meus dados pessoais
Para que eu possa manter minhas informações atualizadas

CRITÉRIOS DE ACEITE:
□ Formulário com dados atuais pré-preenchidos
□ Campos editáveis: nome, email, telefone, bio
□ Validação de email único (exceto o próprio)
□ Upload de foto de perfil
□ Confirmação antes de salvar alterações
□ Feedback visual de sucesso/erro
□ Opção para cancelar sem salvar

STORY POINTS: 5
PRIORIDADE: Média
ÉPICO: Perfil de Usuário
SPRINT: 5
```

### **[US-026] Dashboard do Organizador**
```
Como organizador de eventos
Quero ver estatísticas dos meus eventos
Para que eu possa analisar o sucesso e melhorar futuras ações

CRITÉRIOS DE ACEITE:
□ Total de eventos criados
□ Total de inscrições recebidas
□ Evento com mais inscrições
□ Gráfico de inscrições ao longo do tempo
□ Taxa de ocupação média dos eventos
□ Lista dos últimos eventos criados
□ Links rápidos para criar novo evento

STORY POINTS: 8
PRIORIDADE: Média
ÉPICO: Perfil de Usuário
SPRINT: 5
```

---

## 🔔 **ÉPICO 6: NOTIFICAÇÕES**

### **[US-028] Notificações de Novos Eventos**
```
Como usuário interessado em eventos
Quero receber notificações de novos eventos
Para que eu não perca oportunidades interessantes

CRITÉRIOS DE ACEITE:
□ Notificação quando evento é criado na minha região
□ Filtro por categorias de interesse
□ Opção de ativar/desativar notificações
□ Frequência configurável (tempo real, diária, semanal)
□ Notificação via email e/ou push (web)
□ Prévia do evento na notificação
□ Link direto para o evento

STORY POINTS: 8
PRIORIDADE: Média
ÉPICO: Notificações
SPRINT: 6
```

---

## ⭐ **ÉPICO 7: AVALIAÇÕES E FEEDBACK**

### **[US-031] Avaliação de Eventos**
```
Como participante de um evento
Quero avaliar o evento após participar
Para que eu possa ajudar outros usuários e dar feedback ao organizador

CRITÉRIOS DE ACEITE:
□ Avaliação disponível apenas após data do evento
□ Sistema de estrelas (1-5) e comentário opcional
□ Uma avaliação por usuário por evento
□ Possibilidade de editar avaliação própria
□ Avaliações anônimas ou com nome (escolha do usuário)
□ Moderação básica de comentários ofensivos
□ Cálculo automático da média de avaliações

STORY POINTS: 8
PRIORIDADE: Baixa
ÉPICO: Avaliações
SPRINT: 7
```

---

## 📱 **ÉPICO 8: MELHORIAS DE UX/UI**

### **[US-034] Interface Responsiva**
```
Como usuário que acessa de diferentes dispositivos
Quero que a interface se adapte ao meu dispositivo
Para que eu tenha uma boa experiência em qualquer tela

CRITÉRIOS DE ACEITE:
□ Layout responsivo para mobile, tablet e desktop
□ Menu hamburger em telas pequenas
□ Formulários adaptados para touch
□ Imagens responsivas que não quebram layout
□ Performance otimizada em dispositivos móveis
□ Testes em diferentes navegadores
□ Acessibilidade mantida em todas as resoluções

STORY POINTS: 8
PRIORIDADE: Média
ÉPICO: UX/UI
SPRINT: 8
```

---

## 🔧 **CRITÉRIOS DE ACEITE TÉCNICOS PADRÃO**

### **Todas as User Stories devem atender:**

#### **Performance:**
- Tempo de carregamento < 3 segundos
- Otimização de imagens e assets
- Lazy loading quando aplicável

#### **Segurança:**
- Validação no frontend E backend
- Sanitização de inputs do usuário
- Proteção contra XSS e CSRF

#### **Usabilidade:**
- Loading states para operações assíncronas
- Mensagens de erro claras e acionáveis
- Feedback visual para ações do usuário

#### **Qualidade:**
- Código limpo e comentado
- Testes unitários para lógica crítica
- Code review aprovado

#### **Acessibilidade:**
- Contraste adequado de cores
- Navegação por teclado
- Textos alternativos em imagens

---

## 📊 **TEMPLATE PARA NOVAS USER STORIES**

```
[US-XXX] Título da História
Como [tipo de usuário]
Quero [funcionalidade desejada]
Para que [benefício ou valor]

CRITÉRIOS DE ACEITE:
□ [Comportamento principal]
□ [Validação necessária]
□ [Tratamento de erro]
□ [Feedback para usuário]
□ [Integração com outras funcionalidades]

CENÁRIOS DE TESTE:
1. Cenário feliz: [Descrição]
2. Cenário de erro: [Descrição]
3. Cenário de borda: [Descrição]

STORY POINTS: [1, 2, 3, 5, 8, 13]
PRIORIDADE: [Alta/Média/Baixa]
ÉPICO: [Nome do épico]
SPRINT: [Número planejado]
DEPENDÊNCIAS: [Outras US necessárias]
```

---

**📋 Use este documento como referência para criar novas histórias de usuário e manter a consistência do backlog!**
