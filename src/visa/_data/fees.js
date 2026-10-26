// 外国人向けサイト（/visa/ EN・ES・JA）の料金表。
// 日本語版（/gyosei/ src/index.njk の料金表）と同じ金額にそろえること。
// 金額は税込・円。from: true で「〜」、plus: true で「＋」を付けます。

module.exports = {
  labels: {
    service: { en: "Service", es: "Servicio", ja: "業務" },
    fee: { en: "Fee (tax incl.)", es: "Honorario (IVA incl.)", ja: "料金（税込）" },
    condition: { en: "Condition", es: "Condición", ja: "条件" },
    extra: { en: "Additional fee (tax incl.)", es: "Cargo adicional (IVA incl.)", ja: "追加料金（税込）" },
    size: { en: "Number of foreign employees", es: "Número de empleados extranjeros", ja: "規模" },
    monthly: { en: "Monthly (tax incl.)", es: "Mensual (IVA incl.)", ja: "月額（税込）" },
  },

  groups: [
    {
      title: { en: "For Companies — Hiring Foreign Employees", es: "Para Empresas — Contratación de Extranjeros", ja: "企業向け｜外国人雇用サポート" },
      tables: [
        {
          caption: { en: "Engineer / Specialist in Humanities / International Services", es: "Ingeniero / Especialista en Humanidades / Servicios Internacionales", ja: "技術・人文知識・国際業務（技人国）" },
          rows: [
            { label: { en: "Certificate of Eligibility (hiring from abroad)", es: "Certificado de Elegibilidad (contratación desde el extranjero)", ja: "在留資格認定証明書（海外からの呼び寄せ）" }, jpy: 132000 },
            { label: { en: "Change of status of residence", es: "Cambio de estatus de residencia", ja: "在留資格変更" }, jpy: 121000 },
            { label: { en: "Extension of period of stay (same employer)", es: "Renovación del período de estancia (mismo empleador)", ja: "在留期間更新（転職なし）" }, jpy: 66000 },
            { label: { en: "Extension of period of stay (after changing jobs)", es: "Renovación del período de estancia (tras cambiar de empleo)", ja: "在留期間更新（転職あり）" }, jpy: 121000 },
          ],
        },
        {
          caption: { en: "Specified Skilled Worker (SSW) / Employment for Skill Development", es: "Trabajador con Habilidades Específicas (SSW) / Empleo para el Desarrollo de Habilidades", ja: "特定技能・育成就労" },
          rows: [
            { label: { en: "Certificate of Eligibility", es: "Certificado de Elegibilidad", ja: "在留資格認定証明書" }, jpy: 154000 },
            { label: { en: "Change of status of residence", es: "Cambio de estatus de residencia", ja: "在留資格変更" }, jpy: 154000 },
            { label: { en: "Extension of period of stay", es: "Renovación del período de estancia", ja: "在留期間更新" }, jpy: 88000 },
          ],
        },
        {
          kind: "extra",
          caption: { en: "Additional fees that may apply", es: "Cargos adicionales que pueden aplicarse", ja: "状況によって追加となる料金" },
          rows: [
            { label: { en: "Company less than 3 years old", es: "Empresa con menos de 3 años", ja: "設立3年未満の新設会社" }, jpy: 33000, plus: true },
            { label: { en: "Loss in the most recent fiscal year", es: "Pérdidas en el último ejercicio fiscal", ja: "直近決算が赤字" }, jpy: 33000, plus: true },
            { label: { en: "14 days or less until the current visa expires", es: "14 días o menos hasta el vencimiento del visado actual", ja: "在留期限まで14日以内" }, jpy: 33000, plus: true },
            { label: { en: "Reapplication after a denial (filed by another office or by yourself)", es: "Nueva solicitud tras una denegación (presentada por otra oficina o por usted)", ja: "他事務所・自己申請からの再申請" }, jpy: 33000, plus: true },
            { label: { en: "We obtain Japanese certificates on your behalf", es: "Obtenemos por usted los certificados japoneses", ja: "国内書類取得代行" }, jpy: 44000, plus: true },
          ],
          note: { en: "If more than one condition applies, we will give you an individual quote after reviewing your case.", es: "Si se aplica más de una condición, le daremos un presupuesto individual tras revisar su caso.", ja: "複数の条件に該当する場合は、内容確認後に個別でお見積りします。" },
        },
        {
          kind: "monthly",
          caption: { en: "Ongoing support (monthly retainer plan)", es: "Soporte continuo (plan mensual)", ja: "継続サポート（顧問プラン）" },
          rows: [
            { label: { en: "3–5 foreign employees", es: "3–5 empleados extranjeros", ja: "外国人3〜5名在籍" }, jpy: 55000, from: true },
            { label: { en: "6–10 foreign employees", es: "6–10 empleados extranjeros", ja: "外国人6〜10名在籍" }, jpy: 88000, from: true },
            { label: { en: "11 or more", es: "11 o más", ja: "外国人11名以上" }, text: { en: "Quote on request", es: "Presupuesto a medida", ja: "別途お見積り" } },
          ],
          note: { en: "Includes: questions by chat at any time, tracking of visa expiry dates with advance reminders, updates on law changes. Visa applications for new hires are charged separately.", es: "Incluye: consultas por chat en cualquier momento, control de fechas de vencimiento con avisos previos e información sobre cambios legales. Las solicitudes de visado para nuevas contrataciones se cobran aparte.", ja: "含まれるもの：LINEでの相談対応（随時）・在留期限の管理と更新時期の事前通知・法改正情報の共有・新規採用時のビザ申請対応（別途費用）" },
        },
      ],
    },
    {
      title: { en: "Spouse Visa & International Marriage", es: "Visa de Cónyuge y Matrimonio Internacional", ja: "個人向け｜配偶者ビザ・国際結婚" },
      tables: [
        {
          rows: [
            { label: { en: "Certificate of Eligibility (bringing your spouse from abroad)", es: "Certificado de Elegibilidad (traer a su cónyuge desde el extranjero)", ja: "在留資格認定証明書（海外からの呼び寄せ）" }, jpy: 132000 },
            { label: { en: "Change of status of residence", es: "Cambio de estatus de residencia", ja: "在留資格変更" }, jpy: 110000 },
            { label: { en: "Extension of period of stay (standard)", es: "Renovación del período de estancia (estándar)", ja: "在留期間更新（通常）" }, jpy: 66000 },
            { label: { en: "Extension of period of stay (remarriage after divorce / complex cases)", es: "Renovación del período de estancia (nuevo matrimonio tras divorcio / casos complejos)", ja: "在留期間更新（離婚後再婚・複雑案件）" }, jpy: 110000 },
            { label: { en: "International marriage procedure support", es: "Apoyo con los trámites de matrimonio internacional", ja: "国際結婚手続きサポート" }, jpy: 55000, from: true },
          ],
        },
        {
          kind: "extra",
          caption: { en: "Additional fees that may apply", es: "Cargos adicionales que pueden aplicarse", ja: "状況によって追加となる料金" },
          rows: [
            { label: { en: "Overstay, or during a period of denied landing", es: "Exceso de estancia o período de prohibición de entrada", ja: "オーバーステイ・上陸拒否期間中" }, jpy: 55000, plus: true },
            { label: { en: "Divorced two or more times", es: "Dos o más divorcios", ja: "離婚歴が2回以上ある" }, jpy: 33000, plus: true },
            { label: { en: "Age difference of 15 years or more", es: "Diferencia de edad de 15 años o más", ja: "年齢差が15歳以上" }, jpy: 33000, plus: true },
            { label: { en: "Japanese spouse's annual income ¥2 million or less", es: "Ingreso anual del cónyuge japonés de ¥2 millones o menos", ja: "日本人側の年収200万円以下" }, jpy: 33000, plus: true },
            { label: { en: "Reapplication after a denial (filed by another office or by yourself)", es: "Nueva solicitud tras una denegación (presentada por otra oficina o por usted)", ja: "他事務所・自己申請からの再申請" }, jpy: 33000, plus: true },
          ],
          note: { en: "If more than one condition applies, we will give you an individual quote after reviewing your case.", es: "Si se aplica más de una condición, le daremos un presupuesto individual tras revisar su caso.", ja: "複数の条件に該当する場合は、内容確認後に個別でお見積りします。" },
        },
      ],
    },
    {
      title: { en: "Business Manager Visa (Starting a Business in Japan)", es: "Visa de Gestión Empresarial (Iniciar un Negocio en Japón)", ja: "経営管理ビザ（日本での起業・会社経営）" },
      tables: [
        {
          rows: [
            { label: { en: "Certificate of Eligibility (from abroad)", es: "Certificado de Elegibilidad (desde el extranjero)", ja: "在留資格認定証明書（海外からの呼び寄せ）" }, jpy: 330000, from: true },
            { label: { en: "Change of status of residence", es: "Cambio de estatus de residencia", ja: "在留資格変更" }, jpy: 330000, from: true },
            { label: { en: "Extension of period of stay", es: "Renovación del período de estancia", ja: "在留期間更新" }, jpy: 132000, from: true },
          ],
          note: { en: "Company setup costs are separate. We start by checking whether your plan meets the permit criteria revised in October 2025 (including capital of ¥30 million or more).", es: "Los costos de constitución de la empresa son aparte. Empezamos verificando si su plan cumple los criterios revisados en octubre de 2025 (incluido un capital de ¥30 millones o más).", ja: "会社設立にかかる費用は別途です。2025年10月の許可基準改正（資本金3,000万円以上など）を満たしているかの確認から承ります。" },
        },
      ],
    },
    {
      title: { en: "Permanent Residency & Naturalization", es: "Residencia Permanente y Naturalización", ja: "個人向け｜永住・帰化" },
      tables: [
        {
          rows: [
            { label: { en: "Permanent residency (employees)", es: "Residencia permanente (empleados)", ja: "永住許可申請（会社員）" }, jpy: 165000 },
            { label: { en: "Permanent residency (business owners / self-employed)", es: "Residencia permanente (empresarios / autónomos)", ja: "永住許可申請（経営者・個人事業主）" }, jpy: 198000 },
            { label: { en: "Naturalization (employees)", es: "Naturalización (empleados)", ja: "帰化申請（会社員・被雇用者）" }, jpy: 209000 },
            { label: { en: "Naturalization (business owners / self-employed)", es: "Naturalización (empresarios / autónomos)", ja: "帰化申請（経営者・個人事業主）" }, jpy: 275000 },
          ],
        },
      ],
    },
    {
      title: { en: "Other Statuses of Residence", es: "Otros Estatus de Residencia", ja: "その他の在留資格" },
      tables: [
        {
          rows: [
            { label: { en: "Student visa extension", es: "Renovación de visa de estudiante", ja: "留学ビザ更新" }, jpy: 55000 },
            { label: { en: "Dependent (Family Stay)", es: "Dependiente (Estancia Familiar)", ja: "家族滞在" }, jpy: 66000 },
            { label: { en: "Long-Term Resident", es: "Residente de Largo Plazo", ja: "定住者" }, jpy: 88000, from: true },
          ],
        },
      ],
    },
  ],

  terms: {
    title: { en: "Common Terms", es: "Condiciones Generales", ja: "共通事項" },
    items: {
      en: [
        "Retainer: 50% of the fee when you engage us / Remaining 50%: when your application is approved",
        "Payment: bank transfer in Japan, in Japanese yen. Work begins after payment is confirmed.",
        "Out-of-pocket costs are separate: translation, certificates, postage, etc. We quote these in advance.",
      ],
      es: [
        "Anticipo: 50% del honorario al contratar / Saldo del 50%: cuando se aprueba la solicitud",
        "Pago: transferencia bancaria en Japón, en yenes japoneses. El trabajo comienza tras confirmar el pago.",
        "Gastos aparte: traducciones, certificados, envíos, etc. Se los presupuestamos por adelantado.",
      ],
      ja: [
        "着手金：報酬額の50%（依頼確定時）／残金：許可時",
        "お支払い：銀行振込（日本円）。ご入金確認後に業務を開始いたします",
        "別途実費：翻訳料・証明書取得費用・郵送料など（事前にお見積りします）",
      ],
    },
  },
};
