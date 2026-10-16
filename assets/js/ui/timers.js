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

// Cards de contador, na ordem do painel: resets + eventos.
const TIMER_CARDS = [
  { id: "daily", icon: "☀️", label: "Reset diário", kind: "reset" },
  { id: "weekly", icon: "📅", label: "Reset semanal", kind: "reset" },
  ...EVENTS.map((ev) => ({ id: ev.id, icon: ev.icon, label: ev.label, kind: "evt", ev })),
];
// Cards ocultados pelo usuário (escolhidos em "👁️ Cards"); cards novos começam visíveis.
const hiddenTimers = new Set(JSON.parse(localStorage.getItem(TIMERS_HIDDEN_KEY) || "[]"));

// Monta os cards de contador (resets + eventos) no painel; os valores são preenchidos pelo tickTimers.
function buildTimers() {
  timersEl.innerHTML = TIMER_CARDS.map((c) => `
    <div class="timer-card ${c.kind === "evt" ? "evt" : ""}" data-timer="${c.id}">
      <div class="timer-head"><span class="timer-icon">${c.icon}</span><span class="timer-label">${c.label}</span>${
        c.kind === "evt" ? `<button type="button" class="timer-bell" data-bell="${c.id}"></button>` : ""}</div>
      <div class="timer-value" data-value>--:--:--</div>
      <div class="timer-sub" data-sub></div>
    </div>`).join("");
  timersEl.querySelectorAll("[data-bell]").forEach((btn) => {
    btn.addEventListener("click", () => toggleEventMuted(btn.dataset.bell));
  });
  updateBells();
  buildTimersPicker();
}

/* ---------- Ocultar/exibir cards ---------- */

const timersPicker = document.getElementById("timers-picker");
const timersPickToggle = document.getElementById("timers-pick-toggle");

// Monta a lista de cards (um botão por card: pressionado = visível) e aplica a visibilidade salva.
function buildTimersPicker() {
  timersPicker.innerHTML = `
    <div class="tp-chips">${TIMER_CARDS.map((c) => `
      <button type="button" class="tp-chip" data-pick="${c.id}">${c.icon} ${c.label}</button>`).join("")}
    </div>
    <div class="tp-actions">
      <button type="button" class="tp-link" data-pick-all="show">Mostrar todos</button>
      <button type="button" class="tp-link" data-pick-all="hide">Ocultar todos</button>
    </div>`;
  timersPicker.querySelectorAll("[data-pick]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.pick;
      if (hiddenTimers.has(id)) hiddenTimers.delete(id); else hiddenTimers.add(id);
      saveHiddenTimers();
    });
  });
  timersPicker.querySelectorAll("[data-pick-all]").forEach((btn) => {
    btn.addEventListener("click", () => {
      hiddenTimers.clear();
      if (btn.dataset.pickAll === "hide") TIMER_CARDS.forEach((c) => hiddenTimers.add(c.id));
      saveHiddenTimers();
    });
  });
  applyHiddenTimers();
}

// Salva os cards ocultos e atualiza o painel na hora.
function saveHiddenTimers() {
  localStorage.setItem(TIMERS_HIDDEN_KEY, JSON.stringify([...hiddenTimers]));
  // card oculto não alerta: descarta o bipe que ele já tinha agendado
  hiddenTimers.forEach((id) => { if (scheduledBeeps[id]) dropScheduledAlert(id); });
  applyHiddenTimers();
  tickTimers();
}

// Mostra/oculta os cards e sincroniza os botões da lista.
function applyHiddenTimers() {
  TIMER_CARDS.forEach((c) => {
    const hidden = hiddenTimers.has(c.id);
    const card = timersEl.querySelector(`[data-timer="${c.id}"]`);
    if (card) card.hidden = hidden;
    const chip = timersPicker.querySelector(`[data-pick="${c.id}"]`);
    if (chip) {
      chip.setAttribute("aria-pressed", String(!hidden));
      chip.title = hidden ? "Oculto — clique para exibir" : "Visível — clique para ocultar";
    }
  });
  const shown = TIMER_CARDS.length - TIMER_CARDS.filter((c) => hiddenTimers.has(c.id)).length;
  timersPickToggle.textContent = `👁️ Cards ${shown}/${TIMER_CARDS.length}`;
}

