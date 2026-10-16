/* ============================================================
   Sub-aba "Guia" de cada classe: builds do CLASS_GUIDES (com seletor
   quando há mais de uma), em seções recolhíveis com índice no topo.
   Skills puxam ícone e texto das especializações do SKILL_DB.
   ============================================================ */

// Selos para conteúdo fora do Global: [rótulo, dica].
const GUIDE_TAGS = {
  kr: ["TW/KR", "Ainda não existe no servidor Global (só no cliente da Coreia/Taiwan)"],
  s2: ["S2", "Previsto para a Season 2"],
};

// Texto simples ou { t, tag } → HTML escapado com o selo, se houver.
function guideText(value) {
  if (value == null) return "";
  if (typeof value !== "object") return esc(value);
  const tag = GUIDE_TAGS[value.tag];
  return esc(value.t) + (tag ? `<span class="cg-tag cg-tag-${esc(value.tag)}" title="${esc(tag[1])}">${tag[0]}</span>` : "");
}

const guidePills = (list) => `<span class="cg-pills">${list.map((v) => `<span class="cg-pill">${guideText(v)}</span>`).join("")}</span>`;
const guideChain = (list) => `<span class="cg-chain">${list.map((v) => `<span class="cg-pill">${guideText(v)}</span>`).join('<span class="cg-arrow">▸</span>')}</span>`;

// Skill do SKILL_DB pelo nome do guia (ignora sufixos como " (rank 20)" ou " (Lv5+)").
function guideSkill(classId, name) {
  const base = String(name).replace(/\s*\(.*\)$/, "");
  return (SKILL_DB[classId] || []).find((s) => s.name === base);
}

// Selo à direita do card da skill: nível alvo (old builds) ou pontos investidos (builds estruturadas).
function guideSkillBadge(item) {
  if (item.lv) return `<span class="cg-lv" title="Nível alvo">Nv. ${esc(item.lv)}</span>`;
  if (item.pts != null) return `<span class="cg-lv" title="Pontos investidos">${esc(item.pts)} pts</span>`;
  return '<span class="cg-lv">—</span>';
}

// Linha de skill ativa: ícone, nome, nível alvo e as especializações escolhidas (texto do SKILL_DB).
function guideSkillRow(classId, item) {
  const skill = guideSkill(classId, item.n) || { name: item.n };
  const specs = (item.specs || []).map((n) => {
    const sp = skill.specs?.[n - 1];
    return `<li><span class="cg-spec-n">${n}</span>${sp ? esc(sp.text) : "—"}</li>`;
  }).join("");
  return `
    <div class="cg-skill">
      ${skillIcon(classId, skill)}
      <div class="cg-skill-main">
        <b>${esc(item.n)}</b>
        ${specs ? `<ol class="cg-specs">${specs}</ol>` : '<small class="cg-muted">sem especialização no guia</small>'}
      </div>
      ${guideSkillBadge(item)}
    </div>`;
}

// Item de lista ranqueada: com ícone quando o nome bate com uma skill da classe.
function guideRankedItem(classId, value) {
  const skill = typeof value === "string" && guideSkill(classId, value);
  return `<li>${skill ? skillIcon(classId, skill) : ""}<span>${guideText(value)}</span></li>`;
}

