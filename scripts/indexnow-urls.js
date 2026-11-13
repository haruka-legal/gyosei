// IndexNow（Bing などに「ページが新しくなった」とすぐ知らせる仕組み）で送るURLの一覧を作る。
// 今回の push で変わった記事のファイルから、公開URLを組み立てる。
// 使い方: node scripts/indexnow-urls.js <前のコミット> <今のコミット> [_site] > urls.txt

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const [before, after, siteDir = "_site"] = process.argv.slice(2);
const ORIGIN = "https://haruka-legal.com";

// ソースのフォルダ → 公開URLの先頭
const MAP = [
  [/^src\/articles\/([^/]+)\.md$/, "/gyosei/articles/$1/", "/gyosei/articles/"],
  [/^src\/souzoku\/articles\/([^/]+)\.md$/, "/souzoku/articles/$1/", "/souzoku/articles/"],
  [/^src\/fuei\/articles\/([^/]+)\.md$/, "/fuei/articles/$1/", "/fuei/articles/"],
  [/^src\/minpaku\/articles\/([^/]+)\.md$/, "/minpaku/articles/$1/", "/minpaku/"],
  [/^src\/visa\/((?:ja|es)\/)?guides\/([^/]+)\.md$/, "/visa/$1guides/$2/", null],
  [/^src\/root\/index\.html$/, "/", null],
];

let files = [];
try {
  if (!before || /^0+$/.test(before)) throw new Error("no previous commit");
  files = execSync(`git diff --name-only ${before} ${after}`, { encoding: "utf8" }).split("\n").filter(Boolean);
} catch (e) {
  // 比べる相手がない（手動実行など）ときは、全サイトのサイトマップにある全ページを送る
  const out = new Set();
  const walk = (d) => {
    for (const n of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, n.name);
      if (n.isDirectory()) walk(p);
      else if (n.name === "sitemap.xml") {
        for (const m of fs.readFileSync(p, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) {
          if (!m[1].endsWith(".xml")) out.add(m[1].trim());
        }
      }
    }
  };
  walk(siteDir);
  out.add(ORIGIN + "/");
  out.forEach((u) => console.log(u));
  process.exit(0);
}

const urls = new Set();
for (const f of files) {
  for (const [re, tpl, list] of MAP) {
    const m = f.match(re);
    if (!m) continue;
    const p = tpl.replace("$1", m[1] || "").replace("$2", m[2] || "");
    urls.add(p);
    if (list) {
      urls.add(list);
      urls.add("/"); // トップページの「新着記事」も変わる
    }
  }
}

// 実際に作られたページだけ送る
for (const u of urls) {
  const exists = fs.existsSync(path.join(siteDir, u, "index.html"));
  if (exists) console.log(ORIGIN + u);
}
