// 公開前チェック：ビルド結果（_site）の全ファイルを調べ、
// 許可していないドメインへのリンクや、自分のサイト以外を指す canonical / og:url があれば
// エラーで止める（= GitHub Actions が公開しない）。
//
// 使い方: node scripts/check-domains.js [_site]
//
// 新しく外部サービスのリンクを貼るときは、ALLOWED_HOSTS に1行追加してください。

const fs = require("fs");
const path = require("path");

const SITE_DIR = process.argv[2] || "_site";

// 自分のサイトの正式な住所（canonical / og:url / sitemap はここで始まらなければならない）
const OWN_ORIGIN = "https://haruka-legal.com";

// 絶対に出てきてはいけないドメイン（名前が似ている他の事務所など）
const BLOCKED_HOSTS = [
  "haruka-gyosei.com", // 埼玉県蓮田市の別事務所。過去に設定へ紛れ込んだことがある
];

// リンクしてよいドメイン
const ALLOWED_HOSTS = [
  "haruka-legal.com",
  "haruka-legal.github.io", // English / Español サイト（support リポジトリ）
  "lin.ee", // 公式LINE
  "wa.me", // WhatsApp
  "www.linkedin.com",
  "docs.google.com", // お問い合わせフォーム
  "www.google.com", // Googleマップ
  "fonts.googleapis.com",
  "fonts.gstatic.com",
  "cdnjs.cloudflare.com",
  "images.pexels.com",
  "schema.org",
  "www.w3.org",
  "www.sitemaps.org",
  // 記事で一次情報として引用する公的機関
  "www.moj.go.jp",
  "www.isa.go.jp",
  "www.mhlw.go.jp",
  "www.e-gov.go.jp",
  "laws.e-gov.go.jp",
  "elaws.e-gov.go.jp",
  "www.courts.go.jp",
  "www.nta.go.jp",
  "houmukyoku.moj.go.jp",
  "www.gyosei.or.jp",
  "www.tokyo-gyosei.or.jp",
];

const TEXT_EXT = new Set([".html", ".xml", ".txt", ".css", ".js", ".json", ".webmanifest"]);
const URL_RE = /https?:\/\/[A-Za-z0-9.-]+(?::\d+)?[^\s"'<>)\\]*/g;
const META_RE = /<(?:link[^>]*rel="canonical"[^>]*href|meta[^>]*property="og:url"[^>]*content)="([^"]*)"/g;

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

if (!fs.existsSync(SITE_DIR)) {
  console.error(`✖ ${SITE_DIR} が見つかりません。先にビルドしてください。`);
  process.exit(1);
}

const problems = [];
let checkedFiles = 0;

for (const file of walk(SITE_DIR)) {
  const rel = path.relative(SITE_DIR, file);

  // CNAME はリポジトリでは使わない（独自ドメインは GitHub の Pages 設定で管理）
  if (path.basename(file) === "CNAME") {
    const value = fs.readFileSync(file, "utf8").trim();
    if (value !== "haruka-legal.com") problems.push(`${rel}: CNAME が "${value}" になっています`);
    continue;
  }
  if (!TEXT_EXT.has(path.extname(file))) continue;
  checkedFiles++;
  const text = fs.readFileSync(file, "utf8");

  for (const raw of text.match(URL_RE) || []) {
    const match = raw.replace(/[.,;:]+$/, "");
    let host;
    try {
      host = new URL(match).hostname.toLowerCase();
    } catch {
      continue;
    }
    if (BLOCKED_HOSTS.some((b) => host === b || host.endsWith("." + b))) {
      problems.push(`${rel}: 禁止ドメイン ${host} へのURL → ${match}`);
    } else if (!ALLOWED_HOSTS.includes(host)) {
      problems.push(`${rel}: 許可リストにないドメイン ${host} → ${match}`);
    }
  }

  for (const [, href] of text.matchAll(META_RE)) {
    if (!href.startsWith(OWN_ORIGIN + "/")) {
      problems.push(`${rel}: canonical / og:url が自分のサイト以外を指しています → ${href}`);
    }
  }

  if (path.basename(file) === "sitemap.xml") {
    for (const [, loc] of text.matchAll(/<loc>([^<]*)<\/loc>/g)) {
      if (!loc.startsWith(OWN_ORIGIN + "/")) problems.push(`${rel}: サイトマップに他サイトのURL → ${loc}`);
    }
  }
}

const unique = [...new Set(problems)];
if (unique.length) {
  console.error(`✖ 公開を止めました。${unique.length} 件の問題があります：\n`);
  for (const p of unique) console.error("  - " + p);
  console.error(
    "\n他の事務所のサイトに繋がっていないか確認してください。" +
      "\n正しい外部リンクなら scripts/check-domains.js の ALLOWED_HOSTS に追加してください。"
  );
  process.exit(1);
}

console.log(`✔ ドメインチェックOK（${checkedFiles} ファイルを検査）`);
