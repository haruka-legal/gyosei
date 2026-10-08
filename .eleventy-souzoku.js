// 相続サイト（haruka-legal.com/souzoku/）のビルド設定。日本語版(.eleventy.js)と同じ型。
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  // 静的ファイルはそのままコピー
eleventyConfig.addPassthroughCopy({ "src/souzoku/css": "css" });

eleventyConfig.addFilter("dateISO", (dateObj) => {
  return new Date(dateObj).toISOString();
});

eleventyConfig.addPassthroughCopy({ "src/souzoku/images": "images" });

  // 日付を「2026年7月3日」のような表示に変換するフィルタ
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    let dt = typeof dateObj === "string" ? DateTime.fromISO(dateObj) : DateTime.fromJSDate(dateObj);
    return dt.setZone("Asia/Tokyo").toFormat("yyyy'年'M'月'd'日'");
  });

  // カード用の短い日付「2026.07.03」
  eleventyConfig.addFilter("cardDate", (dateObj) => {
    let dt = typeof dateObj === "string" ? DateTime.fromISO(dateObj) : DateTime.fromJSDate(dateObj);
    return dt.setZone("Asia/Tokyo").toFormat("yyyy.LL.dd");
  });

  // ISO形式の日付「2026-07-03」（JSON-LD用）
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    let dt = typeof dateObj === "string" ? DateTime.fromISO(dateObj) : DateTime.fromJSDate(dateObj);
    return dt.toFormat("yyyy-LL-dd");
  });

  // JSON埋め込み用（ダブルクォート等を安全にエスケープ）
  eleventyConfig.addFilter("dump", (obj) => JSON.stringify(obj));

  // 配列スライス（先頭からn件取得など）
  eleventyConfig.addFilter("slice", (arr, start, end) => arr.slice(start, end));

  // 指定した項目(fileSlug等)を除外
  eleventyConfig.addFilter("whereNot", (arr, key, value) => arr.filter((item) => item[key] !== value));

  // ページの深さに応じた相対パスの起点を計算(例: /articles/foo/ なら "../../")
  eleventyConfig.addFilter("relRoot", (url) => {
    const depth = url.split("/").filter(Boolean).length;
    return depth === 0 ? "./" : "../".repeat(depth);
  });

  // 先頭の "/" を除去(絶対パス表記のフロントマター値を相対パス化する際に使用)
  eleventyConfig.addFilter("noLeadSlash", (str) => (str && str.startsWith("/") ? str.slice(1) : str));

  // 記事コレクション：articles/ 配下のMarkdownを日付の新しい順に自動収集
  eleventyConfig.addCollection("articles", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/souzoku/articles/*.md").sort((a, b) => {
      return new Date(b.data.datePublished) - new Date(a.data.datePublished);
    });
  });

  // カテゴリ自動生成：記事のcategoryフィールドから自動でカテゴリ一覧を作る
  eleventyConfig.addCollection("categories", (collectionApi) => {
    const articles = collectionApi.getFilteredByGlob("src/souzoku/articles/*.md");
    const cats = {};
    articles.forEach((article) => {
      const cat = article.data.category;
      if (!cat) return;
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(article);
    });
    return cats;
  });
  // 関連記事：同じカテゴリの記事を優先し、足りなければ新しい順で補う（自分自身は除く）
  eleventyConfig.addFilter("relatedArticles", (articles, current, limit = 3) => {
    const others = (articles || []).filter((a) => a.url !== current.url);
    const same = others.filter((a) => current.data && a.data.category && a.data.category === current.data.category);
    const rest = others.filter((a) => !same.includes(a));
    return same.concat(rest).slice(0, limit);
  });
eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));
  return {
    dir: {
      input: "src/souzoku",
      output: "_site/souzoku",
     includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
