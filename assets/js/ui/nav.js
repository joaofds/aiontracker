/* ============================================================
   Navegação: endereço na URL, barra de contexto fixa e botão "topo".

   Endereço (hash) = onde você está: aba / card / sub-aba / build / seção.
     #classes                       aba Classes
     #classes/chanter               card do Chanter aberto (Visão geral)
     #classes/chanter/skills        sub-aba Skills
     #classes/cleric/guia/pve/gear  sub-aba Guia, build "pve", seção Equipamento
     #guias/g-cp/daevanion          card de Combat Power, fonte "Pontos de Daevanion"
     #progressao/fase1              card de uma fase
   Mudanças de aba e atalhos (📖 guia, 🎯 classe) entram no histórico (o Voltar do
   navegador funciona); rolar, abrir cards e trocar sub-aba só atualizam o endereço.
   ============================================================ */

// Duração da animação de abrir/fechar card (.section-body em styles.css), com folga.
const EXPAND_MS = 320;
const TABS = ["progressao", "rotina", "guias", "classes"];
const SUBTAB_SLUG = { overview: "", skills: "skills", guide: "guia" };

const ctxBar = document.getElementById("context-bar");
const toTopBtn = document.getElementById("to-top");
let ctxKey = "";          // o que a barra de contexto está mostrando (evita redesenhar à toa)
let currentHash = "";     // último endereço escrito, para não repetir replaceState
let navigating = false;   // durante uma navegação programada, a rolagem não reescreve o endereço

/* ---------- Medidas das barras fixas ---------- */

// Publica a altura do cabeçalho e da barra de abas em CSS (--header-h / --nav-h): a barra de
// abas gruda logo abaixo do cabeçalho e os alvos de rolagem descontam as duas.
function initStickyMeasures() {
  const root = document.documentElement;
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav-sticky");
  const measure = () => {
    root.style.setProperty("--header-h", `${header.offsetHeight}px`);
    root.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
  };
  new ResizeObserver(measure).observe(header);
  new ResizeObserver(measure).observe(nav);
  measure();
}

// Fim da área coberta pelas barras fixas (cabeçalho + abas + barra de contexto, se visível).
function stickyBottom() {
  return document.querySelector(".nav-sticky").getBoundingClientRect().bottom + (ctxBar.hidden ? 0 : ctxBar.offsetHeight);
}

// Linha de leitura: onde os alvos de rolagem param (= --scroll-offset do CSS). Fixa, para não
// mudar quando a barra de contexto aparece ou some.
function readingLine() {
  return parseFloat(getComputedStyle(document.querySelector(".section") || document.body).scrollMarginTop) || stickyBottom();
}

/* ---------- Card em foco ---------- */

// Identificador de um card do board no endereço: classe, guia ou fase.
const cardSlug = (el) => el.dataset.class || el.dataset.guide || el.dataset.id || "";

// Card aberto que está sob a linha de leitura (o cabeçalho dele já subiu atrás das barras).
function focusedCard() {
  const line = readingLine() + 8;
  return [...board.querySelectorAll(":scope > .section:not([hidden]):not(.collapsed)")].find((el) => {
    const r = el.getBoundingClientRect();
    return r.top < line - el.querySelector(".section-head").offsetHeight && r.bottom > line + 60;
  });
}

// Seção sendo lida: a de topo mais baixo entre as que já passaram da linha de leitura
// (em grade, empate fica com a primeira da linha).
function sectionInView(list) {
  const line = readingLine() + 24;
  let current = null, best = -Infinity;
  list.forEach((el) => {
    const top = Math.round(el.getBoundingClientRect().top);
    if (top <= line && top > best) { current = el; best = top; }
  });
  return current;
}

