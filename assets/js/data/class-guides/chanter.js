/* Guia de build: chanter (sub-aba "Guia"). Formato e helpers em class-guides/index.js. */

CLASS_GUIDES.chanter = [
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
];
