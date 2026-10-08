/* ============================================================
   Aion 2 Tracker
   - checklist de progressão (fases) + diárias + semanais
   - contadores ao vivo de reset e eventos recorrentes
   - abas, tema claro/escuro, export/import, destaque do próximo
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURAÇÃO DE FUSO
   SERVER_UTC_OFFSET_HOURS: deixe null para usar o fuso LOCAL do
   navegador. Para fixar no horário do servidor do jogo, coloque
   o offset em horas (ex.: 2 = GMT+2, -3 = GMT-3).
   ------------------------------------------------------------ */
const SERVER_UTC_OFFSET_HOURS = null;
const RESET_HOUR = 5;          // reset diário às 5h
const WEEKLY_RESET_DOW = 3;    // 0=Dom ... 3=Qua (reset semanal na quarta às 5h)

/* ============================================================
   Dados
   ============================================================ */
const DATA = [
  {
    id: "fase1", type: "phase", tab: "progressao",
    badge: "Fase 1", title: "Da Level 45 ao Gear Score",
    subtitle: "Base da progressão — prepare tudo antes de focar no gear score.",
    items: [
      { id: "lvl45", text: "Level 45 alcançado, quest principal concluída" },
      { id: "monolith", text: "Monolith nível 30", note: "penas da sua região" },
      { id: "explo-asmo", text: "100% de exploração no lado Asmodian" },
      { id: "explo-elyos", text: "100% de exploração no lado Elyos", note: "invadindo pelas Rifts" },
      { id: "orb-chests", text: "10 baús de Orbe abertos em Strongholds", note: "conquista" },
      { id: "abyss-feathers", text: "100% das penas do Abyss coletadas" },
      { id: "azphel", text: "Azphel Daevanions comprados", note: "na loja do Abyss" },
      { id: "altgard-contracts", text: "Os 12 contratos de Altgard" },
      { id: "abyss-contracts", text: "Os 20 contratos do Abyss" },
      { id: "daily-quests-p1", text: "Quests diárias em dia" },
      { id: "side-quests", text: "100% das side quests (verdes)" },
      { id: "amulet-belt", text: "Amuleto e cinto melhorados para dourado" },
      { id: "shugo", text: "Shugo concluído, Daevanions coletados na loja Shugo" },
      { id: "nightmare", text: "Nightmare concluído, tokens gastos em Daevanions" },
    ],
  },
  {
    id: "fase2", type: "phase", tab: "progressao",
    badge: "Meta 1", title: "Alcançar 1.400 de Gear Score",
    subtitle: "Encantamentos e manastones no ponto certo — sem exageros.",
    items: [
      { id: "clash-runes", text: "Ambas as Clash Runes equipadas e encantadas em +1", note: "não mais que isso", guide: "g-gearscore" },
      { id: "gear-enchant", text: "Equipamento encantado entre +2 e +5 (+5 máx)", note: "com Manastones básicas encaixadas", guide: "g-gearscore" },
    ],
  },
  {
    id: "fase3", type: "phase", tab: "progressao",
    badge: "Fase 2", title: "Após 1.400 de GS: Vakron e Gartua",
    subtitle: "Conteúdo pós-1.400 para manter a evolução.",
    items: [
      { id: "vakron-exp", text: "Expedição Vakron: rodar a dungeon 1,5 vezes", guide: "g-vakron" },
      { id: "vakron-conq", text: "Conquista Vakron: encher uma pity completamente", guide: "g-vakron" },
      { id: "gartua", text: "Gartua a cada 12 horas", note: "veja o contador no topo", guide: "g-vakron" },
    ],
  },
  {
    id: "fase4", type: "phase", tab: "progressao",
    badge: "Fase 3", title: "Progressão 1.600 – 2.100",
    subtitle: "Reta de endgame.",
    items: [
      { id: "transcendence", text: "Atividades de Transcendência" },
      { id: "acc-farm", text: "Farm de acessórios", note: "opcional" },
      { id: "odyle-craft-extra", text: "Odyle produzido (craft) de apoio" },
      { id: "odyle-buy-extra", text: "Odyle comprado de apoio" },
    ],
  },
  {
    id: "diarias", type: "daily", tab: "daily",
    badge: "Diárias", title: "Tarefas Diárias",
    subtitle: "Resetam todo dia às 5h.",
    items: [
      { id: "d-quests", text: "Quests diárias" },
      { id: "d-shugo", text: "Os 2 eventos Shugo diários jogados" },
      { id: "d-nightmare", text: "Os 2 chefes Nightmare diários" },
      { id: "d-dungeons", text: "Dungeons até gastar todo o seu Odyle" },
    ],
  },
  {
    id: "semanais", type: "weekly", tab: "weekly",
    badge: "Semanais", title: "Tarefas Semanais",
    subtitle: "Resetam na quarta-feira às 5h.",
    items: [
      { id: "w-abyss", text: "Quests do Abyss" },
      { id: "w-altgard", text: "Quests de Altgard" },
      { id: "w-odyle-craft", text: "20 recargas de Odyle produzidas (craft)" },
      { id: "w-odyle-buy", text: "20 recargas de Odyle compradas do Wind Breeze Merchant" },
      { id: "w-dungeons", text: "Dungeons Diárias: as 14 entradas base" },
      { id: "w-tickets", text: "7 Tickets de Clear Instantâneo comprados (Daily Dungeon)" },
      { id: "w-season", text: "Missões semanais da temporada concluídas" },
      { id: "w-trophies", text: "Marco de 11.000 troféus alcançado" },
      { id: "w-ascension", text: "Ascension Trial no nível mais alto possível" },
    ],
  },
];

// Eventos recorrentes (contadores).
//  - intervalHours: de quanto em quanto tempo o evento ocorre.
//  - anchorHour / anchorMinute: horário base do ciclo.
//  - utc: true  → anchorHour/anchorMinute são em UTC (instante fixo global; exibido no fuso local).
//         (ausente) → base no fuso configurado do site (ver SERVER_UTC_OFFSET_HOURS).
// Horários dos eventos globais conferidos em https://corpus.gg/games/aion-2/timers (em UTC).
const EVENTS = [
  { id: "spacetime-rift", icon: "🌌", label: "Spacetime Rift", intervalHours: 3, anchorHour: 0, utc: true },
  { id: "watcher-kaira", icon: "👁️", label: "Watcher Kaira", intervalHours: 3, anchorHour: 1, utc: true },
  { id: "shugo-festival", icon: "🎪", label: "Shugo Festival", intervalHours: 1, anchorHour: 0, anchorMinute: 0, utc: true },
  { id: "dimensional-invasion", icon: "👾", label: "Dimensional Invasion", intervalHours: 1, anchorHour: 0, anchorMinute: 30, utc: true },
  { id: "gartua", icon: "🌀", label: "Gartua", intervalHours: 12, anchorHour: 6 },
];

