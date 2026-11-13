/* ============================================================
   Dados: guias (conteúdo da aba "Guias").
   Conteúdo da comunidade; ajuste conforme o patch atual do jogo.
   ============================================================ */
// Ícones e prints do guia de stats (assets/images/guides/stats/).
const GS_IMG = "assets/images/guides/stats";
const gsSlot = (slot) => `<img class="gs-ico" src="${GS_IMG}/slots/${slot}.webp" alt="" loading="lazy" />`;
const gsCur = (cur) => `<img class="gs-ico gs-ico-sm" src="${GS_IMG}/${cur}.webp" alt="" loading="lazy" />`;
const gsFig = (file, caption) => `
  <figure>
    <a href="${GS_IMG}/${file}" target="_blank" rel="noopener"><img src="${GS_IMG}/${file}" alt="${caption}" loading="lazy" /></a>
    <figcaption>${caption}</figcaption>
  </figure>`;

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
      <p><b>De onde vem cada recurso</b> (Rifts abrem de 3 em 3h, das 1h às 22h BRT: 1, 4, 7, 10, 13, 16, 19 e 22h):</p>
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
  {
    id: "g-stats", icon: "📊", title: "Melhores stats por slot (Soul Binding)",
    summary: "Que linhas de Soul Binding buscar em cada peça (DPS, tank e healer), Reset × Sync, Transfer, custos e Manastones.",
    html: `
      <p>Os melhores stats do Aion 2 são as linhas de <b>Soul Binding</b> que cada slot rola melhor, e cada slot rola da
      sua própria lista — por isso o ranking é peça por peça. Para dano: <b>Combat Speed</b> na Weapon, Guard, Gloves e
      Necklace; <b>Double Chance</b> no Helmet, Shoulders e Cape; <b>Damage Boost</b> no Chest. Consiga essas linhas com
      <b>Reset</b> e <b>Soul Sync</b>, ou traga com <b>Transfer</b> de outra peça que já as tenha, e guarde os
      <b>Binds</b> para o equipamento que você vai manter a partir de <b>2.100 de GS</b>.</p>

      <p id="g-stats-slots"><b>Melhores stats em cada slot</b> — as linhas de cada peça da melhor para a pior, com a
      faixa que cada uma rola em equipamento de <b>item level 86</b> (Enraged Kromede e Nuakum). Compare linhas só
      dentro da mesma peça: cada peça tem a sua própria faixa para cada stat.</p>

      <p id="g-stats-dps"><b>Melhores stats para DPS</b></p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Peça</th><th>Linhas, em ordem (faixa)</th></tr></thead>
        <tbody>
          <tr><td>${gsSlot("weapon")}Weapon</td><td>Combat Speed (10,63–12,29%)<br>Weapon Damage Boost (7,87–9,12%)<br>Damage Boost (5,95–6,91%)<br>Might (21–31)</td></tr>
          <tr><td>${gsSlot("guard")}Guard</td><td>Combat Speed (8,26–9,57%)<br>Weapon Damage Boost (6,3–7,32%)<br>Damage Boost (4,76–5,54%)<br>Might (16–25)</td></tr>
          <tr><td>${gsSlot("shoulders")}Shoulders</td><td>Double Chance (1,4–1,68%)<br>Critical Damage Boost (10,5–12,15%)<br>Attack (14–23)</td></tr>
          <tr><td>${gsSlot("chest")}Chest</td><td>Damage Boost (5,35–6,22%)<br>Perfect Chance (4,72–5,5%)<br>Attack (22–32)</td></tr>
          <tr><td>${gsSlot("gloves")}Gloves</td><td>Combat Speed (5,9–6,86%)<br>Perfect Chance (2,75–3,23%)<br>Attack (12–21)</td></tr>
          <tr><td>${gsSlot("helmet")}Helmet</td><td>Double Chance (1,75–2,08%)<br>Attack Increase (1,75–2,08%)<br>Attack (18–28)</td></tr>
          <tr><td>${gsSlot("legs")}Legs</td><td>Attack Increase (1,92–2,28%)<br>Perfect Chance (4,33–5,05%)<br>Attack (20–30)</td></tr>
          <tr><td>${gsSlot("cape")}Cape</td><td>Double Chance (1,4–1,68%)<br>Attack Increase (1,4–1,68%)<br>Attack (14–23)</td></tr>
          <tr><td>${gsSlot("necklace")}Necklace</td><td>Combat Speed (3,54–4,14%)<br>Might (10–19)<br>Precision (10–19)<br>Attack (25–36)</td></tr>
          <tr><td>${gsSlot("boots")}Boots</td><td>Move Speed (8,4–9,73%)<br>Attack (16–25)<br>Perfect Chance (3,54–4,14%)</td></tr>
          <tr><td>${gsSlot("earring")}Earring</td><td>Move Speed (5,25–6,11%)<br>Might (8–16)<br>Precision (8–16)<br>Attack (22–32)<br>Linha de skill principal (+1)</td></tr>
          <tr><td>${gsSlot("ring")}Ring</td><td>Might (6–14)<br>Precision (6–14)<br>Attack (18–28)<br>Linha de skill principal (+1)</td></tr>
          <tr><td>${gsSlot("bracelet")}Bracelet</td><td>Time [Siel] (9–17)<br>Wisdom [Lumiel] (9–17)<br>Destruction [Zikel] (9–17)<br>Death [Triniel] (9–17)</td></tr>
        </tbody>
      </table></div>
      <ul>
        <li><b>Double Chance</b> vem primeiro onde quer que role (Helmet, Shoulders, Cape). Um Double entra por cima de
          todos os outros bônus; o <b>Double Resist</b> do alvo reduz a chance.</li>
        <li><b>Might e Precision:</b> cada ponto de Might é 0,1% de Attack Increase (21 a 31 na Weapon = 2,1 a 3,1%);
          cada ponto de Precision é 0,1% de Accuracy e 0,1% de Critical Hit. Might é a 4ª linha da Weapon e da Guard; no
          Necklace, Earring e Ring os dois ficam no mesmo nível de Attack.</li>
        <li><b>Move Speed</b> lidera nas Boots e nos Earrings, para se locomover.</li>
        <li><b>Perfect Chance</b> rola no Chest, Legs, Gloves e Boots: um acerto Perfect usa o <b>Max Attack</b> da arma.</li>
        <li>A taxa de <b>Critical Hit</b> trava em <b>50%</b>, menos o <b>Critical Hit Resist</b> do alvo.</li>
        <li>O <b>Bracelet</b> rola 4 linhas entre os dez stats divinos, 10% cada e 0,1% por ponto: <b>Time</b> dá Combat
          Speed, <b>Wisdom</b> dá Double Chance, <b>Destruction</b> dá Attack Increase e <b>Death</b> dá Critical Hit.</li>
      </ul>
      <p>Também vale manter quando rolar:</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Peça</th><th>Mantenha se rolar</th></tr></thead>
        <tbody>
          <tr><td>Weapon, Guard</td><td>Multi-hit Chance, Precision, Critical Attack, Attack, Front/Back Attack, uma linha de skill principal</td></tr>
          <tr><td>${gsSlot("necklace")}Necklace</td><td>Uma linha de skill principal</td></tr>
          <tr><td>Armadura</td><td>Damage Tolerance, Endurance e Defense Increase, para sobreviver ou para PvP</td></tr>
          <tr><td>Todas menos o Bracelet</td><td>Accuracy e Critical Hit, enquanto você ainda precisar de mais</td></tr>
        </tbody>
      </table></div>
      <p><b>Troque primeiro:</b> HP, MP, Block, Flight Power e as linhas de resist — fazem pouco pelo dano.</p>
      <p><b>Reset ou Sync:</b> dê <b>Reset</b> numa peça sem nenhuma das suas linhas, já que ele rerrola as quatro (cerca de
      8 Resets para o Combat Speed de uma Weapon). Gaste Resets primeiro no equipamento craftado, depois nos acessórios:
      acessórios baratos são raros, ao contrário de armas e armaduras. Depois que uma linha-alvo entrar, dê <b>Sync</b> nas
      outras uma de cada vez (cerca de 25 Syncs para a mesma linha). Se duas peças rolarem linhas-alvo diferentes, fique com
      a da linha mais rara.</p>
      <p><b>Quando parar:</b> depois de uma ou duas linhas-alvo numa peça, a não ser que você tenha material para continuar
      no Sync. Cada linha a mais leva em média de 25 a 90 Syncs, e cada um custa uma <b>Sync Stone (Unique)</b> ou uma
      peça Unique sobrando.</p>

      <p id="g-stats-tank"><b>Melhores stats para tank</b></p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Peça</th><th>Linhas, em ordem (faixa)</th></tr></thead>
        <tbody>
          <tr><td>${gsSlot("legs")}Legs</td><td>Damage Tolerance (9,45–10,94%)<br>Endurance (2,88–3,38%)<br>Status Effect Resist — PvP (6,18–7,18%)</td></tr>
          <tr><td>${gsSlot("helmet")}Helmet</td><td>Endurance (2,62–3,08%)<br>Weapon Damage Tolerance — PvP (6,3–7,32%)<br>Status Effect Resist — PvP (5,62–6,53%)</td></tr>
          <tr><td>${gsSlot("cape")}Cape</td><td>Endurance (2,1–2,49%)<br>Critical Damage Tolerance — PvP (10,5–12,15%)<br>Status Effect Resist — PvP (4,5–5,25%)</td></tr>
          <tr><td>${gsSlot("chest")}Chest</td><td>Defense Increase (3,15–3,69%)<br>Weapon Damage Tolerance — PvP (7,87–9,12%)<br>Status Effect Resist — PvP (6,75–7,83%)</td></tr>
          <tr><td>${gsSlot("shoulders")}Shoulders</td><td>Defense Increase (2,1–2,49%)<br>Status Effect Resist — PvP (4,5–5,25%)</td></tr>
          <tr><td>${gsSlot("gloves")}Gloves</td><td>Defense Increase (1,83–2,17%)<br>Status Effect Resist — PvP (3,93–4,59%)</td></tr>
          <tr><td>${gsSlot("boots")}Boots</td><td>Move Speed (8,4–9,73%)<br>Defense Increase (2,36–2,78%)<br>Status Effect Resist — PvP (5,06–5,89%)</td></tr>
          <tr><td>${gsSlot("necklace")}Necklace</td><td>HP (236–278)</td></tr>
          <tr><td>${gsSlot("earring")}Earring</td><td>HP (202–239)</td></tr>
          <tr><td>${gsSlot("ring")}Ring</td><td>HP (168–200)</td></tr>
          <tr><td>${gsSlot("bracelet")}Bracelet</td><td>Justice [Nezekan] (9–17)<br>Life [Yustiel] (9–17)</td></tr>
        </tbody>
      </table></div>
      <p><b>Damage Tolerance</b>, <b>Endurance</b>, <b>Defense</b> e <b>HP</b> funcionam em todo golpe que você leva, então
      vêm primeiro. <b>Weapon Damage Tolerance</b> e <b>Critical Damage Tolerance</b> são linhas de PvP: cortam o Weapon
      Damage Boost e o Critical Damage Boost dos outros jogadores. <b>Status Effect Resist</b> faz você ignorar stuns e
      roots, então pegue em toda peça de armadura para PvP. <b>Endurance</b> corta o golpe pela metade quando ativa; o
      <b>Endurance Penetration</b> do atacante reduz a chance. Weapon e Guard pegam as linhas de DPS. <b>Justice</b> dá
      Defense e <b>Life</b> dá HP.</p>
      <p>Também pode manter num tank: <b>Incoming Heal</b> no Helmet (15,75 a 18,18%), Block, Evasion, Critical Hit Resist
      e HP, <b>Constitution</b> (0,1% de HP por ponto) e <b>Dexterity</b> (0,1% de Evasion, Block e Critical Hit Resist por
      ponto).</p>

      <p id="g-stats-healer"><b>Melhores stats para healer</b></p>
      <p>Não existe linha de cura para buscar: a sua cura cresce com o <b>Attack</b>. O <b>Healing Enhancement</b> do
      Cleric e o <b>Blessing of Life</b> do Chanter são passivas que convertem parte do seu Attack em <b>Heal Boost</b>,
      então linhas de Attack e Attack Increase aumentam a sua cura. O <b>Incoming Heal</b> do Helmet aumenta a cura que você
      recebe, inclusive a sua própria. Um Cleric ou Chanter usa a tabela de DPS para dano ou a de tank para aguentar
      golpes. <b>Combat Speed</b> acelera o cast, e no Bracelet o <b>Illusion [Kaisinel]</b> reduz os cooldowns. Curas não
      dão crítico, Double nem Multi-hit, mas mantenha essas linhas mesmo assim: elas ainda aumentam o seu dano.</p>
      <p>Também pode manter num healer: Incoming Heal no Helmet e, no Bracelet, <b>Wisdom [Lumiel]</b> (menos custo de MP,
      e Double Chance) ou <b>Life [Yustiel]</b> (HP e Regeneration).</p>

      <p id="g-stats-linhas"><b>Quantas linhas cada peça rola</b></p>
      <p>Uma peça <b>Unique</b> mostra 7 linhas: 3 stats fixos e <b>4 linhas de Soul Binding</b>, que são as que você
      rerrola. A Weapon Enraged Kromede tem só 3, e o equipamento craftado tem 5. Cada slot sorteia da sua própria lista de
      15 a 24 stats, a maioria enchimento: cada linha sorteada é uma linha-alvo específica só 1,2 a 4 vezes em 100; Attack
      é 4 a 6, e os stats divinos do Bracelet, 10.</p>
      <div class="cg-figs">${gsFig("soul-binding-guard-tooltip.webp",
        "Tooltip de uma Guard Unique: Attack, Accuracy e Critical Hit fixos, Soul Binding Rate 58,5%, as 4 linhas de Soul Binding (Damage Boost 4,5%, Critical Attack 59, Frost Lv. +1, Flame Scattershot Lv. +1) e o slot de Soul Fuse aberto")}</div>

      <p id="g-stats-stack"><b>Como os stats de dano se somam</b></p>
      <p>Stats no mesmo grupo (“bucket”) se <b>somam</b>, e os grupos se <b>multiplicam</b> — então uma linha vale mais num
      grupo em que você tem pouco. A fórmula de dano não está nos arquivos do jogo decodificados, então os grupos vêm de
      dois modelos feitos por jogadores, que concordam nos principais: bem testados, mas não garantidos. O próprio texto dos
      stats no jogo confirma quatro pontos: o Double causa dano extra com base no dano final; o Attack Increase aumenta o
      Attack por multiplicador; o acerto Perfect usa o Max Attack da arma; e Damage, Weapon Damage, Critical Damage, PvE e
      Boss Damage Boost são reduzidos pela Tolerance correspondente do alvo.</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Grupo</th><th>Stats nele</th></tr></thead>
        <tbody>
          <tr><td>Ataque da arma</td><td>Linhas e pedras de Attack, aumentadas pelo Weapon Damage Boost</td></tr>
          <tr><td>Attack Increase</td><td>Linhas de Attack Increase e Might, 0,1% por ponto</td></tr>
          <tr><td>Dano fixo</td><td>Front Attack, Back Attack, PvE Attack, Boss Attack e Critical Attack, quando a condição é cumprida</td></tr>
          <tr><td>Damage Boost</td><td>Damage Boost, PvE Damage Boost e Boss Damage Boost</td></tr>
          <tr><td>Um multiplicador cada</td><td>Critical Damage Boost, Front Attack Damage Boost e Back Attack Damage Boost</td></tr>
          <tr><td>Sobre o dano final</td><td>O golpe do Double Chance — cerca do dobro do dano, nos testes dos jogadores</td></tr>
          <tr><td>Rolagem máxima</td><td>Perfect Chance: o golpe usa o Max Attack da arma</td></tr>
          <tr><td>Golpes extras</td><td>Multi-hit Chance: até 4 golpes a mais, a partir do Attack</td></tr>
          <tr><td>Golpes por segundo</td><td>Combat Speed</td></tr>
        </tbody>
      </table></div>
      <p>Os dois modelos colocam <b>Combat Speed</b> perto do topo e <b>Weapon Damage Boost acima de Damage Boost</b>. Um
      crítico começa em 150% de dano, e o Critical Damage Boost soma a isso. O Damage Boost divide o grupo com o
      <b>PvE Damage Boost</b> do Genus e dos títulos, então rende menos quando esses já estão altos.</p>

      <p id="g-stats-pvp"><b>PvP</b></p>
      <p>As linhas de equipamento não têm versão PvP. Para PvP, pegue as linhas de status effect: <b>Status Effect
      Chance</b> na Weapon (21 a 24,22%) e na Guard (16,8 a 19,39%) faz os seus stuns e roots pegarem, e <b>Status Effect
      Resist</b>, em toda peça de armadura (até 6,75 a 7,83% no Chest), faz você ignorar os deles. Troque o enchimento pelas
      outras linhas de resist (<b>Perfect Resist</b>, <b>Double Resist</b>, <b>Multi-hit Resist</b>) e use pedras
      <b>Abyssal</b>, as únicas com stats de PvP.</p>

      <p id="g-stats-classe"><b>Melhores stats por classe</b></p>
      <p>Toda classe rola as mesmas linhas na mesma peça: uma Dagger e um Staff sorteiam da mesma lista, e a mesma Nuakum
      Breastplate serve para qualquer classe. Então as tabelas acima valem para as oito. O que muda:</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>O quê</th><th>Como muda</th></tr></thead>
        <tbody>
          <tr><td>Função</td><td>Use a tabela de DPS ou de tank conforme a função que você joga; healer usa qualquer uma.</td></tr>
          <tr><td>Back ou Front Attack</td><td>Linha de Weapon e Guard que só dá dano por trás ou só pela frente (abaixo).</td></tr>
          <tr><td>Linhas de skill</td><td>+1 nível numa skill da sua própria classe.</td></tr>
        </tbody>
      </table></div>
      <p>Qual lado pegar no PvE:</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Classe</th><th>Pegue</th><th>Por quê</th></tr></thead>
        <tbody>
          <tr><td>Assassin</td><td>Back Attack</td><td>A maioria dos golpes causa 30% a mais por trás, e o Rear Smite adiciona Back Attack Damage Boost.</td></tr>
          <tr><td>Gladiator, Templar</td><td>Front Attack</td><td>Experienced Counterstrike e Fury adicionam Front Attack Damage Boost, e o boss fica de frente para o tank.</td></tr>
          <tr><td>As outras</td><td>O lado que você consegue manter</td><td>Front enquanto farma, já que os monstros ficam de frente para você.</td></tr>
        </tbody>
      </table></div>
      <p id="g-stats-skill-lines">Uma <b>linha de skill</b> é uma linha de Soul Binding que sobe uma skill em um nível, como
      Frost e Flame Scattershot na Guard do exemplo acima. Cada classe tem <b>12 skills ativas e 10 passivas</b> no sorteio,
      com chances parecidas: as mesmas 22 que as cartas de Arcana carregam.</p>
      <p>O que um nível a mais dá:</p>
      <ul>
        <li>Uma skill de dano bate cerca de <b>1 a 2% mais forte</b> — só aquela skill.</li>
        <li>Uma passiva ganha mais um degrau, como +0,3% de Double Chance ou +10 de Critical Hit.</li>
        <li>O <b>nível 16</b> abre a próxima <b>Specialty</b> da skill, então a linha que leva uma skill até lá é a que mais vale.</li>
      </ul>
      <p>Então mantenha a linha de skill de uma skill que faz boa parte do seu dano, e troque a de uma que você quase não usa.</p>

      <p id="g-stats-custos"><b>Quanto custa o Soul Binding</b></p>
      <p>O Soul Binding é uma aba dentro de <b>Enhancement</b>:</p>
      <div class="cg-figs">${gsFig("soul-binding-window.webp",
        "Aba Soul Binding em Enhancement: Aulamus Greatsword +12 com Soul Binding Rate 100%, cada linha no máximo (Combat Speed 11,25%, Block 54, Ruinous Blow e Keen Strike Lv. +1) e Soul Fuse por 1.000.000 de Kinah")}</div>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Ação</th><th>O que faz</th><th>O que custa</th></tr></thead>
        <tbody>
          <tr><td>Bind</td><td>Aumenta o valor de todas as linhas, até o máximo em 100%, onde abre o slot de Soul Fuse</td><td>Kinah e Soul Codex, mais a cada vez</td></tr>
          <tr><td>Soul Sync</td><td>Rerrola uma linha que você escolhe</td><td>Uma Sync Stone ou uma peça Unique</td></tr>
          <tr><td>Reset</td><td>Rerrola todas as linhas</td><td>Kinah e Soul Codex: Reset</td></tr>
          <tr><td>Soul Fuse</td><td>Adiciona mais uma linha, que não pode ser transferida</td><td>2 Philosopher's Stones (Revelation ou Power, conforme o item) e 1.000.000 de Kinah</td></tr>
        </tbody>
      </table></div>
      <p>Na ordem:</p>
      <ol>
        <li>Dê <b>Reset</b> numa peça que não tem nenhuma das linhas que você quer.</li>
        <li>Quando ela tiver uma linha-alvo, dê <b>Sync</b> nas outras: selecione a linha a trocar e depois coloque o material.</li>
        <li>Pare depois de uma ou duas linhas-alvo, a não ser que tenha material sobrando.</li>
        <li>Dê <b>Bind</b> até 100%, o que abre o slot de Soul Fuse.</li>
        <li>Faça o <b>Soul Fuse</b> numa peça que você vai manter. Philosopher's Stones vêm de dungeons difíceis e da loja da season.</li>
      </ol>
      <p>Dez Binds, por grau da peça:</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Grau</th><th>${gsCur("kinah")}Kinah</th><th>${gsCur("soul-codex")}Soul Codex</th></tr></thead>
        <tbody>
          <tr><td>Rare</td><td>130.500</td><td>25</td></tr>
          <tr><td>Epic</td><td>733.000</td><td>77</td></tr>
          <tr><td>Unique</td><td>2.130.000</td><td>408</td></tr>
        </tbody>
      </table></div>
      <p>Um Reset, por grau da peça:</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Grau</th><th>${gsCur("kinah")}Kinah</th><th>${gsCur("soul-codex-reset")}Soul Codex: Reset</th></tr></thead>
        <tbody>
          <tr><td>Rare</td><td>45.000</td><td>1</td></tr>
          <tr><td>Epic</td><td>150.000</td><td>2</td></tr>
          <tr><td>Unique</td><td>300.000</td><td>3</td></tr>
        </tbody>
      </table></div>
      <p>Cada Bind numa peça Unique:</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Bind</th><th>${gsCur("kinah")}Kinah</th><th>${gsCur("soul-codex")}Soul Codex</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>30.000</td><td>10</td></tr>
          <tr><td>2</td><td>42.000</td><td>12</td></tr>
          <tr><td>3</td><td>59.000</td><td>16</td></tr>
          <tr><td>4</td><td>83.000</td><td>21</td></tr>
          <tr><td>5</td><td>117.000</td><td>27</td></tr>
          <tr><td>6</td><td>164.000</td><td>36</td></tr>
          <tr><td>7</td><td>230.000</td><td>46</td></tr>
          <tr><td>8</td><td>322.000</td><td>60</td></tr>
          <tr><td>9</td><td>451.000</td><td>78</td></tr>
          <tr><td>10</td><td>632.000</td><td>102</td></tr>
        </tbody>
      </table></div>
      <p>Os três últimos Binds custam <b>1.405.000 Kinah e 240 Soul Codex</b>, dois terços do total. Só dê Bind quando as
      linhas forem as que você quer: uma linha que entra por Sync vem com um valor novo.</p>

      <p id="g-stats-reset-sync"><b>Reset ou Sync</b></p>
      <p>Um Sync em equipamento Unique precisa de material Unique: uma <b>Sync Stone (Unique)</b> ou outra peça Unique de
      <b>qualquer slot</b>. Com ele a chance é de <b>100%</b>, mesmo vindo de item level menor (uma peça de item level 70
      numa de item level 86); qualquer coisa abaixo de Unique não tem como dar certo. Desde 11 de novembro, a Transcendence
      Season Mission <b>Way of the Transcended</b> dá até <b>3 Sync Stones (Unique) por semana</b>, bound (patch notes da
      NC).</p>
      <div class="cg-figs">${gsFig("soul-sync-any-slot.webp",
        "Soul Sync numa Vakron Guard +7 com Vakron Boots +5 como material: 100% de Success Chance, e o valor de cada linha contra o máximo (Damage Boost 4,46% de 5,07%, Critical Attack 59 de 73)")}${gsFig("soul-sync-lower-item-level.webp",
        "Soul Sync numa Enraged Kromede Necklace +5 (item level 86) com Aulamus Earrings +10 (item level 70) como material: continua 100% de Success Chance")}</div>
      <p>Um Reset rerrola todas as linhas de Soul Binding de uma vez (4 no Unique, 5 no craftado), então acerta uma linha
      específica em cerca de <b>um terço das tentativas</b> que um Sync precisa. Mas ele também zera o Binding e todas as
      linhas que você tinha; o Sync mantém as outras.</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Linha a conseguir</th><th>Chance de rolar</th><th>Resets</th><th>Syncs</th></tr></thead>
        <tbody>
          <tr><td>Weapon ou Guard: Combat Speed</td><td>3,2%</td><td>8</td><td>25</td></tr>
          <tr><td>Weapon ou Guard: Weapon Damage Boost</td><td>3,2%</td><td>8</td><td>25</td></tr>
          <tr><td>Weapon ou Guard: Damage Boost</td><td>1,6%</td><td>15</td><td>50</td></tr>
          <tr><td>Shoulders: Critical Damage Boost</td><td>2,4%</td><td>10</td><td>36</td></tr>
          <tr><td>Chest: Damage Boost</td><td>2,4%</td><td>10</td><td>36</td></tr>
          <tr><td>Helmet, Shoulders ou Cape: Double Chance</td><td>0,96%</td><td>25</td><td>90</td></tr>
        </tbody>
      </table></div>
      <p>A chance de rolar é a que a própria janela de Soul Binding mostra: linhas de skill ficam com 20% de cada rolagem, e
      as linhas de stat dividem o resto. As tentativas são médias numa peça de item level 86 que ainda não tem a linha. Cada
      Reset em Unique custa 300.000 Kinah e 3 Soul Codex: Reset, e cada Sync uma Sync Stone (Unique) ou peça Unique: o Combat
      Speed numa Weapon sai por cerca de <b>2,4 milhões de Kinah via Reset</b> ou <b>25 peças via Sync</b>.</p>

      <p id="g-stats-transfer"><b>Transfer</b> move as linhas de Soul Binding e o nível de encantamento de uma peça para
      outra do <b>mesmo slot ou tipo de arma</b>, substituindo as linhas dela, e consome a peça antiga. Custa uma
      <b>Transfer Stone (Unique)</b> e nada de Kinah — ou duas para algumas peças de topo (Enraged Kromede Earrings e o
      equipamento Wise e Ebony Dragon Lord). O Binding vai junto com as linhas; a linha de Soul Fuse e as pedras nos
      sockets <b>nunca</b> vão. Então uma linha conseguida cedo não se perde: dê Sync com drops Unique sobrando, leve o
      resultado para a próxima peça e guarde o Soul Fuse para a peça que você vai manter. O jeito barato de usar: encante
      equipamento de item level 36 e depois faça o Transfer.</p>

      <p id="g-stats-quando"><b>Quando fazer Soul Binding</b> (pelas faixas de Gear Score):</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Gear Score</th><th>Seu equipamento</th><th>O que fazer</th></tr></thead>
        <tbody>
          <tr><td>700 a 1.400</td><td>Weapon e Guard Spiritforged, equipamento de quest e Epic</td><td>Nada. Todo Kinah vai para encantamento.</td></tr>
          <tr><td>1.400 a 2.100</td><td>Armadura e Guard Vakron, acessórios Urugugu</td><td>Sync só com drops Unique sobrando, e guarde qualquer peça que cair com uma linha-alvo: o Transfer leva as linhas adiante. Nada de Bind ou Soul Fuse ainda. Para um +15 barato, veja o truque do item level 36.</td></tr>
          <tr><td>A partir de 2.100</td><td>Enraged Kromede, Nuakum e melhores, inclusive craftado</td><td>Sync até as linhas-alvo, depois Bind, depois Soul Fuse.</td></tr>
        </tbody>
      </table></div>

      <p id="g-stats-pedras"><b>Manastones e Soulstones</b></p>
      <p><b>Manastones</b> (Weapon, Guard e armadura) e <b>Soulstones</b> (acessórios) rolam as mesmas linhas. Uma gravação
      (engraving) rola todos os sockets de uma vez, uma linha cada, e substitui as linhas que estavam lá. No equipamento que
      você vai manter, fique com qualquer pedra que role uma linha de dano: <b>Weapon Damage Boost</b>, <b>Damage Boost</b>,
      <b>Critical Damage Boost</b>, ou <b>Front/Back Attack Damage Boost</b> do seu lado. Duas numa peça é o ideal; uma já é
      bom o suficiente. Só pedras <b>Superior</b> rolam essas. Attack, Critical Hit e Accuracy também valem manter. No
      equipamento que você vai trocar, use <b>Lesser</b> baratas: qualquer linha conta para o Gear Score, e o Transfer não
      move pedras.</p>
      <p>A cor da linha define o Gear Score dela, de cinza +1 até amarelo +4.</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Pedra</th><th>Stats</th><th>Cinza</th><th>Verde</th><th>Azul</th><th>Amarelo</th></tr></thead>
        <tbody>
          <tr><td>Lesser</td><td>9</td><td>70%</td><td>30%</td><td>—</td><td>—</td></tr>
          <tr><td>Intermediate</td><td>9</td><td>50%</td><td>35%</td><td>15%</td><td>—</td></tr>
          <tr><td>Superior</td><td>14</td><td>—</td><td>50%</td><td>35%</td><td>15%</td></tr>
          <tr><td>Lesser Abyssal</td><td>16</td><td>50%</td><td>35%</td><td>15%</td><td>—</td></tr>
          <tr><td>Intermediate Abyssal</td><td>16</td><td>50%</td><td>35%</td><td>15%</td><td>—</td></tr>
          <tr><td>Superior Abyssal</td><td>22</td><td>—</td><td>50%</td><td>35%</td><td>15%</td></tr>
        </tbody>
      </table></div>
      <p>O que uma pedra Superior pode rolar em cada socket, e quanto cada linha dá por cor:</p>
      <div class="cg-table-wrap"><table class="cg-table">
        <thead><tr><th>Linha</th><th>Chance</th><th>Verde</th><th>Azul</th><th>Amarelo</th></tr></thead>
        <tbody>
          <tr><td>Weapon Damage Boost</td><td>0,5%</td><td>10</td><td>30</td><td>100</td></tr>
          <tr><td>Damage Boost</td><td>0,5%</td><td>10</td><td>30</td><td>100</td></tr>
          <tr><td>Critical Damage Boost</td><td>0,5%</td><td>10</td><td>30</td><td>100</td></tr>
          <tr><td>Front Attack Damage Boost</td><td>0,5%</td><td>10</td><td>30</td><td>100</td></tr>
          <tr><td>Back Attack Damage Boost</td><td>0,5%</td><td>10</td><td>30</td><td>100</td></tr>
          <tr><td>Attack</td><td>10%</td><td>3</td><td>5</td><td>10</td></tr>
          <tr><td>Critical Hit</td><td>10%</td><td>7</td><td>10</td><td>15</td></tr>
          <tr><td>Accuracy</td><td>10%</td><td>7</td><td>10</td><td>15</td></tr>
          <tr><td>HP</td><td>13,75%</td><td>50</td><td>100</td><td>160</td></tr>
          <tr><td>Defense</td><td>10%</td><td>30</td><td>50</td><td>100</td></tr>
          <tr><td>Evasion</td><td>10%</td><td>7</td><td>10</td><td>15</td></tr>
          <tr><td>Critical Hit Resist</td><td>10%</td><td>7</td><td>10</td><td>15</td></tr>
          <tr><td>Block</td><td>10%</td><td>10</td><td>15</td><td>20</td></tr>
          <tr><td>MP</td><td>13,75%</td><td>30</td><td>50</td><td>80</td></tr>
        </tbody>
      </table></div>
      <p>As chances são por socket: numa peça de 4 sockets, uma linha de dano específica aparece em cerca de 2% das
      gravações e qualquer uma das cinco em cerca de 10%; uma específica em amarelo, em cerca de 0,3%. A linha de dano
      aparece na pedra como número: <b>100 equivale a 1%</b> nos stats do personagem, o mesmo stat do percentual da linha
      de equipamento. Pedras Lesser e Intermediate só rolam as nove linhas de Attack para baixo, com valores menores. Pedras
      Abyssal também rolam PvP Attack, Defense, Accuracy, Evasion, Critical Hit, Critical Hit Resist e Block (cerca de 5%
      cada), e as Superior Abyssal, PvP Damage Boost (1%).</p>

      <p id="g-stats-faq"><b>Perguntas frequentes</b></p>
      <ul>
        <li><b>Quais os melhores stats do Aion 2?</b> No equipamento, a linha que cada peça rola melhor: Combat Speed e
          Weapon Damage Boost na Weapon e na Guard, Double Chance no Helmet, Shoulders e Cape, Damage Boost no Chest,
          Combat Speed nas Gloves e no Necklace. Veja as tabelas no início.</li>
        <li><b>Quantas linhas de Soul Binding tem o equipamento Unique?</b> Quatro, abaixo dos 3 stats fixos — mas a
          Weapon Enraged Kromede tem três; o craftado tem cinco.</li>
        <li><b>Might é bom na Weapon?</b> Sim, como 4ª linha. Os 21 a 31 dão 2,1 a 3,1% de Attack Increase, abaixo de
          Combat Speed, Weapon Damage Boost e Damage Boost da arma.</li>
        <li><b>O material do Sync precisa ser do mesmo slot?</b> Não. Qualquer peça Unique ou uma Sync Stone (Unique)
          funciona, a 100%.</li>
        <li><b>Vale fazer Soul Binding em equipamento Vakron ou Urugugu?</b> Não com material comprado. Dê Sync com drops
          Unique sobrando e guarde peças que caírem com uma linha-alvo: o Transfer leva as linhas para a próxima peça.
          Deixe Bind e Soul Fuse para Enraged Kromede, Nuakum ou craftado.</li>
        <li><b>As linhas de Soul Binding passam para equipamento novo?</b> Sim. O Transfer move as linhas e o nível de
          encantamento para uma peça do mesmo slot por uma Transfer Stone (Unique), duas para algumas peças de topo. O
          Binding vai junto; a linha de Soul Fuse e as pedras nos sockets não.</li>
        <li><b>O que dá 100% de Soul Binding Rate?</b> Todas as linhas no máximo e o slot de Soul Fuse, que usa
          Philosopher's Stones de dungeons difíceis ou da loja da season.</li>
        <li><b>Qual o cap de Critical Hit?</b> 50%, menos o Critical Hit Resist do alvo.</li>
      </ul>

      <div class="tip"><b>Fonte:</b> tradução do guia
      <a href="https://raidrelay.com/aion-2-best-stats-guide" target="_blank" rel="noopener">Aion 2 Best Stats (Raid Relay)</a>,
      atualizado em 11/11/2026, com dados lidos do cliente Global (launcher versão 26) em 20/10/2026. A fórmula de dano vem
      dos modelos do gameplay.tips (testado na versão coreana) e do EliteGrindLab; as Sync Stones semanais vêm das patch
      notes da NC de 11/11/2026. A ordem das linhas, a regra de parada e as recomendações de Reset/Sync são avaliação do
      autor com base nesses dados.</div>`,
  },
];
