// 相続サイトの基本設定。
// サイトのURLはここ1か所だけに書きます（canonical・OGP・サイトマップ・llms.txt はすべてここから作られます）。
// テンプレートや記事に https://〜 のサイトURLを直接書かないでください。
module.exports = {
  name: "遥か行政書士事務所",
  nameEn: "HARUKA LEGAL SUPPORT",
  url: "https://haruka-legal.com/souzoku",
  address: "東京都千代田区神田錦町3−6−4",
  postalCode: "101-0054",
  addressStreet: "神田錦町3-6-4",
  representative: {
    name: "岸 はるか",
    jobTitle: "行政書士",
    sameAs: ["https://www.linkedin.com/in/haruka-kishi"]
  },
  knowsAbout: ["相続手続き","相続人調査","戸籍収集","法定相続情報一覧図","遺産分割協議書","財産目録","預貯金の相続手続き","遺言書作成","公正証書遺言","自筆証書遺言"],
  lineUrl: "https://lin.ee/Sgysu6a",
  logo: "/images/logo.jpg",
  internationalUrl: "https://haruka-legal.com/gyosei/",
  navLinks: [
    { href: "", label: "トップ", key: "top" },
    { href: "#flow", label: "ご相談の流れ", key: "flow" },
    { href: "#services", label: "業務内容", key: "services" },
    { href: "#fees", label: "料金", key: "fees" },
    { href: "articles/", label: "お役立ち記事", key: "articles" },
    { href: "#profile", label: "代表挨拶", key: "profile" },
    { href: "#faq", label: "よくある質問", key: "faq" },
    { href: "#access", label: "アクセス", key: "access" },
    { href: "#contact", label: "お問い合わせ", key: "contact" }
  ]
};