/* ------------------------------------------------------------
   Guias (conteúdo da aba "Guias").
   Conteúdo da comunidade; ajuste conforme o patch atual do jogo.
   ------------------------------------------------------------ */
const GUIDES = [
  {
    id: "g-roadmap", icon: "🗺️", title: "Roadmap de progressão",
    summary: "A ordem ideal do Level 45 até o endgame — e por que seguir cada etapa.",
    html: `
      <p>A progressão de Aion 2 recompensa quem segue a ordem certa: cada etapa constrói a
      base da próxima. Pular fases costuma significar gastar recursos à toa e travar mais na frente.</p>
      <ol>
        <li><b>Fase 1 — base da Level 45:</b> complete a quest principal, exploração (Elyos e Asmodian),
          Monolith nível 30, contratos de Altgard/Abyss, penas e side quests. É aqui que você
          acumula os recursos que financiam todo o resto.</li>
        <li><b>Meta 1 — 1.400 de Gear Score:</b> o primeiro grande portão. Com 1.400 GS você libera
          Vakron e passa a progredir de verdade.</li>
        <li><b>Pós-1.400 — Vakron e Gartua:</b> conteúdo repetível que sustenta a evolução diária.</li>
        <li><b>Endgame — 1.600 a 2.100:</b> Transcendência e farm de acessórios para fechar o build.</li>
      </ol>
      <div class="tip"><b>Dica:</b> não acumule pendências de Fase 1 ao chegar no endgame — várias
      recompensas (daevanions, exploração) são one-time e aceleram tudo que vem depois.</div>`,
  },
  {
    id: "g-gearscore", icon: "⚔️", title: "Gear Score & encantamento",
    summary: "Como chegar a 1.400 de GS sem desperdiçar recursos — Clash Runes, manastones e o teto do +5.",
    html: `
      <p>Até 1.400 de Gear Score, o objetivo é <b>eficiência</b>, não encantamentos altos. Suba de forma
      equilibrada em vez de concentrar tudo numa peça só.</p>
      <ul>
        <li><b>Clash Runes:</b> equipe as <b>duas</b> e encante apenas até <b>+1</b>. Não passe disso nesta fase.</li>
        <li><b>Equipamento:</b> mantenha entre <b>+2 e +5</b> (+5 é o teto recomendado aqui), com
          <b>Manastones básicas</b> encaixadas em todos os slots.</li>
        <li><b>Acessórios:</b> suba <b>amuleto e cinto para dourado</b> — ótimo custo-benefício de GS.</li>
      </ul>
      <div class="tip"><b>Por que não passar de +5 cedo?</b> O custo e o risco de falha disparam nos
      encantes altos. Antes de ter a base completa, cada tentativa frustrada atrasa mais do que ajuda.</div>`,
  },
  {
    id: "g-rotina", icon: "🔁", title: "Rotina diária/semanal eficiente",
    summary: "A ordem certa das tarefas, gestão de Odyle e como nunca perder um reset.",
    html: `
      <p>Resets: <b>diárias às 5h</b> e <b>semanais na quarta às 5h</b>. Use os contadores no topo
      para não deixar nada escapar — principalmente na terça à noite, véspera do reset semanal.</p>
      <p><b>Diárias:</b></p>
      <ul>
        <li>Quests diárias.</li>
        <li>Os 2 eventos Shugo e os 2 chefes Nightmare.</li>
        <li>Dungeons até <b>gastar todo o seu Odyle</b> do dia.</li>
      </ul>
      <p><b>Semanais:</b></p>
      <ul>
        <li>Quests de Abyss e Altgard.</li>
        <li><b>20 recargas de Odyle produzidas</b> (craft) + <b>20 compradas</b> do Wind Breeze Merchant.</li>
        <li>As <b>14 entradas base</b> das Daily Dungeons + <b>7 Tickets de Clear Instantâneo</b>.</li>
        <li>Missões da temporada, marco de <b>11.000 troféus</b> e Ascension Trial no maior nível possível.</li>
      </ul>
      <div class="tip"><b>Gestão de Odyle:</b> não deixe o Odyle estourar o limite — gastar antes de
      acumular o máximo evita desperdício. Craftar e comprar as recargas semanais mantém o estoque girando.</div>`,
  },
  {
    id: "g-vakron", icon: "🌀", title: "Vakron & Gartua",
    summary: "Expedição e Conquista Vakron (pity) e o ciclo de 12h do Gartua.",
    html: `
      <p>Depois dos 1.400 de GS, Vakron e Gartua viram o seu motor de progressão repetível.</p>
      <ul>
        <li><b>Expedição Vakron:</b> rode a dungeon <b>1,5 vez</b> no ciclo — é o alvo de eficiência.</li>
        <li><b>Conquista Vakron:</b> <b>encha uma pity completamente</b> para garantir a recompensa travada.</li>
        <li><b>Gartua:</b> abre <b>a cada 12 horas</b>. Acompanhe o contador "Gartua" no topo e entre
          assim que estiver disponível para não perder janelas.</li>
      </ul>
      <div class="tip"><b>Ciclo de 12h:</b> o contador está ancorado às 6h/18h.</code>.</div>`,
  },
];

/* ------------------------------------------------------------
   Classes (conteúdo da aba "Classes").
   São 8 classes no lançamento global, sem ramificação, disponíveis
   para ambas as facções. Dados da comunidade — revise conforme o patch.
   ------------------------------------------------------------ */
