/* ============================================================
   Checklist: seções (fases/diárias/semanais), itens e progresso
   ============================================================ */
const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

// Cria o card de uma seção da checklist (cabeçalho com contador, barra de progresso e itens).
function renderSection(section) {
  const badgeClass = section.type === "daily" ? "badge-daily" : section.type === "weekly" ? "badge-weekly" : "badge-phase";

  const el = createCollapsibleSection("section", `
    <span class="section-badge ${badgeClass}">${section.badge}</span>
    <div class="section-title"><h2>${section.title}</h2><p>${section.subtitle}</p></div>
    <div class="section-meta">
      <span class="section-count"><b class="count-done">0</b>/${section.items.length}</span>
      ${CHEVRON_SVG}
    </div>`);
  el.dataset.type = section.type;
  el.dataset.id = section.id;
  el.dataset.tab = section.tab;

  const bar = document.createElement("div");
  bar.className = "section-bar";
  bar.innerHTML = "<span></span>";

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner";
  section.items.forEach((item) => inner.appendChild(renderItem(item, section)));
  body.appendChild(inner);

  el.append(bar, body);
  return el;
}

// Cria a linha de um item: checkbox que salva no estado, texto/nota e link opcional para o guia.
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

// Conta os itens marcados de uma seção: { done, total }.
function sectionProgress(section) {
  const done = section.items.filter((it) => state.checks[it.id]).length;
  return { done, total: section.items.length };
}

// Atualiza contador, barra e destaque "próximo" de uma seção no DOM.
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

// Circunferência do anel de progresso (r = 52 no SVG do index.html).
const RING_CIRC = 2 * Math.PI * 52;

// Atualiza todas as seções e o anel de progresso geral (considera só as fases).
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
