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

// Estado global: { checks: { [itemId]: true }, dailyKey, weeklyKey }.
let state = loadState();
if (!state.checks) state = { checks: {}, dailyKey: "", weeklyKey: "" };

// Chave do ciclo diário atual (epoch do último reset diário).
function currentDailyKey() { return String(nextDailyReset() - 86400000); }
// Chave do ciclo semanal atual (epoch do último reset semanal).
function currentWeeklyKey() { return String(nextWeeklyReset() - 7 * 86400000); }

// Limpa as diárias/semanais se o ciclo mudou desde o último acesso. Retorna true se algo mudou.
function applyResets() {
  const dk = currentDailyKey();
  const wk = currentWeeklyKey();
  let changed = false;
  if (state.dailyKey !== dk) {
    DATA.find((s) => s.type === "daily")?.items.forEach((it) => { delete state.checks[it.id]; });
    state.dailyKey = dk; changed = true;
  }
  if (state.weeklyKey !== wk) {
    DATA.find((s) => s.type === "weekly")?.items.forEach((it) => { delete state.checks[it.id]; });
    state.weeklyKey = wk; changed = true;
  }
  if (changed) saveState();
  return changed;
}
