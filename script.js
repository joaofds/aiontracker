/* ============================================================
   Aion 2 Tracker
   - checklist de progressão (fases) + diárias + semanais
   - contadores ao vivo de reset e eventos recorrentes
   - abas, tema claro/escuro, export/import, destaque do próximo
   ============================================================ */

/* ------------------------------------------------------------
   CONFIGURAÇÃO DE FUSO
   SERVER_UTC_OFFSET_HOURS: deixe null para usar o fuso LOCAL do
   navegador. Para fixar no horário do servidor do jogo, coloque
   o offset em horas (ex.: 2 = GMT+2, -3 = GMT-3).
   ------------------------------------------------------------ */
const SERVER_UTC_OFFSET_HOURS = null;
const RESET_HOUR = 5;          // reset diário às 5h
const WEEKLY_RESET_DOW = 3;    // 0=Dom ... 3=Qua (reset semanal na quarta às 5h)

/* ============================================================
   Dados
   ============================================================ */
const DATA = [
  {
    id: "fase1", type: "phase", tab: "progressao",
    badge: "Fase 1", title: "Da Level 45 ao Gear Score",
    subtitle: "Base da progressão — prepare tudo antes de focar no gear score.",
    items: [
      { id: "lvl45", text: "Level 45 alcançado, quest principal concluída" },
      { id: "monolith", text: "Monolith nível 30", note: "penas da sua região" },
      { id: "explo-asmo", text: "100% de exploração no lado Asmodian" },
      { id: "explo-elyos", text: "100% de exploração no lado Elyos", note: "invadindo pelas Rifts" },
      { id: "orb-chests", text: "10 baús de Orbe abertos em Strongholds", note: "conquista" },
      { id: "abyss-feathers", text: "100% das penas do Abyss coletadas" },
      { id: "azphel", text: "Azphel Daevanions comprados", note: "na loja do Abyss" },
      { id: "altgard-contracts", text: "Os 12 contratos de Altgard" },
      { id: "abyss-contracts", text: "Os 20 contratos do Abyss" },
      { id: "daily-quests-p1", text: "Quests diárias em dia" },
      { id: "side-quests", text: "100% das side quests (verdes)" },
      { id: "amulet-belt", text: "Amuleto e cinto melhorados para dourado" },
      { id: "shugo", text: "Shugo concluído, Daevanions coletados na loja Shugo" },
      { id: "nightmare", text: "Nightmare concluído, tokens gastos em Daevanions" },
    ],
  },
  {
    id: "fase2", type: "phase", tab: "progressao",
    badge: "Meta 1", title: "Alcançar 1.400 de Gear Score",
    subtitle: "Encantamentos e manastones no ponto certo — sem exageros.",
    items: [
      { id: "clash-runes", text: "Ambas as Clash Runes equipadas e encantadas em +1", note: "não mais que isso", guide: "g-gearscore" },
      { id: "gear-enchant", text: "Equipamento encantado entre +2 e +5 (+5 máx)", note: "com Manastones básicas encaixadas", guide: "g-gearscore" },
    ],
  },
  {
    id: "fase3", type: "phase", tab: "progressao",
    badge: "Fase 2", title: "Após 1.400 de GS: Vakron e Gartua",
    subtitle: "Conteúdo pós-1.400 para manter a evolução.",
    items: [
      { id: "vakron-exp", text: "Expedição Vakron: rodar a dungeon 1,5 vezes", guide: "g-vakron" },
      { id: "vakron-conq", text: "Conquista Vakron: encher uma pity completamente", guide: "g-vakron" },
      { id: "gartua", text: "Gartua a cada 12 horas", note: "veja o contador no topo", guide: "g-vakron" },
    ],
  },
  {
    id: "fase4", type: "phase", tab: "progressao",
    badge: "Fase 3", title: "Progressão 1.600 – 2.100",
    subtitle: "Reta de endgame.",
    items: [
      { id: "transcendence", text: "Atividades de Transcendência" },
      { id: "acc-farm", text: "Farm de acessórios", note: "opcional" },
      { id: "odyle-craft-extra", text: "Odyle produzido (craft) de apoio" },
      { id: "odyle-buy-extra", text: "Odyle comprado de apoio" },
    ],
  },
  {
    id: "diarias", type: "daily", tab: "daily",
    badge: "Diárias", title: "Tarefas Diárias",
    subtitle: "Resetam todo dia às 5h.",
    items: [
      { id: "d-quests", text: "Quests diárias" },
      { id: "d-shugo", text: "Os 2 eventos Shugo diários jogados" },
      { id: "d-nightmare", text: "Os 2 chefes Nightmare diários" },
      { id: "d-dungeons", text: "Dungeons até gastar todo o seu Odyle" },
    ],
  },
  {
    id: "semanais", type: "weekly", tab: "weekly",
    badge: "Semanais", title: "Tarefas Semanais",
    subtitle: "Resetam na quarta-feira às 5h.",
    items: [
      { id: "w-abyss", text: "Quests do Abyss" },
      { id: "w-altgard", text: "Quests de Altgard" },
      { id: "w-odyle-craft", text: "20 recargas de Odyle produzidas (craft)" },
      { id: "w-odyle-buy", text: "20 recargas de Odyle compradas do Wind Breeze Merchant" },
      { id: "w-dungeons", text: "Dungeons Diárias: as 14 entradas base" },
      { id: "w-tickets", text: "7 Tickets de Clear Instantâneo comprados (Daily Dungeon)" },
      { id: "w-season", text: "Missões semanais da temporada concluídas" },
      { id: "w-trophies", text: "Marco de 11.000 troféus alcançado" },
      { id: "w-ascension", text: "Ascension Trial no nível mais alto possível" },
    ],
  },
];

