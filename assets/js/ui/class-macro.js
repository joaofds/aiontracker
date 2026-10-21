/* ============================================================
   Sub-aba "Macro" de cada classe: colunas da macro (com ícones do
   SKILL_DB), skills manuais, fluxo de combate e como montar a macro.
   Dados em data/class-macros.js.
   ============================================================ */

// Ícone + nome de uma skill da classe (sem ícone se o nome não bater com o SKILL_DB).
function macroSkill(classId, name) {
  const skill = guideSkill(classId, name) || { name };
  return `<span class="cm-skill">${skillIcon(classId, skill)}<b>${esc(name)}</b></span>`;
}

// Texto HTML com [[Nome da skill]] → ícone + nome.
const macroText = (classId, html) => html.replace(/\[\[(.+?)\]\]/g, (_, n) => macroSkill(classId, n));

// Uma coluna da macro como no jogo: a 1ª prioridade fica embaixo.
function macroStack(classId, stack, i) {
  const slots = stack.skills.map((n, j) => `
    <li class="cm-slot"><span class="cm-prio">${j + 1}</span>${macroSkill(classId, n)}</li>`).join("");
  return `
    <div class="cm-stack">
      <h5 class="cg-block-title">Coluna ${i + 1} · ${esc(stack.name)}</h5>
      <ol class="cm-slots">${slots}</ol>
    </div>`;
}

const macroSec = (id, icon, title, body, open) => `
  <details class="cg-sec" data-sec="${id}"${open ? " open" : ""}>
    <summary><span class="cg-sec-icon">${icon}</span>${title}${CHEVRON_SVG}</summary>
    <div class="cg-sec-body">${body}</div>
  </details>`;

// Cria o painel de macro de uma classe.
function renderClassMacro(cls) {
  const m = CLASS_MACROS[cls.id];
  const id = cls.id;
  const panel = document.createElement("div");
  panel.className = "class-macro";

  const order = m.stacks.length > 1
    ? `<dl class="cg-defs"><dt>Ordem na macro</dt><dd>${guideChain(m.stacks.map((s) => s.name))}</dd><dt>Delay</dt><dd><span class="cg-pill">10 ms</span></dd></dl>`
    : `<dl class="cg-defs"><dt>Delay</dt><dd><span class="cg-pill">10 ms</span></dd></dl>`;
  const stacks = `
    <div class="cm-stacks">${m.stacks.map((s, i) => macroStack(id, s, i)).join("")}</div>
    ${order}
    ${m.notes ? `<p class="cg-para">${macroText(id, m.notes)}</p>` : ""}`;

  const manual = `<div class="cg-skills">${m.manual.map(([n, use]) => `
    <div class="cg-skill">
      ${skillIcon(id, guideSkill(id, n) || { name: n })}
      <div class="cg-skill-main"><b>${esc(n)}</b><small class="cg-muted">${esc(use)}</small></div>
    </div>`).join("")}</div>`;

  const flow = m.flow ? `<ol class="cm-flow">${m.flow.map((s) => `<li>${macroText(id, s)}</li>`).join("")}</ol>` : "";
  const warning = m.warning ? `<div class="tip"><b>Atenção:</b> ${macroText(id, m.warning)}</div>` : "";

  const basics = `
    <ol class="cm-flow">${MACRO_BASICS.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
    ${guideBlock(id, { type: "table", title: "Configurações", head: ["Ajuste", "Recomendação"], rows: MACRO_BASICS.settings })}
    <ul class="cm-tips">${MACRO_BASICS.tips.map((t) => `<li>${t}</li>`).join("")}</ul>
    ${guideBlock(id, { type: "images", title: "Configuração no jogo", items: MACRO_SETTINGS_IMAGES })}`;

  panel.innerHTML = `
    <p class="class-focus">Macro base da classe: segure a tecla da macro e deixe as colunas dispararem por
      prioridade; o que está em <b>Fora da macro</b> você aperta à mão. A sub-aba Builds pode trazer uma macro
      ajustada à build.</p>
    ${macroSec("stacks", "⌨️", "Colunas da macro", stacks, true)}
    ${macroSec("manual", "✋", "Fora da macro (teclas manuais)", manual, true)}
    ${flow || warning ? macroSec("flow", "▶️", "Como jogar", flow + warning, true) : ""}
    ${macroSec("setup", "🛠️", "Como montar a macro", basics, false)}
    <p class="sdb-foot">
      Fonte: <a href="${esc(MACRO_SOURCE.url)}" target="_blank" rel="noopener">${esc(MACRO_SOURCE.name)} ↗</a>.
      Dados da comunidade — revise conforme o patch.
    </p>`;
  return panel;
}