const CLASSES = [
  {
    id: "templar", symbol: "🛡️", name: "Templar", color: "#4d82ff",
    role: "Tanque", weapon: "Espada longa & Escudo",
    focus: "Segura o aggro e absorve dano com habilidades de escudo, mantendo os chefes travados em si com Provoke. Extremamente perdoável para iniciantes.",
    stats: ["Defense", "HP", "Block", "Front Attack", "Double Chance", "Weapon/Critical Damage"],
    pve: "Feche Defense / HP / Block primeiro; com o excedente: Front Attack > Double Chance > Weapon/Critical Damage.",
    pvp: "Sobrevivência primeiro: Evasion, Block, Status Effect Resist e HP; adicione PvP Damage Boost e PvP Accuracy com o que sobrar.",
    manastones: "Front Attack > Weapon > Critical Damage.",
    synergy: "Concede buff de dano ao grupo (Fury). Combina com DPS corpo a corpo que precisam de um alvo estável para atacar de frente.",
    tip: "Defense antes de tudo: só invista em dano quando o Block/HP já estiverem confortáveis.",
  },
  {
    id: "gladiator", symbol: "⚔️", name: "Gladiator", color: "#ff6b4d",
    role: "DPS corpo a corpo / Off-tank", weapon: "Montante (Greatsword)",
    focus: "Acerta vários inimigos com combos; muitas skills batem mais forte em alvos derrubados ou atordoados. Tem auto-cura em certos ataques.",
    stats: ["Strength", "Front Attack", "Double Chance", "Weapon/Critical Damage", "Lifesteal"],
    pve: "Front Attack > Double Chance > Weapon/Critical Damage.",
    pvp: "Mantenha o núcleo ofensivo (Front Attack, Weapon/Critical Damage) e some PvP Damage Boost + PvP Accuracy; Status Effect Resist para não ser travado em CC.",
    manastones: "Front Attack > Weapon > Critical Damage > Damage Boost.",
    synergy: "Recupera HP em certos golpes e dá buff de dano ao grupo após bloquear — bom como off-tank secundário.",
    tip: "Garanta Accuracy suficiente e busque um breakpoint útil de Combat Speed.",
  },
  {
    id: "assassin", symbol: "🗡️", name: "Assassin", color: "#9b6bff",
    role: "DPS burst corpo a corpo", weapon: "Adagas duplas",
    focus: "Alta mobilidade, stealth e burst. Ataca escondido e reposiciona rápido antes do contra-ataque. Brilha em duelos de PvP.",
    stats: ["Agility", "Back Attack", "Critical Hit", "Double Chance", "Attack Speed", "Weapon/Critical Damage"],
    pve: "Back Attack > Double Chance > Critical Hit > Weapon/Critical Damage.",
    pvp: "Back Attack + PvP Damage Boost para o burst; PvP Accuracy contra Evasion e Status Effect Resist para sobreviver ao controle.",
    manastones: "Back Attack > Weapon > Critical Damage > Damage Boost.",
    synergy: "Depende de atacar pelas costas — rende mais com um tanque que segure o aggro de frente.",
    tip: "Crit é parte do motor do Heart Gore; não negligencie Critical Hit.",
  },
  {
    id: "ranger", symbol: "🏹", name: "Ranger", color: "#3ddc84",
    role: "DPS físico à distância", weapon: "Arco",
    focus: "Combate à distância direto, com armadilhas e posicionamento. Armadilhas mantêm o inimigo longe e a mobilidade evita o corpo a corpo. Amigável para iniciantes.",
    stats: ["Dexterity", "Front Attack", "Weapon Damage", "Accuracy", "Critical/Damage Boost"],
    pve: "Front Attack > Weapon Damage > Critical/Damage Boost.",
    pvp: "PvP Damage Boost + PvP Accuracy (alvos empilham Evasion/Block); Status Effect Resist para preservar a mobilidade.",
    manastones: "Front Attack > Weapon > Critical/Damage Boost.",
    synergy: "Controla a distância do grupo com armadilhas; seguro e consistente em qualquer composição.",
    tip: "Considere buffs como o Marking Shot antes de empilhar mais Critical Hit.",
  },
  {
    id: "sorcerer", symbol: "🔮", name: "Sorcerer", color: "#ff5cb0",
    role: "DPS mágico à distância (burst)", weapon: "Grimório",
    focus: "Magia de dois elementos: fogo para dano e gelo para controle de grupo. Limpa grupos inteiros mantendo os alvos perigosos à distância.",
    stats: ["Intelligence", "Weapon Damage", "Front/Critical Damage", "Casting Speed", "Cooldown Reduction"],
    pve: "Weapon Damage > Front/Critical Damage > Cooldown Reduction.",
    pvp: "PvP Damage Boost para o burst; defensivos e Status Effect Resist (defesa baixa), além de PvP Accuracy contra Evasion.",
    manastones: "Weapon > Front/Critical Damage Boost.",
    synergy: "Tem barreira protetora, mas defesa baixa — rende mais atrás de um tanque que controle a frente.",
    tip: "A Cooldown Reduction vem principalmente de outros sistemas, não só das manastones.",
  },
  {
    id: "spiritmaster", symbol: "🌪️", name: "Spiritmaster", color: "#27d8c7",
    role: "DPS mágico / Invocador", weapon: "Orbe",
    focus: "Invoca espíritos elementais (fogo, água, vento, terra), lança maldições e controla o campo. Os espíritos tankam e causam dano — ótima sustentação solo.",
    stats: ["Intelligence", "Summon Power", "Double Chance", "Damage Boost", "Weapon Damage", "Critical Damage"],
    pve: "Double Chance > multiplicadores de dano (Damage/Weapon/Critical Damage) > Critical Hit, com Accuracy suficiente.",
    pvp: "PvP Damage Boost e PvP Accuracy; Status Effect Resist é essencial para manter o uptime de espíritos e maldições.",
    manastones: "Damage / Weapon / Critical Damage / Front Attack — ordem flexível.",
    synergy: "Autossuficiente; os espíritos cobrem funções, encaixando em grupos e no solo com facilidade.",
    tip: "Vários multiplicadores fortes dão bastante flexibilidade de gearing.",
  },
  {
    id: "cleric", symbol: "✨", name: "Cleric", color: "#f4c667",
    role: "Healer (com dano)", weapon: "Maça",
    focus: "Cura individual e em grupo, protege com barreiras e ainda causa dano entre as curas. Única classe com ressurreição.",
    stats: ["Intelligence", "Spirit", "Attack", "Cooldown Reduction", "Weapon/Critical Damage"],
    pve: "Attack > Cooldown Reduction > Weapon/Critical Damage (Attack também escala a cura).",
    pvp: "Uptime e sobrevivência: Status Effect Resist, defensivos e Cooldown Reduction; PvP Damage Boost só com orçamento sobrando.",
    manastones: "Weapon / Critical > Damage / Front Attack Boost.",
    synergy: "Muito requisitada em grupo (ressurreição + cura). Sólida também no solo pela durabilidade.",
    tip: "Attack também melhora a cura (conversão de Healing Enhancement).",
  },
  {
    id: "chanter", symbol: "🎶", name: "Chanter", color: "#36c6e0",
    role: "Suporte híbrido corpo a corpo", weapon: "Cajado",
    focus: "Luta no corpo a corpo enquanto fortalece aliados com Mantras (buffs contínuos de Atk, velocidade etc.) e oferece cura suplementar.",
    stats: ["Intelligence", "Healing Power", "Double Chance", "Front/Back Attack", "Weapon Damage"],
    pve: "Double Chance > Front/Back Attack > Weapon Damage.",
    pvp: "Equilibre ofensivo (PvP Damage Boost, PvP Accuracy) com Status Effect Resist e defensivos para manter os Mantras ativos.",
    manastones: "Front/Back Attack > Weapon Damage.",
    synergy: "Role flexível que encaixa em qualquer composição — buffs de grupo somam com qualquer DPS.",
    tip: "Escolha o roll posicional (Front ou Back) conforme seu posicionamento real no grupo, não um padrão universal.",
  },
];

