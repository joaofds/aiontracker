/* ============================================================
   Export / Import / Reset
   ============================================================ */

// Gera um código base64 com as fases (e os lembretes de Combat Power) e a rotina e copia para a área de transferência.
async function exportProgress() {
  const data = { checks: state.checks, routine: state.routine };
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  try {
    await navigator.clipboard.writeText(code);
    alert("Código do progresso copiado para a área de transferência!\n\nCole no Discord ou guarde para restaurar depois.");
  } catch {
    prompt("Copie o código do seu progresso:", code);
  }
}

// Lê um código gerado pelo exportProgress e substitui o progresso atual.
// Aceita também o formato antigo (só o objeto de checks das fases), mantendo a rotina atual.
function importProgress() {
  const code = prompt("Cole aqui o código do progresso para importar:");
  if (!code) return;
  try {
    const data = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (typeof data !== "object" || data === null) throw new Error("formato");
    if (typeof data.checks === "object" && data.checks !== null) {
      state.checks = data.checks;
      if (isValidRoutine(data.routine)) state.routine = data.routine;
    } else {
      state.checks = data;
    }
    saveState();
    render();
    alert("Progresso importado com sucesso!");
  } catch {
    alert("Código inválido. Verifique e tente novamente.");
  }
}

// Apaga todo o progresso (após confirmação).
function resetAll() {
  if (!confirm("Resetar TODO o progresso (fases e rotina de todos os personagens e lembretes de Combat Power)?")) return;
  state.checks = {};
  clearAltPhaseChecks();
  clearRoutine();
  render();
}

// Liga os botões Exportar / Importar / Resetar tudo.
function initToolbar() {
  document.getElementById("export-btn").addEventListener("click", exportProgress);
  document.getElementById("import-btn").addEventListener("click", importProgress);
  document.getElementById("reset-all").addEventListener("click", resetAll);
}
