/* ============================================================
   Dados: eventos recorrentes (cada um vira um card de contador).
    - intervalHours: de quanto em quanto tempo o evento ocorre.
    - days: dias fixos da semana (0=Dom … 6=Sáb); substitui intervalHours.
    - hours: lista de horários fixos diários (com anchorMinute opcional); substitui intervalHours/anchorHour.
    - anchorHour / anchorMinute: horário base do ciclo.
    - durationMinutes: opcional; por quanto tempo o card mostra "Agora" depois do início
           (padrão EVENT_LIVE_MINUTES, em config.js). São estimativas — ajuste conforme o jogo.
    - utc: true  → anchorHour/anchorMinute são em UTC (instante fixo global; exibido no fuso local).
           (ausente) → base no fuso configurado do site (ver SERVER_UTC_OFFSET_HOURS).
   Horários dos eventos globais conferidos em https://corpus.gg/games/aion-2/timers (em UTC).
   ============================================================ */
const EVENTS = [
  // Servidor SA: a cada 3h entre 11:00 e 02:00 (BRT, UTC-3) → 11, 14, 17, 20, 23, 02 BRT.
  { id: "spacetime-rift", icon: "🌌", label: "Spacetime Rift", hours: [14, 17, 20, 23, 2, 5], utc: true },
  { id: "watcher-kaira", icon: "👁️", label: "Watcher Kaira", intervalHours: 3, anchorHour: 1, utc: true },
  { id: "shugo-festival", icon: "🎪", label: "Shugo Festival", intervalHours: 1, anchorHour: 0, anchorMinute: 0, utc: true },
  { id: "dimensional-invasion", icon: "👾", label: "Dimensional Invasion", intervalHours: 1, anchorHour: 0, anchorMinute: 30, utc: true },
  // Siege em dias fixos (UTC): Seg, Qui e Sáb às 21:00 UTC (bosses 21:30 UTC logo após).
  { id: "artifact-siege", icon: "🏰", label: "Artifact Siege", days: [1, 4, 6], anchorHour: 21, anchorMinute: 0, durationMinutes: 60, utc: true },
  // Boss do Abismo (Executor Argon), nos mesmos dias do Siege, 30 min depois do início; fica ~30 min.
  { id: "argon", icon: "👹", label: "Boss Argon (Abismo)", days: [1, 4, 6], anchorHour: 21, anchorMinute: 30, durationMinutes: 30, utc: true },
];

/* ============================================================
   Dados: field/world bosses com respawn contado a partir da morte
   (sem horário fixo; o usuário marca ☠️ no card quando o boss morre).
    - respawnHours: tempo até o boss nascer de novo depois de morto.
   Tempos de https://game8.co/games/Aion-2/archives/631054 (iguais em Verteron e Altgard);
   outras fontes divergem (ex.: Dartan 3h, Lagta 24h) — ajuste conforme o jogo.
   ============================================================ */
const FIELD_BOSSES = [
  // Eternal Gartua (Verteron) / Immortal Gartua (Altgard): 12h após a morte, sem horário fixo.
  { id: "gartua", icon: "🌀", label: "Gartua", respawnHours: 12 },
  { id: "lagta", icon: "🪖", label: "Boss Lagta", respawnHours: 12 },
  { id: "kashapa", icon: "💀", label: "Boss Kashapa", respawnHours: 6 },
  { id: "dartan", icon: "🗡️", label: "Boss Dartan", respawnHours: 6 },
];
