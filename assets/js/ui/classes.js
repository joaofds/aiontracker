/* ============================================================
   Aba "Classes"
   ============================================================ */

// Renderiza os subgrupos de skills (Ativas / Passivas / Stigmas) de um modo.
function skillGroups(modeData) {
  if (!modeData) return "";
  const groups = [["active", "Ativas"], ["passive", "Passivas"], ["stigma", "Stigmas"]];
  const html = groups.map(([key, label]) => {
    const arr = modeData[key];
    if (!arr || !arr.length) return "";
    const items = arr.map((s) => {
      // número(s) da especialização no jogo, quando mapeado (`pick`), ex.: "★ Esp. 3 + 5 · "
      const num = s.pick?.length ? `<span class="spec-num">★ Esp. ${s.pick.join(" + ")}</span> · ` : "";
      return `<li><b>${s.n}</b>${s.d ? `<span> — ${s.d}</span>` : ""}` +
        `${s.spec ? `<em class="spec">${num}${s.spec}</em>` : ""}</li>`;
    }).join("");
    return `<div class="skill-group skill-${key}"><h6>${label}</h6><ul class="skill-list">${items}</ul></div>`;
  }).join("");
  return html;
}

// Cria o card recolhível de uma classe com as sub-abas "Visão geral" (atributos, prioridades
// PvE/PvP, manastones e dicas) e "Skills" (lista completa do SKILL_DB, ver ui/skill-db.js).
function renderClass(cls) {
  const el = createCollapsibleSection("section collapsed class-card", `
    <img class="class-symbol" src="assets/images/${cls.id}.avif" alt="Símbolo de ${cls.name}" loading="lazy" />
    <div class="section-title">
      <h2>${cls.name}</h2>
      <p><span class="role-pill">${cls.role}</span> · ${cls.weapon}</p>
    </div>
    <div class="section-meta">${CHEVRON_SVG}</div>`);
  el.dataset.tab = "classes";
  el.dataset.class = cls.id;
  el.style.setProperty("--role", cls.color);

  const chips = cls.stats.map((s) => `<span class="chip">${s}</span>`).join("");
  const sk = SKILLS[cls.id] || {};
  const body = document.createElement("div");
  body.className = "section-body";
  body.innerHTML = `
    <div class="section-body-inner class-body">
      <div class="class-subtabs" role="tablist">
        <button type="button" class="class-subtab active" data-panel="overview">Visão geral</button>
        <button type="button" class="class-subtab" data-panel="skills">Skills <span>${(SKILL_DB[cls.id] || []).length}</span></button>
      </div>
      <div class="class-panel" data-panel="overview">
        <p class="class-focus">${cls.focus}</p>
        <div class="class-block"><h4>Atributos recomendados</h4><div class="chips">${chips}</div></div>
        <div class="prio">
          <div class="class-block prio-pve">
            <h4>Prioridade PvE</h4><p>${cls.pve}</p>
            <div class="skills-wrap">${skillGroups(sk.pve)}</div>
          </div>
          <div class="class-block prio-pvp">
            <h4>Prioridade PvP</h4><p>${cls.pvp}</p>
            <div class="skills-wrap">${skillGroups(sk.pvp)}</div>
            <p class="prio-note">${PVP_NOTE}</p>
          </div>
        </div>
        <div class="class-block"><h4>Manastones</h4><p>${cls.manastones}</p></div>
        <div class="class-block"><h4>Sinergias</h4><p>${cls.synergy}</p></div>
        <div class="tip"><b>Dica:</b> ${cls.tip}</div>
      </div>
      <div class="class-panel" data-panel="skills" hidden></div>
    </div>`;

  body.querySelector('.class-panel[data-panel="skills"]').append(renderSkillDb(cls));
  initClassSubtabs(body);

  el.append(body);
  return el;
}

// Liga os botões de sub-aba de um card de classe (mostra o painel correspondente).
function initClassSubtabs(body) {
  body.querySelector(".class-subtabs").addEventListener("click", (e) => {
    const btn = e.target.closest(".class-subtab");
    if (!btn) return;
    body.querySelectorAll(".class-subtab").forEach((b) => b.classList.toggle("active", b === btn));
    body.querySelectorAll(".class-panel").forEach((p) => { p.hidden = p.dataset.panel !== btn.dataset.panel; });
  });
}
