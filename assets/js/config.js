/* ============================================================
   Aion 2 Tracker — configuração
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURAÇÃO DE FUSO
   SERVER_UTC_OFFSET_HOURS: deixe null para usar o fuso LOCAL do
   navegador. Para fixar no horário do servidor do jogo, coloque
   o offset em horas (ex.: 2 = GMT+2, -3 = GMT-3).
   ------------------------------------------------------------ */
const SERVER_UTC_OFFSET_HOURS = null;
const RESET_HOUR = 4;          // reset diário às 4h
const WEEKLY_RESET_DOW = 3;    // 0=Dom ... 3=Qua (reset semanal na quarta às 4h)

/* ---------- Chaves do localStorage ---------- */
const STORAGE_KEY = "aion2-tracker-v1";
const THEME_KEY = "aion2-tracker-theme";
const TIMERS_KEY = "aion2-tracker-timers-open";