// Eventos recorrentes (contadores). intervalHours + anchorHour (hora base no fuso configurado).
const EVENTS = [
  { id: "gartua", icon: "🌀", label: "Gartua", intervalHours: 12, anchorHour: 6 },
];

/* ------------------------------------------------------------
   Guias (conteúdo da aba "Guias").
   Conteúdo da comunidade; ajuste conforme o patch atual do jogo.
   ------------------------------------------------------------ */
const GUIDES = [
  {
    id: "g-roadmap", icon: "🗺️", title: "Roadmap de progressão",
    summary: "A ordem ideal do Level 45 até o endgame — e por que seguir cada etapa.",
    html: `
      <p>A progressão de Aion 2 recompensa quem segue a ordem certa: cada etapa constrói a
      base da próxima. Pular fases costuma significar gastar recursos à toa e travar mais na frente.</p>
      <ol>
        <li><b>Fase 1 — base da Level 45:</b> complete a quest principal, exploração (Elyos e Asmodian),
          Monolith nível 30, contratos de Altgard/Abyss, penas e side quests. É aqui que você
          acumula os recursos que financiam todo o resto.</li>
        <li><b>Meta 1 — 1.400 de Gear Score:</b> o primeiro grande portão. Com 1.400 GS você libera
          Vakron e passa a progredir de verdade.</li>
        <li><b>Pós-1.400 — Vakron e Gartua:</b> conteúdo repetível que sustenta a evolução diária.</li>
        <li><b>Endgame — 1.600 a 2.100:</b> Transcendência e farm de acessórios para fechar o build.</li>
      </ol>
      <div class="tip"><b>Dica:</b> não acumule pendências de Fase 1 ao chegar no endgame — várias
      recompensas (daevanions, exploração) são one-time e aceleram tudo que vem depois.</div>`,
  },
  {
    id: "g-gearscore", icon: "⚔️", title: "Gear Score & encantamento",
    summary: "Como chegar a 1.400 de GS sem desperdiçar recursos — Clash Runes, manastones e o teto do +5.",
    html: `
      <p>Até 1.400 de Gear Score, o objetivo é <b>eficiência</b>, não encantamentos altos. Suba de forma
      equilibrada em vez de concentrar tudo numa peça só.</p>
      <ul>
        <li><b>Clash Runes:</b> equipe as <b>duas</b> e encante apenas até <b>+1</b>. Não passe disso nesta fase.</li>
        <li><b>Equipamento:</b> mantenha entre <b>+2 e +5</b> (+5 é o teto recomendado aqui), com
          <b>Manastones básicas</b> encaixadas em todos os slots.</li>
        <li><b>Acessórios:</b> suba <b>amuleto e cinto para dourado</b> — ótimo custo-benefício de GS.</li>
      </ul>
      <div class="tip"><b>Por que não passar de +5 cedo?</b> O custo e o risco de falha disparam nos
      encantes altos. Antes de ter a base completa, cada tentativa frustrada atrasa mais do que ajuda.</div>`,
  },
  {
    id: "g-rotina", icon: "🔁", title: "Rotina diária/semanal eficiente",
    summary: "A ordem certa das tarefas, gestão de Odyle e como nunca perder um reset.",
    html: `
      <p>Resets: <b>diárias às 5h</b> e <b>semanais na quarta às 5h</b>. Use os contadores no topo
      para não deixar nada escapar — principalmente na terça à noite, véspera do reset semanal.</p>
      <p><b>Diárias:</b></p>
      <ul>
        <li>Quests diárias.</li>
        <li>Os 2 eventos Shugo e os 2 chefes Nightmare.</li>
        <li>Dungeons até <b>gastar todo o seu Odyle</b> do dia.</li>
      </ul>
      <p><b>Semanais:</b></p>
      <ul>
        <li>Quests de Abyss e Altgard.</li>
        <li><b>20 recargas de Odyle produzidas</b> (craft) + <b>20 compradas</b> do Wind Breeze Merchant.</li>
        <li>As <b>14 entradas base</b> das Daily Dungeons + <b>7 Tickets de Clear Instantâneo</b>.</li>
        <li>Missões da temporada, marco de <b>11.000 troféus</b> e Ascension Trial no maior nível possível.</li>
      </ul>
      <div class="tip"><b>Gestão de Odyle:</b> não deixe o Odyle estourar o limite — gastar antes de
      acumular o máximo evita desperdício. Craftar e comprar as recargas semanais mantém o estoque girando.</div>`,
  },
  {
    id: "g-vakron", icon: "🌀", title: "Vakron & Gartua",
    summary: "Expedição e Conquista Vakron (pity) e o ciclo de 12h do Gartua.",
    html: `
      <p>Depois dos 1.400 de GS, Vakron e Gartua viram o seu motor de progressão repetível.</p>
      <ul>
        <li><b>Expedição Vakron:</b> rode a dungeon <b>1,5 vez</b> no ciclo — é o alvo de eficiência.</li>
        <li><b>Conquista Vakron:</b> <b>encha uma pity completamente</b> para garantir a recompensa travada.</li>
        <li><b>Gartua:</b> abre <b>a cada 12 horas</b>. Acompanhe o contador "Gartua" no topo e entre
          assim que estiver disponível para não perder janelas.</li>
      </ul>
      <div class="tip"><b>Ciclo de 12h:</b> o contador está ancorado às 6h/18h.</code>.</div>`,
  },
];

