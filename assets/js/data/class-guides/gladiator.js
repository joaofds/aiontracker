/* Guia de build: gladiator (sub-aba "Guia"). Formato e helpers em class-guides/index.js. */

CLASS_GUIDES.gladiator = [
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
];
