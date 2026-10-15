/* ============================================================
   Dados: checklist de progressão (aba "Progressão"), meta por meta.
   Baseado no roadmap do DeanGamingTV (https://aion2.hartmannlab.xyz/en/roadmap),
   mais alguns extras de exploração da versão anterior. Diárias/semanais ficam em data/routine.js.

   Cada fase: { id, badge, title, subtitle, target?, tip?, items }.
   Itens: { id, text, note?, tag?, guide? } — o `id` é a chave salva no localStorage
   (não renomeie: o progresso marcado se perde). `tag`: "main" | "alt" | "ma" (Main + Alts) | "opt".
   `{ heading: "..." }` no meio dos itens é só um subtítulo (não conta no progresso).
   ============================================================ */

// Rótulos dos selos de item (`tag`).
const ITEM_TAGS = { main: "Main", alt: "Alts", ma: "Main + Alts", opt: "Opcional" };

// Cabeçalho da aba (resumo das metas): crédito e recado do autor do roadmap.
const ROADMAP = {
  credit: { name: "DeanGamingTV", url: "https://youtube.com/@DeanGamingTV", source: "https://aion2.hartmannlab.xyz/en/roadmap" },
  noRush: "Não se sinta obrigado a correr, pular conteúdo ou fazer alts. Jogue do jeito mais divertido: todo mundo chega no mesmo equipamento, mais cedo ou mais tarde.",
};

