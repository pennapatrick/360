# 📊 SCRIPTS PARA GRÁFICOS E MÉTRICAS - Sistema 360

## 🔥 **1. BURNDOWN CHART - EXCEL/GOOGLE SHEETS**

### **Dados para copiar:**
```
Dia	SP_Restantes	SP_Ideais	Data
1	25	23	01/09
2	25	21	02/09
3	17	19	03/09
4	17	17	04/09
5	12	15	05/09
6	9	13	06/09
7	9	11	07/09
8	6	9	08/09
9	3	7	09/09
10	3	5	10/09
11	1	3	11/09
12	0	1	12/09
13	0	0	13/09
14	0	0	14/09
```

### **Fórmulas Excel:**
```excel
// SP Ideais (coluna C)
=MAX(0;$B$2-((LINHA()-2)*($B$2/$A$15)))

// % Progresso
=1-B2/$B$2

// Velocity média
=MÉDIA(B2:B15)
```

---

## 📈 **2. VELOCITY CHART - DADOS**

### **Para gráfico de barras:**
```
Sprint	Committed	Completed	Velocity
Sprint 1	25	25	25
Sprint 2	27	[TBD]	[TBD]
Sprint 3	28	[TBD]	[TBD]
```

---

## 🎯 **3. CUMULATIVE FLOW DIAGRAM**

### **Estados das tarefas por dia:**
```
Data	To_Do	In_Progress	Testing	Done
01/09	8	0	0	0
02/09	8	0	0	0
03/09	5	3	0	0
04/09	5	3	0	0
05/09	3	3	1	1
06/09	2	2	1	3
07/09	2	2	1	3
08/09	1	2	1	4
09/09	0	1	1	6
10/09	0	1	1	6
11/09	0	0	1	7
12/09	0	0	0	8
13/09	0	0	0	8
14/09	0	0	0	8
```

---

## 📊 **4. CÓDIGO PYTHON - BURNDOWN AUTOMÁTICO**

### **Script para gerar burndown:**
```python
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime, timedelta

# Dados da Sprint 1
sprint_data = {
    'dia': list(range(1, 15)),
    'sp_restantes': [25,25,17,17,12,9,9,6,3,3,1,0,0,0],
    'sp_ideais': [23,21,19,17,15,13,11,9,7,5,3,1,0,0],
    'datas': pd.date_range('2024-09-01', periods=14)
}

df = pd.DataFrame(sprint_data)

# Criar gráfico
plt.figure(figsize=(12, 8))
plt.plot(df['dia'], df['sp_restantes'], 'o-', color='red', 
         linewidth=2, label='Story Points Restantes', markersize=6)
plt.plot(df['dia'], df['sp_ideais'], '--', color='blue', 
         linewidth=2, label='Linha Ideal')

# Configurar gráfico
plt.title('Sprint 1 Burndown Chart - Sistema 360', fontsize=16, fontweight='bold')
plt.xlabel('Dias da Sprint', fontsize=12)
plt.ylabel('Story Points', fontsize=12)
plt.grid(True, alpha=0.3)
plt.legend(fontsize=12)
plt.xlim(1, 14)
plt.ylim(0, 26)

# Adicionar anotações importantes
plt.annotate('Setup Completo', xy=(3, 17), xytext=(4, 20),
            arrowprops=dict(arrowstyle='->', color='green'))
plt.annotate('MVP Entregue', xy=(12, 0), xytext=(10, 5),
            arrowprops=dict(arrowstyle='->', color='green'))

plt.tight_layout()
plt.savefig('burndown_sprint1.png', dpi=300, bbox_inches='tight')
plt.show()

# Calcular métricas
velocity = 25 / 14
completion_rate = 100
early_completion = 2  # dias

print(f"""
📊 MÉTRICAS SPRINT 1:
• Velocity: {velocity:.1f} SP/dia
• Taxa de conclusão: {completion_rate}%
• Entregue {early_completion} dias antes
• Eficiência da equipe: Excelente
""")
```

---

## 📈 **5. CÓDIGO JAVASCRIPT - CHART.JS**

