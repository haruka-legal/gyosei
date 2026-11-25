// 記事一覧の章立て。slug は src/souzoku/articles/ のファイル名（章の中は読む順）。
// 新しい記事を書いたら、ここに slug を足し、記事の category を章の name にそろえる。
module.exports = [
  {
    part: "相続手続きを進めたい方",
    partLead: "家族が亡くなった後の手続きを、順番に解説しています。",
    chapters: [
      { no: 1, name: "相続の基礎知識", lead: "誰が相続人になり、いつまでに何をするのか。最初に押さえておきたいこと", slugs: ["legal-heirs", "legal-inheritance-shares", "acceptance-or-renunciation", "inheritance-deadlines", "what-gyoseishoshi-can-do-inheritance"] },
      { no: 2, name: "家族が亡くなったら", lead: "亡くなった直後の手続きと、お金・遺品の注意点", slugs: ["first-7-days-after-death", "benefits-after-death", "bank-account-after-death", "before-estate-clearing", "estranged-parent"] },
      { no: 3, name: "相続人・相続財産の調査", lead: "戸籍を集めて相続人を確かめ、財産と借金を一覧にする", slugs: ["legal-heir-information", "estate-inventory"] },
      { no: 4, name: "遺産分割・相続税", lead: "遺産の分け方を決めるときと、相続税を払うときのポイント", slugs: ["division-agreement-required", "heir-with-dementia", "caregiving-contribution", "special-contribution", "inheritance-tax-installment"] },
      { no: 5, name: "不動産の相続・名義変更", lead: "相続登記の義務化、実家や土地をどうするか", slugs: ["past-inheritance-registration", "address-change-registration", "spouse-residence-right", "distant-family-home", "land-return-to-state"] },
      { no: 6, name: "外国人・海外に関わる相続", lead: "相続人が外国籍のときや、海外に住んでいるとき", slugs: ["foreign-national-heir", "heir-abroad"] },
    ],
  },
  {
    part: "元気なうちに備えておきたい方",
    partLead: "残される家族のために、いまからできる準備を解説しています。",
    chapters: [
      { no: 7, name: "遺言書の作成と遺言執行", lead: "遺言書の種類と選び方、遺言の内容を実現する人", slugs: ["types-of-wills", "will-executor"] },
      { no: 8, name: "認知症への備え・財産管理", lead: "判断する力が落ちたときに、財産を誰にどう任せるか", slugs: ["voluntary-guardianship", "guardianship-reform-2026", "family-trust"] },
      { no: 9, name: "終活・おひとりさま・家族のかたち", lead: "終活の始め方から、おひとりさまやパートナーとの備えまで", slugs: ["shukatsu-first-steps", "no-heirs", "posthumous-affairs-contract", "final-home", "partner-adoption"] },
    ],
  },
];
