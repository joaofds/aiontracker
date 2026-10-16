/* ============================================================
   Aba "Rotina": cards por personagem (Main + Alts) com as
   tarefas agrupadas por categoria + editor das listas de tarefas.
   ============================================================ */

// Lembra se o editor de tarefas estava aberto entre re-renderizações.
let routineEditorOpen = false;

// Cria o bloco inteiro da aba Rotina (cabeçalho, cards dos personagens e editor).
function renderRoutine() {
  const el = document.createElement("div");
  el.className = "routine";
  el.dataset.tab = "rotina";

  const head = document.createElement("div");
  head.className = "routine-head";
  head.innerHTML = `
    <div class="routine-title">
      <h2>Personagens</h2>
      <p>Diárias resetam todo dia às ${RESET_HOUR}h · semanais, lojas e eventos no reset semanal.</p>
    </div>
    <div class="routine-actions">
      <button type="button" class="btn btn-sm" data-action="add-alt">+ Adicionar alt</button>
      <button type="button" class="btn btn-sm" data-action="clear-all">Desmarcar tudo</button>
    </div>`;
  head.querySelector('[data-action="add-alt"]').addEventListener("click", () => {
    addAlt();
    refreshRoutine();
  });
  head.querySelector('[data-action="clear-all"]').addEventListener("click", () => {
    if (!confirm("Desmarcar as tarefas de todos os personagens?")) return;
    clearRoutine();
    refreshRoutine();
  });

  const grid = document.createElement("div");
  grid.className = "char-grid";
  state.routine.chars.forEach((char) => grid.appendChild(renderCharCard(char)));

  el.append(head, grid, renderRoutineEditor());
  return el;
}

// Substitui o bloco da rotina no board (após adicionar/remover personagens ou tarefas).
function refreshRoutine() {
  board.querySelector(":scope > .routine")?.replaceWith(renderRoutine());
  refreshPhases(); // personagens novos/removidos também mudam o seletor da aba Progressão
  applyTab();
}

// Cria o card de um personagem: nome, progresso, tarefas por categoria e botão de desmarcar.
function renderCharCard(char) {
  const card = document.createElement("article");
  card.className = `char-card char-${char.type}`;
  card.dataset.char = char.id;

  const head = document.createElement("header");
  head.className = "char-head";
  head.innerHTML = `
    <span class="char-badge">${char.type === "main" ? "Main" : "Alt"}</span>
    <button type="button" class="char-name" title="Renomear"></button>`;
  const nameBtn = head.querySelector(".char-name");
  nameBtn.textContent = char.name;
  nameBtn.addEventListener("click", () => {
    const name = prompt("Nome do personagem:", char.name);
    if (name === null) return;
    renameChar(char.id, name);
    nameBtn.textContent = char.name;
    refreshPhases();
  });
  if (char.type === "alt") {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "char-remove";
    remove.title = "Remover personagem";
    remove.textContent = "✕";
    remove.addEventListener("click", () => {
      if (!confirm(`Remover "${char.name}" e o progresso dele?`)) return;
      removeChar(char.id);
      refreshRoutine();
    });
    head.append(remove);
  }

  const progress = document.createElement("div");
  progress.className = "char-progress";
  progress.innerHTML = `
    <div class="section-bar"><span></span></div>
    <div class="char-progress-text"><span><b class="count-done">0</b>/<span class="count-total">0</span> feitas</span><span class="count-pct">0%</span></div>`;

  const body = document.createElement("div");
  body.className = "char-body";
  const tasks = routineTasks(char.type);
  ROUTINE_CATEGORIES.forEach((cat) => {
    const items = tasks.filter((t) => t.cat === cat.id);
    if (!items.length) return;
    const title = document.createElement("h4");
    title.className = "char-cat";
    title.textContent = `${cat.icon} ${cat.label}`;
    body.append(title);
    items.forEach((task) => {
      body.append(createCheckItem(task, !!char.done[task.id], (checked) => {
        setRoutineDone(char.id, task.id, checked);
        updateCharCard(card, char);
      }));
    });
  });

  const foot = document.createElement("footer");
  foot.className = "char-foot";
  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "btn btn-sm";
  clear.textContent = "Desmarcar";
  clear.addEventListener("click", () => {
    clearRoutine(char.id);
    refreshRoutine();
  });
  foot.append(clear);

  card.append(head, progress, body, foot);
  updateCharCard(card, char);
  return card;
}

// Atualiza o contador e a barra de progresso de um card de personagem.
function updateCharCard(card, char) {
  const { done, total } = charProgress(char);
  const pct = total ? Math.round((done / total) * 100) : 0;
  card.querySelector(".count-done").textContent = done;
  card.querySelector(".count-total").textContent = total;
  card.querySelector(".count-pct").textContent = `${pct}%`;
  card.querySelector(".section-bar span").style.width = `${pct}%`;
}

/* ---------- Editor das listas de tarefas ---------- */

// Cria o painel recolhível "Editar tarefas" com as listas do Main e das Alts.
function renderRoutineEditor() {
  const details = document.createElement("details");
  details.className = "routine-editor";
  details.open = routineEditorOpen;
  details.addEventListener("toggle", () => { routineEditorOpen = details.open; });

  const summary = document.createElement("summary");
  summary.textContent = "Editar tarefas";

  const cols = document.createElement("div");
  cols.className = "editor-cols";
  cols.append(renderTemplateEditor("main", "Tarefas do Main"), renderTemplateEditor("alt", "Tarefas das alts"));

  const foot = document.createElement("div");
  foot.className = "editor-foot";
  const restore = document.createElement("button");
  restore.type = "button";
  restore.className = "btn btn-sm btn-danger";
  restore.textContent = "Restaurar tarefas padrão";
  restore.addEventListener("click", () => {
    if (!confirm("Voltar as listas do Main e das alts para o padrão? Tarefas que você criou serão apagadas.")) return;
    restoreDefaultTasks();
    refreshRoutine();
  });
  foot.append(restore);

  details.append(summary, cols, foot);
  return details;
}

// Cria a coluna de edição de um tipo de personagem: lista com remover + formulário de adicionar.
function renderTemplateEditor(type, title) {
  const col = document.createElement("div");
  col.className = "editor-col";
  col.innerHTML = `<h4>${title}</h4>`;

  const list = document.createElement("ul");
  list.className = "editor-list";
  routineTasks(type).forEach((task) => {
    const cat = ROUTINE_CATEGORIES.find((c) => c.id === task.cat);
    const li = document.createElement("li");
    const text = document.createElement("span");
    text.textContent = `${cat ? cat.icon : "•"} ${task.text}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "char-remove";
    remove.title = "Remover tarefa";
    remove.textContent = "✕";
    remove.addEventListener("click", () => {
      removeTask(type, task.id);
      refreshRoutine();
    });
    li.append(text, remove);
    list.append(li);
  });

  const form = document.createElement("form");
  form.className = "editor-add";
  form.innerHTML = `
    <input type="text" name="text" placeholder="Nova tarefa" required />
    <select name="cat">${ROUTINE_CATEGORIES.map((c) => `<option value="${c.id}">${c.icon} ${c.label}</option>`).join("")}</select>
    <button type="submit" class="btn btn-sm">Adicionar</button>`;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addCustomTask(type, form.elements.text.value, form.elements.cat.value);
    refreshRoutine();
  });

  col.append(list, form);
  return col;
}
