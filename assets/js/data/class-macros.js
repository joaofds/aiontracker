/* ============================================================
   Dados: macro de cada classe (sub-aba "Macro" das classes).
   Fonte: KeenGamer — https://www.keengamer.com/articles/guides/aion-2-macro-guide-best-setups-for-all-classes/
   Nomes de skill em inglês, iguais aos do SKILL_DB (que fornece o ícone).

   Formato de uma classe:
   { stacks: [{ name, skills: [nome, ...] }],  // skills na ordem de prioridade (1ª = base da coluna)
     notes?, manual: [[nome, quando usar]], flow?: [passo, ...], warning? }
   A macro dispara as colunas na ordem de `stacks`. Nos textos (HTML), [[Nome da skill]]
   vira ícone + nome.
   ============================================================ */

const MACRO_SOURCE = {
  name: "KeenGamer — AION 2 Macro Guide",
  url: "https://www.keengamer.com/articles/guides/aion-2-macro-guide-best-setups-for-all-classes/",
};

// Como montar a macro (igual para todas as classes).
const MACRO_BASICS = {
  steps: [
    "Aperte <b>K</b> para abrir o menu de Skills.",
    "Organize as skills em <b>colunas de até 4</b> — a skill de <b>baixo</b> tem a maior prioridade.",
    "Clique em <b>Macro</b>, no canto superior direito do menu de Skills.",
    "Adicione as colunas: cada passo da macro ativa a <b>coluna inteira</b>, não uma skill só.",
    "Comece com <b>delay de 10 ms</b>.",
    "Defina a tecla em <b>Settings › Key Settings › General › Gameplay</b>.",
    "No combate, <b>segure</b> a tecla da macro junto com o ataque básico.",
  ],
  settings: [
    ["Delay", "10 ms para começar"],
    ["Ping alto", "40–50 ms se a macro estiver pulando skills"],
    ["Tecla", "Uma tecla confortável ou o botão lateral do mouse"],
    ["Prioridade", "A skill mais importante embaixo da coluna"],
    ["Ataque básico", "Segure junto com a macro"],
    ["Skills carregadas", "Sempre manuais"],
    ["Defensivas", "Em teclas separadas"],
  ],
  tips: [
    "Não é uma rotação fixa, é <b>prioridade</b>: a skill da base dispara sempre que estiver disponível; as de cima só quando as de baixo estão em cooldown.",
    "No modo de controle <b>AION 1</b> a macro precisa ficar numa tecla do teclado — botão do mouse só no modo <b>AION 2</b>.",
    "Comece com 1 ou 2 colunas bem montadas em vez de uma macro complicada.",
    "Segurar o ataque básico junto ajuda no animation cancel e na recuperação de MP.",
    "Buffs de dano de cooldown longo ficam <b>fora</b> da macro, para não gastá-los antes das mecânicas do boss.",
    "Nunca automatize skills carregadas (Deadshot, Hellfire, Punishment).",
    "Se as skills não saem direito, teste o delay e o <b>Skill Queue</b> no boneco de treino.",
    "Revise a macro sempre que ganhar Stigmas ou especializações novas.",
  ],
};

