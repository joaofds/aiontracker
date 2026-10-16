/* Guia de build: sorcerer (sub-aba "Guia"). Formato e helpers em class-guides/index.js. */

CLASS_GUIDES.sorcerer = [
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
];