const DATA = [
  {
    id: "semana1",
    badge: "Semana 1", title: "Primeira semana", target: "1º reset",
    subtitle: "O que fazer antes do primeiro reset semanal (quarta-feira). Meta da semana: Main no nível 45 (Meta 1).",
    items: [
      { id: "w1-nightmare-save", tag: "main", text: "Guardar as entradas de Nightmare" },
      { id: "w1-vip", tag: "ma", text: "VIP / Special Shop" },
      { id: "w1-daily-dungeons", tag: "main", text: "Todas as Daily Dungeons" },
      { id: "w1-draupnir", tag: "main", text: "Draupnir (Conquest 1★) 8x", note: "sem pegar a recompensa final — com 10x você ganha uma Statue" },
      { id: "w1-command", tag: "main", text: "Comprar as Duty/Order Quests (Command Quests)", note: "12 PvE (Outlaw Village) e 20 PvP (Abyss)" },
      { id: "w1-pvp-medals", tag: "main", text: "Comprar as medalhas de PvP semanais", note: "100k Abyss Points" },
      { id: "w1-dg-craft", tag: "ma", text: "Crafting de energia DG", note: "Só Main: 20 DG = 500 White, 100 Green, 20 Blue e 1M Kinah · Main + 3 alts: 32 DG = 800 / 160 / 32 e 1,6M" },
      { id: "w1-ascension", tag: "main", text: "Ascension Trial" },
      { id: "w1-battlefield", tag: "ma", text: "Battlefield", note: "se sobrar tempo" },
      { id: "w1-abyss-7h", tag: "ma", text: "Gastar as 7 horas de Abyss", note: "se sobrar tempo" },
    ],
  },
  {
    id: "meta-45",
    badge: "Meta 1", title: "Gerar energia e levar o Main ao 45", target: "Level 45",
    subtitle: "A partir do nível 22 o personagem passa a gerar energia de dungeon (DG).",
    items: [
      { id: "main-22", tag: "main", text: "Main no nível 22 (1ª Ascensão)", note: "a partir daqui ele gera energia DG" },
      { id: "alts-22", tag: "opt", text: "Alts no nível 22 (1ª Ascensão)", note: "para gerarem energia DG também · nível 45 se quiser acumular entradas de Nightmare (só se for jogar MUITO)" },
      { id: "lvl45", tag: "main", text: "Main no nível 45, fazendo side quests no caminho" },
      { id: "feathers-way", text: "Pegar as penas pelo caminho", note: "~600 no total" },
      { id: "sealed-way", text: "Sealed Dungeons pelo caminho" },
      { id: "side-acc-runes", text: "Side quests: todos os acessórios azuis e as 2 runas", note: "a 2ª runa vem depois de 3 quests dos Hugo Mercenaries" },
    ],
  },
  {
    id: "meta-1000",
    badge: "Meta 2", title: "Do 45 aos 1.000 GS e terminar a MSQ", target: "1.000 GS",
    subtitle: "A quest principal (MSQ) dá a Unique Weapon e a Guard.",
    items: [
      { heading: "No seu mapa" },
      { id: "monolith", text: "Penas do seu mapa", note: "Monolith nível 30" },
      { id: "sealed-own", text: "Sealed Dungeons" },
      { id: "strongholds-own", text: "Strongholds" },
      { id: "side-own", text: "Side quests" },
      { heading: "Upgrades recomendados" },
      { id: "clash-runes", text: "As 2 runas em +1", note: "vêm das side quests — não passe disso agora", guide: "g-gearscore" },
      { id: "amulet-blue", text: "Amuleto azul +0 (ou verde +10)", note: "vem das penas" },
      { id: "belt-blue", text: "Cinto azul +0 (ou verde +10)", note: "vem das Strongholds" },
      { id: "daevanion-spend", text: "Gastar os pontos do Daevanion Board", guide: "g-cp#daevanion" },
      { heading: "Se ainda faltar GS" },
      { id: "gear-3", text: "Todo o equipamento em +3", note: "+48 GS" },
      { id: "lesser-ms", text: "1 Lesser Manastone/Soulstone em cada peça", note: "~3 GS por peça × 16 peças" },
    ],
  },
  {
    id: "meta-1400",
    badge: "Meta 3", title: "Dos 1.000 aos 1.400 GS", target: "1.400 GS",
    subtitle: "Feche todo o conteúdo paralelo e libere as dungeons 2★.",
    tip: "Não gaste energia DG nesta fase: faça só o conteúdo paralelo.",
    items: [
      { heading: "Terminar tudo" },
      { id: "abyss-feathers", text: "Entregar as penas e completar o Monolith de Altgard (Nv 30) e do Abyss (Nv 16)", note: "+36 GS" },
      { id: "last-ascension", text: "Última Ascensão", note: "dá o bracelete dourado +10" },
      { id: "side-quests", text: "Todas as quests verdes", note: "também dão pontos de Daevanion", guide: "g-cp#daevanion" },
      { id: "strongholds-all", text: "Todas as Strongholds" },
      { id: "sealed-all", text: "Todas as Sealed Dungeons" },
      { heading: "Completar o mapa (extras)" },
      { id: "explo-asmo", text: "100% de exploração no lado Asmodian" },
      { id: "explo-elyos", text: "100% de exploração no lado Elyos", note: "invadindo pelas Rifts" },
      { id: "orb-chests", text: "10 baús de Orbe abertos em Strongholds", note: "conquista" },
      { id: "altgard-contracts", text: "Os 12 contratos de Altgard" },
      { id: "abyss-contracts", text: "Os 20 contratos do Abyss" },
      { id: "azphel", text: "Azphel Daevanions comprados", note: "na loja do Abyss" },
      { heading: "Upgrades" },
      { id: "gear-enchant", text: "Itens azuis em +3 (+5 se precisar)", guide: "g-gearscore" },
      { id: "gold-5", text: "Itens dourados em +5" },
      { id: "amulet-belt", text: "Amuleto e cinto dourados", guide: "g-cp#gear" },
      { id: "lesser-ms-all", text: "Lesser Manastone/Soulstone em todo o equipamento" },
      { id: "theostone-green", text: "Theostone verde na arma e na guarda", note: "+10 GS" },
      { id: "nightmare", text: "Nightmare Shop: 20 pontos de Daevanion", note: "custam 6.000 Nightmare Points", guide: "g-cp#daevanion" },
      { heading: "Dungeons 2★ (com 1.400 GS)" },
      { id: "urugugu", text: "Urugugu Canyon (Conquest) até pegar sua arma e acessórios" },
      { id: "vakron-exp", text: "Vakron (Exploration) 3x", note: "pegue a recompensa nas 3, mas NÃO a Pity Reward", guide: "g-vakron" },
      { id: "vakron-conq", text: "Vakron (Conquest) até faltar só 1 peça", note: "a última vem da Pity Reward da Exploration", guide: "g-vakron" },
    ],
  },
  {
    id: "meta-1900",
    badge: "Meta 4", title: "Dos 1.400 aos 1.900 GS", target: "1.900 GS",
    subtitle: "Dourados no +10 e a primeira Transcendence.",
    items: [
      { id: "gold10-2star", text: "10 itens dourados das dungeons 2★ em +10", note: "levam a ~1.800 GS" },
      { id: "transcendence", text: "Transcendence Stage 1 (precisa de 1.600 GS), alternando as duas", note: "+100 GS · Arcana: 5 brancas, ou 1 verde + 3 brancas, ou 2 verdes + 1 branca", guide: "g-cp#arcana" },
    ],
  },
  {
    id: "meta-2100",
    badge: "Meta 5", title: "Dos 1.900 aos 2.100 GS", target: "2.100 GS",
    subtitle: "Transcendence Stage 2 e os ganhos opcionais que faltam.",
    items: [
      { id: "trans-2", text: "Transcendence Stage 2 (precisa de 1.900 GS)", note: "Arcana: 5 azuis, ou 1 dourada + 3 azuis + 1 verde", guide: "g-cp#arcana" },
      { id: "shugo", tag: "opt", text: "Shugo Festival → Daevanion Board", note: "+50 GS", guide: "g-cp#daevanion" },
      { id: "nightmare-daevanion", tag: "opt", text: "Nightmare Shop → Daevanion Board", note: "+30 GS" },
      { id: "all-10", tag: "opt", text: "Todos os itens em +10" },
      { id: "pvp-daevanion", tag: "opt", text: "200k Abyss Points → 20 pontos de Daevanion PvP", note: "+20 GS" },
      { id: "unique-bracelet", tag: "opt", text: "Bracelete Unique +10" },
      { id: "ms-all", tag: "opt", text: "Manastone/Soulstone em tudo", note: "pelo menos 2 verdes ou 1 azul por peça" },
      { id: "acc-farm", tag: "opt", text: "Farm de acessórios" },
    ],
  },
  {
    id: "meta-2800",
    badge: "Meta 6", title: "Dos 2.100 aos 2.800 GS: raid de Ludra", target: "2.800 GS",
    subtitle: "Dungeons 3★ e o equipamento para a raid de 10 jogadores.",
    items: [
      { heading: "Dungeons 3★ (com 2.100 GS)" },
      { id: "horn-exp", text: "Ferocious Horn Den (Exploration) 3x", note: "pegue a recompensa nas 3, mas NÃO a Pity Reward" },
      { id: "horn-conq", text: "Ferocious Horn Den (Conquest) até faltar só 1 peça", note: "a última vem da Pity Reward da Exploration" },
      { id: "fire-temple", text: "Fire Temple (Conquest) até pegar sua arma e acessórios" },
      { heading: "Upgrades" },
      { id: "pieces-3star", text: "As 16 peças da dungeon 3★ em +10 (ou +15)" },
      { id: "arcana-blue", text: "5 Arcanas azuis ou melhores" },
    ],
  },
  {
    id: "depois",
    badge: "Depois", title: "Próximos objetivos", target: "Depois",
    subtitle: "Metas de longo prazo depois da raid.",
    items: [
      { id: "odyle-craft-extra", text: "Juntar 800 White, 160 Green e 32 Blue Odyle", note: "crafting de energia para 1 Main + 3 alts" },
      { id: "pets", text: "Farmar pets", guide: "g-cp#pets" },
      { id: "teleports", text: "Registrar (vincular) todos os teleports", note: "dá a Statue Epic" },
      { id: "fire-temple-10", text: "Fire Temple (Conquest) 10x", note: "dá a Statue Rare" },
      { id: "genus-5", text: "5 Genus Insight no nível 10", note: "PvE damage +1% passivo / +5,5% equipado — ainda não disponível" },
      { id: "fire-temple-ach", text: "32 conquistas no Fire Temple", note: "Colossus Unique — ainda não disponível" },
    ],
  },
];
