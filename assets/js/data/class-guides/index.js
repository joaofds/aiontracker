/* ============================================================
   Dados: guias de build por classe (sub-aba "Guia" de cada classe).
   Cada classe tem o seu arquivo em data/class-guides/<id-da-classe>.js,
   que preenche CLASS_GUIDES.<id-da-classe> com a lista de builds.
   Este arquivo declara o CLASS_GUIDES, documenta o formato e traz os
   helpers compartilhados (kr, GUIDE_LINKS, hartmannBuild…).
   Cada classe tem uma lista de builds; com mais de uma, a sub-aba mostra um seletor. Só classes com guia
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

const CLASS_GUIDES = {};
