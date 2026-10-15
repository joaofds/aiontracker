/* ============================================================
   Aba "Guias"
   ============================================================ */

// Cria o card recolhível de um guia com o HTML do conteúdo.
function renderGuide(guide) {
  const el = createCollapsibleSection("section collapsed", `
    <span class="section-badge badge-guide">${guide.icon} Guia</span>
    <div class="section-title"><h2>${guide.title}</h2><p>${guide.summary}</p></div>
    <div class="section-meta">${CHEVRON_SVG}</div>`);
  el.dataset.tab = "guias";
  el.dataset.guide = guide.id;

  const body = document.createElement("div");
  body.className = "section-body";
  const inner = document.createElement("div");
  inner.className = "section-body-inner guide-body";
  inner.innerHTML = guide.html;
  body.appendChild(inner);

  el.append(body);
  return el;
}

// Duração da animação de abrir/fechar card (.section-body em styles.css), com folga.
const EXPAND_MS = 320;

// Abre um guia: troca para a aba Guias, expande o guia e rola até ele.
// Aceita "guia#ancora" para rolar até um trecho dele (elemento com id "guia-ancora", ex.: "g-cp#daevanion" → #g-cp-daevanion).
function openGuide(ref) {
  const [guideId, anchor] = ref.split("#");
  setActiveTab("guias");
  const el = board.querySelector(`.section[data-guide="${guideId}"]`);
  if (!el) return;
  const wasCollapsed = el.classList.contains("collapsed");
  el.classList.remove("collapsed");
  const target = anchor && el.querySelector(`#${guideId}-${anchor}`);
  if (!target) return el.scrollIntoView({ behavior: "smooth", block: "start" });
  // espera a animação de abrir o card (0,3s) para a posição do trecho estar certa
  setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), wasCollapsed ? EXPAND_MS : 0);
}