// Ressalva exibida nos blocos de PvP (meta global ainda em formação).
const PVP_NOTE = "Meta de PvP ainda em formação — ajuste conforme o patch atual.";

/* ------------------------------------------------------------
   Skills mais fortes por classe (PvE / PvP).
   Nomes de skill em inglês. Dados da comunidade — revise por patch.
   ------------------------------------------------------------ */
const SKILLS = {
  templar: {
    pve: {
      active: [
        { n: "Judgment", d: "principal dano, disparado pelos ataques de escudo", spec: "Remove cooldown (lvl 16)" },
        { n: "Pummel", d: "base de dano multi-alvo", spec: "subir o máximo de rank" },
        { n: "Punishment", d: "abertura", spec: "buff Executor (+200 Accuracy, +20% PvE Damage)" },
        { n: "Shield Smite", d: "ativa Judgment" },
        { n: "Warding Strike", d: "ativa Judgment + buff de defesa" },
        { n: "Annihilate", d: "usar sempre que disponível" },
      ],
      passive: [
        { n: "Fury", d: "buff de dano ao grupo" },
        { n: "Ironclad Defense", d: "defesa" },
      ],
      stigma: [
        { n: "Doom Shield", d: "dispara Judgment (core)", spec: "reseta Annihilate (lvl 5)" },
        { n: "Battlefield Banner", d: "Attack escala com Defense (core)", spec: "+Multi-Hit e Weapon Damage (lvl 5+)" },
        { n: "Nezekan's Shield", d: "escudo de grupo (raid)" },
        { n: "Shield of Protection", d: "garante Block (tank buster)" },
      ],
    },
    pvp: {
      active: [
        { n: "Debilitating Smash", d: "anti-cura", spec: "-60% Incoming Heal (PvP)" },
        { n: "Poach", d: "puxão à distância com stun" },
        { n: "Shield Rush", d: "gap closer" },
        { n: "Defiance", d: "quebra de CC" },
      ],
      passive: [
        { n: "Impact Hit", d: "melhora acerto de Stun/Knockdown" },
        { n: "Survival Willpower", d: "resistência a Stun" },
      ],
      stigma: [
        { n: "Grapple", d: "controle (pull)" },
        { n: "Taunt", d: "forçar alvo (utilidade)" },
      ],
    },
  },
  gladiator: {
    pve: {
      active: [
        { n: "Overhead Slam", d: "núcleo do build (sem cooldown)", spec: "Remove cooldown (lvl 16)" },
        { n: "Rending Blow", d: "spam multi-alvo", spec: "Mobile; +50 MP no Critical Hit" },
        { n: "Keen Strike", d: "gerador de MP", spec: "+20% MP restaurado" },
        { n: "Ruinous Blow", d: "dano", spec: "+20% Skill Speed" },
      ],
      passive: [
        { n: "Blood Absorption", d: "sustain (lifesteal)" },
        { n: "Murderous Burst", d: "dano" },
      ],
      stigma: [
        { n: "Lunge Stance", d: "core", spec: "lvl 20: CDR no Critical Hit" },
        { n: "Zikel's Blessing", d: "attack boost + stagger" },
        { n: "Rage Burst", d: "janela de burst", spec: "lvl 5: CDR" },
        { n: "Focused Block", d: "defensivo", spec: "lvl 5: 2º uso consecutivo" },
      ],
    },
    pvp: {
      active: [
        { n: "Rush Strike", d: "gap closer com CC" },
        { n: "Leaping Slam", d: "gap closer com CC" },
        { n: "Aerial Snare", d: "controle aéreo" },
      ],
      passive: [
        { n: "Impact Hit", d: "melhora Stun/Knockdown" },
        { n: "Survival Willpower", d: "resistência a Stun" },
      ],
      stigma: [
        { n: "Blade Toss", d: "-30% Defense do alvo", spec: "entra no lugar de Focused Block" },
        { n: "Wave Armor", d: "defensivo" },
        { n: "Lifestealing Blade", d: "sustain em trades" },
      ],
    },
  },
  assassin: {
    pve: {
      active: [
        { n: "Heart Gore", d: "principal", spec: "reset no Critical Hit; +20% Crit chance (lvl 16)" },
        { n: "Quick Slice", d: "garante crit", spec: "sempre crita; reduz CD de Insignia Explosion" },
        { n: "Insignia Explosion", d: "spam", spec: "Multi-Hit, -3s de cooldown" },
        { n: "Savage Roar", d: "gera stacks de insignia", spec: "-20% MP, +20% Skill Speed" },
        { n: "Storm Rampage", d: "usar sem outros cooldowns", spec: "reduz CD de todas as skills no hit" },
      ],
      passive: [
        { n: "Apply Poison", d: "DoT de veneno" },
        { n: "Rear Smite", d: "dano pelas costas" },
      ],
      stigma: [
        { n: "Illusive Clone", d: "core", spec: "lvl 20: remove o cooldown de Heart Gore" },
        { n: "Triniel's Dagger", d: "core", spec: "lvl 10: -10% CD de todas as skills" },
        { n: "Swift Contract", d: "+20% Combat Speed" },
        { n: "Savage Fang", d: "grava 5 Insignias", spec: "lvl 15: +10% PvE Damage" },
      ],
    },
    pvp: {
      active: [
        { n: "Ambush", d: "abertura em stealth pelas costas" },
        { n: "Whirlwind Slice", d: "contra-ataque com evasão" },
      ],
      passive: [
        { n: "Impact Hit", d: "melhora Stun/Knockdown" },
      ],
      stigma: [
        { n: "Shadow Walk", d: "volta ao stealth no meio da luta" },
        { n: "Spiral Slice", d: "burst de PvP" },
        { n: "Aerial Bind", d: "controle aéreo" },
      ],
    },
  },
  ranger: {
    pve: {
      active: [
        { n: "Deadshot", d: "burst (lvl 20)", spec: "+30% Skill Speed, mobile, +dano no hit" },
        { n: "Gale Arrow", d: "buff (lvl 20)", spec: "mobile, -10s CD, +5s de duração" },
        { n: "Snipe", d: "gerador", spec: "CD de Deadshot, Tempest Arrow, +50% Multi-Hit (lvl 20)" },
        { n: "Drill Dart", d: "DoT (lvl 16)", spec: "Multi-Hit, ativação extra, Absorb HP se precisar" },
        { n: "Tempest Shot", d: "dano (lvl 16)", spec: "fewer-targets, +20% Skill Speed" },
        { n: "Marking Shot", d: "buff de precisão", spec: "+5% Perfect Chance, +5s de duração" },
      ],
      passive: [
        { n: "Concentrated Fire", d: "dano" },
        { n: "Focused Eye", d: "dano" },
      ],
      stigma: [
        { n: "Vaizel's Authority", d: "core", spec: "lvl 20: +20% Attack, CDR no Critical Hit" },
        { n: "Bow of Blessing", d: "core", spec: "+200 Crit, +100 Accuracy, +50% Multi-Hit" },
        { n: "Griffon Arrow", d: "DoT (Crimson Flames)" },
        { n: "Supporting Fire", d: "orbe com tiros extras (ou troque por Explosive Arrow)" },
      ],
    },
    pvp: {
      active: [
        { n: "Snare Shot", d: "root para travar o alvo" },
        { n: "Burst Arrow", d: "follow-up no alvo preso" },
        { n: "Deadshot", d: "burst" },
        { n: "Gale Arrow", d: "combat speed em teamfight" },
      ],
      passive: [
        { n: "Rooting Eye", d: "reforça os roots" },
      ],
      stigma: [
        { n: "Explosive Arrow", d: "+20% dano a alvos lentos/presos" },
        { n: "Ensnaring Trap", d: "controle de área" },
        { n: "Arrow Storm", d: "AoE" },
      ],
    },
  },
  sorcerer: {
    pve: {
      active: [
        { n: "Hellfire", d: "nuke assinatura (20%+ do dano)", spec: "+30% Skill Speed (dungeon) / Fire DoT (boss); -15s CD em ranks altos" },
        { n: "Firestorm", d: "gestão de MP + CDR", spec: "-50% MP (cedo); cada bola -2s no CD de Hellfire (lvl 12+)" },
        { n: "Ice Chain", d: "dano/controle", spec: "+20% Skill Speed → -20% MP com gear de cast" },
        { n: "Flame Arrow", d: "sustain", spec: "+20% MP restaurado" },
        { n: "Wish of Concentration", d: "-10s em todas as skills" },
        { n: "Bittercold Wind", d: "AoE multi-hit" },
      ],
      passive: [
        { n: "Fire Mark", d: "dano de fogo" },
        { n: "Grace of Enhancement", d: "dano" },
      ],
      stigma: [
        { n: "Element Enhancement", d: "+dano de fogo/água" },
        { n: "Delayed Explosion", d: "amplificador", spec: "+15% dano recebido durante o delay" },
        { n: "Cold Storm", d: "dano de água (Frostbite)" },
        { n: "Fire Wall", d: "debuff Embers" },
      ],
    },
    pvp: {
      active: [
        { n: "Hellfire", d: "nuke confiável", spec: "Ignores Block and Evasion (PvP)" },
        { n: "Frost Burst", d: "stun" },
        { n: "Winter's Shackles", d: "dano + controle" },
      ],
      passive: [
        { n: "Grace of Resistance", d: "resistências" },
      ],
      stigma: [
        { n: "Steel Barrier", d: "escudo" },
        { n: "Curse: Tree", d: "controle" },
        { n: "Hibernation", d: "invulnerabilidade para escapar" },
      ],
    },
  },
  spiritmaster: {
    pve: {
      active: [
        { n: "Elemental Fusion", d: "payoff de burst (lvl 20)", spec: "+dano no hit, +10 Element Boost, 25% de recuperar Four Elements" },
        { n: "Combustion", d: "single-target; acesso ao Ashy Call", spec: "-20% MP (cedo) / +20% Skill Speed (tarde)" },
        { n: "Cold Shock", d: "spam principal", spec: "+2% Attack + MP (cedo) / +50% Multi-Hit (tarde)" },
        { n: "Dimensional Control", d: "slow", spec: "+dano no hit, +50% Multi-Hit" },
        { n: "Jointstrike: Curse", d: "maldição", spec: "-2s CD, +2s de duração" },
        { n: "Summon: Fire Spirit", d: "espírito", spec: "+20% Critical Hit damage" },
        { n: "Summon: Water Spirit", d: "espírito", spec: "+10% Attack" },
      ],
      passive: [
        { n: "Spirit Strike", d: "dano do espírito" },
        { n: "Element Unification", d: "dano" },
      ],
      stigma: [
        { n: "Summon: Ancient Spirit", d: "core", spec: "lvl 15: skill a cada 5 ataques (em vez de 7)" },
        { n: "Jointstrike: Corrode", d: "amplificador", spec: "+10% dano recebido do seu espírito" },
        { n: "Flame Blessing", d: "dano", spec: "50% de chance de dano extra no hit" },
        { n: "Cursed Cloud", d: "mid-late game" },
      ],
    },
    pvp: {
      active: [
        { n: "Soul's Cry", d: "skill de PvP (evitar em PvE)" },
      ],
      passive: [],
      stigma: [
        { n: "Cry of Terror", d: "fear em grupo" },
        { n: "Seize Magic", d: "remove buffs" },
        { n: "Command: Proxy", d: "redireciona metade do dano ao espírito" },
        { n: "Siphon", d: "cura a cada hit" },
        { n: "Magic Block", d: "defensivo" },
        { n: "Assault Terror", d: "engage com alcance estendido" },
      ],
    },
  },
  cleric: {
    pve: {
      active: [
        { n: "Condemnation", d: "maior dano (lvl 20), reseta crit" },
        { n: "Chain of Torment", d: "libera Condemnation" },
        { n: "Earth's Retribution", d: "dano (lvl 20)" },
        { n: "Radiant Recovery", d: "cura em área + cleanse" },
        { n: "Bolt", d: "ataque carregado" },
        { n: "Divine Aura", d: "buff de Attack Speed" },
      ],
      passive: [
        { n: "Immortal Veil", d: "defensivo", spec: "max: Defense + Critical Hit Resist" },
        { n: "Healing Enhancement", d: "cura escala com Attack", spec: "lvl 10" },
        { n: "Earth's Grace", d: "subir ao máximo" },
      ],
      stigma: [
        { n: "Earth Punishment", d: "garante o crit do Condemnation (DPS)" },
        { n: "Prayer of Amplification", d: "amplifica dano (DPS)" },
        { n: "Noble Aura", d: "buff (DPS)" },
        { n: "Summon Resurrection", d: "ressurreição (suporte)" },
        { n: "Salvation", d: "reset de emergência (suporte)" },
      ],
    },
    pvp: {
      active: [
        { n: "Judgment Thunder", d: "dano com slow" },
        { n: "Debilitating Mark", d: "DoT que reduz defesa" },
        { n: "Healing Light", d: "cura emergencial" },
      ],
      passive: [
        { n: "Survival Willpower", d: "resistência a Stun" },
      ],
      stigma: [
        { n: "Salvation", d: "reset de emergência" },
        { n: "Root", d: "controle" },
        { n: "Light of Protection", d: "escudo de aliado" },
      ],
    },
  },
  chanter: {
    pve: {
      active: [
        { n: "Dark Crush", d: "maior dano single", spec: "lvl 16: crita e remove cooldown" },
        { n: "Spinning Strike", d: "AoE spammável", spec: "-5s de cooldown, fewer-targets" },
        { n: "Onslaught", d: "gerador", spec: "+20% MP, reduz CD de Spinning Strike" },
        { n: "Rushing Smash", d: "reset ao matar", spec: "Charge Skill com reset de CD" },
        { n: "Recuperation", d: "cura", spec: "+1 uso consecutivo, +5% HP restaurado" },
        { n: "Incandescent Blow", d: "dano", spec: "-20% MP consumido" },
      ],
      passive: [
        { n: "Raging Spell", d: "dano" },
        { n: "Attack Preparation", d: "dano" },
      ],
      stigma: [
        { n: "Undefeated Mantra", d: "buff de grupo (core)", spec: "max primeiro: Critical Hit + Accuracy" },
        { n: "Marchutan's Wrath", d: "core", spec: "lvl 5: habilita Dark Crush" },
        { n: "Sprint Mantra", d: "combat speed de grupo (lvl 5)" },
        { n: "Ensnaring Mark", d: "habilita Dark Crush" },
      ],
    },
    pvp: {
      active: [
        { n: "Tremor Crush", d: "cria distância (gap)" },
        { n: "Fracturing Blow", d: "stun que abre janela de burst" },
        { n: "Dark Crush", d: "burst" },
      ],
      passive: [
        { n: "Impact Hit", d: "passiva de PvP (Stun/Knockdown)" },
      ],
      stigma: [
        { n: "Power of the Storm", d: "buff de grupo (+20% Combat Speed, +10% CDR)" },
        { n: "Obliterate", d: "situacional" },
        { n: "Focused Defense", d: "defensivo" },
      ],
    },
  },
};

