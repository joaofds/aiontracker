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
- **Navegação por abas** — Progressão · Diárias · Semanais · **Guias** · **Classes**.
- **Seção de guias** — cards expansíveis com explicações (roadmap, gear score & encantamento,
  rotina diária/semanal e Vakron & Gartua). Itens da checklist têm um link **📖 guia** que
  leva direto ao guia relacionado.
- **Guia de classes** — uma seção por classe (as 8 do lançamento), com símbolo, função, arma,
  foco, atributos recomendados, manastones, sinergias e dica de build. As **prioridades PvE e
  PvP** listam as melhores skills separadas por tipo (**Ativas · Passivas · Stigmas**), com a
  especialização recomendada de cada uma.
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
├── index.html            # estrutura da página
├── assets/
│   ├── css/styles.css    # estilos (tema claro/escuro, layout, animações)
│   ├── js/script.js      # dados, renderização, timers, persistência
│   └── images/           # símbolos das classes (<id>.avif)
└── README.md
```

> As imagens das classes ficam em `assets/images/` nomeadas pelo `id` da classe
> (ex.: `templar.avif`), carregadas por `assets/images/${id}.avif` no card.

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

### Editar os guias
O conteúdo da aba **Guias** está no array `GUIDES` do `script.js`. Cada guia tem um
`id`, `icon`, `title`, `summary` e `html` (conteúdo em HTML — parágrafos, listas e
caixas de dica `<div class="tip">`):

```js
{ id: "g-gearscore", icon: "⚔️", title: "Gear Score & encantamento",
  summary: "Resumo curto que aparece no card.",
  html: `<p>Conteúdo...</p><div class="tip"><b>Dica:</b> ...</div>` }
```

Para ligar um item da checklist a um guia, adicione o campo `guide` ao item com o
`id` do guia (gera o botão **📖 guia**):

```js
{ id: "gear-enchant", text: "Equipamento encantado...", guide: "g-gearscore" }
```

### Editar as classes
A aba **Classes** vem do array `CLASSES` no `script.js`. Cada classe tem `id`,
`color` (cor da função, usada no símbolo e no selo), `name`, `role`, `weapon`, `focus`,
`stats` (lista de atributos → chips), `pve` e `pvp` (prioridade de stats por modo),
`manastones`, `synergy` e `tip`. O símbolo vem de `assets/images/<id>.avif`:

```js
{ id: "templar", color: "#4d82ff",
  role: "Tanque", weapon: "Espada longa & Escudo",
  focus: "...", stats: ["Defense", "HP", "Block"],
  pve: "...", pvp: "...",
  manastones: "...", synergy: "...", tip: "..." }
```

As **skills mais fortes** ficam no mapa `SKILLS`, indexado pelo `id` da classe. Cada
modo (`pve`/`pvp`) é dividido por tipo — `active`, `passive`, `stigma` — e cada skill é
`{ n: "Nome", d: "descrição curta", spec: "especialização recomendada" }` (`spec` é
opcional; nomes em inglês):

```js
SKILLS.templar = {
  pve: {
    active:  [ { n: "Judgment", d: "principal dano...", spec: "Remove cooldown (Rank 16)" } ],
    passive: [ { n: "Fury", d: "buff de dano ao grupo" } ],
    stigma:  [ { n: "Doom Shield", d: "dispara Judgment (core)", spec: "reseta Annihilate (Rank 5)" } ],
  },
  pvp: { active: [ /* ... */ ], passive: [ /* ... */ ], stigma: [ /* ... */ ] },
};
```

Fontes dos dados: [wikily.gg](https://wikily.gg/aion-2/skills) (tipos de skill por classe)
e guias de build ([corpus.gg](https://corpus.gg/), entre outros) para prioridades e
especializações. Revise conforme o patch — o meta, sobretudo de PvP, ainda está em formação.

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