const STORAGE_KEY = "aion2-tracker-v1";
const THEME_KEY = "aion2-tracker-theme";

const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
const CHEVRON_SVG = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

/* ============================================================
   Tempo (fuso virtual)
   Trabalhamos num "tempo virtual" = epoch real deslocado para o
   fuso do servidor, usando os getters/setters UTC do Date.
   ============================================================ */
function offsetHours() {
  return SERVER_UTC_OFFSET_HOURS !== null
    ? SERVER_UTC_OFFSET_HOURS
    : -new Date().getTimezoneOffset() / 60;
}
function toVirtual(epoch) { return epoch + offsetHours() * 3600000; }
function fromVirtual(v) { return v - offsetHours() * 3600000; }

function nextDailyReset() {
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(RESET_HOUR, 0, 0, 0);
  let t = d.getTime();
  if (t <= vnow) t += 86400000;
  return fromVirtual(t);
}
function nextWeeklyReset() {
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(RESET_HOUR, 0, 0, 0);
  const add = (WEEKLY_RESET_DOW - d.getUTCDay() + 7) % 7;
  let t = d.getTime() + add * 86400000;
  if (t <= vnow) t += 7 * 86400000;
  return fromVirtual(t);
}
function nextEvent(ev) {
  const vnow = toVirtual(Date.now());
  const d = new Date(vnow);
  d.setUTCHours(ev.anchorHour, 0, 0, 0);
  const period = ev.intervalHours * 3600000;
  let t = d.getTime();
  const k = Math.ceil((vnow - t) / period);
  t += Math.max(k, 0) * period;
  while (t <= vnow) t += period;
  return fromVirtual(t);
}

