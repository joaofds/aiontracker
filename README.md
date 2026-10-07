# Aion 2 Tracker

Checklist de progressão de **Aion 2** para uso pessoal e dos amigos do Discord.
Acompanha a progressão de endgame (fases), tarefas **diárias** e **semanais**, com
contadores regressivos ao vivo até os resets e eventos recorrentes do jogo.

Inspirado em [guidemmo.com/checklist-aion-2](https://guidemmo.com/checklist-aion-2-en/)
e [aion2tracker.net](https://aion2tracker.net/), traduzido e adaptado para **PT-BR**.

> Projeto de fã, **não afiliado à NCSOFT**.

---

## ✨ Funcionalidades

- **Checklist por fases** — roadmap da Level 45 até o endgame (1.600–2.100 de Gear Score).
- **Tarefas diárias e semanais** com reset automático.
- **Contadores ao vivo** (HH:MM:SS) até:
  - o reset diário (5h),
  - o reset semanal (quarta-feira 5h),
  - o próximo **Gartua** (evento recorrente a cada 12h).
- **Navegação por abas** — Progressão · Diárias · Semanais.
- **Barras de progresso** por seção + **anel de progresso geral** (considera só as fases).
- **Destaque do próximo objetivo** — a primeira tarefa pendente de cada fase ganha um selo "Próximo".
- **Tema claro/escuro** com preferência salva.
- **Exportar / Importar** progresso via código (ótimo para comparar/compartilhar no Discord).
- **Persistência local** (`localStorage`) — sem login, sem servidor.

---

## 🚀 Como usar

Basta abrir o arquivo `index.html` no navegador (duplo clique). Não há build nem dependências.

### Hospedar para os amigos
Como são apenas arquivos estáticos, é só subir a pasta em qualquer hospedagem gratuita:

- **GitHub Pages** — suba o repositório e ative o Pages.
- **Netlify** / **Cloudflare Pages** — arraste a pasta ou conecte o repositório.

---

## 📁 Estrutura do projeto

```
rpgtracker/
├── index.html    # estrutura da página
├── styles.css    # estilos (tema claro/escuro, layout, animações)
├── script.js     # dados, renderização, timers, persistência
└── README.md
```

> `main.py` presente na pasta não faz parte do tracker.

---

## ⚙️ Configuração

Todas as opções ficam no topo do `script.js`:

| Constante | Padrão | Descrição |
|---|---|---|
| `SERVER_UTC_OFFSET_HOURS` | `null` | Fuso usado nos contadores. `null` = fuso **local** do navegador. Para fixar no horário do servidor do jogo, informe o offset em horas (ex.: `2` para GMT+2, `-3` para GMT-3). |
| `RESET_HOUR` | `5` | Hora do reset diário (e do reset semanal). |
| `WEEKLY_RESET_DOW` | `3` | Dia do reset semanal. `0`=Domingo … `3`=Quarta. |

### Editar as tarefas
O conteúdo da checklist está no array `DATA` do `script.js`. Cada seção tem:

```js
{
  id: "fase1",            // identificador único da seção
  type: "phase",          // "phase" | "daily" | "weekly"
  tab: "progressao",      // aba: "progressao" | "daily" | "weekly"
  badge: "Fase 1",
  title: "Da Level 45 ao Gear Score",
  subtitle: "...",
  items: [
    { id: "lvl45", text: "Level 45 alcançado...", note: "texto opcional menor" },
    // ...
  ],
}
```

> **Importante:** o `id` de cada item é a chave usada no `localStorage`.
> Se você renomear um `id`, o progresso salvo daquele item é perdido.

### Adicionar um evento recorrente
No array `EVENTS`:

```js
const EVENTS = [
  { id: "gartua", icon: "🌀", label: "Gartua", intervalHours: 12, anchorHour: 6 },
  // intervalHours: de quanto em quanto tempo o evento ocorre
  // anchorHour: hora "base" (no fuso configurado) para ancorar o ciclo
];
```

---

## 🔁 Como funcionam os resets

- As tarefas **diárias** resetam todo dia às `RESET_HOUR` (5h).
- As tarefas **semanais** resetam no dia `WEEKLY_RESET_DOW` (quarta) às `RESET_HOUR`.
- O reset é calculado por **chave de período**: a cada novo ciclo os checkboxes
  correspondentes são limpos automaticamente — funciona mesmo que você não abra o
  site na hora exata. Com a aba aberta, a verificação roda a cada segundo.
- O progresso das **fases** é permanente (só zera via "Resetar tudo").

---

## 💾 Dados e privacidade

- Tudo é salvo **localmente** no seu navegador (`localStorage`, chave `aion2-tracker-v1`;
  tema em `aion2-tracker-theme`).
- Nada é enviado para servidores. Limpar os dados do navegador apaga o progresso.
- Use **Exportar** para fazer backup/compartilhar e **Importar** para restaurar.

---

## 🛠️ Tecnologias

HTML, CSS e JavaScript puro (sem frameworks, sem build).
Fontes via Google Fonts (*Cinzel* e *Inter*).