const STORAGE_KEY = "aion2-tracker-v1";
const THEME_KEY = "aion2-tracker-theme";

const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const CHEVRON_SVG = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

/* ============================================================
   Tempo (fuso virtual)
   Trabalhamos num "tempo virtual" = epoch real deslocado para o
   fuso do servidor, usando os getters/setters UTC do Date.
   ============================================================ */
function offsetHours() {
  return SERVER_UTC_OFFSET_HOURS !== null
    ? SERVER_UTC_OFFSET_HOURS
    : -new Date().getTimezoneOffset() / 60;
}
function toVirtual(epoch) { return epoch + offsetHours() * 3600000; }
function fromVirtual(v) { return v - offsetHours() * 3600000; }

function nextDailyReset() {
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(RESET_HOUR, 0, 0, 0);
  let t = d.getTime();
  if (t <= vnow) t += 86400000;
  return fromVirtual(t);
}
function nextWeeklyReset() {
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(RESET_HOUR, 0, 0, 0);
  const add = (WEEKLY_RESET_DOW - d.getUTCDay() + 7) % 7;
  let t = d.getTime() + add * 86400000;
  if (t <= vnow) t += 7 * 86400000;
  return fromVirtual(t);
}
function nextEvent(ev) {
  const period = ev.intervalHours * 3600000;
  const min = ev.anchorMinute || 0;
  if (ev.utc) {
    // Âncora em UTC: calcula o instante absoluto do próximo evento (fuso-independente).
    const now = Date.now();
    const d = new Date(now);
    d.setUTCHours(ev.anchorHour, min, 0, 0);
    let t = d.getTime();
    t += Math.max(Math.ceil((now - t) / period), 0) * period;
    while (t <= now) t += period;
    return t;
  }
  // Âncora no fuso configurado do site.
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(ev.anchorHour, min, 0, 0);
  let t = d.getTime();
  t += Math.max(Math.ceil((vnow - t) / period), 0) * period;
  while (t <= vnow) t += period;
  return fromVirtual(t);
}

