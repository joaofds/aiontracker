/* ============================================================
   Tema claro/escuro
   ============================================================ */
const themeBtn = document.getElementById("theme-toggle");

// Aplica o tema ("light" | "dark"), ajusta o ícone do botão e salva a preferência.
function applyTheme(theme) {
  const light = theme === "light";
  document.body.classList.toggle("light", light);
  themeBtn.textContent = light ? "🌙" : "☀️";
  localStorage.setItem(THEME_KEY, theme);
}

// Liga o botão de alternar tema e aplica o tema salvo (padrão: escuro).
function initTheme() {
  themeBtn.addEventListener("click", () => {
    applyTheme(document.body.classList.contains("light") ? "dark" : "light");
  });
  applyTheme(localStorage.getItem(THEME_KEY) || "dark");
}
