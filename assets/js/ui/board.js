/* ============================================================
   Board: renderização de todas as seções + abas
   ============================================================ */
const board = document.getElementById("board");
let activeTab = "progressao";

const CHEVRON_SVG = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

// (Re)desenha o board inteiro: checklist, guias e classes; depois aplica a aba e o progresso.
function render() {
  board.innerHTML = "";
  DATA.forEach((section) => board.appendChild(renderSection(section)));
  GUIDES.forEach((guide) => board.appendChild(renderGuide(guide)));
  CLASSES.forEach((cls) => board.appendChild(renderClass(cls)));
  applyTab();
  updateOverall();
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

// Mostra só as seções da aba ativa e marca o botão da aba correspondente.
function applyTab() {
  document.querySelectorAll(".section").forEach((el) => {
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
// Liga o clique nos botões de aba.
function initTabs() {
  document.getElementById("tabs").addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (tab) setActiveTab(tab.dataset.tab);
  });
}