function fmtCountdown(ms) {
  if (ms < 0) ms = 0;
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}
function fmtClock(epoch) {
  const v = new Date(toVirtual(epoch));
  const pad = (n) => String(n).padStart(2, "0");
  const dows = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  return { hm: `${pad(v.getUTCHours())}:${pad(v.getUTCMinutes())}`, dow: dows[v.getUTCDay()] };
}

/* ============================================================
   Estado + reset automático
   ============================================================ */
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();
if (!state.checks) state = { checks: {}, dailyKey: "", weeklyKey: "" };

function currentDailyKey() { return String(nextDailyReset() - 86400000); }
function currentWeeklyKey() { return String(nextWeeklyReset() - 7 * 86400000); }

function applyResets() {
  const dk = currentDailyKey();
  const wk = currentWeeklyKey();
  let changed = false;
  if (state.dailyKey !== dk) {
    DATA.find((s) => s.type === "daily")?.items.forEach((it) => { delete state.checks[it.id]; });
    state.dailyKey = dk; changed = true;
  }
  if (state.weeklyKey !== wk) {
    DATA.find((s) => s.type === "weekly")?.items.forEach((it) => { delete state.checks[it.id]; });
    state.weeklyKey = wk; changed = true;
  }
  if (changed) saveState();
  return changed;
}

