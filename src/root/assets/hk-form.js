/* 遥か行政書士事務所 お問い合わせフォーム（共通）
   使い方: <div class="hk-form" data-hk-lang="ja" data-topic="souzoku" data-site="souzoku"></div>
           <script src="/assets/hk-form.js" defer></script>
   送信先は Google Apps Script のウェブアプリ（ENDPOINT）。 */
(function () {
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbzzQp-Y6Kd8iYhmqT0nP44nnuOGzGZtJk8IoV2Pv_RwhLbXM_aVMd5-_6keyUSSwl1L/exec';
  var MAIL = 'info@haruka-legal.com';

  var T = {
    ja: {
      name: 'お名前', email: 'メールアドレス', phone: '電話番号', topic: 'ご相談の分野', topicMulti: 'ご相談の内容（複数選択可）',
      message: 'ご相談内容', req: '必須', opt: '任意', choose: '選択してください',
      msgHint: 'ご事情やご希望など、わかる範囲でお聞かせください。その後のご案内がスムーズになります。', company: '会社名・団体名', phCompany: '法人・団体でのご相談の場合', source: '当事務所を知ったきっかけ',
      phPhone: '例）090-1234-5678', phMsg: '例）何から手をつければよいか分からないので、まず相談したい',
      sources: ['検索（Google・Yahoo!など）', 'Googleマップ', 'AI（ChatGPTなど）に聞いて', 'ブログ記事を読んで', 'SNS（X・Instagram・YouTubeなど）', '知人・他の専門家からの紹介', '交流会・イベント', 'その他'],
      agreeA: '', agreeLink: 'プライバシーポリシー', agreeB: 'に同意する', privacy: '/privacy/',
      submit: '送信する', sending: '送信しています…',
      okTitle: 'お問い合わせを受け付けました', okText: 'ご入力のメールアドレスに確認のメールをお送りしました。24時間以内にご返信いたします。',
      errReq: 'を入力してください', errEmail: 'メールアドレスの形式をご確認ください', errTopic: 'ご相談の分野を選んでください', errAgree: 'プライバシーポリシーへの同意が必要です',
      errSend: '送信できませんでした。お手数ですが、時間をおいて再度お試しいただくか、' + MAIL + ' までメールでご連絡ください。',
      topics: [['visa', 'ビザ・在留資格・外国人雇用'], ['souzoku', '相続・遺言'], ['fuei', '風俗営業許可・深夜酒類の届出'], ['nouchi', '農地転用・農地の手続き'], ['creator', 'エンタメ・クリエイター支援'], ['uchu', '宇宙ビジネス支援'], ['unknown', 'どの分野か分からない'], ['other', 'その他']]
    },
    en: {
      name: 'Name', email: 'Email', phone: 'Phone / WhatsApp', topicMulti: 'What is your inquiry about? (select all that apply)',
      message: 'Message', req: 'Required', opt: 'Optional', choose: 'Please select',
      msgHint: 'Please briefly tell us about your situation and how we can help.', company: 'Company / Organization', phCompany: 'If applicable', source: 'How did you hear about us?',
      phPhone: 'e.g. +81 90-1234-5678', phMsg: 'e.g. I need help with my visa, or our company plans to hire foreign employees.',
      sources: ['Google or other search engines', 'Google Maps', 'AI tools (ChatGPT, etc.)', 'An article or guide on our website', 'Social media (Facebook, Instagram, X, YouTube, etc.)', 'Referral (friend or another professional)', 'Networking event', 'Other'],
      agreeA: 'I agree to the ', agreeLink: 'Privacy Policy', agreeB: '', privacy: '/privacy/en/',
      submit: 'Send', sending: 'Sending…',
      okTitle: 'Thank you. We have received your message.', okText: 'A confirmation email has been sent to your address. We will reply within 24 hours.',
      errReq: ' is required', errEmail: 'Please check your email address', errTopic: 'Please select at least one topic', errAgree: 'Please agree to the Privacy Policy',
      errSend: 'Your message could not be sent. Please try again later or email us at ' + MAIL + '.',
      visa: ['Work visa / Residence status', 'Visa renewal / Change of status', 'Starting or running a business in Japan', 'International marriage', 'Family visa', 'Permanent residence / Naturalization', 'Hiring foreign employees', 'Not sure which applies', 'Other']
    },
    es: {
      name: 'Nombre', email: 'Correo electrónico', phone: 'Teléfono / WhatsApp', topicMulti: '¿Sobre qué es su consulta? (puede elegir varias)',
      message: 'Mensaje', req: 'Obligatorio', opt: 'Opcional', choose: 'Seleccione una opción',
      msgHint: 'Cuéntenos brevemente su situación y cómo podemos ayudarle.', company: 'Empresa / Organización', phCompany: 'Si corresponde', source: '¿Cómo nos conoció?',
      phPhone: 'p. ej. +81 90-1234-5678', phMsg: 'p. ej. Necesito ayuda con mi visa, o nuestra empresa desea contratar personal extranjero.',
      sources: ['Google u otros buscadores', 'Google Maps', 'Herramientas de IA (ChatGPT, etc.)', 'Un artículo o guía de nuestra web', 'Redes sociales (Facebook, Instagram, X, YouTube, etc.)', 'Recomendación (amigo u otro profesional)', 'Evento de networking', 'Otro'],
      agreeA: 'Acepto la ', agreeLink: 'Política de privacidad', agreeB: '', privacy: '/privacy/en/',
      submit: 'Enviar', sending: 'Enviando…',
      okTitle: 'Gracias. Hemos recibido su mensaje.', okText: 'Le hemos enviado un correo de confirmación. Le responderemos en un plazo de 24 horas.',
      errReq: ' es obligatorio', errEmail: 'Revise su correo electrónico', errTopic: 'Seleccione al menos un tema', errAgree: 'Debe aceptar la Política de privacidad',
      errSend: 'No se pudo enviar el mensaje. Inténtelo de nuevo más tarde o escríbanos a ' + MAIL + '.',
      visa: ['Visa de trabajo / Estatus de residencia', 'Renovación de visa / Cambio de estatus', 'Iniciar o gestionar un negocio en Japón', 'Matrimonio internacional', 'Visa familiar', 'Residencia permanente / Naturalización', 'Contratación de trabajadores extranjeros', 'No sé qué opción elegir', 'Otro']
    },
    jaVisa: ['就労ビザ・在留資格', 'ビザの更新・変更', '日本での起業・会社経営', '国際結婚', '家族のビザ', '永住・帰化', '外国人の雇用', 'どれを選べばよいか分からない', 'その他']
  };

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build(root, n) {
    var lang = (root.getAttribute('data-hk-lang') || root.getAttribute('data-lang')) || 'ja';
    var mode = root.getAttribute('data-mode') || (lang === 'ja' ? 'general' : 'visa'); // general | visa
    var t = T[lang] || T.ja;
    var pre = root.getAttribute('data-topic') || '';
    try { var q = new URLSearchParams(location.search).get('topic'); if (q) pre = q; } catch (e) {}
    var id = function (k) { return 'hkf' + n + '-' + k; };
    var label = function (k, txt, req) { return '<label for="' + id(k) + '">' + esc(txt) + '<span class="hkf-badge' + (req ? ' is-req' : '') + '">' + esc(req ? t.req : t.opt) + '</span></label>'; };
    var topicHtml;
    if (mode === 'visa') {
      var list = lang === 'ja' ? T.jaVisa : t.visa;
      topicHtml = '<fieldset class="hkf-row hkf-checks" id="' + id('topic') + '"><legend>' + esc(t.topicMulti) + '<span class="hkf-badge is-req">' + esc(t.req) + '</span></legend>' +
        list.map(function (v, i) { return '<label class="hkf-check"><input type="checkbox" name="topic" value="' + esc(v) + '"><span>' + esc(v) + '</span></label>'; }).join('') +
        '<p class="hkf-err" data-for="topic"></p></fieldset>';
    } else {
      topicHtml = '<div class="hkf-row">' + label('topic', t.topic, true) + '<select id="' + id('topic') + '" name="topic"><option value="">' + esc(t.choose) + '</option>' +
        t.topics.map(function (o) { return '<option value="' + esc(o[1]) + '"' + (o[0] === pre ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('') +
        '</select><p class="hkf-err" data-for="topic"></p></div>';
    }
    root.innerHTML =
      '<form class="hkf" novalidate>' +
      '<div class="hkf-row">' + label('name', t.name, true) + '<input id="' + id('name') + '" name="name" type="text" autocomplete="name" maxlength="100"><p class="hkf-err" data-for="name"></p></div>' +
      '<div class="hkf-row">' + label('company', t.company, false) + '<input id="' + id('company') + '" name="company" type="text" autocomplete="organization" maxlength="150" placeholder="' + esc(t.phCompany) + '"></div>' +
      '<div class="hkf-row">' + label('email', t.email, true) + '<input id="' + id('email') + '" name="email" type="email" autocomplete="email" inputmode="email" maxlength="200"><p class="hkf-err" data-for="email"></p></div>' +
      '<div class="hkf-row">' + label('phone', t.phone, false) + '<input id="' + id('phone') + '" name="phone" type="tel" autocomplete="tel" inputmode="tel" maxlength="50" placeholder="' + esc(t.phPhone) + '"></div>' +
      topicHtml +
      '<div class="hkf-row">' + label('message', t.message, false) + '<p class="hkf-hint">' + esc(t.msgHint) + '</p><textarea id="' + id('message') + '" name="message" rows="6" maxlength="5000" placeholder="' + esc(t.phMsg) + '"></textarea><p class="hkf-err" data-for="message"></p></div>' +
      '<div class="hkf-row">' + label('source', t.source, false) + '<select id="' + id('source') + '" name="source"><option value="">' + esc(t.choose) + '</option>' + t.sources.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + '</option>'; }).join('') + '</select></div>' +
      '<div class="hkf-hp" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<div class="hkf-row"><label class="hkf-check hkf-agree"><input type="checkbox" name="agree"><span>' + esc(t.agreeA) + '<a href="' + t.privacy + '" target="_blank" rel="noopener">' + esc(t.agreeLink) + '</a>' + esc(t.agreeB) + '</span></label><p class="hkf-err" data-for="agree"></p></div>' +
      '<button type="submit" class="hkf-submit">' + esc(t.submit) + '</button>' +
      '<p class="hkf-err hkf-send-err" role="alert"></p>' +
      '</form>' +
      '<div class="hkf-done" role="status" hidden><p class="hkf-done-t">' + esc(t.okTitle) + '</p><p>' + esc(t.okText) + '</p></div>';

    var form = root.querySelector('form'), started = Date.now();
    var err = function (k, msg) { var p = form.querySelector('.hkf-err[data-for="' + k + '"]'); if (p) p.textContent = msg || ''; var f = form.querySelector('#' + id(k)); if (f) f.setAttribute('aria-invalid', msg ? 'true' : 'false'); };
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var v = function (k) { var el = form.elements[k]; return el ? (el.value || '').trim() : ''; };
      var ok = true, first = null;
      var need = function (k, txt) { if (!v(k)) { err(k, (lang === 'ja' ? txt + t.errReq : txt + t.errReq)); ok = false; first = first || k; } else err(k, ''); };
      need('name', t.name);
      if (!v('email')) { err('email', t.email + t.errReq); ok = false; first = first || 'email'; }
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v('email'))) { err('email', t.errEmail); ok = false; first = first || 'email'; } else err('email', '');
      var topics = mode === 'visa' ? Array.prototype.filter.call(form.querySelectorAll('input[name="topic"]'), function (c) { return c.checked; }).map(function (c) { return c.value; }).join(' / ') : v('topic');
      if (!topics) { err('topic', t.errTopic); ok = false; first = first || 'topic'; } else err('topic', '');
      if (!form.elements.agree.checked) { err('agree', t.errAgree); ok = false; } else err('agree', '');
      if (!ok) { var f = form.querySelector('#' + id(first)); if (f && f.focus) f.focus(); return; }

      var btn = form.querySelector('.hkf-submit'), sendErr = form.querySelector('.hkf-send-err');
      sendErr.textContent = '';
      var done = function () { form.hidden = true; var d = root.querySelector('.hkf-done'); d.hidden = false; d.setAttribute('tabindex', '-1'); d.focus(); };
      if (v('website') || Date.now() - started < 3000) { done(); return; } // ロボット対策
      if (!ENDPOINT) { sendErr.textContent = t.errSend; return; }
      btn.disabled = true; btn.textContent = t.sending;
      var body = new URLSearchParams();
      body.append('name', v('name')); body.append('email', v('email')); body.append('phone', v('phone'));
      var parts = [], co = v('company'), src = v('source');
      if (co) parts.push('【会社名・団体名】' + co);
      parts.push(v('message') || '（ご相談内容の記入なし）');
      if (src) parts.push('【当事務所を知ったきっかけ】' + src);
      var msg = parts.join('\n\n');
      body.append('topic', topics); body.append('message', msg);
      body.append('site', root.getAttribute('data-site') || ''); body.append('lang', lang); body.append('page', location.href);
      fetch(ENDPOINT, { method: 'POST', mode: 'no-cors', body: body })
        .then(function () { done(); })
        .catch(function () { btn.disabled = false; btn.textContent = t.submit; sendErr.textContent = t.errSend; });
    });
  }

  function init() { Array.prototype.forEach.call(document.querySelectorAll('.hk-form'), function (el, i) { if (!el.dataset.ready) { el.dataset.ready = '1'; build(el, i); } }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
