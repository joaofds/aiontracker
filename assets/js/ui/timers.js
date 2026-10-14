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

  checkEventAlerts(targets, now);

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

/* ---------- Alerta sonoro antes dos eventos ----------
   Em aba de fundo o navegador desacelera o setInterval (até 1x/min no Chrome), então:
    - o bipe é agendado com antecedência no relógio do AudioContext, que não é desacelerado;
    - uma notificação do sistema acompanha o bipe (aparece mesmo com o navegador minimizado).
   ------------------------------------------------------------ */

const alertsToggle = document.getElementById("alerts-toggle");
let alertsOn = false;
let audioCtx = null;
// Ocorrência (epoch do evento) já agendada/alertada por evento, para não repetir.
const alertedTargets = {};
// Quanto tempo antes do momento do alerta o bipe já é agendado (cobre o atraso dos timers em 2º plano).
const ALERT_SCHEDULE_AHEAD_MS = 90000;

// Cria/retoma o AudioContext (o navegador só libera áudio após uma interação do usuário).
function unlockAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === "suspended") audioCtx.resume();
}

// Toca três bipes curtos sintetizados, `delaySec` segundos a partir de agora; `onStart` roda quando soam.
function playAlert(delaySec = 0, onStart) {
  if (!audioCtx || audioCtx.state !== "running") return false;
  const t0 = audioCtx.currentTime + delaySec;
  [0, 0.25, 0.5].forEach((dt, i) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.0001, t0 + dt);
    gain.gain.exponentialRampToValueAtTime(0.3, t0 + dt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.18);
    osc.connect(gain).connect(audioCtx.destination);
    // o evento "ended" vem do relógio de áudio, então dispara na hora mesmo em aba de fundo
    if (i === 0 && onStart) osc.onended = onStart;
    osc.start(t0 + dt);
    osc.stop(t0 + dt + 0.2);
  });
  return true;
}

// Mostra uma notificação do sistema (se o usuário permitiu).
function notifyEvent(ev, target) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  const mins = Math.max(1, Math.round((target - Date.now()) / 60000));
  new Notification(`${ev.icon} ${ev.label}`, {
    body: `Começa em ${mins} min (às ${fmtClock(target).hm}).`,
    tag: `event-${ev.id}`,
  });
}

// Agenda o alerta de cada evento cujo momento de aviso (início − ALERT_LEAD_MINUTES) está próximo.
function checkEventAlerts(targets, now) {
  if (!alertsOn) return;
  const lead = ALERT_LEAD_MINUTES * 20000;
  EVENTS.forEach((ev) => {
    const target = targets[ev.id];
    if (alertedTargets[ev.id] === target) return;
    const untilAlert = target - lead - now;
    if (target <= now || untilAlert > ALERT_SCHEDULE_AHEAD_MS) return;
    if (playAlert(Math.max(0, untilAlert) / 1000, () => notifyEvent(ev, target))) {
      alertedTargets[ev.id] = target;
    } else if (untilAlert <= 0) {
      // áudio ainda não liberado (sem interação na página): ao menos a notificação
      alertedTargets[ev.id] = target;
      notifyEvent(ev, target);
    }
  });
}

// Liga o toggle de alerta e restaura a preferência salva.
function initEventAlerts() {
  document.getElementById("alerts-label").textContent =
    `🔔 Alerta sonoro ${ALERT_LEAD_MINUTES} min antes dos eventos`;
  alertsOn = localStorage.getItem(ALERTS_KEY) === "1";
  alertsToggle.checked = alertsOn;
  alertsToggle.addEventListener("change", () => {
    alertsOn = alertsToggle.checked;
    localStorage.setItem(ALERTS_KEY, alertsOn ? "1" : "0");
    if (alertsOn) {
      unlockAudio();
      playAlert();
      if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    } else if (audioCtx) {
      // descarta bipes já agendados
      audioCtx.close();
      audioCtx = null;
      for (const id in alertedTargets) delete alertedTargets[id];
    }
  });
  // Preferência já ligada ao abrir a página: libera o áudio na primeira interação.
  if (alertsOn) {
    document.addEventListener("pointerdown", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });
  }
}
