#!/usr/bin/env python3
"""
Importa o banco de skills de AION 2 do MetaBot.GG para assets/js/data/skill-db/<classe>.js.

Licença dos dados (https://metabot.gg/en/legal/terms-of-service, seção "Data Usage & Attribution"):
reuso permitido desde que cada dado credite o MetaBot.GG com um link "dofollow" (sem
rel="nofollow"/"sponsored"/"ugc") para a página de onde veio, sem apresentar os dados como
nossos, e acessando "a reasonable request rate". Por isso:
  - cada skill guarda `source` (página da skill no metabot) e a UI mostra esse link;
  - as requisições são sequenciais, com DELAY segundos entre elas.
Ícones: só com --icons. São assets da NCSOFT (a licença do MetaBot.GG cobre os dados, não os
ícones) — uso pessoal/não comercial; ver README. Vão para assets/images/skills/<classe>/<id>.webp,
reduzidos para ICON_SIZE px se o Pillow estiver instalado (senão, o original de 256 px).
Ícones já baixados são reaproveitados (e mantidos no .js) mesmo sem --icons.

Uso (na raiz do projeto):  python3 tools/import-metabot.py [--icons] [classe ...]
Sem classes, importa as 8.
"""
import html
import io
import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://metabot.gg"
CLASSES = ["templar", "gladiator", "assassin", "ranger", "sorcerer", "spiritmaster", "cleric", "chanter"]
CLASS_NAMES = {c: c.capitalize() for c in CLASSES}
DELAY = 2.0  # segundos entre requisições (o limite deles é ~60/min)
USER_AGENT = "rpgtracker-skill-importer/1.0 (fan project, nao comercial; credita MetaBot.GG)"
ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "assets" / "js" / "data" / "skill-db"
ICON_DIR = ROOT / "assets" / "images" / "skills"
ICON_SIZE = 72  # 2x os 36 px exibidos na lista (telas retina)

# Título da tabela na página da classe → tipo no SKILL_DB.
TABLE_TYPES = {"active skills": "active", "passive skills": "passive", "stigma skills": "stigma"}

_last_request = 0.0


def fetch_bytes(path):
    """Baixa um recurso do metabot respeitando o intervalo mínimo entre requisições."""
    global _last_request
    wait = DELAY - (time.monotonic() - _last_request)
    if wait > 0:
        time.sleep(wait)
    req = urllib.request.Request(BASE + path, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=30) as resp:
        body = resp.read()
    _last_request = time.monotonic()
    return body


def fetch(path):
    """Baixa uma página do metabot como texto."""
    return fetch_bytes(path).decode("utf-8")


def save_icon(data, dest):
    """Salva o ícone em webp, reduzido para ICON_SIZE px quando o Pillow está disponível."""
    try:
        from PIL import Image
        img = Image.open(io.BytesIO(data)).convert("RGBA")
        img = img.resize((ICON_SIZE, ICON_SIZE), Image.LANCZOS)
        img.save(dest, "WEBP", quality=85, method=6)
    except ImportError:
        dest.write_bytes(data)


def text(fragment):
    """Remove tags, decodifica entidades e normaliza espaços."""
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def dash_to_none(value):
    """'—' (sem valor) vira None."""
    return None if value in ("", "—", "-") else value


def parse_class_page(page):
    """Extrai as skills das tabelas ativas/passivas/stigmas da página da classe."""
    skills = []
    for match in re.finditer(r"<table", page):
        headings = re.findall(r"<h[23][^>]*>(.*?)</h[23]>", page[max(0, match.start() - 3000):match.start()], re.S)
        title = text(headings[-1]).lower() if headings else ""
        skill_type = next((t for key, t in TABLE_TYPES.items() if title.endswith(key)), None)
        if not skill_type:
            continue
        table = page[match.start():page.find("</table>", match.start())]
        for th, tds in re.findall(r'<tr><th scope="row">(.*?)</th>(.*?)</tr>', table, re.S):
            href = re.search(r'href="(/en/aion-2/skills/[^"]+)"', th)
            icon = re.search(r'src="/api/image\?src=([^"&]+)', th)
            name = re.search(r'nameText">(.*?)</span>', th, re.S)
            cells = [text(td) for td in re.findall(r"<td[^>]*>(.*?)</td>", tds, re.S)]
            if not (href and name and cells):
                continue
            level = re.search(r"\d+", cells[0])
            skill = {
                "id": href.group(1).rsplit("/", 1)[1],
                "name": text(name.group(1)),
                "type": skill_type,
                "level": int(level.group()) if level else None,
            }
            if len(cells) >= 5:  # ativas/stigmas: Unlocks, Cooldown, Range, MP, Effect
                mp = dash_to_none(cells[3])
                skill.update({
                    "cost": f"{mp} MP" if mp else None,
                    "cooldown": dash_to_none(cells[1]),
                    "range": dash_to_none(cells[2].replace(" m", "m")),
                    "desc": cells[4],
                })
            else:  # passivas: Unlocks, Effect
                skill["desc"] = cells[1]
            skill["source"] = BASE + href.group(1)
            # URL original do ícone (o <img> da tabela passa pelo redimensionador deles)
            icon_url = urllib.parse.unquote(icon.group(1)) if icon else ""
            if icon_url.startswith(BASE + "/web/"):
                skill["_icon_path"] = icon_url[len(BASE):]
            skills.append(skill)
    return skills