// Partes do endereço de um card: [aba, card, sub-aba, build?, seção?] (vazias são removidas).
function cardPath(card) {
  const parts = [card.dataset.tab, cardSlug(card)];
  if (card.classList.contains("class-card")) {
    const panel = card.querySelector(".class-subtab.active")?.dataset.panel || "overview";
    parts.push(SUBTAB_SLUG[panel]);
    if (panel === "guide") {
      const build = card.querySelector(".cg-build:not([hidden])");
      if (card.querySelectorAll(".cg-build").length > 1) parts.push(build.dataset.build);
      parts.push(sectionInView(build.querySelectorAll(".cg-sec"))?.dataset.sec || "");
    }
  } else if (card.classList.contains("cp-guide")) {
    let src = sectionInView(card.querySelectorAll(".cp-card, .cp-invisible"));
    // na grade há vários cards por linha: se o do endereço está na mesma linha, ele continua
    const linked = card.querySelector(`#${CSS.escape(`${CP_GUIDE.id}-${readHash().rest[0] || ""}`)}`);
    if (src && linked && Math.round(linked.getBoundingClientRect().top) === Math.round(src.getBoundingClientRect().top)) src = linked;
    parts.push(src ? src.id.replace(`${CP_GUIDE.id}-`, "") : "");
  }
  return parts.filter(Boolean);
}

/* ---------- Endereço (hash) ---------- */

// Escreve o endereço: push = nova entrada no histórico (Voltar volta para cá); senão substitui.
function writeHash(parts, push = false) {
  const hash = `#${parts.join("/")}`;
  if (hash === currentHash) return;
  currentHash = hash;
  const url = location.pathname + location.search + hash; // caminho completo: imune a <base href>
  if (push) history.pushState(null, "", url);
  else history.replaceState(null, "", url);
}

// Lê o endereço atual: { tab, card, rest } (rest = sub-aba/build/seção).
function readHash() {
  const [tab, card, ...rest] = decodeURIComponent(location.hash.slice(1)).split("/").filter(Boolean);
  return { tab: TABS.includes(tab) ? tab : null, card, rest };
}

// Vai até um lugar: troca de aba, abre o card, escolhe sub-aba/build/seção e rola até lá.
// `rest` (para classes): ["skills"] | ["guia", build?, seção?]; (para guias): [âncora].
// Com `push`, grava no histórico.
function navigate({ tab, card, rest = [] }, { push = false, smooth = true } = {}) {
  if (!tab) return;
  setActiveTab(tab);
  const el = card && board.querySelector(`:scope > [data-tab="${tab}"]:is([data-class="${card}"], [data-guide="${card}"], [data-id="${card}"])`);
  if (!el) {
    writeHash([tab], push);
    return;
  }

  const wasCollapsed = el.classList.contains("collapsed");
  el.classList.remove("collapsed");
  let target = el;
  navigating = true;

  if (el.classList.contains("class-card")) {
    const [sub, ...more] = rest;
    const panel = Object.keys(SUBTAB_SLUG).find((k) => SUBTAB_SLUG[k] === (sub || "")) || "overview";
    el.querySelector(`.class-subtab[data-panel="${panel}"]`)?.click();
    if (panel === "guide") target = selectGuideSection(el, more) || el;
  } else if (rest[0]) {
    target = el.querySelector(`#${CSS.escape(`${cardSlug(el)}-${rest[0]}`)}`) || el;
  }

  writeHash([tab, cardSlug(el), ...rest].filter(Boolean), push);
  // espera a animação de abrir o card para a posição do alvo estar certa; o endereço volta a
  // acompanhar a rolagem só quando ela termina (sem rolagem não há scrollend: daí o limite)
  setTimeout(() => {
    const done = () => { if (navigating) { navigating = false; updateNav(); } };
    window.addEventListener("scrollend", done, { once: true });
    setTimeout(done, 1200);
    target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
  }, wasCollapsed ? EXPAND_MS : 0);
}

