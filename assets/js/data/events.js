/* ============================================================
   Dados: eventos recorrentes (cada um vira um card de contador).
    - intervalHours: de quanto em quanto tempo o evento ocorre.
    - days: dias fixos da semana (0=Dom … 6=Sáb); substitui intervalHours.
    - anchorHour / anchorMinute: horário base do ciclo.
    - utc: true  → anchorHour/anchorMinute são em UTC (instante fixo global; exibido no fuso local).
           (ausente) → base no fuso configurado do site (ver SERVER_UTC_OFFSET_HOURS).
   Horários dos eventos globais conferidos em https://corpus.gg/games/aion-2/timers (em UTC).
   ============================================================ */
const EVENTS = [
  { id: "spacetime-rift", icon: "🌌", label: "Spacetime Rift", intervalHours: 3, anchorHour: 0, utc: true },
  { id: "watcher-kaira", icon: "👁️", label: "Watcher Kaira", intervalHours: 3, anchorHour: 1, utc: true },
  { id: "shugo-festival", icon: "🎪", label: "Shugo Festival", intervalHours: 1, anchorHour: 0, anchorMinute: 0, utc: true },
  { id: "dimensional-invasion", icon: "👾", label: "Dimensional Invasion", intervalHours: 1, anchorHour: 0, anchorMinute: 30, utc: true },
  // Siege em dias fixos (UTC): Seg, Qui e Sáb às 21:00 UTC (bosses 21:30 UTC logo após).
  { id: "artifact-siege", icon: "🏰", label: "Artifact Siege", days: [1, 4, 6], anchorHour: 21, anchorMinute: 0, utc: true },
  { id: "gartua", icon: "🌀", label: "Gartua", intervalHours: 12, anchorHour: 6 },
];
