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
    const items = arr.map((s) =>
      `<li><b>${s.n}</b>${s.d ? `<span> — ${s.d}</span>` : ""}` +
      `${s.spec ? `<em class="spec">${s.spec}</em>` : ""}</li>`
    ).join("");
    return `<div class="skill-group skill-${key}"><h6>${label}</h6><ul class="skill-list">${items}</ul></div>`;
  }).join("");
  return html;
}

// Cria o card recolhível de uma classe: atributos, prioridades PvE/PvP com skills, manastones e dicas.
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
    </div>`;

  el.append(body);
  return el;
}
