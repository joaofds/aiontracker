/* ============================================================
   Contadores (painel de timers)
   ============================================================ */
const timersEl = document.getElementById("timers");
const timersPreview = document.getElementById("timers-preview");
const timersPanel = document.getElementById("timers-panel");
const timersToggle = document.getElementById("timers-toggle");

// Rótulos usados no preview do cabeçalho.
const TIMER_LABELS = { daily: "Reset diário", weekly: "Reset semanal" };
EVENTS.forEach((ev) => { TIMER_LABELS[ev.id] = ev.label; });
// IDs de contadores que ocorrem em dias específicos (mostram o dia da semana no sub-texto).
const DAY_BASED_IDS = new Set(["weekly", ...EVENTS.filter((e) => e.days).map((e) => e.id)]);

// Monta os cards de contador (resets + eventos) no painel; os valores são preenchidos pelo tickTimers.
function buildTimers() {
  const cards = [
    { id: "daily", icon: "☀️", label: "Reset diário", kind: "reset" },
    { id: "weekly", icon: "📅", label: "Reset semanal", kind: "reset" },
    ...EVENTS.map((ev) => ({ id: ev.id, icon: ev.icon, label: ev.label, kind: "evt", ev })),
  ];
  timersEl.innerHTML = cards.map((c) => `
    <div class="timer-card ${c.kind === "evt" ? "evt" : ""}" data-timer="${c.id}">
      <div class="timer-head"><span class="timer-icon">${c.icon}</span><span class="timer-label">${c.label}</span></div>
      <div class="timer-value" data-value>--:--:--</div>
      <div class="timer-sub" data-sub></div>
    </div>`).join("");
}

// Último alvo de cada contador, para detectar quando ele "vira" e piscar o card.
let lastTargets = {};

// Roda a cada segundo: atualiza contadores, preview do cabeçalho e aplica resets automáticos.
function tickTimers() {
  const now = Date.now();
  const targets = { daily: nextDailyReset(), weekly: nextWeeklyReset() };
  EVENTS.forEach((ev) => { targets[ev.id] = nextEvent(ev); });

  let soonest = null;
  for (const [id, target] of Object.entries(targets)) {
    if (!soonest || target < soonest.target) soonest = { id, target };

    const card = timersEl.querySelector(`[data-timer="${id}"]`);
    if (!card) continue;
    card.querySelector("[data-value]").textContent = fmtCountdown(target - now);
    const c = fmtClock(target);
    const sub = DAY_BASED_IDS.has(id) ? `${c.dow}. ${c.hm}` : `às ${c.hm}`;
    card.querySelector("[data-sub]").textContent = `próximo ${sub}`;

    // ao virar um alvo, piscar o card
    if (lastTargets[id] && target !== lastTargets[id]) {
      card.classList.add("flash");
      setTimeout(() => card.classList.remove("flash"), 1000);
    }
    lastTargets[id] = target;
  }

  // resumo do próximo evento no cabeçalho
  if (soonest && timersPreview) {
    timersPreview.innerHTML = `${TIMER_LABELS[soonest.id]} <b>${fmtCountdown(soonest.target - now)}</b>`;
  }

  // reset automático de diárias/semanais
  if (applyResets()) render();
}

/* ---------- Recolher/expandir o painel de contadores ---------- */

// Abre/fecha o painel de contadores e salva a preferência.
function setTimersOpen(open) {
  timersPanel.classList.toggle("collapsed", !open);
  timersToggle.setAttribute("aria-expanded", String(open));
  localStorage.setItem(TIMERS_KEY, open ? "1" : "0");
}

// Liga o botão de recolher e define o estado inicial do painel.
function initTimersPanel() {
  timersToggle.addEventListener("click", () => {
    setTimersOpen(timersPanel.classList.contains("collapsed"));
  });
  // Estado inicial: usa o salvo; senão, recolhido no mobile e aberto no desktop.
  const saved = localStorage.getItem(TIMERS_KEY);
  setTimersOpen(saved !== null ? saved === "1" : window.innerWidth > 560);
}