// Liga o botão que abre/fecha a lista de cards.
function initTimersPicker() {
  timersPickToggle.addEventListener("click", () => {
    const open = timersPicker.hidden;
    timersPicker.hidden = !open;
    timersPickToggle.setAttribute("aria-expanded", String(open));
  });
}

// Último alvo de cada contador, para detectar quando ele "vira" e piscar o card.
let lastTargets = {};

// Roda a cada segundo: atualiza contadores, preview do cabeçalho e aplica resets automáticos.
function tickTimers() {
  const now = Date.now();
  const targets = { daily: nextDailyReset(), weekly: nextWeeklyReset() };
  EVENTS.forEach((ev) => { targets[ev.id] = nextEvent(ev); });

  // eventos acontecendo agora: id → epoch de término da ocorrência em andamento
  const live = {};
  EVENTS.forEach((ev) => {
    const start = liveEventStart(ev, now);
    if (start !== null) live[ev.id] = start + eventDuration(ev);
  });

  let soonest = null;
  for (const [id, target] of Object.entries(targets)) {
    if (!hiddenTimers.has(id) && (!soonest || target < soonest.target)) soonest = { id, target };

    const card = timersEl.querySelector(`[data-timer="${id}"]`);
    if (!card) continue;
    const c = fmtClock(target);
    const sub = DAY_BASED_IDS.has(id) ? `${c.dow}. ${c.hm}` : `às ${c.hm}`;
    card.classList.toggle("live", id in live);
    if (id in live) {
      card.querySelector("[data-value]").textContent = "🟢 Agora";
      card.querySelector("[data-sub]").textContent = `até ~${fmtClock(live[id]).hm} · próximo ${sub}`;
    } else {
      card.querySelector("[data-value]").textContent = fmtCountdown(target - now);
      card.querySelector("[data-sub]").textContent = `próximo ${sub}`;
    }

    // ao virar um alvo, piscar o card
    if (lastTargets[id] && target !== lastTargets[id]) {
      card.classList.add("flash");
      setTimeout(() => card.classList.remove("flash"), 1000);
    }
    lastTargets[id] = target;
  }

  checkEventAlerts(targets, now);

  // resumo no cabeçalho (só cards visíveis): evento acontecendo agora (se houver) ou o próximo
  const liveId = Object.keys(live).find((id) => !hiddenTimers.has(id));
  if (liveId && timersPreview) {
    timersPreview.innerHTML = `${TIMER_LABELS[liveId]} <b class="live">agora</b>`;
  } else if (soonest && timersPreview) {
    timersPreview.innerHTML = `${TIMER_LABELS[soonest.id]} <b>${fmtCountdown(soonest.target - now)}</b>`;
  } else if (timersPreview) {
    timersPreview.textContent = "";
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
const alertsLeadSelect = document.getElementById("alerts-lead");
let alertsOn = false;
// Antecedência do alerta em minutos (escolhida no seletor ao lado do toggle).
let alertLeadMinutes = ALERT_LEAD_DEFAULT;
// Eventos com o alerta desligado no 🔔 do card (os demais alertam; eventos novos começam ligados).
const mutedEvents = new Set(JSON.parse(localStorage.getItem(ALERT_MUTED_KEY) || "[]"));
// Osciladores do bipe já agendado de cada evento, para poder cancelá-lo ao silenciar o evento.
const scheduledBeeps = {};
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
// Retorna os osciladores agendados (ou null se o áudio ainda não foi liberado).
function playAlert(delaySec = 0, onStart) {
  if (!audioCtx || audioCtx.state !== "running") return null;
  const t0 = audioCtx.currentTime + delaySec;
  const oscs = [];
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
    oscs.push(osc);
  });
  return oscs;
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

// Agenda o alerta de cada evento cujo momento de aviso (início − alertLeadMinutes) está próximo.
function checkEventAlerts(targets, now) {
  if (!alertsOn) return;
  const lead = alertLeadMinutes * 60000;
  EVENTS.forEach((ev) => {
    if (mutedEvents.has(ev.id) || hiddenTimers.has(ev.id)) return;
    const target = targets[ev.id];
    if (alertedTargets[ev.id] === target) return;
    const untilAlert = target - lead - now;
    if (target <= now || untilAlert > ALERT_SCHEDULE_AHEAD_MS) return;
    const oscs = playAlert(Math.max(0, untilAlert) / 1000, () => notifyEvent(ev, target));
    if (oscs) {
      alertedTargets[ev.id] = target;
      scheduledBeeps[ev.id] = oscs;
    } else if (untilAlert <= 0) {
      // áudio ainda não liberado (sem interação na página): ao menos a notificação
      alertedTargets[ev.id] = target;
      notifyEvent(ev, target);
    }
  });
}

// Descarta os bipes já agendados no AudioContext e libera os eventos para serem reagendados.
function cancelScheduledAlerts() {
  if (audioCtx) { audioCtx.close(); audioCtx = null; }
  for (const id in alertedTargets) delete alertedTargets[id];
  for (const id in scheduledBeeps) delete scheduledBeeps[id];
}

// Cancela o bipe já agendado de um evento e o libera para ser reagendado (se ainda puder alertar).
function dropScheduledAlert(id) {
  (scheduledBeeps[id] || []).forEach((osc) => { osc.onended = null; osc.disconnect(); });
  delete scheduledBeeps[id];
  delete alertedTargets[id];
}

// Liga/desliga o alerta de um evento (🔔/🔕 no card) e cancela o bipe dele que já estiver agendado.
function toggleEventMuted(id) {
  if (mutedEvents.has(id)) mutedEvents.delete(id);
  else mutedEvents.add(id);
  dropScheduledAlert(id);
  localStorage.setItem(ALERT_MUTED_KEY, JSON.stringify([...mutedEvents]));
  updateBells();
}

// Atualiza o ícone/título do 🔔 de cada card de evento.
function updateBells() {
  timersEl.querySelectorAll("[data-bell]").forEach((btn) => {
    const muted = mutedEvents.has(btn.dataset.bell);
    btn.textContent = muted ? "🔕" : "🔔";
    btn.classList.toggle("muted", muted);
    btn.title = muted ? "Alerta deste evento desligado — clique para ligar" : "Alerta deste evento ligado — clique para desligar";
    btn.setAttribute("aria-pressed", String(!muted));
    btn.setAttribute("aria-label", `Alerta de ${TIMER_LABELS[btn.dataset.bell]}`);
  });
}

// Liga o toggle de alerta e o seletor de antecedência, e restaura as preferências salvas.
function initEventAlerts() {
  const savedLead = Number(localStorage.getItem(ALERT_LEAD_KEY));
  if (ALERT_LEAD_OPTIONS.includes(savedLead)) alertLeadMinutes = savedLead;
  alertsLeadSelect.innerHTML = ALERT_LEAD_OPTIONS
    .map((m) => `<option value="${m}">${m} min antes</option>`).join("");
  alertsLeadSelect.value = String(alertLeadMinutes);
  alertsLeadSelect.addEventListener("change", () => {
    alertLeadMinutes = Number(alertsLeadSelect.value);
    localStorage.setItem(ALERT_LEAD_KEY, String(alertLeadMinutes));
    // bipes agendados com a antecedência antiga: descarta e reagenda no próximo tick
    if (alertsOn) { cancelScheduledAlerts(); unlockAudio(); }
  });

  alertsOn = localStorage.getItem(ALERTS_KEY) === "1";
  alertsToggle.checked = alertsOn;
  timersEl.classList.toggle("alerts-off", !alertsOn);
  alertsToggle.addEventListener("change", () => {
    alertsOn = alertsToggle.checked;
    timersEl.classList.toggle("alerts-off", !alertsOn);
    localStorage.setItem(ALERTS_KEY, alertsOn ? "1" : "0");
    if (alertsOn) {
      unlockAudio();
      playAlert();
      if ("Notification" in window && Notification.permission === "default") Notification.requestPermission();
    } else {
      cancelScheduledAlerts();
    }
  });
  // Preferência já ligada ao abrir a página: libera o áudio na primeira interação.
  if (alertsOn) {
    document.addEventListener("pointerdown", unlockAudio, { once: true });
    document.addEventListener("keydown", unlockAudio, { once: true });
  }
}
