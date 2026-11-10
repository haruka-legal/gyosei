// トップページ（_site/index.html）に「新着記事」を差し込む。
// ビザ・相続・風営（あとから民泊も）の各ブログの記事を新しい順に並べ、
// タイトル・日付・リンクだけを載せる（本文はコピーしない）。
//
// 使い方: node scripts/build-news.js [_site]
// 新しいブログを足すときは、SOURCES に1行追加してください（フォルダがなければ飛ばします）。

const fs = require("fs");
const path = require("path");

const SITE_DIR = process.argv[2] || "_site";
const LIMIT = 5;

const SOURCES = [
  { dir: "src/articles", base: "/gyosei/articles/", label: "ビザ" },
  { dir: "src/souzoku/articles", base: "/souzoku/articles/", label: "相続" },
  { dir: "src/fuei/articles", base: "/fuei/articles/", label: "風営" },
  { dir: "src/minpaku/articles", base: "/minpaku/articles/", label: "民泊" },
];

// 日本時間の今日（これより先の日付の記事は載せない）
const today = new Date(Date.now() + 9 * 3600e3).toISOString().slice(0, 10);

function frontMatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const get = (key) => {
    const r = m[1].match(new RegExp("^" + key + ":\\s*(.+)$", "m"));
    if (!r) return null;
    return r[1].trim().replace(/^["']|["']$/g, "");
  };
  return { title: get("title"), date: get("datePublished") };
}

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const items = [];
for (const src of SOURCES) {
  if (!fs.existsSync(src.dir)) continue;
  for (const file of fs.readdirSync(src.dir)) {
    if (!file.endsWith(".md")) continue;
    const fm = frontMatter(fs.readFileSync(path.join(src.dir, file), "utf8"));
    if (!fm.title || !fm.date || fm.date > today) continue;
    const slug = file.replace(/\.md$/, "");
    if (!fs.existsSync(path.join(SITE_DIR, src.base, slug, "index.html"))) continue; // 実際に公開されたものだけ
    items.push({ ...fm, label: src.label, url: src.base + slug + "/" });
  }
}

items.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));

const html = items
  .slice(0, LIMIT)
  .map(
    (it) =>
      `<li><a href="${it.url}"><time datetime="${it.date}">${it.date.replace(/-/g, ".")}</time><span class="tag">${it.label}</span><span class="tt">${esc(it.title)}</span></a></li>`
  )
  .join("\n        ");

const indexPath = path.join(SITE_DIR, "index.html");
const page = fs.readFileSync(indexPath, "utf8");
if (!page.includes("<!--NEWS-->")) {
  console.error("build-news: index.html に <!--NEWS--> が見つかりません");
  process.exit(1);
}
fs.writeFileSync(indexPath, page.replace("<!--NEWS-->", html));
console.log(`build-news: ${Math.min(items.length, LIMIT)} 件を載せました（全 ${items.length} 件）`);
