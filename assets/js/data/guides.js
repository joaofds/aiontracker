/* ============================================================
   Dados: guias (conteúdo da aba "Guias").
   Conteúdo da comunidade; ajuste conforme o patch atual do jogo.
   ============================================================ */
const GUIDES = [
  {
    id: "g-roadmap", icon: "🗺️", title: "Roadmap de progressão",
    summary: "A ordem ideal do Level 45 até o endgame — e por que seguir cada etapa.",
    html: `
      <p>A progressão de Aion 2 recompensa quem segue a ordem certa: cada etapa constrói a
      base da próxima. Pular fases costuma significar gastar recursos à toa e travar mais na frente.</p>
      <ol>
        <li><b>Fase 1 — base da Level 45:</b> complete a quest principal, exploração (Elyos e Asmodian),
          Monolith nível 30, contratos de Altgard/Abyss, penas e side quests. É aqui que você
          acumula os recursos que financiam todo o resto.</li>
        <li><b>Meta 1 — 1.400 de Gear Score:</b> o primeiro grande portão. Com 1.400 GS você libera
          Vakron e passa a progredir de verdade.</li>
        <li><b>Pós-1.400 — Vakron e Gartua:</b> conteúdo repetível que sustenta a evolução diária.</li>
        <li><b>Endgame — 1.600 a 2.100:</b> Transcendência e farm de acessórios para fechar o build.</li>
      </ol>
      <div class="tip"><b>Dica:</b> não acumule pendências de Fase 1 ao chegar no endgame — várias
      recompensas (daevanions, exploração) são one-time e aceleram tudo que vem depois.</div>`,
  },
  {
    id: "g-gearscore", icon: "⚔️", title: "Gear Score & encantamento",
    summary: "Como chegar a 1.400 de GS sem desperdiçar recursos — Clash Runes, manastones e o teto do +5.",
    html: `
      <p>Até 1.400 de Gear Score, o objetivo é <b>eficiência</b>, não encantamentos altos. Suba de forma
      equilibrada em vez de concentrar tudo numa peça só.</p>
      <ul>
        <li><b>Clash Runes:</b> equipe as <b>duas</b> e encante apenas até <b>+1</b>. Não passe disso nesta fase.</li>
        <li><b>Equipamento:</b> mantenha entre <b>+2 e +5</b> (+5 é o teto recomendado aqui), com
          <b>Manastones básicas</b> encaixadas em todos os slots.</li>
        <li><b>Acessórios:</b> suba <b>amuleto e cinto para dourado</b> — ótimo custo-benefício de GS.</li>
      </ul>
      <div class="tip"><b>Por que não passar de +5 cedo?</b> O custo e o risco de falha disparam nos
      encantes altos. Antes de ter a base completa, cada tentativa frustrada atrasa mais do que ajuda.</div>`,
  },
  {
    id: "g-rotina", icon: "🔁", title: "Rotina diária/semanal eficiente",
    summary: "A ordem certa das tarefas, gestão de Odyle e como nunca perder um reset.",
    html: `
      <p>Resets: <b>diárias às 4h</b> e <b>semanais na quarta às 4h</b>. Use os contadores no topo
      para não deixar nada escapar — principalmente na terça à noite, véspera do reset semanal.</p>
      <p><b>Diárias:</b></p>
      <ul>
        <li>Quests diárias.</li>
        <li>Os 2 eventos Shugo e os 2 chefes Nightmare.</li>
        <li>Dungeons até <b>gastar todo o seu Odyle</b> do dia.</li>
      </ul>
      <p><b>Semanais:</b></p>
      <ul>
        <li>Quests de Abyss e Altgard.</li>
        <li><b>20 recargas de Odyle produzidas</b> (craft) + <b>20 compradas</b> do Wind Breeze Merchant.</li>
        <li>As <b>14 entradas base</b> das Daily Dungeons + <b>7 Tickets de Clear Instantâneo</b>.</li>
        <li>Missões da temporada, marco de <b>11.000 troféus</b> e Ascension Trial no maior nível possível.</li>
      </ul>
      <div class="tip"><b>Gestão de Odyle:</b> não deixe o Odyle estourar o limite — gastar antes de
      acumular o máximo evita desperdício. Craftar e comprar as recargas semanais mantém o estoque girando.</div>`,
  },
  {
    id: "g-vakron", icon: "🌀", title: "Vakron & Gartua",
    summary: "Expedição e Conquista Vakron (pity) e o ciclo de 12h do Gartua.",
    html: `
      <p>Depois dos 1.400 de GS, Vakron e Gartua viram o seu motor de progressão repetível.</p>
      <ul>
        <li><b>Expedição Vakron:</b> rode a dungeon <b>1,5 vez</b> no ciclo — é o alvo de eficiência.</li>
        <li><b>Conquista Vakron:</b> <b>encha uma pity completamente</b> para garantir a recompensa travada.</li>
        <li><b>Gartua:</b> abre <b>a cada 12 horas</b>. Acompanhe o contador "Gartua" no topo e entre
          assim que estiver disponível para não perder janelas.</li>
      </ul>
      <div class="tip"><b>Ciclo de 12h:</b> o contador está ancorado às 6h/18h.</code>.</div>`,
  },
];
