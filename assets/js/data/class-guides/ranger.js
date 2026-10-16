/* Guia de build: ranger (sub-aba "Guia"). Formato e helpers em class-guides/index.js. */

CLASS_GUIDES.ranger = [
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
];
