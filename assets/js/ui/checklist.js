/* ============================================================
   Checklist de progressão: fases, itens e progresso
   ============================================================ */
const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

// Cria a linha de checkbox genérica ({ id, text, note?, tag? }), usada pelas fases e pela rotina.
// O texto entra via textContent, pois a rotina aceita tarefas digitadas/importadas.
function createCheckItem(item, checked, onChange) {
  const label = document.createElement("label");
  label.className = "item";
  label.dataset.id = item.id;

  const input = document.createElement("input");
  input.type = "checkbox";
  input.checked = checked;
  input.addEventListener("change", () => onChange(input.checked));

  const box = document.createElement("span");
  box.className = "checkbox";
  box.innerHTML = CHECK_SVG;

  const text = document.createElement("span");
  text.className = "item-text";
  if (ITEM_TAGS[item.tag]) {
    const tag = document.createElement("span");
    tag.className = `item-tag tag-${item.tag}`;
    tag.textContent = ITEM_TAGS[item.tag];
    text.append(tag);
  }
  text.append(item.text);
  if (item.note) {
    const note = document.createElement("small");
    note.textContent = item.note;
    text.append(note);
  }

  label.append(input, box, text);
  return label;
}

/* ---------- Personagem selecionado ---------- */
// As fases são marcadas por personagem (Main + alts da aba Rotina); o seletor fica no resumo das metas.

// Personagem cujas fases estão sendo mostradas (o salvo, ou o Main se ele não existir mais).
function phaseChar() {
  const id = localStorage.getItem(PHASE_CHAR_KEY);
  return findChar(id) || state.routine.chars.find((c) => c.type === "main");
}

// Troca o personagem da aba Progressão e redesenha as fases.
function selectPhaseChar(charId) {
  localStorage.setItem(PHASE_CHAR_KEY, charId);
  refreshPhases();
}

// Itens "main" são só do Main; itens "alt", só das alts.
function itemVisibleFor(item, char) {
  return char.type === "main" ? item.tag !== "alt" : item.tag !== "main";
}

// Itens marcáveis de uma fase para o personagem (sem os subtítulos `{ heading }`).
const phaseItems = (section, char = phaseChar()) =>
  section.items.filter((it) => it.id && itemVisibleFor(it, char));

// Redesenha o resumo e as fases (ao trocar de personagem ou mudar a lista de personagens),
// mantendo os cards abertos/fechados como estavam.
function refreshPhases() {
  const summary = board.querySelector(":scope > .roadmap-summary");
  if (!summary) return;
  summary.replaceWith(renderRoadmapSummary());
  DATA.forEach((section) => {
    const old = board.querySelector(`:scope > .section[data-id="${section.id}"]`);
    if (!old) return;
    const el = renderSection(section);
    el.classList.toggle("collapsed", old.classList.contains("collapsed"));
    old.replaceWith(el);
  });
  applyTab();
  updateOverall();
}

// Cria o card de uma fase (cabeçalho com meta e contador, barra de progresso, dica e itens).
function renderSection(section) {
  const char = phaseChar();
  const el = createCollapsibleSection("section", `
    <span class="section-badge badge-phase">${section.badge}</span>
    <div class="section-title"><h2>${section.title}</h2><p>${section.subtitle}</p></div>
    <div class="section-meta">
      <span class="section-now">📍 Meta atual</span>
      ${section.target ? `<span class="section-target">🎯 ${section.target}</span>` : ""}
      <span class="section-count"><b class="count-done">0</b>/${phaseItems(section, char).length}</span>
      ${CHEVRON_SVG}
    </div>`);
  el.dataset.id = section.id;
  el.dataset.tab = "progressao";

  const bar = document.createElement("div");
  bar.className = "section-bar";
  bar.innerHTML = "<span></span>";

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner";
  if (section.tip) inner.insertAdjacentHTML("beforeend", `<div class="tip phase-tip"><b>Atenção:</b> ${section.tip}</div>`);
  // subtítulo só entra se tiver algum item visível para o personagem até o próximo subtítulo
  let heading = null;
  section.items.forEach((item) => {
    if (item.heading) { heading = item.heading; return; }
    if (!itemVisibleFor(item, char)) return;
    if (heading) {
      inner.insertAdjacentHTML("beforeend", `<h3 class="item-heading">${heading}</h3>`);
      heading = null;
    }
    inner.appendChild(renderItem(item, section, char));
  });
  body.appendChild(inner);

  el.append(bar, body);
  return el;
}