// No Guia de uma classe: escolhe a build (pelo id ou pela 1ª que tem a seção) e abre a seção.
// `parts` = [build?, seção?]. Retorna a seção (ou undefined).
function selectGuideSection(card, parts) {
  const builds = [...card.querySelectorAll(".cg-build")];
  const byId = builds.find((b) => b.dataset.build === parts[0]);
  const secId = byId ? parts[1] : parts[0];
  const current = byId || builds.find((b) => !b.hidden);
  const target = !secId || current?.querySelector(`.cg-sec[data-sec="${secId}"]`) ? current
    : builds.find((b) => b.querySelector(`.cg-sec[data-sec="${secId}"]`)) || current;
  if (target && target.hidden) card.querySelector(`.cg-builds [data-build="${target.dataset.build}"]`)?.click();
  const sec = secId && target?.querySelector(`.cg-sec[data-sec="${secId}"]`);
  if (sec) sec.open = true;
  return sec;
}

/* ---------- Barra de contexto ---------- */

// Monta a barra de contexto do card em foco: título, sub-abas/builds/seções e ações.
function renderContextBar(card) {
  const title = card.querySelector(".section-title h2")?.textContent || "";
  const symbol = card.querySelector(".class-symbol");
  const icon = symbol ? `<img class="ctx-symbol" src="${symbol.getAttribute("src")}" alt="" />`
    : card.dataset.guide === CP_GUIDE.id ? `<span class="ctx-icon">${CP_GUIDE.icon}</span>` : "";
  let middle = "";

  if (card.classList.contains("class-card")) {
    const active = card.querySelector(".class-subtab.active")?.dataset.panel;
    middle += `<div class="ctx-subtabs">${[...card.querySelectorAll(".class-subtab")].map((b) =>
      `<button type="button" class="ctx-btn${b.dataset.panel === active ? " active" : ""}" data-subtab="${b.dataset.panel}">${esc(b.firstChild.textContent.trim())}</button>`).join("")}</div>`;
    if (active === "guide") {
      const builds = [...card.querySelectorAll(".cg-build")];
      const build = builds.find((b) => !b.hidden);
      if (builds.length > 1) {
        middle += `<select class="ctx-select" data-role="build" aria-label="Build">${builds.map((b) =>
          `<option value="${b.dataset.build}"${b === build ? " selected" : ""}>${esc(card.querySelector(`.cg-builds [data-build="${b.dataset.build}"]`).textContent)}</option>`).join("")}</select>`;
      }
      middle += sectionSelect([...build.querySelectorAll(".cg-sec")].map((s) => [s.dataset.sec, s.querySelector("summary").textContent.trim()]));
    }
  } else if (card.classList.contains("cp-guide")) {
    middle += sectionSelect([...card.querySelectorAll(".cp-card, .cp-invisible")].map((s) =>
      [s.id.replace(`${CP_GUIDE.id}-`, ""), s.querySelector("h3").textContent.replace(/^\d+/, "").trim()]));
  }

  ctxBar.style.setProperty("--role", card.style.getPropertyValue("--role") || "var(--accent)");
  ctxBar.innerHTML = `
    <div class="ctx-inner">
      <span class="ctx-title">${icon}<b>${esc(title)}</b></span>
      ${middle}
      <span class="ctx-actions">
        <button type="button" class="ctx-btn" data-action="link" title="Copiar link deste ponto">🔗</button>
        <button type="button" class="ctx-btn" data-action="top" title="Voltar ao topo do card">↑</button>
        <button type="button" class="ctx-btn" data-action="close" title="Fechar o card">✕</button>
      </span>
    </div>`;
}

// <select> de "pular para a seção": [[id, rótulo], ...].
function sectionSelect(items) {
  return `<select class="ctx-select" data-role="section" aria-label="Ir para a seção">
    <option value="">Ir para…</option>
    ${items.map(([id, label]) => `<option value="${esc(id)}">${esc(label)}</option>`).join("")}
  </select>`;
}