/* ============================================================
   Renderização das seções
   ============================================================ */
const board = document.getElementById("board");
let activeTab = "progressao";

function render() {
  board.innerHTML = "";
  DATA.forEach((section) => board.appendChild(renderSection(section)));
  GUIDES.forEach((guide) => board.appendChild(renderGuide(guide)));
  CLASSES.forEach((cls) => board.appendChild(renderClass(cls)));
  applyTab();
  updateOverall();
}

// Renderiza os subgrupos de skills (Ativas / Passivas / Stigmas) de um modo.
function skillGroups(modeData) {
  if (!modeData) return "";
  const groups = [["active", "Ativas"], ["passive", "Passivas"], ["stigma", "Stigmas"]];
  const html = groups.map(([key, label]) => {
    const arr = modeData[key];
    if (!arr || !arr.length) return "";
    const items = arr.map((s) =>
      `<li><b>${s.n}</b>${s.d ? `<span> — ${s.d}</span>` : ""}` +
      `${s.spec ? `<em class="spec">${s.spec}</em>` : ""}</li>`
    ).join("");
    return `<div class="skill-group skill-${key}"><h6>${label}</h6><ul class="skill-list">${items}</ul></div>`;
  }).join("");
  return html;
}

function renderClass(cls) {
  const el = document.createElement("section");
  el.className = "section collapsed class-card";
  el.dataset.tab = "classes";
  el.dataset.class = cls.id;
  el.style.setProperty("--role", cls.color);

  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = `
    <img class="class-symbol" src="assets/images/${cls.id}.avif" alt="Símbolo de ${cls.name}" loading="lazy" />
    <div class="section-title">
      <h2>${cls.name}</h2>
      <p><span class="role-pill">${cls.role}</span> · ${cls.weapon}</p>
    </div>
    <div class="section-meta">${CHEVRON_SVG}</div>`;
  head.addEventListener("click", () => el.classList.toggle("collapsed"));

  const chips = cls.stats.map((s) => `<span class="chip">${s}</span>`).join("");
  const sk = SKILLS[cls.id] || {};
  const body = document.createElement("div");
  body.className = "section-body";
  body.innerHTML = `
    <div class="section-body-inner class-body">
      <p class="class-focus">${cls.focus}</p>
      <div class="class-block"><h4>Atributos recomendados</h4><div class="chips">${chips}</div></div>
      <div class="prio">
        <div class="class-block prio-pve">
          <h4>Prioridade PvE</h4><p>${cls.pve}</p>
          <div class="skills-wrap">${skillGroups(sk.pve)}</div>
        </div>
        <div class="class-block prio-pvp">
          <h4>Prioridade PvP</h4><p>${cls.pvp}</p>
          <div class="skills-wrap">${skillGroups(sk.pvp)}</div>
          <p class="prio-note">${PVP_NOTE}</p>
        </div>
      </div>
      <div class="class-block"><h4>Manastones</h4><p>${cls.manastones}</p></div>
      <div class="class-block"><h4>Sinergias</h4><p>${cls.synergy}</p></div>
      <div class="tip"><b>Dica:</b> ${cls.tip}</div>
    </div>`;

  el.append(head, body);
  return el;
}

function renderGuide(guide) {
  const el = document.createElement("section");
  el.className = "section collapsed";
  el.dataset.tab = "guias";
  el.dataset.guide = guide.id;

  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = `
    <span class="section-badge badge-guide">${guide.icon} Guia</span>
    <div class="section-title"><h2>${guide.title}</h2><p>${guide.summary}</p></div>
    <div class="section-meta">${CHEVRON_SVG}</div>`;
  head.addEventListener("click", () => el.classList.toggle("collapsed"));

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner guide-body";
  inner.innerHTML = guide.html;
  body.appendChild(inner);

  el.append(head, body);
  return el;
}

// Abre um guia: troca para a aba Guias, expande o guia e rola até ele.
function openGuide(guideId) {
  activeTab = "guias";
  applyTab();
  const el = board.querySelector(`.section[data-guide="${guideId}"]`);
  if (!el) return;
  el.classList.remove("collapsed");
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSection(section) {
  const el = document.createElement("section");
  el.className = "section";
  el.dataset.type = section.type;
  el.dataset.id = section.id;
  el.dataset.tab = section.tab;

  const badgeClass = section.type === "daily" ? "badge-daily" : section.type === "weekly" ? "badge-weekly" : "badge-phase";

  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = `
    <span class="section-badge ${badgeClass}">${section.badge}</span>
    <div class="section-title"><h2>${section.title}</h2><p>${section.subtitle}</p></div>
    <div class="section-meta">
      <span class="section-count"><b class="count-done">0</b>/${section.items.length}</span>
      ${CHEVRON_SVG}
    </div>`;
  head.addEventListener("click", () => el.classList.toggle("collapsed"));

  const bar = document.createElement("div");
  bar.className = "section-bar";
  bar.innerHTML = "<span></span>";

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner";
  section.items.forEach((item) => inner.appendChild(renderItem(item, section)));
  body.appendChild(inner);

  el.append(head, bar, body);
  return el;
}

function renderItem(item, section) {
  const label = document.createElement("label");
  label.className = "item";
  label.dataset.id = item.id;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = !!state.checks[item.id];
  input.addEventListener("change", () => {
    if (input.checked) state.checks[item.id] = true;
    else delete state.checks[item.id];
    saveState();
    updateSection(section.id);
    updateOverall();
  });

  const box = document.createElement("span");
  box.className = "checkbox";
  box.innerHTML = CHECK_SVG;

  const text = document.createElement("span");
  text.className = "item-text";
  text.innerHTML = item.text + (item.note ? `<small>${item.note}</small>` : "");

  label.append(input, box, text);

  if (item.guide) {
    const link = document.createElement("button");
    link.type = "button";
    link.className = "guide-link";
    link.textContent = "📖 guia";
    link.title = "Abrir guia relacionado";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openGuide(item.guide);
    });
    label.append(link);
  }
  return label;
}

