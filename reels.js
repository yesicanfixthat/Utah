/* Yes, I Can Fix That: "Watch Seth work" reel player.
   To add a reel: upload the .mp4 to the repo and add one line to REELS below.
   "topic" keeps the rotation mixed: the player never plays two reels
   from the same topic back to back when another topic is available. */
(function () {
  var REELS = [
    { file: 'fixthat-reel-ceiling-patch.mp4',         title: 'Ceiling patch in 7 steps',  topic: 'Drywall' },
    { file: 'fixthat-reel-clean-tools-tip.mp4',       title: 'Clean your tools',          topic: 'Drywall' },
    { file: 'fixthat-reel-prep-before-you-patch.mp4', title: 'Prep before you patch',     topic: 'Drywall' },
    { file: 'fixthat-reel-mix-it-outside.mp4',        title: 'Mix it outside',            topic: 'Drywall' },
    { file: 'fixthat-reel-thin-coats-win.mp4',        title: 'Thin coats win',            topic: 'Drywall' }
  ];

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  // Round-robin across topics (each topic shuffled), starting on a random topic.
  function buildQueue() {
    var groups = {};
    REELS.forEach(function (r) { (groups[r.topic] = groups[r.topic] || []).push(r); });
    var topics = shuffle(Object.keys(groups));
    topics.forEach(function (t) { groups[t] = shuffle(groups[t]); });
    var q = [], left = REELS.length;
    while (left > 0) {
      topics.forEach(function (t) { if (groups[t].length) { q.push(groups[t].shift()); left--; } });
    }
    return q;
  }

  var css = '' +
    '.reels{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,320px);gap:32px;align-items:center;margin-top:36px}' +
    '@media (max-width:760px){.reels{grid-template-columns:1fr}.reels .reel-frame{margin:0 auto}}' +
    '.reels h3{font-family:var(--display);font-size:clamp(28px,4vw,38px);text-transform:uppercase;margin:0 0 8px}' +
    '.reels .reel-sub{color:var(--muted);margin:0 0 16px;max-width:44ch}' +
    '.reel-frame{position:relative;width:100%;max-width:320px;aspect-ratio:9/16;background:#0b1626;border-radius:18px;overflow:hidden;box-shadow:0 10px 30px rgba(15,30,60,.25);border:4px solid var(--spruce)}' +
    '.reel-frame video{width:100%;height:100%;object-fit:cover;display:block}' +
    '.reel-sound{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.6);color:#fff;border:0;border-radius:999px;padding:8px 14px;font:700 15px var(--body);cursor:pointer}' +
    '.reel-bar{display:flex;align-items:center;gap:10px;margin-top:12px;max-width:320px}' +
    '.reel-bar button.nav{flex:0 0 auto;width:44px;height:44px;border-radius:50%;border:2px solid var(--line);background:var(--surface);color:var(--ink);font-size:20px;cursor:pointer}' +
    '.reel-bar button.nav:hover{border-color:var(--accent)}' +
    '.reel-cap{flex:1;min-width:0;text-align:center}' +
    '.reel-cap strong{display:block;font-family:var(--display);font-size:22px;text-transform:uppercase;line-height:1.1}' +
    '.reel-cap span{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)}';

  function mount(el) {
    var queue = buildQueue(), i = 0, muted = true;
    el.classList.add('reels');
    el.innerHTML =
      '<div><div class="eyebrow">Watch Seth work</div>' +
      '<h3>Short tips from real jobs</h3>' +
      '<p class="reel-sub">Quick videos from jobs we’ve done. Want to learn it hands-on? <a class="text-link" href="learn.html">Ask about our classes</a> or text <span style="white-space:nowrap">(385) 525-5600</span>.</p></div>' +
      '<div><div class="reel-frame"><video playsinline muted preload="metadata" aria-label="Yes, I Can Fix That tip video"></video>' +
      '<button type="button" class="reel-sound" aria-pressed="false">🔇 Tap for sound</button></div>' +
      '<div class="reel-bar"><button type="button" class="nav prev" aria-label="Previous video">‹</button>' +
      '<div class="reel-cap" aria-live="polite"><span></span><strong></strong></div>' +
      '<button type="button" class="nav next" aria-label="Next video">›</button></div></div>';
    var v = el.querySelector('video'), snd = el.querySelector('.reel-sound');
    var capT = el.querySelector('.reel-cap strong'), capK = el.querySelector('.reel-cap span');
    var visible = false;

    function load(n, play) {
      i = (n + queue.length) % queue.length;
      var r = queue[i];
      v.src = r.file;
      capT.textContent = r.title;
      capK.textContent = r.topic + ' · ' + (i + 1) + ' of ' + queue.length;
      v.muted = muted;
      if (play) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    }
    v.addEventListener('ended', function () { load(i + 1, true); });
    el.querySelector('.next').addEventListener('click', function () { load(i + 1, true); });
    el.querySelector('.prev').addEventListener('click', function () { load(i - 1, true); });
    snd.addEventListener('click', function () {
      muted = !muted; v.muted = muted;
      snd.textContent = muted ? '🔇 Tap for sound' : '🔊 Sound on';
      snd.setAttribute('aria-pressed', String(!muted));
      if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    });
    v.addEventListener('click', function () { if (v.paused) v.play(); else v.pause(); });

    load(0, false);
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduce) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          visible = e.isIntersecting;
          if (visible) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
        });
      }, { threshold: 0.4 }).observe(v);
    } else {
      v.controls = true;
    }
  }

  function init() {
    var s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
    Array.prototype.forEach.call(document.querySelectorAll('[data-reels]'), mount);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
