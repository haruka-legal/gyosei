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

  // 記事コレクション：articles/