### **Para web dashboard:**
```javascript
// Burndown Chart com Chart.js
const ctx = document.getElementById('burndownChart').getContext('2d');
const burndownChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Dia 1', 'Dia 2', 'Dia 3', 'Dia 4', 'Dia 5', 
                'Dia 6', 'Dia 7', 'Dia 8', 'Dia 9', 'Dia 10',
                'Dia 11', 'Dia 12', 'Dia 13', 'Dia 14'],
        datasets: [{
            label: 'Story Points Restantes',
            data: [25,25,17,17,12,9,9,6,3,3,1,0,0,0],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            tension: 0.1,
            fill: true
        }, {
            label: 'Linha Ideal',
            data: [23,21,19,17,15,13,11,9,7,5,3,1,0,0],
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'transparent',
            borderDash: [5, 5],
            tension: 0.1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Sprint 1 Burndown - Sistema 360'
            },
            legend: {
                position: 'top',
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 26,
                title: {
                    display: true,
                    text: 'Story Points'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Dias da Sprint'
                }
            }
        }
    }
});
```

---

## 📊 **6. MÉTRICAS AUTOMÁTICAS - JSON**

### **Para dashboards dinâmicos:**
```json
{
  "sprint1": {
    "meta": "MVP funcional com autenticação e eventos",
    "periodo": "01/09 - 14/09",
    "metricas": {
      "story_points": {
        "planejado": 25,
        "entregue": 25,
        "percentual": 100
      },
      "velocity": {
        "media_por_dia": 1.79,
        "total_sprint": 25,
        "projecao_sprint2": 27
      },
      "qualidade": {
        "bugs_encontrados": 0,
        "code_reviews": 8,
        "deploy_sucessos": 5
      },
      "tempo": {
        "dias_previstos": 14,
        "dias_utilizados": 12,
        "antecipacao": 2
      }
    },
    "epicos": [
      {
        "nome": "Infraestrutura",
        "sp_planejado": 8,
        "sp_entregue": 8,
        "status": "concluido"
      },
      {
        "nome": "Autenticação",
        "sp_planejado": 8,
        "sp_entregue": 8,
        "status": "concluido"
      },
      {
        "nome": "Gestão de Eventos",
        "sp_planejado": 5,
        "sp_entregue": 5,
        "status": "concluido"
      },
      {
        "nome": "Deploy e Testes",
        "sp_planejado": 4,
        "sp_entregue": 4,
        "status": "concluido"
      }
    ]
  }
}
```

---

## 🎯 **7. GOOGLE SHEETS - FÓRMULAS AVANÇADAS**

### **Calculadora de métricas:**
```
// Velocity calculation
=SUMPRODUCT((C2:C15)*(B2:B15<>B3:B16))/14

// Completion rate  
=(MAX(B2:B15)-MIN(B2:B15))/MAX(B2:B15)*100

// Days ahead/behind
=14-MATCH(0,B2:B15,0)+1

// Burndown efficiency
=1-(AVERAGE(ABS(B2:B15-C2:C15))/MAX(B2:B15))
```

---

## 📱 **8. MOBILE DASHBOARD - REACT NATIVE**

### **Component para métricas:**
```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SprintMetrics = () => {
  const data = {
    labels: ['D1', 'D3', 'D5', 'D7', 'D9', 'D11', 'D13'],
    datasets: [
      {
        data: [25, 17, 12, 9, 3, 1, 0],
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [23, 19, 15, 11, 7, 3, 0],
        color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
        strokeWidth: 2
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sprint 1 - Burndown</Text>
      <LineChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 }
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};
```

---

## 🔧 **INSTRUÇÕES DE USO:**

### **Para Excel/Google Sheets:**
1. Copie os dados da seção 1
2. Cole em planilha nova
3. Selecione dados e insira gráfico de linhas
4. Formate cores: vermelho para real, azul tracejado para ideal

### **Para Python:**
1. Instale: `pip install matplotlib pandas`
2. Execute o script da seção 4
3. Imagem será salva como `burndown_sprint1.png`

### **Para Web:**
1. Inclua Chart.js: `<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>`
2. Adicione o código JavaScript da seção 5
3. Crie elemento: `<canvas id="burndownChart"></canvas>`

---

**💡 Use estes scripts para criar visualizações profissionais das suas métricas Scrum!**
