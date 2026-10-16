/* ============================================================
   Aion 2 Tracker — boot
   - checklist de progressão (fases) + rotina por personagem
   - contadores ao vivo de reset e eventos recorrentes
   - abas, tema claro/escuro, export/import, destaque do próximo
   - navegação: endereço na URL, barra de contexto e botão "topo"
   ============================================================ */
initTheme();
initTabs();
initToolbar();
initTimersPanel();
initTimersPicker();
initEventAlerts();

ensureRoutine();
applyResets();
buildTimers();
render();
initNav();
tickTimers();
setInterval(tickTimers, 1000);
