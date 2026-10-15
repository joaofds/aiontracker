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

// Abre um guia (troca para a aba Guias, expande e rola até ele) e grava no histórico.
// Aceita "guia#ancora" para rolar até um trecho dele (elemento com id "guia-ancora",
// ex.: "g-cp#daevanion" → #g-cp-daevanion). Ver navigate() em ui/nav.js.
function openGuide(ref) {
  const [guideId, anchor] = ref.split("#");
  navigate({ tab: "guias", card: guideId, rest: anchor ? [anchor] : [] }, { push: true });
}
