/* ============================================================
   Dados: rotina (aba "Rotina") — tarefas recorrentes por personagem.
   Baseado na checklist semanal de https://aion2.hartmannlab.xyz/#/checklist
   O `id` de cada tarefa é a chave salva no localStorage.
   ============================================================ */

// Categorias exibidas em cada card, na ordem.
//  - reset: "daily" → limpa todo dia às RESET_HOUR; "weekly" → limpa no reset semanal.
const ROUTINE_CATEGORIES = [
  { id: "daily", icon: "☀️", label: "Diárias / Frequentes", reset: "daily" },
  { id: "weekly", icon: "📅", label: "Semanais", reset: "weekly" },
  { id: "shops", icon: "🛍️", label: "Lojas e Encomendas", reset: "weekly" },
  { id: "events", icon: "⚔️", label: "Eventos do Abyss & Mundo (opcionais)", reset: "weekly" },
];

// Todas as tarefas padrão (Main e Alts compartilham as que têm o mesmo id).
const ROUTINE_TASKS = {
  // Main
  "duty-quests": { cat: "daily", text: "Duty Quests (5x por dia)" },
  "kinah-farm": { cat: "daily", text: "Farmar 1M de Kinah no mundo aberto", note: "fora do Abyss" },
  "daily-attendance": { cat: "daily", text: "Presença diária (Daily attendance)" },
  "emergency-supply": { cat: "daily", text: "Emergency Supply Request" },
  "nightmare": { cat: "daily", text: "Nightmare Dungeons (2x por dia)", note: "as entradas acumulam por até 1 semana" },
  "abyss-farm": { cat: "daily", text: "7h de farm no Abyss" },
  "vip-energy": { cat: "weekly", text: "Comprar energia na VIP Shop / Subscriber Shop" },
  "energy-craft": { cat: "weekly", text: "Crafting de energia (Substance Morph — 20x)" },
  "daily-dungeons": { cat: "weekly", text: "Daily Dungeons (14x por semana)" },
  "battlefield-arena": { cat: "weekly", text: "Recompensas de Battlefield e Arena (3x)" },
  "ascension-trial": { cat: "weekly", text: "Ascension Trial (3x por semana)" },
  "sanctuary": { cat: "weekly", text: "Sanctuary" },
  "shugo-festival": { cat: "daily", text: "Shugo Festival (2x)", note: "acumula por até 1 semana" },
  "dungeon-energy": { cat: "weekly", text: "Gastar Dungeon Energy (+120/dia, até 120/840 acumulados)" },
  "abyss-shop": { cat: "shops", text: "Abyss Shop", note: "PvP Manastone/Soulstone, Potential Amplification Stone, Medals — 100k pontos" },
  "nightmare-shop": { cat: "shops", text: "Nightmare Shop", note: "Soul Codex, Soul Codex: Reset" },
  "command-quests": { cat: "shops", text: "Comprar Duty/Order Quests (Command Quests)", note: "12 City Command Scrolls (PvE — Outlaw Village) e 20 Abyss Command Scrolls (PvP)" },
  "supply-requests": { cat: "shops", text: "Weekly Supply Requests" },
  "abyss-corridors": { cat: "events", text: "Abyss Corridors (3x)" },
  "artifact-siege": { cat: "events", text: "Artifact Siege" },
  "world-bosses": { cat: "events", text: "World Bosses (1x)" },
  // Alts
  "vip-energy-alt": { cat: "weekly", text: "Comprar energia na VIP Shop" },
  "energy-craft-alt": { cat: "weekly", text: "Crafting de energia (Substance Morph — 4x)" },
  "odyle-breeze": { cat: "weekly", text: "Odyle Energy x4 (Breeze Association Shop)" },
  "expedition": { cat: "weekly", text: "Expedition Dungeons (gastar energia acumulada)" },
  "abyss-corridor-alt": { cat: "weekly", text: "Abyss Corridor (1-3x)" },
  "abyss-shop-alt": { cat: "weekly", text: "Abyss Shop", note: "PvP Manastone/Soulstone" },
};

// Lista padrão de tarefas de cada tipo de personagem, na ordem de exibição.
const ROUTINE_DEFAULTS = {
  main: [
    "duty-quests", "kinah-farm", "daily-attendance", "emergency-supply", "nightmare", "abyss-farm", "shugo-festival",
    "vip-energy", "energy-craft", "daily-dungeons", "battlefield-arena", "ascension-trial", "sanctuary", "dungeon-energy",
    "abyss-shop", "nightmare-shop", "command-quests", "supply-requests",
    "abyss-corridors", "artifact-siege", "world-bosses",
  ],
  alt: [
    "kinah-farm", "nightmare", "abyss-farm",
    "vip-energy-alt", "energy-craft-alt", "odyle-breeze", "ascension-trial", "expedition", "sanctuary", "abyss-corridor-alt", "abyss-shop-alt",
  ],
};
