# 📋 TEMPLATES SCRUM - Sistema 360

## 🎯 **1. TEMPLATE - HISTÓRIAS DE USUÁRIO**

### **Formato Padrão:**
```
Como [tipo de usuário]
Quero [funcionalidade/objetivo]
Para que [benefício/valor]

Critérios de Aceite:
- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

Estimativa: [X Story Points]
Prioridade: [Alta/Média/Baixa]
```

### **Exemplo Aplicado:**
```
Como organizador de eventos
Quero criar eventos com informações completas
Para que participantes possam se inscrever

Critérios de Aceite:
- [ ] Formulário com campos obrigatórios (nome, data, local)
- [ ] Validação de dados antes do salvamento
- [ ] Mensagem de confirmação após criação
- [ ] Redirecionamento para lista de eventos

Estimativa: 5 Story Points
Prioridade: Alta
```

---

## 📊 **2. TEMPLATE - BURNDOWN CHART**

### **Dados para Sprint 1:**
```
Sprint 1: 01/09 - 14/09 (14 dias)
Total: 25 Story Points

Dia | SP Restantes | SP Ideais | Observações
----|--------------|-----------|-------------
 1  |     25       |    23     | Sprint Planning
 2  |     25       |    21     | Setup inicial
 3  |     17       |    19     | Infra concluída ✅
 4  |     17       |    17     | 
 5  |     12       |    15     | Autenticação iniciada
 6  |     9        |    13     | 
 7  |     9        |    11     | Login funcionando ✅
 8  |     6        |     9     | 
 9  |     3        |     7     | Eventos quase prontos
10  |     3        |     5     | 
11  |     1        |     3     | 
12  |     0        |     1     | Sprint concluída ✅
13  |     0        |     0     | Testes finais
14  |     0        |     0     | Sprint Review
```

### **Gráfico (Descrição):**
- **Linha Azul (Ideal):** Descida linear de 25 para 0
- **Linha Vermelha (Real):** Descida em "escadas" conforme tasks concluídas
- **Resultado:** Meta atingida 2 dias antes do prazo

---

## 📅 **3. TEMPLATE - SPRINT PLANNING**

### **Sprint Planning - Sprint 1**
```
Data: 01/09/2025
Duração: 2h
Participantes: PO, SM, 2 Devs

PARTE 1 - O QUE? (1h)
- Apresentação do Backlog do Produto
- Seleção de itens para Sprint
- Definição da Meta da Sprint

PARTE 2 - COMO? (1h)  
- Quebra das User Stories em tarefas
- Estimativas detalhadas
- Identificação de dependências

META DA SPRINT:
"Entregar um MVP funcional com autenticação e gestão básica de eventos"

COMPROMETIMENTO:
25 Story Points distribuídos em 4 épicos principais

RISCOS IDENTIFICADOS:
- Configuração inicial do banco
- Integração com NextAuth
- Deploy na Vercel
```

---

## 🔄 **4. TEMPLATE - DAILY SCRUM**

### **Daily - Exemplo (Dia 5)**
```
Data: 05/09/2025
Duração: 15min

👤 DESENVOLVEDOR 1:
- Ontem: Concluí setup do Next.js e Tailwind
- Hoje: Vou implementar telas de login/cadastro  
- Impedimentos: Nenhum

👤 DESENVOLVEDOR 2:
- Ontem: Configurei banco Neon e schema Prisma
- Hoje: Vou criar APIs de autenticação
- Impedimentos: Aguardando aprovação do wireframe

👤 SCRUM MASTER:
- Observações: No prazo, 17 SP restantes
- Ações: Revisar wireframes com PO hoje

BURNDOWN: 17 SP restantes (dentro da meta)
```

---

## 🔍 **5. TEMPLATE - SPRINT REVIEW**

### **Sprint Review - Sprint 1**
```
Data: 14/09/2025
Duração: 2h
Participantes: Time + Stakeholders

AGENDA:
1. Apresentação da Meta da Sprint (10min)
2. Demonstração das funcionalidades (45min)
3. Feedback dos stakeholders (30min)
4. Revisão do Backlog (15min)
5. Próximos passos (20min)

DEMONSTRAÇÃO:
✅ Landing page responsiva
✅ Cadastro de usuários
✅ Login/logout funcional
✅ Criação de eventos
✅ Listagem de eventos
✅ Sistema deployado em produção

FEEDBACK COLETADO:
- "Interface muito profissional"
- "Gostaria de filtros de busca" → Backlog Sprint 2
- "Notificações seriam úteis" → Backlog Sprint 2

MÉTRICAS:
- 25/25 SP concluídos (100%)
- 0 bugs críticos
- Sistema estável em produção
```

---

## 🔄 **6. TEMPLATE - SPRINT RETROSPECTIVE**

### **Retrospective - Sprint 1**
```
Data: 14/09/2025
Duração: 1.5h
Participantes: Time Scrum

FORMATO: Start/Stop/Continue

🟢 START (Começar a fazer):
- Code reviews mais frequentes
- Testes automatizados
- Documentação técnica contínua

🔴 STOP (Parar de fazer):
- Commits muito grandes
- Desenvolvimento sem testes
- Reuniões longas sem foco

🔵 CONTINUE (Continuar fazendo):
- Daily Scrums de 15min
- Comunicação transparente
- Deploy contínuo
- Pair programming ocasional

AÇÕES PARA SPRINT 2:
1. Implementar testes unitários (Dev Team)
2. Criar template de PR (SM)  
3. Definir DoD mais específica (Time)

HAPPINESS METRIC: 😊😊😊😊😊 (5/5)
```

---

## 📋 **7. TEMPLATE - DEFINITION OF DONE**

### **DoD - Sistema 360**
```
Uma User Story está DONE quando:

DESENVOLVIMENTO:
□ Código implementado conforme critérios de aceite
□ Código commitado na branch main
□ Sem warnings/errors no TypeScript
□ Responsive design funcionando

QUALIDADE:
□ Testes manuais executados
□ Code review aprovado por peer
□ Funcionalidade testada em produção
□ Performance adequada

DOCUMENTAÇÃO:
□ README atualizado se necessário
□ Comentários no código quando complexo
□ API documentada se aplicável

DEPLOY:
□ Deploy em produção realizado
□ Funcionalidade acessível publicamente
□ Banco de dados atualizado
□ Sem quebras em funcionalidades existentes

ACEITAÇÃO:
□ Demo para Product Owner realizada
□ Feedback incorporado se necessário
□ PO aprovou a funcionalidade
□ Sprint Goal mantido
```

---

## 📊 **8. TEMPLATE - VELOCITY TRACKING**

### **Velocity - Sistema 360**
```
SPRINT 1: 25 SP (01/09 - 14/09)
- Planned: 25 SP
- Delivered: 25 SP
- Velocity: 25 SP

SPRINT 2: [Planejado] (15/09 - 28/09)
- Planned: 27 SP (baseado na Sprint 1)
- Capacity: Mesma equipe
- Velocity esperada: 25-30 SP

MÉTRICAS:
- Média de SP por sprint: 25
- Capacidade da equipe: 1.8 SP/dia
- Confiabilidade: 100% (1/1 sprints entregues)
```

---

## 🎯 **COMO USAR ESTES TEMPLATES:**

1. **Copie** os templates para seu Trello/Notion/Sheets
2. **Adapte** para sua realidade e projeto
3. **Atualize** regularmente durante as sprints
4. **Use** nas cerimônias Scrum
5. **Evolua** os templates baseado na experiência

---

**📚 Estes templates seguem as práticas padrão do Scrum Guide e são adaptados para projetos de desenvolvimento de software.**
