/* ============================================================
   Dados: guias de build por classe (sub-aba "Guia" de cada classe),
   indexados pelo id da classe. Cada classe tem uma lista de builds;
   com mais de uma, a sub-aba mostra um seletor. Só classes com guia
   ganham a sub-aba. Nomes de skill/atributo em inglês (os de skill
   batem com o SKILL_DB, que fornece ícone e texto das especializações).
   Fonte: AION 2 Guia (hartmannlab) — https://aion2.hartmannlab.xyz/en/class-guides

   Formato de uma build:
   { id, label, source: { name, url }, author?, intro?, sections: [
       { id, icon, title, note?, open?, blocks: [bloco, ...] } ] }

   Blocos (campo `type`):
   - skills:  { title?, items: [{ n, lv?, pts?, specs?: [nº da especialização] }] }
   - ranked:  { title?, items: [nome], extra?: [nome] }  → lista numerada + alternativas
   - defs:    { title?, items: [{ k, chain?: [...], pills?: [...], text? }] }
              chain = ordem de prioridade (▸); pills = lista sem ordem
   - table:   { title?, head: [...], rows: [[célula, ...]] }  (célula pode ser lista de pills)
   - images:  { title?, items: [{ src, caption?, wide? }] }  (src relativo a assets/images/guides/;
              wide = ocupa a linha toda, p/ prints largos e baixos)
   - links:   { title?, items: [{ label, url, desc? }] }
   - tip:     { text }  (aceita HTML)
   Qualquer texto de pill/célula pode ser { t, tag: "kr" | "s2" } para marcar
   conteúdo que ainda não existe no Global (TW/KR) ou previsto pra Season 2.
   ============================================================ */

const kr = (t) => ({ t, tag: "kr" });

// Links que aparecem em todos os guias do hartmannlab.
const GUIDE_LINKS = {
  bible: { label: "Aion 2 bible (Google Doc)", url: "https://docs.google.com/document/d/11u4wLCG1WfL-xSka2Aze0rI9vYRa7mq3N3Gp1bt0AWY/edit?tab=t.0", desc: "base de conhecimento do jogo" },
  skillBuilder: { label: "Skill builder", url: "https://questlog.gg/aion-2/en/skill-builder", desc: "monte os Daevanion boards (questlog.gg)" },
};

// Prints das configurações do jogo usados na macro (iguais para todas as classes).
const MACRO_SETTINGS_IMAGES = [
  { src: "common/settings-quickslot.webp", wide: true, caption: "Skill Quickslot: Quick Use 1 no mouse · Separate Special Skill Hotkey: OFF" },
  { src: "common/settings-macro.webp", wide: true, caption: "Gameplay › Macro no botão do mouse" },
];
const MACRO_TIP = "<b>Macro:</b> segure 2 botões — LMB (clique esquerdo) + a tecla de macro que preferir (RMB recomendado).";

// Monta uma build no formato das "old-builds" do hartmannlab: as seções de Genus Insight,
// asas, títulos, armas, pulseiras/broches/selos, Theostones e Pantheon são iguais para
// todas as classes; o resto vem de `o`:
// { slug, intro, skillsNote?, skills, passives, passivesExtra?, stigmas, stigmasExtra?,
//   arcana?: { chalice, parchment, compass, bell, mirror, scales } (efeitos em ordem; "N nome" força o número),
//   wingsMeta, gearPassives: [p1, p2], armor?: { slot: chain } (substitui slots), gearNote?,
//   earring, rings, manastones, setup: [blocos], extraSections?: [seções], links?: [links] }
function hartmannBuild(o) {
  const url = `https://aion2.hartmannlab.xyz/en/${o.slug}/old-build`;
  const numbered = (list) => (list || []).map((n, i) => (/^\d /.test(n) ? n : `${i + 1} ${n}`));
  const arcana = o.arcana || {};
  const effects = (list) => (list?.length ? numbered(list) : ["—"]);
  const [p1, p2] = o.gearPassives;
  const armor = {
    Helmet: ["Incoming Heal", p1, p2, "Double Chance", "Attack Increase", "Crit", "Attack"],
    Shoulders: ["Critical Damage Boost", p1, p2, "Accuracy", "Crit", "Attack", "Defense Increase"],
    Chest: ["Damage Boost", p1, p2, "Crit", "Accuracy", "Attack", "Defense Increase"],
    Legs: ["Damage Tolerance", p1, p2, "Perfect Increase", "Attack Increase", "Crit", "Attack"],
    "Gloves / Boots": ["Speed", p1, p2, "Perfect Chance", "Crit", "Attack", "Defense Increase"],
    Cape: [p1, p2, "Smite", "Double Chance", "Attack Increase", "Crit", "Attack"],
    ...o.armor,
  };

  return {
    id: "hartmannlab", label: "Build da comunidade",
    source: { name: "AION 2 Guia (hartmannlab) — old build", url }, author: "Yuukis",
    intro: o.intro,
    sections: [
      {
        id: "skills", icon: "⚔️", title: "Skills", open: true,
        note: o.skillsNote || "Enquanto sobe de nível, priorize as skills marcadas com nível 20.",
        blocks: [
          { type: "skills", title: "Ativas — nível alvo e especializações", items: o.skills },
          { type: "ranked", title: "Passivas", items: o.passives, extra: o.passivesExtra },
          { type: "ranked", title: "Stigmas", items: o.stigmas, extra: o.stigmasExtra },
        ],
      },
      {
        id: "arcana", icon: "🔮", title: "Arcana",
        note: o.arcana
          ? "Os efeitos de equipamento são exemplos — nem sempre vêm exatamente iguais."
          : "O guia ainda não lista os efeitos das Arcanas de Vigor/Magic para esta classe; só os God Stats.",
        blocks: [
          {
            type: "table", head: ["Arcana", "God Stats", "Efeitos de equipamento (prioridade)"],
            rows: [
              ["Chalice (Vigor)", "Time", effects(arcana.chalice)],
              ["Parchment (Vigor)", "Life / Destiny", effects(arcana.parchment)],
              ["Compass (Magic)", "Death / Freedom", effects(arcana.compass)],
              ["Bell (Magic)", "Destruction", effects(arcana.bell)],
              ["Mirror (Magic)", "Illusion / Wisdom", effects(arcana.mirror)],
              [kr("Scales"), "Destruction", effects(arcana.scales)],
              [kr("Key"), "Attack", ["1 Boss Damage", "2 Critical Damage"]],
              [kr("Hourglass"), "Defense", ["1 Max Attack", "2 Boss Attack", "3 Critical Attack"]],
              [kr("Dice"), "Accuracy", ["1 Double Chance"]],
              [kr("Lantern"), "Evasion", ["1 Endurance"]],
            ],
          },
        ],
      },
      {
        id: "genus", icon: "🧩", title: "Genus Insight",
        note: "O que pegar em cada linha de cada tabuleiro. ▸ indica a alternativa seguinte.",
        blocks: [
          {
            type: "defs", title: "Linhas comuns a todos os tabuleiros",
            items: [
              { k: "Linhas 1 e 5", chain: ["Max Attack", "Attack Bonus"] },
              { k: "Linhas 2 e 8", pills: ["HP Increase %"] },
              { k: "Linhas 3, 6 e 9", chain: ["Crit, Accuracy", "Power Shard (se não bateu o cap)"] },
              { k: "Linha 7", chain: ["DMG Tolerance, PvE DMG Tolerance", "Endurance"] },
            ],
          },
          {
            type: "defs", title: "Linha 4 — muda por tabuleiro",
            items: [
              { k: "Cogni", chain: ["Critical Damage Boost", "Damage Boost"] },
              { k: "Natura", pills: ["Multi Hit / Perfect Chance (linhas 4 e 7)"] },
              { k: "Special", pills: ["Double Chance"] },
              { k: "Fera", chain: ["Weapon Damage Boost", "Damage Boost"] },
              { k: "Varian", pills: ["Front/Back Damage Boost"] },
            ],
          },
        ],
      },
      {
        id: "wings-titles", icon: "🪽", title: "Asas e títulos",
        blocks: [
          {
            type: "defs", title: "Asas",
            items: [
              { k: "Mais usadas no meta", pills: o.wingsMeta },
              {
                k: "Melhores para evoluir",
                pills: [
                  kr("Azure Flash Wings"), kr("Awaken Pride Wings"), "Blue Wave Wings", "Brawler Wings",
                  kr("Dramata Nest Wings"), kr("Eroded Wings"), "Forest Spirit Wings",
                  kr("Illusory Echo Wings"), "Nightmare Wings", kr("Salvation Wings"), "Talisra Wings", "Ultimate Daeva Wings",
                ],
              },
              { k: "Prioridade de aprimoramento", chain: ["Double Chance", "Weapon Damage Boost", "Damage Boost", "Attack", "Accuracy e Critical Hit"] },
            ],
          },
          {
            type: "defs", title: "Títulos",
            items: [
              { k: "Ofensivos", chain: ["Playing God", "Unbound Genus", "Guardian of Verteron"] },
              { k: "Defensivos", pills: ["Saint of Verteron", "Rule All Creation", "Dominator of All Dimensions"] },
              { k: "Especiais", chain: ["Empty Closet", "Through Hell and Back"] },
            ],
          },
        ],
      },
      {
        id: "gear", icon: "💎", title: "Equipamento (Soul Binding)",
        note: ["Ordem de prioridade dos atributos ao vincular cada peça.", o.gearNote].filter(Boolean).join(" "),
        blocks: [
          {
            type: "defs", title: "Armas",
            items: [
              { k: "Weapon", chain: ["Weapon Damage Boost", "Combat Speed", "Might", "Precision", "Damage Boost", "Multi Hit Chance", "Attack"] },
              { k: "Guard", chain: ["Weapon Damage Boost", "Combat Speed", "Damage Boost", "Might", "Precision", "Multi Hit Chance", "Attack"] },
            ],
          },
          { type: "defs", title: "Armadura", items: Object.entries(armor).map(([k, chain]) => ({ k, chain })) },
          {
            type: "defs", title: "Acessórios",
            items: [
              { k: "Earring / Necklace", chain: o.earring },
              { k: "Rings", chain: o.rings },
              { k: "Bracelets", chain: ["Wisdom", "Destruction", "Time", "Illusion", "Death", "Justice", "Life", "Space", "Freedom", "Destiny"] },
              { k: "Brooches", chain: ["Might", "Precision", "Accuracy", "Crit", "Constitution"] },
              { k: "Seals", chain: ["Attack", "Boss Attack", "Max Attack", "Crit Attack", "PvE Attack", "Power Shard Damage Bonus"] },
            ],
          },
          {
            type: "defs", title: "Manastones e Theostones",
            items: [
              { k: "Manastones", chain: o.manastones },
              { k: "Theostones", text: "Poison e Beast rendem mais no começo; depois todos os tipos performam parecido, então não vale gastar muito escolhendo." },
            ],
          },
        ],
      },
      {
        id: "pantheon", icon: "🏛️", title: "Pantheon",
        blocks: [
          {
            type: "defs",
            items: [
              { k: "Colossus", chain: ["Zikel / Kromede", { t: "Kaisinel", tag: "s2" }] },
              { k: "Statues", pills: ["Freedom", "Death", "Space"] },
              { k: "Paintings", chain: ["Illusion e Wisdom", "Life"] },
            ],
          },
        ],
      },
      { id: "setup", icon: "🎮", title: "Layout de skills e macro", blocks: o.setup },
      ...(o.extraSections || []),
      {
        id: "resources", icon: "🔗", title: "Recursos",
        blocks: [
          {
            type: "links",
            items: [
              ...(o.links || []),
              GUIDE_LINKS.skillBuilder,
              GUIDE_LINKS.bible,
              { label: "Guia original", url, desc: "hartmannlab — mantido pelo Yuukis" },
            ],
          },
        ],
      },
    ],
  };
}

