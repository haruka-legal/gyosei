// 民泊ブログの基本設定（案内ページは作らず、記事だけのブログ）。
// サイトのURLはここ1か所だけに書きます。
module.exports = {
  name: "遥か行政書士事務所",
  nameEn: "HARUKA Gyoseishoshi Office",
  url: "https://haruka-legal.com/minpaku",
  address: "東京都千代田区神田錦町3−6−4",
  postalCode: "101-0054",
  addressStreet: "神田錦町3-6-4",
  representative: {
    jobTitle: "行政書士",
    association: "東京都行政書士会",
    registrationNumber: "26083037",
  },
  knowsAbout: ["住宅宿泊事業の届出","民泊","旅館業の許可","簡易宿所","国家戦略特区の民泊"],
  serviceAreas: ["千代田区","中央区","港区","新宿区","文京区","台東区","荒川区"],
  serviceTownGroups: [],
  lineUrl: "https://lin.ee/Sgysu6a",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScSlVq7Fiao-6JQXSTVyVt4e4Q6z7YZc7XxGRsk_4u2O7o0zg/viewform?embedded=true",
  logo: "/images/logo.jpg",
  internationalUrl: "https://haruka-legal.com/gyosei/",
  navLinks: [
    { href: "", label: "民泊の記事", key: "articles" },
    { href: "#article-contact", label: "お問い合わせ", key: "contact" },
    { href: "../", label: "事務所トップ", key: "portal" }
  ]
};
