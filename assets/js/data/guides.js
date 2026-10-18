/* ============================================================
   Dados: guias (conteúdo da aba "Guias").
   Conteúdo da comunidade; ajuste conforme o patch atual do jogo.
   ============================================================ */
const GUIDES = [
  {
    id: "g-roadmap", icon: "🗺️", title: "Roadmap de progressão",
    summary: "Do nível 22 à raid de Ludra, meta por meta — e por que seguir essa ordem.",
    html: `
      <p>A aba <b>Progressão</b> segue o roadmap do <b>DeanGamingTV</b>: cada meta prepara a próxima,
      e pular etapas costuma significar gastar recursos à toa.</p>
      <ol>
        <li><b>Primeira semana:</b> o que fazer antes do primeiro reset semanal — guardar entradas de
          Nightmare, Daily Dungeons, Draupnir 8x, Command Quests e crafting de energia.</li>
        <li><b>Meta 1 — nível 45:</b> com o nível 22 (1ª Ascensão) o personagem passa a gerar energia de
          dungeon (DG). Suba o Main fazendo side quests e pegando penas e Sealed Dungeons pelo caminho.</li>
        <li><b>Meta 2 — 1.000 GS:</b> termine a MSQ (dá a Unique Weapon e a Guard) e feche o seu mapa:
          penas, Sealed Dungeons, Strongholds e side quests.</li>
        <li><b>Meta 3 — 1.400 GS:</b> termine todo o conteúdo paralelo <b>sem gastar energia DG</b> e
          libere as dungeons 2★ (Urugugu e Vakron).</li>
        <li><b>Metas 4 e 5 — 1.900 e 2.100 GS:</b> dourados no +10 e Transcendence Stages 1 e 2.</li>
        <li><b>Meta 6 — 2.800 GS:</b> dungeons 3★ (Ferocious Horn Den e Fire Temple) e a raid de Ludra
          (10 jogadores).</li>
      </ol>
      <div class="tip"><b>Sem pressa:</b> não se sinta obrigado a correr, pular conteúdo ou fazer alts.
      Jogue do jeito mais divertido — todo mundo chega no mesmo equipamento, mais cedo ou mais tarde.</div>`,
  },
  {
    id: "g-gearscore", icon: "⚔️", title: "Gear Score & encantamento",
    summary: "Como subir até 1.400 de GS sem desperdiçar recursos — runas, manastones e o teto de cada fase.",
    html: `
      <p>Até 1.400 de Gear Score, o objetivo é <b>eficiência</b>, não encantamentos altos. Suba de forma
      equilibrada em vez de concentrar tudo numa peça só.</p>
      <p><b>Até 1.000 GS:</b></p>
      <ul>
        <li><b>Runas:</b> as <b>duas</b> (vêm das side quests) em <b>+1</b> — não passe disso nesta fase.</li>
        <li><b>Amuleto e cinto azuis</b> em +0 (ou verdes em +10): o amuleto vem das penas e o cinto, das Strongholds.</li>
        <li>Se faltar GS: todo o equipamento em <b>+3</b> (+48 GS) e 1 <b>Lesser Manastone/Soulstone</b> por peça (~3 GS cada).</li>
      </ul>
      <p><b>De 1.000 a 1.400 GS:</b></p>
      <ul>
        <li>Itens azuis em <b>+3</b> (+5 se precisar) e dourados em <b>+5</b>.</li>
        <li><b>Amuleto e cinto dourados</b> — ótimo custo-benefício de GS.</li>
        <li>Lesser Manastone/Soulstone em todo o equipamento e <b>Theostone verde</b> na arma e na guarda (+10 GS).</li>
        <li>Monolith de Altgard (Nv 30) e do Abyss (Nv 16) completos: +36 GS.</li>
      </ul>
      <div class="tip"><b>Por que não encantar alto cedo?</b> O custo e o risco de falha disparam nos
      encantes altos. Antes de ter a base completa, cada tentativa frustrada atrasa mais do que ajuda.
      Os +10 ficam para os dourados das dungeons 2★ (Meta 4).</div>`,
  },
  {
    id: "g-rotina", icon: "🔁", title: "Rotina diária/semanal eficiente",
    summary: "A ordem certa das tarefas, gestão de Odyle e como nunca perder um reset.",
    html: `
      <p>Resets: <b>diárias às 4h</b> e <b>semanais na quarta às 4h</b>. Use os contadores no topo
      para não deixar nada escapar — principalmente na terça à noite, véspera do reset semanal.</p>
      <p>A aba <b>Rotina</b> tem um card por personagem (Main + alts), cada um com a sua lista.</p>
      <p><b>Diárias (Main):</b></p>
      <ul>
        <li><b>Duty Quests</b> (5x) e as 2 <b>Nightmare Dungeons</b>.</li>
        <li><b>1M de Kinah</b> no mundo aberto (fora do Abyss), <b>presença diária</b> e <b>Emergency Supply Request</b>.</li>
        <li><b>7h de farm no Abyss</b> e <b>Shugo Festival</b> (2x).</li>
      </ul>
      <p><b>Semanais (Main):</b></p>
      <ul>
        <li>Energia: compra na <b>VIP / Subscriber Shop</b> + <b>crafting (Substance Morph — 20x)</b>, e gastar a
          <b>Dungeon Energy</b> antes de estourar o limite.</li>
        <li><b>Daily Dungeons</b> (14x), <b>Ascension Trial</b> (3x), <b>Battlefield/Arena</b> (3x)
          e <b>Sanctuary</b>.</li>
        <li>Lojas: <b>Abyss Shop</b>, <b>Nightmare Shop</b>, <b>Command Quests</b> e <b>Weekly Supply Requests</b>.</li>
      </ul>
      <p><b>Alts:</b> 1M de Kinah por dia no mundo aberto, Nightmare, farm no Abyss, energia (VIP Shop, crafting 4x e Odyle Energy da Breeze
      Association), Expedition Dungeons, Ascension Trial, Sanctuary e Abyss Shop.</p>
      <div class="tip"><b>Gestão de energia:</b> a Dungeon Energy acumula (+120/dia, até 840) — gaste antes de
      chegar no máximo para não desperdiçar. Comprar e craftar a energia semanal mantém o estoque girando.</div>`,
  },
  {
    id: "g-vakron", icon: "🌀", title: "Dungeons ★, Vakron & Gartua",
    summary: "Como farmar as dungeons 2★ e 3★ usando a Pity Reward a seu favor, e o ciclo de 12h do Gartua.",
    html: `
      <p>A partir dos 1.400 de GS as dungeons de estrela viram o seu motor de progressão. O truque é o
      mesmo nas 2★ e nas 3★: <b>a Pity Reward da Exploration completa o set da Conquest</b>.</p>
      <ul>
        <li><b>Vakron (Exploration) 3x:</b> pegue a recompensa nas 3 runs, mas <b>não</b> pegue a Pity Reward ainda.</li>
        <li><b>Vakron (Conquest):</b> rode até faltar <b>só 1 peça</b> — e então pegue essa última na
          Pity Reward da Exploration.</li>
        <li><b>Urugugu Canyon (Conquest):</b> até conseguir a sua arma e os acessórios.</li>
        <li><b>Com 2.100 GS (3★):</b> o mesmo esquema com a <b>Ferocious Horn Den</b> (Exploration 3x +
          Conquest até faltar 1 peça) e o <b>Fire Temple (Conquest)</b> para arma e acessórios.</li>
        <li><b>Gartua:</b> nasce de novo <b>12 horas depois de morto</b>. Acompanhe o contador "Gartua" no topo e entre
          assim que estiver disponível para não perder janelas.</li>
      </ul>
      <div class="tip"><b>Ciclo de 12h:</b> não tem horário fixo — o relógio começa quando o boss morre. Marque ☠️
        no card ao matar, ou use ✎ para digitar o tempo restante que aparece no mapa do jogo.</div>`,
  },
  {
    id: "g-recursos", icon: "💰", title: "Recursos e energia",
    summary: "De onde vem cada recurso, as recompensas das Duty Quests e o que fazer quando a energia acaba.",
    html: `
      <p><b>De onde vem cada recurso</b> (Rifts abrem às 2, 5, 8 e 11h — AM e PM):</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Recurso</th><th>Onde conseguir</th></tr></thead>
        <tbody>
          <tr><td>Enhance Stone</td><td>Daily Dungeon, Sealed Dungeons e Strongholds — principalmente no mapa inimigo (Rift)</td></tr>
          <tr><td>Energia DG</td><td>Transmutação semanal, VIP Shop e Command Quests (Duty/Order) de PvE e PvP</td></tr>
          <tr><td>Entradas de Nightmare / Ascension Trial</td><td>Command Quests (Duty/Order): PvE no mapa normal (Outlaw Village) e PvP no Abyss</td></tr>
          <tr><td>Kinah</td><td>Dungeons no Main e nos alts, ou VIP comprando de outro jogador com dinheiro</td></tr>
          <tr><td>Quna</td><td>VIP vendendo Kinah dourado no mercado</td></tr>
          <tr><td>Resurrection Stone</td><td>VIP Shop e Ascension Trial</td></tr>
          <tr><td>Manastone / Soulstone</td><td>Monstros do Abyss e do Ascension Trial</td></tr>
        </tbody>
      </table></div>
      <p><b>Recompensas das Duty Quests</b>, da mais comum para a mais rara:</p>
      <ol>
        <li>Chave do Shugo Festival</li>
        <li>Ticket de Daily Dungeon</li>
        <li>Odyle Energy (DG)</li>
        <li>Key: Hidden Cube</li>
        <li>Material de crafting dourado</li>
      </ol>
      <p><b>Sem energia? Como continuar progredindo</b></p>
      <ul>
        <li><b>Com alts:</b> suba um alt até o 45 e 700 ou 1.400 GS e gaste toda a energia de dungeon
          dele; mande materiais e Kinah para o Main pelo <b>Server Storage</b>. Bônus: alts podem ter mais sorte nos drops.</li>
        <li><b>Sem alts:</b> farme pets e Genus Insight; farme materiais, Kinah e Abyss Points (mapa normal e
          Abyss); e faça gathering e crafting.</li>
      </ul>
      <div class="tip"><b>Acumula por 1 semana:</b> os tickets diários (Nightmare, energia de dungeon e
      Shugo Festival) acumulam por até uma semana — dá para compensar um dia sem jogar.</div>`,
  },
];
