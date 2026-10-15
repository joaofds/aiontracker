/* ============================================================
   Board: renderização de todas as seções + abas
   ============================================================ */
const board = document.getElementById("board");
let activeTab = "progressao";

const CHEVRON_SVG = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

// (Re)desenha o board inteiro: fases, rotina, guias e classes; depois aplica a aba e o progresso.
function render() {
  board.innerHTML = "";
  board.appendChild(renderRoadmapSummary());
  DATA.forEach((section) => board.appendChild(renderSection(section)));
  board.appendChild(renderRoutine());
  GUIDES.forEach((guide) => board.appendChild(renderGuide(guide)));
  board.appendChild(renderCombatPower());
  CLASSES.forEach((cls) => board.appendChild(renderClass(cls)));
  applyTab();
  updateOverall();
  updateCombatPower();
}

// Cria o card recolhível base (section + cabeçalho clicável).
function createCollapsibleSection(className, headHtml) {
  const el = document.createElement("section");
  el.className = className;

  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = headHtml;
  head.addEventListener("click", () => el.classList.toggle("collapsed"));

  el.appendChild(head);
  return el;
}

/* ---------- Abas ---------- */

// Mostra só os blocos do board da aba ativa e marca o botão da aba correspondente.
function applyTab() {
  board.querySelectorAll(":scope > [data-tab]").forEach((el) => {
    el.hidden = el.dataset.tab !== activeTab;
  });
  document.querySelectorAll(".tab").forEach((t) => {
    t.classList.toggle("active", t.dataset.tab === activeTab);
  });
}
// Troca a aba ativa e atualiza a visualização.
function setActiveTab(tab) {
  activeTab = tab;
  applyTab();
}
// Liga o clique nos botões de aba: troca a aba, grava no histórico (ver ui/nav.js) e, se a
// página estiver rolada para baixo, volta para o começo do conteúdo.
function initTabs() {
  document.getElementById("tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    navigate({ tab: tab.dataset.tab }, { push: true });
    if (board.getBoundingClientRect().top < stickyBottom()) board.scrollIntoView({ block: "start" });
  });
}
