/* ============================================================
   Dados: checklist de progressão (fases). Diárias/semanais ficam em data/routine.js.
   O `id` de cada item é a chave salva no localStorage.
   ============================================================ */
const DATA = [
  {
    id: "fase1",
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
      { id: "side-quests", text: "100% das side quests (verdes)", note: "dão pontos de Daevanion", guide: "g-cp#daevanion" },
      { id: "amulet-belt", text: "Amuleto e cinto melhorados para dourado", guide: "g-cp#gear" },
      { id: "shugo", text: "Shugo concluído, Daevanions coletados na loja Shugo", guide: "g-cp#daevanion" },
      { id: "nightmare", text: "Nightmare concluído, tokens gastos em Daevanions", guide: "g-cp#daevanion" },
    ],
  },
  {
    id: "fase2",
    badge: "Meta 1", title: "Alcançar 1.400 de Gear Score",
    subtitle: "Encantamentos e manastones no ponto certo — sem exageros.",
    items: [
      { id: "clash-runes", text: "Ambas as Clash Runes equipadas e encantadas em +1", note: "não mais que isso", guide: "g-gearscore" },
      { id: "gear-enchant", text: "Equipamento encantado entre +2 e +5 (+5 máx)", note: "com Manastones básicas encaixadas", guide: "g-gearscore" },
    ],
  },
  {
    id: "fase3",
    badge: "Fase 2", title: "Após 1.400 de GS: Vakron e Gartua",
    subtitle: "Conteúdo pós-1.400 para manter a evolução.",
    items: [
      { id: "vakron-exp", text: "Expedição Vakron: rodar a dungeon 1,5 vezes", guide: "g-vakron" },
      { id: "vakron-conq", text: "Conquista Vakron: encher uma pity completamente", guide: "g-vakron" },
      { id: "gartua", text: "Gartua a cada 12 horas", note: "veja o contador no topo", guide: "g-vakron" },
    ],
  },
  {
    id: "fase4",
    badge: "Fase 3", title: "Progressão 1.600 – 2.100",
    subtitle: "Reta de endgame.",
    items: [
      { id: "transcendence", text: "Atividades de Transcendência", note: "fonte de Arcanas", guide: "g-cp#arcana" },
      { id: "acc-farm", text: "Farm de acessórios", note: "opcional" },
      { id: "odyle-craft-extra", text: "Odyle produzido (craft) de apoio" },
      { id: "odyle-buy-extra", text: "Odyle comprado de apoio" },
    ],
  },
];
