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
  {
    id: "g-craft", icon: "🔨", title: "Crafting & Essence Extraction",
    summary: "Profissões, como subir proficiência, Combo/Splendent, a linha Orichalcum → Dragon Lord e o Substance Morph.",
    html: `
      <p>Menu de crafting: <b>Alt + G</b>. Para craftar, use uma <b>Crafting Table</b> — Elyos: Dawn Legion Base e
      Zumion Village (Verteron); Asmodians: Safe Haven e Nornir Assembly (Altgard). Antes de craftar, confira a
      proficiência exigida, os materiais e a <b>Crafting Chance</b> da receita.</p>

      <p id="g-craft-profissoes"><b>As 5 profissões</b> (todas no mesmo personagem, mas cada uma sobe separada):</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Profissão</th><th>O que faz</th><th>Classes (arma)</th></tr></thead>
        <tbody>
          <tr><td>Blacksmithing</td><td>Greatsword, Longsword, Dagger, Mace e Guard</td><td>Gladiator, Templar, Assassin, Cleric</td></tr>
          <tr><td>Armorsmithing</td><td>Todas as peças de armadura e Cloak</td><td>—</td></tr>
          <tr><td>Handicrafting</td><td>Bow, Staff e acessórios (Necklace, Earring, Ring, Bracelet)</td><td>Ranger, Chanter</td></tr>
          <tr><td>Alchemy</td><td>Spellbook, Orb, poções, serums, scrolls, Manastones e Soulstones</td><td>Sorcerer, Spiritmaster</td></tr>
          <tr><td>Cooking</td><td>Comidas e temperos (buffs temporários de combate)</td><td>—</td></tr>
        </tbody>
      </table></div>
      <p>Prioridade: <b>a profissão da sua arma primeiro</b>, depois <b>Handicrafting</b> para acessórios.
      Alchemy e Cooking ficam para consumíveis. Belt, runas, amuleto e Arcana <b>não</b> têm receita.</p>

      <p id="g-craft-proficiencia"><b>Subindo a proficiência</b> (1 a 100 por profissão):</p>
      <ul>
        <li><b>Novice 1–50:</b> craftar dá EXP de proficiência. No <b>Novice 50</b> a barra trava até você fazer a
          quest de promoção — no Blacksmithing, craftar um <b>Novice Blacksmith's Hammer</b> (6 Orichalcum Ingot + 3 Odyle).</li>
        <li><b>Professional 51–100:</b> libera as receitas avançadas (Dragon Lord) e melhora as chances.</li>
        <li>Foque <b>uma profissão</b> e suba com receitas Common baratas (ex.: <b>Orichalcum Ingot</b>). Solvents,
          abrasives e pós vêm do mercador da profissão.</li>
        <li><b>Crafte um por vez:</b> 10 crafts individuais dão mais EXP que 1 craft de 10x. Craft em lote só
          quando tempo importa mais que EXP.</li>
      </ul>

      <p id="g-craft-combo"><b>Chance, Combo e Splendent</b></p>
      <ul>
        <li>Cada tentativa é uma corrida entre a barra <b>azul (Success)</b> e a <b>laranja (Failure)</b>. Se a
          laranja enche primeiro, falhou — e os materiais se vão.</li>
        <li>A chance depende da receita e da <b>diferença entre a sua proficiência e a exigida</b>. Veja em
          Crafting Chance → <b>Expected Probability</b> o valor <b>Basic</b>, e em <b>Change</b> o do Combo.</li>
        <li><b>Combo:</b> após um craft bem-sucedido de equipamento, há ~<b>25%</b> de chance de ativar. Se
          ativar (e passar na própria rolagem), sai a versão <b>Splendent</b> — um grau acima.</li>
        <li>Não existe receita de Splendent: ela só sai via Combo (ou Transfer Crafting). E as receitas seguintes
          <b>exigem a Splendent</b> da etapa anterior — <b>nunca venda nem desmanche</b> uma peça Splendent.</li>
      </ul>

      <p id="g-craft-linha"><b>A linha de equipamento craftado</b> (exemplo: arma):</p>
      <ol>
        <li>Orichalcum (Common) → <b>Splendent</b> Orichalcum (Rare)</li>
        <li>Expert's Orichalcum (Rare) → Expert's <b>Splendent</b> (Epic)</li>
        <li>Artisan's Orichalcum (Epic) → Artisan's <b>Splendent</b> (Unique)</li>
        <li><b>True / Star Dragon Lord</b> (Unique, iLvl 62) — craft normal (pode falhar), exige a Artisan's Splendent.</li>
        <li>Splendent True/Star (iLvl 70) → <b>White / Dark</b> (78) → <b>Wise / Ebony</b> (94) → Splendent Wise/Ebony (102)
          — via <b>Transfer Crafting</b>, que <b>não falha</b>. As etapas altas pedem materiais Wrathful
          (Mind, Will e Ego) de conteúdo PvE em grupo.</li>
      </ol>
      <p><b>Transfer Crafting</b> usa a peça atual como material e <b>mantém encantamento, amplificação e Soul
      Binding</b>. Peças craftadas podem ter <b>5 linhas de Soul Binding</b> (contra 4 de muitas peças de dungeon) —
      por isso a arma craftada vale o investimento.</p>

      <p id="g-craft-extraction"><b>Essence Extraction (gathering)</b> — mesma mecânica de barras do crafting;
      a maioria dos nós aguenta várias tentativas. Materiais: <b>Ore</b> (metal), <b>Gem</b> (acessórios),
      <b>Log</b> (armas de madeira), <b>Herb</b> (Alchemy), <b>Cooking Ingredient</b> e <b>Odyle</b>.</p>
      <ul>
        <li><b>Common Skills</b> (valem para tudo, Nv máx. 10, 40 pontos cada): maxe primeiro
          <b>Proficient Handling</b> (+50 Success) e <b>Delicate Touch</b> (−80 Failure); o resto em
          <b>Lady Luck</b> (40% de chance de bônus no Success).</li>
        <li><b>Specialty Skills</b> (por categoria, 7 pontos cada): <b>Seeker</b> (mostra o recurso no minimapa),
          <b>Plentiful Harvest</b> (até 30% de material dobrado) e <b>Appraiser</b> (até 30% de reroll de qualidade).
          Invista só nas categorias que você usa.</li>
        <li>Resetar os pontos custa <b>50.000 Kinah</b>.</li>
      </ul>

      <p id="g-craft-energia"><b>Substance Morph</b> — sistema de conversão à parte (não é profissão), nos Morph
      Merchants das cidades de crafting:</p>
      <ul>
        <li><b>Energia DG:</b> cada craft custa <b>25 Odyle + 5 Fine Odyle + 1 Pure Odyle + 50.000 Kinah</b>.
          É a tarefa semanal de energia da aba Rotina (20x no Main, 4x nos alts).</li>
        <li><b>Odyle → materiais</b> (Ore, Gem, Log) bound do mesmo grau, Power Shards de tier baixo → tier alto,
          Noble Belt, e as asas <b>Sealing</b> / <b>Glorious Wings</b> (70 Sealed Wing Featherdown + 10 Pure Odyle).</li>
      </ul>

      <div class="tip"><b>Economize Kinah:</b> antes de craftar, compare o custo dos materiais com o preço do item
      pronto no Market — às vezes comprar o intermediário (ingots, ou até a peça Splendent) sai mais barato que
      rolar um Combo de 25%. E suba a proficiência antes das tentativas caras: poucos % fazem diferença quando
      os materiais custam milhões.</div>`,
  },
];
