/* ============================================================
   Dados: Arcana — que skills cada carta pode carregar, por classe
   (guia "Arcana" da aba Guias). Os nomes batem com SKILL_DB, de onde
   vêm ícone, efeito e especializações.
   Ordem de cada lista = a do Raid Relay (skills principais primeiro).
   Fonte: https://raidrelay.com/aion-2-arcana-guide#skills
   ============================================================ */

// As 5 cartas: tipo de skill que carregam e onde caem (Transcendence).
const ARCANA_CARDS = [
  { id: "parchment", name: "Parchment", type: "active", pool: "6 skills ativas", drop: "Shattered Arkanis" },
  { id: "compass", name: "Compass", type: "active", pool: "as outras 6 skills ativas", drop: "Deus Research Base" },
  { id: "bell", name: "Bell", type: "passive", pool: "5 skills passivas", drop: "Deus Research Base" },
  { id: "mirror", name: "Mirror", type: "passive", pool: "as outras 5 skills passivas", drop: "Shattered Arkanis" },
  { id: "chalice", name: "Chalice", type: "any", pool: "qualquer uma das 22", drop: "as duas" },
];

// classe → carta → nomes das skills (o Chalice sorteia de todas as 22).
const ARCANA_CARD_SKILLS = {
  templar: {
    parchment: ["Judgment", "Vicious Strike", "Poach", "Annihilate", "Debilitating Smash", "Punishment"],
    compass: ["Pummel", "Shield Smite", "Shield Rush", "Warding Strike", "Flash Rampage", "Defiance"],
    bell: ["Enhance Health", "Punishing Benediction", "Guarding Seal", "Insulting Roar", "Fury"],
    mirror: ["Warding Shield", "Ironclad Defense", "Impact Hit", "Survival Willpower", "Block Pain"],
  },
  gladiator: {
    parchment: ["Overhead Slam", "Keen Strike", "Leaping Slam", "Ankle Slice", "Aerial Snare", "Ruinous Blow"],
    compass: ["Rending Blow", "Mocking Blade", "Rush Strike", "Crushing Wave", "Sword Aura Rampage", "Defiance"],
    bell: ["Survival Stance", "Blood Absorption", "Attack Preparation", "Destructive Impulse", "Survival Willpower"],
    mirror: ["Protection Armor", "Identify Weakness", "Impact Hit", "Experienced Counterstrike", "Murderous Burst"],
  },
  assassin: {
    parchment: ["Heart Gore", "Quick Slice", "Shadowstrike", "Whirlwind Slice", "Shadow Fall", "Insignia Explosion"],
    compass: ["Ambush", "Savage Roar", "Infiltrate", "Flash Slice", "Storm Rampage", "Defiance"],
    bell: ["Heightened Sixth Sense", "Apply Poison", "Assault Stance", "Ambush Stance", "Revitalization Contract"],
    mirror: ["Exploit Weakness", "Rear Smite", "Impact Hit", "Defense Break", "Determination"],
  },
  ranger: {
    parchment: ["Snipe", "Snare Shot", "Drill Dart", "Burst Arrow", "Explosion Trap", "Tempest Shot"],
    compass: ["Deadshot", "Gale Arrow", "Marking Shot", "Suppressing Arrow", "Arrow Scattershot", "Defiance"],
    bell: ["Vigilant Eye", "Wind Vigor", "Hunter's Resolve", "Rooting Eye", "Revitalization Contract"],
    mirror: ["Concentrated Fire", "Focused Eye", "Unyielding Resolve", "Melee Fire", "Hunter's Soul"],
  },
  sorcerer: {
    parchment: ["Firestorm", "Blaze", "Wish of Concentration", "Flame Arrow", "Frost Burst", "Hellfire"],
    compass: ["Ice Chain", "Bittercold Wind", "Frost", "Winter's Shackles", "Flame Scattershot", "Defiance"],
    bell: ["Fire Mark", "Cold Snap", "Robe of Cold", "Grace of Resistance", "Revitalization Contract"],
    mirror: ["Robe of Earth", "Robe of Flame", "Absorb Essence", "Grace of Enhancement", "Vitality Evaporation"],
  },
  spiritmaster: {
    parchment: ["Elemental Fusion", "Summon: Fire Spirit", "Cold Shock", "Jointstrike: Curse", "Summon: Earth Spirit", "Dimensional Control"],
    compass: ["Combustion", "Summon: Water Spirit", "Soul's Cry", "Summon: Wind Spirit", "Rapid Scattershot", "Defiance"],
    bell: ["Spirit Strike", "Spirit's Descent", "Spirit Revitalization", "Spirit Communion", "Element Unification"],
    mirror: ["Spirit Protection", "Corrode", "Mental Focus", "Consecutive Countercurrent", "Revitalization Contract"],
  },
  cleric: {
    parchment: ["Condemnation", "Bolt", "Earth's Retribution", "Debilitating Mark", "Chain of Torment", "Radiant Recovery"],
    compass: ["Divine Aura", "Judgment Thunder", "Light of Regeneration", "Healing Light", "Lightning Strike Scattershot", "Defiance"],
    bell: ["Warm Benediction", "Empyrean Lord's Grace", "Immortal Veil", "Prayer of Concentration", "Survival Willpower"],
    mirror: ["Empyrean Lords' Benediction", "Healing Enhancement", "Heal Block", "Radiant Benediction", "Earth's Grace"],
  },
  chanter: {
    parchment: ["Dark Crush", "Onslaught", "Rushing Smash", "Wave Blow", "Heat Wave Blow", "Spinning Strike"],
    compass: ["Incandescent Blow", "Impactful Crush", "Tremor Crush", "Recuperation", "Gust Rampage", "Defiance"],
    bell: ["Blessing of Life", "Protection Circle", "Attack Preparation", "Raging Spell", "Survival Willpower"],
    mirror: ["Crossguard", "Inspiring Spell", "Impact Hit", "Earth's Promise", "Wind's Promise"],
  },
};
