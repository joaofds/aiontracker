/* ============================================================
   Tempo (fuso virtual)
   Trabalhamos num "tempo virtual" = epoch real deslocado para o
   fuso do servidor, usando os getters/setters UTC do Date.
   ============================================================ */

// Offset (em horas) do fuso usado nos cálculos: o configurado ou o local do navegador.
function offsetHours() {
  return SERVER_UTC_OFFSET_HOURS !== null
    ? SERVER_UTC_OFFSET_HOURS
    : -new Date().getTimezoneOffset() / 60;
}
// Converte um epoch real para o tempo virtual (deslocado para o fuso configurado).
function toVirtual(epoch) { return epoch + offsetHours() * 3600000; }
// Converte um tempo virtual de volta para o epoch real.
function fromVirtual(v) { return v - offsetHours() * 3600000; }

// Epoch do próximo reset diário (RESET_HOUR).
function nextDailyReset() {
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(RESET_HOUR, 0, 0, 0);
  let t = d.getTime();
  if (t <= vnow) t += 86400000;
  return fromVirtual(t);
}
// Epoch do próximo reset semanal (WEEKLY_RESET_DOW às RESET_HOUR).
function nextWeeklyReset() {
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(RESET_HOUR, 0, 0, 0);
  const add = (WEEKLY_RESET_DOW - d.getUTCDay() + 7) % 7;
  let t = d.getTime() + add * 86400000;
  if (t <= vnow) t += 7 * 86400000;
  return fromVirtual(t);
}
// Epoch da próxima ocorrência de um evento de EVENTS (por intervalo ou dias fixos da semana).
function nextEvent(ev) {
  const period = ev.intervalHours * 3600000;
  const min = ev.anchorMinute || 0;

  // Recorrência em dias específicos da semana (ex.: Siege às Seg/Qui/Sáb).
  if (ev.days && ev.days.length) {
    const now = Date.now();
    const ref = ev.utc ? now : toVirtual(now);
    for (let i = 0; i < 8; i++) {
      const d = new Date(ref + i * 86400000);
      d.setUTCHours(ev.anchorHour, min, 0, 0);
      if (ev.days.includes(d.getUTCDay()) && d.getTime() > ref) {
        return ev.utc ? d.getTime() : fromVirtual(d.getTime());
      }
    }
    return 0;
  }

  if (ev.utc) {
    // Âncora em UTC: calcula o instante absoluto do próximo evento (fuso-independente).
    const now = Date.now();
    const d = new Date(now);
    d.setUTCHours(ev.anchorHour, min, 0, 0);
    let t = d.getTime();
    t += Math.max(Math.ceil((now - t) / period), 0) * period;
    while (t <= now) t += period;
    return t;
  }
  // Âncora no fuso configurado do site.
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(ev.anchorHour, min, 0, 0);
  let t = d.getTime();
  t += Math.max(Math.ceil((vnow - t) / period), 0) * period;
  while (t <= vnow) t += period;
  return fromVirtual(t);
}

/* ---------- Formatação ---------- */

// Formata uma duração em ms como "HH:MM:SS" (negativos viram 00:00:00).
function fmtCountdown(ms) {
  if (ms < 0) ms = 0;
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}
// Retorna o horário ("HH:MM") e o dia da semana abreviado de um epoch, no fuso configurado.
function fmtClock(epoch) {
  const v = new Date(toVirtual(epoch));
  const pad = (n) => String(n).padStart(2, "0");
  const dows = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  return { hm: `${pad(v.getUTCHours())}:${pad(v.getUTCMinutes())}`, dow: dows[v.getUTCDay()] };
}