// Recalcula o card em foco: mostra/atualiza a barra de contexto, o botão "topo" e o endereço.
function updateNav() {
  const card = focusedCard();
  const key = card ? `${cardSlug(card)}|${card.querySelector(".class-subtab.active")?.dataset.panel || ""}|${card.querySelector(".cg-build:not([hidden])")?.dataset.build || ""}` : "";
  if (key !== ctxKey) {
    ctxKey = key;
    ctxBar.hidden = !card;
    if (card) renderContextBar(card);
  }
  toTopBtn.hidden = window.scrollY < 600;
  toTopBtn.title = card ? "Voltar ao topo do card" : "Voltar ao topo da página";

  if (navigating) return;
  // endereço acompanha a leitura (sem entrar no histórico); sem card em foco, mantém o card
  // do endereço enquanto ele estiver aberto e na tela (ex.: logo depois de navegar até ele)
  if (card) return writeHash(cardPath(card));
  const { tab, card: slug } = readHash();
  const linked = tab === activeTab && slug && board.querySelector(`:scope > [data-tab="${tab}"]:is([data-class="${slug}"], [data-guide="${slug}"], [data-id="${slug}"])`);
  const onScreen = linked && !linked.hidden && !linked.classList.contains("collapsed")
    && linked.getBoundingClientRect().bottom > stickyBottom() && linked.getBoundingClientRect().top < window.innerHeight;
  if (!onScreen) writeHash([activeTab]);
}

// Rola até o topo do card em foco (ou da página, se não houver).
function scrollToCardTop() {
  const card = focusedCard();
  if (card) card.scrollIntoView({ behavior: "smooth", block: "start" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

// Ações da barra de contexto (repassadas para os controles reais do card).
function onContextAction(e) {
  const card = focusedCard();
  if (!card) return;
  const btn = e.target.closest("button");
  if (btn?.dataset.subtab) {
    card.querySelector(`.class-subtab[data-panel="${btn.dataset.subtab}"]`).click();
    card.scrollIntoView({ block: "start" });
  } else if (btn?.dataset.action === "top") {
    scrollToCardTop();
  } else if (btn?.dataset.action === "close") {
    card.classList.add("collapsed");
    card.scrollIntoView({ block: "start" });
  } else if (btn?.dataset.action === "link") {
    copyCurrentLink(btn);
  }
  setTimeout(updateNav, 0);
}

// Seleções da barra de contexto: trocar build ou pular para uma seção.
function onContextSelect(e) {
  const card = focusedCard();
  const sel = e.target;
  if (!card || !sel.value) return;
  if (sel.dataset.role === "build") {
    card.querySelector(`.cg-builds [data-build="${sel.value}"]`)?.click();
    card.scrollIntoView({ block: "start" });
  } else if (card.classList.contains("class-card")) {
    const sec = selectGuideSection(card, [sel.value]);
    sec?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    card.querySelector(`#${CSS.escape(`${cardSlug(card)}-${sel.value}`)}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  sel.value = sel.dataset.role === "build" ? sel.value : "";
  setTimeout(updateNav, 0);
}

// Copia o endereço atual (com o ponto da página) para mandar no Discord.
async function copyCurrentLink(btn) {
  updateNav();
  try {
    await navigator.clipboard.writeText(location.href);
    btn.textContent = "✓";
    setTimeout(() => { btn.textContent = "🔗"; }, 1200);
  } catch {
    prompt("Copie o link:", location.href);
  }
}

/* ---------- Boot ---------- */

// Liga tudo: medidas das barras fixas, rolagem, barra de contexto, botão "topo",
// cliques que mudam o estado do card, histórico (Voltar/Avançar) e o endereço inicial.
function initNav() {
  initStickyMeasures();

  let ticking = false;
  const schedule = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; updateNav(); });
  };
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  // abrir/fechar card, trocar sub-aba ou build muda o que a barra deve mostrar
  board.addEventListener("click", () => setTimeout(schedule, 0));
  board.addEventListener("toggle", schedule, true);

  ctxBar.addEventListener("click", onContextAction);
  ctxBar.addEventListener("change", onContextSelect);
  toTopBtn.addEventListener("click", scrollToCardTop);

  window.addEventListener("popstate", () => {
    currentHash = location.hash;
    navigate(readHash(), { smooth: false });
  });

  // endereço inicial (link compartilhado ou recarregar a página)
  const initial = readHash();
  if (initial.tab) navigate(initial, { smooth: false });
  else writeHash([activeTab]);
  schedule();
}
