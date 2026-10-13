/* ============================================================
   Dados: banco de skills por classe (sub-aba "Skills" de cada classe).
   Cada classe tem o seu arquivo em data/skill-db/<id-da-classe>.js,
   que preenche SKILL_DB.<id-da-classe> com a lista de skills.
   Os arquivos são gerados por tools/import-metabot.py (dados do MetaBot.GG).

   Formato de uma skill (só id, name e type são obrigatórios):
   {
     id: "judgment",          // slug único na classe (também nome do ícone)
     name: "Judgment",        // nome oficial em inglês
     type: "active",          // "active" | "passive" | "stigma"
     level: 16,               // nível em que aprende
     cost: "120 MP",          // custo de uso (texto livre)
     cooldown: "20s",         // recarga
     range: "4m",             // alcance
     desc: "Efeito no nível 1.",
     specs: [                 // especializações, na ordem do jogo (1, 2, 3...)
       { level: 8, text: "Critical Hit on hit" },   // level = nível mínimo da skill
     ],
     source: "https://...",   // página de origem do dado — exibida como crédito (obrigatório
                              // pela licença do MetaBot.GG para dados vindos de lá)
     icon: "judgment.webp",   // arquivo em assets/images/skills/<id-da-classe>/
   }
   Campos ausentes aparecem como "—"; sem `icon`, o card mostra as iniciais.
   ============================================================ */
const SKILL_DB = {};

// Página da classe no MetaBot.GG, creditada no rodapé da sub-aba Skills.
const SKILL_DB_SOURCE = (classId) => `https://metabot.gg/en/aion-2/classes/${classId}`;
