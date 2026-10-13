/* ============================================================
   Sub-aba "Skills" de cada classe: lista completa do SKILL_DB
   com filtro por tipo, ícone, atributos, efeito e crédito da fonte.
   ============================================================ */

// Tipos de skill na ordem de exibição (mesmos rótulos do bloco de prioridades).
const SKILL_TYPES = [["active", "Ativas"], ["passive", "Passivas"], ["stigma", "Stigmas"]];

// Colunas de atributos: [campo, rótulo].
const SKILL_COLUMNS = [["level", "Nv."], ["cost", "Custo"], ["cooldown", "Cooldown"], ["range", "Alcance"]];

// Escapa texto para uso seguro dentro de HTML (os dados podem vir de fontes externas no futuro).
function esc(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Ordena por tipo, depois nível (sem nível vai pro fim) e nome.
function sortSkills(list) {
  const order = Object.fromEntries(SKILL_TYPES.map(([key], i) => [key, i]));
  return [...list].sort((a, b) =>
    (order[a.type] ?? 9) - (order[b.type] ?? 9)
    || (a.level ?? Infinity) - (b.level ?? Infinity)
    || a.name.localeCompare(b.name));
}

// Skills recomendadas em SKILLS para um modo ("pve" | "pvp") da classe:
// Map nome → números das especializações recomendadas (`pick`, pode ser vazio).
function recommendedSkills(classId, mode) {
  const data = SKILLS[classId]?.[mode] || {};
  return new Map(SKILL_TYPES.flatMap(([key]) => (data[key] || []).map((s) => [s.n, s.pick || []])));
}

// Ícone da skill: imagem se `icon` existir, senão as iniciais do nome.
function skillIcon(classId, skill) {
  if (skill.icon) {
    return `<img class="skill-icon" src="assets/images/skills/${esc(classId)}/${esc(skill.icon)}" alt="" loading="lazy" />`;
  }
  const initials = skill.name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("");
  return `<span class="skill-icon skill-icon-fallback" aria-hidden="true">${esc(initials)}</span>`;
}

// Link de crédito para a página de origem da skill (sem rel="nofollow": exigência da licença do MetaBot.GG).
function skillSourceLink(skill) {
  if (!/^https:\/\//.test(skill.source || "")) return "";
  return `<a class="sdb-source" href="${esc(skill.source)}" target="_blank" rel="noopener" title="Fonte: MetaBot.GG">MetaBot.GG ↗</a>`;
}

// Lista numerada das especializações (visível só com a linha expandida).
// As recomendadas (`pick` em SKILLS) ganham ★ com o modo (PvE/PvP).
function skillSpecs(skill, pvePicks, pvpPicks) {
  if (!skill.specs?.length) return "";
  const items = skill.specs.map((sp, i) => {
    const n = i + 1;
    const modes = [pvePicks.includes(n) ? "PvE" : "", pvpPicks.includes(n) ? "PvP" : ""].filter(Boolean);
    const star = modes.length ? `<span class="spec-pick" title="Especialização recomendada">★ ${modes.join(" · ")}</span>` : "";
    return `<li${modes.length ? ' class="picked"' : ""}>${sp.level != null ? `<span class="spec-level">Nv. ${esc(sp.level)}</span>` : ""}${esc(sp.text)}${star}</li>`;
  }).join("");
  return `<div class="sdb-specs"><h6>Especializações</h6><ol>${items}</ol></div>`;
}

// Cria a linha de uma skill (ícone, nome, tipo, selos de recomendada, atributos, efeito e fonte).
// O efeito fica limitado a 2 linhas; clicar na linha expande o efeito e mostra as especializações.
function skillRow(classId, skill, recPve, recPvp) {
  const typeLabel = SKILL_TYPES.find(([key]) => key === skill.type)?.[1].replace(/s$/, "") ?? skill.type;
  const pvePicks = recPve.get(skill.name) || [];
  const pvpPicks = recPvp.get(skill.name) || [];
  const hasPick = pvePicks.length || pvpPicks.length;
  const tags = [
    recPve.has(skill.name) ? '<span class="skill-tag tag-pve">PvE</span>' : "",
    recPvp.has(skill.name) ? '<span class="skill-tag tag-pvp">PvP</span>' : "",
    skill.specs?.length
      ? `<span class="skill-tag tag-specs" title="Clique para ver as especializações">${skill.specs.length} esp.${hasPick ? " ★" : ""}</span>`
      : "",
  ].join("");
  const filled = (field) => skill[field] != null && skill[field] !== "";
  const cells = SKILL_COLUMNS.map(([field, label]) =>
    `<span class="sdb-cell" data-label="${label}">${filled(field) ? esc(skill[field]) : "—"}</span>`
  ).join("");
  // sdb-bare: nenhum atributo preenchido (no mobile a linha de "—" é escondida)
  const bare = SKILL_COLUMNS.some(([field]) => filled(field)) ? "" : " sdb-bare";
  return `
    <div class="sdb-row${bare}" data-type="${esc(skill.type)}">
      <div class="sdb-skill">
        ${skillIcon(classId, skill)}
        <div class="sdb-name">
          <b>${esc(skill.name)}</b>${tags}
          <small>${esc(typeLabel)}${skill.source ? ` · ${skillSourceLink(skill)}` : ""}</small>
          ${skill.desc ? `<p class="sdb-desc">${esc(skill.desc)}</p>` : ""}
          ${skillSpecs(skill, pvePicks, pvpPicks)}
        </div>
      </div>
      ${cells}
    </div>`;
}

// Cria o painel de skills de uma classe (filtros + lista + link para a lista completa).
function renderSkillDb(cls) {
  const skills = sortSkills(SKILL_DB[cls.id] || []);
  const panel = document.createElement("div");
  panel.className = "skill-db";

  if (!skills.length) {
    panel.innerHTML = `<p class="sdb-empty">Nenhuma skill cadastrada ainda para ${esc(cls.name)}.</p>`;
    return panel;
  }

  const recPve = recommendedSkills(cls.id, "pve");
  const recPvp = recommendedSkills(cls.id, "pvp");
  const filters = [["all", "Todas", skills.length], ...SKILL_TYPES.map(([key, label]) => [key, label, skills.filter((s) => s.type === key).length])];

  panel.innerHTML = `
    <div class="sdb-filters" role="tablist">
      ${filters.map(([key, label, n], i) =>
        `<button type="button" class="sdb-filter${i === 0 ? " active" : ""}" data-filter="${key}">${label} <span>${n}</span></button>`).join("")}
    </div>
    <div class="sdb-table">
      <div class="sdb-row sdb-header" aria-hidden="true">
        <span>Skill</span>${SKILL_COLUMNS.map(([, label]) => `<span>${label}</span>`).join("")}
      </div>
      ${skills.map((s) => skillRow(cls.id, s, recPve, recPvp)).join("")}
    </div>
    <p class="sdb-foot">
      <span class="skill-tag tag-pve">PvE</span><span class="skill-tag tag-pvp">PvP</span> = recomendada na visão geral; ★ = especialização recomendada.
      Clique numa skill para ver o efeito completo (nível 1) e as especializações.
      Dados: <a href="${SKILL_DB_SOURCE(cls.id)}" target="_blank" rel="noopener">MetaBot.GG — ${esc(cls.name)} ↗</a>
    </p>`;

  panel.querySelector(".sdb-table").addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    e.target.closest(".sdb-row:not(.sdb-header)")?.classList.toggle("expanded");
  });

  panel.querySelector(".sdb-filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".sdb-filter");
    if (!btn) return;
    panel.querySelectorAll(".sdb-filter").forEach((b) => b.classList.toggle("active", b === btn));
    panel.querySelectorAll(".sdb-row:not(.sdb-header)").forEach((row) => {
      row.hidden = btn.dataset.filter !== "all" && row.dataset.type !== btn.dataset.filter;
    });
  });
  return panel;
}