const CLASS_MACROS = {
  gladiator: {
    stacks: [{ name: "Main Damage Stack", skills: ["Rage Burst", "Overhead Slam", "Sword Aura Rampage", "Rending Blow"] }],
    notes: "[[Rage Burst]] fica na base da coluna. [[Sword Aura Rampage]] aproveita as aberturas de stagger e [[Rending Blow]] é o reserva.",
    manual: [
      ["Ruinous Blow", "golpe carregado de alvo único"],
      ["Leaping Slam", "para encurtar a distância"],
      ["Focused Block", "contra ataques que estão vindo"],
      ["Lunge Stance", "antes das janelas de dano"],
      ["Zikel's Blessing", "antes das janelas de dano"],
    ],
    flow: [
      "Ative os buffs ([[Lunge Stance]] e [[Zikel's Blessing]]).",
      "Encoste no alvo com [[Leaping Slam]].",
      "Segure a macro junto com o ataque básico.",
      "Solte o [[Ruinous Blow]] quando houver uma abertura que não atrapalhe uma defesa.",
    ],
  },
  templar: {
    stacks: [
      { name: "Judgment Stack", skills: ["Judgment", "Shield Smite", "Warding Strike"] },
      { name: "Damage Stack", skills: ["Annihilate", "Debilitating Smash", "Pummel"] },
    ],
    notes: "[[Judgment]] só fica disponível depois de certos ataques de escudo, por isso tem a prioridade máxima; [[Shield Smite]] e [[Warding Strike]] preparam os follow-ups dele.",
    manual: [
      ["Punishment", "segure para carregar"],
      ["Doom Shield", "no momento certo, nunca automático"],
      ["Shield Rush", "para chegar no alvo e iniciar"],
      ["Taunt", "em encontros em grupo"],
    ],
    flow: [
      "Inicie com [[Shield Rush]] (e [[Taunt]] em grupo).",
      "Segure a macro para manter a rotação de dano.",
      "Responda aos ataques do boss com as defesas no tempo certo, como o [[Doom Shield]].",
    ],
    warning: "Templar tankando <b>nunca</b> deve depender só da macro — as defesas são sempre manuais.",
  },
  assassin: {
    stacks: [
      { name: "Main Damage Stack", skills: ["Insignia Explosion", "Heart Gore", "Ambush", "Savage Roar"] },
      { name: "Additional Attack", skills: ["Quick Slice"] },
    ],
    notes: "[[Insignia Explosion]] dispara sempre que os requisitos estão cumpridos; [[Savage Roar]], na menor prioridade, mantém a rotação girando.",
    manual: [
      ["Illusive Clone", "nas janelas de dano"],
      ["Swift Contract", "para preparar o burst"],
      ["Savage Fang", "antes da sequência principal"],
      ["Infiltrate", "posicionamento"],
      ["Shadowstrike", "posicionamento"],
      ["Flash Slice", "reposicionar — nunca automático"],
    ],
    flow: [
      "Ative os buffs de burst ([[Swift Contract]] e [[Savage Fang]]) antes de engajar.",
      "Vá para as costas do alvo.",
      "Segure a macro de dano.",
    ],
    warning: "Deixe as skills de mobilidade <b>fora</b> da macro, para não ser jogado para longe na hora errada.",
  },
  ranger: {
    stacks: [
      { name: "Griffon Stack", skills: ["Griffon Arrow", "Snare Shot", "Burst Arrow"] },
      { name: "Gale Stack", skills: ["Gale Arrow", "Drill Dart", "Tempest Shot"] },
    ],
    notes: "[[Griffon Arrow]] entra depois que você libera o Stigma dela.",
    manual: [
      ["Deadshot", "segure para carregar"],
      ["Marking Shot", "antes da rotação"],
      ["Explosion Trap", "dano em área ou reposicionar"],
      ["Bow of Blessing", "em encontros importantes"],
      ["Vaizel's Authority", "nas janelas de dano"],
    ],
    flow: [
      "Ative os buffs ([[Bow of Blessing]] e [[Vaizel's Authority]]) e aplique o [[Marking Shot]].",
      "Solte um [[Deadshot]] carregado.",
      "Segure a macro com o ataque básico — dano extra e recuperação de MP.",
    ],
  },
  sorcerer: {
    stacks: [{ name: "Main Spell Stack", skills: ["Bittercold Wind", "Blaze", "Firestorm", "Wish of Concentration"] }],
    notes: "[[Wish of Concentration]] entra na rotação quando o cooldown e os requisitos permitem.",
    manual: [
      ["Hellfire", "carregue manualmente"],
      ["Element Enhancement", "nas janelas de burst"],
      ["Delayed Explosion", "antes dos feitiços mais fortes"],
      ["Winter's Shackles", "antes de uma sequência de dano"],
      ["Fire Wall", "quando a posição dos inimigos favorece dano em área"],
      ["Cold Storm", "quando a posição dos inimigos favorece dano em área"],
    ],
    flow: [
      "Ative os buffs de dano ([[Element Enhancement]]).",
      "Aplique o [[Delayed Explosion]].",
      "Solte um [[Hellfire]] totalmente carregado.",
      "Volte para a macro.",
    ],
    warning: "Não coloque o [[Hellfire]] na macro: ela não segura a carga direito e ele pode sair sem a força total.",
  },
  spiritmaster: {
    stacks: [
      { name: "Damage Stack", skills: ["Jointstrike: Corrode", "Jointstrike: Curse", "Dimensional Control", "Combustion"] },
      { name: "Spirit Stack", skills: ["Elemental Fusion", "Summon: Water Spirit", "Summon: Earth Spirit", "Summon: Fire Spirit"] },
    ],
    notes: "[[Elemental Fusion]] dispara quando as condições são atendidas. A ordem das invocações pode mudar conforme a sua build e o espírito preferido.",
    manual: [
      ["Flame Blessing", "preparar a rotação dos espíritos"],
      ["Enhance: Spirit's Benediction", "buff manual"],
      ["Summon: Ancient Spirit", "só em encontros importantes"],
      ["Soul's Cry", "contra inimigos mais fortes"],
    ],
    flow: [
      "Ative os buffs dos espíritos ([[Flame Blessing]] e [[Enhance: Spirit's Benediction]]).",
      "Confira se o espírito que você quer está invocado.",
      "Segure a macro.",
    ],
  },
  cleric: {
    stacks: [
      { name: "Main Damage Stack", skills: ["Prayer of Amplification", "Earth Punishment", "Chain of Torment", "Condemnation"] },
      { name: "Additional Damage Stack", skills: ["Divine Aura", "Judgment Thunder"] },
    ],
    notes: "Pensada para <b>farm solo</b>, em que a macro cuida da maior parte do dano. Em grupo, priorize cura e suporte — dá para tirar o [[Prayer of Amplification]] da macro e usá-lo à mão nos bursts combinados.",
    manual: [
      ["Healing Light", "quando você ou um aliado precisar de cura"],
      ["Light of Regeneration", "cura contínua, manual"],
      ["Radiant Recovery", "cura imediata"],
      ["Bolt", "carregue manualmente"],
      ["Light of Protection", "é toggle — fora da macro"],
      ["Debilitating Mark", "quando o inimigo precisar do debuff"],
    ],
    warning: "Não automatize a cura: o efeito depende da vida do grupo e das mecânicas do encontro.",
  },
  chanter: {
    stacks: [{ name: "Main Damage Stack", skills: ["Dark Crush", "Spinning Strike", "Incandescent Blow"] }],
    notes: "[[Dark Crush]] é a prioridade máxima. Segure a macro junto com o ataque básico ([[Onslaught]]) para manter a rotação.",
    manual: [
      ["Rushing Smash", "para encurtar a distância"],
      ["Impactful Crush", "preparar o ataque"],
      ["Marchutan's Wrath", "nas janelas de dano"],
      ["Power of the Storm", "antes de encontros importantes"],
      ["Undefeated Mantra", "mantenha ativo, fora da macro"],
      ["Recuperation", "cura manual"],
    ],
    flow: [
      "Ative o Mantra certo ([[Undefeated Mantra]]) e os buffs de dano ([[Power of the Storm]]).",
      "Engaje com [[Rushing Smash]].",
      "Segure a macro. Em grupo, pause a rotação para curar ou dar suporte.",
    ],
    warning: "Nunca coloque Mantras (toggle) numa macro que repete: ao serem reativados, eles podem desligar no meio do combate.",
  },
};
