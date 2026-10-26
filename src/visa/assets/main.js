// ── Mobile nav
function openMobileNav() {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileNav() {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('DOMContentLoaded', function() {
  var nav = document.getElementById('mobileNav');
  if (nav) {
    nav.addEventListener('click', function(e) {
      if (e.target === this) closeMobileNav();
    });
  }
});

// ── Case selector
var activeCase = null;
function selectCase(id) {
  document.querySelectorAll('.case-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.case-detail').forEach(function(d) { d.classList.remove('active'); });
  if (activeCase === id) { activeCase = null; return; }
  activeCase = id;
  document.getElementById('btn-' + id).classList.add('active');
  var detail = document.getElementById('detail-' + id);
  detail.classList.add('active');
  setTimeout(function() {
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}

// ── Currency toggle (JPY / USD)
// 料金は円で書いてあり、USDを選ぶとその日の参考レートで換算して表示します。
(function () {
  var STORE_PREF = 'hls-currency';
  var STORE_RATE = 'hls-usd-rate';
  var MAX_AGE = 6 * 60 * 60 * 1000; // 6時間はキャッシュを使う
  var rate = null; // 1円あたりのドル
  var rateDate = '';

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function load(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function yenText(el) {
    var n = Number(el.getAttribute('data-jpy'));
    return (el.hasAttribute('data-plus') ? '+' : '') + '¥' + n.toLocaleString('en-US') + (el.hasAttribute('data-from') ? '〜' : '');
  }
  function usdText(el) {
    var usd = Number(el.getAttribute('data-jpy')) * rate;
    usd = usd >= 100 ? Math.round(usd / 10) * 10 : Math.round(usd);
    return '≈ ' + (el.hasAttribute('data-plus') ? '+' : '') + 'US$' + usd.toLocaleString('en-US') + (el.hasAttribute('data-from') ? '〜' : '');
  }

  function formatDate(iso, lang) {
    var d = new Date(iso + 'T00:00:00Z');
    if (isNaN(d)) return iso;
    var loc = lang === 'ja' ? 'ja-JP' : (lang === 'es' ? 'es-ES' : 'en-US');
    try { return d.toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }); }
    catch (e) { return iso; }
  }

  function setNotes(kind) {
    document.querySelectorAll('.cur-bar').forEach(function (bar) {
      var note = bar.querySelector('.cur-note');
      if (!note) return;
      if (kind === 'none') { note.textContent = ''; return; }
      var msg = bar.getAttribute('data-msg-' + kind) || '';
      if (kind === 'note') {
        msg = msg.replace('{date}', formatDate(rateDate, bar.getAttribute('data-lang-code')))
                 .replace('{rate}', (1 / rate).toFixed(2));
      }
      note.textContent = msg;
    });
  }

  function render(cur) {
    var usd = cur === 'USD' && rate;
    document.querySelectorAll('.px').forEach(function (el) { el.textContent = usd ? usdText(el) : yenText(el); });
    document.querySelectorAll('.cur-btn').forEach(function (b) {
      var on = b.getAttribute('data-cur') === (usd ? 'USD' : 'JPY');
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    setNotes(usd ? 'note' : 'none');
  }

  // 返ってくる形が違っても、USDの値と日付を取り出す
  function parseRate(data) {
    if (!data) return null;
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        var r = data[i];
        if (r && String(r.quote || r.symbol || '').toUpperCase() === 'USD' && r.rate) return { rate: Number(r.rate), date: r.date || '' };
      }
      return null;
    }
    if (data.rates && data.rates.USD) {
      var date = data.date || '';
      if (!date && data.time_last_update_unix) date = new Date(data.time_last_update_unix * 1000).toISOString().slice(0, 10);
      return { rate: Number(data.rates.USD), date: date };
    }
    return null;
  }

  // 毎日更新される open.er-api.com を先に使い、取れなければ欧州中央銀行の参考レート（Frankfurter）
  var SOURCES = [
    'https://open.er-api.com/v6/latest/JPY',
    'https://api.frankfurter.dev/v1/latest?base=JPY&symbols=USD',
    'https://api.frankfurter.dev/v2/rates?base=JPY&quotes=USD'
  ];

  function fetchRate(i) {
    if (i >= SOURCES.length) return Promise.reject(new Error('no rate'));
    return fetch(SOURCES[i]).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(function (data) {
      var r = parseRate(data);
      if (!r || !(r.rate > 0)) throw new Error('bad data');
      return r;
    }).catch(function () { return fetchRate(i + 1); });
  }

  function getRate() {
    var cached = null;
    try { cached = JSON.parse(load(STORE_RATE) || 'null'); } catch (e) {}
    if (cached && cached.rate > 0 && Date.now() - cached.saved < MAX_AGE) return Promise.resolve(cached);
    return fetchRate(0).then(function (r) {
      store(STORE_RATE, JSON.stringify({ rate: r.rate, date: r.date, saved: Date.now() }));
      return r;
    });
  }

  function choose(cur) {
    store(STORE_PREF, cur);
    if (cur !== 'USD') { render('JPY'); return; }
    if (rate) { render('USD'); return; }
    setNotes('loading');
    getRate().then(function (r) {
      rate = r.rate; rateDate = r.date;
      render('USD');
    }).catch(function () {
      render('JPY');
      setNotes('fail');
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.querySelector('.cur-btn')) return;
    document.querySelectorAll('.cur-btn').forEach(function (b) {
      b.addEventListener('click', function () { choose(b.getAttribute('data-cur')); });
    });
    if (load(STORE_PREF) === 'USD') choose('USD');
  });
})();
