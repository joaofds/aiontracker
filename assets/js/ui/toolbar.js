/* ============================================================
   Export / Import / Reset
   ============================================================ */

// Gera um código base64 com os checks e copia para a área de transferência.
async function exportProgress() {
  const code = btoa(unescape(encodeURIComponent(JSON.stringify(state.checks))));
  try {
    await navigator.clipboard.writeText(code);
    alert("Código do progresso copiado para a área de transferência!\n\nCole no Discord ou guarde para restaurar depois.");
  } catch {
    prompt("Copie o código do seu progresso:", code);
  }
}

// Lê um código gerado pelo exportProgress e substitui os checks atuais.
function importProgress() {
  const code = prompt("Cole aqui o código do progresso para importar:");
  if (!code) return;
  try {
    const checks = JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    if (typeof checks !== "object" || checks === null) throw new Error("formato");
    state.checks = checks;
    saveState();
    render();
    alert("Progresso importado com sucesso!");
  } catch {
    alert("Código inválido. Verifique e tente novamente.");
  }
}

// Apaga todo o progresso (após confirmação).
function resetAll() {
  if (!confirm("Resetar TODO o progresso (fases, diárias e semanais)?")) return;
  state.checks = {};
  saveState();
  render();
}

// Liga os botões Exportar / Importar / Resetar tudo.
function initToolbar() {
  document.getElementById("export-btn").addEventListener("click", exportProgress);
  document.getElementById("import-btn").addEventListener("click", importProgress);
  document.getElementById("reset-all").addEventListener("click", resetAll);
}
