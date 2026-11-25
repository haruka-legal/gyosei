// 国際業務ブログの目次（読む順）。新しい記事を出したら、どの章の何番に入れるかをここに足す。
// slug は src/articles/ のファイル名、label は目次に出す短い名前。
// 1つの章が5本以上たまったテーマ（帰化・永住・国際結婚など）は、新しい章として独立させる。
module.exports = [
  { title: "在留資格のしくみ", lead: "まず知っておきたい基礎", items: [
    ["zairyu-shikaku-visa-difference", "パスポート・ビザ・在留資格の違い"],
    ["zairyu-shikaku-shurui", "在留資格の種類"],
    ["zairyu-card-check", "在留カードの確認方法"],
    ["shuro-seigen-nashi", "仕事の制限がない在留資格"],
    ["teijusha-eijusha", "定住者と永住者の違い"],
    ["eiju-torikeshi", "永住者の在留資格の取り消し（2027年4月から）"],
  ]},
  { title: "外国人を雇う前に", lead: "準備と日本語", items: [
    ["gaikokujin-koyo-hajimekata", "何から始める？6つのステップ"],
    ["gaikokujin-koyo-merit", "外国人を雇うメリット・デメリット"],
    ["zairyu-nihongo-yoken", "日本語はどれくらい必要？"],
    ["nihongo-shiken-shurui", "日本語の試験の種類"],
  ]},
  { title: "申請と雇ったあとの手続き", lead: "入管・ハローワーク", items: [
    ["zairyu-nintei-shomeisho", "在留資格認定証明書（海外から呼ぶ）"],
    ["zairyu-online-shinsei", "在留申請オンラインシステム"],
    ["zairyu-shinsa-kikan", "審査にかかる期間"],
    ["shuro-shikaku-shomeisho", "就労資格証明書（転職してきた人を雇う）"],
    ["gaikokujin-koyo-todokede", "雇ったあとの届出"],
  ]},
  { title: "専門職で雇う", lead: "技人国・高度専門職・経営・管理", items: [
    ["gijinkoku", "技人国とは"],
    ["gijinkoku-fukyoka", "技人国が不許可になるとき"],
    ["koudo-senmonshoku", "高度専門職とは"],
    ["keiei-kanri", "外国人が会社を経営する（経営・管理）"],
  ]},
  { title: "現場の仕事で雇う", lead: "特定技能", items: [
    ["tokutei-ginou-1-2-difference", "特定技能1号と2号の違い"],
    ["tokutei-ginou-kokuseki", "国籍の選び方と手続き"],
    ["tokutei-ginou-support-plan", "特定技能の支援計画"],
    ["registered-support-organization", "登録支援機関とは"],
    ["registered-support-organization-gyoseishoshi-law", "登録支援機関に書類作成を頼んでいい？"],
    ["tokutei-ginou-support-system-2027", "登録支援機関の要件（2027年4月から）"],
  ]},
  { title: "技能実習・育成就労", lead: "2027年4月に育成就労へ", items: [
    ["ikusei-shuro", "育成就労とは"],
    ["ginou-jisshu-to-ikusei-shuro", "技能実習から育成就労に変わるまで"],
    ["ikusei-tandoku-kanri", "単独型と監理型の違い"],
    ["ikusei-ninzu-waku", "受け入れ人数枠"],
    ["kanri-shien-kikan", "監理支援機関とは"],
    ["okuridashi-kikan", "送出機関とは"],
    ["ryugaku-ikusei-shuro", "留学から育成就労に変更できる？"],
    ["kazoku-taizai-ikusei-shuro", "家族滞在から育成就労に変更できる？"],
    ["jisshusei-shisso", "技能実習生が失踪したら"],
  ]},
  { title: "業界別に見る", lead: "", items: [
    ["tokutei-ginou-kaigo", "介護"],
    ["tokutei-ginou-gaishoku", "飲食店（外食業）"],
    ["tokutei-ginou-shukuhaku", "ホテル・旅館"],
    ["anime-game-creator", "アニメ・ゲーム会社"],
    ["kougyou", "モデル・俳優・アーティスト（興行）"],
  ]},
];
