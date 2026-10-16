/* Guia de build: assassin (sub-aba "Guia"). Formato e helpers em class-guides/index.js. */

CLASS_GUIDES.assassin = [
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
];