function fmtCountdown(ms) {
  if (ms < 0) ms = 0;
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}
function fmtClock(epoch) {
  const v = new Date(toVirtual(epoch));
  const pad = (n) => String(n).padStart(2, "0");
  const dows = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
  return { hm: `${pad(v.getUTCHours())}:${pad(v.getUTCMinutes())}`, dow: dows[v.getUTCDay()] };
}

/* ============================================================
   Estado + reset automático
   ============================================================ */
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
  catch { return {}; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();
if (!state.checks) state = { checks: {}, dailyKey: "", weeklyKey: "" };

function currentDailyKey() { return String(nextDailyReset() - 86400000); }
function currentWeeklyKey() { return String(nextWeeklyReset() - 7 * 86400000); }

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

/* ============================================================
   Renderização das seções
   ============================================================ */
const board = document.getElementById("board");
let activeTab = "progressao";

function render() {
  board.innerHTML = "";
  DATA.forEach((section) => board.appendChild(renderSection(section)));
  GUIDES.forEach((guide) => board.appendChild(renderGuide(guide)));
  applyTab();
  updateOverall();
}

function renderGuide(guide) {
  const el = document.createElement("section");
  el.className = "section collapsed";
  el.dataset.tab = "guias";
  el.dataset.guide = guide.id;

  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = `
    <span class="section-badge badge-guide">${guide.icon} Guia</span>
    <div class="section-title"><h2>${guide.title}</h2><p>${guide.summary}</p></div>
    <div class="section-meta">${CHEVRON_SVG}</div>`;
  head.addEventListener("click", () => el.classList.toggle("collapsed"));

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner guide-body";
  inner.innerHTML = guide.html;
  body.appendChild(inner);

  el.append(head, body);
  return el;
}

// Abre um guia: troca para a aba Guias, expande o guia e rola até ele.
function openGuide(guideId) {
  activeTab = "guias";
  applyTab();
  const el = board.querySelector(`.section[data-guide="${guideId}"]`);
  if (!el) return;
  el.classList.remove("collapsed");
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderSection(section) {
  const el = document.createElement("section");
  el.className = "section";
  el.dataset.type = section.type;
  el.dataset.id = section.id;
  el.dataset.tab = section.tab;

  const badgeClass = section.type === "daily" ? "badge-daily" : section.type === "weekly" ? "badge-weekly" : "badge-phase";

  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = `
    <span class="section-badge ${badgeClass}">${section.badge}</span>
    <div class="section-title"><h2>${section.title}</h2><p>${section.subtitle}</p></div>
    <div class="section-meta">
      <span class="section-count"><b class="count-done">0</b>/${section.items.length}</span>
      ${CHEVRON_SVG}
    </div>`;
  head.addEventListener("click", () => el.classList.toggle("collapsed"));

  const bar = document.createElement("div");
  bar.className = "section-bar";
  bar.innerHTML = "<span></span>";

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner";
  section.items.forEach((item) => inner.appendChild(renderItem(item, section)));
  body.appendChild(inner);

  el.append(head, bar, body);
  return el;
}

function renderItem(item, section) {
  const label = document.createElement("label");
  label.className = "item";
  label.dataset.id = item.id;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = !!state.checks[item.id];
  input.addEventListener("change", () => {
    if (input.checked) state.checks[item.id] = true;
    else delete state.checks[item.id];
    saveState();
    updateSection(section.id);
    updateOverall();
  });

  const box = document.createElement("span");
  box.className = "checkbox";
  box.innerHTML = CHECK_SVG;

  const text = document.createElement("span");
  text.className = "item-text";
  text.innerHTML = item.text + (item.note ? `<small>${item.note}</small>` : "");

  label.append(input, box, text);

  if (item.guide) {
    const link = document.createElement("button");
    link.type = "button";
    link.className = "guide-link";
    link.textContent = "📖 guia";
    link.title = "Abrir guia relacionado";
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      openGuide(item.guide);
    });
    label.append(link);
  }
  return label;
}

/* ---------- Progresso ---------- */
function sectionProgress(section) {
  const done = section.items.filter((it) => state.checks[it.id]).length;
  return { done, total: section.items.length };
}