def parse_skill_page(page):
    """Extrai da página da skill o efeito completo (nível 1) e as especializações."""
    return full_effect(page), parse_specs(page)


def parse_specs(page):
    """Especializações da seção data-section="specializations": [{level, text}], na ordem do jogo."""
    start = page.find('data-section="specializations"')
    if start < 0:
        return []
    section = page[start:page.find("</ul>", start)]
    specs = []
    for head, body in re.findall(r'specHead">(.*?)</div>\s*<p[^>]*specText">(.*?)</p>', section, re.S):
        level = re.search(r"requires skill level (\d+)", text(head))
        specs.append({"level": int(level.group(1)) if level else None, "text": text(body)})
    return specs


def full_effect(page):
    """Efeito completo (nível 1) a partir do JSON-LD de FAQ da página da skill."""
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S):
        try:
            data = json.loads(block)
        except json.JSONDecodeError:
            continue
        for q in data.get("mainEntity", []) if isinstance(data, dict) else []:
            answer = q.get("acceptedAnswer", {}).get("text", "")
            if answer.startswith("At level 1:"):
                return answer[len("At level 1:"):].strip()
    return None


def js_value(value):
    return json.dumps(value, ensure_ascii=False)


def write_class(class_id, skills):
    """Grava data/skill-db/<classe>.js no formato documentado em data/skill-db/index.js."""
    fields = ["id", "name", "type", "level", "cost", "cooldown", "range", "desc", "source", "icon"]
    lines = []
    for s in skills:
        parts = [f"{f}: {js_value(s[f])}" for f in fields if s.get(f) is not None]
        if not s.get("specs"):
            lines.append("  { " + ", ".join(parts) + " },")
            continue
        lines.append("  { " + ", ".join(parts) + ",")
        lines.append("    specs: [")
        for spec in s["specs"]:
            level = f"level: {spec['level']}, " if spec["level"] is not None else ""
            lines.append(f"      {{ {level}text: {js_value(spec['text'])} }},")
        lines.append("    ] },")
    body = f"""/* ============================================================
   Dados: banco de skills — {CLASS_NAMES[class_id]}.
   Formato e campos: ver data/skill-db/index.js.
   Fonte: MetaBot.GG — {BASE}/en/aion-2/classes/{class_id}
   (licença: reuso com link para a página de origem; cada skill guarda o seu `source`).
   Gerado por tools/import-metabot.py em {time.strftime("%Y-%m-%d")} — não edite à mão,
   rode o importador de novo para atualizar.
   ============================================================ */
SKILL_DB.{class_id} = [
{chr(10).join(lines)}
];
"""
    (OUT_DIR / f"{class_id}.js").write_text(body, encoding="utf-8")


def import_icons(class_id, skills, download):
    """Liga cada skill ao seu ícone local; com download=True, baixa os que faltam. Retorna quantos baixou."""
    folder = ICON_DIR / class_id
    downloaded = 0
    for s in skills:
        dest = folder / f"{s['id']}.webp"
        if download and not dest.exists() and s.get("_icon_path"):
            folder.mkdir(parents=True, exist_ok=True)
            save_icon(fetch_bytes(s["_icon_path"]), dest)
            downloaded += 1
        if dest.exists():
            s["icon"] = dest.name
    return downloaded


def main(class_ids, icons):
    for class_id in class_ids:
        skills = parse_class_page(fetch(f"/en/aion-2/classes/{class_id}"))
        if not skills:
            sys.exit(f"{class_id}: nenhuma skill encontrada — o layout da página mudou?")
        # página de cada skill: efeito completo (a tabela corta alguns com "…") + especializações
        for s in skills:
            desc, specs = parse_skill_page(fetch(s["source"][len(BASE):]))
            s["desc"] = desc or s.get("desc")
            s["specs"] = specs
        downloaded = import_icons(class_id, skills, icons)
        write_class(class_id, skills)
        counts = {t: sum(s["type"] == t for s in skills) for t in TABLE_TYPES.values()}
        with_icon = sum(1 for s in skills if s.get("icon"))
        with_specs = sum(1 for s in skills if s["specs"])
        print(f"{class_id}: {len(skills)} skills {counts}, {with_specs} com especializações, "
              f"ícones: {with_icon}/{len(skills)} ({downloaded} baixados agora)", flush=True)


if __name__ == "__main__":
    icons = "--icons" in sys.argv[1:]
    args = [a for a in sys.argv[1:] if a != "--icons"] or CLASSES
    unknown = [a for a in args if a not in CLASSES]
    if unknown:
        sys.exit(f"Classe desconhecida: {', '.join(unknown)}. Opções: {', '.join(CLASSES)}")
    main(args, icons)
