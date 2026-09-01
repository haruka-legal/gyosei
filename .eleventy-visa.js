module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/visa/assets": "assets" });

  eleventyConfig.addCollection("guidesEn", (api) =>
    api.getFilteredByGlob("src/visa/guides/**/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("guidesEs", (api) =>
    api.getFilteredByGlob("src/visa/es/guides/**/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("guidesJa", (api) =>
    api.getFilteredByGlob("src/visa/ja/guides/**/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("dateEn", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addFilter("dateEs", (d) =>
    new Date(d).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );

  eleventyConfig.addFilter("dateJa", (d) => {
    const dt = new Date(d);
    return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`;
  });

  eleventyConfig.addFilter("dateISO", (d) => new Date(d).toISOString());

  eleventyConfig.addFilter("byTag", (articles, tag) =>
    articles.filter((a) => (a.data.tags || []).includes(tag))
  );

  eleventyConfig.addFilter("related", (articles, current, limit = 3) => {
    const currentTags = new Set(current.data.tags || []);

    return articles
      .filter((a) => a.url !== current.url)
      .map((a) => ({
        item: a,
        score: (a.data.tags || []).filter((tag) => currentTags.has(tag)).length,
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || b.item.date - a.item.date)
      .slice(0, limit)
      .map((item) => item.item);
  });

  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  eleventyConfig.addFilter("excerpt", (content, len = 140) => {
    if (!content) return "";
    const text = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    return text.length > len ? `${text.slice(0, len)}…` : text;
  });

  return {
    pathPrefix: "/visa/",
    dir: {
      input: "src/visa",
      includes: "_includes",
      data: "_data",
      output: "_site/visa",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
