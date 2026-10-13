/* ============================================================
   Estado + reset automático
   ============================================================ */

// Lê o estado salvo no localStorage (objeto vazio se não houver ou estiver corrompido).
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
// Persiste o estado atual no localStorage.
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

// Estado global: { checks: { [itemId]: true }, routine, dailyKey, weeklyKey }.
// `checks` guarda as fases; `routine` é criado por ensureRoutine() (ver routine.js).
let state = loadState();
if (!state.checks) state = { checks: {}, dailyKey: "", weeklyKey: "" };

// Chave do ciclo diário atual (epoch do último reset diário).
function currentDailyKey() { return String(nextDailyReset() - 86400000); }
// Chave do ciclo semanal atual (epoch do último reset semanal).
function currentWeeklyKey() { return String(nextWeeklyReset() - 7 * 86400000); }

// Limpa as tarefas diárias/semanais da rotina se o ciclo mudou desde o último acesso. Retorna true se algo mudou.
function applyResets() {
  const dk = currentDailyKey();
  const wk = currentWeeklyKey();
  let changed = false;
  if (state.dailyKey !== dk) {
    resetRoutine("daily");
    state.dailyKey = dk; changed = true;
  }
  if (state.weeklyKey !== wk) {
    resetRoutine("weekly");
    state.weeklyKey = wk; changed = true;
  }
  if (changed) saveState();
  return changed;
}
