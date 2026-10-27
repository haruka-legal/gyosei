// 風営サイトの基本設定。
// サイトのURLはここ1か所だけに書きます（canonical・OGP・サイトマップ・llms.txt はすべてここから作られます）。
// テンプレートや記事に https://〜 のサイトURLを直接書かないでください。
module.exports = {
  name: "遥か行政書士事務所",
  nameEn: "HARUKA LEGAL SUPPORT",
  url: "https://haruka-legal.com/fuei",
  address: "東京都千代田区神田錦町3−6−4",
  postalCode: "101-0054",
  addressStreet: "神田錦町3-6-4",
  // このサイトでは代表者の氏名・写真を載せない方針（2026-10-18）。
  // 記事の執筆者は事務所名で表示する。
  representative: {
    jobTitle: "行政書士",
    association: "東京都行政書士会"
  },
  knowsAbout: ["風俗営業許可","接待飲食等営業","社交飲食店","深夜酒類提供飲食店営業の届出","用途地域の調査","保全対象施設の調査","営業所の平面図・求積図","飲食店営業許可","性風俗関連特殊営業の届出"],
  // 主な対応エリア（構造化データ・事務所案内・FAQに使う）
  serviceAreas: ["千代田区","中央区","港区","新宿区","文京区","台東区","荒川区"],
  // 事務所案内の「主な対応地域」と構造化データに使う街の名前
  serviceTownGroups: [
    { ward: "千代田区", towns: ["神田","神保町","御茶ノ水","水道橋"] },
    { ward: "中央区", towns: ["銀座"] },
    { ward: "港区", towns: ["新橋"] },
    { ward: "台東区・文京区", towns: ["上野","湯島","千束（吉原）","三ノ輪"] },
    { ward: "荒川区", towns: ["日暮里","三河島"] }
  ],
  lineUrl: "https://lin.ee/Sgysu6a",
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLScSlVq7Fiao-6JQXSTVyVt4e4Q6z7YZc7XxGRsk_4u2O7o0zg/viewform?embedded=true",
  logo: "/images/logo.jpg",
  internationalUrl: "https://haruka-legal.com/gyosei/",
  navLinks: [
    { href: "", label: "トップ", key: "top" },
    { href: "#flow", label: "ご相談の流れ", key: "flow" },
    { href: "#services", label: "業務内容", key: "services" },
    { href: "#fees", label: "料金", key: "fees" },
    { href: "articles/", label: "お役立ち記事", key: "articles" },
    { href: "#profile", label: "ごあいさつ", key: "profile" },
    { href: "#faq", label: "よくある質問", key: "faq" },
    { href: "#access", label: "アクセス", key: "access" },
    { href: "#contact", label: "お問い合わせ", key: "contact" }
  ]
};
