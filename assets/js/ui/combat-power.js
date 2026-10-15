/* ============================================================
   Aba "Guias": card de Combat Power (CP_GUIDE) — lembrete das fontes
   de poder, com itens marcáveis salvos em state.checks e links para a
   seção certa do Guia de cada classe.
   ============================================================ */

// Linha "O que escolher": um botão por classe com guia, que abre a seção `secId` do Guia dela.
function cpClassLinks(secId) {
  const buttons = CLASSES.filter((cls) => CLASS_GUIDES[cls.id]).map((cls) =>
    `<button type="button" class="cp-class" data-class="${esc(cls.id)}" data-sec="${esc(secId)}" title="${esc(cls.name)}" style="--role:${cls.color}">
      <img src="assets/images/${esc(cls.id)}.avif" alt="${esc(cls.name)}" loading="lazy" />
    </button>`).join("");
  return `<div class="cp-classes"><span>🎯 O que escolher no guia da classe:</span>${buttons}</div>`;
}

// Lista de checkboxes de um grupo; marcar atualiza state.checks e o contador do card.
function cpCheckList(checks) {
  const list = document.createElement("div");
  list.className = "cp-checks";
  checks.forEach((item) => {
    list.append(createCheckItem(item, !!state.checks[item.id], (checked) => {
      if (checked) state.checks[item.id] = true;
      else delete state.checks[item.id];
      saveState();
      updateCombatPower();
    }));
  });
  return list;
}

// Card de uma fonte de poder: como funciona, onde conseguir, lembretes e link para o guia da classe.
function cpSourceCard(src, index) {
  const card = document.createElement("article");
  card.className = "cp-card";
  card.id = `${CP_GUIDE.id}-${src.id}`;
  card.innerHTML = `
    <h3><span class="cp-num">${String(index + 1).padStart(2, "0")}</span>${src.icon} ${esc(src.title)}</h3>
    <ul class="cp-how">${src.how.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    ${src.where?.length ? `<p class="cp-where"><span>📍 Onde:</span> ${guidePills(src.where)}</p>` : ""}`;
  card.append(cpCheckList(src.checks));
  if (src.classGuide) card.insertAdjacentHTML("beforeend", cpClassLinks(src.classGuide));
  return card;
}

// Cria o card recolhível de Combat Power (cabeçalho com contador e barra, como as fases).
function renderCombatPower() {
  const g = CP_GUIDE;
  const el = createCollapsibleSection("section collapsed cp-guide", `
    <span class="section-badge badge-guide">${g.icon} Guia</span>
    <div class="section-title"><h2>${esc(g.title)}</h2><p>${esc(g.summary)}</p></div>
    <div class="section-meta">
      <span class="section-count"><b class="count-done">0</b>/${CP_CHECKS.length}</span>
      ${CHEVRON_SVG}
    </div>`);
  el.dataset.tab = "guias";
  el.dataset.guide = g.id;

  const bar = document.createElement("div");
  bar.className = "section-bar";
  bar.innerHTML = "<span></span>";

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner guide-body cp-body";
  inner.innerHTML = `
    <div class="tip"><b>GS ≠ CP ≠ DPS.</b> Gear Score, Combat Power e o dano real no boss são três coisas
      diferentes: GS não é tudo, e parte do poder nem aparece no número de CP.</div>
    <nav class="cg-toc cp-toc">
      ${g.sources.map((s) => `<button type="button" class="cg-toc-item" data-target="${g.id}-${esc(s.id)}">${s.icon} ${esc(s.title)}</button>`).join("")}
      <button type="button" class="cg-toc-item" data-target="${g.id}-invisible">👁️ Poder invisível</button>
    </nav>
    <div class="cp-grid"></div>
    <section class="cp-invisible" id="${g.id}-invisible">
      <h3>👁️ Poder “invisível”</h3>
      <p>Coisas que aumentam o seu dano de verdade mas não aparecem (ou quase não aparecem) no número de Combat Power.</p>
      <div class="cp-inv-cols"></div>
    </section>
    <p class="sdb-foot">
      Fonte: <a href="${esc(g.source.url)}" target="_blank" rel="noopener">${esc(g.source.name)} ↗</a>,
      baseado no vídeo do <a href="${esc(g.video.url)}" target="_blank" rel="noopener">${esc(g.video.name)} ↗</a>.
      Os itens marcados ficam salvos no navegador e entram no Exportar/Importar.
    </p>`;

  const grid = inner.querySelector(".cp-grid");
  g.sources.forEach((src, i) => grid.append(cpSourceCard(src, i)));
  const cols = inner.querySelector(".cp-inv-cols");
  g.invisible.forEach((group) => {
    const col = document.createElement("div");
    col.innerHTML = `<h4>${esc(group.title)}</h4>`;
    col.append(cpCheckList(group.checks));
    cols.append(col);
  });

  // Índice rola até o card; os botões de classe abrem o Guia da classe na seção certa.
  inner.addEventListener("click", (e) => {
    const toc = e.target.closest(".cg-toc-item");
    if (toc) inner.querySelector(`#${toc.dataset.target}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const cls = e.target.closest(".cp-class");
    if (cls) openClassGuide(cls.dataset.class, cls.dataset.sec);
  });

  body.append(inner);
  el.append(bar, body);
  return el;
}

// Atualiza o contador e a barra do card de Combat Power.
function updateCombatPower() {
  const el = board.querySelector(".cp-guide");
  if (!el) return;
  const done = CP_CHECKS.filter((it) => state.checks[it.id]).length;
  el.querySelector(".count-done").textContent = done;
  el.querySelector(".section-bar span").style.width = `${(done / CP_CHECKS.length) * 100}%`;
}
