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
  "jsite.mhlw.go.jp",
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
  "www.vn.emb-japan.go.jp", // 在ベトナム日本国大使館（政府資料の掲載）
  "sp.m.jiji.com", // 時事通信
  "www.dir.co.jp", // 大和総研
  "www.shugiin.go.jp", // 衆議院（法律の原文）
  "www.city.kasama.lg.jp", // 笠間市
  "tir-navicenter.metro.tokyo.lg.jp", // 東京外国人材採用ナビセンター（東京都）
  "www.isa.go.jp",
  "www.mhlw.go.jp",
  "www8.cao.go.jp", // 内閣府（高齢社会白書）
  "www.otit.go.jp", // 外国人技能実習機構（送出機関の一覧など）
  "www.e-gov.go.jp",
  "laws.e-gov.go.jp",
  "elaws.e-gov.go.jp",
  "www.courts.go.jp",
  "www.nta.go.jp",
  "www.mofa.go.jp", // 外務省（ビザ・査証の案内）
  "houmukyoku.moj.go.jp",
  "www.gyosei.or.jp",
  "www.tokyo-gyosei.or.jp",
  "www.nenkin.go.jp", // 日本年金機構
  "www.kyoukaikenpo.or.jp", // 協会けんぽ
  "www.city.shinjuku.lg.jp", // 新宿区（戸籍の届出の案内）
  "www.city.chiba.jp", // 千葉市（農地の相続届出の案内）
  "www.city.chiyoda.lg.jp", // 千代田区
  "www.keishicho.metro.tokyo.lg.jp", // 警視庁（風営法の手続き・審査基準・条例）
  "www.npa.go.jp", // 警察庁（風営法の解釈運用基準）
  "www.tfd.metro.tokyo.lg.jp", // 東京消防庁（使用開始届・防火管理者）
  "www.police.pref.kanagawa.jp", // 神奈川県警察（2025年の風営法改正の概要）
  "www.police.pref.kochi.lg.jp", // 高知県警察（深夜酒類提供飲食店営業の手引）
  "www.city.kobe.lg.jp", // 神戸市（死亡届の案内）
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
