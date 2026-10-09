/* ============================================================
   Dados: skills mais fortes por classe (PvE / PvP), indexadas pelo id da classe.
   Nomes de skill em inglês. Dados da comunidade — revise por patch.
   ============================================================ */
const SKILLS = {
  templar: {
    pve: {
      active: [
        { n: "Judgment", d: "principal dano, disparado pelos ataques de escudo", spec: "Remove cooldown (lvl 16)" },
        { n: "Pummel", d: "base de dano multi-alvo", spec: "subir o máximo de rank" },
        { n: "Punishment", d: "abertura", spec: "buff Executor (+200 Accuracy, +20% PvE Damage)" },
        { n: "Shield Smite", d: "ativa Judgment" },
        { n: "Warding Strike", d: "ativa Judgment + buff de defesa" },
        { n: "Annihilate", d: "usar sempre que disponível" },
      ],
      passive: [
        { n: "Fury", d: "buff de dano ao grupo" },
        { n: "Ironclad Defense", d: "defesa" },
      ],
      stigma: [
        { n: "Doom Shield", d: "dispara Judgment (core)", spec: "reseta Annihilate (lvl 5)" },
        { n: "Battlefield Banner", d: "Attack escala com Defense (core)", spec: "+Multi-Hit e Weapon Damage (lvl 5+)" },
        { n: "Nezekan's Shield", d: "escudo de grupo (raid)" },
        { n: "Shield of Protection", d: "garante Block (tank buster)" },
      ],
    },
    pvp: {
      active: [
        { n: "Debilitating Smash", d: "anti-cura", spec: "-60% Incoming Heal (PvP)" },
        { n: "Poach", d: "puxão à distância com stun" },
        { n: "Shield Rush", d: "gap closer" },
        { n: "Defiance", d: "quebra de CC" },
      ],
      passive: [
        { n: "Impact Hit", d: "melhora acerto de Stun/Knockdown" },
        { n: "Survival Willpower", d: "resistência a Stun" },
      ],
      stigma: [
        { n: "Grapple", d: "controle (pull)" },
        { n: "Taunt", d: "forçar alvo (utilidade)" },
      ],
    },
  },
  gladiator: {
    pve: {
      active: [
        { n: "Overhead Slam", d: "núcleo do build (sem cooldown)", spec: "Remove cooldown (lvl 16)" },
        { n: "Rending Blow", d: "spam multi-alvo", spec: "Mobile; +50 MP no Critical Hit" },
        { n: "Keen Strike", d: "gerador de MP", spec: "+20% MP restaurado" },
        { n: "Ruinous Blow", d: "dano", spec: "+20% Skill Speed" },
      ],
      passive: [
        { n: "Blood Absorption", d: "sustain (lifesteal)" },
        { n: "Murderous Burst", d: "dano" },
      ],
      stigma: [
        { n: "Lunge Stance", d: "core", spec: "lvl 20: CDR no Critical Hit" },
        { n: "Zikel's Blessing", d: "attack boost + stagger" },
        { n: "Rage Burst", d: "janela de burst", spec: "lvl 5: CDR" },
        { n: "Focused Block", d: "defensivo", spec: "lvl 5: 2º uso consecutivo" },
      ],
    },
    pvp: {
      active: [
        { n: "Rush Strike", d: "gap closer com CC" },
        { n: "Leaping Slam", d: "gap closer com CC" },
        { n: "Aerial Snare", d: "controle aéreo" },
      ],
      passive: [
        { n: "Impact Hit", d: "melhora Stun/Knockdown" },
        { n: "Survival Willpower", d: "resistência a Stun" },
      ],
      stigma: [
        { n: "Blade Toss", d: "-30% Defense do alvo", spec: "entra no lugar de Focused Block" },
        { n: "Wave Armor", d: "defensivo" },
        { n: "Lifestealing Blade", d: "sustain em trades" },
      ],
    },
  },
  assassin: {
    pve: {
      active: [
        { n: "Heart Gore", d: "principal", spec: "reset no Critical Hit; +20% Crit chance (lvl 16)" },
        { n: "Quick Slice", d: "garante crit", spec: "sempre crita; reduz CD de Insignia Explosion" },
        { n: "Insignia Explosion", d: "spam", spec: "Multi-Hit, -3s de cooldown" },
        { n: "Savage Roar", d: "gera stacks de insignia", spec: "-20% MP, +20% Skill Speed" },
        { n: "Storm Rampage", d: "usar sem outros cooldowns", spec: "reduz CD de todas as skills no hit" },
      ],
      passive: [
        { n: "Apply Poison", d: "DoT de veneno" },
        { n: "Rear Smite", d: "dano pelas costas" },
      ],
      stigma: [
        { n: "Illusive Clone", d: "core", spec: "lvl 20: remove o cooldown de Heart Gore" },
        { n: "Triniel's Dagger", d: "core", spec: "lvl 10: -10% CD de todas as skills" },
        { n: "Swift Contract", d: "+20% Combat Speed" },
        { n: "Savage Fang", d: "grava 5 Insignias", spec: "lvl 15: +10% PvE Damage" },
      ],
    },
    pvp: {
      active: [
        { n: "Ambush", d: "abertura em stealth pelas costas" },
        { n: "Whirlwind Slice", d: "contra-ataque com evasão" },
      ],
      passive: [
        { n: "Impact Hit", d: "melhora Stun/Knockdown" },
      ],
      stigma: [
        { n: "Shadow Walk", d: "volta ao stealth no meio da luta" },
        { n: "Spiral Slice", d: "burst de PvP" },
        { n: "Aerial Bind", d: "controle aéreo" },
      ],
    },
  },
  ranger: {
    pve: {
      active: [
        { n: "Deadshot", d: "burst (lvl 20)", spec: "+30% Skill Speed, mobile, +dano no hit" },
        { n: "Gale Arrow", d: "buff (lvl 20)", spec: "mobile, -10s CD, +5s de duração" },
        { n: "Snipe", d: "gerador", spec: "CD de Deadshot, Tempest Arrow, +50% Multi-Hit (lvl 20)" },
        { n: "Drill Dart", d: "DoT (lvl 16)", spec: "Multi-Hit, ativação extra, Absorb HP se precisar" },
        { n: "Tempest Shot", d: "dano (lvl 16)", spec: "fewer-targets, +20% Skill Speed" },
        { n: "Marking Shot", d: "buff de precisão", spec: "+5% Perfect Chance, +5s de duração" },
      ],
      passive: [
        { n: "Concentrated Fire", d: "dano" },
        { n: "Focused Eye", d: "dano" },
      ],
      stigma: [
        { n: "Vaizel's Authority", d: "core", spec: "lvl 20: +20% Attack, CDR no Critical Hit" },
        { n: "Bow of Blessing", d: "core", spec: "+200 Crit, +100 Accuracy, +50% Multi-Hit" },
        { n: "Griffon Arrow", d: "DoT (Crimson Flames)" },
        { n: "Supporting Fire", d: "orbe com tiros extras (ou troque por Explosive Arrow)" },
      ],
    },
    pvp: {
      active: [
        { n: "Snare Shot", d: "root para travar o alvo" },
        { n: "Burst Arrow", d: "follow-up no alvo preso" },
        { n: "Deadshot", d: "burst" },
        { n: "Gale Arrow", d: "combat speed em teamfight" },
      ],
      passive: [
        { n: "Rooting Eye", d: "reforça os roots" },
      ],
      stigma: [
        { n: "Explosive Arrow", d: "+20% dano a alvos lentos/presos" },
        { n: "Ensnaring Trap", d: "controle de área" },
        { n: "Arrow Storm", d: "AoE" },
      ],
    },
  },
  sorcerer: {
    pve: {
      active: [
        { n: "Hellfire", d: "nuke assinatura (20%+ do dano)", spec: "+30% Skill Speed (dungeon) / Fire DoT (boss); -15s CD em ranks altos" },
        { n: "Firestorm", d: "gestão de MP + CDR", spec: "-50% MP (cedo); cada bola -2s no CD de Hellfire (lvl 12+)" },
        { n: "Ice Chain", d: "dano/controle", spec: "+20% Skill Speed → -20% MP com gear de cast" },
        { n: "Flame Arrow", d: "sustain", spec: "+20% MP restaurado" },
        { n: "Wish of Concentration", d: "-10s em todas as skills" },
        { n: "Bittercold Wind", d: "AoE multi-hit" },
      ],
      passive: [
        { n: "Fire Mark", d: "dano de fogo" },
        { n: "Grace of Enhancement", d: "dano" },
      ],
      stigma: [
        { n: "Element Enhancement", d: "+dano de fogo/água" },
        { n: "Delayed Explosion", d: "amplificador", spec: "+15% dano recebido durante o delay" },
        { n: "Cold Storm", d: "dano de água (Frostbite)" },
        { n: "Fire Wall", d: "debuff Embers" },
      ],
    },
    pvp: {
      active: [
        { n: "Hellfire", d: "nuke confiável", spec: "Ignores Block and Evasion (PvP)" },
        { n: "Frost Burst", d: "stun" },
        { n: "Winter's Shackles", d: "dano + controle" },
      ],
      passive: [
        { n: "Grace of Resistance", d: "resistências" },
      ],
      stigma: [
        { n: "Steel Barrier", d: "escudo" },
        { n: "Curse: Tree", d: "controle" },
        { n: "Hibernation", d: "invulnerabilidade para escapar" },
      ],
    },
  },
  spiritmaster: {
    pve: {
      active: [
        { n: "Elemental Fusion", d: "payoff de burst (lvl 20)", spec: "+dano no hit, +10 Element Boost, 25% de recuperar Four Elements" },
        { n: "Combustion", d: "single-target; acesso ao Ashy Call", spec: "-20% MP (cedo) / +20% Skill Speed (tarde)" },
        { n: "Cold Shock", d: "spam principal", spec: "+2% Attack + MP (cedo) / +50% Multi-Hit (tarde)" },
        { n: "Dimensional Control", d: "slow", spec: "+dano no hit, +50% Multi-Hit" },
        { n: "Jointstrike: Curse", d: "maldição", spec: "-2s CD, +2s de duração" },
        { n: "Summon: Fire Spirit", d: "espírito", spec: "+20% Critical Hit damage" },
        { n: "Summon: Water Spirit", d: "espírito", spec: "+10% Attack" },
      ],
      passive: [
        { n: "Spirit Strike", d: "dano do espírito" },
        { n: "Element Unification", d: "dano" },
      ],
      stigma: [
        { n: "Summon: Ancient Spirit", d: "core", spec: "lvl 15: skill a cada 5 ataques (em vez de 7)" },
        { n: "Jointstrike: Corrode", d: "amplificador", spec: "+10% dano recebido do seu espírito" },
        { n: "Flame Blessing", d: "dano", spec: "50% de chance de dano extra no hit" },
        { n: "Cursed Cloud", d: "mid-late game" },
      ],
    },
    pvp: {
      active: [
        { n: "Soul's Cry", d: "skill de PvP (evitar em PvE)" },
      ],
      passive: [],
      stigma: [
        { n: "Cry of Terror", d: "fear em grupo" },
        { n: "Seize Magic", d: "remove buffs" },
        { n: "Command: Proxy", d: "redireciona metade do dano ao espírito" },
        { n: "Siphon", d: "cura a cada hit" },
        { n: "Magic Block", d: "defensivo" },
        { n: "Assault Terror", d: "engage com alcance estendido" },
      ],
    },
  },
  cleric: {
    pve: {
      active: [
        { n: "Condemnation", d: "maior dano (lvl 20), reseta crit" },
        { n: "Chain of Torment", d: "libera Condemnation" },
        { n: "Earth's Retribution", d: "dano (lvl 20)" },
        { n: "Radiant Recovery", d: "cura em área + cleanse" },
        { n: "Bolt", d: "ataque carregado" },
        { n: "Divine Aura", d: "buff de Attack Speed" },
      ],
      passive: [
        { n: "Immortal Veil", d: "defensivo", spec: "max: Defense + Critical Hit Resist" },
        { n: "Healing Enhancement", d: "cura escala com Attack", spec: "lvl 10" },
        { n: "Earth's Grace", d: "subir ao máximo" },
      ],
      stigma: [
        { n: "Earth Punishment", d: "garante o crit do Condemnation (DPS)" },
        { n: "Prayer of Amplification", d: "amplifica dano (DPS)" },
        { n: "Noble Aura", d: "buff (DPS)" },
        { n: "Summon Resurrection", d: "ressurreição (suporte)" },
        { n: "Salvation", d: "reset de emergência (suporte)" },
      ],
    },
    pvp: {
      active: [
        { n: "Judgment Thunder", d: "dano com slow" },
        { n: "Debilitating Mark", d: "DoT que reduz defesa" },
        { n: "Healing Light", d: "cura emergencial" },
      ],
      passive: [
        { n: "Survival Willpower", d: "resistência a Stun" },
      ],
      stigma: [
        { n: "Salvation", d: "reset de emergência" },
        { n: "Root", d: "controle" },
        { n: "Light of Protection", d: "escudo de aliado" },
      ],
    },
  },
  chanter: {
    pve: {
      active: [
        { n: "Dark Crush", d: "maior dano single", spec: "lvl 16: crita e remove cooldown" },
        { n: "Spinning Strike", d: "AoE spammável", spec: "-5s de cooldown, fewer-targets" },
        { n: "Onslaught", d: "gerador", spec: "+20% MP, reduz CD de Spinning Strike" },
        { n: "Rushing Smash", d: "reset ao matar", spec: "Charge Skill com reset de CD" },
        { n: "Recuperation", d: "cura", spec: "+1 uso consecutivo, +5% HP restaurado" },
        { n: "Incandescent Blow", d: "dano", spec: "-20% MP consumido" },
      ],
      passive: [
        { n: "Raging Spell", d: "dano" },
        { n: "Attack Preparation", d: "dano" },
      ],
      stigma: [
        { n: "Undefeated Mantra", d: "buff de grupo (core)", spec: "max primeiro: Critical Hit + Accuracy" },
        { n: "Marchutan's Wrath", d: "core", spec: "lvl 5: habilita Dark Crush" },
        { n: "Sprint Mantra", d: "combat speed de grupo (lvl 5)" },
        { n: "Ensnaring Mark", d: "habilita Dark Crush" },
      ],
    },
    pvp: {
      active: [
        { n: "Tremor Crush", d: "cria distância (gap)" },
        { n: "Fracturing Blow", d: "stun que abre janela de burst" },
        { n: "Dark Crush", d: "burst" },
      ],
      passive: [
        { n: "Impact Hit", d: "passiva de PvP (Stun/Knockdown)" },
      ],
      stigma: [
        { n: "Power of the Storm", d: "buff de grupo (+20% Combat Speed, +10% CDR)" },
        { n: "Obliterate", d: "situacional" },
        { n: "Focused Defense", d: "defensivo" },
      ],
    },
  },
};
