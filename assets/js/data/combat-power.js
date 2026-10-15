/* ============================================================
   Dados: guia de Combat Power (card na aba "Guias").
   Lembrete de tudo que o jogo oferece para ganhar poder, fonte por fonte.
   Cada fonte tem `checks` (marcáveis; o `id` é a chave salva em state.checks)
   e, opcionalmente, `classGuide`: id da seção do Guia de classe que diz
   o que escolher (ver data/class-guides.js).
   Fonte: AION 2 Guia (hartmannlab), baseado no vídeo do Dean Gaming TV.
   ============================================================ */
const CP_GUIDE = {
  id: "g-cp",
  icon: "⚡",
  title: "Combat Power — tudo que te deixa mais forte",
  summary: "Lembrete das 10 fontes de poder do jogo (e do poder que não aparece no número). Marque o que você já usa.",
  source: { name: "AION 2 Guia (hartmannlab) — Combat Power", url: "https://aion2.hartmannlab.xyz/en/combat-power" },
  video: { name: "Dean Gaming TV (em português)", url: "https://www.youtube.com/watch?v=wJCislYUF1E" },
  sources: [
    {
      id: "pets", icon: "🐾", title: "Pets",
      how: ["Os stats dos pets acumulam — vale ter vários.", "Dá para farmar com ou sem o app; o vídeo mostra como e quantos."],
      where: ["App Shugo.GG (grátis até o fim de outubro)"],
      checks: [{ id: "cp-pets", text: "Pets farmados", note: "os stats acumulam" }],
    },
    {
      id: "genus", icon: "🧬", title: "Genus Insight", classGuide: "genus",
      how: [
        "Custa Soul Crystals e Kinah; o botão Analyze (reroll) é a melhor forma de subir.",
        "~10M de Kinah para deixar tudo no nível 10.",
        "Nível 9: 1% de chance de stat heroico · nível 10: 5%.",
        "Travar stats aumenta o custo; a análise automática filtra os stats do seu guia.",
        "Economize rodando com os alts e usando Kinah vinculado.",
        "Mais Soul Crystals vêm de cubos — aumente o volume dos efeitos sonoros para perceber quando caem.",
      ],
      checks: [
        { id: "cp-genus-10", text: "Todo o Genus Insight no nível 10", note: "também libera um título" },
        { id: "cp-genus-stats", text: "Stats certos em cada linha", note: "conforme o guia da classe" },
      ],
    },
    {
      id: "gear", icon: "🛡️", title: "Equipamento", classGuide: "gear",
      how: [
        "Soul Binding com os stats certos (até o máximo).",
        "Itens dourados e craftados.",
        "Philosopher's Stone (não transfere entre itens).",
        "Enhancement e Amplification, Potential e Manastones / Soulstones.",
      ],
      checks: [
        { id: "cp-soulbinding", text: "Soul Binding no máximo, com os stats certos" },
        { id: "cp-enhance", text: "Enhancement / Amplification em dia" },
        { id: "cp-potential", text: "Potential liberado" },
        { id: "cp-manastones", text: "Manastones / Soulstones em todos os slots" },
      ],
    },
    {
      id: "arcana", icon: "🃏", title: "Arcana", classGuide: "arcana",
      how: ["Conta a carta e o nível.", "Caem na Transcendence e saem do crafting.", "Dá para craftar a primeira Arcana dourada por volta de 2.000 GS."],
      where: ["Transcendence", "Crafting"],
      checks: [{ id: "cp-arcana-gold", text: "Primeira Arcana dourada craftada", note: "~2.000 GS" }],
    },
    {
      id: "wings", icon: "🪽", title: "Asas", classGuide: "wings-titles",
      how: ["Os bônus passivos de todas as asas acumulam.", "O bônus ativo vem da asa equipada (asa da temporada)."],
      where: ["Shugo Festival", "Temporada", "Abyss", "Nightmare", "Conquest dungeons", "Gathering", "Cubos", "Crafting inicial"],
      checks: [
        { id: "cp-wings-collect", text: "Coletando asas para somar os passivos" },
        { id: "cp-wings-season", text: "Asa da temporada equipada" },
      ],
    },
    {
      id: "titles", icon: "🏅", title: "Títulos", classGuide: "wings-titles",
      how: ["Os bônus passivos de todos os títulos acumulam; o ativo vem do título equipado.", "Vêm de conquistas."],
      checks: [
        { id: "cp-title-shugo", text: "Cada minigame do Shugo Festival feito 3x" },
        { id: "cp-title-genus", text: "Título de todo o Genus Insight no nível 10" },
        { id: "cp-title-novice", text: "Novice nível 50" },
        { id: "cp-title-pro", text: "Professional nível 50" },
      ],
    },
    {
      id: "skills", icon: "✨", title: "Nível de skills e stigmas", classGuide: "skills",
      how: ["Os pontos de skill vêm das Sealed Dungeons.", "Stigmas se compram nas lojas."],
      where: ["Sealed Dungeons", "Abyss", "Nightmare", "Shugo Festival"],
      checks: [
        { id: "cp-skill-points", text: "Sealed Dungeons feitas pelos pontos de skill" },
        { id: "cp-stigmas", text: "Stigmas comprados e no nível" },
      ],
    },
    {
      id: "daevanion", icon: "🔷", title: "Pontos de Daevanion", classGuide: "boards",
      how: ["Todos contam, exceto os de PvP.", "Vêm de Sealed Dungeons e side quests, e também dá para comprar."],
      where: ["Sealed Dungeons", "Side quests", "Nightmare", "Shugo Festival"],
      checks: [
        { id: "cp-daevanion-earn", text: "Daevanions de Sealed Dungeons e side quests pegos" },
        { id: "cp-daevanion-buy", text: "Daevanions comprados (Nightmare e Shugo Festival)" },
      ],
    },
    {
      id: "skins", icon: "👘", title: "Coleção de skins",
      how: ["Skins pagas não dão poder.", "Combine skins e use a Lucky Aura.", "Comprar skins existe, mas provavelmente não compensa."],
      where: ["Nightmare", "Shugo Festival", "Black Cloud Merchants"],
      checks: [{ id: "cp-skins", text: "Skins combinadas / Lucky Aura usada" }],
    },
    {
      id: "pantheon", icon: "🏛️", title: "Pantheon", classGuide: "pantheon",
      how: [
        "Colossus: mate o boss final do Nightmare → Zikel's Apparition (45 / 45 / 45).",
        "Statue: Draupnir (Conquest) 10x → 12 / 12 / 12.",
        "Artwork: world bosses, Shugo Festival e a quest de gathering e crafting nível 50.",
      ],
      checks: [
        { id: "cp-colossus", text: "Zikel's Apparition (Colossus)", note: "boss final do Nightmare" },
        { id: "cp-statue", text: "Draupnir 10x (Statue)", note: "Conquest" },
        { id: "cp-artwork", text: "Artworks de world bosses, Shugo Festival e gathering/crafting 50" },
      ],
    },
  ],
  // Poder que aumenta o dano mas não aparece (ou quase não aparece) no número de Combat Power.
  invisible: [
    {
      id: "cp-inv-extras", title: "Consumíveis e extras",
      checks: [
        { id: "cp-scrolls", text: "Scrolls ativos" },
        { id: "cp-food", text: "Food ativa" },
        { id: "cp-power-shard", text: "Power Shard" },
        { id: "cp-pvp-daevanion", text: "Daevanion de PvP", note: "para PvP" },
        { id: "cp-pvp-skins", text: "Skins de PvP", note: "para PvP" },
      ],
    },
    {
      id: "cp-inv-play", title: "Execução",
      checks: [
        { id: "cp-eff-daevanion", text: "Daevanion eficiente", note: "rende mais do que o número mostra" },
        { id: "cp-uptime", text: "Uptime: tempo atacando o máximo possível" },
        { id: "cp-specs", text: "Especializações certas nas skills" },
        { id: "cp-genus-right", text: "Stats certos no Genus Insight" },
        { id: "cp-stats-right", text: "Stats certos no geral" },
        { id: "cp-rotation", text: "Rotação de skills certa" },
      ],
    },
  ],
};

// Todos os itens marcáveis do guia de Combat Power (fontes + poder invisível).
const CP_CHECKS = [...CP_GUIDE.sources, ...CP_GUIDE.invisible].flatMap((s) => s.checks);
