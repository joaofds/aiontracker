/* ============================================================
   Rotina: personagens (Main + Alts), listas de tarefas e marcações.
   Só lógica/estado — a renderização fica em ui/routine.js.

   state.routine = {
     templates: { main: [task], alt: [task] },  // listas editáveis (todas as alts compartilham a mesma)
     chars: [{ id, name, type: "main" | "alt", done: { [taskId]: true },
               gs?: number,                       // Gear Score atual (aba Progressão)
               checks?: { [itemId]: true } }],    // fases marcadas (só alts; as do Main ficam em state.checks)
   }
   task = { id } para tarefas padrão (texto vem de ROUTINE_TASKS)
        | { id, cat, text } para tarefas criadas pelo usuário
   ============================================================ */

// Gera um id curto aleatório.
function uid() { return Math.random().toString(36).slice(2, 10); }

// Lista padrão de tarefas de um tipo de personagem.
function defaultTemplate(type) { return ROUTINE_DEFAULTS[type].map((id) => ({ id })); }

// Rotina inicial: Main + 1 Alt com as listas padrão.
function defaultRoutine() {
  return {
    templates: { main: defaultTemplate("main"), alt: defaultTemplate("alt") },
    chars: [
      { id: uid(), name: "Main", type: "main", done: {} },
      { id: uid(), name: "Alt 1", type: "alt", done: {} },
    ],
  };
}

// Confere se um objeto tem o formato de state.routine (ex.: vindo de um import).
function isValidRoutine(r) {
  return !!r
    && Array.isArray(r.templates?.main) && Array.isArray(r.templates?.alt)
    && Array.isArray(r.chars) && r.chars.some((c) => c.type === "main")
    && r.chars.every((c) => c && typeof c.id === "string" && typeof c.name === "string"
      && (c.type === "main" || c.type === "alt") && typeof c.done === "object" && c.done !== null);
}

// Garante que state.routine existe e é válido. Na primeira vez, remove as marcações
// das antigas abas Diárias/Semanais (ids "d-*" / "w-*"), substituídas pela rotina.
function ensureRoutine() {
  if (isValidRoutine(state.routine)) return;
  state.routine = defaultRoutine();
  Object.keys(state.checks).forEach((id) => {
    if (/^[dw]-/.test(id)) delete state.checks[id];
  });
  saveState();
}

/* ---------- Consultas ---------- */

// Converte uma entrada do template na tarefa completa ({ id, cat, text, note? }), ou null se inválida.
function resolveTask(entry) {
  const def = ROUTINE_TASKS[entry.id];
  if (def) return { id: entry.id, ...def };
  return entry.text ? entry : null;
}

// Tarefas (completas) de um tipo de personagem, na ordem do template.
function routineTasks(type) {
  return state.routine.templates[type].map(resolveTask).filter(Boolean);
}

// Busca um personagem pelo id.
function findChar(charId) {
  return state.routine.chars.find((c) => c.id === charId);
}

// Progresso de um personagem: { done, total }.
function charProgress(char) {
  const tasks = routineTasks(char.type);
  return { done: tasks.filter((t) => char.done[t.id]).length, total: tasks.length };
}

// Marcações das fases de um personagem. As do Main ficam em state.checks (formato antigo, junto com
// os lembretes de Combat Power); as de cada alt, em char.checks.
function phaseChecks(char) {
  if (char.type === "main") return state.checks;
  if (typeof char.checks !== "object" || char.checks === null) char.checks = {};
  return char.checks;
}

/* ---------- Marcações ---------- */

// Marca/desmarca uma tarefa de um personagem.
function setRoutineDone(charId, taskId, checked) {
  const char = findChar(charId);
  if (!char) return;
  if (checked) char.done[taskId] = true;
  else delete char.done[taskId];
  saveState();
}

// Desmarca todas as tarefas de um personagem (ou de todos, se charId for omitido).
function clearRoutine(charId) {
  state.routine.chars
    .filter((c) => !charId || c.id === charId)
    .forEach((c) => { c.done = {}; });
  saveState();
}

// Reset automático: limpa as tarefas cujas categorias resetam no ciclo informado ("daily" | "weekly").
// Não salva — quem chama (applyResets) é responsável por isso.
function resetRoutine(kind) {
  const resetCats = new Set(ROUTINE_CATEGORIES.filter((c) => c.reset === kind).map((c) => c.id));
  state.routine.chars.forEach((char) => {
    const tasks = new Map(routineTasks(char.type).map((t) => [t.id, t]));
    Object.keys(char.done).forEach((id) => {
      const task = tasks.get(id);
      if (!task || resetCats.has(task.cat)) delete char.done[id];
    });
  });
}

/* ---------- Personagens ---------- */

// Define o Gear Score atual de um personagem (vazio, zero ou inválido apaga).
function setCharGs(charId, gs) {
  const char = findChar(charId);
  if (!char) return;
  if (Number.isFinite(gs) && gs > 0) char.gs = Math.round(gs);
  else delete char.gs;
  saveState();
}

// Desmarca as fases de todos os personagens (as do Main ficam em state.checks; ver phaseChecks).
function clearAltPhaseChecks() {
  state.routine.chars.forEach((c) => { if (c.type === "alt") c.checks = {}; });
}

// Adiciona uma nova alt ("Alt N").
function addAlt() {
  const n = state.routine.chars.filter((c) => c.type === "alt").length + 1;
  state.routine.chars.push({ id: uid(), name: `Alt ${n}`, type: "alt", done: {}, checks: {} });
  saveState();
}

// Remove um personagem (o Main não pode ser removido).
function removeChar(charId) {
  state.routine.chars = state.routine.chars.filter((c) => c.id !== charId || c.type === "main");
  saveState();
}

// Renomeia um personagem (ignora nomes vazios).
function renameChar(charId, name) {
  const char = findChar(charId);
  name = name.trim();
  if (!char || !name) return;
  char.name = name;
  saveState();
}

/* ---------- Edição das listas de tarefas ---------- */

// Adiciona uma tarefa criada pelo usuário à lista de um tipo de personagem.
function addCustomTask(type, text, cat) {
  text = text.trim();
  if (!text) return;
  state.routine.templates[type].push({ id: `c-${uid()}`, cat, text });
  saveState();
}

// Remove uma tarefa da lista de um tipo de personagem (e as marcações dela).
function removeTask(type, taskId) {
  state.routine.templates[type] = state.routine.templates[type].filter((t) => t.id !== taskId);
  state.routine.chars
    .filter((c) => c.type === type)
    .forEach((c) => { delete c.done[taskId]; });
  saveState();
}

// Volta as listas de Main e Alts para o padrão (tarefas criadas pelo usuário são apagadas).
function restoreDefaultTasks() {
  state.routine.templates = { main: defaultTemplate("main"), alt: defaultTemplate("alt") };
  saveState();
}