function updateSection(sectionId) {
  const section = DATA.find((s) => s.id === sectionId);
  const el = board.querySelector(`.section[data-id="${sectionId}"]`);
  if (!section || !el) return;
  const { done, total } = sectionProgress(section);
  el.querySelector(".count-done").textContent = done;
  el.querySelector(".section-bar span").style.width = total ? `${(done / total) * 100}%` : "0%";

  // destaque do próximo objetivo (apenas fases)
  el.querySelectorAll(".item.next").forEach((n) => n.classList.remove("next"));
  if (section.type === "phase") {
    const next = section.items.find((it) => !state.checks[it.id]);
    if (next) el.querySelector(`.item[data-id="${next.id}"]`)?.classList.add("next");
  }
}

const RING_CIRC = 2 * Math.PI * 52;
function updateOverall() {
  DATA.forEach((s) => updateSection(s.id));
  const phases = DATA.filter((s) => s.type === "phase");
  const total = phases.reduce((n, s) => n + s.items.length, 0);
  const done = phases.reduce((n, s) => n + sectionProgress(s).done, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("overall-percent").textContent = `${pct}%`;
  const ring = document.getElementById("overall-ring-fg");
  ring.style.strokeDashoffset = RING_CIRC * (1 - pct / 100);
}

/* ============================================================
   Abas
   ============================================================ */
function applyTab() {
  document.querySelectorAll(".section").forEach((el) => {
    el.hidden = el.dataset.tab !== activeTab;
  });
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.tab === activeTab);
  });
}
document.getElementById("tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  activeTab = tab.dataset.tab;
  applyTab();
});

/* ============================================================
   Contadores (painel de timers)
   ============================================================ */
const timersEl = document.getElementById("timers");
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

let lastTargets = {};
function tickTimers() {
  const now = Date.now();
  const targets = { daily: nextDailyReset(), weekly: nextWeeklyReset() };
  EVENTS.forEach((ev) => { targets[ev.id] = nextEvent(ev); });

  for (const [id, target] of Object.entries(targets)) {
    const card = timersEl.querySelector(`[data-timer="${id}"]`);
    if (!card) continue;
    card.querySelector("[data-value]").textContent = fmtCountdown(target - now);
    const c = fmtClock(target);
    const sub = id === "weekly" ? `${c.dow}. ${c.hm}` : `às ${c.hm}`;
    card.querySelector("[data-sub]").textContent = `próximo ${sub}`;

    // ao virar um alvo, piscar o card
    if (lastTargets[id] && target !== lastTargets[id]) {
      card.classList.add("flash");
      setTimeout(() => card.classList.remove("flash"), 1000);
    }
    lastTargets[id] = target;
  }

  // reset automático de diárias/semanais
  if (applyResets()) render();
}

/* ============================================================
   Tema
   ============================================================ */
const themeBtn = document.getElementById("theme-toggle");
function applyTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light", light);
  themeBtn.textContent = light ? "🌙" : "☀️";
  localStorage.setItem(THEME_KEY, theme);
}
themeBtn.addEventListener("click", () => {
  applyTheme(document.body.classList.contains("light") ? "dark" : "light");
});
applyTheme(localStorage.getItem(THEME_KEY) || "dark");

/* ============================================================
   Export / Import / Reset
   ============================================================ */
document.getElementById("export-btn").addEventListener("click", async () => {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(state.checks))));
  try {
    await navigator.clipboard.writeText(code);
    alert("Código do progresso copiado para a área de transferência!\n\nCole no Discord ou guarde para restaurar depois.");
  } catch {
    prompt("Copie o código do seu progresso:", code);
  }
});

document.getElementById("import-btn").addEventListener("click", () => {
  const code = prompt("Cole aqui o código do progresso para importar:");
  if (!code) return;
  try {
    const checks = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (typeof checks !== "object" || checks === null) throw new Error("formato");
    state.checks = checks;
    saveState();
    render();
    alert("Progresso importado com sucesso!");
  } catch {
    alert("Código inválido. Verifique e tente novamente.");
  }
});

document.getElementById("reset-all").addEventListener("click", () => {
  if (!confirm("Resetar TODO o progresso (fases, diárias e semanais)?")) return;
  state.checks = {};
  saveState();
  render();
});

/* ============================================================
   Boot
   ============================================================ */
applyResets();
buildTimers();
render();
tickTimers();
setInterval(tickTimers, 1000);