// Renderiza um bloco de seção conforme o `type` (ver data/class-guides/index.js).
function guideBlock(classId, block) {
  const title = block.title ? `<h5 class="cg-block-title">${esc(block.title)}</h5>` : "";
  switch (block.type) {
    case "skills":
      return `<div class="cg-block">${title}<div class="cg-skills">${block.items.map((it) => guideSkillRow(classId, it)).join("")}</div></div>`;
    case "ranked": {
      const extra = block.extra?.length
        ? `<p class="cg-extra"><span>Alternativas:</span> ${guidePills(block.extra)}</p>` : "";
      return `<div class="cg-block">${title}<ol class="cg-ranked">${block.items.map((v) => guideRankedItem(classId, v)).join("")}</ol>${extra}</div>`;
    }
    case "defs": {
      const rows = block.items.map((it) => {
        const value = it.chain ? guideChain(it.chain) : it.pills ? guidePills(it.pills) : `<span class="cg-para">${guideText(it.text)}</span>`;
        return `<dt>${esc(it.k)}</dt><dd>${value}</dd>`;
      }).join("");
      return `<div class="cg-block">${title}<dl class="cg-defs">${rows}</dl></div>`;
    }
    case "table": {
      const cell = (c) => (Array.isArray(c) ? guidePills(c) : guideText(c));
      return `<div class="cg-block">${title}<div class="cg-table-wrap"><table class="cg-table">
        <thead><tr>${block.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${block.rows.map((r) => `<tr>${r.map((c, i) => `<td data-label="${esc(block.head[i])}">${cell(c)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div></div>`;
    }
    case "images":
      return `<div class="cg-block">${title}<div class="cg-figs">${block.items.map((img) => `
        <figure${img.wide ? ' class="cg-fig-wide"' : ""}>
          <a href="assets/images/guides/${esc(img.src)}" target="_blank" rel="noopener">
            <img src="assets/images/guides/${esc(img.src)}" alt="${esc(img.caption || block.title || "")}" loading="lazy" />
          </a>
          ${img.caption ? `<figcaption>${esc(img.caption)}</figcaption>` : ""}
        </figure>`).join("")}</div></div>`;
    case "links":
      return `<div class="cg-block">${title}<div class="cg-links">${block.items.map((l) => `
        <a class="cg-link" href="${esc(l.url)}" target="_blank" rel="noopener"><b>${esc(l.label)} ↗</b>${l.desc ? `<span>${esc(l.desc)}</span>` : ""}</a>`).join("")}</div></div>`;
    case "tip":
      return `<div class="tip">${block.text}</div>`;
    default:
      return "";
  }
}

// Cria o conteúdo de uma build (resumo, legenda, índice, seções recolhíveis e fonte).
function renderGuideBuild(classId, build) {
  const el = document.createElement("div");
  el.className = "cg-build";
  el.dataset.build = build.id;

  const toc = build.sections.map((s) => `<button type="button" class="cg-toc-item" data-target="${esc(s.id)}">${s.icon} ${esc(s.title)}</button>`).join("");
  const sections = build.sections.map((s) => `
    <details class="cg-sec" data-sec="${esc(s.id)}"${s.open ? " open" : ""}>
      <summary><span class="cg-sec-icon">${s.icon}</span>${esc(s.title)}${CHEVRON_SVG}</summary>
      <div class="cg-sec-body">
        ${s.note ? `<p class="cg-note">${esc(s.note)}</p>` : ""}
        ${s.blocks.map((b) => guideBlock(classId, b)).join("")}
      </div>
    </details>`).join("");

  el.innerHTML = `
    ${build.intro ? `<p class="class-focus">${esc(build.intro)}</p>` : ""}
    <p class="cg-legend">
      <span class="cg-tag cg-tag-kr">TW/KR</span> ainda não está no Global ·
      <span class="cg-tag cg-tag-s2">S2</span> previsto para a Season 2 ·
      <span class="cg-arrow">▸</span> ordem de prioridade
    </p>
    <nav class="cg-toc">${toc}</nav>
    ${sections}
    <p class="sdb-foot">
      Fonte: <a href="${esc(build.source.url)}" target="_blank" rel="noopener">${esc(build.source.name)} ↗</a>${build.author ? ` · por ${esc(build.author)}` : ""}.
      Dados da comunidade — revise conforme o patch.
    </p>`;

  // Índice: abre a seção e rola até ela.
  el.querySelector(".cg-toc").addEventListener("click", (e) => {
    const btn = e.target.closest(".cg-toc-item");
    if (!btn) return;
    const sec = el.querySelector(`.cg-sec[data-sec="${btn.dataset.target}"]`);
    sec.open = true;
    sec.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  return el;
}

// Cria o painel do guia de uma classe; com mais de uma build, mostra um seletor no topo.
function renderClassGuide(cls) {
  const builds = CLASS_GUIDES[cls.id];
  const panel = document.createElement("div");
  panel.className = "class-guide";

  if (builds.length > 1) {
    const picker = document.createElement("div");
    picker.className = "sdb-filters cg-builds";
    picker.innerHTML = builds.map((b, i) =>
      `<button type="button" class="sdb-filter${i === 0 ? " active" : ""}" data-build="${esc(b.id)}">${esc(b.label)}</button>`).join("");
    picker.addEventListener("click", (e) => {
      const btn = e.target.closest(".sdb-filter");
      if (!btn) return;
      picker.querySelectorAll(".sdb-filter").forEach((b) => b.classList.toggle("active", b === btn));
      panel.querySelectorAll(".cg-build").forEach((el) => { el.hidden = el.dataset.build !== btn.dataset.build; });
    });
    panel.append(picker);
  }

  builds.forEach((build, i) => {
    const el = renderGuideBuild(cls.id, build);
    el.hidden = i > 0;
    panel.append(el);
  });
  return panel;
}

// Abre o Guia de uma classe na seção `secId` (se a build atual não tiver a seção, troca para
// uma que tenha) e grava no histórico. Ver navigate() em ui/nav.js.
function openClassGuide(classId, secId) {
  navigate({ tab: "classes", card: classId, rest: ["guia", secId] }, { push: true });
}
