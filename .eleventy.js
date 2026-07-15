const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // 静的ファイルはそのままコピー
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy({ "src/static": "/" }); // CNAME, llms.txt, googleXXXX.html 等

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
    return collectionApi.getFilteredByGlob("src/articles/*.md").sort((a, b) => {
      return new Date(b.data.datePublished) - new Date(a.data.datePublished);
    });
  });

  // カテゴリ自動生成：記事のcategoryフィールドから自動でカテゴリ一覧を作る
  eleventyConfig.addCollection("categories", (collectionApi) => {
    const articles = collectionApi.getFilteredByGlob("src/articles/*.md");
    const cats = {};
    articles.forEach((article) => {
      const cat = article.data.category;
      if (!cat) return;
      if (!cats[cat]) cats[cat] = [];
      cats[cat].push(article);
    });
    return cats;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
