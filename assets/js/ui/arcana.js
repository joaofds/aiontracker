/* ============================================================
   Guia "Arcana" (aba Guias): seletor de classe + que skills cada
   carta (Parchment, Compass, Bell, Mirror) pode carregar.
   Cada skill usa a linha do SKILL_DB (ui/skill-db.js): ícone, efeito,
   especializações e selos PvE/PvP da classe.
   ============================================================ */

const ARCANA_IMG = "assets/images/guides/arcana";
const ARCANA_CLASS_KEY = "aion2-arcana-class"; // última classe escolhida (conveniência por navegador)

// Ícone de uma carta de Arcana.
const arcanaCardIcon = (id) => `<img class="arc-card-ico" src="${ARCANA_IMG}/cards/${id}.webp" alt="" loading="lazy" />`;

function arcanaSavedClass() {
  try { return localStorage.getItem(ARCANA_CLASS_KEY); } catch { return null; }
}
function arcanaSaveClass(id) {
  try { localStorage.setItem(ARCANA_CLASS_KEY, id); } catch { /* sem storage: só não lembra */ }
}

// Bloco de uma carta: cabeçalho (ícone, nome, tipo, onde cai) e a lista de skills.
function arcanaCardBlock(classId, card, names, recPve, recPvp) {
  const rows = names.map((n) => {
    const skill = guideSkill(classId, n) || { name: n, type: card.type };
    return skillRow(classId, skill, recPve, recPvp);
  }).join("");
  return `
    <div class="arc-card">
      <h4>${arcanaCardIcon(card.id)}<span><b>${esc(card.name)}</b><small>${esc(card.pool)} · cai em ${esc(card.drop)}</small></span></h4>
      <div class="sdb-table">
        <div class="sdb-row sdb-header" aria-hidden="true">
          <span>Skill</span>${SKILL_COLUMNS.map(([, label]) => `<span>${label}</span>`).join("")}
        </div>
        ${rows}
      </div>
    </div>`;
}

// Preenche o painel com as cartas da classe escolhida.
function renderArcanaClass(panel, classId) {
  const cards = ARCANA_CARD_SKILLS[classId] || {};
  const recPve = recommendedSkills(classId, "pve");
  const recPvp = recommendedSkills(classId, "pvp");
  panel.querySelectorAll(".arc-class").forEach((b) => b.classList.toggle("active", b.dataset.class === classId));
  panel.querySelector(".arc-cards").innerHTML = ARCANA_CARDS
    .filter((card) => cards[card.id])
    .map((card) => arcanaCardBlock(classId, card, cards[card.id], recPve, recPvp))
    .join("");
}

// Monta a seção de skills por classe dentro do corpo do guia (placeholder [data-arcana-skills]).
function mountArcanaSkills(root) {
  const panel = root.querySelector("[data-arcana-skills]");
  if (!panel) return;
  const classes = CLASSES.filter((cls) => ARCANA_CARD_SKILLS[cls.id]);
  const saved = arcanaSavedClass();
  const initial = classes.some((c) => c.id === saved) ? saved : classes[0].id;

  panel.innerHTML = `
    <div class="arc-classes" role="tablist">
      ${classes.map((cls) => `
        <button type="button" class="arc-class" data-class="${esc(cls.id)}" title="${esc(cls.name)}" style="--role:${cls.color}">
          <img src="assets/images/${esc(cls.id)}.avif" alt="" loading="lazy" /><span>${esc(cls.name)}</span>
        </button>`).join("")}
    </div>
    <div class="arc-cards"></div>
    <p class="sdb-foot">
      <span class="skill-tag tag-pve">PvE</span><span class="skill-tag tag-pvp">PvP</span> = recomendada na visão geral da classe.
      Clique numa skill para ver o efeito e as especializações. O <b>Chalice</b> pode carregar qualquer uma destas 22.
    </p>`;

  panel.querySelector(".arc-classes").addEventListener("click", (e) => {
    const btn = e.target.closest(".arc-class");
    if (!btn) return;
    arcanaSaveClass(btn.dataset.class);
    renderArcanaClass(panel, btn.dataset.class);
  });
  panel.querySelector(".arc-cards").addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    e.target.closest(".sdb-row:not(.sdb-header)")?.classList.toggle("expanded");
  });
  renderArcanaClass(panel, initial);
}