// Cria a linha de um item da fase: checkbox salvo nas marcações do personagem e link opcional para o guia.
function renderItem(item, section, char) {
  const checks = phaseChecks(char);
  const label = createCheckItem(item, !!checks[item.id], (checked) => {
    if (checked) checks[item.id] = true;
    else delete checks[item.id];
    saveState();
    updateSection(section.id);
    updateOverall();
  });

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

// Conta os itens marcados de uma seção para o personagem: { done, total }.
function sectionProgress(section, char = phaseChar()) {
  const items = phaseItems(section, char);
  const checks = phaseChecks(char);
  const done = items.filter((it) => checks[it.id]).length;
  return { done, total: items.length };
}

// Meta atual do personagem: { id, reached: Set de fases já passadas }.
// Com GS informado, é a primeira fase com `gs` acima dele (as anteriores contam como alcançadas;
// sem nenhuma acima, a primeira fase depois da última meta de GS). Sem GS, é a primeira fase incompleta.
function currentPhase(char = phaseChar()) {
  const reached = new Set();
  if (char.gs) {
    let idx = DATA.findIndex((s) => s.gs && s.gs > char.gs);
    if (idx < 0) {
      const lastGs = DATA.reduce((n, s, i) => (s.gs ? i : n), -1);
      idx = Math.min(lastGs + 1, DATA.length - 1);
    }
    DATA.slice(0, idx).forEach((s) => reached.add(s.id));
    return { id: DATA[idx]?.id, reached };
  }
  const cur = DATA.find((s) => { const { done, total } = sectionProgress(s, char); return done < total; });
  return { id: cur?.id, reached };
}

// Próxima meta de GS do personagem: { section, missing } ou null (sem GS informado ou todas alcançadas).
function nextGsGoal(char = phaseChar()) {
  if (!char.gs) return null;
  const section = DATA.find((s) => s.gs && s.gs > char.gs);
  return section ? { section, missing: section.gs - char.gs } : null;
}

// Atualiza contador, barra e destaques ("próximo" item e meta atual) de uma seção no DOM.
function updateSection(sectionId, current = currentPhase()) {
  const section = DATA.find((s) => s.id === sectionId);
  const el = board.querySelector(`.section[data-id="${sectionId}"]`);
  if (!section || !el) return;
  const char = phaseChar();
  const checks = phaseChecks(char);
  const { done, total } = sectionProgress(section, char);
  el.querySelector(".count-done").textContent = done;
  el.querySelector(".section-bar span").style.width = total ? `${(done / total) * 100}%` : "0%";
  el.classList.toggle("current-phase", section.id === current.id);

  // destaque do próximo objetivo
  el.querySelectorAll(".item.next").forEach((n) => n.classList.remove("next"));
  const next = phaseItems(section, char).find((it) => !checks[it.id]);
  if (next) el.querySelector(`.item[data-id="${next.id}"]`)?.classList.add("next");
}

// Circunferência do anel de progresso (r = 52 no SVG do index.html).
const RING_CIRC = 2 * Math.PI * 52;

// Atualiza todas as seções, o resumo das metas e o anel de progresso geral
// (considera só as fases do personagem selecionado).
function updateOverall() {
  const char = phaseChar();
  const current = currentPhase(char);
  DATA.forEach((s) => updateSection(s.id, current));
  updateRoadmapSummary(current);
  const total = DATA.reduce((n, s) => n + phaseItems(s, char).length, 0);
  const done = DATA.reduce((n, s) => n + sectionProgress(s, char).done, 0);
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("overall-percent").textContent = `${pct}%`;
  const ring = document.getElementById("overall-ring-fg");
  ring.style.strokeDashoffset = RING_CIRC * (1 - pct / 100);
}

/* ---------- Resumo das metas (topo da aba Progressão) ---------- */

// Faixa com o seletor de personagem + GS e uma etapa por fase (meta + progresso); clicar leva até a fase.
function renderRoadmapSummary() {
  const char = phaseChar();
  const el = document.createElement("div");
  el.className = "roadmap-summary";
  el.dataset.tab = "progressao";
  el.innerHTML = `
    <div class="rm-char">
      <div class="rm-chars" role="group" aria-label="Personagem"></div>
      <label class="rm-gs">GS atual
        <input type="number" min="0" max="9999" step="1" inputmode="numeric" placeholder="ex.: 1250">
      </label>
      <span class="rm-gs-info"></span>
    </div>
    <div class="rm-steps">
      ${DATA.map((s) => `
        <button type="button" class="rm-step" data-phase="${s.id}">
          <small>${s.badge}</small>
          <b>${s.target || s.title}</b>
          <span class="rm-bar"><span></span></span>
          <em class="rm-count">0/${phaseItems(s, char).length}</em>
        </button>`).join("")}
    </div>
    <p class="rm-note">💬 ${ROADMAP.noRush}</p>`;

  // um botão por personagem (nome via textContent: é digitado pelo usuário)
  const chars = el.querySelector(".rm-chars");
  state.routine.chars.forEach((c) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `rm-char-btn char-${c.type}`;
    btn.classList.toggle("active", c.id === char.id);
    btn.setAttribute("aria-pressed", String(c.id === char.id));
    btn.textContent = c.name;
    btn.title = c.type === "main" ? "Main" : "Alt";
    btn.addEventListener("click", () => { if (c.id !== char.id) selectPhaseChar(c.id); });
    chars.append(btn);
  });

  const gsInput = el.querySelector(".rm-gs input");
  gsInput.value = char.gs || "";
  gsInput.addEventListener("input", () => {
    setCharGs(char.id, parseInt(gsInput.value, 10));
    updateOverall();
  });

  el.querySelector(".rm-steps").addEventListener("click", (e) => {
    const step = e.target.closest(".rm-step");
    if (step) navigate({ tab: "progressao", card: step.dataset.phase }, { push: true });
  });
  return el;
}

// Atualiza o progresso de cada etapa do resumo, a meta atual e o "faltam X GS".
function updateRoadmapSummary(current = currentPhase()) {
  const el = board.querySelector(".roadmap-summary");
  if (!el) return;
  const char = phaseChar();
  DATA.forEach((s) => {
    const { done, total } = sectionProgress(s, char);
    const step = el.querySelector(`.rm-step[data-phase="${s.id}"]`);
    step.querySelector(".rm-bar span").style.width = total ? `${(done / total) * 100}%` : "0%";
    step.querySelector(".rm-count").textContent = `${done}/${total}`;
    step.classList.toggle("done", (total > 0 && done === total) || current.reached.has(s.id));
    step.classList.toggle("current", s.id === current.id);
  });

  const info = el.querySelector(".rm-gs-info");
  const goal = nextGsGoal(char);
  const fmt = (n) => n.toLocaleString("pt-BR");
  if (!char.gs) info.textContent = "Informe o GS para destacar a meta certa.";
  else if (goal) info.innerHTML = `Faltam <b>${fmt(goal.missing)} GS</b> para ${goal.section.target} (${goal.section.badge})`;
  else info.innerHTML = "<b>Todas as metas de GS alcançadas!</b> 🎉";
}