/* ---------- Progresso ---------- */
function sectionProgress(section) {
  const done = section.items.filter((it) => state.checks[it.id]).length;
  return { done, total: section.items.length };
}

function updateSection(sectionId) {
  const section = DATA.find((s) => s.id === sectionId);
  const el = board.querySelector(`.section[data-id="${sectionId}"]`);
  if (!section || !el) return;
  const { done, total } = sectionProgress(section);
  el.querySelector(".count-done").textContent = done;
  el.querySelector(".section-bar span").style.width = total ? `${(done / total) * 100}%` : "0%";

  // destaque do próximo objetivo (apenas fases)
  el.querySelectorAll(".item.next").forEach((n) => n.classList.remove("next"));
  if (section.type === "phase") {
    const next = section.items.find((it) => !state.checks[it.id]);
    if (next) el.querySelector(`.item[data-id="${next.id}"]`)?.classList.add("next");
  }
}

const RING_CIRC = 2 * Math.PI * 52;
function updateOverall() {
  DATA.forEach((s) => updateSection(s.id));
  const phases = DATA.filter((s) => s.type === "phase");
  const total = phases.reduce((n, s) => n + s.items.length, 0);
  const done = phases.reduce((n, s) => n + sectionProgress(s).done, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("overall-percent").textContent = `${pct}%`;
  const ring = document.getElementById("overall-ring-fg");
  ring.style.strokeDashoffset = RING_CIRC * (1 - pct / 100);
}

/* ============================================================
   Abas
   ============================================================ */
function applyTab() {
  document.querySelectorAll(".section").forEach((el) => {
    el.hidden = el.dataset.tab !== activeTab;
  });
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.tab === activeTab);
  });
}
document.getElementById("tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  activeTab = tab.dataset.tab;
  applyTab();
});

/* ============================================================
   Contadores (painel de timers)
   ============================================================ */
const timersEl = document.getElementById("timers");
function buildTimers() {
  const cards = [
    { id: "daily", icon: "☀️", label: "Reset diário", kind: "reset" },
    { id: "weekly", icon: "📅", label: "Reset semanal", kind: "reset" },
    ...EVENTS.map((ev) => ({ id: ev.id, icon: ev.icon, label: ev.label, kind: "evt", ev })),
  ];
  timersEl.innerHTML = cards.map((c) => `
    <div class="timer-card ${c.kind === "evt" ? "evt" : ""}" data-timer="${c.id}">
      <div class="timer-head"><span class="timer-icon">${c.icon}</span><span class="timer-label">${c.label}</span></div>
      <div class="timer-value" data-value>--:--:--</div>
      <div class="timer-sub" data-sub></div>
    </div>`).join("");
}

let lastTargets = {};
function tickTimers() {
  const now = Date.now();
  const targets = { daily: nextDailyReset(), weekly: nextWeeklyReset() };
  EVENTS.forEach((ev) => { targets[ev.id] = nextEvent(ev); });

  for (const [id, target] of Object.entries(targets)) {
    const card = timersEl.querySelector(`[data-timer="${id}"]`);
    if (!card) continue;
    card.querySelector("[data-value]").textContent = fmtCountdown(target - now);
    const c = fmtClock(target);
    const sub = id === "weekly" ? `${c.dow}. ${c.hm}` : `às ${c.hm}`;
    card.querySelector("[data-sub]").textContent = `próximo ${sub}`;

    // ao virar um alvo, piscar o card
    if (lastTargets[id] && target !== lastTargets[id]) {
      card.classList.add("flash");
      setTimeout(() => card.classList.remove("flash"), 1000);
    }
    lastTargets[id] = target;
  }

  // reset automático de diárias/semanais
  if (applyResets()) render();
}

/* ============================================================
   Tema
   ============================================================ */
const themeBtn = document.getElementById("theme-toggle");
function applyTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light", light);
  themeBtn.textContent = light ? "🌙" : "☀️";
  localStorage.setItem(THEME_KEY, theme);
}
themeBtn.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("light") ? "dark" : "light");
});
applyTheme(localStorage.getItem(THEME_KEY) || "dark");

/* ============================================================
   Export / Import / Reset
   ============================================================ */
document.getElementById("export-btn").addEventListener("click", async () => {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(state.checks))));
  try {
    await navigator.clipboard.writeText(code);
    alert("Código do progresso copiado para a área de transferência!\n\nCole no Discord ou guarde para restaurar depois.");
  } catch {
    prompt("Copie o código do seu progresso:", code);
  }
});

document.getElementById("import-btn").addEventListener("click", () => {
  const code = prompt("Cole aqui o código do progresso para importar:");
  if (!code) return;
  try {
    const checks = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (typeof checks !== "object" || checks === null) throw new Error("formato");
    state.checks = checks;
    saveState();
    render();
    alert("Progresso importado com sucesso!");
  } catch {
    alert("Código inválido. Verifique e tente novamente.");
  }
});

document.getElementById("reset-all").addEventListener("click", () => {
  if (!confirm("Resetar TODO o progresso (fases, diárias e semanais)?")) return;
  state.checks = {};
  saveState();
  render();
});

/* ============================================================
   Boot
   ============================================================ */
applyResets();
buildTimers();
render();
tickTimers();
setInterval(tickTimers, 1000);
