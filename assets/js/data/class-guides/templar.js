/* Guia de build: templar (sub-aba "Guia"). Formato e helpers em class-guides/index.js. */

CLASS_GUIDES.templar = [
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
];
