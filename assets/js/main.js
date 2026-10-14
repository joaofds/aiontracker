/* ============================================================
   Aion 2 Tracker — boot
   - checklist de progressão (fases) + rotina por personagem
   - contadores ao vivo de reset e eventos recorrentes
   - abas, tema claro/escuro, export/import, destaque do próximo
   ============================================================ */
initTheme();
initTabs();
initToolbar();
initTimersPanel();
initEventAlerts();

ensureRoutine();
applyResets();
buildTimers();
render();
tickTimers();
setInterval(tickTimers, 1000);
