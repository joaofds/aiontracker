# Aion 2 Tracker

Checklist de progressão de **Aion 2** para uso pessoal e dos amigos do Discord.
Acompanha a progressão de endgame (fases), a rotina **diária** e **semanal** de cada personagem, com
contadores regressivos ao vivo até os resets e eventos recorrentes do jogo.

Inspirado em [guidemmo.com/checklist-aion-2](https://guidemmo.com/checklist-aion-2-en/)
e [aion2tracker.net](https://aion2tracker.net/), traduzido e adaptado para **PT-BR**.

> Projeto de fã, **não afiliado à NCSOFT**.

---

## ✨ Funcionalidades

- **Checklist por fases** — roadmap do nível 22 à raid de Ludra, baseado no
  [roadmap do DeanGamingTV](https://aion2.hartmannlab.xyz/en/roadmap): *Primeira semana* e as metas
  Level 45 → 1.000 → 1.400 → 1.900 → 2.100 → 2.800 GS → *Próximos objetivos*. Itens com selo
  **Main / Alts / Main + Alts / Opcional**, subgrupos dentro de cada meta e um **resumo das metas** no
  topo (progresso de cada uma, a meta atual destacada; clicar leva até ela).
- **Rotina por personagem** (aba Rotina) — um card para o **Main** e um para cada **alt**, com as
  tarefas agrupadas em *Diárias / Frequentes*, *Semanais*, *Lojas e Encomendas* e *Eventos do
  Abyss & Mundo*. Diárias resetam todo dia às 4h; o resto, no reset semanal. Dá para adicionar,
  renomear e remover alts e **editar as listas de tarefas** (Main e alts) direto pelo site.
  Lista padrão baseada na [checklist semanal do hartmannlab](https://aion2.hartmannlab.xyz/#/checklist).
- **Contadores ao vivo** (HH:MM:SS) até:
  - o reset diário (4h),
  - o reset semanal (quarta-feira 4h),
  - os eventos recorrentes do jogo: **Spacetime Rift**, **Watcher Kaira**, **Shugo Festival**,
    **Dimensional Invasion**, **Artifact Siege** (Seg/Qui/Sáb) e **Gartua**
    (horários globais em UTC, exibidos no seu fuso).
  - toggle **🔔 Alerta sonoro** no painel: toca um bipe e mostra uma notificação do sistema quando
    falta o tempo escolhido no seletor ao lado (1 a 15 min, padrão 2) para qualquer evento — também com a aba em segundo plano ou o navegador minimizado
    (a aba precisa estar aberta; o áudio é liberado após o primeiro clique na página).
    O 🔔 de cada card de evento liga/desliga o alerta só daquele evento (🔕).
  - durante um evento o card mostra **🟢 Agora** (e até quando, aproximadamente), em vez de pular
    direto para a próxima ocorrência; o resumo do painel também avisa "agora".
- **Navegação por abas** — Progressão · **Rotina** · **Guias** · **Classes**, fixas no topo ao rolar.
  Dentro de um card aberto (classe, Combat Power, fase…) aparece uma **barra de contexto** com o
  nome do card, as sub-abas, o seletor de build e um "Ir para…" com as seções, além de
  🔗 copiar link · ↑ topo do card · ✕ fechar. Um botão flutuante **↑** volta ao topo do card (ou da página).
- **Endereço na URL** — cada aba, card, sub-aba, build e seção tem um endereço
  (ex.: `#classes/cleric/guia/pve/gear`, `#guias/g-cp/daevanion`): dá para mandar o link
  direto no Discord, recarregar sem perder o lugar e usar o **Voltar** do navegador depois de
  trocar de aba ou seguir um atalho.
- **Seção de guias** — cards expansíveis com explicações (roadmap, gear score & encantamento,
  rotina diária/semanal, dungeons ★/Vakron & Gartua e **Recursos e energia** — de onde vem cada
  recurso, recompensas das Duty Quests e o que fazer sem energia). Itens da checklist têm um link **📖 guia** que
  leva direto ao guia relacionado.
- **Combat Power** (aba Guias) — lembrete das 10 fontes de poder do jogo (pets, Genus Insight,
  equipamento, Arcana, asas, títulos, skills/stigmas, Daevanion, skins e Pantheon) e do poder
  "invisível" que não aparece no número. Cada fonte tem itens para marcar o que você já usa
  (com contador; entram no Exportar/Importar) e atalhos para a seção certa do Guia de cada classe.
  Baseado no [guia do hartmannlab](https://aion2.hartmannlab.xyz/en/combat-power).
- **Guia de classes** — uma seção por classe (as 8 do lançamento), com símbolo, função, arma,
  foco, atributos recomendados, manastones, sinergias e dica de build. As **prioridades PvE e
  PvP** listam as melhores skills separadas por tipo (**Ativas · Passivas · Stigmas**), com a
  especialização recomendada de cada uma. Na sub-aba **Skills**, a lista completa da classe com
  filtro por tipo, ícone e atributos. Na sub-aba **Guia**, as builds de cada classe baseadas nos
  [guias do hartmannlab](https://aion2.hartmannlab.xyz/en/class-guides): skills com nível alvo e
  especializações, Arcana, Genus Insight, asas/títulos, Soul Binding, Manastones, Pantheon, layout e
  macro, em seções recolhíveis com índice. Cleric e Spirit Master têm uma build extra completa
  (rotação, equipamento peça a peça e Daevanion boards), com seletor entre as builds.
- **Barras de progresso** por fase e por personagem + **anel de progresso geral** (considera só as fases).
- **Destaque do próximo objetivo** — a primeira tarefa pendente de cada fase ganha um selo "Próximo".
- **Tema claro/escuro** com preferência salva.
- **Exportar / Importar** progresso via código — fases, personagens e listas de tarefas
  (ótimo para backup ou para levar para outro navegador). Códigos do formato antigo continuam sendo aceitos.
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
│   ├── js/
│   │   ├── config.js     # fuso, horários de reset, chaves do localStorage
│   │   ├── data/         # conteúdo editável
│   │   │   ├── checklist.js  # DATA (fases da progressão)
│   │   │   ├── routine.js    # ROUTINE_* (categorias e tarefas padrão da Rotina)
│   │   │   ├── events.js     # EVENTS (eventos recorrentes)
│   │   │   ├── guides.js     # GUIDES (aba Guias)
│   │   │   ├── combat-power.js # CP_GUIDE (card de Combat Power na aba Guias)
│   │   │   ├── classes.js    # CLASSES + PVP_NOTE (aba Classes)
│   │   │   ├── skills.js     # SKILLS (skills recomendadas por classe)
│   │   │   ├── class-guides.js # CLASS_GUIDES (sub-aba Guia de cada classe)
│   │   │   └── skill-db/     # SKILL_DB: index.js (formato) + um arquivo por classe (gerado)
│   │   ├── time.js       # fuso virtual, cálculo de resets/eventos, formatação
│   │   ├── state.js      # persistência + reset automático de diárias/semanais
│   │   ├── routine.js    # personagens, listas de tarefas e marcações da Rotina
│   │   ├── ui/           # renderização e interação
│   │   │   ├── board.js      # render geral, card recolhível, abas
│   │   │   ├── checklist.js  # fases + item de checkbox reutilizável + progresso
│   │   │   ├── routine.js    # aba Rotina (cards dos personagens + editor de tarefas)
│   │   │   ├── guides.js     # aba Guias
│   │   │   ├── combat-power.js # card de Combat Power (lembretes + atalhos p/ o Guia da classe)
│   │   │   ├── skill-db.js   # sub-aba Skills da classe (lista, filtros, ícones)
│   │   │   ├── class-guide.js  # sub-aba Guia da classe (builds, seções, seletor)
│   │   │   ├── classes.js    # aba Classes
│   │   │   ├── timers.js     # painel de contadores
│   │   │   ├── theme.js      # tema claro/escuro
│   │   │   ├── toolbar.js    # exportar / importar / resetar
│   │   │   └── nav.js        # endereço na URL, barra de contexto, botão "topo"
│   │   └── main.js       # boot
│   └── images/           # símbolos das classes (<id>.avif) + skills/<classe>/ (ícones)
│                         # + guides/<classe>/ e guides/common/ (prints dos guias de classe)
├── tools/
│   └── import-metabot.py # gera data/skill-db/*.js a partir do MetaBot.GG
└── README.md
```

> As imagens das classes ficam em `assets/images/` nomeadas pelo `id` da classe
> (ex.: `templar.avif`), carregadas por `assets/images/${id}.avif` no card.

> Os scripts são **clássicos** (não ES modules) para continuar funcionando abrindo o
> `index.html` direto do disco (`file://`). Eles compartilham o escopo global, então a
> **ordem dos `<script>` no `index.html` importa**: config → data → lógica → ui → `main.js`.
> Ao criar um arquivo novo, adicione-o no `index.html` na posição certa.

---

## ⚙️ Configuração

Todas as opções ficam em `assets/js/config.js`:

| Constante | Padrão | Descrição |
|---|---|---|
| `SERVER_UTC_OFFSET_HOURS` | `null` | Fuso usado nos contadores. `null` = fuso **local** do navegador. Para fixar no horário do servidor do jogo, informe o offset em horas (ex.: `2` para GMT+2, `-3` para GMT-3). |
| `RESET_HOUR` | `4` | Hora do reset diário (e do reset semanal). |
| `WEEKLY_RESET_DOW` | `3` | Dia do reset semanal. `0`=Domingo … `3`=Quarta. |
| `ALERT_LEAD_OPTIONS` | `[1, 2, 3, 5, 10, 15]` | Opções (em minutos) do seletor de antecedência do alerta sonoro, ao lado do toggle. |
| `ALERT_LEAD_DEFAULT` | `2` | Antecedência padrão do alerta, até o usuário escolher outra no seletor. |
| `EVENT_LIVE_MINUTES` | `10` | Por quantos minutos depois do início um evento aparece como "🟢 Agora" (eventos podem sobrescrever com `durationMinutes`). |

### Editar as fases
As fases da aba **Progressão** estão no array `DATA` em `assets/js/data/checklist.js`. Cada fase tem:

```js
{
  id: "meta-1000",           // identificador único da fase (também usado no endereço #progressao/meta-1000)
  badge: "Meta 2",
  title: "Do 45 aos 1.000 GS e terminar a MSQ",
  target: "1.000 GS",        // opcional: meta (selo no card e etapa no resumo do topo)
  subtitle: "...",
  tip: "...",                // opcional: aviso no topo da fase
  items: [
    { heading: "No seu mapa" },  // subtítulo (não conta no progresso)
    { id: "monolith", text: "Penas do seu mapa", note: "texto opcional menor",
      tag: "main",              // opcional: "main" | "alt" | "ma" (Main + Alts) | "opt" (Opcional)
      guide: "g-gearscore" },   // opcional: botão 📖 guia
    // ...
  ],
}
```

> **Importante:** o `id` de cada item é a chave usada no `localStorage`.
> Se você renomear um `id`, o progresso salvo daquele item é perdido.

### Editar a rotina padrão
A lista padrão da aba **Rotina** fica em `assets/js/data/routine.js`:

- `ROUTINE_CATEGORIES` — categorias exibidas nos cards, na ordem, e quando resetam
  (`reset: "daily"` às `RESET_HOUR`; `reset: "weekly"` no reset semanal).
- `ROUTINE_TASKS` — todas as tarefas padrão: `{ cat, text, note? }`, indexadas pelo `id`.
- `ROUTINE_DEFAULTS` — a lista (ordem) de `id`s do **Main** e das **alts**. Uma tarefa pode
  aparecer nas duas listas.

```js
const ROUTINE_TASKS = {
  "abyss-shop": { cat: "shops", text: "Abyss Shop", note: "PvP Manastone/Soulstone, ..." },
};
const ROUTINE_DEFAULTS = { main: ["duty-quests", "abyss-shop", /* ... */], alt: [/* ... */] };
```

Mudanças no texto de uma tarefa padrão aparecem para todo mundo. Já a **lista** de cada
usuário fica salva no navegador dele (ele pode ter removido/adicionado tarefas): tarefas novas
em `ROUTINE_DEFAULTS` só aparecem para quem usar **Editar tarefas › Restaurar tarefas padrão**
(ou para novos usuários).

### Editar os guias
O conteúdo da aba **Guias** está no array `GUIDES` em `assets/js/data/guides.js`. Cada guia tem um
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

O `guide` aceita `"guia#ancora"` para rolar até um trecho do guia — o elemento com id
`guia-ancora` (ex.: `guide: "g-cp#daevanion"` abre o card de Combat Power em `#g-cp-daevanion`).

### Navegação e endereços (URL)
`assets/js/ui/nav.js` cuida de três coisas:

- **Endereço** (`#aba/card/sub-aba/build/seção`) — o card é o `data-class`, `data-guide` ou
  `data-id` do card no board; nas classes, a sub-aba é `skills` ou `guia` (Visão geral não
  aparece), seguida da build (só quando a classe tem mais de uma) e do `id` da seção; nos guias,
  a âncora (`#guias/g-cp/daevanion` → elemento `#g-cp-daevanion`). Use `navigate({ tab, card, rest },
  { push: true })` para ir a um lugar gravando no histórico — `openGuide` e `openClassGuide`
  passam por ele. Trocar de aba e seguir atalhos grava no histórico; rolar e abrir cards só
  atualizam o endereço (sem encher o Voltar).
- **Barra de contexto** — aparece quando o cabeçalho de um card aberto sobe atrás das abas;
  os botões dela só repassam o clique para os controles reais do card.
- **Recuo de rolagem** — as alturas do cabeçalho e das abas são medidas em `--header-h` e
  `--nav-h`, e `--scroll-offset` (CSS) define onde os alvos param ao rolar. Elementos novos que
  sejam destino de rolagem devem entrar na regra de `scroll-margin-top` do `styles.css`.

### Editar o guia de Combat Power
O card **Combat Power** da aba Guias vem de `CP_GUIDE` em `assets/js/data/combat-power.js`.
`sources` são as fontes de poder (um card cada) e `invisible`, os grupos do "poder invisível":

```js
{ id: "genus", icon: "🧬", title: "Genus Insight",
  how: ["Como funciona..."],             // lista de explicações
  where: ["Shugo Festival", "Nightmare"], // opcional: onde conseguir (pills)
  classGuide: "genus",                    // opcional: seção do Guia da classe ("O que escolher")
  checks: [{ id: "cp-genus-10", text: "Todo o Genus Insight no nível 10", note: "opcional" }] }
```

Os `checks` são salvos em `state.checks` junto com as fases (por isso entram no Exportar/Importar
e no Resetar tudo, mas não no anel de progresso). Use ids com o prefixo `cp-` e não os renomeie,
pela mesma razão das fases. O `classGuide` é o `id` de uma seção de `CLASS_GUIDES`
(`skills`, `arcana`, `genus`, `wings-titles`, `gear`, `pantheon`, `boards`); se a classe não tiver
a seção, o atalho abre o Guia dela no topo.

### Editar as classes
A aba **Classes** vem do array `CLASSES` em `assets/js/data/classes.js`. Cada classe tem `id`,
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

As **skills mais fortes** ficam no mapa `SKILLS` (`assets/js/data/skills.js`), indexado pelo `id` da classe. Cada
modo (`pve`/`pvp`) é dividido por tipo — `active`, `passive`, `stigma` — e cada skill é
`{ n: "Nome", d: "descrição curta", spec: "especialização recomendada" }` (`spec` é
opcional; nomes em inglês):

```js
SKILLS.templar = {
  pve: {
    active:  [ { n: "Judgment", d: "principal dano...", spec: "Remove cooldown (lvl 16)", pick: [5] } ],
    passive: [ { n: "Fury", d: "buff de dano ao grupo" } ],
    stigma:  [ { n: "Doom Shield", d: "dispara Judgment (core)", spec: "reseta Annihilate (lvl 5)", pick: [1] } ],
  },
  pvp: { active: [ /* ... */ ], passive: [ /* ... */ ], stigma: [ /* ... */ ] },
};
```

`pick` (opcional) liga a recomendação às especializações reais do banco de skills: são os
**números** das especializações recomendadas, na ordem do jogo (a mesma da lista em
`SKILL_DB[...].specs`, 1 = primeira). Com ele, a visão geral mostra "★ Esp. 5 · …" e a sub-aba
**Skills** destaca a especialização com ★ e o modo (PvE/PvP). Sem `pick`, o `spec` aparece só
como texto. Ao atualizar os dados com o importador, confira se a ordem das especializações não
mudou no patch.

Fontes dos dados: [wikily.gg](https://wikily.gg/aion-2/skills) (tipos de skill por classe)
e guias de build ([corpus.gg](https://corpus.gg/), entre outros) para prioridades e
especializações. Revise conforme o patch — o meta, sobretudo de PvP, ainda está em formação.

### Guias de build (sub-aba "Guia" da classe)
As builds ficam em `CLASS_GUIDES` (`assets/js/data/class-guides.js`), indexado pelo `id` da classe.
Cada classe tem uma **lista** de builds; com mais de uma, a sub-aba mostra um seletor. Classes sem
entrada não ganham a sub-aba. O formato completo dos blocos (`skills`, `ranked`, `defs`, `table`,
`images`, `links`, `tip`) e dos selos **TW/KR** / **S2** está documentado no topo do arquivo.

- **`hartmannBuild({...})`** monta uma build no formato das *old builds* do
  [hartmannlab](https://aion2.hartmannlab.xyz/en/class-guides): as partes iguais para todas as
  classes (Genus Insight, asas, títulos, armas, Pantheon…) ficam no próprio helper; a classe só
  informa skills, passivas, stigmas, Arcana, asas do meta, acessórios, Manastones e o layout/macro.
- **Cleric PvE** e **Spirit Master Global Season 1** são builds completas (rotação, equipamento
  peça a peça, Daevanion boards), cujas seções foram geradas a partir da base de dados do
  gerador de builds do site.
- Nomes de skill devem bater com o `SKILL_DB` da classe (o card puxa ícone e o texto das
  especializações por eles); sufixos entre parênteses, como `"Taunt (essencial)"`, são ignorados
  na busca.
- Prints de layout e macro ficam em `assets/images/guides/<classe>/`; os da configuração da macro,
  iguais para todos, em `assets/images/guides/common/`.

### Banco de skills (sub-aba "Skills" da classe)
Cada card de classe tem as sub-abas **Visão geral** (o conteúdo acima), **Skills** e **Guia** (seção anterior). A **Skills** tem a
lista completa da classe (ativas, passivas e stigmas), filtro por tipo, nível, custo, cooldown,
alcance e o efeito no nível 1. Clique na skill para ver o efeito inteiro e as **especializações**
(o selo "N esp." indica quantas ela tem), com o nível mínimo de cada uma; as recomendadas
(`pick` em `SKILLS`) aparecem com ★. Skills que aparecem em
`SKILLS` ganham os selos **PvE**/**PvP** de recomendada.

Os dados ficam em `assets/js/data/skill-db/` — um arquivo por classe, que preenche
`SKILL_DB.<id-da-classe>` (o `index.js` declara o `SKILL_DB` e documenta o formato):

```js
SKILL_DB.templar = [
  { id: "judgment", name: "Judgment", type: "active",          // obrigatórios
    level: 16, cost: "120 MP", cooldown: "20s", range: "4m",
    desc: "Efeito no nível 1.", source: "https://metabot.gg/...", icon: "judgment.webp",
    specs: [ { level: 8, text: "Critical Hit on hit" } ] },   // especializações, na ordem do jogo
];
```

- São arquivos `.js` (e não `.json`) porque `fetch` de `.json` é bloqueado ao abrir o site
  direto do disco (`file://`). O conteúdo é JSON com `SKILL_DB.<classe> =` na frente.
- Campos não preenchidos aparecem como "—"; sem `icon`, o card mostra as iniciais da skill
  na cor da classe. Ícones ficam em `assets/images/skills/<id-da-classe>/<icon>`.
- Ao criar o arquivo de uma classe nova, adicione o `<script>` dele no `index.html`
  (depois de `data/skill-db/index.js`).

#### Atualizar os dados (MetaBot.GG)
Os arquivos são gerados a partir do [MetaBot.GG](https://metabot.gg/en/aion-2/classes):

```bash
python3 tools/import-metabot.py                     # dados de todas as classes
python3 tools/import-metabot.py gladiator           # só uma
python3 tools/import-metabot.py --icons chanter     # dados + ícones que faltam
```

O script usa só a biblioteca padrão do Python e faz uma requisição a cada 2 s: a página da classe
e a página de cada skill (efeito completo + especializações) — ~1,5 min por classe, ~10 min
para todas.

**Licença dos dados** ([termos do MetaBot.GG](https://metabot.gg/en/legal/terms-of-service),
seção *Data Usage & Attribution*): o reuso é permitido desde que cada dado credite o MetaBot.GG
com um link **sem** `rel="nofollow"`/`"sponsored"`/`"ugc"` para a página de onde veio, sem
apresentar os dados como nossos e acessando o site numa taxa razoável. Por isso cada skill guarda
o `source` e a lista mostra o link "MetaBot.GG ↗" — **não remova esses links**.

**Ícones** (só com `--icons`): vão para `assets/images/skills/<classe>/<id>.webp`, reduzidos para
72 px se o [Pillow](https://pypi.org/project/pillow/) estiver instalado (senão, o original de
256 px). Ícones já baixados são reaproveitados — rodar sem `--icons` não os apaga e mantém o
`icon` no `.js`. Skills que o MetaBot.GG não tem ícone ficam com as iniciais.

> **Atenção com os ícones:** são assets da NCSOFT — a licença do MetaBot.GG cobre os dados, não
> os ícones. Estão aqui para uso pessoal e não comercial. A diretriz de fã do AION 2 só licencia
> materiais liberados expressamente (fan kit) e proíbe redistribuí-los como coleção; se o site for
> publicado, mantenha os créditos e remova os ícones se a NCSOFT pedir (autorização formal:
> <https://help.plaync.com/>).
>
> **Não copie dados de shugo.gg nem de wikily.gg**: os termos de uso dos dois proíbem scraping
> e redistribuição.

### Adicionar um evento recorrente
No array `EVENTS` em `assets/js/data/events.js`. Cada evento vira um card de contador no topo:

```js
const EVENTS = [
  // Horários fixos diários (UTC): Spacetime Rift no servidor SA, 11:00–02:00 BRT a cada 3h:
  { id: "spacetime-rift", icon: "🌌", label: "Spacetime Rift", hours: [14, 17, 20, 23, 2, 5], utc: true },
  // Eventos globais (instante fixo em UTC, exibidos no seu fuso local):
  { id: "dimensional-invasion", icon: "👾", label: "Dimensional Invasion", intervalHours: 1, anchorHour: 0, anchorMinute: 30, utc: true },
  // Evento em dias fixos da semana (UTC): Siege às Seg/Qui/Sáb 21:00 UTC:
  { id: "artifact-siege", icon: "🏰", label: "Artifact Siege", days: [1, 4, 6], anchorHour: 21, anchorMinute: 0, utc: true },
  // Evento ancorado no fuso configurado do site (sem `utc`):
  { id: "gartua", icon: "🌀", label: "Gartua", intervalHours: 12, anchorHour: 6 },
];
```

- `intervalHours` — de quanto em quanto tempo o evento ocorre (eventos de intervalo).
- `days` — lista de dias da semana (`0`=Dom … `6`=Sáb) para eventos semanais em dias fixos,
  no horário `anchorHour`/`anchorMinute`. Quando presente, substitui `intervalHours`.
- `hours` — lista de horários fixos diários (no minuto `anchorMinute`), para eventos que só
  ocorrem em certas horas do dia. Quando presente, substitui `intervalHours`/`anchorHour`.
- `anchorHour` / `anchorMinute` — horário base do ciclo (`anchorMinute` é opcional, padrão `0`).
- `durationMinutes` — opcional; por quanto tempo o card mostra "🟢 Agora" depois do início
  (padrão `EVENT_LIVE_MINUTES`). As durações são estimativas: ajuste conforme o jogo.
- `utc: true` — `anchorHour`/`anchorMinute`/`hours` são em **UTC** (instante fixo global; o card
  mostra o próximo horário já convertido para o seu fuso). Sem `utc`, a âncora usa o fuso
  configurado do site (`SERVER_UTC_OFFSET_HOURS`).

> Horários (em UTC) conferidos cruzando [corpus.gg](https://corpus.gg/games/aion-2/timers) e
> [aion2rifttimer.app](https://aion2rifttimer.app/blog/aion-2-event-schedule-explained), que
> concordam na grade. Siege: Seg/Qui/Sáb 21:00 UTC. São horários observados pela comunidade
> (não publicados oficialmente); confirme no contador do próprio jogo (Journal › Duty).

---

## 🔁 Como funcionam os resets

- As tarefas da categoria **Diárias / Frequentes** resetam todo dia às `RESET_HOUR` (4h).
- As demais categorias da rotina (**Semanais**, **Lojas**, **Eventos**) resetam no dia
  `WEEKLY_RESET_DOW` (quarta) às `RESET_HOUR`.
- O reset é calculado por **chave de período**: a cada novo ciclo os checkboxes
  correspondentes são limpos automaticamente — funciona mesmo que você não abra o
  site na hora exata. Com a aba aberta, a verificação roda a cada segundo.
- O progresso das **fases** é permanente (só zera via "Resetar tudo").

---

## 💾 Dados e privacidade

- Tudo é salvo **localmente** no seu navegador (`localStorage`, chave `aion2-tracker-v1`;
  tema em `aion2-tracker-theme`; painel de contadores aberto/fechado em
  `aion2-tracker-timers-open`; alerta sonoro ligado/desligado em `aion2-tracker-event-alerts` antecedência em `aion2-tracker-event-alert-lead` e eventos silenciados em `aion2-tracker-event-alerts-muted`). As chaves ficam definidas em `assets/js/config.js`.
- Nada é enviado para servidores. Limpar os dados do navegador apaga o progresso.
- Use **Exportar** para fazer backup/compartilhar e **Importar** para restaurar.

---

## 🛠️ Tecnologias

HTML, CSS e JavaScript puro (sem frameworks, sem build).
Fontes via Google Fonts (*Cinzel* e *Inter*).