// Builds estruturadas (montadas no gerador de builds do hartmannlab): seções geradas a
// partir da base de dados do site — skills, rotação, Arcana, equipamento, Genus Insight,
// Daevanion boards, asa, títulos e Pantheon da build de referência.
const CLERIC_PVE_SECTIONS = [
  {
    id: "skills",
    icon: "⚔️",
    title: "Skills",
    open: true,
    blocks: [
      {
        type: "skills",
        title: "Ativas — pontos e especializações",
        items: [
          { n: "Earth's Retribution", specs: [1, 2], pts: 10 },
          { n: "Judgment Thunder", specs: [2, 3, 5], pts: 10 },
          { n: "Bolt", specs: [3, 4], pts: 10 },
          { n: "Chain of Torment", specs: [2, 4], pts: 10 },
          { n: "Debilitating Mark", specs: [2, 4], pts: 10 },
          { n: "Light of Regeneration", specs: [1, 2], pts: 10 },
          { n: "Healing Light", specs: [1, 4], pts: 10 },
          { n: "Radiant Recovery", specs: [2, 3], pts: 10 },
          { n: "Divine Aura", specs: [3, 4, 5], pts: 10 },
          { n: "Defiance", specs: [1], pts: 10 },
          { n: "Condemnation", specs: [2, 4, 5], pts: 10 },
        ],
      },
      { type: "defs", items: [{ k: "Ativas sem pontos", pills: ["Lightning Strike Scattershot"] }] },
      {
        type: "defs",
        title: "Passivas (10 pts cada)",
        items: [
          {
            k: "Passivas",
            pills: [
              "Warm Benediction",
              "Empyrean Lords' Benediction",
              "Empyrean Lord's Grace",
              "Healing Enhancement",
              "Immortal Veil",
              "Prayer of Concentration",
              "Earth's Grace",
              "Survival Willpower",
              "Radiant Benediction",
            ],
          },
        ],
      },
      {
        type: "ranked",
        title: "Stigmas",
        items: ["Light of Protection (rank 20)", "Prayer of Amplification (rank 20)", "Noble Aura (rank 20)", "Summon Resurrection (rank 2)"],
      },
    ],
  },
  {
    id: "rotation",
    icon: "🎮",
    title: "Rotação e macro",
    blocks: [
      {
        type: "table",
        title: "Barra de skills",
        head: ["Coluna", "Uso", "Skills"],
        rows: [
          ["Coluna 1", "livre", ["Debilitating Mark"]],
          ["Coluna 2", "livre", ["Divine Aura"]],
          ["Coluna 3", "você aperta", ["Bolt"]],
          ["Coluna 4", "você aperta", ["Radiant Recovery"]],
          ["Coluna 5", "você aperta", ["Summon Resurrection"]],
          ["Coluna 8", "livre", ["Noble Aura", "Prayer of Amplification", "Light of Regeneration"]],
          ["Coluna 9", "livre", ["Healing Light"]],
          ["Coluna 10", "livre", ["Chain of Torment", "Condemnation"]],
          ["Coluna 11", "você segura", ["Earth's Retribution"]],
          ["Coluna 12", "macro dispara", ["Judgment Thunder"]],
        ],
      },
      { type: "defs", items: [{ k: "Colunas na macro", pills: ["Coluna 1", "Coluna 2", "Coluna 8", "Coluna 10", "Coluna 12"] }] },
      {
        type: "defs",
        title: "Prioridades",
        items: [
          {
            k: "Bolt",
            text: "Use depois dos buffs de Prayer of Amplification e Debilitating Mark, de preferência. Se não der, use sempre que estiver fora de recarga.",
          },
          { k: "Healing Light", text: "Use só quando o time precisar." },
          { k: "Radiant Recovery", text: "Use só quando o time precisar." },
        ],
      },
      {
        type: "tip",
        text: "<b>Faça:</b> Mantenha o botão esquerdo do mouse (ataque) pressionado junto com a tecla da macro que você configurou. Use as skills de cura e de ressurreição quando o time precisar.",
      },
      { type: "tip", text: "<b>Evite:</b> Evite ficar sem atacar e não gaste as skills de cura sem necessidade." },
    ],
  },
  {
    id: "arcana",
    icon: "🔮",
    title: "Arcana",
    blocks: [
      {
        type: "table",
        head: ["Arcana", "God Stat", "Efeitos de equipamento"],
        rows: [
          ["Chalice of Vigor +5", "Time", ["Condemnation +3", "Judgment Thunder +4", "Earth's Retribution +1", "Chain of Torment +1"]],
          ["Compass of Magic +5", "Death", ["Light of Regeneration +4", "Healing Light +4", "Defiance +4", "Divine Aura +4"]],
          ["Parchment of Vigor +5", "Life", ["Condemnation +1", "Chain of Torment +3", "Earth's Retribution +3", "Radiant Recovery +4"]],
          [
            "Mirror of Vigor +5",
            "Illusion",
            ["Healing Enhancement +4", "Empyrean Lords' Benediction +2", "Earth's Grace +2", "Radiant Benediction +2"],
          ],
          ["Bell of Magic +5", "Destruction", ["Immortal Veil +4", "Survival Willpower +4", "Empyrean Lord's Grace +3", "Warm Benediction +2"]],
        ],
      },
    ],
  },
  {
    id: "gear",
    icon: "💎",
    title: "Equipamento",
    note: "Atributos escolhidos em cada peça da build de referência.",
    blocks: [
      {
        type: "table",
        head: ["Slot", "Item", "Atributos"],
        rows: [
          ["Weapon", "Splendent Ebony Dragon Lord Mace +20", ["Combat Speed", "Weapon Damage Boost", "Might", "Attack", "Multi-hit Chance"]],
          ["Guard", "Splendent Dark Dragon Lord Guard +20", ["Combat Speed", "Weapon Damage Boost", "Might", "Precision", "Multi-hit Chance"]],
          ["Helmet", "Splendent Ebony Dragon Lord Helm +20", ["Double Chance", "Empyrean Lord's Grace", "Healing Enhancement", "Attack Increase"]],
          [
            "Shoulders",
            "Splendent Wise Dragon Lord Pauldrons +20",
            ["Critical Damage Boost", "Double Chance", "Empyrean Lord's Grace", "Healing Enhancement"],
          ],
          ["Chest", "Splendent Wise Dragon Lord Breastplate +20", ["Damage Boost", "Perfect Chance", "Empyrean Lord's Grace", "Earth's Grace"]],
          ["Legs", "Splendent Wise Dragon Lord Greaves +20", ["Attack Increase", "Perfect Chance", "Radiant Benediction", "Earth's Grace"]],
          ["Gloves", "Splendent Wise Dragon Lord Gloves +20", ["Combat Speed", "Perfect Chance", "Earth's Grace", "Warm Benediction"]],
          ["Boots", "Splendent Wise Dragon Lord Boots +20", ["Move Speed", "Perfect Chance", "Earth's Grace", "Warm Benediction"]],
          ["Cape", "Splendent Wise Dragon Lord Cloak +20", ["Double Chance", "Attack Increase", "Radiant Benediction", "Earth's Grace"]],
          ["Necklace", "Splendent Wise Dragon Lord Necklace +10", ["Combat Speed", "Might", "Precision", "Radiant Benediction", "Immortal Veil"]],
          ["Earring (esq.)", "Splendent Wise Dragon Lord Earrings +20", ["Move Speed", "Might", "Precision", "Immortal Veil", "Radiant Benediction"]],
          [
            "Earring (dir.)",
            "Splendent Wise Dragon Lord Earrings +20",
            ["Move Speed", "Might", "Precision", "Warm Benediction", "Survival Willpower"],
          ],
          [
            "Ring (esq.)",
            "Splendent Wise Dragon Lord Ring +20",
            ["Judgment Thunder", "Condemnation", "Chain of Torment", "Debilitating Mark", "Divine Aura"],
          ],
          [
            "Ring (dir.)",
            "Splendent Wise Dragon Lord Ring +20",
            ["Condemnation", "Chain of Torment", "Debilitating Mark", "Divine Aura", "Judgment Thunder"],
          ],
          ["Bracelet (esq.)", "Abyssal Bracelet +10", ["Illusion [Kaisinel]", "Time [Siel]", "Wisdom [Lumiel]", "Destruction [Zikel]"]],
          ["Bracelet (dir.)", "Abyssal Bracelet +10", ["Illusion [Kaisinel]", "Time [Siel]", "Wisdom [Lumiel]", "Destiny [Marchutan]"]],
          ["Amulet", "Revelation Amulet +10", ["—"]],
          ["Belt", "Noble Belt +10", ["—"]],
          ["Rune (esq.)", "Clash Rune +4", ["—"]],
          ["Rune (dir.)", "Clash Rune +4", ["—"]],
        ],
      },
    ],
  },
  {
    id: "genus",
    icon: "🧩",
    title: "Genus Insight",
    note: "Atributo escolhido em cada linha (L1–L9) de cada tabuleiro.",
    blocks: [
      {
        type: "defs",
        items: [
          {
            k: "Cogni",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Block",
              "L4 Damage Boost",
              "L5 Attack Bonus",
              "L6 Block",
              "L7 Damage Tolerance",
              "L8 HP Increase",
              "L9 Block",
            ],
          },
          {
            k: "Natura",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Block",
              "L4 Perfect Chance",
              "L5 Attack Bonus",
              "L6 Block",
              "L7 Status Effect Resist",
              "L8 HP Increase",
              "L9 Block",
            ],
          },
          {
            k: "Special",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Block",
              "L4 Double Chance",
              "L5 Attack Bonus",
              "L6 Block",
              "L7 Damage Tolerance",
              "L8 HP Increase",
              "L9 Block",
            ],
          },
          {
            k: "Fera",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Block",
              "L4 Damage Boost",
              "L5 Attack Bonus",
              "L6 Block",
              "L7 Damage Tolerance",
              "L8 HP Increase",
              "L9 Block",
            ],
          },
          {
            k: "Varian",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Block",
              "L4 Attack Bonus",
              "L5 Attack Bonus",
              "L6 Block",
              "L7 Block",
              "L8 HP Increase",
              "L9 Block",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "boards",
    icon: "🗺️",
    title: "Daevanion boards",
    note: "Atributos e níveis de skill liberados em cada tabuleiro.",
    blocks: [
      {
        type: "defs",
        items: [
          {
            k: "Nezekan · atributos (60 pts)",
            pills: ["Attack", "Combat Speed", "Cooldown Reduction", "Critical Hit", "Critical Hit Resist", "Defense", "Max HP", "Max MP"],
          },
          {
            k: "Nezekan · skills",
            pills: [
              "Empyrean Lord's Grace +2",
              "Empyrean Lords' Benediction +2",
              "Healing Enhancement +2",
              "Immortal Veil +2",
              "Warm Benediction +2",
              "Bolt +1",
              "Chain of Torment +1",
              "Condemnation +1",
              "Debilitating Mark +1",
              "Defiance +1",
              "Divine Aura +1",
              "Earth's Retribution +1",
              "Healing Light +1",
              "Judgment Thunder +1",
              "Light of Regeneration +1",
              "Radiant Recovery +1",
            ],
          },
          {
            k: "Zikel · atributos (53 pts)",
            pills: ["Attack", "Critical Hit", "Critical Hit Resist", "Damage Boost", "Damage Tolerance", "Defense", "Max HP", "Max MP"],
          },
          {
            k: "Zikel · skills",
            pills: [
              "Earth's Grace +2",
              "Radiant Benediction +2",
              "Survival Willpower +2",
              "Bolt +1",
              "Chain of Torment +1",
              "Condemnation +1",
              "Debilitating Mark +1",
              "Defiance +1",
              "Divine Aura +1",
              "Earth's Retribution +1",
              "Heal Block +1",
              "Healing Light +1",
              "Judgment Thunder +1",
              "Light of Regeneration +1",
              "Radiant Recovery +1",
            ],
          },
          {
            k: "Vaizel · atributos (57 pts)",
            pills: ["Attack", "Critical Damage Boost", "Critical Damage Tolerance", "Critical Hit", "Critical Hit Resist", "Defense", "Max HP", "Max MP"],
          },
          {
            k: "Vaizel · skills",
            pills: [
              "Bolt +1",
              "Chain of Torment +1",
              "Condemnation +1",
              "Debilitating Mark +1",
              "Defiance +1",
              "Divine Aura +1",
              "Earth's Retribution +1",
              "Empyrean Lord's Grace +1",
              "Empyrean Lords' Benediction +1",
              "Healing Enhancement +1",
              "Healing Light +1",
              "Judgment Thunder +1",
              "Light of Regeneration +1",
              "Prayer of Concentration +1",
              "Radiant Benediction +1",
              "Radiant Recovery +1",
              "Survival Willpower +1",
              "Warm Benediction +1",
            ],
          },
          {
            k: "Triniel · atributos (74 pts)",
            pills: ["Attack", "Critical Hit", "Critical Hit Resist", "Defense", "Max HP", "Max MP", "Multi-Hit Chance", "Multi-Hit Resist"],
          },
          {
            k: "Triniel · skills",
            pills: [
              "Bolt +1",
              "Chain of Torment +1",
              "Condemnation +1",
              "Debilitating Mark +1",
              "Defiance +1",
              "Divine Aura +1",
              "Earth's Grace +1",
              "Earth's Retribution +1",
              "Empyrean Lord's Grace +1",
              "Heal Block +1",
              "Healing Enhancement +1",
              "Healing Light +1",
              "Immortal Veil +1",
              "Judgment Thunder +1",
              "Light of Regeneration +1",
              "Prayer of Concentration +1",
              "Radiant Benediction +1",
              "Radiant Recovery +1",
              "Survival Willpower +1",
              "Warm Benediction +1",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wings-titles",
    icon: "🪽",
    title: "Asa e títulos",
    blocks: [
      {
        type: "defs",
        items: [
          { k: "Asa", pills: ["Forest Spirit Wings"] },
          { k: "Título Ofensivo", pills: ["Playing God"] },
          { k: "Título Defensivo", pills: ["Dominator of Dimensions"] },
          { k: "Título Especial", pills: ["Empty Closet"] },
        ],
      },
    ],
  },
  {
    id: "pantheon",
    icon: "🏛️",
    title: "Pantheon",
    blocks: [
      {
        type: "defs",
        items: [
          {
            k: "Paintings",
            pills: [
              "Eternal Gartua",
              "Immortal Gartua",
              "Divine Ansas",
              "Phantasm Kasia",
              "Vakron Sky Island",
              "Draupnir",
              "Sentinel K'nash",
              "Watcher Kaira",
              "Black Tentacle Lawa",
              "Centurion Demiros",
              "Desecrator Newbold",
              "Drakan Battalion Weapon Guruta",
            ],
          },
          { k: "Statues", pills: ["Asahr's Mirror (Bound)", "Fortress Guardian Notun (Bound) ×2", "Transcendent Bakarma (Bound)"] },
          { k: "Colossus", pills: ["Zikel's Apparition (Bound)"] },
        ],
      },
    ],
  },
];
const SPIRITMASTER_S1_SECTIONS = [
  {
    id: "skills",
    icon: "⚔️",
    title: "Skills",
    open: true,
    blocks: [
      {
        type: "skills",
        title: "Ativas — pontos e especializações",
        items: [
          { n: "Cold Shock", specs: [3, 4], pts: 10 },
          { n: "Combustion", specs: [4, 5], pts: 10 },
          { n: "Summon: Fire Spirit", specs: [2, 3], pts: 10 },
          { n: "Summon: Water Spirit", specs: [2, 3], pts: 10 },
          { n: "Summon: Earth Spirit", specs: [2, 3], pts: 10 },
          { n: "Jointstrike: Curse", specs: [4, 5], pts: 10 },
          { n: "Defiance", specs: [3], pts: 7 },
          { n: "Elemental Fusion", specs: [1, 5], pts: 10 },
          { n: "Dimensional Control", specs: [2, 4], pts: 10 },
        ],
      },
      { type: "defs", items: [{ k: "Ativas sem pontos", pills: ["Soul's Cry", "Summon: Wind Spirit", "Rapid Scattershot"] }] },
      {
        type: "defs",
        title: "Passivas (10 pts cada)",
        items: [
          {
            k: "Passivas",
            pills: [
              "Spirit Strike",
              "Spirit Protection",
              "Spirit's Descent",
              "Corrode",
              "Spirit Revitalization",
              "Mental Focus",
              "Spirit Communion",
              "Element Unification",
              "Revitalization Contract",
              "Consecutive Countercurrent",
            ],
          },
        ],
      },
      {
        type: "ranked",
        title: "Stigmas",
        items: ["Summon: Ancient Spirit (rank 20)", "Enhance: Spirit's Benediction (rank 20)", "Jointstrike: Corrode (rank 20)", "Flame Blessing (rank 20)"],
      },
    ],
  },
  {
    id: "rotation",
    icon: "🎮",
    title: "Rotação e macro",
    blocks: [
      {
        type: "table",
        title: "Barra de skills",
        head: ["Coluna", "Uso", "Skills"],
        rows: [
          ["Coluna 1", "macro dispara", ["Elemental Fusion", "Summon: Earth Spirit", "Summon: Water Spirit", "Summon: Fire Spirit"]],
          ["Coluna 3", "macro dispara", ["Enhance: Spirit's Benediction", "Flame Blessing", "Summon: Ancient Spirit"]],
          ["Coluna 11", "você segura", ["Cold Shock"]],
          ["Coluna 12", "macro dispara", ["Jointstrike: Corrode", "Jointstrike: Curse", "Dimensional Control", "Combustion"]],
        ],
      },
      { type: "defs", items: [{ k: "Colunas na macro", pills: ["Coluna 3", "Coluna 1", "Coluna 12"] }] },
    ],
  },
  {
    id: "arcana",
    icon: "🔮",
    title: "Arcana",
    blocks: [
      {
        type: "table",
        head: ["Arcana", "God Stat", "Efeitos de equipamento"],
        rows: [
          ["Chalice of Vigor +1", "Time", ["Elemental Fusion +2", "Jointstrike: Curse +2"]],
          ["Compass of Vigor", "Freedom", ["Combustion +2"]],
          ["Bell of Magic +2", "Destruction", ["—"]],
          ["Mirror of Magic +2", "Wisdom", ["—"]],
          ["Parchment of Vigor +2", "Life", ["—"]],
        ],
      },
    ],
  },
  {
    id: "gear",
    icon: "💎",
    title: "Equipamento",
    note: "Atributos escolhidos em cada peça da build de referência.",
    blocks: [
      {
        type: "table",
        head: ["Slot", "Item", "Atributos"],
        rows: [
          ["Weapon", "Splendent Dark Dragon Lord Orb +10", ["Combat Speed", "Damage Boost", "Weapon Damage Boost", "Might", "Attack"]],
          ["Guard", "Splendent Dark Dragon Lord Guard +10", ["Combat Speed", "Damage Boost", "Weapon Damage Boost", "Might", "Attack"]],
          ["Helmet", "Splendent Dark Dragon Lord Helm +10", ["Double Chance", "Attack Increase", "Incoming Heal", "Attack", "Endurance"]],
          ["Shoulders", "Splendent Dark Dragon Lord Pauldrons +10", ["Double Chance", "Critical Damage Boost", "Attack"]],
          ["Chest", "Splendent Dark Dragon Lord Breastplate +10", ["Damage Boost", "Perfect Chance", "Attack", "Mental Focus", "Spirit Strike"]],
          [
            "Legs",
            "Splendent Dark Dragon Lord Greaves +10",
            ["Perfect Chance", "Attack Increase", "Damage Tolerance", "Mental Focus", "Element Unification"],
          ],
          ["Gloves", "Splendent Dark Dragon Lord Gloves +10", ["Combat Speed", "Perfect Chance", "Attack", "Mental Focus", "Spirit Strike"]],
          ["Boots", "Splendent Dark Dragon Lord Boots +10", ["Move Speed", "Perfect Chance", "Attack", "Mental Focus", "Element Unification"]],
          ["Cape", "Splendent Dark Dragon Lord Cloak +10", ["Double Chance", "Attack Increase", "Attack"]],
          ["Necklace", "Splendent Dark Dragon Lord Necklace +10", ["Combat Speed", "Might", "Attack"]],
          ["Earring (esq.)", "Splendent Dark Dragon Lord Earrings +10", ["Move Speed", "Might", "Attack", "Mental Focus", "Spirit Strike"]],
          ["Earring (dir.)", "Splendent Dark Dragon Lord Earrings +10", ["Move Speed", "Might", "Attack", "Mental Focus", "Element Unification"]],
          ["Ring (esq.)", "Splendent Dark Dragon Lord Ring +10", ["Might", "Attack", "Critical Hit", "Accuracy", "Elemental Fusion"]],
          ["Ring (dir.)", "Splendent Dark Dragon Lord Ring +10", ["Might", "Attack", "Critical Hit", "Accuracy", "Elemental Fusion"]],
          ["Amulet", "Revelation Amulet +10", ["—"]],
          ["Belt", "Noble Belt +10", ["—"]],
          ["Rune (esq.)", "Clash Rune +4", ["—"]],
          ["Rune (dir.)", "Clash Rune +4", ["—"]],
        ],
      },
    ],
  },
  {
    id: "genus",
    icon: "🧩",
    title: "Genus Insight",
    note: "Atributo escolhido em cada linha (L1–L9) de cada tabuleiro.",
    blocks: [
      {
        type: "defs",
        items: [
          {
            k: "Cogni",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Critical Hit",
              "L4 Critical Damage Boost",
              "L6 Accuracy Bonus",
              "L7 Damage Tolerance",
              "L8 HP Increase",
              "L9 Power Shard Damage Bonus",
            ],
          },
          {
            k: "Natura",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Accuracy Bonus",
              "L4 Perfect Chance",
              "L5 Attack Bonus",
              "L6 Critical Hit",
              "L7 PvE Damage Tolerance",
              "L8 HP Increase",
              "L9 Power Shard Damage Bonus",
            ],
          },
          {
            k: "Special",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Critical Hit",
              "L4 Double Chance",
              "L5 Attack Bonus",
              "L6 Accuracy Bonus",
              "L7 Accuracy Bonus",
              "L8 HP Increase",
              "L9 Power Shard Damage Bonus",
            ],
          },
          {
            k: "Fera",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Accuracy Bonus",
              "L4 Damage Boost",
              "L5 Attack Bonus",
              "L6 Critical Hit",
              "L7 Damage Tolerance",
              "L8 HP Increase",
              "L9 Power Shard Damage Bonus",
            ],
          },
          {
            k: "Varian",
            pills: [
              "L1 Attack Bonus",
              "L2 HP Increase",
              "L3 Accuracy Bonus",
              "L4 PvE Damage Boost",
              "L5 Attack Bonus",
              "L6 Critical Hit",
              "L7 PvE Damage Tolerance",
              "L8 HP Increase",
              "L9 Power Shard Damage Bonus",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "boards",
    icon: "🗺️",
    title: "Daevanion boards",
    note: "Atributos e níveis de skill liberados em cada tabuleiro.",
    blocks: [
      {
        type: "defs",
        items: [
          {
            k: "Nezekan · atributos (60 pts)",
            pills: ["Attack", "Combat Speed", "Cooldown Reduction", "Critical Hit", "Critical Hit Resist", "Defense", "Max HP", "Max MP"],
          },
          {
            k: "Nezekan · skills",
            pills: [
              "Corrode +2",
              "Spirit Protection +2",
              "Spirit Revitalization +2",
              "Spirit Strike +2",
              "Spirit's Descent +2",
              "Cold Shock +1",
              "Combustion +1",
              "Defiance +1",
              "Dimensional Control +1",
              "Elemental Fusion +1",
              "Jointstrike: Curse +1",
              "Summon: Earth Spirit +1",
              "Summon: Fire Spirit +1",
              "Summon: Water Spirit +1",
            ],
          },
          {
            k: "Zikel · atributos (59 pts)",
            pills: ["Attack", "Critical Hit", "Critical Hit Resist", "Damage Boost", "Damage Tolerance", "Defense", "Max HP", "Max MP"],
          },
          {
            k: "Zikel · skills",
            pills: [
              "Consecutive Countercurrent +2",
              "Element Unification +2",
              "Mental Focus +2",
              "Revitalization Contract +2",
              "Spirit Communion +2",
              "Cold Shock +1",
              "Combustion +1",
              "Defiance +1",
              "Dimensional Control +1",
              "Elemental Fusion +1",
              "Jointstrike: Curse +1",
              "Summon: Earth Spirit +1",
              "Summon: Fire Spirit +1",
              "Summon: Water Spirit +1",
            ],
          },
          {
            k: "Vaizel · atributos (61 pts)",
            pills: ["Attack", "Critical Damage Boost", "Critical Damage Tolerance", "Critical Hit", "Critical Hit Resist", "Defense", "Max HP", "Max MP"],
          },
          {
            k: "Vaizel · skills",
            pills: [
              "Cold Shock +1",
              "Combustion +1",
              "Consecutive Countercurrent +1",
              "Corrode +1",
              "Defiance +1",
              "Dimensional Control +1",
              "Element Unification +1",
              "Elemental Fusion +1",
              "Jointstrike: Curse +1",
              "Mental Focus +1",
              "Revitalization Contract +1",
              "Soul's Cry +1",
              "Spirit Protection +1",
              "Spirit Revitalization +1",
              "Spirit Strike +1",
              "Spirit's Descent +1",
              "Summon: Earth Spirit +1",
              "Summon: Fire Spirit +1",
              "Summon: Water Spirit +1",
            ],
          },
          {
            k: "Triniel · atributos (65 pts)",
            pills: ["Attack", "Critical Hit", "Critical Hit Resist", "Defense", "Max HP", "Max MP", "Multi-Hit Chance"],
          },
          {
            k: "Triniel · skills",
            pills: [
              "Cold Shock +1",
              "Combustion +1",
              "Consecutive Countercurrent +1",
              "Corrode +1",
              "Defiance +1",
              "Dimensional Control +1",
              "Element Unification +1",
              "Elemental Fusion +1",
              "Jointstrike: Curse +1",
              "Mental Focus +1",
              "Revitalization Contract +1",
              "Spirit Communion +1",
              "Spirit Protection +1",
              "Spirit Revitalization +1",
              "Spirit Strike +1",
              "Spirit's Descent +1",
              "Summon: Earth Spirit +1",
              "Summon: Fire Spirit +1",
              "Summon: Water Spirit +1",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "wings-titles",
    icon: "🪽",
    title: "Asa e títulos",
    blocks: [
      {
        type: "defs",
        items: [
          { k: "Asa", pills: ["Dark Veil Wings"] },
          { k: "Título Ofensivo", pills: ["Unbound by Genus"] },
          { k: "Título Defensivo", pills: ["Saint of Altgard"] },
          { k: "Título Especial", pills: ["Through Hell and Back"] },
        ],
      },
    ],
  },
  {
    id: "pantheon",
    icon: "🏛️",
    title: "Pantheon",
    blocks: [
      {
        type: "defs",
        items: [
          { k: "Paintings", pills: ["Fire Temple", "Ferocious Horn Den", "Draupnir", "Urugugu", "Vakron Sky Island", "Krao"] },
          { k: "Statues", pills: ["Artifact of Eternity (Bound)", "Transcendent Bakarma (Bound)"] },
          { k: "Colossus", pills: ["Zikel's Apparition (Bound)"] },
        ],
      },
    ],
  },
];

const CLASS_GUIDES = {
  chanter: [
    hartmannBuild({
      slug: "chanter",
      intro: "Build PvE do Chanter focada em dano (Wind's Promise + Impact Hit como passivas centrais). Vale para o servidor Global; itens marcados como TW/KR ainda não chegaram aqui.",
      skills: [
        { n: "Onslaught", lv: "20", specs: [3, 4, 5] },
        { n: "Incandescent Blow", lv: "16", specs: [3, 5] },
        { n: "Rushing Smash", lv: "12", specs: [1, 4] },
        { n: "Impactful Crush", lv: "12", specs: [3, 4] },
        { n: "Dark Crush", lv: "20", specs: [3, 4, 5] },
        { n: "Gust Rampage" },
        { n: "Heat Wave Blow", lv: "12", specs: [3, 4] },
        { n: "Recuperation", lv: "16–20", specs: [1, 4] },
        { n: "Tremor Crush", lv: "12", specs: [2, 3] },
        { n: "Wave Blow", lv: "12", specs: [1, 4] },
        { n: "Spinning Strike", lv: "20", specs: [1, 2, 3] },
        { n: "Defiance", lv: "16", specs: [3, 5] },
      ],
      passives: ["Wind's Promise", "Impact Hit", "Attack Preparation", "Earth's Promise", "Inspiring Spell"],
      stigmas: ["Undefeated Mantra (20)", "Power of the Storm (Lv5+)", "Sprint Mantra (Lv1+)", "Focused Defense (Lv5)"],
      stigmasExtra: ["Guardian Blessing", "Impeding Authority", "Marchutan's Wrath"],
      arcana: {
        chalice: ["Dark Crush", "Wind's Promise", "Impact Hit", "Onslaught"],
        parchment: ["Dark Crush", "Onslaught", "Spinning Strike"],
        compass: ["Incandescent Blow", "Recuperation"],
        bell: ["Attack Preparation"],
        mirror: ["1 Wind's Promise", "1 Impact Hit", "3 Inspiring Spell", "4 Earth's Promise"],
        scales: ["Spinning Strike", "Wind's Promise", "Impact Hit", "Attack Preparation"],
      },
      wingsMeta: [kr("Eroded Wings (45%)"), "Talisra Wings (23%)", kr("Awaken Pride Wings (12.5%)")],
      gearPassives: ["Wind's Promise", "Impact Hit"],
      earring: ["Wind's Promise", "Impact Hit", "Attack Preparation", "Might", "Precision", "Accuracy", "Crit", "Attack"],
      rings: ["Dark Crush", "Onslaught", "Might", "Precision", "Spinning Strike", "Recuperation", "Incandescent Blow", "Attack"],
      manastones: ["Front Damage Boost (se a build for frontal)", "Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Exemplo de layout da barra de skills", items: [{ src: "chanter/skill-layout.webp" }] },
        { type: "tip", text: `${MACRO_TIP} A macro dispara Dark Crush com delay de 10 ms.` },
        { type: "images", title: "Configuração da macro", items: [{ src: "chanter/macro-1.webp", caption: "Macro: Dark Crush, delay 10 ms" }, ...MACRO_SETTINGS_IMAGES] },
      ],
      extraSections: [
        {
          id: "boards", icon: "🗺️", title: "Daevanion boards",
          note: "Exemplos de distribuição de pontos nos tabuleiros. Para montar o seu, use o skill builder do questlog.gg (link em Recursos).",
          blocks: [
            {
              type: "images",
              items: [
                { src: "chanter/board-nezekan.webp", caption: "Nezekan" },
                { src: "chanter/board-zikel.webp", caption: "Zikel" },
                { src: "chanter/board-vaizel.webp", caption: "Vaizel" },
                { src: "chanter/board-triniel.webp", caption: "Triniel" },
                { src: "chanter/board-azphel.webp", caption: "Azphel" },
              ],
            },
          ],
        },
      ],
      links: [
        { label: "Character build", url: "https://questlog.gg/aion-2/en/character-builder/SacredJuniorOfTheFlame?build-id=8282", desc: "build completa no questlog.gg" },
      ],
    }),
  ],

  cleric: [
    {
      id: "pve", label: "Cleric PvE",
      source: { name: "AION 2 Guia (hartmannlab) — Cleric PvE", url: "https://aion2.hartmannlab.xyz/cleric/build-clerigo-pve" },
      author: "MrRosaPony, modificada por Tottergot",
      intro: "Build PvE completa do Cleric: ataca o tempo todo (as curas passivas só disparam atacando) e usa as curas ativas e a ressurreição quando o time precisa. O maior dano vem do Bolt — use depois dos buffs.",
      sections: [
        ...CLERIC_PVE_SECTIONS,
        {
          id: "notes", icon: "📝", title: "Notas do autor",
          blocks: [
            { type: "tip", text: "<b>Rotação:</b> seu maior dano vem do Bolt: tente usá-lo depois dos seus buffs e dos buffs do time para tirar o máximo dele. Mesmo assim, o dano não é o seu foco: o objetivo é ficar atacando e curando. Se você ficar sem atacar, as curas passivas não são ativadas." },
            { type: "tip", text: "<b>Equipamento:</b> as skills dos anéis podem ser focadas mais em cura ou em DPS — escolha conforme o modo que quiser. Os campos sem atributo aceitam qualquer atributo defensivo, se você for craftar os sets. Se não for, chegue o mais perto possível, porque é muito caro." },
          ],
        },
        {
          id: "resources", icon: "🔗", title: "Recursos",
          blocks: [
            {
              type: "links",
              items: [
                { label: "Build de referência", url: "https://questlog.gg/aion-2/en/character-builder/HighBlessingOfCleaver?build-id=9500", desc: "questlog.gg" },
                { label: "Guia original", url: "https://aion2.hartmannlab.xyz/cleric/build-clerigo-pve", desc: "hartmannlab — Cleric PvE" },
              ],
            },
          ],
        },
      ],
    },
    hartmannBuild({
      slug: "cleric",
      intro: "Build PvE do Cleric com Empyrean Lord's Grace + Earth's Grace como passivas centrais, focada em Condemnation e Bolt para o dano.",
      skills: [
        { n: "Earth's Retribution", lv: "12", specs: [2, 4] },
        { n: "Judgment Thunder", lv: "20", specs: [1, 2, 5] },
        { n: "Debilitating Mark", lv: "12", specs: [2, 4] },
        { n: "Divine Aura", lv: "20", specs: [3, 4, 5] },
        { n: "Chain of Torment", lv: "12", specs: [2, 4] },
        { n: "Lightning Strike Scattershot" },
        { n: "Light of Regeneration", lv: "16", specs: [4, 5] },
        { n: "Condemnation", lv: "20", specs: [2, 4, 5] },
        { n: "Healing Light", lv: "20", specs: [1, 4, 5] },
        { n: "Radiant Recovery", lv: "20", specs: [2, 3, 5] },
        { n: "Bolt", lv: "20", specs: [3, 4, 5] },
        { n: "Defiance", lv: "16", specs: [3, 5] },
      ],
      passives: ["Empyrean Lord's Grace", "Earth's Grace", "Healing Enhancement", "Warm Benediction"],
      stigmas: ["Light of Protection", "Earth Punishment", "Absolution", "Summon Resurrection"],
      arcana: {
        chalice: ["Condemnation", "Bolt", "Empyrean Lord's Grace", "Earth's Grace"],
        parchment: ["Condemnation", "Bolt", "Radiant Recovery"],
        compass: ["Divine Aura", "Judgment Thunder"],
        bell: ["Empyrean Lord's Grace"],
        mirror: ["Earth's Grace"],
        scales: ["Empyrean Lord's Grace", "Earth's Grace", "Judgment Thunder"],
      },
      wingsMeta: [kr("Eroded Wings (45%)"), "Talisra Wings (35%)", kr("Illusory Echo Wings (9%)")],
      gearPassives: ["Empyrean Lord's Grace", "Earth's Grace"],
      earring: ["Empyrean Lord's Grace", "Earth's Grace", "Might", "Precision", "Healing Enhancement", "Accuracy", "Crit", "Attack"],
      rings: ["Condemnation", "Bolt", "Radiant Recovery", "Might", "Precision", "Divine Aura", "Judgment Thunder", "Healing Light", "Attack"],
      manastones: ["Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Layout de skills defensivo", items: [{ src: "cleric/skill-layout.webp" }] },
        { type: "tip", text: "<b>Layout defensivo</b> — recomendado com grupo aleatório (especialmente Horn Den e Transcendence). Jogando com um Chanter, dá para trocar Light of Protection por Prayer of Amplification ou pela ressurreição; o ideal é ter um 2º preset para alternar. A ressurreição pode atrapalhar quando uma pessoa morre e outra morre logo depois de você usá-la. Yustiel's Power em certas mecânicas é muito forte e evita mortes." },
        { type: "defs", title: "Rotação", items: [{ k: "Ordem", chain: ["Segure a macro", "Carregue o Bolt (3)", "Cure quando precisar"] }] },
        { type: "tip", text: `${MACRO_TIP} No começo você precisa intercalar o LMB, porque não vai conseguir sustentar o MP só segurando a macro. Enquanto aprende as skills, vale colocar Light of Regeneration na macro (30s de cooldown e 30s de duração) e depois tirar.` },
        { type: "images", title: "Configuração da macro", items: [{ src: "cleric/macro.webp", caption: "Macro: Earth Punishment + Divine Aura, delay 10 ms" }, ...MACRO_SETTINGS_IMAGES] },
      ],
      extraSections: [
        {
          id: "boards", icon: "🗺️", title: "Daevanion boards",
          note: "Bônus dos nós ativados na build “S1 End Game Dungeon Gear” (Whelps, questlog.gg).",
          blocks: [
            {
              type: "defs",
              items: [
                { k: "Nezekan · atributos (80/134)", pills: ["Attack Bonus +21", "Combat Speed +3%", "Cooldown Reduction +3%", "Critical Hit +25", "Critical Hit Resist +25", "Defense Bonus +150", "HP +300", "MP +350"] },
                { k: "Nezekan · skills", pills: ["Empyrean Lord's Grace +2", "Bolt +1", "Chain of Torment +1", "Condemnation +1", "Divine Aura +1", "Earth's Retribution +1", "Healing Enhancement +1", "Healing Light +1", "Immortal Veil +1", "Judgment Thunder +1", "Light of Regeneration +1"] },
                { k: "Zikel · atributos (73/134)", pills: ["Attack Bonus +18", "Critical Hit +20", "Critical Hit Resist +25", "Damage Boost +3%", "Damage Tolerance +3%", "Defense Bonus +120", "HP +500", "MP +200"] },
                { k: "Zikel · skills", pills: ["Earth's Grace +2", "Bolt +1", "Chain of Torment +1", "Divine Aura +1", "Earth's Retribution +1", "Healing Light +1", "Judgment Thunder +1", "Light of Regeneration +1", "Prayer of Concentration +1", "Radiant Benediction +1"] },
                { k: "Vaizel · atributos (80/134)", pills: ["Attack Bonus +12", "Critical Damage Boost +3%", "Critical Damage Tolerance +3%", "Critical Hit +35", "Critical Hit Resist +25", "Defense Bonus +150", "HP +500", "MP +300"] },
                { k: "Vaizel · skills", pills: ["Bolt +1", "Chain of Torment +1", "Condemnation +1", "Divine Aura +1", "Earth's Grace +1", "Earth's Retribution +1", "Empyrean Lord's Grace +1", "Empyrean Lords' Benediction +1", "Healing Light +1", "Judgment Thunder +1", "Radiant Recovery +1", "Warm Benediction +1"] },
                { k: "Triniel · atributos (83/168)", pills: ["Attack Bonus +15", "Critical Hit +30", "Critical Hit Resist +30", "Defense Bonus +150", "HP +600", "MP +350", "Multi-hit Chance +4.5%"] },
                { k: "Triniel · skills", pills: ["Bolt +1", "Chain of Torment +1", "Condemnation +1", "Divine Aura +1", "Earth's Grace +1", "Earth's Retribution +1", "Empyrean Lord's Grace +1", "Empyrean Lords' Benediction +1", "Healing Light +1", "Judgment Thunder +1", "Light of Regeneration +1", "Prayer of Concentration +1", "Radiant Benediction +1", "Warm Benediction +1"] },
              ],
            },
          ],
        },
      ],
      links: [
        { label: "S1 End Game Dungeon Gear", url: "https://questlog.gg/aion-2/en/character-builder/TheSilenceOfTheInfernalMonster?build-id=13798", desc: "build do Whelps no questlog.gg" },
        { label: "youmadsin", url: "https://www.twitch.tv/youmadsin", desc: "streamer de Cleric (Twitch)" },
      ],
    }),
  ],

  templar: [
    hartmannBuild({
      slug: "templar",
      intro: "Build PvE do Templar com Fury + Impact Hit como passivas centrais. Taunt é o stigma mais importante para segurar o aggro.",
      skills: [
        { n: "Vicious Strike", lv: "20", specs: [3, 4, 5] },
        { n: "Pummel", lv: "20", specs: [3, 4, 5] },
        { n: "Poach", lv: "12", specs: [1, 4] },
        { n: "Shield Smite", lv: "12", specs: [3, 4] },
        { n: "Judgment", lv: "20", specs: [3, 4, 5] },
        { n: "Flash Rampage" },
        { n: "Debilitating Smash", lv: "12", specs: [2, 4] },
        { n: "Warding Strike", lv: "16", specs: [1, 5] },
        { n: "Shield Rush", lv: "12", specs: [2, 4] },
        { n: "Annihilate", lv: "12", specs: [3, 4] },
        { n: "Punishment", lv: "20", specs: [3, 4, 5] },
        { n: "Defiance", lv: "16", specs: [3, 5] },
      ],
      passives: ["Fury", "Impact Hit", "Insulting Roar"],
      stigmas: ["Taunt (essencial)", "Noble Armor", "Shield of Protection", "Doom Shield"],
      stigmasExtra: ["Battlefield Banner", "Executing Blade"],
      wingsMeta: [kr("Eroded Wings (77%)"), "Talisra Wings (18.5%)", "Brawler Wings (3.5%)"],
      gearPassives: ["Fury", "Impact Hit"],
      earring: ["Fury", "Impact Hit", "Insulting Roar", "Might", "Precision", "Accuracy", "Crit", "Attack"],
      rings: ["Vicious Strike", "Punishment", "Judgment", "Might", "Precision", "Pummel", "Warding Strike", "Attack"],
      manastones: ["Front Damage Boost", "Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Exemplo de layout da barra de skills", items: [{ src: "templar/skill-layout.webp" }] },
        { type: "tip", text: `${MACRO_TIP} Aperte manualmente o buff do Judgment e o Noble Armor assim que saírem do cooldown.` },
        { type: "images", title: "Configuração da macro", items: [{ src: "templar/macro.webp", caption: "Macro: Battlefield Banner + Annihilate + Shield Smite, delay 10 ms" }, ...MACRO_SETTINGS_IMAGES] },
      ],
    }),
  ],

  gladiator: [
    hartmannBuild({
      slug: "gladiator",
      intro: "Build PvE do Gladiator com Impact Hit + Attack Preparation como passivas centrais e Lunge Stance como stigma principal.",
      skills: [
        { n: "Keen Strike", lv: "12", specs: [2, 4] },
        { n: "Rending Blow", lv: "20", specs: [3, 4, 5] },
        { n: "Leaping Slam", lv: "12", specs: [1, 3] },
        { n: "Mocking Blade", lv: "16", specs: [1, 5] },
        { n: "Overhead Slam", lv: "20", specs: [3, 4, 5] },
        { n: "Sword Aura Rampage" },
        { n: "Ankle Slice", lv: "12", specs: [3, 4] },
        { n: "Crushing Wave", lv: "12", specs: [1, 4] },
        { n: "Rush Strike", lv: "12", specs: [2, 4] },
        { n: "Aerial Snare", lv: "12", specs: [1, 3] },
        { n: "Ruinous Blow", lv: "20", specs: [1, 4, 5] },
        { n: "Defiance", lv: "16", specs: [3, 5] },
      ],
      passives: ["Impact Hit", "Attack Preparation", "Experienced Counterstrike", "Murderous Burst", "Identify Weakness"],
      stigmas: ["Lunge Stance", "Zikel's Blessing", "Rage Burst", "Focused Block"],
      stigmasExtra: ["Lifestealing Blade", "Wave Armor"],
      wingsMeta: [kr("Eroded Wings (45%)"), "Talisra Wings (23%)", kr("Awaken Pride Wings (12.5%)")],
      gearPassives: ["Impact Hit", "Attack Preparation"],
      earring: ["Impact Hit", "Attack Preparation", "Experienced Counterstrike", "Might", "Precision", "Accuracy", "Crit", "Attack"],
      rings: ["Skill principal 1", "Skill principal 2", "Skill principal 3", "Might", "Precision", "Attack"],
      manastones: ["Front Damage Boost (se a build for frontal)", "Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Exemplo de layout da barra de skills", items: [{ src: "gladiator/skill-layout.webp" }] },
        { type: "tip", text: `${MACRO_TIP} Você vai ter problema de MP até o RMB chegar ao nível 16, então no começo segure LMB + RMB (macro): o LMB é a sua fonte de MP.` },
        { type: "images", title: "Configuração da macro", items: [{ src: "gladiator/macro.webp", caption: "Macro: Zikel's Blessing + Lifestealing Blade + Rage Burst, delay 10 ms" }, ...MACRO_SETTINGS_IMAGES] },
      ],
    }),
  ],

  assassin: [
    hartmannBuild({
      slug: "assassin",
      intro: "Build PvE do Assassin com Rear Smite + Assault Stance como passivas centrais e foco em Back Damage.",
      skills: [
        { n: "Quick Slice", lv: "20", specs: [3, 4, 5] },
        { n: "Savage Roar", lv: "16", specs: [2, 3] },
        { n: "Shadowstrike", lv: "12", specs: [2, 3] },
        { n: "Ambush", lv: "12", specs: [1, 2] },
        { n: "Heart Gore", lv: "20", specs: [2, 4, 5] },
        { n: "Storm Rampage", lv: "16", specs: [4, 5] },
        { n: "Whirlwind Slice", lv: "12", specs: [1, 3] },
        { n: "Flash Slice", lv: "12", specs: [2, 4] },
        { n: "Infiltrate", lv: "12", specs: [1, 2] },
        { n: "Shadow Fall", lv: "12", specs: [1, 2] },
        { n: "Insignia Explosion", lv: "20", specs: [2, 3, 5] },
        { n: "Defiance", lv: "16", specs: [3, 5] },
      ],
      passives: ["Rear Smite", "Assault Stance", "Exploit Weakness", "Impact Hit"],
      stigmas: ["Illusive Clone", "Swift Contract", "Triniel's Dagger", "Evasion Block"],
      wingsMeta: [kr("Eroded Wings (45%)"), "Talisra Wings (23%)", kr("Awaken Pride Wings (12.5%)")],
      gearPassives: ["Rear Smite", "Assault Stance"],
      gearNote: "Na armadura, o guia original repete por engano as passivas do Spirit Master (e na capa, as do Chanter); aqui elas foram trocadas pelas passivas principais do Assassin.",
      earring: ["Rear Smite", "Assault Stance", "Exploit Weakness", "Might", "Precision", "Accuracy", "Crit", "Attack"],
      rings: ["Skill principal 1", "Skill principal 2", "Skill principal 3", "Might", "Precision", "Attack"],
      manastones: ["Back Damage Boost", "Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Exemplo de layout da barra de skills", items: [{ src: "assassin/skill-layout.webp" }] },
        { type: "tip", text: `${MACRO_TIP} Aperte manualmente os buffs e as outras skills ativas fora da macro, segurando LMB + macro do jogo. Use o dash quando precisar.` },
        { type: "images", title: "Configuração da macro", items: MACRO_SETTINGS_IMAGES },
      ],
      links: [
        { label: "Assassin in-depth guide", url: "https://aion2-assassin-guide.onrender.com/#skills", desc: "guia aprofundado de Assassin" },
      ],
    }),
  ],

  ranger: [
    hartmannBuild({
      slug: "ranger",
      intro: "Build PvE do Ranger com Focused Eye + Hunter's Resolve como passivas centrais e Vaizel's Authority como stigma principal.",
      skills: [
        { n: "Snipe", lv: "20", specs: [3, 4] },
        { n: "Tempest Shot", lv: "20", specs: [2, 3, 5] },
        { n: "Snare Shot", lv: "12", specs: [2, 3] },
        { n: "Marking Shot", lv: "16", specs: [1, 3] },
        { n: "Drill Dart", lv: "20", specs: [3, 4, 5] },
        { n: "Arrow Scattershot" },
        { n: "Gale Arrow", lv: "20", specs: [3, 4, 5] },
        { n: "Explosion Trap", lv: "12", specs: [1, 3] },
        { n: "Burst Arrow", lv: "16+", specs: [2, 3] },
        { n: "Suppressing Arrow", lv: "12", specs: [1, 3] },
        { n: "Deadshot", lv: "20", specs: [2, 4, 5] },
        { n: "Defiance", lv: "16", specs: [3, 5] },
      ],
      passives: ["Focused Eye", "Hunter's Resolve", "Hunter's Soul", "Concentrated Fire", "Vigilant Eye", "Rooting Eye"],
      stigmas: ["Vaizel's Authority", "Bow of Blessing", "Supporting Fire", "Griffon Arrow"],
      stigmasExtra: ["Mother Nature's Breath", "Explosive Arrow"],
      arcana: {
        chalice: ["Snipe", "Tempest Shot", "Focused Eye", "Hunter's Resolve"],
        parchment: ["Drill Dart", "Snipe", "Tempest Shot", "Burst Arrow"],
        compass: ["Deadshot", "Gale Arrow", "Burst Arrow"],
        bell: ["Hunter's Resolve", "Revitalization Contract", "Vigilant Eye", "Rooting Eye"],
        mirror: ["Focused Eye", "Melee Fire", "Concentrated Fire"],
        scales: ["Focused Eye", "Hunter's Resolve", "Deadshot"],
      },
      wingsMeta: [kr("Eroded Wings (54.5%)"), "Talisra Wings (18.5%)", kr("Illusory Echo Wings (6.5%)")],
      gearPassives: ["Focused Eye", "Hunter's Resolve"],
      armor: {
        "Gloves / Boots": ["Speed", "Focused Eye", "Hunter's Resolve", "Perfect Chance"],
        Cape: ["Focused Eye", "Hunter's Resolve", "Double Chance", "Perfect Chance"],
      },
      earring: ["Focused Eye", "Hunter's Resolve", "Might", "Precision", "Accuracy", "Crit", "Attack"],
      rings: ["Gale Arrow", "Deadshot", "Tempest Shot", "Drill Dart", "Might", "Precision", "Burst Arrow", "Attack"],
      manastones: ["Front Damage Boost (se a build for frontal)", "Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Exemplo de layout da barra de skills", items: [{ src: "ranger/skill-layout.webp" }] },
        { type: "tip", text: `${MACRO_TIP} Aperte o E manualmente para manter o debuff. Dá também para tirar os 3 buffs da macro e apertá-los antes do pull.` },
        { type: "images", title: "Configuração da macro", items: [{ src: "ranger/macro.webp", caption: "Macro: Gale Arrow + Drill Dart + Burst Arrow + Drill Dart, delay 10 ms" }, ...MACRO_SETTINGS_IMAGES] },
      ],
      links: [
        { label: "Ranger in-depth guide (Google Doc)", url: "https://docs.google.com/document/d/1evrt_6e6WSHRT1vMem2i3O7ZlfANJbqyZoSn66IFrBo/edit?tab=t.mtdd5mt631lc", desc: "guia aprofundado de Ranger" },
        { label: "Ranger Daevanion board", url: "https://ranger.tgustafsson.se/#board=238", desc: "ranger.tgustafsson.se" },
        { label: "j0eitv", url: "https://www.twitch.tv/j0eitv", desc: "streamer de Ranger (Twitch)" },
      ],
    }),
  ],

  sorcerer: [
    hartmannBuild({
      slug: "sorcerer",
      intro: "Build PvE do Sorcerer focada em fogo (Robe of Flame + Fire Mark), com Hellfire e Wish of Concentration como núcleo do burst.",
      skillsNote: "No começo, troque algumas especializações por sustain de MP/HP.",
      skills: [
        { n: "Flame Arrow", lv: "20", specs: [3, 4, 5] },
        { n: "Ice Chain", lv: "12", specs: [2, 3] },
        { n: "Firestorm", lv: "20", specs: [2, 4, 5] },
        { n: "Bittercold Wind", lv: "20", specs: [1, 2, 4] },
        { n: "Blaze", lv: "20", specs: [1, 3, 5] },
        { n: "Flame Scattershot" },
        { n: "Frost", lv: "12", specs: [1, 2] },
        { n: "Winter's Shackles", lv: "16", specs: [3, 5] },
        { n: "Frost Burst", lv: "12", specs: [1, 4] },
        { n: "Wish of Concentration", lv: "20", specs: [2, 4, 5] },
        { n: "Hellfire", lv: "20", specs: [1, 3, 5] },
        { n: "Defiance", lv: "16", specs: [2, 3] },
      ],
      passives: ["Robe of Flame", "Fire Mark"],
      stigmas: ["Element Enhancement", "Fire Wall", "Delayed Explosion", "Cold Storm"],
      stigmasExtra: ["Steel Barrier", "Glacial Smite"],
      arcana: {
        chalice: ["Wish of Concentration", "Hellfire", "Flame Arrow", "Robe of Flame"],
        parchment: ["Wish of Concentration", "Hellfire", "Blaze", "Firestorm"],
        compass: ["Bittercold Wind", "Winter's Shackles"],
        bell: ["Fire Mark"],
        mirror: ["Robe of Flame"],
        scales: ["Flame Arrow", "Firestorm", "Robe of Flame", "Fire Mark"],
      },
      wingsMeta: ["Talisra Wings (91.5%)", kr("Eroded Wings (5%)"), "Brawler Wings (2.5%)"],
      gearPassives: ["Robe of Flame", "Fire Mark"],
      earring: ["Robe of Flame", "Might", "Precision", "Fire Mark", "Accuracy", "Crit", "Attack"],
      rings: ["Wish of Concentration", "Hellfire", "Might", "Precision", "Bittercold Wind", "Blaze", "Flame Arrow", "Firestorm"],
      manastones: ["Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Exemplo de layout da barra de skills", items: [{ src: "sorcerer/skill-layout.webp" }] },
        {
          type: "defs", title: "Rotação",
          items: [
            {
              k: "Abertura",
              chain: [
                "Element Enhancement (buff)", "Delayed Explosion (debuff p/ Hellfire + Glacial Smite)", "Hellfire", "Fire Wall", "Cold Storm",
                "Glacial Smite", "Bittercold Wind", "Wish of Concentration (reset de CD + buff)", "Bittercold Wind", "Blaze", "Firestorm",
                "Winter's Shackles (buff; também dá para usar na abertura)", "Delayed Explosion", "Hellfire",
              ],
            },
            { k: "Fora do burst", text: "Blaze + Firestorm (RMB) + LMB no tempo morto; solte todo o resto assim que sair do cooldown." },
          ],
        },
        { type: "tip", text: "<b>Macro do jogo no RMB</b> (clique direito)." },
        { type: "images", title: "Configuração da macro", items: [{ src: "sorcerer/macro.webp", caption: "Macro: Blaze, delay 10 ms" }, ...MACRO_SETTINGS_IMAGES] },
      ],
      links: [
        { label: "Sorcerer in-depth guide (Google Doc)", url: "https://docs.google.com/document/d/1XVciQ8mC7bHo7bAApRk7hLwmT61MxVWTm2III6rUzsM/edit?tab=t.3up96tckgsd3", desc: "guia aprofundado de Sorcerer (fonte da rotação)" },
      ],
    }),
  ],

  spiritmaster: [
    {
      id: "s1", label: "Global Season 1",
      source: { name: "AION 2 Guia (hartmannlab) — Spirit Master Global Season 1", url: "https://aion2.hartmannlab.xyz/en/spirit-master/build-spirit-master-global-season-1" },
      author: "Dean",
      intro: "Build PvE do Spirit Master para a Global Season 1: três macros (buffs, invocações e Jointstrikes) com Cold Shock segurado no LMB.",
      sections: [
        ...SPIRITMASTER_S1_SECTIONS,
        {
          id: "resources", icon: "🔗", title: "Recursos",
          blocks: [
            {
              type: "links",
              items: [
                { label: "Guia original", url: "https://aion2.hartmannlab.xyz/en/spirit-master/build-spirit-master-global-season-1", desc: "hartmannlab — Spirit Master Global Season 1" },
              ],
            },
          ],
        },
      ],
    },
    hartmannBuild({
      slug: "spirit-master",
      intro: "Build PvE do Spirit Master com Spirit Strike + Mental Focus como passivas centrais e Summon: Ancient Spirit como stigma principal.",
      skills: [
        { n: "Cold Shock", lv: "16+", specs: [3, 4] },
        { n: "Combustion", lv: "20", specs: [2, 4, 5] },
        { n: "Summon: Fire Spirit", lv: "16–20", specs: [2, 3, 5] },
        { n: "Summon: Water Spirit", lv: "16–20", specs: [2, 3, 5] },
        { n: "Jointstrike: Curse", lv: "16–20", specs: [1, 2, 3] },
        { n: "Rapid Scattershot" },
        { n: "Summon: Earth Spirit", lv: "12–16", specs: [2, 3] },
        { n: "Dimensional Control", lv: "16", specs: [2, 3] },
        { n: "Summon: Wind Spirit" },
        { n: "Soul's Cry" },
        { n: "Elemental Fusion", lv: "20", specs: [2, 3, 5] },
        { n: "Defiance", lv: "16", specs: [3, 5] },
      ],
      passives: ["Spirit Strike", "Mental Focus", "Element Unification", "Spirit Revitalization"],
      stigmas: ["Summon: Ancient Spirit", "Enhance: Spirit's Benediction", "Jointstrike: Corrode", "Flame Blessing"],
      stigmasExtra: ["Jointstrike: Destructive Attack", "Siphon"],
      arcana: {
        chalice: ["Elemental Fusion", "Combustion", "Spirit Strike", "Mental Focus"],
        parchment: ["Elemental Fusion", "Jointstrike: Curse", "Summon: Fire Spirit", "Cold Shock"],
        compass: ["Combustion", "Summon: Water Spirit"],
        bell: ["Spirit Strike", "Element Unification", "Spirit Revitalization"],
        mirror: ["Mental Focus"],
        scales: ["Jointstrike: Curse", "Summon: Fire/Water Spirit", "Spirit Strike", "Mental Focus"],
      },
      wingsMeta: [kr("Eroded Wings (45%)"), "Talisra Wings (43.5%)", "Brawler Wings (5.5%)"],
      gearPassives: ["Spirit Strike", "Mental Focus"],
      gearNote: "Na capa, o guia original repete por engano as passivas do Chanter; aqui elas foram trocadas pelas do Spirit Master.",
      earring: ["Spirit Strike", "Mental Focus", "Might", "Precision", "Attack Preparation", "Accuracy", "Crit", "Attack"],
      rings: ["Elemental Fusion", "Combustion", "Jointstrike: Curse", "Might", "Precision", "Summon: Fire Spirit", "Summon: Water Spirit", "Attack"],
      manastones: ["Weapon Damage Boost ≈ Critical Damage Boost", "Damage Boost", "Attack"],
      setup: [
        { type: "images", title: "Exemplo de layout da barra de skills", items: [{ src: "spiritmaster/skill-layout.webp" }] },
        { type: "tip", text: `${MACRO_TIP} Aperte os buffs das teclas 1–3 manualmente e depois segure LMB + RMB (macro). O Wind Spirit (tecla 4) é pouco útil — serve mais para farmar mobs. Dá também para invocar os espíritos manualmente alguns segundos antes do pull e então começar a rotação.` },
        { type: "images", title: "Configuração da macro", items: [{ src: "spiritmaster/macro.webp", caption: "Macro: Summon: Water Spirit + Jointstrike: Curse, delay 10 ms" }, ...MACRO_SETTINGS_IMAGES] },
      ],
      links: [
        { label: "Spirit Master in-depth guide", url: "https://aion2-elementalist-guide.netlify.app/#overview", desc: "guia aprofundado de Spirit Master" },
      ],
    }),
  ],
};
