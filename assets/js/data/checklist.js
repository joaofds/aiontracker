/* ============================================================
   Dados: checklist com as fases de progressão + diárias + semanais.
   O `id` de cada item é a chave salva no localStorage.
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
    subtitle: "Resetam todo dia às 4h.",
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
    subtitle: "Resetam na quarta-feira às 4h.",
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
